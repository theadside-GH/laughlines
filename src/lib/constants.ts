export const BRAND = {
  name: "LaughLines",
  tagline: "comedy delivered",
  platformFeePercent: 10,
  revisionLimit: 1,
  standardDeliveryDays: 7,
  acceptWindowHours: 48,
  civilianReviewWindowHours: 72
};

export const SERVICE_COPY = {
  MAKE_ME_FUNNY: {
    label: "Make Me Funny",
    short: "Custom jokes and punch-up for your speech.",
    detail:
      "A comedian writes tailored jokes for your corporate remarks, wedding toast, send-off, roast, or family moment."
  },
  MAKE_ME_LAUGH: {
    label: "Make Me Laugh",
    short: "A custom video of the comedian performing your material.",
    detail:
      "The comic turns your details into a tailored video performance you can play, share, or use as inspiration."
  }
} as const;

export const OCCASIONS = [
  "Best man speech",
  "Corporate speech",
  "Going away party",
  "Birthday",
  "Retirement",
  "Roast",
  "Family gathering",
  "Fundraiser"
];
