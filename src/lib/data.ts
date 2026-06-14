import type { ComedianProfile } from "@/lib/types";

export const comedians: ComedianProfile[] = [
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
    categories: ["Corporate", "Weddings", "Dry wit"],
    credits: ["Late Night Writers Room", "Netflix Is A Joke", "The Bell House"],
    bio:
      "Sharp, warm, and brutally useful. Maya specializes in making normal people sound like they have a secret writers room.",
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
    mostUsed: false,
    rating: 4.8,
    reviewCount: 51,
    completedOrders: 128,
    responseTime: "Usually accepts same day",
    categories: ["Roasts", "Birthdays", "High energy"],
    credits: ["Moontower Comedy", "Comedy Central Digital", "Cap City"],
    bio:
      "Fast, punchy, and good at finding the joke inside a weird family detail without burning the house down.",
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
    categories: ["Clean comedy", "Family", "Work events"],
    credits: ["Just For Laughs New Faces", "UCB", "HBO Max Showcase"],
    bio:
      "Smart, polished, and unusually good at writing jokes that HR and your grandmother can both survive.",
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
