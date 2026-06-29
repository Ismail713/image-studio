import { createClient } from "@supabase/supabase-js";

type Database = {
  public: {
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Tables: {
      customers: {
        Row: { id: string; stripe_customer_id: string; created_at: string };
        Insert: { id: string; stripe_customer_id: string };
        Update: Partial<{ id: string; stripe_customer_id: string }>;
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          status: string;
          price_id: string | null;
          plan: string;
          interval: string | null;
          current_period_start: string | null;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          canceled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          status: string;
          price_id?: string | null;
          plan?: string;
          interval?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          canceled_at?: string | null;
          updated_at?: string;
        };
        Update: Partial<{
          status: string;
          price_id: string | null;
          plan: string;
          interval: string | null;
          current_period_start: string | null;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          canceled_at: string | null;
          updated_at: string;
        }>;
        Relationships: [];
      };
    };
  };
};

let _supabaseAdmin: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _supabaseAdmin;
}
