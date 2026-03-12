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
  "#00E5A0", "#60A5FA", "#F59E0B", "#A78BFA", "#F87171",
  "#34D399", "#FBBF24", "#818CF8", "#FB923C", "#E879F9",
];

function formatCurrency(amount: number) {
  return `₹${Math.abs(amount).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function getMonthStr(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthLabel(monthStr: string) {
  const [y, m] = monthStr.split("-").map(Number);
  return new Date(y, m - 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

// Health Ring SVG component
function HealthRing({ score }: { score: number | null }) {
  const safeScore = score ?? 0;
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (safeScore / 100) * circumference;
  const color = safeScore >= 70 ? "var(--mint-primary)" : safeScore >= 40 ? "var(--amber)" : "var(--coral)";

  return (
    <div style={{ position: "relative", width: "160px", height: "160px" }}>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="60" fill="none" stroke="var(--border)" strokeWidth="10" />
        <circle
          cx="80"
          cy="80"
          r="60"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 80 80)"
          style={{ transition: "stroke-dashoffset 1s ease, stroke 0.3s", filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "36px",
            fontWeight: 800,
            color,
            lineHeight: 1,
          }}
        >
          {safeScore}
        </span>
        <span style={{ fontSize: "11px", color: "var(--text-dim)", marginTop: "4px" }}>
          Health Score
        </span>
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
      <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
        <p>Failed to load dashboard. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "36px",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-1px",
            }}
          >
            Dashboard
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>
            Your spending overview for {getMonthLabel(currentMonth)}
          </p>
        </div>

        {/* Month selector */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="btn btn-ghost" onClick={() => navigateMonth(-1)}>
            <ChevronLeft size={18} />
          </button>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "14px",
              fontWeight: 500,
              minWidth: "160px",
              textAlign: "center",
            }}
          >
            {getMonthLabel(currentMonth)}
          </span>
          <button className="btn btn-ghost" onClick={() => navigateMonth(1)}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton" style={{ height: "120px" }} />
          ))}
        </div>
      ) : data?.transactionCount === 0 ? (
        <div
          className="glass-card"
          style={{
            padding: "80px 40px",
            textAlign: "center",
          }}
        >
          <CreditCard size={48} style={{ color: "var(--text-dim)", marginBottom: "16px" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", marginBottom: "8px" }}>
            No transactions yet
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "24px" }}>
            Upload a bank statement to see your spending analytics here.
          </p>
          <a href="/upload" className="btn btn-primary">
            Upload Statement <ArrowUpRight size={16} />
          </a>
        </div>
      ) : (
        <>
          {/* Stats row */}
          <div
            className="animate-fade-in-up"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "28px",
            }}
          >
            <div className="glass-card" style={{ padding: "24px" }}>
              <div style={{ fontSize: "12px", color: "var(--text-dim)", marginBottom: "8px", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Total Spent
              </div>
              <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--coral)" }}>
                {formatCurrency(data?.totalSpent || 0)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "8px", fontSize: "12px", color: "var(--text-dim)" }}>
                <TrendingDown size={14} color="var(--coral)" />
                {data?.transactionCount || 0} transactions
              </div>
            </div>

            <div className="glass-card" style={{ padding: "24px" }}>
              <div style={{ fontSize: "12px", color: "var(--text-dim)", marginBottom: "8px", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Top Category
              </div>
              <div style={{ fontSize: "20px", fontWeight: 600, fontFamily: "var(--font-display)" }}>
                {pieData[0]?.name || "—"}
              </div>
              <div style={{ fontSize: "14px", color: "var(--mint-primary)", marginTop: "4px" }}>
                {pieData[0] ? formatCurrency(pieData[0].value as number) : "—"}
              </div>
            </div>

            <div className="glass-card" style={{ padding: "24px" }}>
              <div style={{ fontSize: "12px", color: "var(--text-dim)", marginBottom: "8px", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Recurring
              </div>
              <div style={{ fontSize: "20px", fontWeight: 600, fontFamily: "var(--font-display)" }}>
                {data?.recurring?.length || 0} subscriptions
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px", fontSize: "13px", color: "var(--amber)" }}>
                <RefreshCw size={13} />
                {formatCurrency(data?.recurring?.reduce((s: number, r: { amount: number }) => s + r.amount, 0) || 0)}/mo
              </div>
            </div>

            {/* Health ring card */}
            <div
              className="glass-card"
              style={{
                padding: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HealthRing score={data?.healthScore} />
            </div>
          </div>

          {/* Charts row */}
          <div
            className="animate-fade-in-up delay-200"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "28px",
            }}
          >
            {/* Spending Timeline */}
            <div className="glass-card" style={{ padding: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "16px", marginBottom: "20px", fontWeight: 600 }}>
                Spending Timeline
              </h3>
              <div style={{ height: "240px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.dailyTotals || []}>
                    <defs>
                      <linearGradient id="mintGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00E5A0" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(v) => new Date(v).getDate().toString()}
                      stroke="var(--text-dim)"
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                      stroke="var(--text-dim)"
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                      formatter={(value: unknown) => [formatCurrency(value as number), "Spent"]}
                      labelFormatter={(l) => new Date(l).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#00E5A0" fill="url(#mintGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Pie */}
            <div className="glass-card" style={{ padding: "24px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "16px", marginBottom: "20px", fontWeight: 600 }}>
                By Category
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div style={{ width: "180px", height: "180px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "var(--bg-card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                          fontSize: "13px",
                        }}
                        formatter={(value: unknown) => formatCurrency(value as number)}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {pieData.slice(0, 6).map((item, i) => (
                    <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: COLORS[i % COLORS.length] }} />
                      <span style={{ flex: 1, color: "var(--text-secondary)" }}>{item.name}</span>
                      <span style={{ fontWeight: 500, fontFamily: "var(--font-display)" }}>{formatCurrency(item.value as number)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Merchants */}
          <div className="glass-card animate-fade-in-up delay-300" style={{ padding: "24px" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "16px", marginBottom: "20px", fontWeight: 600 }}>
              <TrendingUp size={18} style={{ display: "inline", marginRight: "8px", color: "var(--mint-primary)" }} />
              Top Merchants
            </h3>
            <div style={{ display: "grid", gap: "12px" }}>
              {(data?.topMerchants || []).slice(0, 8).map((m: { merchant: string; total: number }, i: number) => (
                <div
                  key={m.merchant}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    background: "var(--bg-secondary)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--text-dim)",
                      width: "24px",
                    }}
                  >
                    #{i + 1}
                  </span>
                  <span style={{ flex: 1, fontSize: "14px" }}>{m.merchant}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--coral)" }}>
                    {formatCurrency(m.total)}
                  </span>
                  {/* Progress bar */}
                  <div style={{ width: "80px", height: "4px", background: "var(--border)", borderRadius: "2px" }}>
                    <div
                      style={{
                        height: "100%",
                        borderRadius: "2px",
                        background: COLORS[i % COLORS.length],
                        width: `${((m.total / (data?.totalSpent || 1)) * 100).toFixed(0)}%`,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
