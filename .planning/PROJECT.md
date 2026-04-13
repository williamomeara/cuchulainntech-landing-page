# Cuchulainn Tech Landing Page

## What This Is

A company landing page for Cuchulainn Tech — an Irish software company (solo founder + collaborators) building SaaS products and taking on custom app development work. The page showcases live products, products in development, the team, and a clear path for potential clients and investors to engage.

## Core Value

A potential client or investor lands on the page and immediately understands what Cuchulainn Tech builds, what's already shipped, and why they should get in touch.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section introducing Cuchulainn Tech — who we are, what we do, Irish identity + startup energy
- [ ] Products showcase: Éist (live, links to eist.app), Tender Match (in development / coming soon), ATU Grant Demo (in progress / coming soon — no direct link)
- [ ] Services section — custom app development, hire us CTA
- [ ] About / team section — founder + collaborators
- [ ] Contact / get in touch CTA for clients and investors
- [ ] Responsive, performant, deployable (Vercel)

### Out of Scope

- Deep product documentation — each product has its own site/repo
- Direct link to ATU demo — it's a live tender application, not ready for public linking
- Blog or news feed — no content management needed in v1
- App user acquisition flows — this page is for clients and investors, not end users

## Context

- **Company**: Cuchulainn Tech — Irish software company
- **Products**:
  - **Éist** — Flutter audiobook app, live at eist.app
  - **Tender Match** — Research grant matching system, in development
  - **ATU Grant Demo** — Demo built for a public tender application; if won, becomes a contracted project or SaaS product. Show as "in progress / coming soon" only.
- **Audience**: Potential clients (hire us to build apps) and investors/partners
- **Vibe**: Irish cultural identity (Cuchulainn mythology, Celtic feel) + startup energy (ambitious, forward-looking) — aesthetic close to Linear/Vercel (dark, minimal, sharp typography)
- **Tech approach**: Open to cutting-edge stack — Next.js 15 + Tailwind CSS v4 is the natural fit (App Router, RSC, fast static with Vercel deploy)

## Constraints

- **Deployment**: Vercel — zero-config, matches the dev toolchain
- **Links**: No direct link to ATU demo — it's a live tender submission
- **Branding**: Must lean into Irish identity — Cuchulainn brand name is intentional, not incidental

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 15 + Tailwind v4 | Cutting edge stack, Vercel-native, App Router for future extensibility | — Pending |
| Dark, Linear/Vercel aesthetic | Matches client/investor audience — serious, modern, dev-company feel | — Pending |
| ATU demo shown as "coming soon" | Live tender — linking could compromise the application | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-13 after initialization*
