"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";

// Where each role lands when signed in.
export function roleHomePath(role?: string | null) {
  return role === "comedian" ? "/comic/dashboard" : "/dashboard";
}

export function accountLabelForRole(role?: string | null) {
  return role === "comedian" ? "Comic Portal" : "My Orders";
}

// Client-side auth state: reads the current session from the browser client and
// stays in sync as the user signs in / out.
export function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }
    const supabase = getSupabaseBrowserClient();
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [configured]);

  const role = (user?.user_metadata?.role as string | undefined) ?? null;

  return { user, role, loading, configured };
}
