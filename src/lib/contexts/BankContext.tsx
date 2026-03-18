"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

interface BankContextType {
  activeBankAccountId: string | null;
  setActiveBankAccountId: (id: string | null) => void;
  bankAccounts: BankAccount[];
  isLoading: boolean;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export function BankProvider({ children }: { children: ReactNode }) {
  const [activeBankAccountId, setActiveBankAccountIdState] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["bank-accounts"],
    queryFn: async () => {
      const res = await fetch("/api/bank-account");
      if (!res.ok) throw new Error("Failed to fetch bank accounts");
      return res.json();
    },
  });

  const bankAccounts = data?.bankAccounts || [];

  useEffect(() => {
    // Load persisted selection
    const saved = localStorage.getItem("activeBankAccountId");
    if (saved && saved !== "null") {
      // Verify account still exists
      if (bankAccounts.length > 0 && !bankAccounts.find((a: BankAccount) => a.id === saved)) {
        localStorage.removeItem("activeBankAccountId");
        setActiveBankAccountIdState(null);
      } else {
        setActiveBankAccountIdState(saved);
      }
    }
  }, [bankAccounts]);

  const setActiveBankAccountId = (id: string | null) => {
    setActiveBankAccountIdState(id);
    if (id) {
      localStorage.setItem("activeBankAccountId", id);
    } else {
      localStorage.removeItem("activeBankAccountId");
    }
  };

  return (
    <BankContext.Provider value={{ activeBankAccountId, setActiveBankAccountId, bankAccounts, isLoading }}>
      {children}
    </BankContext.Provider>
  );
}

export function useBank() {
  const context = useContext(BankContext);
  if (context === undefined) {
    throw new Error("useBank must be used within a BankProvider");
  }
  return context;
}
