import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe, resolvePriceId } from "@/lib/stripe/config";
import { getSupabaseAdmin } from "@/lib/stripe/admin";

export async function POST(request: Request) {
  const { plan, yearly, locale } = await request.json();

  if (plan !== "pro" && plan !== "team") {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const priceId = resolvePriceId(plan, !!yearly);
  if (!priceId) {
    return NextResponse.json(
      { error: "Price not configured" },
      { status: 500 }
    );
  }

  const origin = request.headers.get("origin") || "http://localhost:3000";
  const localePrefix = locale || "en";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    let stripeCustomerId: string;
    const { data: existingCustomer } = await getSupabaseAdmin()
      .from("customers")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (existingCustomer) {
      stripeCustomerId = existingCustomer.stripe_customer_id;
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      await getSupabaseAdmin()
        .from("customers")
        .insert({ id: user.id, stripe_customer_id: customer.id });
      stripeCustomerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/${localePrefix}/dashboard?checkout=success`,
      cancel_url: `${origin}/${localePrefix}/pricing?checkout=canceled`,
      subscription_data: {
        metadata: { supabase_user_id: user.id },
      },
      locale: (localePrefix as "en" | "fr" | "es") || "auto",
    });

    return NextResponse.json({ url: session.url });
  }

  // Guest checkout — Stripe collects the email
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/${localePrefix}/pricing?checkout=success`,
    cancel_url: `${origin}/${localePrefix}/pricing?checkout=canceled`,
    locale: (localePrefix as "en" | "fr" | "es") || "auto",
  });

  return NextResponse.json({ url: session.url });
}
