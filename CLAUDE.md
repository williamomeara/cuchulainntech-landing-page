<!-- GSD:project-start source:PROJECT.md -->
## Project

**Cuchulainn Tech Landing Page**

A company landing page for Cuchulainn Tech — an Irish software company (solo founder + collaborators) building SaaS products and taking on custom app development work. The page showcases live products, products in development, the team, and a clear path for potential clients and investors to engage.

**Core Value:** A potential client or investor lands on the page and immediately understands what Cuchulainn Tech builds, what's already shipped, and why they should get in touch.

### Constraints

- **Deployment**: Vercel — zero-config, matches the dev toolchain
- **Links**: No direct link to ATU demo — it's a live tender submission
- **Branding**: Must lean into Irish identity — Cuchulainn brand name is intentional, not incidental
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x (latest stable) | Application framework | Vercel-native, App Router for RSC, static export capability, zero-config deploy, the obvious choice when deploying to Vercel. React 19 support included. |
| React | 19.x | UI runtime | Ships with Next.js 15. React Compiler (experimental) reduces manual memo work. |
| TypeScript | 5.x | Type safety | First-class support in Next.js 15 (incl. `next.config.ts`). Non-negotiable for a professional landing page. |
### Styling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | v4.0 (stable since Jan 22, 2025) | Utility-first styling | CSS-first config, full builds 5x faster than v3, native CSS variables for design tokens, built-in container queries. The v4 `@theme` system maps directly to the dark design tokens needed for a Linear/Vercel aesthetic. |
| CSS Variables via `@theme` | Built into Tailwind v4 | Design token system | All tokens auto-exposed as native CSS vars. Define brand colors (dark backgrounds, accent gradients, Irish-inspired palette) once, used everywhere. |
### Component Foundation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| shadcn/ui | Latest (fully Tailwind v4 + React 19 compatible as of 2025) | Accessible component primitives | Copy-paste primitives (not a runtime dependency), fully compatible with Tailwind v4, zero JavaScript runtime overhead, produces 5-15KB CSS in production. Use for: buttons, dialogs, forms, navigation. |
| Magic UI | Latest | Marketing-specific animated components | Built on shadcn philosophy but for landing page patterns — hero sections, feature grids, "bento" layouts, shimmer/gradient effects. Dark-mode-first. Built with Tailwind + Motion. Ideal for the "impressive" requirement. |
### Animation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Motion (formerly Framer Motion) | v12.x (package: `motion`, import: `motion/react`) | UI animations, scroll reveals, micro-interactions | Rebranded from `framer-motion` in 2025. Same API, now independent. v12 adds oklch/oklab color support, hardware-accelerated scroll animations, layout animation improvements. 32KB bundle. The React-idiomatic choice for Next.js projects. |
### Dark Mode
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next-themes | 0.4.x | Theme management | "No-flash" dark/light toggling in Next.js App Router. Use with `attribute="data-theme"` + `@custom-variant dark` in Tailwind v4 to avoid hydration errors. The de-facto standard — 2376+ npm dependents. |
### Typography
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/font` | Built into Next.js 15 | Font loading | Zero layout shift, self-hosted from Google Fonts, no external requests. Use `font-display: swap`. |
| Geist (Vercel's font) | Latest | Primary typeface | Sharp, modern, technical — exactly the Linear/Vercel aesthetic. Free, open source. Available via `geist` npm package or `next/font/google`. Pairs excellently with the dark aesthetic. |
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
## What NOT to Use
### Create React App / Vite (standalone)
### Pages Router
### CSS Modules / styled-components / emotion
### Bootstrap / Bulma
### Lottie animations
### react-scroll / AOS (Animate on Scroll)
### next-sitemap
## Installation
# Scaffold
# Core dependencies
# Form stack
# shadcn/ui (interactive CLI)
# Add specific shadcn components as needed
# Magic UI (copy-paste, not a runtime dep — add components via CLI or manually)
# See https://magicui.design/docs/installation
# Dev dependencies
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
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
