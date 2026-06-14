import { BRAND } from "./constants";
import type { OrderStatus } from "./types";

const transitions: Record<OrderStatus, OrderStatus[]> = {
  requested: ["paid", "refunded"],
  paid: ["accepted", "declined", "refunded"],
  accepted: ["in_progress", "refunded"],
  declined: ["refunded"],
  in_progress: ["delivered", "refunded"],
  delivered: ["revision_requested", "approved", "auto_completed", "refunded"],
  revision_requested: ["delivered", "refunded"],
  approved: ["payout_scheduled"],
  auto_completed: ["payout_scheduled"],
  payout_scheduled: [],
  refunded: []
};

export function canTransition(from: OrderStatus, to: OrderStatus) {
  return transitions[from].includes(to);
}

export function assertTransition(from: OrderStatus, to: OrderStatus) {
  if (!canTransition(from, to)) {
    throw new Error(`Order cannot move from ${from} to ${to}.`);
  }
}

export function canRequestRevision(currentRevisionCount: number) {
  return currentRevisionCount < BRAND.revisionLimit;
}
