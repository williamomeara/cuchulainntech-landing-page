# Phase 1: Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A Next.js 15 + Tailwind v4 site deployed to Vercel that loads in dark mode with no FOUC, renders the Geist font, and shows a fixed NavBar and legal footer.

**Architecture:** Single Next.js 15 App Router project at the repo root. Static export (`output: 'export'`) — pure CDN delivery, no server compute. Tailwind v4 CSS-first config with design tokens in `globals.css` (`@theme` block). `next-themes` with `attribute="data-theme"` + `defaultTheme="dark"` + `enableSystem={false}` ensures a no-flash dark start. Public GitHub repo connected to a Vercel project; PR-time CI via GitHub Actions covers lint + type-check + Playwright smoke tests. Cloudflare DNS / custom domain wiring happens in a follow-up phase once Phase 2's content is real.

**Tech Stack:**
- Next.js 15 (App Router, Turbopack dev)
- React 19
- TypeScript 5 strict
- Tailwind CSS v4 (CSS-first config)
- `next/font/google` → Geist Sans + Geist Mono
- `next-themes` 0.4.x
- shadcn `lib/utils.ts` (cn helper — full shadcn install lands in Phase 2)
- Playwright (smoke tests against the built static export)
- pnpm
- GitHub Actions (CI)
- Vercel (deploy)

**Requirements covered:** FOUND-01, FOUND-02, FOUND-03

---

## File Structure

```
cuchulainntech_landing_page/
├── .github/workflows/ci.yml                CREATE — lint + type-check + Playwright on PR
├── .gitignore                              CREATE — Next.js standard + extras
├── .vercelignore                           CREATE — exclude .planning/ and design/ from deploy bundle
├── .planning/                              existing — already tracked
├── design/                                 existing — already tracked
├── public/favicon.ico                      CREATE — placeholder green-square icon
├── src/
│   ├── app/
│   │   ├── layout.tsx                      CREATE — html shell, fonts, ThemeProvider
│   │   ├── page.tsx                        CREATE — landing page composition
│   │   └── globals.css                     CREATE — Tailwind v4 + @theme tokens + @custom-variant dark
│   ├── components/
│   │   ├── theme-provider.tsx              CREATE — thin next-themes wrapper
│   │   ├── site-header.tsx                 CREATE — fixed NavBar with anchor links + CTA pill
│   │   └── site-footer.tsx                 CREATE — legal footer with CRO number
│   └── lib/utils.ts                        CREATE — `cn()` helper (clsx + tailwind-merge)
├── tests/e2e/foundation.spec.ts            CREATE — Playwright smoke tests for Phase 1 criteria
├── playwright.config.ts                    CREATE — Playwright config (chromium, mobile + desktop)
├── eslint.config.mjs                       CREATE via create-next-app
├── next.config.ts                          CREATE via create-next-app, then patch for static export
├── package.json                            CREATE via create-next-app
├── postcss.config.mjs                      CREATE via create-next-app
├── tsconfig.json                           CREATE via create-next-app
├── README.md                               CREATE — short project readme
└── CLAUDE.md                               existing — already tracked
```

---

## Task 1: Initialize Next.js 15 project at repo root

**Files:**
- Create (via scaffold): `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `src/app/{layout.tsx,page.tsx,globals.css}`, `public/*`
- Delete after scaffold: scaffold-default `src/app/page.tsx` content (we replace it in Task 8), `README.md` (we rewrite in Task 11)

- [ ] **Step 1: Confirm working directory is the repo root**

Run: `pwd && ls`
Expected: directory ends in `cuchulainntech_landing_page` and shows `.planning  CLAUDE.md  design`.

- [ ] **Step 2: Scaffold Next.js into the existing directory**

Run:
```bash
pnpm create next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --turbopack \
  --import-alias "@/*" \
  --use-pnpm
```

When create-next-app prompts about the non-empty directory, choose "Continue" / yes. It will skip the existing `.planning/`, `design/`, `CLAUDE.md`, `.git/` and write the new files alongside.

Expected: scaffold completes; new files appear (`package.json`, `next.config.ts`, `src/app/...`, `public/...`).

- [ ] **Step 3: Verify package.json has expected dependencies**

Run: `cat package.json | jq '{name, dependencies, devDependencies}'`
Expected: `next`, `react`, `react-dom` in `dependencies`; `typescript`, `tailwindcss`, `@types/*`, `eslint-config-next` in `devDependencies`. Versions: Next 15.x, React 19.x, Tailwind 4.x.

- [ ] **Step 4: Run dev server briefly to confirm boot**

Run: `pnpm dev` in one terminal, then in a second terminal:
```bash
sleep 5 && curl -s http://localhost:3000 | grep -o "<title>.*</title>"
```
Expected: a `<title>` tag is returned (the create-next-app default). Stop the dev server (`Ctrl+C` in the first terminal).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(scaffold): initialize Next.js 15 + Tailwind v4 + TypeScript"
```

---

## Task 2: Wire static export in next.config.ts

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Replace next.config.ts contents**

Write `next.config.ts`:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
```

Why `images: { unoptimized: true }`: static export disables the default image optimizer, which would otherwise need a server. We accept manual sizing for now; revisit if/when CLS becomes a measurable problem.

- [ ] **Step 2: Build and confirm /out is produced**

Run: `pnpm build`
Expected: build succeeds, the message ends with `Generating static pages` / `Exporting`, and a top-level `out/` directory is created containing `index.html`.

- [ ] **Step 3: Add /out to .gitignore**

Append to `.gitignore` (create or extend):
```
# next.js static export output
/out

# playwright
/test-results
/playwright-report
/playwright/.cache
```

(Verify the standard create-next-app `.gitignore` already covers `.next/`, `node_modules/`, `.env*`.)

- [ ] **Step 4: Commit**

```bash
git add next.config.ts .gitignore
git commit -m "feat(build): enable static export with unoptimised images"
```

---

## Task 3: Replace globals.css with Tailwind v4 + design tokens

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css contents**

Write `src/app/globals.css`:
```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme {
  /* Surfaces */
  --color-background:         #0a0a0a;
  --color-background-up:      #111111;
  --color-card:    #101010;

  /* Brand accent — Celtic green */
  --color-accent:        oklch(0.72 0.18 145);
  --color-accent-faint:  oklch(0.72 0.18 145 / 0.10);
  --color-accent-rim:    oklch(0.72 0.18 145 / 0.28);
  --color-accent-pill:   oklch(0.80 0.14 145);

  /* Text */
  --color-foreground:       #efefef;
  --color-muted-foreground: #888888;
  --color-foreground-faint: #3d3d3d;

  /* Borders */
  --color-border:    rgba(255, 255, 255, 0.07);
  --color-border-hi: rgba(255, 255, 255, 0.14);

  /* Radii */
  --radius-card: 14px;

  /* Typography (wired in Task 4 via next/font CSS variables) */
  --font-sans: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-geist-mono), "SF Mono", monospace;
}

/* Reset and base */
*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* Subtle dot-grid texture, fixed behind content */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.032) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  z-index: 0;
}

a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
button { font-family: inherit; cursor: pointer; }
```

Tokens mirror the values used in the design prototype (`design/claude-design-handoff/cu-chulainn-tech-landing-page/project/Landing Page.html`) so the final implementation matches by construction.

- [ ] **Step 2: Verify build still works**

Run: `pnpm build`
Expected: build succeeds with no Tailwind warnings about undefined `@theme` variables.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(theme): add brand tokens to globals.css via @theme"
```

---

## Task 4: Wire Geist Sans + Geist Mono via next/font

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx contents**

Write `src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cuchulainntech.ie"),
  title: {
    default: "Cuchulainn Tech — Irish Software Studio",
    template: "%s · Cuchulainn Tech",
  },
  description:
    "An Irish studio shipping SaaS products and custom apps for ambitious teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

`suppressHydrationWarning` on `<html>` is required so the `data-theme` attribute next-themes will set client-side does not produce a React hydration mismatch warning.

- [ ] **Step 2: Build and verify Geist is referenced**

Run: `pnpm build && grep -r "geist" .next/static/css 2>/dev/null | head -5`
Expected: at least one CSS chunk references the Geist font URL.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(typography): load Geist Sans + Mono via next/font"
```

---

## Task 5: Install next-themes and wrap the app

**Files:**
- Create: `src/components/theme-provider.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Install next-themes**

Run: `pnpm add next-themes`
Expected: `next-themes` appears in `dependencies` in `package.json` at version `^0.4.x`.

- [ ] **Step 2: Create ThemeProvider**

Write `src/components/theme-provider.tsx`:
```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

- [ ] **Step 3: Wrap children in layout.tsx**

Modify `src/app/layout.tsx` — replace the `<body>` block:
```tsx
import { ThemeProvider } from "@/components/theme-provider";
// ... existing imports above

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="cuchulainn-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

`enableSystem={false}` is the FOUC-prevention choice: with no system-preference check, no client-side flip ever happens on first paint. The static HTML already carries `data-theme="dark"` (set in the JSX above), so the page starts dark and stays dark.

- [ ] **Step 4: Build and confirm no warnings**

Run: `pnpm build`
Expected: build succeeds, no warnings about hydration or missing client boundary.

- [ ] **Step 5: Commit**

```bash
git add src/components/theme-provider.tsx src/app/layout.tsx package.json pnpm-lock.yaml
git commit -m "feat(theme): wire next-themes with forced dark default"
```

---

## Task 6: Build the SiteHeader (NavBar)

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/components/site-header.tsx`

- [ ] **Step 1: Install cn helpers**

Run: `pnpm add clsx tailwind-merge`
Expected: `clsx` and `tailwind-merge` appear in `dependencies`.

- [ ] **Step 2: Create cn utility**

Write `src/lib/utils.ts`:
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Create SiteHeader**

Write `src/components/site-header.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#products", label: "Products" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled
          ? "bg-[color:var(--color-background)]/70 backdrop-blur-md border-b border-[color:var(--color-border)]"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a
          href="#hero"
          className="flex items-center gap-2 text-[15px] font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--color-accent)]"
          />
          Cuchulainn Tech
        </a>

        <ul className="hidden items-center gap-8 text-sm text-[color:var(--color-muted-foreground)] md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-[color:var(--color-foreground)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={cn(
            "rounded-full border border-[color:var(--color-accent-rim)]",
            "bg-[color:var(--color-accent-faint)] px-4 py-2 text-sm font-medium",
            "text-[color:var(--color-accent-pill)] transition-colors",
            "hover:bg-[color:var(--color-accent)]/15"
          )}
        >
          Get in Touch
        </a>
      </nav>
    </header>
  );
}
```

Mobile (`md:hidden`) currently hides the anchor list and shows just wordmark + CTA — a hamburger menu is unnecessary for a 3-link nav on a single-page site. Reassess when nav grows.

- [ ] **Step 4: Verify build**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/lib/utils.ts src/components/site-header.tsx package.json pnpm-lock.yaml
git commit -m "feat(nav): add fixed SiteHeader with anchor links and CTA"
```

---

## Task 7: Build the SiteFooter

**Files:**
- Create: `src/components/site-footer.tsx`

- [ ] **Step 1: Create SiteFooter**

Write `src/components/site-footer.tsx`:
```tsx
export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="relative z-10 border-t border-[color:var(--color-border)] py-8 text-sm text-[color:var(--color-muted-foreground)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 Cú Chulainn Tech Limited · CRO 812722 · Ireland
        </p>
        <p className="text-[color:var(--color-foreground-faint)]">
          {/* Social links land in Phase 3 once handles are known */}
        </p>
      </div>
    </footer>
  );
}
```

Why bare CRO line and an empty social slot: the requirement (CONT-03) is satisfied by the legal line; social handles aren't decided yet. Empty `<p>` keeps the flex spacing predictable so Phase 3 can drop icons in without layout shift.

- [ ] **Step 2: Verify build**

Run: `pnpm build`

- [ ] **Step 3: Commit**

```bash
git add src/components/site-footer.tsx
git commit -m "feat(footer): add legal footer with CRO 812722"
```

---

## Task 8: Compose page.tsx with header, hero shell, and footer

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx contents**

Write `src/app/page.tsx`:
```tsx
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10">
        <section
          id="hero"
          aria-label="Hero"
          className="flex min-h-[85vh] items-center justify-center px-6 pt-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="mb-6 inline-block rounded-full border border-[color:var(--color-border)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted-foreground)]"
            >
              Irish Software Studio
            </p>
            <h1 className="text-balance text-5xl font-extrabold leading-[1.06] tracking-[-0.05em] md:text-7xl">
              Software that stands<br />its ground.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[color:var(--color-muted-foreground)]">
              Phase 1 foundation — real hero copy and product showcase land in
              Phase 2.
            </p>
          </div>
        </section>

        <section id="products" aria-label="Products placeholder" className="px-6 py-32" />
        <section id="services" aria-label="Services placeholder" className="px-6 py-32" />
        <section id="about" aria-label="About placeholder" className="px-6 py-32" />
        <section id="contact" aria-label="Contact placeholder" className="px-6 py-32" />
      </main>
      <SiteFooter />
    </>
  );
}
```

Empty section anchors exist so the NavBar links and the eventual CTA `#contact` jump don't dead-end during Phase 1 verification. They're populated in Phase 2 and 3.

- [ ] **Step 2: Run dev server and visually confirm**

Run `pnpm dev`, open `http://localhost:3000`, confirm:
- Page loads dark
- Wordmark + nav + CTA visible at top
- Hero heading renders in Geist
- Footer renders the legal line

Then stop the dev server.

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: build succeeds; `out/index.html` contains the hero heading and footer text. Verify:
```bash
grep -c "Cú Chulainn Tech Limited · CRO 812722" out/index.html
```
Expected: `1`.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(page): compose phase-1 shell — header, hero skeleton, footer"
```

---

## Task 9: Add Playwright + Phase 1 smoke tests

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/foundation.spec.ts`
- Modify: `package.json` (add scripts)

- [ ] **Step 1: Install Playwright**

Run:
```bash
pnpm add -D @playwright/test
pnpm exec playwright install --with-deps chromium
```

- [ ] **Step 2: Create playwright config**

Write `playwright.config.ts`:
```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-iphone", use: { ...devices["iPhone 14 Pro"] } },
  ],
});
```

- [ ] **Step 3: Write smoke tests**

Write `tests/e2e/foundation.spec.ts`:
```ts
import { test, expect } from "@playwright/test";

test.describe("Phase 1 foundation", () => {
  test("page starts in dark mode with no flash", async ({ page }) => {
    await page.goto("/");
    const theme = await page.locator("html").getAttribute("data-theme");
    expect(theme).toBe("dark");

    const bodyBg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor
    );
    // #0a0a0a → rgb(10, 10, 10)
    expect(bodyBg).toBe("rgb(10, 10, 10)");
  });

  test("Geist Sans renders, not a system fallback", async ({ page }) => {
    await page.goto("/");
    const h1FontFamily = await page.locator("h1").evaluate(
      (el) => getComputedStyle(el).fontFamily
    );
    // next/font hashes the family name (e.g. `__Geist_abc123`) but the
    // literal "Geist" segment is always present.
    expect(h1FontFamily).toMatch(/geist/i);
  });

  test("site header is fixed at top across viewports", async ({ page }) => {
    await page.goto("/");
    const header = page.getByTestId("site-header");
    await expect(header).toBeVisible();
    const position = await header.evaluate(
      (el) => getComputedStyle(el).position
    );
    expect(position).toBe("fixed");
    const box = await header.boundingBox();
    expect(box?.y).toBe(0);
  });

  test("footer shows legal identity with CRO number", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByTestId("site-footer");
    await expect(footer).toContainText(
      "Cú Chulainn Tech Limited · CRO 812722 · Ireland"
    );
  });

  test("clicking 'Get in Touch' scrolls to #contact", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Get in Touch" }).click();
    await expect(page).toHaveURL(/#contact$/);
  });
});
```

- [ ] **Step 4: Add scripts to package.json**

Modify `package.json` `scripts`:
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test:e2e": "playwright test"
  }
}
```

(Preserve any existing scripts; only add `typecheck` and `test:e2e`.)

- [ ] **Step 5: Run the smoke tests**

Run: `pnpm test:e2e`
Expected: all five tests pass on both `desktop-chromium` and `mobile-iphone` projects (10 passing tests total).

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts tests/ package.json pnpm-lock.yaml
git commit -m "test(e2e): add Playwright smoke tests for Phase 1 criteria"
```

---

## Task 10: Add GitHub Actions CI

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create CI workflow**

Write `.github/workflows/ci.yml`:
```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm typecheck

      - name: Build
        run: pnpm build

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps chromium

      - name: E2E tests
        run: pnpm test:e2e

      - name: Upload Playwright report on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

Node 22 (the GH Actions LTS) is fine even though local dev is on 24 — Next.js 15 supports both.

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add lint + typecheck + build + Playwright on PR"
```

---

## Task 11: Project README and .vercelignore

**Files:**
- Modify: `README.md`
- Create: `.vercelignore`

- [ ] **Step 1: Replace README.md**

Write `README.md`:
```markdown
# Cuchulainn Tech — Landing Page

The marketing site for Cú Chulainn Tech Limited (CRO 812722).

- **Stack:** Next.js 15 (App Router, static export), Tailwind v4, next-themes, Geist
- **Hosting:** Vercel
- **DNS:** Cloudflare → `cuchulainntech.ie` (canonical), `cuchulainntech.com` (301 → .ie)
- **Project docs:** see `.planning/`
- **Design handoff:** see `design/`

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test:e2e     # Playwright smoke tests
pnpm build        # static export → ./out
```

## Deploy

`main` deploys automatically on Vercel. PRs get preview deploys.
```

- [ ] **Step 2: Create .vercelignore**

Write `.vercelignore`:
```
.planning
design
tests
playwright.config.ts
playwright-report
test-results
```

This keeps the deploy bundle lean — Vercel only ships the Next.js build output.

- [ ] **Step 3: Commit**

```bash
git add README.md .vercelignore
git commit -m "docs: rewrite README; add .vercelignore"
```

---

## Task 12: Public GitHub repo + first push

**Files:** none

- [ ] **Step 1: Confirm gh is authenticated**

Run: `gh auth status`
Expected: shows you logged in to github.com. If not, run `gh auth login` interactively.

- [ ] **Step 2: Create public repo and push**

Run from the repo root:
```bash
gh repo create cuchulainntech-landing-page \
  --public \
  --source=. \
  --remote=origin \
  --description "Cuchulainn Tech — Irish software studio landing page" \
  --push
```

Expected: command prints the repo URL, the local `main` branch is pushed.

- [ ] **Step 3: Verify**

Run: `gh repo view --json url,visibility | jq`
Expected: `visibility: "PUBLIC"`, URL points to `github.com/<user>/cuchulainntech-landing-page`.

- [ ] **Step 4: Confirm CI ran on push**

Run: `gh run list --limit 1`
Expected: a single workflow run appears (status may still be in_progress). Optional: `gh run watch` to wait for it.

If CI fails: read the failure log via `gh run view --log-failed`, fix the underlying issue with a normal commit, push, and re-check. Do not mark this task complete until CI is green.

---

## Task 13: Vercel project + first deploy

**Files:** none

- [ ] **Step 1: Install Vercel CLI**

Run: `pnpm add -g vercel` (or skip if already installed — verify with `vercel --version`).

- [ ] **Step 2: Log in via CLI**

Run: `vercel login`
Choose GitHub auth.

- [ ] **Step 3: Link and deploy**

Run from the repo root:
```bash
vercel link
```
Accept the project-name default (`cuchulainntech-landing-page`). Choose your personal scope.

Then:
```bash
vercel deploy --prod
```

Vercel detects Next.js, builds with the static-export configuration, and assigns a `*.vercel.app` URL. Copy the URL from the CLI output.

- [ ] **Step 4: Enable Vercel Web Analytics**

In the Vercel dashboard:
- Project → Analytics → Enable Web Analytics
- It will give a small snippet — but for Next.js, we add the React package:

Run: `pnpm add @vercel/analytics`

Modify `src/app/layout.tsx` — inside `<body>`, after `<ThemeProvider>...</ThemeProvider>`, add the Analytics component:
```tsx
import { Analytics } from "@vercel/analytics/next";
// ...
<ThemeProvider /* ...props */>
  {children}
</ThemeProvider>
<Analytics />
```

- [ ] **Step 5: Commit and redeploy**

```bash
git add src/app/layout.tsx package.json pnpm-lock.yaml
git commit -m "feat(analytics): add Vercel Web Analytics"
git push
```

Push triggers an automatic Vercel production redeploy.

- [ ] **Step 6: Hit the deployed URL**

Open the `*.vercel.app` URL in a browser. Confirm visually:
- Page starts dark, no white flash
- NavBar visible at top, wordmark + 3 links + CTA pill
- Geist font is rendering (sharp, distinctive)
- Footer shows the CRO line
- DevTools → Network → confirms no failed font/image requests
- DevTools → Console → no errors

---

## Task 14: Final verification against Phase 1 success criteria

**Files:** none

- [ ] **Step 1: Run Phase 1 success-criteria checklist**

From the ROADMAP.md Phase 1 success criteria:

1. **No FOUC on load:** Throttle network to "Slow 3G" in DevTools and reload. Page should never flash white. ✅
2. **Geist renders:** DevTools → Computed → `font-family` on `h1` shows `"Geist", system-ui, ...`. ✅
3. **NavBar fixed across viewports:** Resize browser from 320px → 1920px. Header stays glued to the top. ✅
4. **Design tokens resolve:** DevTools → Computed → `body` `background-color` is `rgb(10, 10, 10)` (matches `--color-background: #0a0a0a`). ✅

- [ ] **Step 2: Lighthouse spot check**

Run a Lighthouse audit on the deployed `*.vercel.app` URL (Chrome DevTools → Lighthouse → Performance + Accessibility, Mobile).
Targets: Performance ≥ 95, Accessibility ≥ 95.

Capture both scores. Any failures: file a follow-up under Phase 4 (Polish & Launch), don't block Phase 1.

- [ ] **Step 3: Update ROADMAP.md**

Modify `.planning/ROADMAP.md` — flip Phase 1 from `Not started` to `Completed`. Add the completion date.

- [ ] **Step 4: Final commit**

```bash
git add .planning/ROADMAP.md
git commit -m "chore: mark Phase 1 (Foundation) complete"
git push
```

---

## Out of Scope for Phase 1 (deferred)

- Real hero copy and product cards — Phase 2
- Services, About, Contact content — Phase 3
- OG image, sitemap, robots.txt, accessibility audit — Phase 4
- Formal `shadcn init` and component install — Phase 2 when the first shadcn primitive is needed. We deliberately do **not** run `shadcn init` in Phase 1 because it overwrites `globals.css` and would clobber the `@theme` token block from Task 3. The shadcn-style `cn()` helper, the `@/*` import alias, and the Tailwind v4 setup are all in place, so a future `shadcn add <component>` will work after a one-time `components.json` write.
- Magic UI imports — Phase 2 when bento grid lands
- Motion v12 imports — Phase 2 when first animated reveal lands
- Custom domain pointed at Vercel (`cuchulainntech.ie` + `.com` 301) — done as a separate Cloudflare DNS task once Phase 2 is content-complete
- Purelymail records on `.ie` — already in `.planning/DEPLOYMENT.md`, runs once Cloudflare zone is Active
