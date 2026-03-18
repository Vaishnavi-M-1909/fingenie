"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Filter, Edit3, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useBank } from "@/lib/contexts/BankContext";

const CATEGORIES = [
  "Food & Dining", "Shopping", "Transport", "Subscriptions", "Utilities",
  "Healthcare", "Education", "Entertainment", "Transfer", "Cash Withdrawal",
  "Uncategorized", "Other",
];

const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "var(--accent-coral)",
  Shopping: "var(--brand-primary)",
  Transport: "#FFC700",
  Subscriptions: "#00E57A",
  Utilities: "#00F0FF",
  Healthcare: "#F472B6",
  Education: "#38BDF8",
  Entertainment: "#FB923C",
  Transfer: "var(--text-tertiary)",
  "Cash Withdrawal": "#8B5CF6",
  Uncategorized: "#EF4444",
};

function formatCurrency(amount: number) {
  const sign = amount < 0 ? "-" : "+";
  const color = amount < 0 ? "var(--accent-coral)" : "var(--brand-primary)";
  return { text: `${sign}₹${Math.abs(amount).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, color };
}

interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  description?: string;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function TransactionsPage() {
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { activeBankAccountId } = useBank();
  const [editCategory, setEditCategory] = useState("");

  const queryParams = new URLSearchParams();
  if (month) queryParams.set("month", month);
  if (category) queryParams.set("category", category);
  if (search) queryParams.set("search", search);
  if (activeBankAccountId) queryParams.set("bankAccountId", activeBankAccountId);
  queryParams.set("page", String(page));
  queryParams.set("limit", "30");

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", month, category, search, page, activeBankAccountId],
    queryFn: async () => {
      const res = await fetch(`/api/transactions?${queryParams}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const updateCategory = useMutation({
    mutationFn: async ({ id, newCategory }: { id: string; newCategory: string }) => {
      const res = await fetch(`/api/transactions/${id}/category`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategory }),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setEditingId(null);
    },
  });

  return (
    <div className="container-editorial animate-reveal" style={{ maxWidth: "1200px" }}>
      <header style={{ marginBottom: "40px" }}>
        <h1 className="display-large" style={{ color: "var(--text-primary)", marginBottom: "8px" }}>
          Transactions
        </h1>
        <p className="eyebrow" style={{ color: "var(--text-tertiary)", textTransform: "none", fontSize: "1.05rem", fontFamily: "var(--font-body)" }}>
          Your chronological transaction history
        </p>
      </header>
      
      <div className="rule-horizontal" style={{ marginBottom: "32px" }} />

      {/* Sharp Brutalist Filters */}
      <div
        className="animate-fade-in-up"
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "32px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: "1 1 240px", minWidth: "0" }}>
          <Search size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }} />
          <input
            className="input"
            placeholder="Search merchants or descriptions..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{ paddingLeft: "42px", height: "100%" }}
          />
        </div>
        <select
          className="input"
          value={month}
          onChange={(e) => { setMonth(e.target.value); setPage(1); }}
          style={{ 
            flex: isMobile ? "1 1 calc(50% - 4px)" : "0 0 auto", 
            width: isMobile ? "auto" : "200px",
            borderLeft: "4px solid var(--text-tertiary)"
          }}
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            const label = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
            return <option key={val} value={val}>{label}</option>;
          })}
        </select>
        <select
          className="input"
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          style={{ 
            flex: isMobile ? "1 1 calc(50% - 4px)" : "0 0 auto", 
            width: isMobile ? "auto" : "200px",
            borderLeft: "4px solid var(--brand-primary)",
            fontWeight: 600
          }}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="editorial-card animate-fade-in-up delay-100" style={{ overflow: "hidden", padding: 0 }}>
        {isLoading ? (
          <div style={{ padding: "0" }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ height: "64px", borderBottom: "1px solid var(--border-light)", background: i % 2 === 0 ? "var(--bg-secondary)" : "var(--bg-primary)" }} className="animate-reveal" />
            ))}
          </div>
        ) : !data?.transactions?.length ? (
          <div style={{ padding: "80px 20px", textAlign: "center" }}>
            <Filter size={64} style={{ color: "var(--text-tertiary)", marginBottom: "24px", margin: "0 auto" }} />
            <div className="display-large" style={{ fontSize: "2rem", color: "var(--text-tertiary)", marginBottom: "1rem" }}>No Transactions Found</div>
            <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)", fontWeight: 500 }}>Try adjusting your search or filters</p>
          </div>
        ) : isMobile ? (
          /* ─── MOBILE: Brutalist Card Layout ─── */
          <div style={{ display: "flex", flexDirection: "column", background: "var(--border-heavy)", gap: "2px" }}>
            {data.transactions.map((tx: Transaction) => {
              const { text, color } = formatCurrency(tx.amount);
              const catColor = CATEGORY_COLORS[tx.category] || "var(--text-tertiary)";
              const isEditing = editingId === tx.id;

              return (
                <div key={tx.id} style={{ padding: "20px 16px", background: "var(--bg-primary)", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textTransform: "uppercase", color: "var(--text-primary)" }}>{tx.merchant}</div>
                      <div className="eyebrow" style={{ color: "var(--text-tertiary)", marginTop: "4px" }}>
                        {new Date(tx.date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}
                      </div>
                    </div>
                    <span style={{ fontWeight: 800, fontFamily: "var(--font-display)", color, fontSize: "1.25rem", whiteSpace: "nowrap", marginLeft: "12px" }}>
                      {text}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {isEditing ? (
                      <div style={{ display: "flex", gap: "8px", alignItems: "center", flex: 1 }}>
                        <select
                          className="input"
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                          style={{ 
                            padding: "8px 12px", 
                            fontSize: "0.85rem", 
                            flex: 1,
                            borderLeft: "3px solid var(--brand-primary)",
                            background: "var(--bg-primary)"
                          }}
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c.toUpperCase()}</option>
                          ))}
                        </select>
                        <button className="btn btn-primary" style={{ padding: "10px" }} onClick={() => updateCategory.mutate({ id: tx.id, newCategory: editCategory })}>
                          <Check size={18} />
                        </button>
                        <button className="btn btn-secondary" style={{ padding: "10px" }} onClick={() => setEditingId(null)}>
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className={tx.category === "Uncategorized" ? "animate-pulse-soft" : ""} style={{ padding: "4px 8px", background: "var(--bg-primary)", border: `1px solid ${catColor}`, fontFamily: "var(--font-display)", fontSize: "0.75rem", fontWeight: 700, color: catColor, textTransform: "uppercase" }}>
                          {tx.category}
                        </span>
                        <button
                          style={{ background: "transparent", border: "1px solid var(--border-heavy)", cursor: "pointer", color: "var(--text-primary)", padding: "6px", display: "flex" }}
                          onClick={() => { setEditingId(tx.id); setEditCategory(tx.category); }}
                        >
                          <Edit3 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ─── DESKTOP: Stark Table Layout ─── */
          <>
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr 200px 140px 80px",
                gap: "24px",
                padding: "20px 32px",
                borderBottom: "1px solid var(--border-light)",
                background: "var(--bg-secondary)",
              }}
            >
              <span className="eyebrow" style={{ color: "var(--text-secondary)" }}>Date</span>
              <span className="eyebrow" style={{ color: "var(--text-secondary)" }}>Merchant</span>
              <span className="eyebrow" style={{ color: "var(--text-secondary)" }}>Category</span>
              <span className="eyebrow" style={{ textAlign: "right", color: "var(--text-secondary)" }}>Amount</span>
              <span />
            </div>

            {/* Rows */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {data.transactions.map((tx: Transaction, idx: number) => {
                const { text, color } = formatCurrency(tx.amount);
                const catColor = CATEGORY_COLORS[tx.category] || "var(--text-tertiary)";
                const isEditing = editingId === tx.id;

                return (
                  <div
                    key={tx.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "100px 1fr 200px 140px 80px",
                      gap: "24px",
                      padding: "20px 32px",
                      borderBottom: "1px solid var(--border-light)",
                      alignItems: "center",
                      transition: "background 0.15s",
                      background: idx % 2 === 0 ? "transparent" : "var(--bg-secondary)",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-primary)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 === 0 ? "transparent" : "var(--bg-secondary)"; }}
                  >
                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                      {new Date(tx.date).toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
                    </span>
                    <div style={{ minWidth: 0, paddingRight: "16px" }}>
                      <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1.05rem", textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tx.merchant}</div>
                      {tx.description && tx.description !== tx.merchant && (
                        <div style={{ fontSize: "13px", fontFamily: "var(--font-body)", color: "var(--text-tertiary)", marginTop: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {tx.description}
                        </div>
                      )}
                    </div>
                    <div>
                      {isEditing ? (
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                          <select
                            className="input"
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value)}
                            style={{ 
                              padding: "6px 10px", 
                              fontSize: "0.85rem", 
                              background: "var(--bg-primary)", 
                              color: "var(--text-primary)",
                              borderLeft: "3px solid var(--brand-primary)",
                              fontWeight: 600
                            }}
                          >
                            {CATEGORIES.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                          <button style={{ border: "1px solid var(--border-light)", background: "var(--brand-primary)", borderRadius: "var(--radius-sm)", color: "var(--bg-primary)", padding: "6px", cursor: "pointer" }} onClick={() => updateCategory.mutate({ id: tx.id, newCategory: editCategory })}>
                            <Check size={16} />
                          </button>
                          <button style={{ border: "1px solid var(--border-light)", background: "var(--bg-primary)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", padding: "6px", cursor: "pointer" }} onClick={() => setEditingId(null)}>
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <span 
                          className={tx.category === "Uncategorized" ? "animate-pulse-soft" : ""}
                          style={{ 
                            padding: "6px 10px", 
                            border: `1px solid ${catColor}`, 
                            background: tx.category === "Uncategorized" ? `${catColor}15` : "transparent",
                            borderRadius: "var(--radius-sm)", 
                            fontFamily: "var(--font-body)", 
                            fontSize: "0.75rem", 
                            fontWeight: tx.category === "Uncategorized" ? 800 : 600, 
                            color: catColor,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            boxShadow: tx.category === "Uncategorized" ? `0 0 10px ${catColor}30` : "none"
                          }}
                        >
                          {tx.category === "Uncategorized" && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: catColor, display: "inline-block" }} />}
                          {tx.category}
                        </span>
                      )}
                    </div>
                    <span style={{ textAlign: "right", fontWeight: 700, fontFamily: "var(--font-display)", color, fontSize: "1.1rem" }}>
                      {text}
                    </span>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <button
                        style={{
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border-light)",
                          borderRadius: "var(--radius-sm)",
                          cursor: "pointer",
                          color: "var(--text-secondary)",
                          padding: "8px",
                          display: "flex",
                          justifyContent: "center",
                          transition: "all 0.2s"
                        }}
                        onMouseOver={e => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.background = "var(--bg-primary)"; e.currentTarget.style.borderColor = "var(--text-tertiary)"; }}
                        onMouseOut={e => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "var(--bg-secondary)"; e.currentTarget.style.borderColor = "var(--border-light)"; }}
                        onClick={(e) => { e.stopPropagation(); setEditingId(tx.id); setEditCategory(tx.category); }}
                        title="Edit Category"
                      >
                        <Edit3 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Brutalist Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px", border: "1px solid var(--border-light)", borderRadius: "var(--radius-sm)", background: "var(--bg-primary)", overflow: "hidden" }}>
          <button
            style={{ padding: "12px 24px", background: "transparent", border: "none", borderRight: "1px solid var(--border-light)", fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 600, cursor: page <= 1 ? "not-allowed" : "pointer", opacity: page <= 1 ? 0.3 : 1, color: "var(--text-primary)" }}
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span style={{ padding: "0 24px", fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Page {page} of {data.pagination.totalPages}
          </span>
          <button
            style={{ padding: "12px 24px", background: "transparent", border: "none", borderLeft: "1px solid var(--border-light)", fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 600, cursor: page >= data.pagination.totalPages ? "not-allowed" : "pointer", opacity: page >= data.pagination.totalPages ? 0.3 : 1, color: "var(--text-primary)" }}
            disabled={page >= data.pagination.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
