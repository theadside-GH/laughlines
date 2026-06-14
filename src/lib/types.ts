export type ServiceType = "MAKE_ME_FUNNY" | "MAKE_ME_LAUGH";

export type OrderStatus =
  | "requested"
  | "paid"
  | "accepted"
  | "declined"
  | "in_progress"
  | "delivered"
  | "revision_requested"
  | "approved"
  | "auto_completed"
  | "payout_scheduled"
  | "refunded";

export type RushPreset = "24h" | "48h" | "72h";

export type ServicePrice = {
  serviceType: ServiceType;
  basePriceCents: number;
  rushOptions: Array<{
    preset: RushPreset;
    feeCents: number;
  }>;
};

export type ComedianProfile = {
  id: string;
  slug: string;
  name: string;
  pronouns?: string;
  location: string;
  approved: boolean;
  featured: boolean;
  newest: boolean;
  mostUsed: boolean;
  rating: number;
  reviewCount: number;
  completedOrders: number;
  responseTime: string;
  categories: string[];
  credits: string[];
  bio: string;
  profileImage: string;
  introVideoUrl: string;
  socials: {
    instagram?: string;
    tiktok?: string;
    website?: string;
  };
  services: ServicePrice[];
  sampleJokes: string[];
  reviews: Array<{
    name: string;
    event: string;
    rating: number;
    quote: string;
  }>;
};

export type RequestFormDraft = {
  comedianId: string;
  serviceType: ServiceType;
  occasion: string;
  audience: string;
  tone: string;
  keyDetails: string;
  avoidTopics?: string;
  deadline: string;
  rushPreset?: RushPreset;
  tipCents?: number;
  discountPercent?: number;
};

export type PriceBreakdown = {
  baseCents: number;
  rushCents: number;
  tipCents: number;
  discountCents: number;
  subtotalCents: number;
  totalCents: number;
  platformFeeCents: number;
  comedianGrossCents: number;
};

export type OrderEvent = {
  status: OrderStatus;
  actor: "civilian" | "comedian" | "admin" | "system";
  at: string;
  note: string;
};
