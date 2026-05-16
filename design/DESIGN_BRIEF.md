# Cuchulainn Tech — Landing Page Design Brief

> Drop this whole file plus the `assets/` folder into a fresh chat at **claude.ai/design** and iterate from there.

---

## 1. Goal

Design a single-page company landing site for **Cuchulainn Tech** — an Irish software studio (solo founder + collaborators) that ships SaaS products and takes on custom app development.

A visitor lands and within 5 seconds knows:
1. We are a real Irish software company
2. We have already shipped real products (Éist, Headlock, Theory Test Free)
3. We are building several more
4. They can hire us, or get in touch

The page must feel premium and technical — like landing on Linear or Vercel — with subtle Irish identity. The aim is to convert clients and investors, not end users.

## 2. Audience

- **Prospective clients** — founders, product leads, agencies who might hire us to build a mobile or web app
- **Investors / partners** — people evaluating whether the studio is worth backing or collaborating with
- **Peers and recruits** — fellow developers who'll judge us on craft

This is **not** an app-acquisition page. There is no pricing table. The single conversion event is "get in touch."

## 3. Layout

Single long page, dark mode by default. Sections in order:

### 3.1 Fixed Top Nav
- Left: small glyph + wordmark `Cuchulainn Tech`
- Right: anchor links — Products · Services · About — and one CTA pill `Get in Touch`
- Translucent blurred background once the user scrolls

### 3.2 Hero (full viewport on desktop, ~85vh mobile)
- Centred composition
- Ambient Celtic-green radial orb behind the headline (large blur, low opacity)
- H1, 1–2 lines, **value-first**. Generate 3 alternatives, e.g.:
  - "Software that stands its ground."
  - "Irish software, built to last."
  - "We ship the apps Ireland's ambitious teams need next."
- Subhead: "An Irish studio shipping SaaS products and custom apps for ambitious teams."
- Single primary CTA button: `Get in Touch →` (scrolls to contact)
- Micro-stat line under CTA: `shipped 3 products · building 6 more`
- Hero text renders immediately — no animation that delays LCP

### 3.3 Products (centrepiece)
Heading `Products`. Two clearly labelled subgroups: **LIVE** (3 cards) and **COMING SOON** (6 cards).

Bento-style grid. **Live** row gets larger, more visually prominent cards. **Coming Soon** row uses denser, smaller cards.

Each card: app icon / mockup image (top), product name (H3), status pill (green for LIVE, muted outline for COMING SOON), one-sentence description, and (Live only) a small `→ visit` link bottom-right.

**Live cards** (assets supplied in `assets/`):
| Product | Description | Link target |
|---|---|---|
| **Éist** | Audiobook companion for the daily commute. | eist.app (new tab) |
| **Headlock** | Squeeze extra prompts from your AI subscriptions. | install / product page (new tab) |
| **Theory Test Free** | Free Irish driver theory test, built for mobile. | app store / product page (new tab) |

**Coming Soon cards** (no external links — placeholder treatments):
| Product | Description |
|---|---|
| **Tender Match** | Smarter matching for Irish public tenders. |
| **Grant Match** | Research grants, matched to your project. |
| **Funding Alerts** | Notifications the moment new funding opens. |
| **Are We There Yet** | Sleep on the bus. We'll wake you at your stop. |
| **Ogma** | Something new from the workshop. Stay tuned. |
| **ATU Grant Demo** | Built for a live public tender. Details when we can share. *(No link, no logo.)* |

Coming-Soon cards should feel **desirable**, not apologetic — like teasers, not absences.

### 3.4 Services / Hire Us
Heading `Hire us`. Two-column desktop, stacked mobile.
- Left: prose — *"We take on custom builds — mobile apps, web apps, AI/LLM systems. From prototype to App Store."* + one-line proof: `Past work: Éist · ATU Grant Demo · Theory Test Free`
- Right: grid of tech-capability pill badges — `Flutter`, `Next.js`, `React`, `Tailwind`, `Supabase`, `Postgres`, `LLM / MCP`, `TypeScript`, `Python`, `Vercel`
- CTA: `Start a Project →`

### 3.5 About
Heading `About`. Three blocks:
1. **Narrative** (2–3 sentences connecting mythology to ethos):
   > "Cú Chulainn — the Hound of Culann — held the gap of the north alone. Small force, outsized stand. We build with that same energy: a small team, shipping software that carries weight."
2. **Founder card**: round photo placeholder (~120px), name **Will O'Meara**, role *Founder · Software Engineer*, 1–2 line bio.
3. **Collaborators**: `With: [Name] · [Name] · [Name]` — names only, no bios.

### 3.6 Contact
Heading `Get in Touch`. One-line invitation: *"Building something? Investing in Irish software?"* Then a large mailto button: `hello@cuchulainntech.ie →`. Generous padding — this is the conversion endpoint.

### 3.7 Footer
Thin, muted.
- Left: `© 2026 Cú Chulainn Tech Limited · CRO 812722 · Ireland`
- Right: small icon links — GitHub, LinkedIn, X/Twitter

## 4. Content & Brand

### 4.1 Aesthetic
Dark mode default. Linear / Vercel / Geist territory — sharp, restrained, technical, premium. Irish identity is **woven in subtly, not kitsch**: a deep Celtic / forest green as the single accent, plus *at most* one subtle interlace / rune motif (e.g. a faint background SVG behind the hero or a wordmark glyph). **No** shamrocks, leprechauns, or Guinness colours.

### 4.2 Colour Tokens
- `--bg`: near-black, around `#0A0A0A`
- `--bg-elevated`: slightly lifted, e.g. `#121212`
- `--accent`: Celtic green, roughly `oklch(0.72 0.18 145)` — emerald-leaning forest green
- `--text`: off-white, around `#F2F2F2`
- `--text-muted`: mid-grey, around `#9B9B9B`
- `--border`: subtle, around `rgba(255,255,255,0.08)`

One green. One off-white. One mid-grey. No purple. No copy gradients.

### 4.3 Typography
- Headings & body: **Geist Sans**
- Code / micro-accents: **Geist Mono**
- H1: tracking-tight, generous line-height
- Body: comfortable measure, ~65ch max

### 4.4 Motion
Minimal.
- Scroll-reveal fades on section entry
- Hover lift on product cards
- Slow glow pulse on the hero orb
- **No** parallax, Lottie, confetti, or auto-playing carousels

### 4.5 Background
Near-black with one ambient radial gradient orb behind the hero in Celtic green, very low opacity, large blur. Subtle grid or noise texture optional.

## 5. Technical & Accessibility Constraints

- Implementation target: Next.js 15 (App Router, RSC, static export), Tailwind v4, shadcn/ui + Magic UI primitives, Motion v12 for animation, next-themes for dark mode (no FOUC). Design with these in mind — favour component patterns that map cleanly.
- All body text must pass WCAG AA contrast (4.5:1 minimum) on dark background.
- Mobile-first. Hero CTA must be visible without scrolling on iPhone 14 Pro viewport (393 × 852).
- Single primary CTA per section. No competing CTAs.
- All product images should be slot-able rectangular containers — for the products we have, use the supplied assets; for the rest, design intentional "Coming Soon" placeholder treatments.
- Run an accessibility audit on the final design and call out any contrast or hierarchy issues.

## 6. Deliverable

1. **Desktop** mockup of the full page (1440 wide)
2. **Mobile** mockup of the full page (393 wide)
3. **Hover/active states** for the primary CTA and Live product cards
4. **Small style-guide panel** — colour tokens, type scale, spacing scale
5. **3 alternative hero headline copy options** rendered into the hero
6. **Accessibility audit notes** — list any issues you'd want fixed before implementation

When the design feels right, use Claude Design's **Send to Claude Code** handoff so the implementation step picks up against this repo directly.

---

## Assets Provided

See `assets/` alongside this file:

- `assets/eist/` — Éist logo, app icon, 3 in-app screenshots (dark-mode playback, library, book details)
- `assets/headlock/` — wordmark, character logo, 512px icon
- `assets/theory-test-free/` — 512px app icon, favicon SVG
- `assets/_brand/` — *(empty — no founder photo or Cuchulainn Tech logo exists yet; use placeholders)*

**Missing on purpose** — flag these as placeholders in the mockup:
- Cuchulainn Tech wordmark/logo (not yet designed — propose 2 options)
- Founder photo (use a tasteful silhouette/circle placeholder)
- Product imagery for the 6 Coming Soon items (design teaser treatments)
