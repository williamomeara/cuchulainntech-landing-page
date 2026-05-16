# Deployment Plan: Cuchulainn Tech Landing Page

**Decided:** 2026-05-16

## Surfaces

| Surface | Choice | Notes |
|---|---|---|
| **Hosting** | Vercel (Hobby tier, free) | Static-export Next.js 15. Canonical Next.js host. Free indefinitely for this workload. |
| **Build mode** | Next.js 15 static export (`output: 'export'`) | No server compute. Pure CDN delivery. |
| **Canonical domain** | `cuchulainntech.ie` | Irish identity in the URL bar. Owned via Blacknight (renewed 2026-05-01). Migrate nameservers to Cloudflare as part of deploy. |
| **Redirect domain** | `cuchulainntech.com` → `cuchulainntech.ie` (301) | Owned. Already on Cloudflare DNS. Vercel handles the apex redirect at the edge. |
| **DNS provider** | Cloudflare (both zones) | `.com` zone already exists on Cloudflare. `.ie` must be moved from Blacknight's nameservers to Cloudflare. Cloudflare API token in `~/Dev/Lawman/notes/api-keys.md` has all-zones edit access — usable for the .ie zone once added. |
| **Email — `hello@cuchulainntech.ie`** | New Purelymail mailbox on the `.ie` domain | Brand email must match the brand domain. Set up MX + SPF + DKIM + DMARC for `cuchulainntech.ie` in Cloudflare → Purelymail. |
| **Email — existing `.com` mailboxes** | Keep `william@` and `jimmy@cuchulainntech.com` running on Purelymail | No disruption. The redirect at the website level is independent of email routing. |
| **Analytics** | Vercel Web Analytics (free) | Zero-config, no cookie banner, GDPR-friendly. Page views, top pages, devices, countries. |
| **OG image** | Next.js `opengraph-image.tsx` (build-time) | No external service. Generated as part of the static export. |
| **SEO** | `sitemap.ts` + `robots.ts` + Organization JSON-LD | All native to Next.js. Schema.org Organization block must include `legalName`, `address`, and `taxID` (CRO 812722). All canonical URLs point to `https://cuchulainntech.ie/...`. |
| **CI** | Vercel for deploy + GitHub Actions for lint/type-check on PRs | Vercel doesn't fail-fast on TS errors by default. GH Actions catches type errors before merge. |
| **Error monitoring** | None for v1 | Static page + mailto contact. No server surface to monitor. Add Sentry only when v2 contact form lands (Resend + Server Action). |
| **Repo visibility** | Public on GitHub | Studio craft signal — open commits, code quality, hygiene all become marketing. |

## Company / Legal Identity

- **Legal name:** CÚ CHULAINN TECH LIMITED
- **CRO number:** 812722
- **Incorporated:** 02/04/2026
- **Registered address:** Farrannamoreen, Glasson, Athlone, Westmeath, N37 W215, Ireland
- **Display name on site:** Cuchulainn Tech (unaccented, matches the domain)
- **Footer must include:** `© 2026 Cú Chulainn Tech Limited · CRO 812722 · Ireland`

## v2 Roadmap (deferred)

- Replace mailto with in-page contact form using **Resend** + Next.js Server Actions (API key already exists in `~/Dev/Lawman/notes/api-keys.md`). At that point, add **Sentry** for error monitoring on the server action.
- Promote `hello@cuchulainntech.ie` to additional aliases (`careers@`, `press@`) if needed.

## Deploy Sequence (execution order)

1. **Scaffold** Next.js 15 app with `output: 'export'`
2. **GitHub** — initialise public repo, push initial commit
3. **Vercel** — connect repo to a new Vercel project, first deploy at `*.vercel.app`
4. **`.ie` DNS migration** — in Cloudflare, add `cuchulainntech.ie` as a new zone. Take the two Cloudflare nameservers Cloudflare assigns and paste them into Blacknight's nameserver field for `cuchulainntech.ie`. Wait for propagation (usually 30 min to 24 h)
5. **Vercel custom domains** — add `cuchulainntech.ie` and `www.cuchulainntech.ie`. Add `cuchulainntech.com` and `www.cuchulainntech.com` as redirect-only domains pointing to the `.ie` apex
6. **Cloudflare DNS records** —
   - `.ie` zone: `A` apex → Vercel anycast, `CNAME www` → `cname.vercel-dns.com`
   - `.com` zone: same records (Vercel will 301 to `.ie` per its custom-domain redirect config)
7. **Purelymail on `.ie`** — create new mailbox `hello@cuchulainntech.ie`, then in Cloudflare add Purelymail's MX, SPF (`v=spf1 include:_spf.purelymail.com ~all`), DKIM, and DMARC records to the `.ie` zone
8. **Verify** — mailto opens correct address, OG preview renders, analytics fires, both apex and www reach the site, `.com` redirects cleanly to `.ie`
9. **Search Console** — submit `https://cuchulainntech.ie/sitemap.xml` (post-launch)

## Cost Summary

| Item | Cost |
|---|---|
| Vercel Hobby | €0 |
| Vercel Web Analytics | €0 |
| Cloudflare DNS | €0 |
| `cuchulainntech.com` (existing) | already paid |
| `cuchulainntech.ie` renewal | €36.99 / yr (2027-05-01) |
| Purelymail (existing account, new alias/mailbox) | within existing plan |
| **Annual ongoing** | **~€37 / yr** |
