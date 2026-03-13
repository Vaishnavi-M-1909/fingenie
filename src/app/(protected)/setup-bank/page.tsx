"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, CreditCard, Shield } from "lucide-react";
import Logo from "@/components/Logo";

export default function SetupBankPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    branch: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bank-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to register bank account");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    fontWeight: 500,
    color: "var(--text-primary)",
    background: "var(--bg-primary)",
    border: "1px solid var(--border-light)",
    borderRadius: "var(--radius-sm)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "var(--text-secondary)",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
        padding: "20px",
      }}
    >
      <div
        className="editorial-card animate-scale-in"
        style={{
          maxWidth: "520px",
          width: "100%",
          padding: "clamp(32px, 5vw, 48px)",
          borderTop: "4px solid var(--brand-primary)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "8px",
          }}
        >
          <Logo size="md" />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            FinGenie
          </span>
        </div>

        <h1
          className="display-large"
          style={{ fontSize: "2rem", marginBottom: "8px", lineHeight: 1.1 }}
        >
          Register Your Bank Account
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--text-secondary)",
            fontSize: "0.95rem",
            fontWeight: 500,
            marginBottom: "32px",
            lineHeight: 1.5,
          }}
        >
          Link your bank account to automatically verify uploaded statements.
        </p>

        {/* Security Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 16px",
            background: "var(--bg-primary)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-sm)",
            marginBottom: "32px",
          }}
        >
          <Shield size={18} style={{ color: "var(--brand-primary)", flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "var(--text-tertiary)",
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            Your bank details are encrypted and used only for statement
            verification. We never initiate transactions.
          </span>
        </div>

        {error && (
          <div
            style={{
              padding: "12px 16px",
              background: "var(--accent-coral)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.9rem",
              marginBottom: "24px",
              borderRadius: "var(--radius-sm)",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Account Holder Name */}
            <div>
              <label style={labelStyle}>
                <Building2 size={14} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
                Account Holder Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AVANISH KUMAR YADAV"
                value={form.accountHolderName}
                onChange={(e) =>
                  setForm({ ...form, accountHolderName: e.target.value })
                }
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--brand-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-light)")}
              />
            </div>

            {/* Account Number */}
            <div>
              <label style={labelStyle}>
                <CreditCard size={14} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
                Account Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 6905182100XXXXX"
                value={form.accountNumber}
                onChange={(e) =>
                  setForm({ ...form, accountNumber: e.target.value })
                }
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--brand-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-light)")}
              />
            </div>

            {/* Bank Name & IFSC side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Bank Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bank of India"
                  value={form.bankName}
                  onChange={(e) =>
                    setForm({ ...form, bankName: e.target.value })
                  }
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--brand-primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-light)")}
                />
              </div>
              <div>
                <label style={labelStyle}>IFSC Code (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. BKID0008901"
                  value={form.ifscCode}
                  onChange={(e) =>
                    setForm({ ...form, ifscCode: e.target.value })
                  }
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--brand-primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border-light)")}
                />
              </div>
            </div>

            {/* Branch */}
            <div>
              <label style={labelStyle}>Branch (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Phoolpur"
                value={form.branch}
                onChange={(e) =>
                  setForm({ ...form, branch: e.target.value })
                }
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--brand-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-light)")}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "32px",
            }}
          >
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                flex: 1,
                padding: "14px 24px",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Registering..." : "Register Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="btn btn-secondary"
              style={{
                padding: "14px 20px",
                fontSize: "0.9rem",
              }}
            >
              Skip
            </button>
          </div>
        </form>

        <p
          style={{
            marginTop: "24px",
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "var(--text-tertiary)",
            lineHeight: 1.5,
            textAlign: "center",
          }}
        >
          You can always register or update your bank details in Settings.
        </p>
      </div>
    </div>
  );
}
