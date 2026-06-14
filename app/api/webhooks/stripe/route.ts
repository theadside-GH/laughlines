import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });
  }

  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed":
        // Production implementation creates the paid order, order thread, and ledger row.
        break;
      case "charge.refunded":
      case "charge.dispute.created":
        // Production implementation pauses payout and alerts admins.
        break;
      case "account.updated":
        // Production implementation syncs Stripe Connect readiness for comedians.
        break;
      case "transfer.created":
        // Production implementation marks payout ledger rows as transfer scheduled.
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook verification failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
