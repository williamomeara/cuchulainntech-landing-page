# Roadmap: Cuchulainn Tech Landing Page

## Overview

Four phases take the project from an empty repo to a live, polished marketing site. Phase 1 establishes the design system and deployment pipeline so every subsequent component is built on stable foundations. Phase 2 builds the two highest-conversion sections — Hero and Products — which answer the visitor's first question. Phase 3 closes the conversion loop with Services, About, and Contact. Phase 4 adds the launch-readiness layer: SEO metadata, accessibility audit, and responsiveness verification.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Scaffold, design tokens, dark mode (no FOUC), Geist font, NavBar/Footer shells, Vercel deploy
- [x] **Phase 2: Core Content** - Hero and Products showcase — the primary conversion surfaces
- [ ] **Phase 3: Trust & Contact** - Services, About/Team, Contact section, and Footer content
- [ ] **Phase 4: Polish & Launch** - OG metadata, sitemap, robots.txt, contrast audit, mobile verification

## Phase Details

### Phase 1: Foundation
**Goal**: A deployable project with a correct, stable design system that every section can build on
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03
**Success Criteria** (what must be TRUE):
  1. Visiting the Vercel deployment URL shows a dark-mode page with no white flash on load (no FOUC)
  2. Geist font renders in the browser — no fallback or system font visible
  3. NavBar is visible and fixed at the top across all viewport widths
  4. Tailwind v4 color tokens are defined in `globals.css` and resolve correctly in the browser
**Plans**: 2026-05-16-phase-1-foundation.md ✅
**UI hint**: yes

### Phase 2: Core Content
**Goal**: Visitors can immediately understand what Cuchulainn Tech builds and what's already shipped
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, PROD-01, PROD-02, PROD-03, PROD-04, PROD-05, PROD-06
**Success Criteria** (what must be TRUE):
  1. Hero headline leads with value (not company description) and the primary CTA button is visible above the fold on both desktop and mobile
  2. Clicking the Hero CTA scrolls to the contact section
  3. All nine product cards (3 LIVE: Éist, Headlock, Theory Test Free; 6 COMING SOON: Tender Match, Grant Match, Funding Alerts, Are We There Yet, Ogma, Student Placement Organiser) are visible with correct status badges
  4. LIVE cards link out in a new tab (Éist → eist.app, Headlock → headlock.app, Theory Test Free → its app page); COMING SOON cards have no external link
  5. Each product card shows a one-sentence description and either a real screenshot or an intentional Coming-Soon placeholder treatment
  6. A compact "Open Source" strip surfaces blindfold-env and Craobh as GitHub links
**Plans**: 2026-05-16-phase-2-core-content.md ✅
**UI hint**: yes

### Phase 3: Trust & Contact
**Goal**: Visitors know who is behind Cuchulainn Tech, what custom work looks like, and how to reach out
**Depends on**: Phase 2
**Requirements**: SERV-01, SERV-02, SERV-03, SERV-04, ABOUT-01, ABOUT-02, ABOUT-03, CONT-01, CONT-02, CONT-03
**Success Criteria** (what must be TRUE):
  1. Services section names the types of work Cuchulainn Tech takes on and shows a "Hire us" CTA
  2. Tech capability badges are visible in the Services section
  3. About section shows the founder bio and acknowledges collaborators
  4. About section includes the Irish identity / Cuchulainn mythology narrative thread
  5. Contact section has a mailto CTA that opens the user's email client and a Footer with copyright and company name
**Plans**: TBD
**UI hint**: yes

### Phase 4: Polish & Launch
**Goal**: The site is ready for public sharing — link previews work, search engines can index it, accessibility passes, and it is verified on mobile
**Depends on**: Phase 3
**Requirements**: LAUN-01, LAUN-02, LAUN-03, LAUN-04
**Success Criteria** (what must be TRUE):
  1. Sharing the site URL on LinkedIn or Twitter renders an OG preview with title, description, and image
  2. `sitemap.xml` and `robots.txt` are accessible at their standard paths on the deployed URL
  3. All body text and interactive elements pass WCAG AA contrast (4.5:1 minimum) on the dark background
  4. On an iPhone 14 Pro viewport, the Hero CTA is visible without scrolling
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 1/1 | Completed | 2026-05-16 |
| 2. Core Content | 1/1 | Completed | 2026-05-16 |
| 3. Trust & Contact | 0/TBD | Not started | - |
| 4. Polish & Launch | 0/TBD | Not started | - |
