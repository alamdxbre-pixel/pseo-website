import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Derive site URL at config load time ───────────────────────────────────────
const siteUrl = (process.env.SITE_URL ?? 'https://yoursite.com').replace(/\/$/, '');

// ── Build URL → sitemap config map from MD frontmatter ────────────────────────
// Runs synchronously at config init so @astrojs/sitemap serialize() can use it.

function getMdFiles(dir) {
  const results = [];
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) results.push(...getMdFiles(full));
      else if (entry.name.endsWith('.md')) results.push(full);
    }
  } catch { /* directory may not exist yet */ }
  return results;
}

function extractFm(filePath) {
  const raw = readFileSync(filePath, 'utf-8');
  return raw.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] ?? '';
}

function fmVal(block, key) {
  return block.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, 'm'))?.[1]?.trim();
}

const sitemapConfigMap = new Map();

// Product pages: /{category}/{product}/{page_slug}/
for (const file of getMdFiles(join(__dirname, 'src/content/products'))) {
  const fm = extractFm(file);
  if (fmVal(fm, 'published') === 'false') continue;
  const category = fmVal(fm, 'category');
  const product  = fmVal(fm, 'product');
  const pageSlug = fmVal(fm, 'page_slug');
  if (!category || !product || !pageSlug) continue;
  const smBlock    = fm.match(/sitemap:\s*\n((?:[ \t]+\S[^\n]*\n?)*)/)?.[1] ?? '';
  const priority   = parseFloat(smBlock.match(/priority:\s*([\d.]+)/)?.[1] ?? '0.7');
  const changefreq = smBlock.match(/changefreq:\s*(\w+)/)?.[1] ?? 'weekly';
  sitemapConfigMap.set(`${siteUrl}/${category}/${product}/${pageSlug}/`, { priority, changefreq });
}

// Campaign pages: /campaigns/{page_slug}/ — time-sensitive, high priority
for (const file of getMdFiles(join(__dirname, 'src/content/campaigns'))) {
  const fm = extractFm(file);
  if (fmVal(fm, 'published') === 'false') continue;
  const pageSlug = fmVal(fm, 'page_slug');
  if (!pageSlug) continue;
  sitemapConfigMap.set(`${siteUrl}/campaigns/${pageSlug}/`, { priority: 0.9, changefreq: 'daily' });
}

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: siteUrl,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),

    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag', 'clarity'],
      },
    }),

    sitemap({
      lastmod: new Date(),
      serialize(item) {
        const cfg = sitemapConfigMap.get(item.url);
        if (cfg) {
          item.priority   = cfg.priority;
          item.changefreq = cfg.changefreq;
        }
        return item;
      },
    }),
  ],
});
