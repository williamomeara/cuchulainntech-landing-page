# Domain Pitfalls: Tech Company Landing Page

**Domain:** B2B tech company landing page (client/investor audience)
**Stack:** Next.js 15 / Tailwind CSS v4 / Vercel
**Researched:** 2026-04-13

---

## Performance Pitfalls

### Pitfall 1: Animation Library Causes React 19 Compatibility Breaks

**What goes wrong:** Installing `framer-motion` in a Next.js 15 project (which ships with React 19) produces peer dependency errors and runtime breakage. The package was rebranded to `motion` in late 2024 — importing from `framer-motion` in a React 19 project will cause instability or silent failures.

**Why it happens:** Next.js 15 ships React 19 by default. The old `framer-motion` package had no declared React 19 support until the rebrand.

**Consequences:** Animations silently break in production, or npm install fails entirely, or you ship with `--legacy-peer-deps` and create a brittle dependency tree.

**Prevention:**
- Use `motion` (the rebranded package), not `framer-motion`
- Import from `motion/react` not `framer-motion`
- Alternatively, prefer CSS animations + Tailwind `transition-*` utilities for simple effects — no third-party dependency at all
- Test animations in production build (`next build && next start`) not just dev mode

**Detection:** `npm install framer-motion` produces peer dep warnings referencing React version. Check package.json React version against installed animation library.

**Phase:** Foundation setup / initial component build

---

### Pitfall 2: Scroll-Triggered Animations That Destroy LCP and CLS

**What goes wrong:** A dark, Linear/Vercel-aesthetic landing page often tempts developers to add scroll-triggered entrance animations on every section. This causes elements to start hidden (opacity: 0, translateY: 40px), which pushes Largest Contentful Paint scores down because the hero content is technically invisible on first paint.

**Why it happens:** Animation libraries default to hiding elements before animating them in. The hero heading — almost always the LCP element — gets animated, so the browser can't register it as "painted" until JS executes and the animation begins.

**Consequences:** LCP degrades to 3-4+ seconds. Google Search ranking affected. Mobile devices on slow connections see a blank hero.

**Prevention:**
- Never animate the hero heading or hero image — they must be visible immediately, no `initial={{ opacity: 0 }}`
- Reserve scroll animations for below-the-fold content only
- Use `prefers-reduced-motion` media query to disable all animations for users who request it
- Measure LCP with Chrome DevTools before and after adding animations

**Detection:** Run Lighthouse or PageSpeed Insights after adding any hero animation — LCP score will drop immediately if the hero heading is being hidden pre-animation.

**Phase:** UI build (before deploying to production for first review)

---

### Pitfall 3: Unoptimized Hero Images and Video Backgrounds

**What goes wrong:** Celtic-aesthetic hero backgrounds (dark gradient textures, video loops, high-res imagery) shipped as raw JPEGs or MP4 autoplay videos. A 2MB hero image or a 10MB looping video destroys both LCP and mobile data budgets.

**Why it happens:** Designers create assets at full resolution; developers drop them in without conversion to modern formats.

**Consequences:** LCP > 4 seconds on mobile. Video autoplay blocked by browsers on cellular. Data costs for mobile users.

**Prevention:**
- Use Next.js `<Image>` component — it auto-generates WebP/AVIF, lazy loads off-screen images, and sets correct `sizes` attribute
- For hero images: use `priority` prop on the `<Image>` to preload — this is the one image that should NOT be lazy loaded
- If using video backgrounds: compress to < 2MB, set `muted autoplay playsinline loop`, provide a poster image, wrap in a `<picture>` fallback for no-JS
- Target: hero image < 200KB after compression

**Detection:** Network tab in DevTools — sort by size, flag anything > 200KB above the fold.

**Phase:** Asset preparation before first full-page build

---

### Pitfall 4: Client Components Bloating JavaScript Bundle

**What goes wrong:** Reaching for `'use client'` at layout or page level when only a small interactive sub-component actually needs it (e.g., a mobile menu toggle or a contact form). This sends React hydration cost for the entire page section to the browser.

**Why it happens:** `'use client'` is the path of least resistance when something doesn't work as a Server Component. Developers add it at the section level rather than isolating the interactive leaf node.

**Consequences:** JavaScript bundle inflates. INP (Interaction to Next Paint) degrades. Static page that should be near-zero JS ends up shipping 200KB+ of client-side React.

**Prevention:**
- Default all components to Server Components (no directive)
- Add `'use client'` only at the smallest possible leaf: the `<MobileMenuButton>`, not the `<Header>`
- The contact form is the primary place that genuinely needs `'use client'`
- Use `next/dynamic` with `ssr: false` for any heavy third-party widgets (e.g., analytics dashboards, embeds)

**Detection:** Run `next build` and inspect the `.next/analyze` output, or use `@next/bundle-analyzer`. Pages should have minimal client JS.

**Phase:** Component architecture (establish the pattern before building all sections)

---

### Pitfall 5: Google Fonts Network Request Blocking Render

**What goes wrong:** Linking Google Fonts via a `<link>` tag in `<head>` rather than using `next/font`. This adds a network round-trip to Google's servers that blocks rendering, causes layout shift when the font loads (FOUT), and fails if the user is in a network that blocks Google domains.

**Why it happens:** Developers copy the Google Fonts embed snippet directly.

**Consequences:** CLS from font swap. Render blocking. GDPR concerns (IP logged to Google CDN).

**Prevention:**
- Use `next/font/google` — it downloads fonts at build time, serves them from your domain, and generates optimal `font-display: swap` CSS automatically
- Zero external network requests for fonts in production
- Example: `import { Inter } from 'next/font/google'` then use `inter.className`

**Detection:** Run Lighthouse — "Eliminate render-blocking resources" will flag external Google Fonts requests.

**Phase:** Initial project setup / typography decisions

---

## SEO Pitfalls

### Pitfall 6: Missing or Misconfigured `metadataBase`

**What goes wrong:** Next.js 15 App Router's Metadata API generates relative URLs for Open Graph images if `metadataBase` is not set in the root layout. Social platforms (LinkedIn, Twitter/X, Slack) cannot fetch relative URLs — link previews show no image.

**Why it happens:** It's a non-obvious requirement that doesn't cause errors locally (relative URLs work on localhost).

**Consequences:** Every shared link to the Cuchulainn Tech page shows no preview card. First impressions for investors sharing the URL are degraded.

**Prevention:**
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://cuchulainntech.com'),
  // ...
}
```
Set this before writing any other metadata.

**Detection:** Run the URL through LinkedIn Post Inspector or Twitter Card Validator before launch. Missing image is immediately visible.

**Phase:** Initial layout setup

---

### Pitfall 7: Generic or Duplicate Page Titles and Descriptions

**What goes wrong:** `<title>Cuchulainn Tech</title>` on every page, or a meta description that restates the company name without explaining the value proposition. Even for a single-page site, the OG title and description should be written for the specific audience (clients and investors), not just the company name.

**Why it happens:** SEO metadata is treated as a checkbox, not as copy.

**Consequences:** Poor click-through rate from search results. Unfocused social share previews. Google may auto-generate a worse description from page content.

**Prevention:**
- Title: `Cuchulainn Tech — Irish Software Company | SaaS & Custom App Development`
- Description: 140-160 characters that name the audience and action: "Irish software company building SaaS products. Available for custom app development. View our products and get in touch."
- Use `title.template` in Next.js Metadata for consistent formatting if adding inner pages later

**Detection:** Manually check `<title>` and `<meta name="description">` in DevTools or SEO browser extension after deployment.

**Phase:** Content/copy pass (not an afterthought)

---

### Pitfall 8: No `sitemap.ts` or `robots.ts`

**What goes wrong:** Next.js 15 App Router supports auto-generated `sitemap.xml` and `robots.txt` via `app/sitemap.ts` and `app/robots.ts` files. Many developers skip these because the site is "just a landing page." Google still needs them to crawl efficiently, and their absence is a signal of an incomplete site.

**Why it happens:** Treated as optional for small sites.

**Prevention:**
- Create `app/sitemap.ts` returning the production URL
- Create `app/robots.ts` allowing all crawlers and pointing to the sitemap
- Both are 10-line files

**Detection:** Visit `https://your-domain.com/sitemap.xml` and `https://your-domain.com/robots.txt` after deployment.

**Phase:** Pre-launch checklist

---

### Pitfall 9: Missing Canonical URL

**What goes wrong:** If the site is accessible at both `cuchulainntech.com` and `www.cuchulainntech.com`, or if Vercel preview deploys get indexed, search engines see duplicate content and split ranking signals.

**Prevention:**
- Set canonical URL in root layout metadata
- Configure Vercel to redirect `www` to apex (or vice versa) — one canonical form only
- In `next.config.ts`, add redirect for the non-canonical form

**Detection:** Search `site:cuchulainntech.com` in Google — multiple entries with different URL forms indicate missing canonical.

**Phase:** Vercel configuration / pre-launch

---

## Copy and Conversion Pitfalls

### Pitfall 10: Feature-Led Hero Instead of Outcome-Led Hero

**What goes wrong:** Hero headline describes what the company is ("Irish software development company building SaaS and apps") rather than what the client or investor gets. This is the single most common conversion failure on B2B tech landing pages.

**Why it happens:** Founders are close to the work and write from their perspective, not the audience's.

**Consequences:** 55% of visitors leave within 8 seconds if they don't immediately understand "what's in it for me." Investors and clients are looking for signal, not biography.

**Prevention:**
- Lead with the outcome or credibility signal: "We ship. Fast." / "From concept to production — Irish software that moves." / "SaaS products and custom apps, built to ship."
- Keep the audience (clients and investors) in mind: what do they need to hear in the first 3 words?
- The Irish/Cuchulainn identity should reinforce, not replace, the value proposition

**Detection:** Read the hero headline to someone unfamiliar with the company — if they can't explain what Cuchulainn Tech does in 10 seconds, rewrite it.

**Phase:** Content strategy (before any design or build work begins)

---

### Pitfall 11: Competing or Absent CTAs

**What goes wrong:** Multiple CTAs with equal visual weight ("Get in touch" + "View our products" + "Learn more" + "Hire us") create decision paralysis. Alternatively, CTAs are buried below the fold or styled as plain links.

**Why it happens:** Every stakeholder wants their section to have a CTA; they accumulate without hierarchy.

**Consequences:** Visitors scroll without taking action. Conversion rate near zero.

**Prevention:**
- One primary CTA per viewport: in the hero, it should be a single button ("Get in touch" or "Hire us")
- Secondary actions (view Éist, view services) are lower hierarchy — ghost buttons or text links
- Primary CTA button should be at minimum 44px height, high contrast against dark background
- Repeat the primary CTA at the bottom of the page for visitors who scrolled

**Detection:** Squint at the page — which button draws the eye immediately? If you're unsure, there's no hierarchy.

**Phase:** Design / layout

---

### Pitfall 12: Products Section That Reads Like a Feature List

**What goes wrong:** Éist, Tender Match, and ATU Grant Demo described with technical details ("Flutter audiobook app with offline support") rather than with the why and what-it-does-for-users narrative. Investors and clients want to understand market fit, not stack choices.

**Prevention:**
- For each product: one sentence on what it does for the user, one sentence on status/traction
- "Éist — an audiobook app for Irish language learners. Live at eist.app." beats "Flutter-based cross-platform audiobook application."
- ATU demo: "A grant-matching platform currently under review for a public tender" — conveys ambition without compromising the tender

**Phase:** Content writing

---

### Pitfall 13: Jargon in the Services Section

**What goes wrong:** Services described as "full-stack development," "end-to-end solutions," or "agile delivery" — language every dev shop uses and that means nothing to a non-technical client.

**Prevention:**
- Describe deliverables, not processes: "We build the product. You keep the code."
- Name the type of client: "For founders who need a technical co-builder" or "For companies who need a product built fast."
- Avoid: "scalable," "robust," "cutting-edge," "end-to-end"

**Phase:** Content writing

---

## Tech Stack Pitfalls

### Pitfall 14: Tailwind v4 Dark Mode Hydration Flash (FOUC)

**What goes wrong:** Using Tailwind v4 with the class-based dark mode strategy (`@custom-variant dark (&:is(.dark *))`) and next-themes without correct ThemeProvider setup causes a flash of the wrong theme on first page load. The server renders without a dark class; the client applies it after hydration — visible flicker on every page load.

**Why it happens:** The server can't read `localStorage` or system preference during SSR, so it always renders the default (light) theme. Client-side theme detection runs after hydration.

**Consequences:** Every visitor on first load sees a white flash before dark mode kicks in. Looks broken. Particularly jarring on a dark Linear/Vercel-aesthetic site.

**Prevention:**
- Use `next-themes` with `attribute="class"` and `defaultTheme="dark"` if the design is dark-first
- In the root layout, wrap the app in `<ThemeProvider>` from `next-themes`
- The `suppressHydrationWarning` prop on `<html>` is required: `<html suppressHydrationWarning>`
- In Tailwind v4, configure dark mode with `@custom-variant dark (&:is(.dark *))` in your CSS — the old `darkMode: 'class'` config key no longer exists

**Detection:** Hard refresh the page 3 times in a row — if you see a white flash before dark mode applies, FOUC is present.

**Phase:** Foundation setup / before any dark-mode-dependent styling

---

### Pitfall 15: Tailwind v4 Breaking Changes From v3 Assumptions

**What goes wrong:** Tailwind v4 is a ground-up rewrite with multiple silent breaking changes if you approach it with v3 mental models:

| v3 assumption | v4 reality |
|---|---|
| `bg-gradient-to-r` | Renamed to `bg-linear-to-r` |
| `border` inherits text color | Default border color is now `--color-gray-200` |
| `tailwind.config.js` with `theme.extend` | CSS-first `@theme` in your CSS file; no JS config |
| `@tailwind base/components/utilities` | Replace with `@import "tailwindcss"` |
| CSS variable arbitrary values: `bg-[--color]` | Now: `bg-(--color)` — parentheses, not brackets |
| Dark mode via `darkMode: 'class'` in config | `@custom-variant dark` in CSS |

**Prevention:**
- If starting greenfield on v4, build from v4 docs — do not port v3 patterns
- Run `npx @tailwindcss/upgrade` if migrating from v3 (handles ~90% automatically)
- Test gradient utilities explicitly — the rename to `bg-linear-*` is the most likely silent failure

**Detection:** Visual regression after first build — broken gradients, unexpected border colors, missing dark mode styles are all immediate indicators.

**Phase:** Foundation setup

---

### Pitfall 16: Adding a CMS for a Static Landing Page

**What goes wrong:** Adding Contentlayer, Sanity, or another CMS "for flexibility" to a landing page that has 6 sections and will change content rarely. This adds build complexity, external dependencies, and developer friction with zero user-facing benefit.

**Why it happens:** Planning for scale that doesn't exist yet. A CMS feels more "proper" than hardcoded content.

**Consequences:** Build times increase. CMS goes stale. Future developers have to understand the CMS schema to change a headline. Adds a potential point of failure (CMS API down = broken build).

**Prevention:**
- Hardcode all content as TypeScript constants or props for v1
- If content needs to change, a PR takes 2 minutes — this is not a problem worth solving pre-launch
- Revisit only if: blog is added, products list changes frequently, or multiple non-technical editors need access

**Phase:** Architecture decision at project start — decide once, don't revisit

---

### Pitfall 17: Server Actions or API Routes for a Contact Form (Premature Complexity)

**What goes wrong:** Building a custom Next.js Server Action + email API integration (Resend, SendGrid, Nodemailer) for the contact form when a hosted form service handles this in 15 minutes.

**Why it happens:** It feels more "complete" to own the infrastructure. Server Actions are new and tempting to use.

**Prevention:**
- For v1: use a hosted form provider (Formspree, Formspark, or even a Netlify form with Vercel proxy) — zero server infrastructure
- Server Actions for the contact form are appropriate if: you need custom validation, rate limiting, CRM integration, or to avoid third-party domains in CSP headers
- The landing page's job is to get the contact — optimize for shipping, not infrastructure ownership

**Phase:** Contact form implementation decision

---

## Mobile Pitfalls

### Pitfall 18: Hero CTA Below the Fold on Mobile

**What goes wrong:** A desktop hero designed with a large background image + centered text + button looks great at 1440px. On mobile (390px viewport), the image is 60vh, the heading wraps to 3 lines, and the CTA button is now below the fold — invisible without scrolling.

**Why it happens:** Designed and built at desktop widths first; mobile tested only after.

**Consequences:** Mobile users (typically 60%+ of traffic for shared links) never see the primary CTA without scrolling. Conversion rate on mobile is near zero.

**Prevention:**
- Design mobile-first: build the hero at 390px wide first, confirm CTA is visible without scroll
- Cap hero height on mobile: `h-[80svh]` maximum, not `h-screen` (svh accounts for mobile browser chrome)
- Use `flex-col` on mobile with heading → subheading → CTA stacked, no image pushing content down
- CTA button: minimum `h-11` (44px) for touch target, full-width `w-full` on mobile

**Detection:** Chrome DevTools device emulation at iPhone 14 Pro (393×852) — is the primary CTA button fully visible without scrolling?

**Phase:** Every UI build session — check mobile before marking any section complete

---

### Pitfall 19: Tap Targets Too Small on Navigation and CTAs

**What goes wrong:** Nav links, social icons, and secondary CTAs styled as small text links (16px, inline). On mobile, tap targets below 44×44px cause mis-taps and frustrate users.

**Prevention:**
- All interactive elements: minimum `min-h-11 min-w-11` (44px × 44px per WCAG 2.5.5)
- For text links in nav: add padding to increase tap area without changing visual size (`px-3 py-2`)
- Icon-only buttons (GitHub, LinkedIn): wrap in a `<button>` or `<a>` with explicit `p-2` padding and an `aria-label`

**Phase:** Mobile QA pass before launch

---

### Pitfall 20: Low Contrast Text on Dark Backgrounds (Accessibility + Mobile Legibility)

**What goes wrong:** Dark Linear/Vercel aesthetic uses muted grays for body text and secondary labels (e.g., `#888888` or `text-zinc-500` on `bg-zinc-900`). This frequently fails WCAG AA (4.5:1 for normal text, 3:1 for large text). Color contrast is the #1 accessibility violation on the web, found on 83.6% of sites.

**Why it happens:** Designs look fine on calibrated designer monitors in a dark room. They fail on cheaper screens, in sunlight, or for users with low vision.

**Consequences:** Text unreadable in bright light. Legal exposure under WCAG/EAA compliance requirements (increasingly enforced in EU). Investor or client who can't read your copy does not convert.

**Prevention:**
- Check every text/background combination with a contrast checker (WebAIM Contrast Checker, or browser DevTools color picker)
- Body text on dark: aim for at least 5:1 (not just the 4.5:1 minimum — mobile legibility benefits from headroom)
- Common failure: `zinc-400` (`#a1a1aa`) on `zinc-900` (`#18181b`) = 4.4:1 — fails AA by a hair
- Safe choice: `zinc-300` on `zinc-900` = 7.1:1

**Detection:** Run axe DevTools or WAVE browser extension. Contrast failures are flagged immediately with exact ratios.

**Phase:** Design tokens / initial color system definition — fix it at the source, not per-component

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|---|---|---|
| Project setup | Tailwind v4 dark mode config (no JS config file) | Read v4 docs before touching config; set `@custom-variant dark` in CSS from day 1 |
| Project setup | `next/font` vs Google Fonts embed | Use `next/font/google` only; never `<link>` to fonts.googleapis.com |
| Typography / color tokens | Low contrast on dark bg | Verify contrast ratios before styling any component |
| Hero section build | LCP degradation from animations | No `initial={{ opacity: 0 }}` on hero heading; check LCP in Lighthouse immediately |
| Hero section build | CTA below fold on mobile | Build and verify mobile layout before any other section |
| Animation additions | Framer Motion package name | Use `motion` package, import from `motion/react` |
| Products section | Technical copy that loses non-technical visitors | Write for outcome, not stack |
| Contact form | Over-engineering with Server Actions | Use hosted form for v1 |
| Pre-launch | Missing `metadataBase` | Verify OG preview with LinkedIn/Twitter validators before announcing |
| Pre-launch | No sitemap or robots.txt | Add `app/sitemap.ts` and `app/robots.ts` |
| Pre-launch | Canonical URL / www vs apex | Configure Vercel redirect and canonical metadata |

---

## Sources

- [10 Common Next.js Mistakes That Hurt Core Web Vitals — Pagepro](https://pagepro.co/blog/common-nextjs-mistakes-core-web-vitals/)
- [Optimizing Core Web Vitals in Next.js 15 Apps with Tailwind CSS 4 — Medium](https://medium.com/@sureshdotariya/optimizing-core-web-vitals-in-next-js-15-apps-with-tailwind-css-4-f40f854b9b65)
- [Tailwind CSS v4 Upgrade Guide — Official Docs](https://tailwindcss.com/docs/upgrade-guide)
- [Tailwind CSS v4 Dark Mode — Official Docs](https://tailwindcss.com/docs/dark-mode)
- [Motion & Framer Motion Upgrade Guide — motion.dev](https://motion.dev/docs/react-upgrade-guide)
- [framer-motion for Next.js 15 — GitHub Discussion](https://github.com/vercel/next.js/discussions/72228)
- [Next.js Dark Mode Hydration Fix — Medium](https://medium.com/@pavan1419/fixing-hydration-mismatch-in-next-js-next-themes-issue-8017c43dfef9)
- [Fixing Dark Mode FOUC in React/Next.js — Not A Number](https://notanumber.in/blog/fixing-react-dark-mode-flickering)
- [next-themes — GitHub](https://github.com/pacocoursey/next-themes)
- [Complete Next.js SEO Guide — eastondev.com](https://eastondev.com/blog/en/posts/dev/20251219-nextjs-seo-guide/)
- [Next.js 15 SEO Checklist — DEV Community](https://dev.to/vrushikvisavadiya/nextjs-15-seo-checklist-for-developers-in-2025-with-code-examples-57i1)
- [9 B2B Landing Page Lessons — Instapage](https://instapage.com/blog/b2b-landing-page-best-practices)
- [Copywriting Mistakes Killing B2B Conversions — alphap.tech](https://alphap.tech/copywriting-mistakes-that-are-killing-your-landing-page-conversions/)
- [Color Contrast WCAG 2025 Guide — AllAccessible](https://www.allaccessible.org/blog/color-contrast-accessibility-wcag-guide-2025)
- [Dark Mode Does Not Satisfy WCAG Contrast — BOIA](https://www.boia.org/blog/offering-a-dark-mode-doesnt-satisfy-wcag-color-contrast-requirements)
- [Mobile Landing Page Best Practices 2025 — OptinMonster](https://optinmonster.com/mobile-landing-page-best-practices/)
- [CTA Placement Strategies 2026 — LandingPageFlow](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages)
