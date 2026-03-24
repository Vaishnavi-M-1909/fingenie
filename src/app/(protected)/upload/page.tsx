"use client";

import { useState, useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Upload, FileText, CheckCircle, XCircle, AlertTriangle, ArrowRight, CreditCard } from "lucide-react";
import Link from "next/link";
import { useBank } from "@/lib/contexts/BankContext";

type UploadState = "idle" | "uploading" | "done" | "failed";

interface UploadResult {
  statementId: string;
  status: string;
  parsed: number;
  failed: number;
  total: number;
  error?: string;
  bankName?: string;
  accountWarning?: string;
}

export default function UploadPage() {
  const queryClient = useQueryClient();
  const { bankAccounts, activeBankAccountId } = useBank();
  const [state, setState] = useState<UploadState>("idle");
  const [result, setResult] = useState<UploadResult | null>(null);
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string>("");

  useEffect(() => {
    if (activeBankAccountId) {
      setSelectedBankAccountId(activeBankAccountId);
    } else if (bankAccounts.length > 0 && !selectedBankAccountId) {
      setSelectedBankAccountId(bankAccounts[0].id);
    }
  }, [activeBankAccountId, bankAccounts]);

  const handleUpload = useCallback(async (file: File) => {
    setFileName(file.name);
    setState("uploading");
    setProgress(20);

    const formData = new FormData();
    formData.append("file", file);
    if (selectedBankAccountId) {
      formData.append("bankAccountId", selectedBankAccountId);
    }

    try {
      setProgress(50);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      setProgress(90);
      const data = await res.json();

      if (!res.ok) {
        setState("failed");
        setResult({ statementId: "", status: "failed", parsed: 0, failed: 0, total: 0, error: data.error });
        return;
      }

      setProgress(100);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
        queryClient.invalidateQueries({ queryKey: ["transactions"] }),
        queryClient.invalidateQueries({ queryKey: ["vault"] }),
        queryClient.invalidateQueries({ queryKey: ["insights"] }),
      ]);
      setState(data.status === "done" ? "done" : "failed");
      setResult(data);
    } catch {
      setState("failed");
      setResult({ statementId: "", status: "failed", parsed: 0, failed: 0, total: 0, error: "Network error" });
    }
  }, [queryClient, selectedBankAccountId]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  const reset = () => {
    setState("idle");
    setResult(null);
    setFileName("");
    setProgress(0);
  };

  return (
    <div className="container-editorial animate-reveal" style={{ maxWidth: "800px" }}>
      <header style={{ marginBottom: "40px" }}>
        <h1 className="display-large" style={{ color: "var(--text-primary)", marginBottom: "8px" }}>
          Upload
        </h1>
        <p className="eyebrow" style={{ color: "var(--brand-primary)", textTransform: "none", fontFamily: "var(--font-body)", fontSize: "1.05rem" }}>
          Upload bank statements or receipts for processing
        </p>
      </header>

      <div className="rule-horizontal" style={{ marginBottom: "32px" }} />

      {state === "idle" && bankAccounts.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <label className="eyebrow" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", color: "var(--text-secondary)" }}>
            <CreditCard size={14} /> Target Bank Account
          </label>
          <select
            value={selectedBankAccountId}
            onChange={(e) => setSelectedBankAccountId(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 18px",
              background: "var(--bg-secondary)",
              border: "2px solid var(--border-heavy)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--text-primary)",
              cursor: "pointer",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 16px center",
              backgroundSize: "20px"
            }}
          >
            <option value="">Auto-Detect from Statement</option>
            {bankAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.bankName} ({account.accountNumber.slice(-4)})
              </option>
            ))}
          </select>
          <p style={{ marginTop: "8px", fontSize: "0.8rem", color: "var(--text-tertiary)", fontWeight: 500 }}>
            Choose which account this statement belongs to. We'll still verify the account number if found.
          </p>
        </div>
      )}

      {state === "idle" && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className="animate-fade-in-up editorial-card"
          style={{
            border: `2px dashed ${dragOver ? "var(--brand-primary)" : "var(--border-heavy)"}`,
            padding: "clamp(40px, 8vw, 80px) clamp(20px, 4vw, 40px)",
            textAlign: "center",
            background: dragOver ? "var(--brand-dim)" : "var(--bg-secondary)",
            transition: "all 0.2s",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={() => document.getElementById("file-input")?.click()}
          onMouseOver={(e) => {
            if(!dragOver) e.currentTarget.style.borderColor = "var(--text-tertiary)";
          }}
          onMouseOut={(e) => {
            if(!dragOver) e.currentTarget.style.borderColor = "var(--border-heavy)";
          }}
        >
          <input
            id="file-input"
            type="file"
            accept=".csv,.pdf,image/jpeg,image/png"
            style={{ display: "none" }}
            onChange={handleFileInput}
          />
          <div style={{ position: "absolute", top: "16px", left: "16px", transform: "rotate(-90deg)", transformOrigin: "bottom left" }}>
             <span className="eyebrow" style={{ color: "var(--text-tertiary)" }}>DROP_ZONE</span>
          </div>
          
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "var(--bg-primary)",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              border: "1px solid var(--border-light)",
              borderRadius: "50%",
              boxShadow: "var(--shadow-hover)"
            }}
          >
            <Upload size={28} />
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "12px" }}>
            Select a file to upload
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "24px" }}>
            Drag and drop your file here, or click to browse
          </p>
          <div style={{ display: "inline-flex", gap: "8px", padding: "6px 12px", border: "1px solid var(--border-light)", background: "var(--bg-primary)", borderRadius: "var(--radius-sm)" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, fontFamily: "var(--font-body)", color: "var(--brand-primary)" }}>CSV</span>
            <span style={{ fontSize: "0.8rem", color: "var(--border-heavy)" }}>|</span>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, fontFamily: "var(--font-body)", color: "var(--accent-coral)" }}>PDF</span>
            <span style={{ fontSize: "0.8rem", color: "var(--border-heavy)" }}>|</span>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, fontFamily: "var(--font-body)", color: "var(--accent-mint)" }}>IMG</span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", marginLeft: "8px", fontWeight: 500 }}>Max 5MB</span>
          </div>
        </div>
      )}

      {state === "uploading" && (
        <div className="editorial-card animate-scale-in" style={{ padding: "60px 40px", textAlign: "center" }}>
          <FileText size={48} style={{ color: "var(--brand-primary)", marginBottom: "24px", margin: "0 auto" }} />
          <h3 className="display-large" style={{ fontSize: "2rem", marginBottom: "12px" }}>
            Processing Data...
          </h3>
          <div style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)", marginBottom: "40px" }}>
            Extracting components from: {fileName}
          </div>
          <div
            style={{
              height: "8px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-light)",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                height: "100%",
                background: "var(--brand-primary)",
                width: `${progress}%`,
                transition: "width 0.2s linear"
              }}
            />
          </div>
        </div>
      )}

      {state === "done" && result && (
        <div className="editorial-card animate-scale-in" style={{ padding: "60px 40px", textAlign: "center", borderTop: "4px solid var(--brand-primary)" }}>
          <CheckCircle size={56} style={{ color: "var(--brand-primary)", marginBottom: "24px", margin: "0 auto" }} />
          <h3 className="display-large" style={{ fontSize: "2.5rem", marginBottom: "12px", color: "var(--brand-primary)", lineHeight: 1 }}>
            Upload Successful
          </h3>

          {result.bankName && (
            <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "24px" }}>
              Detected: <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>{result.bankName}</span>
            </div>
          )}

          {result.accountWarning && (
            <div style={{
              display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 18px",
              background: "rgba(255,59,0,0.08)", border: "1px solid var(--accent-coral)",
              borderRadius: "var(--radius-sm)", marginBottom: "24px", textAlign: "left",
            }}>
              <AlertTriangle size={20} style={{ color: "var(--accent-coral)", flexShrink: 0, marginTop: "2px" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.4 }}>
                {result.accountWarning}
              </span>
            </div>
          )}
          
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "40px" }}>
            <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-sm)", padding: "20px", flex: 1 }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--text-primary)", lineHeight: 1, marginBottom: "8px" }}>
                {result.parsed}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase" }}>Parsed Rows</div>
            </div>
            {result.failed > 0 && (
              <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--accent-coral)", borderRadius: "var(--radius-sm)", padding: "20px", flex: 1 }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--accent-coral)", lineHeight: 1, marginBottom: "8px" }}>
                  {result.failed}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase" }}>Errors</div>
              </div>
            )}
            <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-sm)", padding: "20px", flex: 1 }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--text-primary)", lineHeight: 1, marginBottom: "8px" }}>
                {result.total}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase" }}>Total Rows</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/dashboard" className="btn btn-primary">
              View Dashboard <ArrowRight size={18} />
            </Link>
            <button className="btn btn-secondary" onClick={reset}>
              Upload Another
            </button>
          </div>
        </div>
      )}

      {state === "failed" && (
        <div className="editorial-card animate-scale-in" style={{ padding: "60px 40px", textAlign: "center", borderTop: "4px solid var(--accent-coral)", background: "var(--bg-secondary)" }}>
          <XCircle size={56} color="var(--accent-coral)" style={{ marginBottom: "24px", margin: "0 auto" }} />
          <h3 className="display-large" style={{ fontSize: "2.5rem", marginBottom: "16px", color: "var(--text-primary)" }}>
            Upload Failed
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "40px" }}>
            {result?.error || "We couldn't process this file. Please ensure it's a supported format."}
          </p>
          <button className="btn btn-primary" onClick={reset}>
            Try Again
          </button>
        </div>
      )}

      {/* Support Info */}
      <div className="animate-fade-in-up delay-300" style={{ marginTop: "60px", padding: "24px", border: "1px solid var(--border-light)", borderRadius: "var(--radius-sm)", background: "var(--bg-secondary)", display: "flex", alignItems: "flex-start", gap: "16px" }}>
        <AlertTriangle size={24} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
        <div>
          <h4 style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase" }}>Supported Formats</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["SBI [PDF]", "HDFC [PDF]", "ICICI [PDF]", "AXIS [PDF]", "GLOBAL [CSV]", "RECEIPT [JPG/PNG]"].map((bank) => (
              <span key={bank} style={{ padding: "6px 10px", background: "var(--bg-primary)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                {bank}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
