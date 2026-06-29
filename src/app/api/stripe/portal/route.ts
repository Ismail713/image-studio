import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe/config";
import { getSupabaseAdmin } from "@/lib/stripe/admin";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: customer } = await getSupabaseAdmin()
    .from("customers")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (!customer) {
    return NextResponse.json({ error: "No billing account" }, { status: 404 });
  }

  const { locale } = await request.json().catch(() => ({ locale: "en" }));
  const origin = request.headers.get("origin") || "http://localhost:3000";

  const session = await stripe.billingPortal.sessions.create({
    customer: customer.stripe_customer_id,
    return_url: `${origin}/${locale || "en"}/dashboard`,
  });

  return NextResponse.json({ url: session.url });
}
