# Phase 2: Core Content — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Phase 1 hero skeleton with a real Hero section and a 9-product showcase (3 LIVE + 6 COMING SOON) so a visitor lands and immediately understands what Cuchulainn Tech builds and what's already shipped.

**Architecture:** Add three new pure-presentational components — `Hero`, `ProductCard`, `ProductsSection` — fed by a typed product list in `src/lib/products.ts`. Coming-Soon cards that lack imagery render through a `ComingSoonPlaceholder` component that draws a stylised gradient tile. No new runtime dependencies: bento layout is plain CSS grid, the hero orb is a CSS radial gradient with a slow keyframe pulse, hover lifts use Tailwind transforms. Real product assets get copied from `design/assets/<product>/` into `public/products/<product>/` so Next.js's static export can serve them.

**Tech Stack:** Same as Phase 1 — Next.js 16 App Router, Tailwind v4, Geist, next-themes. No new deps.

**Requirements covered:** HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, PROD-01, PROD-02, PROD-03, PROD-04, PROD-05, PROD-06

**Success Criteria** (mirrors ROADMAP.md Phase 2, expanded for 9 products):
1. Hero headline leads with value (not company description); primary CTA visible above the fold on both desktop (1440) and mobile (393)
2. Clicking the hero CTA scrolls to `#contact`
3. All nine product cards visible — three LIVE (Éist, Headlock, Theory Test Free) and six COMING SOON (Tender Match, Grant Match, Funding Alerts, Are We There Yet, Ogma, Student Placement Organiser) — with the correct status pills
7. A compact "Open Source" strip sits between Products and Services, surfacing `blindfold-env` and `Craobh` as `<a target="_blank">` links to their GitHub repos
4. LIVE cards link out in a new tab with `rel="noopener noreferrer"`: Éist → eist.app, Headlock → headlock.app, Theory Test Free → its app page; COMING SOON cards have NO external link (cursor stays default)
5. Every card has a one-sentence description and either a real image or an intentional placeholder treatment
6. The page still passes the Phase 1 production smoke tests (no regressions)

---

## File Structure

```
src/
├── app/
│   └── page.tsx                                      MODIFY — replace hero placeholder, mount <Hero /> and <ProductsSection />
├── components/
│   ├── hero.tsx                                      CREATE — eyebrow + H1 + subhead + CTA + micro-stat + ambient orb
│   ├── products-section.tsx                          CREATE — section wrapper, two subgroup rows (LIVE / COMING SOON)
│   ├── product-card.tsx                              CREATE — single card, LIVE | COMING_SOON variant
│   ├── status-badge.tsx                              CREATE — LIVE pill (green) / COMING SOON pill (muted outline)
│   ├── coming-soon-placeholder.tsx                   CREATE — stylised tile for products without imagery
│   └── oss-strip.tsx                                 CREATE — compact "Open Source" section under Products
├── lib/
│   ├── products.ts                                   CREATE — typed product data array (the 9 products)
│   └── oss.ts                                        CREATE — typed OSS data array (2 entries; did-i-do-good lands once it's on GitHub)
└── app/globals.css                                   MODIFY — add @keyframes for the hero orb pulse

public/
└── products/                                         CREATE — runtime-served product imagery
    ├── eist/{playback-dark.jpg,library-dark.jpg,book-details.jpg,icon.png}
    ├── headlock/{wordmark.png,character.png,logo-512.png}
    ├── theory-test-free/{icon-512.png}
    ├── tender-match/{landing.png,matches.png,dashboard.png}
    ├── are-we-there-yet/{icon-1024.png}
    └── ogma/{library.png,reader-rsvp.png,stats.png}

tests/
└── e2e/foundation.spec.ts                            MODIFY — add Phase 2 assertions (hero CTA above fold, 9 cards, link behaviour)
```

---

## Task 1: Define the typed product data

**Files:**
- Create: `src/lib/products.ts`

- [ ] **Step 1: Write the products module**

Write `src/lib/products.ts`:
```ts
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
```

Why `readonly`/`as const`: locks the array at compile time, prevents accidental mutation, and works smoothly with `noUncheckedIndexedAccess` because consumers map over it instead of indexing.

- [ ] **Step 2: Run typecheck**

Run: `pnpm typecheck`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/lib/products.ts
git commit -m "feat(content): add typed product list (3 live + 6 coming soon)"
```

---

## Task 2: Copy product imagery into public/

**Files:**
- Copy: assets from `design/assets/<product>/` into `public/products/<product>/`

- [ ] **Step 1: Copy real product assets**

Run from the repo root:
```bash
mkdir -p public/products/{eist,headlock,theory-test-free,tender-match,are-we-there-yet,ogma}

# Éist — pick the dark playback + library + book-details + the 512px icon
cp design/assets/eist/screenshot-playback-dark.jpg   public/products/eist/playback-dark.jpg
cp design/assets/eist/screenshot-library-dark.jpg    public/products/eist/library-dark.jpg
cp design/assets/eist/screenshot-book-details.jpg    public/products/eist/book-details.jpg
cp design/assets/eist/app-icon-512.png               public/products/eist/icon-512.png

# Headlock — character logo (warmest brand asset) + word mark + 512
cp design/assets/headlock/character-logo.png         public/products/headlock/character.png
cp design/assets/headlock/wordmark.png               public/products/headlock/wordmark.png
cp design/assets/headlock/logo-512.png               public/products/headlock/logo-512.png

# Theory Test Free — just the 512 icon
cp design/assets/theory-test-free/app-icon-512.png   public/products/theory-test-free/icon-512.png

# Tender Match — landing + matches + dashboard
cp design/assets/tender-match/landing.png            public/products/tender-match/landing.png
cp design/assets/tender-match/matches.png            public/products/tender-match/matches.png
cp design/assets/tender-match/dashboard.png          public/products/tender-match/dashboard.png

# Are We There Yet — 1024 icon
cp design/assets/are-we-there-yet/app-icon-1024.png  public/products/are-we-there-yet/icon-1024.png

# Ogma — three reader screens
cp design/assets/ogma/screenshot-library.png         public/products/ogma/library.png
cp design/assets/ogma/screenshot-reader-rsvp.png     public/products/ogma/reader-rsvp.png
cp design/assets/ogma/screenshot-stats.png           public/products/ogma/stats.png
```

- [ ] **Step 2: Verify files**

Run:
```bash
find public/products -type f | sort
du -sh public/products
```

Expected: 14 files, total size under 5MB.

- [ ] **Step 3: Commit**

```bash
git add public/products/
git commit -m "feat(assets): copy product imagery into public/products"
```

---

## Task 3: Add hero orb keyframes to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Append keyframes**

At the **end** of `src/app/globals.css`, append:
```css
/* Hero ambient orb — slow Celtic-green pulse behind the H1. */
@keyframes orb-pulse {
  0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
  50%      { opacity: 0.85; transform: translate(-50%, -50%) scale(1.06); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-orb { animation: none !important; }
}
```

Why two blocks: the pulse is decorative; under `prefers-reduced-motion: reduce` we kill the animation outright. (Globals.css already gates `scroll-behavior: smooth` the same way.)

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: success, no warnings about unknown keyframes.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(theme): add orb-pulse keyframes for hero ambient glow"
```

---

## Task 4: Build the StatusBadge component

**Files:**
- Create: `src/components/status-badge.tsx`

- [ ] **Step 1: Create the component**

Write `src/components/status-badge.tsx`:
```tsx
import type { ProductStatus } from "@/lib/products";
import { cn } from "@/lib/utils";

const VARIANT: Record<ProductStatus, string> = {
  live:
    "bg-[color:var(--color-accent-faint)] text-[color:var(--color-accent-pill)] border-[color:var(--color-accent-rim)]",
  "coming-soon":
    "bg-transparent text-[color:var(--color-muted-foreground)] border-[color:var(--color-border-hi)]",
};

const LABEL: Record<ProductStatus, string> = {
  live: "Live",
  "coming-soon": "Coming Soon",
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span
      data-status={status}
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.12em]",
        VARIANT[status],
      )}
    >
      {LABEL[status]}
    </span>
  );
}
```

`data-status` attribute is for Playwright assertions in Task 10.

- [ ] **Step 2: Commit**

```bash
git add src/components/status-badge.tsx
git commit -m "feat(components): add StatusBadge for Live / Coming Soon pills"
```

---

## Task 5: Build the ComingSoonPlaceholder component

**Files:**
- Create: `src/components/coming-soon-placeholder.tsx`

- [ ] **Step 1: Create the placeholder**

Write `src/components/coming-soon-placeholder.tsx`:
```tsx
type Tone = "default" | "warm" | "cool";

const GRADIENT: Record<Tone, string> = {
  default:
    "from-[color:var(--color-card)] via-[color:var(--color-background-up)] to-[color:var(--color-background)]",
  warm:
    "from-[oklch(0.28_0.08_45)] via-[color:var(--color-background-up)] to-[color:var(--color-background)]",
  cool:
    "from-[oklch(0.28_0.08_240)] via-[color:var(--color-background-up)] to-[color:var(--color-background)]",
};

export function ComingSoonPlaceholder({
  name,
  tone = "default",
}: {
  name: string;
  tone?: Tone;
}) {
  // Use the first letter (or two for multi-word names) as a tasteful mark.
  const initial = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      aria-hidden
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${GRADIENT[tone]}`}
    >
      <span
        className="font-mono text-[clamp(40px,6vw,68px)] font-medium tracking-[-0.04em] text-[color:var(--color-foreground)]/22"
      >
        {initial}
      </span>
    </div>
  );
}
```

Why a gradient with the initial in muted mono: matches the Linear/Vercel teaser aesthetic without resorting to a stock image. `tone` lets us nudge each Coming-Soon tile away from looking identical.

- [ ] **Step 2: Verify typecheck (handles the noUncheckedIndexedAccess case)**

Run: `pnpm typecheck`
Expected: clean. The `word[0]` access inside `.split().map()` is fine because we're mapping a freshly-split string array, but if typecheck flags it, change to `word.charAt(0)` (which always returns a string).

- [ ] **Step 3: Commit**

```bash
git add src/components/coming-soon-placeholder.tsx
git commit -m "feat(components): add ComingSoonPlaceholder stylised tile"
```

---

## Task 6: Build the ProductCard component

**Files:**
- Create: `src/components/product-card.tsx`

- [ ] **Step 1: Create the card**

Write `src/components/product-card.tsx`:
```tsx
import Image from "next/image";
import { StatusBadge } from "@/components/status-badge";
import { ComingSoonPlaceholder } from "@/components/coming-soon-placeholder";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

function CardShell({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const isLive = product.status === "live";
  const wrapperClasses = cn(
    "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)]",
    "border border-[color:var(--color-border)] bg-[color:var(--color-card)]",
    "transition-transform duration-200 ease-out",
    isLive
      ? "hover:-translate-y-0.5 hover:border-[color:var(--color-border-hi)]"
      : "opacity-95",
  );

  return isLive && product.href ? (
    <a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`product-card-${product.id}`}
      className={wrapperClasses}
    >
      {children}
    </a>
  ) : (
    <article
      data-testid={`product-card-${product.id}`}
      className={wrapperClasses}
    >
      {children}
    </article>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <CardShell product={product}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--color-background-up)]">
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ComingSoonPlaceholder name={product.name} tone={product.accentTone ?? "default"} />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight">{product.name}</h3>
          <StatusBadge status={product.status} />
        </div>
        <p className="text-sm text-[color:var(--color-muted-foreground)]">
          {product.description}
        </p>
        {product.status === "live" && product.href ? (
          <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-[color:var(--color-accent-pill)] opacity-80 transition-opacity group-hover:opacity-100">
            Visit →
          </span>
        ) : null}
      </div>
    </CardShell>
  );
}
```

Why the polymorphic shell: LIVE cards become `<a target="_blank" rel="noopener noreferrer">` for external navigation; COMING-SOON cards stay as `<article>` so there's nothing to click into. This makes `cursor: pointer` correct only on real links.

`fill` + `sizes` lets Next.js serve appropriately sized images at static-export build time (`next.config.ts` already has `images.unoptimized: true`, so it'll just serve the originals — the `sizes` prop still helps with `srcset` once we revisit imaging in Phase 4).

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/components/product-card.tsx
git commit -m "feat(components): add ProductCard polymorphic between <a> and <article>"
```

---

## Task 7: Build the ProductsSection composition

**Files:**
- Create: `src/components/products-section.tsx`

- [ ] **Step 1: Create the section**

Write `src/components/products-section.tsx`:
```tsx
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";

export function ProductsSection() {
  const live = PRODUCTS.filter((p) => p.status === "live");
  const comingSoon = PRODUCTS.filter((p) => p.status === "coming-soon");

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32"
    >
      <header className="mb-10 flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted-foreground)]">
          What we build
        </p>
        <h2
          id="products-heading"
          className="text-balance text-4xl font-bold tracking-[-0.04em] md:text-5xl"
        >
          Products
        </h2>
      </header>

      <div className="mb-12">
        <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-accent-pill)]">
          Live
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted-foreground)]">
          Coming soon
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoon.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

`aria-labelledby` ties the H2 to the section landmark so screen readers announce it as "Products region". Live row uses larger gap (`gap-5`) than Coming-Soon (`gap-4`) for subtle visual hierarchy — matches the brief's intent without code-heavy bento maths.

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: success. `out/index.html` does NOT yet contain product imagery — that lands in Task 9 when `page.tsx` is updated.

- [ ] **Step 3: Commit**

```bash
git add src/components/products-section.tsx
git commit -m "feat(products): compose Products section with Live + Coming Soon rows"
```

---

## Task 8: Build the Hero component

**Files:**
- Create: `src/components/hero.tsx`

- [ ] **Step 1: Create the hero**

Write `src/components/hero.tsx`:
```tsx
import { PRODUCTS } from "@/lib/products";

export function Hero() {
  const live = PRODUCTS.filter((p) => p.status === "live").length;
  const soon = PRODUCTS.filter((p) => p.status === "coming-soon").length;

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative isolate flex min-h-[88vh] items-center justify-center overflow-hidden px-6 pt-24"
    >
      {/* Ambient Celtic-green orb behind the headline. */}
      <div
        aria-hidden
        className="hero-orb pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent-faint), transparent 70%)",
          filter: "blur(40px)",
          animation: "orb-pulse 7s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <p
          className="mb-6 inline-block rounded-full border border-[color:var(--color-border)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted-foreground)]"
        >
          Irish Software Studio
        </p>

        <h1 className="text-balance text-5xl font-extrabold leading-[1.06] tracking-[-0.05em] md:text-7xl">
          Software that stands<br />its ground.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[color:var(--color-muted-foreground)]">
          An Irish studio shipping SaaS products and custom apps for ambitious teams.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <a
            href="#contact"
            data-testid="hero-cta"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-accent-rim)] bg-[color:var(--color-accent-faint)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-accent-pill)] transition-colors hover:bg-[color:var(--color-accent)]/15"
          >
            Get in Touch →
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium text-[color:var(--color-muted-foreground)] transition-colors hover:text-[color:var(--color-foreground)]"
          >
            See what we ship
          </a>
        </div>

        <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-foreground-faint)]">
          shipped {live} products · building {soon} more
        </p>
      </div>
    </section>
  );
}
```

`isolate` on the section creates a stacking context so the `-z-10` orb sits behind the content but cannot escape behind the body's dot-grid. The orb pulse runs in pure CSS via the keyframe added in Task 3.

`shipped 3 products · building 6 more` is computed at build time from `PRODUCTS`, so it stays correct when the list changes.

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: success. Inspect `out/index.html`:
```bash
grep -c "shipped 3 products · building 6 more" out/index.html
```
Expected: `1`.

- [ ] **Step 3: Commit**

```bash
git add src/components/hero.tsx
git commit -m "feat(hero): add value-first Hero with ambient orb and computed stat"
```

---

## Task 8a: Build the OSS strip

**Files:**
- Create: `src/lib/oss.ts`
- Create: `src/components/oss-strip.tsx`

- [ ] **Step 1: Write the OSS data**

Write `src/lib/oss.ts`:
```ts
export type OssProject = {
  id: string;
  name: string;       // display name
  description: string; // one sentence
  href: string;       // github.com URL
};

export const OSS_PROJECTS: readonly OssProject[] = [
  {
    id: "blindfold-env",
    name: "blindfold-env",
    description:
      "Manage .env secrets from the CLI without exposing values to AI assistants.",
    href: "https://github.com/williamomeara/blindfold-env",
  },
  {
    id: "craobh",
    name: "Craobh",
    description:
      "Searchable family tree of Ireland, built from public historical records.",
    href: "https://github.com/williamomeara/craobh",
  },
  // did-i-do-good lives locally only at this writing; add it here once the
  // repo is pushed to github.com/williamomeara/did-i-do-good.
] as const;
```

- [ ] **Step 2: Write the OSS strip component**

Write `src/components/oss-strip.tsx`:
```tsx
import { OSS_PROJECTS } from "@/lib/oss";

export function OssStrip() {
  return (
    <section
      id="open-source"
      aria-labelledby="oss-heading"
      className="relative z-10 border-y border-[color:var(--color-border)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <header className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted-foreground)]">
              We also maintain
            </p>
            <h2
              id="oss-heading"
              className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl"
            >
              Open source
            </h2>
          </div>
          <p className="text-sm text-[color:var(--color-muted-foreground)] sm:max-w-sm sm:text-right">
            Small dev tools we use ourselves and share with the community.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {OSS_PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`oss-card-${project.id}`}
              className="group flex flex-col gap-2 rounded-[var(--radius-card)] border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-5 transition-colors hover:border-[color:var(--color-border-hi)]"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-mono text-sm font-medium tracking-tight text-[color:var(--color-foreground)]">
                  {project.name}
                </h3>
                <span className="text-xs text-[color:var(--color-muted-foreground)] transition-colors group-hover:text-[color:var(--color-accent-pill)]">
                  GitHub →
                </span>
              </div>
              <p className="text-sm text-[color:var(--color-muted-foreground)]">
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/lib/oss.ts src/components/oss-strip.tsx
git commit -m "feat(oss): add Open Source compact strip (blindfold-env + craobh)"
```

---

## Task 9: Wire Hero + Products + OSS into page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `page.tsx`**

Write `src/app/page.tsx`:
```tsx
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { ProductsSection } from "@/components/products-section";
import { OssStrip } from "@/components/oss-strip";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <ProductsSection />
        <OssStrip />

        <section id="services" aria-label="Services placeholder" className="px-6 py-32" />
        <section id="about" aria-label="About placeholder" className="px-6 py-32" />
        <section id="contact" aria-label="Contact placeholder" className="px-6 py-32" />
      </main>
      <SiteFooter />
    </>
  );
}
```

Services / About / Contact remain placeholder anchors until Phase 3.

- [ ] **Step 2: Run dev server and visually confirm**

Run `pnpm dev` (background), wait 5s, then:
```bash
curl -s http://localhost:3000 | grep -oE "(Software that stands|Tender Match|Coming soon|Geist)" | sort -u
```
Expected list: `Coming soon`, `Software that stands`, `Tender Match` (Geist comes through font-family so may not match — that's fine).

Stop the dev server.

- [ ] **Step 3: Build and check static export**

Run: `pnpm build`
Then:
```bash
grep -c "Tender Match" out/index.html
grep -c "data-status=\"live\"" out/index.html
grep -c "data-status=\"coming-soon\"" out/index.html
```
Expected: at least `1`, `3`, `6` respectively.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(page): mount Hero + ProductsSection"
```

---

## Task 10: Extend Playwright smoke tests for Phase 2

**Files:**
- Modify: `tests/e2e/foundation.spec.ts`
- Modify: `tests/e2e/production.spec.ts` (defer; production tests run against the live URL which already shows Phase 2 once Tasks 1-9 are merged)

- [ ] **Step 1: Append Phase 2 specs to `tests/e2e/foundation.spec.ts`**

Add a new `test.describe("Phase 2 hero + products", () => { ... })` block at the **end** of the file (after the existing Phase 1 describe), containing:

```ts
test.describe("Phase 2 hero + products", () => {
  test("hero CTA is visible above the fold on mobile (iPhone 14 Pro)", async ({
    page,
  }, testInfo) => {
    test.skip(
      !testInfo.project.name.includes("mobile"),
      "Above-fold check is mobile-specific",
    );
    await page.goto("/");
    const cta = page.getByTestId("hero-cta");
    await expect(cta).toBeVisible();
    const box = await cta.boundingBox();
    // 393x852 viewport → CTA must sit above y=852 without scrolling.
    expect(box?.y).toBeDefined();
    expect((box?.y ?? Infinity) + (box?.height ?? 0)).toBeLessThan(852);
  });

  test("hero stat reflects the product list", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/shipped \d+ products · building \d+ more/)).toBeVisible();
  });

  test("all nine product cards render with correct status badges", async ({
    page,
  }) => {
    await page.goto("/");
    const liveBadges = page.locator('[data-status="live"]');
    const soonBadges = page.locator('[data-status="coming-soon"]');
    await expect(liveBadges).toHaveCount(3);
    await expect(soonBadges).toHaveCount(6);
  });

  test("Éist card is an external link to eist.app", async ({ page }) => {
    await page.goto("/");
    const card = page.getByTestId("product-card-eist");
    await expect(card).toHaveAttribute("href", "https://eist.app");
    await expect(card).toHaveAttribute("target", "_blank");
    await expect(card).toHaveAttribute("rel", /noopener/);
  });

  test("Coming-Soon cards are not anchors", async ({ page }) => {
    await page.goto("/");
    for (const id of [
      "tender-match",
      "grant-match",
      "funding-alerts",
      "are-we-there-yet",
      "ogma",
      "student-placement",
    ]) {
      const card = page.getByTestId(`product-card-${id}`);
      await expect(card).toBeVisible();
      await expect(card).not.toHaveAttribute("href", /.*/);
    }
  });

  test("OSS strip surfaces blindfold-env and craobh as github links", async ({
    page,
  }) => {
    await page.goto("/");
    const blindfold = page.getByTestId("oss-card-blindfold-env");
    const craobh = page.getByTestId("oss-card-craobh");
    await expect(blindfold).toHaveAttribute(
      "href",
      "https://github.com/williamomeara/blindfold-env",
    );
    await expect(blindfold).toHaveAttribute("target", "_blank");
    await expect(craobh).toHaveAttribute(
      "href",
      "https://github.com/williamomeara/craobh",
    );
  });

  test("hero CTA scrolls to contact", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("hero-cta").click();
    await expect(page).toHaveURL(/#contact$/);
  });
});
```

- [ ] **Step 2: Run the suite**

Run: `pnpm test:e2e`
Expected: all existing Phase 1 tests still pass (5 × 2 = 10), plus 7 new tests × 2 projects = 14 — total 24. The above-fold test skips on `desktop-chromium` (it's mobile-only via `test.skip`), so the effective count is 23 passing tests + 1 skipped.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/foundation.spec.ts
git commit -m "test(e2e): add Phase 2 hero + products assertions"
```

---

## Task 11: Push, watch CI, verify production

**Files:** none

- [ ] **Step 1: Push to main**

```bash
git push
```

- [ ] **Step 2: Watch CI**

Run: `gh run watch` (or `gh run list --limit 1 && gh run view --log` if `watch` isn't desired).

Expected: workflow completes green (lint + typecheck + build + Playwright 21 passing).

- [ ] **Step 3: Smoke-test production**

After Vercel auto-deploys (typically <60s after push lands):
```bash
curl -sI https://cuchulainntech.ie/ | head -3
curl -s https://cuchulainntech.ie/ | grep -c "Tender Match"
curl -s https://cuchulainntech.ie/ | grep -c "shipped 3 products"
```
Expected: HTTP 200, both grep counts ≥ 1.

- [ ] **Step 4: Run the production Playwright config**

```bash
pnpm exec playwright test --config playwright.prod.config.ts
```
Expected: 10/10 production specs still pass (Phase 1 smoke + analytics check) on the canonical `.ie` URL.

Add a follow-up: `production.spec.ts` could be extended in a small follow-up to assert the 9 product cards render on prod too — but it's not strictly required for Phase 2 sign-off because the local `foundation.spec.ts` already runs against the same built code.

---

## Task 12: Update ROADMAP.md and mark Phase 2 complete

**Files:**
- Modify: `.planning/ROADMAP.md`

- [ ] **Step 1: Update ROADMAP**

In `.planning/ROADMAP.md`:
1. Top-level checklist: change `- [ ] **Phase 2: Core Content**` to `- [x] **Phase 2: Core Content**`
2. Phase 2 Details block: `**Plans**: TBD` → `**Plans**: 2026-05-16-phase-2-core-content.md ✅`
3. Progress table row: `| 2. Core Content | 0/TBD | Not started | - |` → `| 2. Core Content | 1/1 | Completed | <today's date> |`

- [ ] **Step 2: Commit and push**

```bash
git add .planning/ROADMAP.md
git commit -m "chore: mark Phase 2 (Core Content) complete"
git push
```

---

## Out of Scope for Phase 2 (deferred)

- Services / About / Contact section content — Phase 3
- Replacing the mailto CTA with a Resend-backed contact form — v2 (after Phase 3 ships)
- OG image / sitemap / robots.txt — Phase 4
- Scroll-reveal animations via Motion v12 — Phase 4 (the hero orb is pure CSS, no JS animation library yet)
- Real shadcn `init` + first primitive — pulled in when Services/About need form inputs or modals in Phase 3
- Magic UI imports — deferred; the bento layout here is plain CSS grid
- README "Next.js 15" → "16" doc drift — small one-shot doc sweep alongside Phase 2 wrap-up if convenient, or its own micro-task
