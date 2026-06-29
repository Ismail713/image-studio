import { createClient } from "@/lib/supabase/server";

export type UserSubscription = {
  plan: "free" | "pro" | "team";
  status: string | null;
  interval: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

export async function getUserSubscription(): Promise<UserSubscription> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      plan: "free",
      status: null,
      interval: null,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
    };
  }

  const { data } = await supabase
    .from("subscriptions")
    .select("plan, status, interval, current_period_end, cancel_at_period_end")
    .eq("user_id", user.id)
    .in("status", ["active", "trialing", "past_due"])
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!data) {
    return {
      plan: "free",
      status: null,
      interval: null,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
    };
  }

  return {
    plan: data.plan as "pro" | "team",
    status: data.status,
    interval: data.interval,
    currentPeriodEnd: data.current_period_end,
    cancelAtPeriodEnd: data.cancel_at_period_end,
  };
}
