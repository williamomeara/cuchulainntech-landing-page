export type ProductStatus = "live" | "coming-soon";

export type ProductImage = {
  src: string;            // public-relative path, e.g. "/products/eist/playback-dark.jpg"
  alt: string;
};

export type Product = {
  id: string;             // slug
  name: string;           // display name
  status: ProductStatus;
  description: string;    // exactly one sentence
  href?: string;          // external link (LIVE only; absent for COMING SOON)
  image?: ProductImage;   // real image; absent → placeholder treatment renders
  accentTone?: "default" | "warm" | "cool"; // optional, controls placeholder gradient when no image
};

export const PRODUCTS: readonly Product[] = [
  // ─── LIVE ────────────────────────────────────────────────────────────
  {
    id: "eist",
    name: "Éist",
    status: "live",
    description: "Audiobook companion for the daily commute.",
    href: "https://eist.app",
    image: {
      src: "/products/eist/playback-dark.jpg",
      alt: "Éist audiobook playback screen on a phone, dark theme",
    },
  },
  {
    id: "headlock",
    name: "Headlock",
    status: "live",
    description: "Squeeze extra prompts from your AI subscriptions.",
    href: "https://headlock.app",
    image: {
      src: "/products/headlock/character.png",
      alt: "Headlock character mascot logo",
    },
  },
  {
    id: "theory-test-free",
    name: "Theory Test Free",
    status: "live",
    description: "Free Irish driver theory test, built for mobile.",
    href: "https://theorytestfree.ie",
    image: {
      src: "/products/theory-test-free/icon-512.png",
      alt: "Theory Test Free app icon",
    },
  },
  {
    id: "every-company-ever",
    name: "Every Company Ever",
    status: "live",
    description: "Every Irish registered company, in one open directory.",
    href: "https://everycompanyever.ie",
    accentTone: "cool",
  },

  // ─── COMING SOON ─────────────────────────────────────────────────────
  {
    id: "tender-match",
    name: "Tender Match",
    status: "live",
    description: "Smarter matching for Irish public tenders.",
    href: "https://tendermatch.ie",
    image: {
      src: "/products/tender-match/ai-placeholder.png",
      alt: "Abstract network graph evoking tender matching",
    },
  },
  {
    id: "grant-match",
    name: "Grant Match",
    status: "coming-soon",
    description: "Research grants, matched to your project.",
    image: {
      src: "/products/grant-match/ai-placeholder.png",
      alt: "Constellation of connected nodes evoking grant matching",
    },
  },
  {
    id: "funding-alerts",
    name: "Funding Alerts",
    status: "coming-soon",
    description: "Notifications the moment new funding opens.",
    image: {
      src: "/products/funding-alerts/ai-placeholder.png",
      alt: "A glowing emerald dot pulsing concentric ripples",
    },
  },
  {
    id: "are-we-there-yet",
    name: "Are We There Yet",
    status: "coming-soon",
    description: "Sleep on the bus. We'll wake you at your stop.",
    image: {
      src: "/products/are-we-there-yet/ai-placeholder.png",
      alt: "Empty seat on a night bus with soft overhead light",
    },
  },
  {
    id: "ogma",
    name: "Ogma",
    status: "coming-soon",
    description: "Something new from the workshop. Stay tuned.",
    image: {
      src: "/products/ogma/ai-placeholder.png",
      alt: "Celtic Ogham-inspired ornamental motif in emerald green",
    },
  },
  {
    id: "student-placement",
    name: "Student Placement Organiser",
    status: "coming-soon",
    description: "Matching students to industry placements, end-to-end.",
    image: {
      src: "/products/student-placement/ai-placeholder.png",
      alt: "Two columns of luminous tiles connected by faint diagonal lines",
    },
  },
] as const;
