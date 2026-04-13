# Technology Stack

**Project:** Cuchulainn Tech Landing Page
**Researched:** 2026-04-13

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x (latest stable) | Application framework | Vercel-native, App Router for RSC, static export capability, zero-config deploy, the obvious choice when deploying to Vercel. React 19 support included. |
| React | 19.x | UI runtime | Ships with Next.js 15. React Compiler (experimental) reduces manual memo work. |
| TypeScript | 5.x | Type safety | First-class support in Next.js 15 (incl. `next.config.ts`). Non-negotiable for a professional landing page. |

**Rationale for Next.js over Astro:** Astro 5 produces measurably faster static pages (~40% faster builds, ~90% less JS by default) and is the "correct" choice for pure content sites. However, Cuchulainn Tech's brief explicitly references Next.js 15, the team has existing Next.js familiarity, and the site needs Vercel-native zero-config deploy. The performance gap is real but largely irrelevant at this scale — a 6-section landing page will score 95+ Lighthouse either way. Next.js wins on ecosystem fit, not raw performance.

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | v4.0 (stable since Jan 22, 2025) | Utility-first styling | CSS-first config, full builds 5x faster than v3, native CSS variables for design tokens, built-in container queries. The v4 `@theme` system maps directly to the dark design tokens needed for a Linear/Vercel aesthetic. |
| CSS Variables via `@theme` | Built into Tailwind v4 | Design token system | All tokens auto-exposed as native CSS vars. Define brand colors (dark backgrounds, accent gradients, Irish-inspired palette) once, used everywhere. |

**Important:** Tailwind v4 drops the `tailwind.config.js` file. Configuration lives in `globals.css` via `@theme`. This is not a downside — it simplifies the project considerably.

### Component Foundation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| shadcn/ui | Latest (fully Tailwind v4 + React 19 compatible as of 2025) | Accessible component primitives | Copy-paste primitives (not a runtime dependency), fully compatible with Tailwind v4, zero JavaScript runtime overhead, produces 5-15KB CSS in production. Use for: buttons, dialogs, forms, navigation. |
| Magic UI | Latest | Marketing-specific animated components | Built on shadcn philosophy but for landing page patterns — hero sections, feature grids, "bento" layouts, shimmer/gradient effects. Dark-mode-first. Built with Tailwind + Motion. Ideal for the "impressive" requirement. |

**Do NOT use Aceternity UI as a primary library.** It's visually striking but adds significant bundle weight, has inconsistent maintenance, and many effects are too loud for a client/investor audience. Use Aceternity sparingly — at most 1-2 specific effects — or skip it entirely in favor of Magic UI.

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Motion (formerly Framer Motion) | v12.x (package: `motion`, import: `motion/react`) | UI animations, scroll reveals, micro-interactions | Rebranded from `framer-motion` in 2025. Same API, now independent. v12 adds oklch/oklab color support, hardware-accelerated scroll animations, layout animation improvements. 32KB bundle. The React-idiomatic choice for Next.js projects. |

**Do NOT use GSAP** for this project unless a specific animation sequence genuinely demands it. GSAP adds 48KB, requires a paid license for many premium features (ScrollTrigger business use), and its imperative API fights React's render model. The scroll reveals and entrance animations needed for a landing page are well within Motion's capabilities.

**Do NOT use React Spring** — it's fallen behind in adoption and DX compared to Motion.

### Dark Mode

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next-themes | 0.4.x | Theme management | "No-flash" dark/light toggling in Next.js App Router. Use with `attribute="data-theme"` + `@custom-variant dark` in Tailwind v4 to avoid hydration errors. The de-facto standard — 2376+ npm dependents. |

**Recommendation:** Default to dark mode. Cuchulainn Tech's audience (developers, technical clients, investors) skews dark mode. Set `defaultTheme="dark"` and optionally offer a toggle. Do not fight the theme — lean into it.

### Typography

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/font` | Built into Next.js 15 | Font loading | Zero layout shift, self-hosted from Google Fonts, no external requests. Use `font-display: swap`. |
| Geist (Vercel's font) | Latest | Primary typeface | Sharp, modern, technical — exactly the Linear/Vercel aesthetic. Free, open source. Available via `geist` npm package or `next/font/google`. Pairs excellently with the dark aesthetic. |

**Alternative font pairing:** Inter (body) + Geist Mono (code/accents). If more personality is needed for Irish identity, consider a secondary display font for hero headings only — but keep body copy in Geist/Inter for legibility.

### Forms & Contact

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React Hook Form | 7.x | Contact form state | Minimal re-renders, schema integration, works perfectly with shadcn/ui form components. |
| Zod | 3.x | Form validation schema | Pairs with React Hook Form via `@hookform/resolvers`. TypeScript-first. Standard pattern in 2025 Next.js projects. |
| Resend (or similar) | Latest | Email delivery | For the contact CTA — Server Actions + Resend is the modern approach. No backend service needed, works serverless on Vercel. |

### Development Tooling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Turbopack | Built into Next.js 15 (stable) | Dev server | `next dev --turbo` is now stable. 76% faster startup, 96% faster Fast Refresh vs webpack. No configuration needed. |
| ESLint | 9.x | Linting | Next.js 15 ships with ESLint 9 support. |
| Prettier | 3.x | Formatting | Standard; add `prettier-plugin-tailwindcss` for automatic class sorting. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 15 | Astro 5 | Astro is objectively better for pure content sites (40% faster, 90% less JS). Rejected because: team's stated preference, Vercel-native DX, and the performance gap is negligible at this project's scale. Revisit for future content-heavy microsites. |
| Styling | Tailwind v4 | Tailwind v3 | v3 is in maintenance mode. v4 has been stable since Jan 2025. No reason to start a greenfield project on the older version. |
| Animation | Motion v12 | GSAP | GSAP is more powerful for complex timeline animations but adds 48KB, fights React's model, and premium features require licensing. Motion handles everything this project needs. |
| Components | shadcn/ui + Magic UI | Radix UI (bare) | shadcn/ui IS Radix UI, just pre-styled. Using bare Radix means building all the styling from scratch — wasted effort on a landing page. |
| Components | shadcn/ui + Magic UI | Chakra UI / MUI | Runtime CSS-in-JS overhead. MUI's design language fights the Linear/Vercel aesthetic. Not appropriate. |
| Components | shadcn/ui + Magic UI | Aceternity UI (primary) | Too heavy, too noisy, inconsistent maintenance. Use at most 1-2 effects from Aceternity if needed, not as the primary component system. |
| Dark Mode | next-themes | Custom CSS vars only | CSS variables work but next-themes handles the FOUC (flash of unstyled content) problem correctly and adds system preference detection for free. No reason to reinvent this. |
| Fonts | Geist | Inter | Both are excellent. Geist is more distinctive and technically on-brand for a dev company. Inter is the safe fallback if the team prefers it. |

---

## What NOT to Use

### Create React App / Vite (standalone)
Not SEO-friendly without SSR. Vite alone doesn't give you the metadata, OG image, or sitemap tooling Next.js provides out of the box.

### Pages Router
App Router is the current direction. Pages Router still works but is not getting new features. Start with App Router.

### CSS Modules / styled-components / emotion
Tailwind v4 makes these unnecessary. CSS-in-JS approaches add runtime overhead and fight the Tailwind model. Pick one paradigm.

### Bootstrap / Bulma
Not appropriate for a 2025 tech landing page. Heavy, opinionated, hard to make look premium.

### Lottie animations
Heavy JSON payloads, difficult to customize colors for dark mode, poor performance on mobile. Use Motion for SVG animations and CSS for loaders instead.

### react-scroll / AOS (Animate on Scroll)
Legacy libraries. Motion's `useInView` / `whileInView` API handles scroll-triggered animations natively within React.

### next-sitemap
Unnecessary — Next.js 15 App Router has built-in sitemap support via `app/sitemap.ts`. No extra package needed.

---

## Installation

```bash
# Scaffold
npx create-next-app@latest cuchulainntech-landing \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

# Core dependencies
npm install motion next-themes geist

# Form stack
npm install react-hook-form zod @hookform/resolvers

# shadcn/ui (interactive CLI)
npx shadcn@latest init

# Add specific shadcn components as needed
npx shadcn@latest add button card badge navigation-menu

# Magic UI (copy-paste, not a runtime dep — add components via CLI or manually)
# See https://magicui.design/docs/installation

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss @types/node
```

**Note on Tailwind v4:** `create-next-app` now scaffolds with Tailwind v4 by default. The old `tailwind.config.js` is not generated — configuration lives in `app/globals.css` via `@theme`. The shadcn init CLI is also Tailwind v4-aware.

---

## Confidence Levels

| Decision | Confidence | Basis |
|----------|------------|-------|
| Next.js 15 | HIGH | Official Vercel docs, stable release Oct 2024 |
| Tailwind v4 | HIGH | Official release blog, stable since Jan 22, 2025 |
| shadcn/ui | HIGH | Official docs confirm v4 + React 19 support |
| Motion v12 | HIGH | motion.dev official docs, confirmed rebrand from framer-motion |
| next-themes | HIGH | GitHub repo, 2376+ npm dependents, shadcn/ui integration confirmed |
| Magic UI | MEDIUM | Community-verified, DEV.to articles, no single authoritative spec |
| Geist font | HIGH | Vercel open-source release, used on nextjs.org and vercel.com |
| GSAP avoidance | HIGH | Bundle size and licensing confirmed from official sources |
| Astro alternative | HIGH | Multiple 2025/2026 comparison articles + official benchmarks |

---

## Sources

- [Next.js 15 Official Release Blog](https://nextjs.org/blog/next-15) — features, React 19 support, Turbopack stable
- [Tailwind CSS v4.0 Release Blog](https://tailwindcss.com/blog/tailwindcss-v4) — stable Jan 22, 2025, CSS-first config
- [shadcn/ui Tailwind v4 Docs](https://ui.shadcn.com/docs/tailwind-v4) — compatibility confirmation
- [Motion Official Docs](https://motion.dev/docs/react) — Framer Motion rebrand, v12 features
- [GSAP vs Motion Comparison](https://motion.dev/docs/gsap-vs-motion) — official Motion team comparison
- [next-themes GitHub](https://github.com/pacocoursey/next-themes) — dark mode implementation
- [Astro vs Next.js 2026 comparison (WPPoland)](https://wppoland.com/en/astro-5-vs-nextjs-15-comparison-2026/) — performance benchmarks
- [Magic UI](https://magicui.design/) — animated marketing components
- [Aceternity UI](https://ui.aceternity.com/) — reviewed, not recommended as primary library
