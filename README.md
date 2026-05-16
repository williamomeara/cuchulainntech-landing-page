# Cuchulainn Tech — Landing Page

The marketing site for Cú Chulainn Tech Limited (CRO 812722).

- **Stack:** Next.js 15 (App Router, static export), Tailwind v4, next-themes, Geist
- **Hosting:** Vercel
- **DNS:** Cloudflare → `cuchulainntech.ie` (canonical), `cuchulainntech.com` (301 → .ie)
- **Project docs:** see `.planning/`
- **Design handoff:** see `design/`

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test:e2e     # Playwright smoke tests
pnpm build        # static export → ./out
```

## Deploy

`main` deploys automatically on Vercel. PRs get preview deploys.
