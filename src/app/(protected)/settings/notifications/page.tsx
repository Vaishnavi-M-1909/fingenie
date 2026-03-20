"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell, Mail, Clock, ShieldCheck, Loader2 } from "lucide-react";

export default function NotificationsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<{ monthlyReminder: boolean }>({
    queryKey: ["user-notifications"],
    queryFn: async () => {
      const res = await fetch("/api/user/notifications");
      if (!res.ok) throw new Error("Failed to fetch notification settings");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (monthlyReminder: boolean) => {
      const res = await fetch("/api/user/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ monthlyReminder }),
      });
      if (!res.ok) throw new Error("Failed to update preferences");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-notifications"] });
    },
  });

  const toggleReminder = () => {
    if (data) {
      mutation.mutate(!data.monthlyReminder);
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <Loader2 className="animate-spin" size={32} color="var(--brand-primary)" />
      </div>
    );
  }

  return (
    <div className="animate-reveal">
      {/* Email Notifications */}
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
            <Bell size={20} color="var(--brand-primary)" />
          </div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            Communication Channels
          </h2>
        </div>

        <div style={{ display: "grid", gap: "20px" }}>
          <div 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              padding: "24px",
              background: "var(--bg-primary)",
              border: "1px solid var(--border-heavy)",
              borderRadius: "var(--radius-sm)",
              transition: "all 0.2s",
              boxShadow: data?.monthlyReminder ? "4px 4px 0 var(--brand-primary)" : "none",
              transform: data?.monthlyReminder ? "translate(-2px, -2px)" : "none"
            }}
          >
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ padding: "8px", background: "var(--bg-secondary)", borderRadius: "6px", border: "1px solid var(--border-light)" }}>
                <Mail size={20} color="var(--text-secondary)" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                  Monthly Audit Reminder
                </div>
                <p style={{ fontSize: "14px", color: "var(--text-tertiary)", margin: 0, maxWidth: "400px" }}>
                  Receive a diagnostic alert on the 1st of every month to reconcile your statement vectors.
                </p>
              </div>
            </div>

            <button
              onClick={toggleReminder}
              disabled={mutation.isPending}
              style={{
                width: "60px",
                height: "32px",
                borderRadius: "16px",
                background: data?.monthlyReminder ? "var(--brand-primary)" : "var(--border-heavy)",
                border: "none",
                position: "relative",
                cursor: "pointer",
                transition: "background 0.3s ease",
                padding: 0
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "#fff",
                  position: "absolute",
                  top: "4px",
                  left: data?.monthlyReminder ? "32px" : "4px",
                  transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Logic & Scheduling Info */}
      <div className="editorial-card" style={{ opacity: 0.9 }}>
        <h3 className="eyebrow" style={{ marginBottom: "20px" }}>System Scheduling Logic</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <Clock size={16} color="var(--brand-primary)" style={{ marginTop: "2px" }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "var(--text-primary)" }}>Temporal Precision</div>
              <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "4px" }}>
                Alerts are dispatched at 00:00 UTC on the first chronological day of each month.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <ShieldCheck size={16} color="var(--brand-primary)" style={{ marginTop: "2px" }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "var(--text-primary)" }}>Verification Layer</div>
              <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "4px" }}>
                Reminders are only sent to verified accounts with active telemetry subscriptions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
