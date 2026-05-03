/**
 * generate-og-images.mjs — prebuild script
 *
 * Generates 1200×630 branded PNG OG images for every product and campaign page.
 * Output: public/images/og/{slug}.png
 *
 * Run automatically via the "prebuild" npm script.
 * Uses Satori (JSX-to-SVG) + @resvg/resvg-js (SVG-to-PNG).
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const OUT_DIR   = join(ROOT, 'public', 'images', 'og');

mkdirSync(OUT_DIR, { recursive: true });

// ── Brand tokens ─────────────────────────────────────────────────────────────
const BRAND_CHARCOAL = '#0B1F3B';
const BRAND_ACCENT   = '#C9A66B';
const WHITE          = '#FFFFFF';
const WHITE_60       = 'rgba(255,255,255,0.60)';
const WHITE_30       = 'rgba(255,255,255,0.30)';

// ── Satori needs a font buffer at init time ───────────────────────────────────
// Satori's opentype.js supports woff/TTF/OTF but NOT woff2.
const FONT_PATH = join(
  ROOT,
  'node_modules',
  '@fontsource',
  'inter',
  'files',
  'inter-latin-400-normal.woff'
);
const fontData = readFileSync(FONT_PATH);
const FONTS = [{ name: 'Inter', data: fontData, weight: 400, style: 'normal' }];

// ── Minimal JSX tree as plain objects (Satori accepts React.createElement format) ──
function tw(style, children) {
  return { type: 'div', props: { style: { display: 'flex', ...style }, children } };
}
function sp(style, children) {
  return { type: 'span', props: { style, children } };
}

function buildTemplate({ brand, headline, city, variant, category }) {
  const sub = [city, variant, category].filter(Boolean).join('  ·  ');
  const titleSize = headline.length > 50 ? 42 : 52;

  return tw(
    {
      width: 1200, height: 630,
      flexDirection: 'row',
      background: BRAND_CHARCOAL,
      fontFamily: 'Inter',
      overflow: 'hidden',
    },
    [
      // Left accent bar
      tw({ width: 10, height: 630, background: BRAND_ACCENT, flexShrink: 0 }, null),
      // Main content
      tw(
        {
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '52px 72px 52px 60px',
          flex: 1,
          height: 630,
        },
        [
          // Top: brand name
          tw({ alignItems: 'center', gap: 12 }, [
            tw({ width: 36, height: 36, background: BRAND_ACCENT, borderRadius: 6 }, null),
            sp({ color: WHITE, fontSize: 22, letterSpacing: '0.02em' }, brand),
          ]),
          // Middle: headline + subline
          tw({ flexDirection: 'column', gap: 18 }, [
            sp(
              { color: WHITE, fontSize: titleSize, lineHeight: 1.15, maxWidth: 900 },
              headline
            ),
            ...(sub
              ? [sp({ color: WHITE_60, fontSize: 26, letterSpacing: '0.01em' }, sub)]
              : []),
          ]),
          // Bottom: rule + CTA hint
          tw({ flexDirection: 'column', gap: 14 }, [
            tw({ height: 1, background: WHITE_30, width: '100%' }, null),
            sp(
              { color: WHITE_60, fontSize: 20, letterSpacing: '0.04em', textTransform: 'uppercase' },
              'Get an instant quote on WhatsApp'
            ),
          ]),
        ]
      ),
    ]
  );
}

// ── Parse MD frontmatter helpers ─────────────────────────────────────────────
function getMdFiles(dir) {
  const results = [];
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) results.push(...getMdFiles(full));
      else if (entry.name.endsWith('.md')) results.push(full);
    }
  } catch { /* skip missing dirs */ }
  return results;
}

function extractFm(filePath) {
  const raw = readFileSync(filePath, 'utf-8');
  return raw.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] ?? '';
}

function fmVal(block, key) {
  return block.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, 'm'))?.[1]?.trim();
}

// ── Generate PNG ──────────────────────────────────────────────────────────────
async function renderPng(template) {
  const svg = await satori(template, {
    width: 1200,
    height: 630,
    fonts: FONTS,
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}

// ── Process pages ─────────────────────────────────────────────────────────────
const BRAND = 'Pixel Print UAE';
let generated = 0;

// Product pages
for (const file of getMdFiles(join(ROOT, 'src', 'content', 'products'))) {
  const fm = extractFm(file);
  if (fmVal(fm, 'published') === 'false') continue;

  const pageSlug = fmVal(fm, 'page_slug');
  const category = fmVal(fm, 'category');
  const city     = fmVal(fm, 'city') ?? fmVal(fm, '  city');
  const variant  = fmVal(fm, 'variant') ?? fmVal(fm, '  variant');

  // Extract hero.headline from indented block
  const headline =
    fm.match(/headline:\s*"([^"]+)"/)?.[1] ??
    fm.match(/headline:\s*(.+)/)?.[1]?.trim() ??
    fmVal(fm, 'title') ??
    'Premium Print Products';

  if (!pageSlug) continue;

  const outPath = join(OUT_DIR, `${pageSlug}.png`);
  const png = await renderPng(buildTemplate({ brand: BRAND, headline, city: city ?? '', variant: variant ?? '', category: category ?? '' }));
  writeFileSync(outPath, png);
  console.log(`  ✓ ${pageSlug}.png`);
  generated++;
}

// Campaign pages
for (const file of getMdFiles(join(ROOT, 'src', 'content', 'campaigns'))) {
  const fm = extractFm(file);
  if (fmVal(fm, 'published') === 'false') continue;

  const pageSlug    = fmVal(fm, 'page_slug');
  const title       = fmVal(fm, 'title') ?? 'Campaign Offer';
  const offerLine   = fmVal(fm, 'offer_headline') ?? '';

  if (!pageSlug) continue;

  const outPath = join(OUT_DIR, `campaign-${pageSlug}.png`);
  const png = await renderPng(buildTemplate({
    brand: BRAND,
    headline: title,
    city: '',
    variant: offerLine.length > 60 ? offerLine.slice(0, 60) + '…' : offerLine,
    category: 'Campaign Offer',
  }));
  writeFileSync(outPath, png);
  console.log(`  ✓ campaign-${pageSlug}.png`);
  generated++;
}

console.log(`\nOG images generated: ${generated}`);
