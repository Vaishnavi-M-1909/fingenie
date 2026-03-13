"use client";

import { useState } from "react";
import { Shield, Trash2, AlertTriangle, ShieldAlert, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SettingsPrivacyPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const [showWipeConfirm, setShowWipeConfirm] = useState(false);
  const [wipeConfirmText, setWipeConfirmText] = useState("");

  const wipeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/vault/wipe", { method: "DELETE" });
      if (!res.ok) throw new Error("Wipe failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vault"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      setShowWipeConfirm(false);
      setWipeConfirmText("");
      alert("System reset complete. Your dashboard is now clean.");
    },
  });

  const handleDelete = async () => {
    if (confirmText !== "DELETE") return;
    setDeleting(true);
    try {
      const res = await fetch("/api/delete-account", { method: "POST" });
      if (res.ok) {
        router.push("/login");
      }
    } catch {
      setDeleting(false);
    }
  };

  const handleWipe = () => {
    if (wipeConfirmText === "WIPE") {
      wipeMutation.mutate();
    }
  };

  return (
    <div className="container-editorial animate-reveal" style={{ maxWidth: "800px" }}>
      <header style={{ marginBottom: "40px" }}>
        <h1 className="display-large" style={{ marginBottom: "8px" }}>Settings.</h1>
        <div className="eyebrow" style={{ color: "var(--brand-primary)" }}>Account & Data Governance</div>
      </header>

      {/* Data Usage */}
      <div className="editorial-card" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-sm)",
              background: "var(--brand-dim)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Shield size={20} color="var(--brand-primary)" />
          </div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            Privacy Standards
          </h2>
        </div>

        <div style={{ display: "grid", gap: "16px", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <div style={{ padding: "16px", background: "var(--bg-primary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)" }}>
            <strong style={{ color: "var(--text-primary)" }}>Bank Statements</strong>
            <p style={{ marginTop: "4px" }}>
              Documents are processed securely. Original files are purged upon your request. Transaction data is stored with unique IDs.
            </p>
          </div>
          <div style={{ padding: "16px", background: "var(--bg-primary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)" }}>
            <strong style={{ color: "var(--text-primary)" }}>AI Anonymization</strong>
            <p style={{ marginTop: "4px" }}>
              Only generic metadata is ever exposed to inference models. We never transmit sensitive account details or merchant IDs.
            </p>
          </div>
        </div>
      </div>

      {/* Wipe Data Section */}
      <div 
        className="editorial-card" 
        style={{ 
          marginBottom: "24px", 
          border: showWipeConfirm ? "2px solid var(--accent-coral)" : "1px solid var(--border-heavy)" 
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-sm)",
              background: "rgba(255, 59, 0, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RefreshCcw size={20} color="var(--accent-coral)" />
          </div>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              System Reset
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
              Clear all transactions and documents
            </p>
          </div>
        </div>

        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px" }}>
          This will purge all uploaded statements, parsed receipts, and dashboard telemetry. 
          Your account remains active, but all financial history will be wiped.
        </p>

        {!showWipeConfirm ? (
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowWipeConfirm(true)}
            style={{ color: "var(--accent-coral)", borderColor: "var(--accent-coral)" }}
          >
            <ShieldAlert size={16} /> Wipe Financial Data
          </button>
        ) : (
          <div style={{ padding: "20px", background: "var(--bg-primary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-heavy)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <AlertTriangle size={18} color="var(--accent-coral)" />
              <span style={{ fontWeight: 800, fontSize: "14px", color: "var(--text-primary)", textTransform: "uppercase" }}>
                Confirm Global Purge
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Please type <strong style={{ color: "var(--accent-coral)" }}>WIPE</strong> to reset all telemetry:
            </p>
            <input
              className="input"
              value={wipeConfirmText}
              onChange={(e) => setWipeConfirmText(e.target.value)}
              placeholder="Type WIPE"
              style={{ marginBottom: "16px", textTransform: "uppercase", fontWeight: 700 }}
            />
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                className="btn btn-primary"
                disabled={wipeConfirmText !== "WIPE" || wipeMutation.isPending}
                onClick={handleWipe}
                style={{ background: "var(--accent-coral)" }}
              >
                {wipeMutation.isPending ? "Purging..." : "Confirm Wipe"}
              </button>
              <button className="btn btn-secondary" onClick={() => { setShowWipeConfirm(false); setWipeConfirmText(""); }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div
        className="editorial-card"
        style={{
          border: "1px solid var(--border-heavy)",
          opacity: 0.8
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-sm)",
              background: "var(--bg-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Trash2 size={20} color="var(--text-tertiary)" />
          </div>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-secondary)" }}>
              Close Account
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
              Permanent account termination
            </p>
          </div>
        </div>

        <p style={{ fontSize: "14px", color: "var(--text-tertiary)", marginBottom: "20px" }}>
          To permanently close your account and remove your profile, click below.
        </p>

        {!showConfirm ? (
          <button className="btn btn-ghost" onClick={() => setShowConfirm(true)} style={{ color: "var(--text-tertiary)" }}>
            Deactivate Profile
          </button>
        ) : (
          <div
            style={{
              padding: "20px",
              background: "var(--bg-primary)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-heavy)",
            }}
          >
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Type <strong style={{ color: "var(--text-primary)" }}>DELETE</strong> to confirm termination:
            </p>
            <input
              className="input"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE"
              style={{ marginBottom: "16px" }}
            />
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                className="btn btn-danger"
                disabled={confirmText !== "DELETE" || deleting}
                onClick={handleDelete}
              >
                {deleting ? "Closing..." : "Terminate"}
              </button>
              <button className="btn btn-ghost" onClick={() => { setShowConfirm(false); setConfirmText(""); }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
