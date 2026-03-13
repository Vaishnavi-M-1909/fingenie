"use client";

import { useQuery } from "@tanstack/react-query";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import {
  TrendingDown, TrendingUp, CreditCard, RefreshCw,
  ArrowUpRight, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useState } from "react";

const COLORS = [
  "var(--brand-primary)", "#FF3B00", "#00E57A", "#FFC700", "#00F0FF",
  "#0A0A0A", "#4A4A48", "#1700FF"
];

function formatCurrency(amount: number) {
  return `₹${Math.abs(amount).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function getMonthStr(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthLabel(monthStr: string) {
  const [y, m] = monthStr.split("-").map(Number);
  return new Date(y, m - 1).toLocaleDateString("en-IN", { month: "short", year: "numeric" }).toUpperCase();
}

// Brutalist Status Bar component instead of Health Ring
function BrutalistStatusBar({ score }: { score: number | null }) {
  const safeScore = score ?? 0;
  const color = safeScore >= 70 ? "var(--brand-primary)" : safeScore >= 40 ? "#FFC700" : "var(--accent-coral)";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
      <div className="eyebrow" style={{ marginBottom: "1rem" }}>System Health</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "1rem" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "4rem", fontWeight: 800, color, lineHeight: 0.8 }}>
          {safeScore}
        </span>
        <span style={{ fontSize: "1rem", color: "var(--text-tertiary)", fontWeight: 700 }}>/ 100</span>
      </div>
      <div style={{ height: "12px", width: "100%", background: "var(--border-light)", border: "2px solid var(--border-heavy)" }}>
        <div style={{ height: "100%", width: `${safeScore}%`, background: color, borderRight: "2px solid var(--border-heavy)" }} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [currentMonth, setCurrentMonth] = useState(() => getMonthStr(new Date()));

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", currentMonth],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard?month=${currentMonth}`);
      if (!res.ok) throw new Error("Failed to fetch dashboard");
      return res.json();
    },
  });

  const navigateMonth = (direction: number) => {
    const [y, m] = currentMonth.split("-").map(Number);
    const newDate = new Date(y, m - 1 + direction);
    setCurrentMonth(getMonthStr(newDate));
  };

  const pieData = data?.categoryTotals
    ? Object.entries(data.categoryTotals).map(([name, value]) => ({ name, value }))
    : [];

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center", border: "2px solid var(--border-heavy)", background: "var(--accent-coral)", color: "#fff" }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, textTransform: "uppercase" }}>System Failure</p>
        <p>Failed to load diagnostic telemetry.</p>
      </div>
    );
  }

  return (
    <div className="container-editorial animate-reveal" style={{ maxWidth: "1200px" }}>
      {/* Editorial Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "20px" }}>
        <div>
          {data?.userName && (
            <div style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "4px" }}>
              Welcome back, <span style={{ color: "var(--brand-primary)", fontWeight: 700 }}>{data.userName}</span>
            </div>
          )}
          <h1 className="display-large" style={{ color: "var(--text-primary)", marginBottom: "8px" }}>
            Telemetry.
          </h1>
          <div className="eyebrow" style={{ color: "var(--brand-primary)" }}>
            {data?.bankAccounts?.length > 0
              ? `${data.bankAccounts[0].bankName} · ${data.bankAccounts[0].accountNumber}`
              : "Data aggregation operative"}
          </div>
        </div>

        {/* Sharp Navigation */}
        <div style={{ display: "flex", border: "1px solid var(--border-heavy)", borderRadius: "var(--radius-sm)", background: "var(--bg-secondary)", overflow: "hidden" }}>
          <button onClick={() => navigateMonth(-1)} style={{ padding: "12px 16px", borderRight: "1px solid var(--border-heavy)", background: "transparent", cursor: "pointer", border: "none" }}>
            <ChevronLeft size={20} color="var(--text-primary)" />
          </button>
          <div style={{ padding: "12px 24px", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", display: "flex", alignItems: "center", borderLeft: "1px solid var(--border-heavy)", borderRight: "1px solid var(--border-heavy)" }}>
            {getMonthLabel(currentMonth)}
          </div>
          <button onClick={() => navigateMonth(1)} style={{ padding: "12px 16px", background: "transparent", cursor: "pointer", border: "none" }}>
            <ChevronRight size={20} color="var(--text-primary)" />
          </button>
        </div>
      </header>
      
      <div className="rule-horizontal" style={{ marginBottom: "40px" }} />

      {isLoading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="editorial-card animate-reveal delay-100" style={{ height: "200px" }} />
          ))}
        </div>
      ) : data?.transactionCount === 0 ? (
        <div className="editorial-card" style={{ textAlign: "center", padding: "120px 20px" }}>
          <div className="display-large" style={{ color: "var(--text-tertiary)", marginBottom: "1rem" }}>NULL</div>
          <div className="eyebrow" style={{ marginBottom: "2rem" }}>No telemetry data found for period</div>
          <a href="/upload" className="btn btn-primary">
            INITIALIZE REGISTRY <ArrowUpRight size={18} />
          </a>
        </div>
      ) : (
        <>
          {/* Brutalist Data Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
            marginBottom: "40px"
          }}>
            {/* Total Spent */}
            <div className="editorial-card editorial-card-hover" style={{ display: "flex", flexDirection: "column" }}>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>Total Outflow</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1, letterSpacing: "-0.03em" }}>
                {formatCurrency(data?.totalSpent || 0)}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-tertiary)", marginTop: "8px", fontFamily: "var(--font-body)", fontWeight: 500 }}>
                Sum of all expenditures for {getMonthLabel(currentMonth)}
              </div>
              <div style={{ marginTop: "auto", paddingTop: "16px", display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, color: "var(--accent-coral)", textTransform: "uppercase" }}>
                <TrendingDown size={18} /> {data?.transactionCount || 0} Event Vectors
              </div>
            </div>

            {/* Top Category */}
            <div className="editorial-card editorial-card-hover" style={{ display: "flex", flexDirection: "column" }}>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>Primary Node</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1, wordBreak: "break-word" }}>
                {pieData[0]?.name || "UNKNOWN"}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-tertiary)", marginTop: "8px", fontFamily: "var(--font-body)", fontWeight: 500 }}>
                Your highest spending category this month
              </div>
              <div style={{ marginTop: "auto", paddingTop: "16px", fontFamily: "var(--font-body)", fontSize: "1.25rem", fontWeight: 700, color: "var(--brand-primary)" }}>
                {pieData[0] ? formatCurrency(pieData[0].value as number) : "—"}
              </div>
            </div>

            {/* Recurring */}
            <div className="editorial-card editorial-card-hover" style={{ display: "flex", flexDirection: "column" }}>
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>Cyclical Signatures</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
                {data?.recurring?.length || 0}
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-tertiary)", marginTop: "8px", fontFamily: "var(--font-body)", fontWeight: 500 }}>
                Detected recurring patterns & subscriptions
              </div>
              <div style={{ marginTop: "auto", paddingTop: "16px", display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: 700, color: "var(--accent-coral)", textTransform: "uppercase" }}>
                <RefreshCw size={16} /> {formatCurrency(data?.recurring?.reduce((s: number, r: { amount: number }) => s + r.amount, 0) || 0)} / CYC
              </div>
            </div>

            {/* Health Status */}
            <div className="editorial-card editorial-card-hover" style={{ display: "flex", flexDirection: "column" }}>
              <BrutalistStatusBar score={data?.healthScore} />
              <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", marginTop: "12px", fontFamily: "var(--font-body)", lineHeight: 1.4 }}>
                Composite: Diversity (30%) + Strategy (40%) + Consistency (30%)
              </div>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
            marginBottom: "80px"
          }}>
            {/* Brutalist Timeline Chart */}
            <div className="editorial-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px", borderBottom: "1px solid var(--border-light)", paddingBottom: "16px" }}>
                <h3 className="eyebrow">Temporal Outflow</h3>
              </div>
              <div style={{ height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.dailyTotals || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(v) => String(new Date(v).getDate()).padStart(2, "0")}
                      stroke="var(--text-tertiary)"
                      tick={{ fill: "var(--text-secondary)", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-body)" }}
                      axisLine={{ stroke: "var(--border-light)", strokeWidth: 1 }}
                      tickLine={{ stroke: "var(--border-light)", strokeWidth: 1 }}
                    />
                    <YAxis
                      tickFormatter={(v) => `₹${v.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`}
                      stroke="var(--text-tertiary)"
                      tick={{ fill: "var(--text-secondary)", fontSize: 10, fontWeight: 600, fontFamily: "var(--font-body)" }}
                      axisLine={{ stroke: "var(--border-light)", strokeWidth: 1 }}
                      tickLine={{ stroke: "var(--border-light)", strokeWidth: 1 }}
                      width={65}
                    />
                    <Tooltip
                      cursor={{ stroke: "var(--border-heavy)", strokeWidth: 1, strokeDasharray: "none" }}
                      contentStyle={{
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-heavy)",
                        borderRadius: "var(--radius-sm)",
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        boxShadow: "var(--shadow-hover)",
                        color: "var(--text-primary)"
                      }}
                      formatter={(value: unknown) => [formatCurrency(value as number), "OUT"]}
                      labelFormatter={(l) => new Date(l).toLocaleDateString("en-US", { day: "2-digit", month: "short" }).toUpperCase()}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="var(--brand-primary)" 
                      fill="var(--brand-dim)" 
                      strokeWidth={3} 
                      activeDot={{ r: 6, fill: "var(--brand-primary)", stroke: "var(--bg-secondary)", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "40px" }}>
              {/* Top Merchants - Brutalist List */}
              <div className="editorial-card" style={{ padding: "0", overflow: "hidden" }}>
                <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--border-light)", background: "var(--bg-primary)" }}>
                  <h3 className="eyebrow" style={{ color: "var(--brand-primary)" }}>Entity Breakdown</h3>
                </div>
                <div>
                  {(data?.topMerchants || []).slice(0, 6).map((m: { merchant: string; total: number }, i: number) => (
                    <div
                      key={m.merchant}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "20px 32px",
                        borderBottom: "1px solid var(--border-light)",
                        transition: "background 0.2s",
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = "var(--bg-primary)"}
                      onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 700, color: "var(--text-tertiary)", width: "32px" }}>
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                      <span style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textTransform: "capitalize" }}>
                        {m.merchant}
                      </span>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text-primary)", fontSize: "1.1rem" }}>
                        {formatCurrency(m.total)}
                      </span>
                    </div>
                  ))}
                  {(!data?.topMerchants || data.topMerchants.length === 0) && (
                    <div style={{ padding: "32px", color: "var(--text-tertiary)", fontFamily: "var(--font-body)", fontWeight: 600 }}>NO ENTITIES LOCATED</div>
                  )}
                </div>
              </div>

              {/* Composition Pie */}
              <div className="editorial-card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "24px", borderBottom: "1px solid var(--border-light)", paddingBottom: "16px" }}>
                  <h3 className="eyebrow">Structural Integrity</h3>
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  {pieData.length > 0 ? (
                    <>
                      <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="var(--bg-secondary)"
                            strokeWidth={3}
                            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                          >
                            {pieData.map((_, index) => (
                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              background: "var(--bg-secondary)",
                              border: "1px solid var(--border-heavy)",
                              borderRadius: "var(--radius-sm)",
                              fontFamily: "var(--font-body)",
                              fontWeight: 600,
                              boxShadow: "var(--shadow-hover)",
                              color: "var(--text-primary)"
                            }}
                            formatter={(value: unknown) => formatCurrency(value as number)}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none" }}>
                        <div className="eyebrow" style={{ fontSize: "10px" }}>DIST</div>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>{pieData.length}</div>
                      </div>
                    </>
                  ) : (
                    <div style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-display)", fontWeight: 700 }}>AWAITING DATA</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
