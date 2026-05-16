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

  // ─── COMING SOON ─────────────────────────────────────────────────────
  {
    id: "tender-match",
    name: "Tender Match",
    status: "coming-soon",
    description: "Smarter matching for Irish public tenders.",
    image: {
      src: "/products/tender-match/landing.png",
      alt: "Tender Match landing page screenshot",
    },
  },
  {
    id: "grant-match",
    name: "Grant Match",
    status: "coming-soon",
    description: "Research grants, matched to your project.",
    accentTone: "warm",
  },
  {
    id: "funding-alerts",
    name: "Funding Alerts",
    status: "coming-soon",
    description: "Notifications the moment new funding opens.",
    accentTone: "cool",
  },
  {
    id: "are-we-there-yet",
    name: "Are We There Yet",
    status: "coming-soon",
    description: "Sleep on the bus. We'll wake you at your stop.",
    image: {
      src: "/products/are-we-there-yet/icon-1024.png",
      alt: "Are We There Yet app icon",
    },
  },
  {
    id: "ogma",
    name: "Ogma",
    status: "coming-soon",
    description: "Something new from the workshop. Stay tuned.",
    image: {
      src: "/products/ogma/library.png",
      alt: "Ogma library screen",
    },
  },
  {
    id: "student-placement",
    name: "Student Placement Organiser",
    status: "coming-soon",
    description: "Matching students to industry placements, end-to-end.",
    accentTone: "default",
    // no image — intentional teaser (and the underlying ATU tender stays unbranded)
  },
] as const;
