"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";

const STORAGE_KEY = "imagestudio_trial_count";
const MAX_FREE_TRIES = 3;

export function useTrialLimit() {
  const { user, isLoading } = useAuth();
  const [triesUsed, setTriesUsed] = useState(0);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
    setTriesUsed(Number.isNaN(stored) ? 0 : stored);
  }, []);

  const canUse = !!user || triesUsed < MAX_FREE_TRIES;
  const triesRemaining = user ? Infinity : Math.max(0, MAX_FREE_TRIES - triesUsed);

  const recordUse = useCallback(() => {
    if (user) return;
    const next = triesUsed + 1;
    localStorage.setItem(STORAGE_KEY, String(next));
    setTriesUsed(next);
  }, [user, triesUsed]);

  return { canUse, triesUsed, triesRemaining, maxTries: MAX_FREE_TRIES, recordUse, isLoading };
}
