import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

export default async function createClient(): Promise<typeof SupabaseClient> {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
