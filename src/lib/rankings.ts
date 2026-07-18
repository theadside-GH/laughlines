import { comedians } from "@/lib/data";

// Both leaderboards are derived from the real comedian roster, so every ranked
// comic exists on the site and has a profile. In production these are the same
// computation, recomputed weekly:
//   - topRoastComics -> ranked by paid orders in the last 7 days
//   - fastestComics  -> ranked by median delivery time in the last 7 days

export type RankedComic = {
  rank: number;
  slug: string;
  name: string;
  location: string;
  style: string;
  weeklyOrders?: number;
  rating?: number;
  avgTurnaround?: string;
  onTimeRate?: number;
};

export const topRoastComics: RankedComic[] = [...comedians]
  .sort((a, b) => b.weeklyOrders - a.weeklyOrders)
  .slice(0, 20)
  .map((comic, index) => ({
    rank: index + 1,
    slug: comic.slug,
    name: comic.name,
    location: comic.location,
    style: comic.style,
    weeklyOrders: comic.weeklyOrders,
    rating: comic.rating
  }));

export const fastestComics: RankedComic[] = [...comedians]
  .sort((a, b) => a.avgTurnaroundHours - b.avgTurnaroundHours)
  .slice(0, 20)
  .map((comic, index) => ({
    rank: index + 1,
    slug: comic.slug,
    name: comic.name,
    location: comic.location,
    style: comic.style,
    avgTurnaround: `${comic.avgTurnaroundHours.toFixed(1)} hrs`,
    onTimeRate: comic.onTimeRate
  }));
