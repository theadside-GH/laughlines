"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";

// Placeholder for the real Stripe checkout. Instead of a silent dead button,
// it tells the visitor payments aren't wired yet.
export function CheckoutButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <button
        className="button primary"
        type="button"
        onClick={() => setClicked(true)}
      >
        <CreditCard size={18} aria-hidden="true" />
        Continue to checkout
      </button>
      {clicked ? (
        <p className="checkout-note">
          Payments aren&apos;t live yet — this is a preview. Checkout turns on
          once Stripe is connected.
        </p>
      ) : null}
    </>
  );
}
