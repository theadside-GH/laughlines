// Dummy leaderboard data. In production these lists are recomputed weekly:
//   - topRoastComics   -> ranked by paid orders in the last 7 days
//   - fastestComics    -> ranked by median delivery time in the last 7 days
// For now everything here is static placeholder data.

export type RankedComic = {
  rank: number;
  name: string;
  location: string;
  style: string;
  // "top 20" metric
  weeklyOrders?: number;
  rating?: number;
  // "fastest" metric
  avgTurnaround?: string;
  onTimeRate?: number;
};

export const topRoastComics: RankedComic[] = [
  { rank: 1, name: "Dev Santos", location: "Austin, TX", style: "High-energy roasts", weeklyOrders: 214, rating: 4.9 },
  { rank: 2, name: "Maya Ross", location: "Brooklyn, NY", style: "Dry, surgical wit", weeklyOrders: 198, rating: 4.9 },
  { rank: 3, name: "Ray Okafor", location: "Chicago, IL", style: "Crowd-work roasts", weeklyOrders: 181, rating: 4.8 },
  { rank: 4, name: "Nina Volkov", location: "Los Angeles, CA", style: "Deadpan burns", weeklyOrders: 173, rating: 4.8 },
  { rank: 5, name: "Marcus Webb", location: "Atlanta, GA", style: "Storytelling roasts", weeklyOrders: 166, rating: 4.9 },
  { rank: 6, name: "Sofia Delgado", location: "Miami, FL", style: "Bilingual burns", weeklyOrders: 158, rating: 4.7 },
  { rank: 7, name: "Jamal Carter", location: "Detroit, MI", style: "Sharp one-liners", weeklyOrders: 151, rating: 4.8 },
  { rank: 8, name: "Lena Bright", location: "Los Angeles, CA", style: "Clean-but-lethal", weeklyOrders: 147, rating: 4.7 },
  { rank: 9, name: "Theo Nakamura", location: "Seattle, WA", style: "Absurdist roasts", weeklyOrders: 139, rating: 4.8 },
  { rank: 10, name: "Priya Kapoor", location: "Toronto, ON", style: "Corporate roasts", weeklyOrders: 132, rating: 4.7 },
  { rank: 11, name: "Bella Cruz", location: "San Diego, CA", style: "Warm-hearted burns", weeklyOrders: 128, rating: 4.6 },
  { rank: 12, name: "Omar Haddad", location: "Houston, TX", style: "Political-free roasts", weeklyOrders: 121, rating: 4.7 },
  { rank: 13, name: "Grace Liu", location: "New York, NY", style: "Observational burns", weeklyOrders: 117, rating: 4.6 },
  { rank: 14, name: "Sam Whitfield", location: "Nashville, TN", style: "Southern-charm roasts", weeklyOrders: 112, rating: 4.7 },
  { rank: 15, name: "Aisha Rahman", location: "Boston, MA", style: "Quick-fire wit", weeklyOrders: 108, rating: 4.6 },
  { rank: 16, name: "Diego Moreno", location: "Phoenix, AZ", style: "Family-roast specialist", weeklyOrders: 101, rating: 4.6 },
  { rank: 17, name: "Chloe Bennett", location: "Denver, CO", style: "Wholesome takedowns", weeklyOrders: 96, rating: 4.5 },
  { rank: 18, name: "Tyler Brooks", location: "Portland, OR", style: "Improv roasts", weeklyOrders: 90, rating: 4.6 },
  { rank: 19, name: "Fatima Noor", location: "Minneapolis, MN", style: "Understated burns", weeklyOrders: 85, rating: 4.5 },
  { rank: 20, name: "Leo Castellano", location: "Las Vegas, NV", style: "Vegas-style roasts", weeklyOrders: 81, rating: 4.6 }
];

export const fastestComics: RankedComic[] = [
  { rank: 1, name: "Dev Santos", location: "Austin, TX", style: "Same-day turnarounds", avgTurnaround: "3.2 hrs", onTimeRate: 100 },
  { rank: 2, name: "Aisha Rahman", location: "Boston, MA", style: "Rapid punch-up", avgTurnaround: "4.1 hrs", onTimeRate: 100 },
  { rank: 3, name: "Jamal Carter", location: "Detroit, MI", style: "One-liners on demand", avgTurnaround: "4.8 hrs", onTimeRate: 99 },
  { rank: 4, name: "Tyler Brooks", location: "Portland, OR", style: "Improv-fast delivery", avgTurnaround: "5.3 hrs", onTimeRate: 99 },
  { rank: 5, name: "Maya Ross", location: "Brooklyn, NY", style: "Overnight speeches", avgTurnaround: "6.0 hrs", onTimeRate: 100 },
  { rank: 6, name: "Bella Cruz", location: "San Diego, CA", style: "Quick custom videos", avgTurnaround: "6.7 hrs", onTimeRate: 98 },
  { rank: 7, name: "Ray Okafor", location: "Chicago, IL", style: "Fast roasts", avgTurnaround: "7.4 hrs", onTimeRate: 99 },
  { rank: 8, name: "Grace Liu", location: "New York, NY", style: "Speedy rewrites", avgTurnaround: "8.1 hrs", onTimeRate: 98 },
  { rank: 9, name: "Sofia Delgado", location: "Miami, FL", style: "Bilingual, fast", avgTurnaround: "8.9 hrs", onTimeRate: 97 },
  { rank: 10, name: "Theo Nakamura", location: "Seattle, WA", style: "Next-morning delivery", avgTurnaround: "9.5 hrs", onTimeRate: 98 },
  { rank: 11, name: "Omar Haddad", location: "Houston, TX", style: "Reliable rush jobs", avgTurnaround: "10.2 hrs", onTimeRate: 97 },
  { rank: 12, name: "Nina Volkov", location: "Los Angeles, CA", style: "Deadpan, on deadline", avgTurnaround: "11.0 hrs", onTimeRate: 98 },
  { rank: 13, name: "Sam Whitfield", location: "Nashville, TN", style: "Same-week videos", avgTurnaround: "11.8 hrs", onTimeRate: 96 },
  { rank: 14, name: "Lena Bright", location: "Los Angeles, CA", style: "Polished, prompt", avgTurnaround: "12.5 hrs", onTimeRate: 97 },
  { rank: 15, name: "Priya Kapoor", location: "Toronto, ON", style: "Corporate rush", avgTurnaround: "13.3 hrs", onTimeRate: 96 },
  { rank: 16, name: "Diego Moreno", location: "Phoenix, AZ", style: "Family jobs, fast", avgTurnaround: "14.0 hrs", onTimeRate: 95 },
  { rank: 17, name: "Marcus Webb", location: "Atlanta, GA", style: "Story sets, quick", avgTurnaround: "15.1 hrs", onTimeRate: 96 },
  { rank: 18, name: "Chloe Bennett", location: "Denver, CO", style: "Wholesome, on time", avgTurnaround: "16.4 hrs", onTimeRate: 95 },
  { rank: 19, name: "Fatima Noor", location: "Minneapolis, MN", style: "Steady turnaround", avgTurnaround: "17.2 hrs", onTimeRate: 94 },
  { rank: 20, name: "Leo Castellano", location: "Las Vegas, NV", style: "Vegas-fast", avgTurnaround: "18.0 hrs", onTimeRate: 95 }
];
