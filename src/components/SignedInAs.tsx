"use client";

import { useSupabaseUser } from "@/lib/useSupabaseUser";

// Small "Signed in as …" line so a logged-in page feels personal.
export function SignedInAs() {
  const { user, configured } = useSupabaseUser();
  if (!configured || !user) return null;
  return (
    <p className="signed-in-as">
      Signed in as <strong>{user.email}</strong>
    </p>
  );
}
