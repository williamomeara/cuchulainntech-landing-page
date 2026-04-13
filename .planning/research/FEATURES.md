# Feature Landscape: Tech Company Landing Page

**Domain:** Software company / indie studio landing page (products + services + contact)
**Project:** Cuchulainn Tech
**Researched:** 2026-04-13
**Overall confidence:** HIGH (cross-referenced evil martians devtool study, multiple 2025/2026 SaaS landing page analyses, Linear/Vercel pattern research)

---

## Table Stakes

Features that visitors expect. Missing = the page feels broken, incomplete, or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Nav bar with logo + links + CTA | Standard three-part layout: logo left, links center, CTA button right | Low | Sticky on scroll is common; CTA should be "Get in touch" or similar |
| Hero with headline, subheadline, primary CTA | First question visitors ask: "What is this, why should I care?" — must be answered above the fold | Low-Med | Bold headline, 1-2 sentence subhead, single primary action |
| Products section | Visitors need to know what's been built to assess credibility | Med | Each product needs: name, one-line description, status (live / in dev), link if available |
| Services section | "Hire us" audience needs a clear signal that contract work is available | Low | Brief description of what you build for clients; no need for full pricing |
| About / team section | Solo founders especially need to establish who is behind this | Low | Photo, brief bio, Irish/cultural angle; collaborators can be listed without headshots |
| Contact / CTA section | Both audiences (clients and investors) need a clear path to reach out | Low | Email, contact form, or Calendly embed; one focused action |
| Mobile responsive layout | Majority of first-pass visits happen on mobile | Med | Full Tailwind responsive classes; test at 375px, 768px, 1280px |
| Fast load / good Core Web Vitals | Slow pages kill credibility for a tech company specifically | Med | Next.js 15 static rendering + Vercel CDN handles this by default if images are optimised |
| Footer with links | Navigation fallback; signals completeness | Low | Social links (GitHub, LinkedIn), email, copyright |
| Clear visual identity / consistent branding | Visitors should feel a coherent brand, not a template dump | Med | Color palette, type scale, spacing system — lock these in early |

---

## Differentiators

Features that set the page apart. Not expected, but memorable and conversion-positive.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Irish cultural identity woven into copy and visuals | Most tech company pages look identical — a genuine cultural lens is rare and memorable | Low (copy) / Med (visuals) | Cuchulainn brand name is already a hook; lean into it in hero copy, section headings, possibly subtle Celtic motifs. Don't overdo it — one strong thread, not a costume |
| Product status badges (Live / In Development / Coming Soon) | Immediately signals momentum and transparency — clients and investors want to see active building | Low | Color-coded pill badges on each product card: green = live, amber = in dev, grey = coming soon |
| Live product embed or screenshot-with-link | Éist is live — showing real product UI or App Store badge raises credibility far above "we made a thing" | Low | App Store / Play Store badge + screenshot or device mockup of Éist |
| Named collaborators section | "Solo founder + collaborators" is honest and relatable; naming real people signals legitimacy without pretending to be a 20-person company | Low | Even first names + role descriptions work; photos optional |
| Dual-audience framing in hero | Explicitly signals to both clients ("hire us") and investors/partners ("back us") without a confusing split | Med (copy craft) | One headline, two-track subheadline or two CTA variants ("Hire us" / "Partner with us") |
| Project origin stories (1–2 sentences per product) | "Why we built this" beats a feature list for building trust with clients and investors | Low | Short, honest, specific — "We couldn't find a good Irish audiobook app, so we built one" type framing |
| Subtle dark gradient / glow effects on hero | The Linear/Vercel aesthetic is expected in dev-facing audiences — it signals taste and craft | Med | CSS radial gradients or border glow on hero card; Tailwind makes this manageable |
| Social proof block post-hero | Even a single specific testimonial from a real person beats zero; G2/PH badges apply if you have them | Low-Med | For Éist: App Store rating, user count, or a direct quote from a user or partner |
| Announcement / eyebrow element in hero | A small "New: Tender Match in development" pill above the headline signals active momentum | Low | One line, links to products section or roadmap |

---

## Anti-Features

Things to deliberately NOT build in v1.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Pricing table | This is a company page, not a product sales page; pricing confuses the services vs SaaS vs investment pitch | Add "Let's talk" CTA; pricing is a conversation |
| Blog / news feed | No content management needed; a stale blog is worse than no blog | If you ship news, link to GitHub releases or a Substack |
| Deep product documentation | Each product has its own site (eist.app); duplicating docs here creates maintenance burden | Link out to the product site; one sentence max per product |
| User onboarding flows | This page is for clients and investors, not Éist users | App Store links are sufficient; no in-page sign-up |
| Heavy animations / scroll-triggered parallax | Increases build complexity, hurts performance, and oversaturation means it no longer differentiates | Subtle scroll-based reveals (fade-in, translate-up) using Tailwind / Framer Motion are sufficient |
| Cookie consent banner (v1) | Not needed unless you add analytics requiring consent (GA4 with anonymized IPs is borderline); adds visual noise | Use Vercel Analytics (GDPR-friendly, no consent required) or defer entirely |
| Social media feed embed | Live feeds break, create layout jank, and distract from conversion | Link to profiles in footer only |
| Team org chart or detailed CVs | Overclaims for a solo-founder studio and makes the page feel corporate | One paragraph per person max |
| Multiple competing CTAs per section | Studies show up to 266% conversion drop with multiple competing actions | One primary CTA per section, one secondary maximum |
| FAQ section (v1) | Premature for a company page with no public user base yet | Address the most common Q in the services description copy instead |

---

## Section-by-Section Breakdown

### 1. Navigation

**What to include:** Logo (Cuchulainn Tech wordmark or symbol + name), 3–4 links (Products, Services, About, Contact), one CTA button ("Get in touch").

**Pattern:** Sticky on scroll, transparent at top of page, solid/blurred background after scrolling. Three-part layout is the universal standard — logo left, links center, CTA right.

**Irish identity hook:** Logo treatment — the name "Cuchulainn Tech" is doing the work; no need for shamrocks.

**Complexity:** Low.

---

### 2. Hero

**What to include:** Eyebrow pill (optional — "Building software in Ireland"), bold headline stating who you are and what you do, subheadline with 1–2 sentence expansion, primary CTA ("Get in touch"), secondary CTA ("See our work" / "View products"). Supporting visual: product screenshots, device mockup of Éist, or abstract dark geometric.

**Pattern:** Centered composition is the dominant pattern for dev-audience pages (Linear, Raycast, Vercel all use it). Dark background with subtle gradient or radial glow.

**Copy direction:** Lead with identity + value. Example: "We build software that ships." / "An Irish studio building SaaS products and custom apps." Avoid generic "We create innovative solutions."

**Irish identity hook:** Lean into the name in the subheadline. One mention of "built in Ireland" is enough. The Cuchulainn name carries the weight.

**Complexity:** Medium (copy craft is the hard part; the markup is simple).

---

### 3. Social Proof / Trust Bar (post-hero)

**What to include:** Éist App Store rating or download metric if available, one curated quote from a real user or partner, logos of organisations worked with if applicable.

**Pattern:** Placed immediately below the hero fold — this is where visitors decide whether to keep reading. Even a single specific testimonial with a name and context beats zero.

**Note for current state:** If Éist has App Store reviews, pull the best one verbatim with attribution. If not, a metric ("Available on iOS and Android") with App Store / Play Store badges performs the same trust function.

**Complexity:** Low.

---

### 4. Products Showcase

**What to include:** Section heading ("What we've built"), product cards for Éist, Tender Match, ATU Grant Demo. Each card: product name, one-line description, origin story sentence, status badge (Live / In Development / Coming Soon), link or "coming soon" note.

**Pattern:** 3-column grid on desktop, single column on mobile. Cards with subtle border and dark background. Status badge as colored pill. For Éist: App Store link + device mockup. For Tender Match and ATU: status badge only, no link.

**Irish identity hook:** Product names (Éist is Irish for "listen") are already doing this. Consider a brief note — "Éist (Irish: to listen)" — for non-Irish visitors.

**Complexity:** Medium (responsive card layout, status badges, mockup image).

**Dependency:** Requires final Éist screenshots/mockup and copy for all three products.

---

### 5. Services

**What to include:** Section heading ("What we build for you" or "Hire us"), brief description of what custom work looks like (mobile apps, SaaS products, Flutter, Next.js), 3–4 bullet capability points, a clear CTA ("Let's talk about your project").

**Pattern:** Left-aligned copy with a simple capability list or icon grid. Not a pricing table. Conversational tone — this is B2B sales copy, not a spec sheet.

**Irish identity hook:** Optional. "Building from Ireland, for the world" or similar.

**Complexity:** Low (pure copy + simple layout).

---

### 6. About / Team

**What to include:** Founder intro (name, photo, 2–3 sentence bio), collaborators listed by name + role. Company origin story — why Cuchulainn Tech exists, what drives the work.

**Pattern:** Split layout (photo left, text right) for founder. Collaborator list can be a simple text list or small avatar grid. Keep it personal, not corporate.

**Irish identity hook:** This is the natural home for the mythology reference. A sentence connecting the Cuchulainn warrior ethos to how the company approaches building — brief, not overwrought.

**Complexity:** Low.

---

### 7. Contact / Final CTA

**What to include:** Section heading ("Work with us" / "Get in touch"), two brief prompts ("Building something? Hire us." and "Investing in Irish tech? Let's talk."), a contact form or direct email link.

**Pattern:** Full-width dark section with high contrast. Single focused action. This is the last thing visitors see — make the ask explicit.

**Form vs email:** A simple form (name, email, message) reduces friction for cold contact. A mailto link is simpler to build. In v1, mailto is fine; a form can come later.

**Complexity:** Low (mailto) to Medium (form with basic server action or Formspree/Resend integration).

---

### 8. Footer

**What to include:** Logo, short tagline, links (Products, Services, About, Contact), social links (GitHub, LinkedIn, Twitter/X if active), email address, copyright.

**Pattern:** Dark background, 3–4 column layout, minimal. Matches the overall dark aesthetic.

**Complexity:** Low.

---

## Feature Dependencies

```
Nav (sticky) → requires page sections to have IDs for anchor links
Hero CTA → links to Contact section or opens contact form
Products section → requires final copy and mockup assets for all 3 products
Social proof block → requires Éist App Store link / rating / testimonial content
Contact form (if used) → requires backend (Formspree / Resend / Next.js server action)
Status badges → require confirmed product statuses (live / in dev / coming soon)
```

---

## MVP Recommendation

Build in this order to deliver value fast:

1. Nav + Hero (above-the-fold value prop — this is the most important thing to get right)
2. Products Showcase (Éist live, others as coming soon — credibility builder)
3. Services + Contact (the conversion sections — this is why the page exists)
4. About / Team (context and trust)
5. Social Proof bar (can be added once Éist copy/rating is confirmed)
6. Footer (always last)

**Defer to v2:**
- Contact form (start with mailto; form adds complexity without much v1 gain)
- Scroll animations (add after content is stable — animations applied to unstable content create rework)
- Blog / changelog (only if content pipeline exists)

---

## Sources

- Evil Martians devtool landing page study (100 pages, 2025): https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025
- Linear design analysis (LogRocket, 2025): https://blog.logrocket.com/ux-design/linear-design/
- SaaS landing page best practices (SaaSFrame, 2026): https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples
- Hero section best practices (Prismic): https://prismic.io/blog/website-hero-section
- Social proof strategy for SaaS (Ravefy, 2026): https://ravefy.io/blog/social-proof-strategy-for-saas-landing-pages
- CTA placement strategies (LandingPageFlow, 2026): https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages
- Linear.app homepage analysis (Creova/Unsection): https://creova.space/library/linear-app
