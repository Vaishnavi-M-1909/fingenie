"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle, XCircle, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

type UploadState = "idle" | "uploading" | "done" | "failed";

interface UploadResult {
  statementId: string;
  status: string;
  parsed: number;
  failed: number;
  total: number;
  error?: string;
}

export default function UploadPage() {
  const [state, setState] = useState<UploadState>("idle");
  const [result, setResult] = useState<UploadResult | null>(null);
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = useCallback(async (file: File) => {
    setFileName(file.name);
    setState("uploading");
    setProgress(20);

    const formData = new FormData();
    formData.append("file", file);

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
      setState(data.status === "done" ? "done" : "failed");
      setResult(data);
    } catch {
      setState("failed");
      setResult({ statementId: "", status: "failed", parsed: 0, failed: 0, total: 0, error: "Network error" });
    }
  }, []);

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
    <div style={{ maxWidth: "640px" }}>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "28px",
          fontWeight: 700,
          letterSpacing: "-1px",
          marginBottom: "8px",
        }}
      >
        Upload Statement
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "36px" }}>
        Upload your bank statement (PDF or CSV) to analyze your spending.
      </p>

      {state === "idle" && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className="animate-fade-in-up"
          style={{
            border: `2px dashed ${dragOver ? "var(--mint-primary)" : "var(--border)"}`,
            borderRadius: "var(--radius-lg)",
            padding: "80px 40px",
            textAlign: "center",
            background: dragOver ? "var(--mint-dim)" : "var(--bg-card)",
            transition: "all 0.3s",
            cursor: "pointer",
          }}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".csv,.pdf"
            style={{ display: "none" }}
            onChange={handleFileInput}
          />
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "var(--mint-dim)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <Upload size={28} color="var(--mint-primary)" />
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            Drag & drop your file here
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "20px" }}>
            or click to browse • Supports PDF and CSV
          </p>
          <p style={{ fontSize: "12px", color: "var(--text-dim)" }}>Max file size: 5MB</p>
        </div>
      )}

      {state === "uploading" && (
        <div className="glass-card animate-scale-in" style={{ padding: "40px", textAlign: "center" }}>
          <FileText size={40} color="var(--mint-primary)" style={{ marginBottom: "16px" }} />
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            Processing {fileName}
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "24px" }}>
            Uploading and parsing your statement...
          </p>
          <div
            style={{
              height: "6px",
              background: "var(--border)",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, var(--mint-primary), var(--emerald))",
                borderRadius: "3px",
                width: `${progress}%`,
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>
      )}

      {state === "done" && result && (
        <div className="glass-card animate-scale-in" style={{ padding: "40px", textAlign: "center" }}>
          <CheckCircle size={48} color="var(--mint-primary)" style={{ marginBottom: "16px" }} />
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Successfully Parsed!
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "32px",
              marginBottom: "28px",
              fontSize: "14px",
            }}
          >
            <div>
              <div style={{ fontSize: "24px", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--mint-primary)" }}>
                {result.parsed}
              </div>
              <div style={{ color: "var(--text-dim)" }}>Parsed</div>
            </div>
            {result.failed > 0 && (
              <div>
                <div style={{ fontSize: "24px", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--amber)" }}>
                  {result.failed}
                </div>
                <div style={{ color: "var(--text-dim)" }}>Skipped</div>
              </div>
            )}
            <div>
              <div style={{ fontSize: "24px", fontWeight: 700, fontFamily: "var(--font-display)" }}>{result.total}</div>
              <div style={{ color: "var(--text-dim)" }}>Total Rows</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link href="/dashboard" className="btn btn-primary">
              View Dashboard <ArrowRight size={16} />
            </Link>
            <button className="btn btn-secondary" onClick={reset}>
              Upload Another
            </button>
          </div>
        </div>
      )}

      {state === "failed" && (
        <div className="glass-card animate-scale-in" style={{ padding: "40px", textAlign: "center" }}>
          <XCircle size={48} color="var(--coral)" style={{ marginBottom: "16px" }} />
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Parsing Failed
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "24px" }}>
            {result?.error || "We couldn't extract transactions from this file."}
          </p>
          <button className="btn btn-primary" onClick={reset}>
            Try Again
          </button>
        </div>
      )}

      {/* Supported banks */}
      <div
        className="animate-fade-in-up delay-300"
        style={{ marginTop: "40px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <AlertTriangle size={14} color="var(--amber)" />
          <span style={{ fontSize: "13px", fontFamily: "var(--font-display)", color: "var(--text-secondary)" }}>
            Supported formats
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB", "CSV (any bank)"].map((bank) => (
            <span key={bank} className="badge badge-mint">
              {bank}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
