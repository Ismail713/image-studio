"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";

type SubscriptionInfo = {
  plan: "free" | "pro" | "team";
  status: string | null;
  isLoading: boolean;
};

export function useSubscription(): SubscriptionInfo {
  const { user, isLoading: authLoading } = useAuth();
  const [plan, setPlan] = useState<"free" | "pro" | "team">("free");
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setPlan("free");
      setStatus(null);
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    supabase
      .from("subscriptions")
      .select("plan, status")
      .eq("user_id", user.id)
      .in("status", ["active", "trialing", "past_due"])
      .order("created_at", { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => {
        setPlan((data?.plan as "pro" | "team") ?? "free");
        setStatus(data?.status ?? null);
        setIsLoading(false);
      });
  }, [user, authLoading]);

  return { plan, status, isLoading };
}
