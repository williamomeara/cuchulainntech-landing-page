# Project Research Summary

**Project:** Cuchulainn Tech Landing Page
**Domain:** B2B tech company landing page (client + investor audience)
**Researched:** 2026-04-13
**Confidence:** HIGH

---

## Executive Summary

Cuchulainn Tech needs a single-page marketing site that converts two audiences simultaneously: potential clients who want to hire a development shop, and investors or partners who want to back an Irish software company. The research consensus is clear: build a fully static Next.js 15 site with App Router, deploy to Vercel, default to dark mode with a Linear/Vercel aesthetic, and keep the architecture deliberately simple — no CMS, no dynamic data, no complex state. The entire page is 7–8 stacked sections; complexity is the enemy here.

The recommended stack (Next.js 15 + Tailwind v4 + shadcn/ui + Motion) is well-validated and all components are confirmed compatible with React 19. The key architectural decision is to treat the page as 100% Server Components with thin Client Component islands only where interaction is unavoidable (mobile nav toggle, contact form, animation wrappers). This keeps the bundle minimal and Core Web Vitals high — which matters because a slow-loading page from a software company destroys credibility before a word is read.

The biggest risks are not technical — they are copy and conversion failures: a hero that describes the company rather than the value proposition, CTAs that compete with each other, and a products section that reads like a stack spec sheet. Establish the color token system and dark mode configuration correctly from day one (Tailwind v4 has breaking changes from v3 and FOUC issues if set up incorrectly), then focus energy on writing copy that converts — particularly the hero headline and product descriptions.

---

## Key Findings

### Recommended Stack

A Vercel-native Next.js 15 stack is the clear choice given the project brief and deployment target. Tailwind v4 is confirmed stable since January 2025, ships with `create-next-app`, and its CSS-first `@theme` system is ideal for the dark design token approach the Linear/Vercel aesthetic requires. Motion v12 (formerly Framer Motion) handles all animation needs within React's model without GSAP's licensing burden.

**Core technologies:**
- **Next.js 15 (App Router)**: Application framework — Vercel-native, static generation, React 19 included
- **React 19**: UI runtime — ships with Next.js 15; no separate install
- **TypeScript 5.x**: Type safety — non-negotiable; first-class Next.js support
- **Tailwind CSS v4**: Styling — CSS-first config, 5x faster builds, native CSS vars for design tokens
- **shadcn/ui**: Component primitives — copy-paste, zero runtime overhead, Tailwind v4 + React 19 confirmed compatible
- **Magic UI**: Marketing components — hero sections, bento layouts, dark-mode-first; built on shadcn philosophy
- **Motion v12** (`motion` package, import from `motion/react`): Animations — React-idiomatic, 32KB, handles all scroll-reveal needs
- **next-themes 0.4.x**: Dark mode — FOUC-free toggling; `defaultTheme="dark"` for dev-audience
- **Geist** (via `next/font/google`): Typography — Vercel's own typeface, sharp and technical
- **React Hook Form 7.x + Zod 3.x**: Contact form — minimal re-renders, TypeScript-first validation
- **Resend** (or Formspree for v1): Email delivery — serverless-compatible; defer custom Server Action to v2

**Do NOT use:** `framer-motion` (old package name), GSAP, Aceternity UI as primary, CMS of any kind, Pages Router, CSS-in-JS, Google Fonts `<link>` tag.

### Expected Features

**Must have (table stakes):**
- Sticky nav — logo left, 3–4 links center, "Get in touch" CTA right
- Hero — bold headline, subheadline, single primary CTA, dark gradient/glow aesthetic
- Products showcase — Éist (live + App Store link), Tender Match (in dev), ATU Grant Demo (coming soon/in progress, no direct link)
- Services section — what custom work looks like, capabilities, "Let's talk" CTA
- About / team — founder photo + bio, collaborators listed by name + role
- Contact section — email link or simple form, dual-audience framing (clients + investors)
- Mobile responsive layout — tested at 375px, 768px, 1280px
- Core Web Vitals 95+ — static rendering + Vercel CDN, `next/image` everywhere
- Footer — logo, links, social profiles, copyright

**Should have (differentiators):**
- Irish cultural identity in copy — hero subheadline references building in Ireland; About section connects Cuchulainn mythology to company ethos (brief, not a costume)
- Product status badges — color-coded pill: green (Live), amber (In Development), grey (Coming Soon)
- Éist device mockup or App Store badge — visual proof the product exists and ships
- Dual-audience CTA framing in contact section — "Building something? Hire us." / "Investing in Irish tech? Let's talk."
- Origin story sentence per product — "why we built this" beats a feature list for investors
- Eyebrow pill in hero — "Now: Tender Match in development" signals active momentum
- Social proof block post-hero — App Store rating or download count for Éist if available
- Subtle scroll-reveal animations — fade-in + translate-up on section entrance (below the fold only)

**Defer to v2+:**
- Contact form (start with mailto in v1; form adds complexity without much launch-day gain)
- Scroll animations (add after content is stable — animating unstable content creates rework)
- Blog / changelog
- Pricing table (never — this is a company page, not a product sales page)
- FAQ section
- Social media feed embeds

### Architecture Approach

The entire site is one route (`/`) composed of stacked Server Component sections, statically generated at build time and served from Vercel's CDN edge. No dynamic data, no CMS, no API calls at runtime — all content is TypeScript constants in `lib/`. Client Components are strictly isolated: NavBar (mobile menu toggle), ContactForm (form state), AnimateOnScroll wrappers (Framer Motion requires browser API), and ThemeProvider (next-themes localStorage access). This architecture achieves near-zero client JavaScript for static content while preserving interactive islands.

**Major components:**
1. `app/layout.tsx` (Server) — HTML shell, fonts, metadata, ThemeProvider wrapper
2. `app/page.tsx` (Server) — composes section order, pure assembly
3. `components/sections/` (Server) — HeroSection, ProductsSection, ServicesSection, AboutSection, ContactSection
4. `components/layout/NavBar.tsx` (Client) — sticky nav, mobile menu toggle
5. `components/motion/AnimateOnScroll.tsx` (Client) — thin scroll-reveal wrapper, receives server-rendered children
6. `components/forms/ContactForm.tsx` (Client) — form state and submission
7. `lib/products.ts` + `lib/team.ts` — static TypeScript data, no business logic in components

**Theme system:** Tailwind v4 `@theme` block in `globals.css` defines all color tokens as CSS custom properties (dark-first). `next-themes` with `attribute="data-theme"` and `defaultTheme="dark"`. `suppressHydrationWarning` on `<html>` is required.

### Critical Pitfalls

1. **Wrong animation package name** — Use `motion` (not `framer-motion`); import from `motion/react`. The old package name breaks with React 19. Verify before any animation work.

2. **Animating above-the-fold hero content** — Never apply `initial={{ opacity: 0 }}` to the hero heading or hero image. This makes the LCP element invisible until JS runs, tanking Lighthouse from 95+ to 60+. Scroll animations are for below-the-fold sections only.

3. **Dark mode FOUC** — Tailwind v4 dark mode requires `@custom-variant dark` in CSS (not `darkMode: 'class'` in a JS config, which no longer exists). Combined with `next-themes` + `suppressHydrationWarning`, this prevents the white-flash-before-dark-mode that looks broken on every page load.

4. **Tailwind v4 breaking changes** — `bg-gradient-to-r` is now `bg-linear-to-r`; CSS variable arbitrary values use parentheses not brackets; no `tailwind.config.js`. Build from v4 docs, do not port v3 patterns.

5. **Missing `metadataBase`** — Without `metadataBase: new URL('https://cuchulainntech.com')` in root layout metadata, OG images render as relative URLs. LinkedIn/Twitter previews show no image. Set this on day one.

6. **Feature-led hero copy** — The hero headline must lead with outcome or identity, not a description of the company. "We build software that ships." beats "Irish software development company." This is the single highest-impact conversion decision on the whole page.

7. **`'use client'` at section level** — Adding `'use client'` to a whole section file (to support one scroll animation) inflates the JS bundle with all the section's static content. Keep sections as Server Components; wrap only the motion element in a client component.

---

## Implications for Roadmap

### Phase 1: Foundation
**Rationale:** All sections depend on a working design system, dark mode, and project scaffold. Get this right first to avoid rework when colors and tokens are changed after 3 sections are built.
**Delivers:** Runnable project with correct Tailwind v4 config, dark mode FOUC-free, Geist font loaded, color tokens defined, NavBar shell, Footer shell, Vercel deployment live (even if just a placeholder page).
**Addresses:** Nav, Footer (structural shells), mobile responsive baseline
**Avoids:** Dark mode FOUC (Pitfall 14), Tailwind v4 breaking changes (Pitfall 15), Google Fonts render blocking (Pitfall 5), wrong `use client` at layout level (Pitfall 4)

### Phase 2: Core Content Sections
**Rationale:** Hero is the highest-priority single thing on the page — it determines whether anyone reads further. Products and Services are the conversion sections. Build them in visual order so the page can be reviewed end-to-end after this phase.
**Delivers:** Hero, Products Showcase, Services section — the three sections that answer "what is this, what have they built, can I hire them?"
**Addresses:** Hero (headline, CTA, dark gradient), Products (Éist live + status badges for others), Services (capabilities + CTA)
**Avoids:** LCP animation pitfall (Pitfall 2), feature-led copy (Pitfall 10), products section as stack spec sheet (Pitfall 12), jargon in services (Pitfall 13), CTA below fold on mobile (Pitfall 18)

### Phase 3: Trust and Contact
**Rationale:** About and Contact sections close the conversion loop. Once a visitor knows what Cuchulainn Tech is (Phase 2), they need to know who's behind it and how to reach them. Social proof block can be added here once Éist asset copy is confirmed.
**Delivers:** About/Team section, Contact section (mailto to start), Social Proof block, dual-audience CTA framing
**Addresses:** About (founder + collaborators, Irish identity hook), Contact (dual-audience framing), Social Proof (App Store badges or testimonial)
**Avoids:** Competing CTAs (Pitfall 11), missing primary action in contact section

### Phase 4: Polish and Launch Readiness
**Rationale:** Animations and SEO are additive layers — they never change content or layout, so they belong after content is stable. Adding animations to unstable content creates rework.
**Delivers:** Scroll-reveal animations on sections, OG image, sitemap + robots.txt, metadataBase, canonical URL config, contrast audit, contact form (if upgrading from mailto), Vercel Analytics
**Addresses:** Animation polish (Motion scroll-reveal wrappers), full SEO metadata, accessibility contrast pass
**Avoids:** Missing `metadataBase` (Pitfall 6), no sitemap (Pitfall 8), canonical URL issues (Pitfall 9), contrast failures on dark bg (Pitfall 20), tap target failures (Pitfall 19)

### Phase Ordering Rationale

- Foundation first because the Tailwind v4 / dark mode / token system underpins every component — changing tokens after building sections forces wide-ranging visual rework.
- Hero before all other content because it is the most important conversion surface and the hardest to get right (copy, not code) — it deserves focused iteration before surrounding sections dilute attention.
- Contact before animations because animations on incomplete content create rework; stable content should be confirmed before the polish layer is added.
- SEO and accessibility last because they are fully additive — they require stable URLs, final copy, and final images to be done correctly.

### Research Flags

Phases with standard, well-documented patterns (skip research-phase):
- **Phase 1 (Foundation):** Next.js 15 + Tailwind v4 scaffolding is documented and validated. Follow official docs and install commands in STACK.md.
- **Phase 2 (Content Sections):** Static Server Components with hardcoded data is the simplest possible architecture. No novel patterns.
- **Phase 3 (Trust + Contact):** mailto contact is trivial; Formspree/Resend integrations are well-documented if upgrading.

Phases that may need targeted research during planning:
- **Phase 4 (Polish):** Motion v12 scroll-reveal — verify exact import paths and `useInView` API against current docs. The rebrand from `framer-motion` means older tutorials are unreliable.
- **Phase 4 (Polish):** `next/og` for OG image generation — verify the current `app/opengraph-image.tsx` convention against Next.js 15 docs before implementing; API has changed across versions.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All primary choices verified against official docs, stable releases confirmed |
| Features | HIGH | Cross-referenced Evil Martians devtool study + multiple 2025/2026 SaaS landing page analyses |
| Architecture | HIGH | Sourced from official Next.js docs (updated 2026-04-08) and official Vercel docs |
| Pitfalls | HIGH | Specific GitHub discussions, official upgrade guides, and performance case studies cited |

**Overall confidence:** HIGH

### Gaps to Address

- **Contact form backend**: Decision on Formspree vs Resend vs mailto should be made before Phase 3. Formspree = no server infrastructure; Resend = requires Server Action. Both are trivial — this is a build decision, not a research gap.

- **Éist assets**: Products section quality depends on a real screenshot/device mockup and App Store link/rating. Confirm these are available before Phase 2 begins.

- **ATU Grant Demo framing**: Constraint is clear (no direct link — live tender). The copy for "in progress / coming soon" needs one sentence of context that doesn't compromise the tender. Decide this before Phase 2.

- **Magic UI component selection**: Confidence MEDIUM (community-verified, no single authoritative spec). Review available components at magicui.design when building hero and products sections — specific components to use are not locked in yet.

---

## Sources

### Primary (HIGH confidence)
- Next.js 15 Official Release Blog — features, React 19, Turbopack stable
- Next.js App Router project structure docs (nextjs.org, updated 2026-04-08)
- Tailwind CSS v4.0 Release Blog — stable Jan 22, 2025, CSS-first config
- Tailwind CSS v4 Dark Mode docs — `@custom-variant dark` pattern
- Tailwind CSS v4 Upgrade Guide — breaking changes from v3
- shadcn/ui Tailwind v4 Docs — compatibility confirmation
- Motion official docs (motion.dev) — Framer Motion rebrand, v12 features
- next-themes GitHub — dark mode, FOUC prevention, hydration suppression
- Vercel Next.js deployment docs — CDN, image optimization, analytics

### Secondary (MEDIUM confidence)
- Evil Martians devtool landing page study (100 pages, 2025) — feature and conversion patterns
- SaaSFrame landing page trends 2026 — differentiator patterns
- Instapage B2B landing page lessons — CTA and conversion research
- Linear design analysis (LogRocket, 2025) — aesthetic reference
- Magic UI (magicui.design) — component library, community-verified
- Astro vs Next.js 2026 comparison (WPPoland) — performance benchmarks

### Tertiary (LOW confidence — validate during build)
- Motion + Next.js 15 scroll animation tutorials — rebrand means older tutorials may reference wrong import paths; verify against official docs before use

---

*Research completed: 2026-04-13*
*Ready for roadmap: yes*
