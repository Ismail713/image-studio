import { NextResponse } from "next/server";
import { stripe, getPlanFromPriceId } from "@/lib/stripe/config";
import { getSupabaseAdmin } from "@/lib/stripe/admin";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.customer && session.subscription) {
        const userId =
          session.metadata?.supabase_user_id ||
          (await getCustomerUserId(session.customer as string));
        if (userId) {
          await getSupabaseAdmin().from("customers").upsert({
            id: userId,
            stripe_customer_id: session.customer as string,
          });
        }
      }
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId =
        subscription.metadata?.supabase_user_id ||
        (await getCustomerUserId(subscription.customer as string));

      if (userId) {
        const item = subscription.items.data[0];
        const priceId = item?.price.id;
        const { plan, interval } = getPlanFromPriceId(priceId);

        await getSupabaseAdmin().from("subscriptions").upsert({
          id: subscription.id,
          user_id: userId,
          status: subscription.status,
          price_id: priceId,
          plan,
          interval,
          current_period_start: new Date(
            item.current_period_start * 1000
          ).toISOString(),
          current_period_end: new Date(
            item.current_period_end * 1000
          ).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
          canceled_at: subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000).toISOString()
            : null,
          updated_at: new Date().toISOString(),
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await getSupabaseAdmin()
        .from("subscriptions")
        .update({
          status: "canceled",
          canceled_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", subscription.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}

async function getCustomerUserId(
  stripeCustomerId: string
): Promise<string | null> {
  const { data } = await getSupabaseAdmin()
    .from("customers")
    .select("id")
    .eq("stripe_customer_id", stripeCustomerId)
    .single();
  return data?.id ?? null;
}
