## Parent
#1

## What to build

Initialize the Astro project in SSG mode with Tailwind CSS (custom design tokens: white base, charcoal text, accent color placeholder), Plus Jakarta Sans / Inter font config, and a wrangler.toml for Cloudflare Pages. This is the foundation every other slice builds on. Includes a placeholder public/robots.txt and pnpm as the package manager.

## Acceptance criteria

- [ ] stro.config.mjs configured for output: 'static'
- [ ] Tailwind installed with custom design tokens (colors, fonts, spacing)
- [ ] wrangler.toml present with Cloudflare Pages project name
- [ ] pnpm dev starts local dev server with no errors
- [ ] pnpm build produces a /dist folder
- [ ] Placeholder public/robots.txt present
- [ ] shadcn/ui initialized with Astro-compatible config

## Blocked by

None — can start immediately
