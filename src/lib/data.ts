import type { ComedianProfile, ServicePrice } from "@/lib/types";

// ---------------------------------------------------------------------------
// Sample roster. This is the single source of truth for comedians: the
// Comedians page, every profile page, and both leaderboards (Top 20 / Fastest)
// are derived from this list, so nothing references a comic that doesn't exist.
// ---------------------------------------------------------------------------

const jokePool = [
  "Kevin says he's 'between opportunities,' which is a generous way to describe a man who peaked at fantasy football.",
  "Aunt Carol doesn't hold grudges — she files them, alphabetically, with receipts.",
  "Todd calls himself an entrepreneur because 'unemployed with a podcast' didn't fit on the name tag.",
  "The bride's family flew in from three time zones, mostly to confirm the groom is exactly as tall as they feared.",
  "Marcus has been 'about to start the gym' for so long the gym sent a search party.",
  "Grandpa's toast lasted twelve minutes and covered every war except the one he's having with the caterer.",
  "Dana runs a tight ship, if the ship were a group chat she mutes during her own meetings.",
  "Steve's dating profile says 'fluent in sarcasm,' which explains why he's single in four languages.",
  "The retirement cake said 'We'll miss you,' which is bold for a man everyone's avoided since 2009.",
  "Priya brought a plus-one to the reunion: her entire personality, still under construction."
];

const reviewPool = [
  { name: "Jordan M.", event: "Birthday roast", rating: 5, quote: "Landed every joke without anyone needing to apologize afterward." },
  { name: "Sam R.", event: "Retirement party", rating: 5, quote: "Personal, sharp, and clean enough for the grandparents in the front row." },
  { name: "Alex T.", event: "Best man speech", rating: 5, quote: "The room lost it. Exactly the material I could never write myself." },
  { name: "Priya K.", event: "Corporate event", rating: 5, quote: "Turned our boring milestone into the highlight of the night." },
  { name: "Chris D.", event: "Send-off", rating: 4, quote: "Quick turnaround and genuinely funny — would book again." },
  { name: "Morgan L.", event: "Family reunion", rating: 5, quote: "Nailed the family in-jokes without starting an actual feud." }
];

const creditsPool = [
  ["Comedy Cellar", "Netflix Is A Joke", "Don't Tell Comedy"],
  ["Just For Laughs", "UCB", "HBO Max Showcase"],
  ["Moontower Comedy", "Comedy Central Digital", "Cap City"],
  ["The Improv", "SiriusXM", "Dry Bar Comedy"]
];

const vimeoPool = ["76979871", "146022717", "824804225"];

function rushOptions(baseCents: number): ServicePrice["rushOptions"] {
  return [
    { preset: "24h", feeCents: Math.round(baseCents * 0.7) },
    { preset: "48h", feeCents: Math.round(baseCents * 0.45) },
    { preset: "72h", feeCents: Math.round(baseCents * 0.3) }
  ];
}

type Seed = {
  name: string;
  location: string;
  style: string;
  categories: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  completedOrders: number;
  weeklyOrders: number;
  avgTurnaroundHours: number;
  onTimeRate: number;
  mmf: number;
  mml: number;
  avatar: number;
  newest?: boolean;
};

function buildComic(seed: Seed, index: number): ComedianProfile {
  const slug = seed.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    id: `comic-${slug}`,
    slug,
    name: seed.name,
    location: seed.location,
    approved: true,
    featured: false,
    newest: Boolean(seed.newest),
    mostUsed: seed.weeklyOrders > 130,
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    completedOrders: seed.completedOrders,
    responseTime:
      seed.avgTurnaroundHours <= 8
        ? "Usually accepts same day"
        : `Usually accepts in ${Math.round(seed.avgTurnaroundHours)}h`,
    style: seed.style,
    weeklyOrders: seed.weeklyOrders,
    avgTurnaroundHours: seed.avgTurnaroundHours,
    onTimeRate: seed.onTimeRate,
    categories: seed.categories,
    credits: creditsPool[index % creditsPool.length],
    bio: seed.bio,
    profileImage: `https://i.pravatar.cc/600?img=${seed.avatar}`,
    introVideoUrl: `https://player.vimeo.com/video/${vimeoPool[index % vimeoPool.length]}`,
    socials: { instagram: "https://instagram.com", tiktok: "https://tiktok.com" },
    services: [
      {
        serviceType: "MAKE_ME_FUNNY",
        basePriceCents: seed.mmf,
        rushOptions: rushOptions(seed.mmf)
      },
      {
        serviceType: "MAKE_ME_LAUGH",
        basePriceCents: seed.mml,
        rushOptions: rushOptions(seed.mml)
      }
    ],
    sampleJokes: [
      jokePool[(index * 2) % jokePool.length],
      jokePool[(index * 2 + 1) % jokePool.length]
    ],
    reviews: [reviewPool[index % reviewPool.length]]
  };
}

// The three richly-authored, featured comics.
const featuredComics: ComedianProfile[] = [
  {
    id: "comic-maya-ross",
    slug: "maya-ross",
    name: "Maya Ross",
    pronouns: "she/her",
    location: "Brooklyn, NY",
    approved: true,
    featured: true,
    newest: false,
    mostUsed: true,
    rating: 4.9,
    reviewCount: 84,
    completedOrders: 213,
    responseTime: "Usually accepts in 6 hours",
    style: "Dry, surgical wit",
    weeklyOrders: 198,
    avgTurnaroundHours: 6.0,
    onTimeRate: 100,
    categories: ["Roasts", "Corporate", "Weddings"],
    credits: ["Late Night Writers Room", "Netflix Is A Joke", "The Bell House"],
    bio: "Sharp, warm, and brutally useful. Maya specializes in making normal people sound like they have a secret writers room.",
    profileImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    introVideoUrl: "https://player.vimeo.com/video/824804225",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      website: "https://example.com"
    },
    services: [
      {
        serviceType: "MAKE_ME_FUNNY",
        basePriceCents: 12500,
        rushOptions: [
          { preset: "24h", feeCents: 9000 },
          { preset: "48h", feeCents: 6500 },
          { preset: "72h", feeCents: 4000 }
        ]
      },
      {
        serviceType: "MAKE_ME_LAUGH",
        basePriceCents: 32500,
        rushOptions: [
          { preset: "24h", feeCents: 14000 },
          { preset: "48h", feeCents: 9500 },
          { preset: "72h", feeCents: 6500 }
        ]
      }
    ],
    sampleJokes: [
      "Gary calls himself a thought leader because 'reply all' was already taken.",
      "This wedding has everything: love, family, and one uncle treating the open bar like a startup runway."
    ],
    reviews: [
      {
        name: "Claire P.",
        event: "Best man speech",
        rating: 5,
        quote: "The jokes felt personal, clean enough for grandparents, and lethal in the room."
      },
      {
        name: "Jordan M.",
        event: "Sales kickoff",
        rating: 5,
        quote: "Maya turned our very dry numbers into the only deck people quoted afterward."
      }
    ]
  },
  {
    id: "comic-dev-santos",
    slug: "dev-santos",
    name: "Dev Santos",
    pronouns: "he/him",
    location: "Austin, TX",
    approved: true,
    featured: true,
    newest: true,
    mostUsed: true,
    rating: 4.9,
    reviewCount: 51,
    completedOrders: 128,
    responseTime: "Usually accepts same day",
    style: "High-energy roasts",
    weeklyOrders: 214,
    avgTurnaroundHours: 3.2,
    onTimeRate: 100,
    categories: ["Roasts", "Birthdays", "High energy"],
    credits: ["Moontower Comedy", "Comedy Central Digital", "Cap City"],
    bio: "Fast, punchy, and good at finding the joke inside a weird family detail without burning the house down.",
    profileImage:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=80",
    introVideoUrl: "https://player.vimeo.com/video/76979871",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com"
    },
    services: [
      {
        serviceType: "MAKE_ME_FUNNY",
        basePriceCents: 9500,
        rushOptions: [
          { preset: "24h", feeCents: 7000 },
          { preset: "48h", feeCents: 4500 },
          { preset: "72h", feeCents: 3000 }
        ]
      },
      {
        serviceType: "MAKE_ME_LAUGH",
        basePriceCents: 25500,
        rushOptions: [
          { preset: "24h", feeCents: 12000 },
          { preset: "48h", feeCents: 8000 },
          { preset: "72h", feeCents: 5000 }
        ]
      }
    ],
    sampleJokes: [
      "Melissa has run five marathons, which is inspiring until you realize she also owns a printer and still chooses pain.",
      "Rob is retiring to spend more time with his hobbies: golf, weather updates, and saying 'that's how they get you.'"
    ],
    reviews: [
      {
        name: "Priya S.",
        event: "Birthday roast",
        rating: 5,
        quote: "Dev nailed the roast without making anyone sleep in the garage."
      }
    ]
  },
  {
    id: "comic-lena-bright",
    slug: "lena-bright",
    name: "Lena Bright",
    pronouns: "she/her",
    location: "Los Angeles, CA",
    approved: true,
    featured: false,
    newest: true,
    mostUsed: true,
    rating: 4.7,
    reviewCount: 39,
    completedOrders: 176,
    responseTime: "Usually accepts in 12 hours",
    style: "Clean but lethal",
    weeklyOrders: 147,
    avgTurnaroundHours: 12.5,
    onTimeRate: 97,
    categories: ["Roasts", "Clean comedy", "Work events"],
    credits: ["Just For Laughs New Faces", "UCB", "HBO Max Showcase"],
    bio: "Smart, polished, and unusually good at writing jokes that HR and your grandmother can both survive.",
    profileImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    introVideoUrl: "https://player.vimeo.com/video/146022717",
    socials: {
      instagram: "https://instagram.com",
      website: "https://example.com"
    },
    services: [
      {
        serviceType: "MAKE_ME_FUNNY",
        basePriceCents: 15000,
        rushOptions: [
          { preset: "24h", feeCents: 10000 },
          { preset: "48h", feeCents: 7000 },
          { preset: "72h", feeCents: 4500 }
        ]
      },
      {
        serviceType: "MAKE_ME_LAUGH",
        basePriceCents: 37500,
        rushOptions: [
          { preset: "24h", feeCents: 16000 },
          { preset: "48h", feeCents: 10000 },
          { preset: "72h", feeCents: 7000 }
        ]
      }
    ],
    sampleJokes: [
      "Our family is close, mostly because the group chat has no exit button.",
      "Diane's management style is 'open door policy,' which is brave for someone who stores emergency almonds in there."
    ],
    reviews: [
      {
        name: "Aaron T.",
        event: "Company retreat",
        rating: 5,
        quote: "Lena gave us jokes that sounded like us, only much less trapped in a conference room."
      }
    ]
  }
];

// The rest of the roster (all appear on the Comedians page + leaderboards).
const seeds: Seed[] = [
  { name: "Ray Okafor", location: "Chicago, IL", style: "Crowd-work roasts", categories: ["Roasts", "Crowd work", "High energy"], bio: "Reads a room in seconds and roasts it in five.", rating: 4.8, reviewCount: 72, completedOrders: 340, weeklyOrders: 181, avgTurnaroundHours: 7.4, onTimeRate: 99, mmf: 11000, mml: 29000, avatar: 12 },
  { name: "Nina Volkov", location: "Los Angeles, CA", style: "Deadpan burns", categories: ["Roasts", "Deadpan", "Dry wit"], bio: "Says the meanest thing in the room without changing her face.", rating: 4.8, reviewCount: 66, completedOrders: 312, weeklyOrders: 173, avgTurnaroundHours: 11.0, onTimeRate: 98, mmf: 13500, mml: 33000, avatar: 45 },
  { name: "Marcus Webb", location: "Atlanta, GA", style: "Storytelling roasts", categories: ["Roasts", "Storytelling", "Weddings"], bio: "Builds a whole story just to land one perfect, devastating button.", rating: 4.9, reviewCount: 61, completedOrders: 298, weeklyOrders: 166, avgTurnaroundHours: 15.1, onTimeRate: 96, mmf: 14000, mml: 34000, avatar: 13 },
  { name: "Sofia Delgado", location: "Miami, FL", style: "Bilingual burns", categories: ["Roasts", "Bilingual", "Parties"], bio: "Roasts you in two languages so nobody in the family is left out.", rating: 4.7, reviewCount: 58, completedOrders: 271, weeklyOrders: 158, avgTurnaroundHours: 8.9, onTimeRate: 97, mmf: 10500, mml: 27500, avatar: 47, newest: true },
  { name: "Jamal Carter", location: "Detroit, MI", style: "Sharp one-liners", categories: ["Roasts", "One-liners", "Corporate"], bio: "One-liners so quick you'll laugh before you realize it was about you.", rating: 4.8, reviewCount: 54, completedOrders: 260, weeklyOrders: 151, avgTurnaroundHours: 4.8, onTimeRate: 99, mmf: 12000, mml: 30000, avatar: 14 },
  { name: "Theo Nakamura", location: "Seattle, WA", style: "Absurdist roasts", categories: ["Roasts", "Absurdist", "Alt comedy"], bio: "Finds the strangest true thing about you and makes it the whole bit.", rating: 4.8, reviewCount: 49, completedOrders: 244, weeklyOrders: 139, avgTurnaroundHours: 9.5, onTimeRate: 98, mmf: 11500, mml: 28500, avatar: 33 },
  { name: "Priya Kapoor", location: "Toronto, ON", style: "Corporate roasts", categories: ["Roasts", "Corporate", "Clean comedy"], bio: "Roasts the org chart without getting anyone sent to HR.", rating: 4.7, reviewCount: 47, completedOrders: 233, weeklyOrders: 132, avgTurnaroundHours: 13.3, onTimeRate: 96, mmf: 13000, mml: 32000, avatar: 44 },
  { name: "Bella Cruz", location: "San Diego, CA", style: "Warm-hearted burns", categories: ["Roasts", "Birthdays", "Family"], bio: "The rare roast that ends with everyone hugging.", rating: 4.6, reviewCount: 44, completedOrders: 221, weeklyOrders: 128, avgTurnaroundHours: 6.7, onTimeRate: 98, mmf: 9500, mml: 26000, avatar: 48 },
  { name: "Omar Haddad", location: "Houston, TX", style: "Political-free roasts", categories: ["Roasts", "Clean comedy", "Corporate"], bio: "Keeps it savage and keeps it off the news cycle.", rating: 4.7, reviewCount: 41, completedOrders: 210, weeklyOrders: 121, avgTurnaroundHours: 10.2, onTimeRate: 97, mmf: 10000, mml: 27000, avatar: 15 },
  { name: "Grace Liu", location: "New York, NY", style: "Observational burns", categories: ["Roasts", "Observational", "Work events"], bio: "Notices the one detail you hoped nobody noticed.", rating: 4.6, reviewCount: 39, completedOrders: 198, weeklyOrders: 117, avgTurnaroundHours: 8.1, onTimeRate: 98, mmf: 12500, mml: 31000, avatar: 20 },
  { name: "Sam Whitfield", location: "Nashville, TN", style: "Southern-charm roasts", categories: ["Roasts", "Southern charm", "Weddings"], bio: "Insults you so politely you'll thank him for it.", rating: 4.7, reviewCount: 37, completedOrders: 189, weeklyOrders: 112, avgTurnaroundHours: 11.8, onTimeRate: 96, mmf: 11000, mml: 28000, avatar: 51 },
  { name: "Aisha Rahman", location: "Boston, MA", style: "Quick-fire wit", categories: ["Roasts", "One-liners", "High energy"], bio: "Fastest turnaround on the platform and it shows in the tightness.", rating: 4.6, reviewCount: 35, completedOrders: 182, weeklyOrders: 108, avgTurnaroundHours: 4.1, onTimeRate: 100, mmf: 10500, mml: 27500, avatar: 41, newest: true },
  { name: "Diego Moreno", location: "Phoenix, AZ", style: "Family-roast specialist", categories: ["Roasts", "Family", "Birthdays"], bio: "Turns your weird family into your funniest asset.", rating: 4.6, reviewCount: 33, completedOrders: 171, weeklyOrders: 101, avgTurnaroundHours: 14.0, onTimeRate: 95, mmf: 9000, mml: 25000, avatar: 52 },
  { name: "Chloe Bennett", location: "Denver, CO", style: "Wholesome takedowns", categories: ["Roasts", "Clean comedy", "Family"], bio: "Somehow roasts you and makes your mom like her more.", rating: 4.5, reviewCount: 31, completedOrders: 160, weeklyOrders: 96, avgTurnaroundHours: 16.4, onTimeRate: 95, mmf: 9500, mml: 26000, avatar: 26 },
  { name: "Tyler Brooks", location: "Portland, OR", style: "Improv roasts", categories: ["Roasts", "Improv", "Alt comedy"], bio: "Makes it up on the spot and somehow it's your favorite part.", rating: 4.6, reviewCount: 28, completedOrders: 149, weeklyOrders: 90, avgTurnaroundHours: 5.3, onTimeRate: 99, mmf: 10000, mml: 26500, avatar: 53, newest: true },
  { name: "Fatima Noor", location: "Minneapolis, MN", style: "Understated burns", categories: ["Roasts", "Deadpan", "Clean comedy"], bio: "Quiet delivery, loud aftermath.", rating: 4.5, reviewCount: 26, completedOrders: 138, weeklyOrders: 85, avgTurnaroundHours: 17.2, onTimeRate: 94, mmf: 9500, mml: 25500, avatar: 32 },
  { name: "Leo Castellano", location: "Las Vegas, NV", style: "Vegas-style roasts", categories: ["Roasts", "Parties", "High energy"], bio: "Old-school roast energy with a residency-grade closer.", rating: 4.6, reviewCount: 24, completedOrders: 130, weeklyOrders: 81, avgTurnaroundHours: 18.0, onTimeRate: 95, mmf: 11500, mml: 29000, avatar: 60 }
];

export const comedians: ComedianProfile[] = [
  ...featuredComics,
  ...seeds.map(buildComic)
];

export const featuredComedians = comedians.filter((comic) => comic.featured);
export const newComedians = comedians.filter((comic) => comic.newest);
export const mostUsedComedians = comedians.filter((comic) => comic.mostUsed);

export function findComedian(slug: string) {
  return comedians.find((comic) => comic.slug === slug);
}

export const sampleSpeechLines = [
  {
    occasion: "Best man speech",
    line: "I knew the groom was ready for marriage when he started describing IKEA furniture as 'a journey we took together.'"
  },
  {
    occasion: "Corporate toast",
    line: "To Q4: the only time of year when optimism comes in spreadsheet form."
  },
  {
    occasion: "Retirement party",
    line: "After 34 years, Linda is finally pursuing her dream of checking email zero times before coffee."
  }
];
