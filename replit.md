# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/idotaxi run build` — build the I DO TAXI static site for GitHub Pages

## I DO TAXI website

A static React + Vite site for `idotaxi.net` lives in `artifacts/idotaxi/`. It is single-page,
no backend, and is intended for **free** hosting on GitHub Pages (custom domain `idotaxi.net`,
DNS managed on Squarespace). Auto-deploy is wired up via `.github/workflows/deploy.yml` —
every push to `main` rebuilds and publishes. End-user setup steps live in `HOSTING.md` at the
repo root.

Key files for content edits:

- Sections: `artifacts/idotaxi/src/components/{Hero,WhyUs,Services,Fleet,AppFeatures,ServiceAreas,HowItWorks,Testimonials,FAQ,CTA,Footer,Navbar}.tsx`
- SEO/meta + JSON-LD (TaxiService + MobileApplication schema): `artifacts/idotaxi/index.html`
- Brand logo (used as favicon, og-image, navbar, hero, footer): `artifacts/idotaxi/public/logo.png`
- Custom domain: `artifacts/idotaxi/public/CNAME` (contains `idotaxi.net`)
- Fonts: Cormorant Garamond + Inter (preloaded from Google Fonts in `index.html`)

Real brand facts baked into the site (verified from socials and App Store):

- Owner / app developer: **Digital Trans s.a.l.**
- iOS App Store: `https://apps.apple.com/us/app/ido-taxi/id1347542411`
- Android / universal: `https://bit.ly/IDoApp`
- Phones: dispatch `+961 3 593 596`, TAXIDO VIP `+961 70 110 403`, office `+961 4 710 445`
- Differentiators: **Cab Coins** loyalty (per-km rewards), **Carpool** vehicle option, in-app **WhatsApp chat with driver**, multilingual app
- Identity tag: `#ProudlyLebanese`

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
