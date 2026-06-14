import { BRAND } from "./constants";
import type { PriceBreakdown, RequestFormDraft, ServicePrice } from "./types";

export function money(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(cents / 100);
}

export function calculatePrice(
  service: ServicePrice,
  draft: Pick<RequestFormDraft, "rushPreset" | "tipCents" | "discountPercent">
): PriceBreakdown {
  const baseCents = service.basePriceCents;
  const rushCents =
    service.rushOptions.find((option) => option.preset === draft.rushPreset)
      ?.feeCents ?? 0;
  const tipCents = Math.max(0, draft.tipCents ?? 0);
  const subtotalCents = baseCents + rushCents + tipCents;
  const discountPercent = Math.min(Math.max(draft.discountPercent ?? 0, 0), 100);
  const discountCents = Math.round(subtotalCents * (discountPercent / 100));
  const totalCents = subtotalCents - discountCents;
  const platformFeeCents = Math.round(totalCents * (BRAND.platformFeePercent / 100));
  const comedianGrossCents = totalCents - platformFeeCents;

  return {
    baseCents,
    rushCents,
    tipCents,
    discountCents,
    subtotalCents,
    totalCents,
    platformFeeCents,
    comedianGrossCents
  };
}
