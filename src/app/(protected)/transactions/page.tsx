"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Filter, Edit3, Check, X } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  "Food & Dining", "Shopping", "Transport", "Subscriptions", "Utilities",
  "Healthcare", "Education", "Entertainment", "Transfer", "Cash Withdrawal",
  "Uncategorized", "Other",
];

const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "var(--coral)",
  Shopping: "var(--blue)",
  Transport: "var(--amber)",
  Subscriptions: "var(--purple)",
  Utilities: "var(--emerald)",
  Healthcare: "#F472B6",
  Education: "#38BDF8",
  Entertainment: "#FB923C",
  Transfer: "var(--text-dim)",
  "Cash Withdrawal": "var(--text-secondary)",
  Uncategorized: "var(--text-dim)",
};

function formatCurrency(amount: number) {
  const sign = amount < 0 ? "-" : "+";
  const color = amount < 0 ? "var(--coral)" : "var(--mint-primary)";
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

export default function TransactionsPage() {
  const queryClient = useQueryClient();
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState("");

  const queryParams = new URLSearchParams();
  if (month) queryParams.set("month", month);
  if (category) queryParams.set("category", category);
  if (search) queryParams.set("search", search);
  queryParams.set("page", String(page));
  queryParams.set("limit", "30");

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", month, category, search, page],
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
    <div>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "28px",
          fontWeight: 700,
          letterSpacing: "-1px",
          marginBottom: "8px",
        }}
      >
        Transactions
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "28px" }}>
        Browse and manage your parsed transactions.
      </p>

      {/* Filters */}
      <div
        className="animate-fade-in-up"
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: "1 1 200px" }}>
          <Search
            size={16}
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }}
          />
          <input
            className="input"
            placeholder="Search merchants..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{ paddingLeft: "36px" }}
          />
        </div>
        <select
          className="input"
          value={month}
          onChange={(e) => { setMonth(e.target.value); setPage(1); }}
          style={{ width: "180px", flex: "0 0 auto" }}
        >
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            const label = d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
            return <option key={val} value={val}>{label}</option>;
          })}
        </select>
        <select
          className="input"
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          style={{ width: "180px", flex: "0 0 auto" }}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="glass-card animate-fade-in-up delay-100" style={{ overflow: "hidden" }}>
        {isLoading ? (
          <div style={{ padding: "40px" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton" style={{ height: "48px", marginBottom: "8px" }} />
            ))}
          </div>
        ) : !data?.transactions?.length ? (
          <div style={{ padding: "60px", textAlign: "center" }}>
            <Filter size={40} color="var(--text-dim)" style={{ marginBottom: "12px" }} />
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>No transactions found</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr 160px 140px 60px",
                gap: "16px",
                padding: "14px 20px",
                borderBottom: "1px solid var(--border)",
                fontSize: "11px",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--text-dim)",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              <span>Date</span>
              <span>Merchant</span>
              <span>Category</span>
              <span style={{ textAlign: "right" }}>Amount</span>
              <span />
            </div>

            {/* Rows */}
            {data.transactions.map((tx: Transaction) => {
              const { text, color } = formatCurrency(tx.amount);
              const catColor = CATEGORY_COLORS[tx.category] || "var(--text-dim)";
              const isEditing = editingId === tx.id;

              return (
                <div
                  key={tx.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr 160px 140px 60px",
                    gap: "16px",
                    padding: "14px 20px",
                    borderBottom: "1px solid var(--border)",
                    fontSize: "14px",
                    alignItems: "center",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-card-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                    {new Date(tx.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                  </span>
                  <div>
                    <div style={{ fontWeight: 500 }}>{tx.merchant}</div>
                    {tx.description && tx.description !== tx.merchant && (
                      <div style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "2px" }}>
                        {tx.description}
                      </div>
                    )}
                  </div>
                  <div>
                    {isEditing ? (
                      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                        <select
                          className="input"
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                          style={{ padding: "4px 8px", fontSize: "12px" }}
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <button
                          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--mint-primary)", padding: "2px" }}
                          onClick={() => updateCategory.mutate({ id: tx.id, newCategory: editCategory })}
                        >
                          <Check size={14} />
                        </button>
                        <button
                          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-dim)", padding: "2px" }}
                          onClick={() => setEditingId(null)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <span
                        className="badge"
                        style={{
                          background: `${catColor}15`,
                          color: catColor,
                          fontSize: "12px",
                        }}
                      >
                        {tx.category}
                      </span>
                    )}
                  </div>
                  <span style={{ textAlign: "right", fontWeight: 600, fontFamily: "var(--font-display)", color }}>
                    {text}
                  </span>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text-dim)",
                      padding: "4px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setEditingId(tx.id);
                      setEditCategory(tx.category);
                    }}
                    title="Edit category"
                  >
                    <Edit3 size={14} />
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "24px",
          }}
        >
          <button
            className="btn btn-ghost btn-sm"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span style={{ padding: "6px 16px", fontSize: "13px", color: "var(--text-secondary)" }}>
            Page {page} of {data.pagination.totalPages}
          </span>
          <button
            className="btn btn-ghost btn-sm"
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
