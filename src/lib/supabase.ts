import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Newer Supabase projects issue a "publishable" key; older ones an "anon" key.
// Support both so this works regardless of when the project was created.
const supabasePublicKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// True once the public Supabase env vars are present. Used to keep the app in
// safe "demo mode" until a real project is connected.
export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabasePublicKey);
}

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient() {
  if (!supabaseUrl || !supabasePublicKey) {
    throw new Error("Missing Supabase public environment variables.");
  }
  // Reuse a single client so the auth session persists across the app.
  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabasePublicKey);
  }
  return browserClient;
}

export function getSupabaseServiceClient() {
  // Newer projects use a "secret" key; older ones the "service_role" key.
  const serviceRoleKey =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase service environment variables.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false
    }
  });
}
