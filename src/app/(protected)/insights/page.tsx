"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Lightbulb, Sparkles, ExternalLink, Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";

interface Insight {
  id: string;
  month: string;
  score: number | null;
  summary: string;
  recommendations: {
    summary?: string[];
    actions?: string[];
    resources?: { title: string; url: string }[];
  } | null;
  createdAt: string;
}

export default function InsightsPage() {
  const queryClient = useQueryClient();
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const { data: insights, isLoading } = useQuery({
    queryKey: ["insights"],
    queryFn: async () => {
      const res = await fetch("/api/insights/generate");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json() as Promise<Insight[]>;
    },
  });

  const generate = useMutation({
    mutationFn: async (month: string) => {
      const res = await fetch("/api/insights/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insights"] });
    },
  });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "36px" }}>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-1px",
              marginBottom: "4px",
            }}
          >
            AI Insights
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            Personalized financial advice powered by AI
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <select
            className="input"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ width: "200px" }}
          >
            {Array.from({ length: 12 }, (_, i) => {
              const d = new Date();
              d.setMonth(d.getMonth() - i);
              const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
              const label = d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
              return <option key={val} value={val}>{label}</option>;
            })}
          </select>
          <button
            className="btn btn-primary"
            onClick={() => generate.mutate(selectedMonth)}
            disabled={generate.isPending}
          >
            {generate.isPending ? (
              <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
            ) : (
              <Sparkles size={16} />
            )}
            {generate.isPending ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {generate.isError && (
        <div
          style={{
            padding: "14px 20px",
            background: "var(--coral-dim)",
            border: "1px solid var(--coral)",
            borderRadius: "var(--radius-sm)",
            color: "var(--coral)",
            fontSize: "14px",
            marginBottom: "24px",
          }}
        >
          {generate.error.message}
        </div>
      )}

      {isLoading ? (
        <div style={{ display: "grid", gap: "16px" }}>
          {[1, 2].map((i) => (
            <div key={i} className="skeleton" style={{ height: "200px" }} />
          ))}
        </div>
      ) : !insights?.length ? (
        <div
          className="glass-card animate-fade-in-up"
          style={{ padding: "80px 40px", textAlign: "center" }}
        >
          <Lightbulb size={48} color="var(--text-dim)" style={{ marginBottom: "16px" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", marginBottom: "8px" }}>
            No insights yet
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "24px" }}>
            Select a month and click Generate to get AI-powered financial insights.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {insights.map((insight: Insight, idx: number) => {
            const recs = insight.recommendations;
            return (
              <div
                key={insight.id}
                className={`glass-card animate-fade-in-up delay-${Math.min(idx + 1, 5) * 100}`}
                style={{ padding: "28px" }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "var(--purple-dim)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Sparkles size={20} color="var(--purple)" />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 600 }}>
                        {new Date(
                          parseInt(insight.month.split("-")[0]),
                          parseInt(insight.month.split("-")[1]) - 1
                        ).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                      </h3>
                      <span style={{ fontSize: "12px", color: "var(--text-dim)" }}>
                        Generated {new Date(insight.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  </div>
                  {insight.score && (
                    <span className="badge badge-mint" style={{ fontSize: "14px", padding: "6px 16px" }}>
                      Score: {insight.score}/100
                    </span>
                  )}
                </div>

                {/* Summary */}
                {recs?.summary && (
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: "var(--text-dim)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>
                      Summary
                    </h4>
                    <ul style={{ listStyle: "none", display: "grid", gap: "8px" }}>
                      {recs.summary.map((point: string, i: number) => (
                        <li
                          key={i}
                          style={{
                            padding: "12px 16px",
                            background: "var(--bg-secondary)",
                            borderRadius: "var(--radius-sm)",
                            fontSize: "14px",
                            lineHeight: 1.6,
                            borderLeft: "3px solid var(--mint-primary)",
                          }}
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                {recs?.actions && (
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: "var(--text-dim)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>
                      Recommended Actions
                    </h4>
                    <ul style={{ listStyle: "none", display: "grid", gap: "8px" }}>
                      {recs.actions.map((action: string, i: number) => (
                        <li
                          key={i}
                          style={{
                            padding: "12px 16px",
                            background: "var(--bg-secondary)",
                            borderRadius: "var(--radius-sm)",
                            fontSize: "14px",
                            lineHeight: 1.6,
                            borderLeft: "3px solid var(--amber)",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                          }}
                        >
                          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--amber)", minWidth: "20px" }}>
                            {i + 1}.
                          </span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Resources */}
                {recs?.resources && recs.resources.length > 0 && (
                  <div>
                    <h4 style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: "var(--text-dim)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>
                      Learning Resources
                    </h4>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      {recs.resources.map((resource: { title: string; url: string }, i: number) => (
                        <a
                          key={i}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-card"
                          style={{
                            padding: "14px 18px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: "14px",
                            textDecoration: "none",
                            color: "var(--text-primary)",
                            flex: "1 1 200px",
                          }}
                        >
                          <ExternalLink size={14} color="var(--blue)" />
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
