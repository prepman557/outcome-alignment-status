import { useState } from "react";
import { Account, MOCK_ACCOUNTS } from "@/lib/accounts";

const STORAGE_KEY = "oab_accounts";

function loadAccounts(): Account[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
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
