"use client";

import { useBank } from "@/lib/contexts/BankContext";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit3, Trash2, Check, X, AlertCircle } from "lucide-react";

export default function AccountsSettingsPage() {
  const { bankAccounts, isLoading, activeBankAccountId, setActiveBankAccountId } = useBank();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
  });

  const updateAccount = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await fetch(`/api/bank-account/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update account");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
      setEditingId(null);
    },
  });

  const deleteAccount = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/bank-account/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete account");
      return res.json();
    },
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
      if (activeBankAccountId === deletedId) {
        setActiveBankAccountId(null);
      }
    },
  });

  const handleEdit = (account: any) => {
    setEditingId(account.id);
    setEditForm({
      accountHolderName: account.accountHolderName,
      accountNumber: account.accountNumber,
      bankName: account.bankName,
    });
  };

  if (isLoading) return <div className="animate-pulse" style={{ padding: "40px" }}>Loading accounts...</div>;

  return (
    <div className="animate-reveal">

      <div className="rule-horizontal" style={{ marginBottom: "32px" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {bankAccounts.length === 0 ? (
          <div style={{ padding: "40px", border: "2px dashed var(--border-light)", textAlign: "center", borderRadius: "12px" }}>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px" }}>No accounts registered yet.</p>
            <a href="/setup-bank" className="btn btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>Add Your First Account</a>
          </div>
        ) : (
          bankAccounts.map((account) => {
            const isEditing = editingId === account.id;

            return (
              <div
                key={account.id}
                className="editorial-card"
                style={{
                  padding: "24px",
                  borderLeft: `6px solid ${activeBankAccountId === account.id ? "var(--brand-primary)" : "var(--border-heavy)"}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {isEditing ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label className="eyebrow" style={{ marginBottom: "8px", display: "block" }}>Bank Name</label>
                        <input
                          className="input"
                          value={editForm.bankName}
                          onChange={(e) => setEditForm({ ...editForm, bankName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="eyebrow" style={{ marginBottom: "8px", display: "block" }}>Account Number</label>
                        <input
                          className="input"
                          value={editForm.accountNumber}
                          onChange={(e) => setEditForm({ ...editForm, accountNumber: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="eyebrow" style={{ marginBottom: "8px", display: "block" }}>Holder Name</label>
                      <input
                        className="input"
                        value={editForm.accountHolderName}
                        onChange={(e) => setEditForm({ ...editForm, accountHolderName: e.target.value })}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                      <button
                        className="btn btn-primary"
                        style={{ padding: "8px 24px" }}
                        onClick={() => updateAccount.mutate({ id: account.id, data: editForm })}
                      >
                        <Check size={18} style={{ marginRight: "8px" }} /> SAVE
                      </button>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: "8px 24px" }}
                        onClick={() => setEditingId(null)}
                      >
                        <X size={18} style={{ marginRight: "8px" }} /> CANCEL
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "4px" }}>
                        {account.bankName}
                      </h3>
                      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                        <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{account.accountNumber}</span>
                        <span style={{ height: "4px", width: "4px", borderRadius: "50%", background: "var(--text-tertiary)" }} />
                        <span className="eyebrow" style={{ color: "var(--text-tertiary)" }}>{account.accountHolderName}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <button
                        style={{ background: "transparent", border: "1px solid var(--border-light)", padding: "10px", cursor: "pointer", color: "var(--text-secondary)" }}
                        onClick={() => handleEdit(account)}
                        title="Edit Account"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        style={{ background: "transparent", border: "1px solid var(--border-light)", padding: "10px", cursor: "pointer", color: "var(--accent-coral)" }}
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this account? This will orphan all its statements.")) {
                            deleteAccount.mutate(account.id);
                          }
                        }}
                        title="Delete Account"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div style={{ marginTop: "40px", display: "flex", justifyContent: "flex-end" }}>
        <a href="/setup-bank" className="btn btn-secondary" style={{ textDecoration: "none" }}>+ Add Another Account</a>
      </div>
    </div>
  );
}
