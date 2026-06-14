import { describe, expect, it } from "vitest";
import { calculatePrice } from "../src/lib/pricing";
import type { ServicePrice } from "../src/lib/types";

const service: ServicePrice = {
  serviceType: "MAKE_ME_FUNNY",
  basePriceCents: 10000,
  rushOptions: [{ preset: "48h", feeCents: 4000 }]
};

describe("calculatePrice", () => {
  it("calculates base, rush, tip, platform fee, and comic gross", () => {
    const price = calculatePrice(service, {
      rushPreset: "48h",
      tipCents: 1000,
      discountPercent: 0
    });

    expect(price.totalCents).toBe(15000);
    expect(price.platformFeeCents).toBe(1500);
    expect(price.comedianGrossCents).toBe(13500);
  });

  it("applies percent discounts before the 10 percent platform fee", () => {
    const price = calculatePrice(service, {
      rushPreset: "48h",
      tipCents: 1000,
      discountPercent: 20
    });

    expect(price.discountCents).toBe(3000);
    expect(price.totalCents).toBe(12000);
    expect(price.platformFeeCents).toBe(1200);
  });
});
