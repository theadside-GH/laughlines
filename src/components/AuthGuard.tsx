"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { roleHomePath, useSupabaseUser } from "@/lib/useSupabaseUser";

// Client-side gate for account pages. Redirects signed-out visitors to /join,
// and sends the wrong role to their own dashboard. In demo mode (no Supabase
// env) it renders children so preview builds still show the page.
export function AuthGuard({
  role,
  children
}: {
  role?: "civilian" | "comedian";
  children: React.ReactNode;
}) {
  const { user, role: userRole, loading, configured } = useSupabaseUser();
  const router = useRouter();

  useEffect(() => {
    if (!configured || loading) return;
    if (!user) {
      router.replace("/join");
    } else if (role && (userRole ?? "civilian") !== role) {
      router.replace(roleHomePath(userRole));
    }
  }, [user, userRole, loading, configured, role, router]);

  if (!configured) return <>{children}</>;
  if (loading) return <p className="auth-loading">Loading…</p>;
  if (!user) return <p className="auth-loading">Redirecting…</p>;
  if (role && (userRole ?? "civilian") !== role) {
    return <p className="auth-loading">Redirecting…</p>;
  }
  return <>{children}</>;
}
