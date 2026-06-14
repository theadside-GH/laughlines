import { describe, expect, it } from "vitest";
import { assertTransition, canRequestRevision, canTransition } from "../src/lib/order-state";

describe("order-state rules", () => {
  it("allows the planned happy path", () => {
    expect(canTransition("requested", "paid")).toBe(true);
    expect(canTransition("paid", "accepted")).toBe(true);
    expect(canTransition("accepted", "in_progress")).toBe(true);
    expect(canTransition("in_progress", "delivered")).toBe(true);
    expect(canTransition("delivered", "approved")).toBe(true);
    expect(canTransition("approved", "payout_scheduled")).toBe(true);
  });

  it("rejects skipping delivery before payout", () => {
    expect(() => assertTransition("paid", "payout_scheduled")).toThrow(
      "Order cannot move from paid to payout_scheduled."
    );
  });

  it("enforces the one-revision rule", () => {
    expect(canRequestRevision(0)).toBe(true);
    expect(canRequestRevision(1)).toBe(false);
  });
});
