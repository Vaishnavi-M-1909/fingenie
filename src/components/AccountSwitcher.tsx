"use client";

import { useBank } from "@/lib/contexts/BankContext";
import { ChevronDown, CreditCard, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function AccountSwitcher() {
  const { activeBankAccountId, setActiveBankAccountId, bankAccounts, isLoading } = useBank();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeAccount = bankAccounts.find((a) => a.id === activeBankAccountId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading || bankAccounts.length === 0) return null;

  const itemStyle: React.CSSProperties = {
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--text-secondary)",
    borderBottom: "1px solid var(--border-light)",
  };

  return (
    <div style={{ padding: "16px 20px", position: "relative" }} ref={dropdownRef}>
      <div className="eyebrow" style={{ marginBottom: "8px" }}>Account Context</div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          background: "var(--bg-secondary)",
          border: "2px solid var(--border-heavy)",
          borderRadius: "var(--radius-sm)",
          cursor: "pointer",
          transition: "all 0.2s",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
          <CreditCard size={18} style={{ color: "var(--brand-primary)", flexShrink: 0 }} />
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {activeAccount ? activeAccount.bankName : "All Accounts"}
          </div>
        </div>
        <ChevronDown 
          size={16} 
          style={{ 
            transition: "transform 0.2s", 
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            color: "var(--text-tertiary)"
          }} 
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% - 40px)",
            left: "20px",
            right: "20px",
            background: "var(--bg-primary)",
            border: "2px solid var(--border-heavy)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "8px 8px 0 var(--border-heavy)",
            zIndex: 100,
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              ...itemStyle,
              color: !activeBankAccountId ? "var(--brand-primary)" : "var(--text-secondary)",
              background: !activeBankAccountId ? "var(--bg-secondary)" : "transparent",
            }}
            onClick={() => {
              setActiveBankAccountId(null);
              setIsOpen(false);
            }}
          >
            All Accounts
            {!activeBankAccountId && <Check size={16} />}
          </div>

          {bankAccounts.map((account) => (
            <div
              key={account.id}
              style={{
                ...itemStyle,
                color: activeBankAccountId === account.id ? "var(--brand-primary)" : "var(--text-secondary)",
                background: activeBankAccountId === account.id ? "var(--bg-secondary)" : "transparent",
              }}
              onClick={() => {
                setActiveBankAccountId(account.id);
                setIsOpen(false);
              }}
            >
              <div style={{ minWidth: 0, overflow: "hidden" }}>
                <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{account.bankName}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "2px" }}>
                  {account.accountNumber.slice(-4).padStart(account.accountNumber.length, "•")}
                </div>
              </div>
              {activeBankAccountId === account.id && <Check size={16} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
