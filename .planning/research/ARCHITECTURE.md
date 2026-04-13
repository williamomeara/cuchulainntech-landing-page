# Architecture Patterns

**Project:** Cuchulainn Tech Landing Page
**Researched:** 2026-04-13
**Confidence:** HIGH — sourced from official Next.js docs (nextjs.org, updated 2026-04-08), official Vercel docs, and official Tailwind CSS v4 docs.

---

## Recommended Architecture

A single-page landing site with Next.js 15 App Router. The entire site renders as one route (`/`) composed of section components stacked vertically. No dynamic data fetching — all content is static and hardcoded in the codebase (no CMS). This means the page is fully statically generated at build time and served from Vercel's CDN edge globally with zero server compute cost per request.

The rendering model: **100% Server Components by default**, with Client Component islands isolated only where browser interaction is required (mobile nav toggle, contact form state, animation triggers). This keeps the JavaScript bundle minimal and achieves best-possible Core Web Vitals scores.

---

## Component Structure

### Rendering Boundaries

| Layer | Rendering | Reason |
|-------|-----------|--------|
| `app/layout.tsx` | Server Component | Provides HTML shell, font loading, metadata; no interaction |
| `app/page.tsx` | Server Component | Composes section order; pure assembly, no state |
| Section components (Hero, Products, Services, About, Contact) | Server Components | Static content, no interaction |
| `NavBar` | Client Component (`"use client"`) | Mobile menu toggle requires `useState` |
| `ContactForm` | Client Component (`"use client"`) | Form state, submission handling |
| `AnimatedSection` (wrapper) | Client Component (`"use client"`) | Framer Motion requires browser API for scroll detection |
| `ProductCard` | Server Component (default) | Static data; no interaction needed |
| `ThemeProvider` | Client Component (`"use client"`) | `next-themes` needs localStorage + DOM access |

### Component Boundary Rules

- Server Components can import Server and Client Components.
- Client Components cannot import Server Components — only pass them as `children`.
- The ThemeProvider wraps the body in `layout.tsx` as a Client Component; all Server Components inside remain server-rendered. Their HTML is passed as `children` props, not re-executed on the client.
- Animation wrappers are thin Client Component shells that receive pre-rendered Server Component children. Example: `<AnimateOnScroll>{serverRenderedContent}</AnimateOnScroll>`.

### Data Flow Direction

```
layout.tsx (Server)
  └── ThemeProvider (Client — wraps body only)
        └── NavBar (Client)
        └── page.tsx (Server)
              ├── HeroSection (Server)
              │     └── AnimateOnScroll (Client wrapper)
              ├── ProductsSection (Server)
              │     └── ProductCard × 3 (Server)
              ├── ServicesSection (Server)
              ├── AboutSection (Server)
              └── ContactSection (Server)
                    └── ContactForm (Client)
```

Data flows downward only: props from parent to child. No global state store needed. No API calls at runtime — all content is static.

---

## File Layout

```
/
├── app/
│   ├── layout.tsx            # Root layout: HTML, fonts, metadata, ThemeProvider
│   ├── page.tsx              # Home page: assembles all sections in order
│   ├── globals.css           # Tailwind v4 @import + CSS custom properties (theme tokens)
│   ├── favicon.ico
│   ├── opengraph-image.tsx   # Generated OG image (next/og)
│   └── api/
│       └── og/
│           └── route.tsx     # OG image generation endpoint (optional, if dynamic OG needed)
│
├── components/
│   ├── layout/
│   │   ├── NavBar.tsx        # Client: mobile nav, scroll behavior
│   │   └── Footer.tsx        # Server: links, copyright
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx       # Server
│   │   ├── ProductsSection.tsx   # Server
│   │   ├── ServicesSection.tsx   # Server
│   │   ├── AboutSection.tsx      # Server
│   │   └── ContactSection.tsx    # Server (wraps ContactForm client island)
│   │
│   ├── ui/
│   │   ├── Button.tsx            # Server (static variants) or Client if needs onClick
│   │   ├── ProductCard.tsx       # Server
│   │   ├── SectionHeading.tsx    # Server
│   │   ├── Badge.tsx             # Server (e.g. "Live", "Coming Soon" status labels)
│   │   └── GradientOrb.tsx       # Server (pure CSS decorative element)
│   │
│   ├── forms/
│   │   └── ContactForm.tsx       # Client: form state + submission
│   │
│   └── motion/
│       ├── AnimateOnScroll.tsx   # Client: Framer Motion scroll-reveal wrapper
│       └── FadeIn.tsx            # Client: Framer Motion fade variant
│
├── lib/
│   ├── products.ts           # Static data: product definitions (Éist, Tender Match, ATU)
│   └── team.ts               # Static data: founder + collaborators
│
├── public/
│   ├── images/
│   │   ├── products/         # Product screenshots / logos
│   │   └── team/             # Headshots
│   └── fonts/                # Only if using local font files (next/font preferred)
│
├── next.config.ts
├── tsconfig.json
└── package.json
```

**Key conventions:**
- `components/sections/` — page-level sections, one file per named section. Each maps to a visible scroll region.
- `components/ui/` — reusable primitives with no business logic. No imports from `sections/`.
- `components/motion/` — animation wrappers isolated here so the "use client" boundary is explicit and easy to audit.
- `lib/` — static data as TypeScript objects. No fetching, no ORM, no CMS in v1. Products and team data live here.
- No `context/` directory needed — `next-themes` provides the only "global" state and is scoped to the ThemeProvider.

---

## Theming and Styling Approach

### Tailwind CSS v4 with CSS Custom Properties

Tailwind v4 moves all configuration into CSS. No `tailwind.config.ts` required. Theme tokens are defined as CSS custom properties in `globals.css`.

**globals.css pattern:**
```css
@import "tailwindcss";

/* Dark-first theme — this site defaults to dark mode */
@layer base {
  :root {
    --color-bg: #0a0a0a;
    --color-surface: #111111;
    --color-surface-elevated: #1a1a1a;
    --color-border: rgba(255, 255, 255, 0.08);
    --color-text-primary: #f5f5f5;
    --color-text-muted: #888888;
    --color-accent: #6366f1;       /* Celtic-flavored purple/indigo accent */
    --color-accent-glow: rgba(99, 102, 241, 0.15);
  }

  /* Light mode override if toggle is added later */
  [data-theme="light"] {
    --color-bg: #ffffff;
    --color-surface: #f5f5f5;
    --color-text-primary: #111111;
    --color-text-muted: #666666;
  }
}
```

**Dark mode variant in Tailwind v4:**
```css
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

### Dark Mode Strategy

The site should default to dark mode — it matches the Linear/Vercel aesthetic and the target client/investor audience. The recommended approach:

1. Use `next-themes` with `defaultTheme="dark"` and `attribute="data-theme"`.
2. Define all color tokens as CSS custom properties on `:root` (dark values by default).
3. `[data-theme="light"]` block overrides for light mode if a toggle is added.
4. Result: all components use semantic tokens (`var(--color-bg)`) rather than `dark:` class variants everywhere. This is cleaner and more maintainable with Tailwind v4.

**ThemeProvider placement** — must be a Client Component wrapping `<body>` in `layout.tsx`. The `suppressHydrationWarning` prop on `<html>` is required to suppress the inevitable flash-of-class mismatch on hydration:

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Typography

Use `next/font/google` with a self-hosting approach — fonts are downloaded at build time, zero Google DNS request from browser. Recommended pairing for Linear/Vercel aesthetic: **Geist** (Vercel's own typeface, Google Fonts available) or **Inter** as the fallback. Both are variable fonts, a single file covers all weights.

```tsx
import { Geist, Geist_Mono } from 'next/font/google'
const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
```

---

## Animation Strategy

### Library: Framer Motion

Framer Motion is the standard for production-quality animations in Next.js. It integrates well with App Router via the `"use client"` wrapper pattern. Confidence: HIGH.

**Key constraint:** Framer Motion components require `"use client"`. Do not annotate section files with `"use client"` to support animation — instead, create thin wrapper components in `components/motion/` that accept `children` as Server Component content.

### Animation Patterns for a Landing Page

**1. Scroll-reveal (primary animation pattern):**
```tsx
// components/motion/AnimateOnScroll.tsx
"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function AnimateOnScroll({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
```

**2. Hero entrance animation:** Use `motion.div` with `initial={{ opacity: 0, y: 32 }}` and `animate={{ opacity: 1, y: 0 }}` on mount. Stagger headline, subheading, and CTA with `delay` increments (0, 0.1, 0.2s).

**3. Background ambient gradient:** A slow-moving CSS `@keyframes` radial gradient blur — no JavaScript needed. Implemented as a Server Component in `GradientOrb.tsx` with pure CSS animation. This provides the "glowing orb" Linear-style ambiance without any client JavaScript cost.

**4. Product card hover:** CSS `transition` on `transform` and `box-shadow` — no Framer Motion needed for simple hover states. Reserve Framer Motion for scroll-triggered entrance animations.

### Performance Rules for Animations

- Use `once: true` on `useInView` — elements do not re-animate when scrolling back up. One-shot entrance only.
- Keep `duration` under 0.6s for content reveals. Users are here to read, not watch a show.
- The ambient background gradient uses CSS-only animation — zero client JS.
- Avoid `AnimatePresence` for a single-page site with no route transitions.

---

## Deployment Architecture

### Static Generation (Default)

This site has no dynamic data. Every page, image, and font is known at build time. Next.js App Router exports a fully static HTML file from `app/page.tsx` when no dynamic APIs (cookies, headers, searchParams) are used. Deploy configuration:

```ts
// next.config.ts
const nextConfig = {
  output: 'export',  // Generates static HTML/CSS/JS to /out — OR omit for standard Vercel deploy
}
```

For Vercel deployment, **omit `output: 'export'`** — Vercel's native Next.js integration handles static optimization automatically and provides additional features (image optimization, OG image route, analytics). The page will be cached at the CDN edge for all global requests.

### Vercel Features to Use

| Feature | Config | Benefit |
|---------|--------|---------|
| Automatic image optimization | Use `next/image` everywhere | WebP/AVIF conversion, lazy loading, correct sizing |
| Font self-hosting | Use `next/font/google` | Zero layout shift, no external DNS request |
| OG image generation | `app/opengraph-image.tsx` or `app/api/og/route.tsx` | Dynamic social cards using `next/og` (built-in, no extra install) |
| Analytics | `@vercel/analytics` component in `layout.tsx` | Free tier, zero config, page view tracking |
| Speed Insights | `@vercel/speed-insights` in `layout.tsx` | Core Web Vitals tracking in Vercel dashboard |
| Edge CDN | Automatic when deployed to Vercel | Static assets served globally from 100+ PoPs |

### Build and Deploy Pipeline

```
git push → Vercel CI detects push
  → next build (static generation of all routes)
  → Output cached to Vercel CDN globally
  → Preview URL generated for each PR/branch
  → Promote to production on merge to main
```

No environment variables needed for v1 (all content static). Add `RESEND_API_KEY` or similar only if the contact form sends email server-side.

### Performance Targets

A purely static landing page on Vercel's CDN with server components should achieve:
- Lighthouse Performance: 95+ on desktop, 90+ on mobile
- LCP under 1.5s (hero image must use `priority` prop on `next/image`)
- CLS: 0 (use font `display: swap` + `next/font`, fixed-size image containers)
- No unused JavaScript from library imports (server components ship no client JS)

**Critical:** The hero section's above-the-fold image or gradient must have no layout shift. If using a hero image: `<Image priority />`. If CSS gradient only: no concern.

---

## Suggested Build Order (Dependencies)

The following order minimizes rework — each phase builds on a stable foundation:

1. **Project scaffolding and global styles** — `layout.tsx`, `globals.css` (tokens, fonts, dark mode), `ThemeProvider`, `NavBar` shell. This establishes the design system before any content.

2. **UI primitives** — `Button`, `Badge`, `SectionHeading`. These are depended on by all sections.

3. **Static data layer** — `lib/products.ts`, `lib/team.ts`. Define the data shapes before building components that consume them.

4. **Section components** (in page order): Hero → Products → Services → About → Contact. Each is independent; order chosen to match visual importance and client focus.

5. **Animation layer** — Add `AnimateOnScroll` wrappers after section content is correct. Animations are additive — they never change the underlying layout.

6. **ContactForm** client component — isolated; can be added after static sections are done.

7. **OG image and metadata** — `opengraph-image.tsx` + `metadata` export in `layout.tsx`. SEO layer added last.

8. **Vercel deployment configuration** — `vercel.json` (if any custom headers), analytics components, final build verification.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Blanket "use client" on section files
**What goes wrong:** Marking `HeroSection.tsx` or `ProductsSection.tsx` as `"use client"` to add a scroll animation ships all that component's static content as JavaScript, inflating the bundle.
**Instead:** Keep section files as Server Components. Create `AnimateOnScroll` wrappers in `components/motion/` and import them inside server sections — the children remain server-rendered.

### Anti-Pattern 2: Hardcoding colors instead of CSS custom properties
**What goes wrong:** Using Tailwind's built-in palette classes (`bg-gray-900`, `text-white`) directly makes a future brand color change require find-and-replace across dozens of files.
**Instead:** Define semantic tokens in `globals.css` as `--color-*` variables and reference them via Tailwind's `theme()` or direct `var()` usage.

### Anti-Pattern 3: Storing product/team content in component files
**What goes wrong:** Data and markup interleaved means updating team members requires editing JSX files.
**Instead:** Product and team data lives in `lib/products.ts` and `lib/team.ts` as typed arrays. Section components map over them. Future expansion (adding a product, changing a name) is a one-line data edit.

### Anti-Pattern 4: Using `<img>` instead of `next/image`
**What goes wrong:** Raw `<img>` tags bypass Vercel's on-demand image optimization, resulting in uncompressed images, no lazy loading, and layout shift.
**Instead:** Always use `next/image`. Set `priority` on the hero image.

---

## Sources

- Next.js App Router project structure docs (nextjs.org, updated 2026-04-08): https://nextjs.org/docs/app/getting-started/project-structure
- Next.js on Vercel — deployment features: https://vercel.com/docs/frameworks/full-stack/nextjs
- Tailwind CSS v4 dark mode docs: https://tailwindcss.com/docs/dark-mode
- Next.js server/client component patterns (DZone, 2025): https://dzone.com/articles/react-server-components-nextjs-15
- Next.js 15 performance optimization guide (Verlua, 2026): https://www.verlua.com/blog/nextjs-performance-optimization
- Tailwind v4 + next-themes dark mode implementation: https://www.thingsaboutweb.dev/en/posts/dark-mode-with-tailwind-v4-nextjs
- Next.js 15 App Router best practices (Better Dev, 2025): https://medium.com/better-dev-nextjs-react/inside-the-app-router-best-practices-for-next-js-file-and-directory-structure-2025-edition-ed6bc14a8da3
- Framer Motion scroll animations guide: https://jb.desishub.com/blog/framer-motion
