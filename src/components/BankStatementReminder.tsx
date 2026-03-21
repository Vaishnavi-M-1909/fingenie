"use client";

import { useState, useEffect } from "react";
import { Upload, X, ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";

const DISMISS_KEY = "fingenie_statement_reminder_dismissed";

function getDismissKey() {
  const now = new Date();
  return `${DISMISS_KEY}_${now.getFullYear()}_${now.getMonth()}`;
}

export default function BankStatementReminder() {
  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    const today = new Date();
    // Show only on the 1st of the month
    if (today.getDate() !== 1) return;

    // Check if already dismissed this month
    const key = getDismissKey();
    if (localStorage.getItem(key) === "true") return;

    // Small delay so the page loads first
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setVisible(false);
      setAnimatingOut(false);
      localStorage.setItem(getDismissKey(), "true");
    }, 300);
  };

  if (!visible) return null;

  const monthName = new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleDismiss}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10, 10, 10, 0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 9998,
          animation: animatingOut ? "fadeOut 0.3s ease forwards" : "fadeIn 0.3s ease forwards",
        }}
      />

      {/* Popup */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "min(480px, 90vw)",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-heavy)",
          borderRadius: "var(--radius-md)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(23, 0, 255, 0.08)",
          overflow: "hidden",
          animation: animatingOut
            ? "reminderSlideOut 0.3s ease forwards"
            : "reminderSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: "4px",
            background: "linear-gradient(90deg, var(--brand-primary), var(--accent-coral), var(--accent-mint))",
          }}
        />

        {/* Close button */}
        <button
          onClick={handleDismiss}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-sm)",
            padding: "6px",
            cursor: "pointer",
            color: "var(--text-tertiary)",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
            e.currentTarget.style.borderColor = "var(--border-heavy)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = "var(--text-tertiary)";
            e.currentTarget.style.borderColor = "var(--border-light)";
          }}
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div style={{ padding: "32px" }}>
          {/* Icon + Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "var(--brand-primary)",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              <CalendarDays size={24} />
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                background: "rgba(23, 0, 255, 0.06)",
                borderRadius: "100px",
                fontSize: "0.75rem",
                fontWeight: 700,
                fontFamily: "var(--font-body)",
                color: "var(--brand-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Monthly Reminder
            </div>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: "8px",
            }}
          >
            New month, new data.
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "24px",
            }}
          >
            It&#39;s <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>{monthName}</strong> — upload your
            latest bank statement to keep your financial telemetry accurate and your insights up to date.
          </p>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/upload"
              onClick={handleDismiss}
              className="btn btn-primary"
              style={{
                flex: 1,
                minWidth: "180px",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              <Upload size={18} />
              Upload Statement
              <ArrowUpRight size={16} />
            </Link>
            <button
              onClick={handleDismiss}
              className="btn btn-secondary"
              style={{
                fontSize: "0.9rem",
              }}
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
