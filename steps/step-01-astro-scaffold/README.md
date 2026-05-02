# Step 1 — Astro Scaffold + Tailwind Config + Wrangler Setup

**Branch:** `step-01-astro-scaffold`
**GitHub Issue:** #2
**Status:** Completed

## What was built

Full Astro SSG project scaffold deployed on Cloudflare Pages, with Tailwind CSS design tokens, shadcn/ui configuration, and all environment scaffolding. This is the foundational layer every subsequent step builds on.

## Files Created

| File | Purpose |
|---|---|
| `package.json` | pnpm project with all dependencies declared |
| `astro.config.mjs` | Astro SSG config with Tailwind vite plugin, React, Partytown, Sitemap integrations |
| `tsconfig.json` | TypeScript strict config with `@/*` path alias |
| `wrangler.toml` | Cloudflare Pages project config with `ENABLE_ARABIC=false` default |
| `components.json` | shadcn/ui configuration pointing to Tailwind CSS v4 |
| `.gitignore` | Node, Astro, Wrangler, editor ignores |
| `.env.example` | Documents all required environment variables |
| `public/robots.txt` | Placeholder — upgraded to full AI-bot allowlist in Step 11 |
| `public/favicon.svg` | Brand accent colour placeholder SVG favicon |
| `src/styles/global.css` | Tailwind v4 `@theme` block with full design token set |
| `src/lib/utils.ts` | `cn()` Tailwind merge utility + `buildWhatsAppLink()` base helper |
| `src/layouts/Base.astro` | Base layout shell with lang/dir, font, and named slots |
| `src/pages/index.astro` | Homepage placeholder with hero CTA |
| `src/pages/404.astro` | 404 page |
| `src/env.d.ts` | TypeScript types for all environment variables |
| `scripts/.gitkeep` | Placeholder for bulk generator script (Step 17) |
| `src/content/.gitkeep` | Placeholder for content collections (Steps 2 & 9) |
| `src/components/.gitkeep` | Placeholder for Astro components (Steps 4–12) |
| `src/components/ui/.gitkeep` | Placeholder for shadcn/ui components |

## Design Tokens (defined in `src/styles/global.css`)

| Token | Value | Usage |
|---|---|---|
| `--color-brand-accent` | `#0D7377` | Primary CTAs, links, highlights |
| `--color-brand-accent-light` | `#14A085` | Hover states |
| `--color-brand-accent-dark` | `#0A5A5E` | Active states |
| `--color-brand-charcoal` | `#1C2028` | Body text |
| `--color-brand-charcoal-light` | `#3D4451` | Secondary text |
| `--color-brand-cream` | `#F8F9FA` | Background sections |
| `--font-family-sans` | Plus Jakarta Sans Variable | All body text |

## Build Verification

```
pnpm build output:
  ✓ 2 pages built (/, /404)
  ✓ sitemap-index.xml generated
  ✓ Build complete in 3.43s
  ✓ Exit code 0
```

## Key Decisions

- **Output mode:** `static` — pre-built HTML, zero server, CDN-hosted
- **Package manager:** pnpm (faster installs, strict hoisting, lockfile)
- **Tailwind v4** with `@theme` CSS-native design tokens (no `tailwind.config.js` needed)
- **shadcn/ui** initialized for copy-owned components (no runtime library)
- **Partytown** included from day one — GA4 will load off-main-thread in Step 14
- **Arabic feature flag** defaulted to `false` in `wrangler.toml` — toggle in CF dashboard

## Environment Variables Required Before Launch

| Variable | Description |
|---|---|
| `SITE_URL` | Full site URL for canonical and sitemap |
| `PUBLIC_GA4_ID` | Google Analytics 4 Measurement ID |
| `PUBLIC_CLARITY_ID` | Microsoft Clarity Project ID |
| `ENABLE_ARABIC` | `"true"` when Arabic content is ready |
| `WHATSAPP_NUMBER` | WhatsApp Business number (e.g. `971501234567`) |

## Next Step

**[Step 2 — Product content collection Zod schema](../step-02-product-collection/)** (Issue #3)
Defines the Astro content collection for product MD files with full Zod validation of the production-grade frontmatter schema.
