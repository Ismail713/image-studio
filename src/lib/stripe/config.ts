import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

const PRICE_TO_PLAN: Record<
  string,
  { plan: "pro" | "team"; interval: "month" | "year" }
> = {
  [process.env.STRIPE_PRO_MONTHLY_PRICE_ID!]: {
    plan: "pro",
    interval: "month",
  },
  [process.env.STRIPE_PRO_YEARLY_PRICE_ID!]: {
    plan: "pro",
    interval: "year",
  },
  [process.env.STRIPE_TEAM_MONTHLY_PRICE_ID!]: {
    plan: "team",
    interval: "month",
  },
  [process.env.STRIPE_TEAM_YEARLY_PRICE_ID!]: {
    plan: "team",
    interval: "year",
  },
};

export function getPlanFromPriceId(priceId: string) {
  return PRICE_TO_PLAN[priceId] ?? { plan: "free" as const, interval: null };
}

export function resolvePriceId(
  plan: "pro" | "team",
  yearly: boolean
): string | null {
  if (plan === "pro")
    return yearly
      ? process.env.STRIPE_PRO_YEARLY_PRICE_ID!
      : process.env.STRIPE_PRO_MONTHLY_PRICE_ID!;
  if (plan === "team")
    return yearly
      ? process.env.STRIPE_TEAM_YEARLY_PRICE_ID!
      : process.env.STRIPE_TEAM_MONTHLY_PRICE_ID!;
  return null;
}
