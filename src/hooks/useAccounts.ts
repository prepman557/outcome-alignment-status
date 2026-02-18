import { useState } from "react";
import { Account, MOCK_ACCOUNTS } from "@/lib/accounts";

const STORAGE_KEY = "oab_accounts";

function isValidAccount(a: unknown): a is Account {
  if (!a || typeof a !== "object") return false;
  const acc = a as Record<string, unknown>;
  return (
    typeof acc.id === "string" &&
    typeof acc.companyName === "string" &&
    typeof acc.expansion === "object" &&
    acc.expansion !== null
  );
}

function loadAccounts(): Account[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.every(isValidAccount)) {
        return parsed;
      }
    }
  } catch {}
  // Clear stale/invalid data and fall back to mock data
  localStorage.removeItem(STORAGE_KEY);
  return MOCK_ACCOUNTS;
}

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>(loadAccounts);

  const updateAccount = (updated: Account) => {
    setAccounts((prev) => {
      const next = prev.map((a) => (a.id === updated.id ? updated : a));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { accounts, updateAccount };
}
