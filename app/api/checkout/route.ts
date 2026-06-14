import { NextResponse } from "next/server";
import { z } from "zod";
import { findComedian } from "@/lib/data";
import { calculatePrice } from "@/lib/pricing";
import { getStripe } from "@/lib/stripe";

const checkoutSchema = z.object({
  comedianSlug: z.string(),
  serviceType: z.enum(["MAKE_ME_FUNNY", "MAKE_ME_LAUGH"]),
  occasion: z.string().min(2),
  audience: z.string().min(2),
  tone: z.string().min(2),
  keyDetails: z.string().min(10),
  avoidTopics: z.string().optional(),
  deadline: z.string(),
  rushPreset: z.enum(["24h", "48h", "72h"]).optional(),
  tipCents: z.number().int().min(0).default(0),
  discountPercent: z.number().min(0).max(100).default(0)
});

export async function POST(request: Request) {
  const payload = checkoutSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: "Invalid checkout payload", issues: payload.error.flatten() },
      { status: 400 }
    );
  }

  const comedian = findComedian(payload.data.comedianSlug);
  const service = comedian?.services.find(
    (item) => item.serviceType === payload.data.serviceType
  );

  if (!comedian || !service) {
    return NextResponse.json({ error: "Comedian or service not found" }, { status: 404 });
  }

  const price = calculatePrice(service, payload.data);
  const stripe = getStripe();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    allow_promotion_codes: true,
    success_url: `${siteUrl}/dashboard?checkout=success`,
    cancel_url: `${siteUrl}/request/${comedian.slug}?checkout=cancelled`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: price.totalCents,
          product_data: {
            name: `${comedian.name} - ${payload.data.serviceType}`,
            description: `${payload.data.occasion} custom comedy request`
          }
        }
      }
    ],
    metadata: {
      comedianId: comedian.id,
      comedianSlug: comedian.slug,
      serviceType: payload.data.serviceType,
      platformFeeCents: String(price.platformFeeCents),
      comedianGrossCents: String(price.comedianGrossCents)
    }
  });

  return NextResponse.json({
    checkoutUrl: session.url,
    sessionId: session.id,
    price
  });
}
