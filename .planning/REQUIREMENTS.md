# Requirements: Cuchulainn Tech Landing Page

**Defined:** 2026-04-13
**Core Value:** A potential client or investor lands on the page and immediately understands what Cuchulainn Tech builds, what's already shipped, and why they should get in touch.

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Site scaffolded with Next.js 15 (App Router), Tailwind v4, Geist font, shadcn/ui, and next-themes defaulting to dark mode — no FOUC on load
- [ ] **FOUND-02**: Fully static generation (no server compute per request) deployed to Vercel
- [ ] **FOUND-03**: NavBar with section anchor links renders on all pages, fixed at top

### Hero

- [ ] **HERO-01**: Hero headline leads with what clients/investors get (value-first, not identity-first)
- [ ] **HERO-02**: Hero subheadline provides supporting context (Irish software company building SaaS + custom apps)
- [ ] **HERO-03**: Primary CTA button ("Get in Touch" or "Hire Us") links to contact section
- [ ] **HERO-04**: Ambient dark background with subtle Irish-green gradient orb/glow effect
- [ ] **HERO-05**: Hero heading renders immediately (not hidden by animation — preserves LCP)

### Products

- [ ] **PROD-01**: Product cards display for all nine products, grouped into two rows: **Live** (Éist, Headlock, Theory Test Free) and **Coming Soon** (Tender Match, Grant Match, Funding Alerts, Are We There Yet, Ogma, ATU Grant Demo)
- [ ] **PROD-02**: Each card shows a status badge: Live / Coming Soon
- [ ] **PROD-03**: Live cards link out (new tab): Éist → eist.app, Headlock → product/install site, Theory Test Free → app store or product page
- [ ] **PROD-04**: Coming-Soon cards have no external links; ATU Grant Demo card explicitly suppresses any link
- [ ] **PROD-05**: Each card includes a brief one-sentence product description
- [ ] **PROD-06**: Each card includes a product screenshot, app icon, or mockup image (Coming-Soon cards may use a stylised placeholder)

### Services

- [ ] **SERV-01**: Services section describes what Cuchulainn Tech builds (mobile apps, web apps, SaaS products)
- [ ] **SERV-02**: Tech capability badges displayed (Flutter, Next.js, and relevant stack)
- [ ] **SERV-03**: Past work referenced (Éist as proof of mobile capability, ATU demo as enterprise-adjacent work)
- [ ] **SERV-04**: Hire us CTA present in services section

### About

- [ ] **ABOUT-01**: Founder bio with name and brief background
- [ ] **ABOUT-02**: Collaborators acknowledged (without individual full bios)
- [ ] **ABOUT-03**: Irish identity narrative — Cuchulainn mythology thread explaining the company name and ethos

### Contact

- [ ] **CONT-01**: Contact section with headline inviting clients and investors to reach out
- [ ] **CONT-02**: Primary CTA mailto link opens email client to `hello@cuchulainntech.ie` (no backend required)
- [ ] **CONT-03**: Footer renders legal identity — `© 2026 Cú Chulainn Tech Limited · CRO 812722 · Ireland` — plus optional social icon links

### Launch Readiness

- [ ] **LAUN-01**: Open Graph metadata (`metadataBase`, title, description, OG image) configured so link previews render correctly on LinkedIn/Twitter
- [ ] **LAUN-02**: `sitemap.ts` and `robots.ts` generated
- [ ] **LAUN-03**: Colour contrast passes WCAG AA (4.5:1 minimum) across all text elements
- [ ] **LAUN-04**: Site is fully responsive — hero CTA visible without scroll on mobile (iPhone 14 Pro viewport)

## v2 Requirements

### Enhancements

- **ENH-01**: In-page contact form with server action (Resend or Formspree) — replaces mailto
- **ENH-02**: Social proof bar with Éist App Store rating or user count once available
- **ENH-03**: Scroll-reveal animations on section entry (Motion v12 `useInView`)
- **ENH-04**: Blog or "What we're building" updates feed
- **ENH-05**: Individual product detail pages (each product gets its own route)
- **ENH-06**: Celtic/Irish background texture or custom SVG motifs in design system

## Out of Scope

| Feature | Reason |
|---------|--------|
| Direct link to ATU Grant Demo | Live tender application — linking could compromise the submission |
| Pricing table | Wrong page type — clients enquire, they don't self-serve purchase |
| Deep product documentation | Each product has its own site/repo |
| App user acquisition flows | Audience is clients and investors, not end users |
| CMS / editable content backend | Static data in `lib/` files is sufficient; adding a CMS adds unnecessary complexity for v1 |
| Multiple competing CTAs per section | Research shows 266% conversion drop — one primary CTA per section |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| HERO-01 | Phase 2 | Pending |
| HERO-02 | Phase 2 | Pending |
| HERO-03 | Phase 2 | Pending |
| HERO-04 | Phase 2 | Pending |
| HERO-05 | Phase 2 | Pending |
| PROD-01 | Phase 2 | Pending |
| PROD-02 | Phase 2 | Pending |
| PROD-03 | Phase 2 | Pending |
| PROD-04 | Phase 2 | Pending |
| PROD-05 | Phase 2 | Pending |
| PROD-06 | Phase 2 | Pending |
| SERV-01 | Phase 3 | Pending |
| SERV-02 | Phase 3 | Pending |
| SERV-03 | Phase 3 | Pending |
| SERV-04 | Phase 3 | Pending |
| ABOUT-01 | Phase 3 | Pending |
| ABOUT-02 | Phase 3 | Pending |
| ABOUT-03 | Phase 3 | Pending |
| CONT-01 | Phase 3 | Pending |
| CONT-02 | Phase 3 | Pending |
| CONT-03 | Phase 3 | Pending |
| LAUN-01 | Phase 4 | Pending |
| LAUN-02 | Phase 4 | Pending |
| LAUN-03 | Phase 4 | Pending |
| LAUN-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 28 total
- Mapped to phases: 28
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-13*
*Last updated: 2026-04-13 after initial definition*
