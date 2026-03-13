"use client";

import { useState } from "react";
import { Shield, Trash2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPrivacyPage() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");

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

  return (
    <div className="container-editorial" style={{ maxWidth: "800px" }}>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(22px, 3vw, 28px)",
          fontWeight: 700,
          letterSpacing: "-1px",
          marginBottom: "8px",
          color: "var(--text-primary)"
        }}
      >
        Settings & Privacy
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "36px" }}>
        Manage your data and privacy preferences.
      </p>

      {/* Data Usage */}
      <div className="glass-card animate-fade-in-up" style={{ padding: "28px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--blue-dim)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Shield size={20} color="var(--blue-primary)" />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 600 }}>
            How we handle your data
          </h2>
        </div>

        <div style={{ display: "grid", gap: "16px", fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <div style={{ padding: "14px 18px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
            <strong style={{ color: "var(--text-primary)" }}>Bank Statements</strong>
            <p style={{ marginTop: "6px" }}>
              Your uploaded files are stored securely in encrypted cloud storage. Only the parsed transaction data (date, merchant, amount) is used for analytics.
            </p>
          </div>
          <div style={{ padding: "14px 18px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
            <strong style={{ color: "var(--text-primary)" }}>AI Insights</strong>
            <p style={{ marginTop: "6px" }}>
              We never send raw transaction data to AI services. Only aggregated summaries (e.g., "Food: ₹7,200") are sent — no account numbers, no merchant IDs, no personal identifiers.
            </p>
          </div>
          <div style={{ padding: "14px 18px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
            <strong style={{ color: "var(--text-primary)" }}>Authentication</strong>
            <p style={{ marginTop: "6px" }}>
              We use Google OAuth via Supabase. We never see or store your Google password. Only your email and display name are stored.
            </p>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div
        className="glass-card animate-fade-in-up delay-200"
        style={{
          padding: "28px",
          borderColor: "var(--coral)",
          border: "1px solid var(--coral-dim)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--coral-dim)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Trash2 size={20} color="var(--coral)" />
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 600 }}>
              Delete Account
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-dim)", marginTop: "2px" }}>
              This action cannot be undone
            </p>
          </div>
        </div>

        <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "20px" }}>
          Deleting your account will permanently remove all your data including uploaded statements,
          parsed transactions, and generated insights. Your storage files will also be deleted.
        </p>

        {!showConfirm ? (
          <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>
            <Trash2 size={16} />
            Delete My Account
          </button>
        ) : (
          <div
            style={{
              padding: "20px",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--coral-dim)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <AlertTriangle size={16} color="var(--coral)" />
              <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--coral)" }}>
                Are you absolutely sure?
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Type <strong style={{ color: "var(--coral)" }}>DELETE</strong> to confirm:
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
                style={{ opacity: confirmText !== "DELETE" ? 0.5 : 1 }}
              >
                {deleting ? "Deleting..." : "Permanently Delete"}
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
