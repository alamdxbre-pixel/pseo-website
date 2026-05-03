#!/usr/bin/env node
/**
 * generate-pages.mjs — Bulk pSEO MD page generator.
 *
 * Reads seed data from scripts/pages-seed.mjs and cross-joins:
 *   product × city × variant → one MD file per combination
 *
 * Output: src/content/products/{category}/{product}/{city-slug}-{variant-slug}.md
 *
 * Usage:
 *   node scripts/generate-pages.mjs               # dry run (preview only)
 *   node scripts/generate-pages.mjs --write        # write files (skip existing)
 *   node scripts/generate-pages.mjs --write --overwrite  # overwrite all files
 *   node scripts/generate-pages.mjs --write --product=visiting-cards
 *   node scripts/generate-pages.mjs --write --city=dubai
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { cities, products } from './pages-seed.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);

// ── CLI args ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const OVERWRITE = args.includes('--overwrite');
const filterProduct = args.find((a) => a.startsWith('--product='))?.split('=')[1];
const filterCity = args.find((a) => a.startsWith('--city='))?.split('=')[1];

// ── Slug helpers ──────────────────────────────────────────────────────────────
function toSlug(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// ── Template helpers ──────────────────────────────────────────────────────────
function interpolate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

// City wikidata lookup helper
function cityEntity(city) {
  return city.wikidata ? `\n    wikidata: "${city.wikidata}"` : '';
}

// ── Derive SKU from city + variant ───────────────────────────────────────────
function makeSku(prefix, citySlug, suffix) {
  const cityCode = citySlug.split('-').map((p) => p[0].toUpperCase()).join('');
  return `${prefix}-${cityCode}-${suffix}`;
}

// ── Related slugs within same product × sibling cities/variants ──────────────
function buildRelated(category, product, city, variant, allCities, allVariants) {
  const related = [];

  // Same city, other variants (max 2)
  for (const v of allVariants) {
    if (v.slug === variant.slug) continue;
    related.push(`/${category}/${product}/${city.slug}-${v.slug}`);
    if (related.length >= 2) break;
  }

  // Same variant, other cities (max 2)
  for (const c of allCities) {
    if (c.slug === city.slug) continue;
    related.push(`/${category}/${product}/${c.slug}-${variant.slug}`);
    if (related.length >= 4) break;
  }

  return related;
}

// ── Generate YAML frontmatter string ─────────────────────────────────────────
function buildFrontmatter(product, city, variant, relatedSlugs) {
  const pageSlug = `${city.slug}-${variant.slug}`;
  const sku = makeSku(variant.skuPrefix, city.slug, variant.skuSuffix);
  const canonicalPath = `/${product.category}/${product.product}/${pageSlug}`;

  const displayVariant = variant.name;
  const displayProduct = product.displayName;
  const displayCity = city.name;

  // Title: keep under 70 chars — product + variant + city + brand hint
  const title = `${displayVariant} ${displayProduct} ${displayCity} | Fast Delivery | Upshot Solutions`;
  const description = `Order ${displayVariant.toLowerCase()} ${displayProduct.toLowerCase()} in ${displayCity}. ${city.turnaround} delivery, from ${product.minQuantity} units. Bulk pricing available. Get an instant quote today.`;

  const heroHeadline = `Premium ${displayVariant} ${displayProduct}, Delivered Across ${displayCity}`;
  const heroSubline = variant.description;

  const faqInterpolated = product.faqBase.map((item) => ({
    q: interpolate(item.q, { city: displayCity, variant: displayVariant, turnaround: city.turnaround }),
    a: interpolate(item.a, { city: displayCity, variant: displayVariant, turnaround: city.turnaround, finish: variant.finish }),
  }));

  const faqYaml = faqInterpolated
    .map((f) => `  - q: "${f.q.replace(/"/g, '\\"')}"\n    a: "${f.a.replace(/"/g, '\\"')}"`)
    .join('\n');

  const relatedYaml = relatedSlugs.map((r) => `  - "${r}"`).join('\n');

  return `---
# ── Routing & Lifecycle ───────────────────────────────────────────────────────
page_slug: "${pageSlug}"
category: "${product.category}"
product: "${product.product}"
lang: "en"
published: true
arabic_ready: false
date_published: "${TODAY}"
date_modified: "${TODAY}"

# ── SEO Core ─────────────────────────────────────────────────────────────────
title: "${title}"
description: "${description}"
canonical: "${canonicalPath}"

robots:
  index: true
  follow: true
  max_snippet: -1
  max_image_preview: "large"
  max_video_preview: -1

sitemap:
  priority: 0.8
  changefreq: "weekly"

# ── Social / OG ──────────────────────────────────────────────────────────────
og:
  title: "${displayVariant} ${displayProduct} in ${displayCity}"
  description: "Premium quality, ${city.turnaround} delivery across UAE. Bulk orders from ${product.minQuantity} units."
  image_width: 1200
  image_height: 630
  type: "product"

# ── Geo Targeting ────────────────────────────────────────────────────────────
geo:
  region: "${city.region}"
  placename: "${displayCity}"
  position: "${city.position}"
  icbm: "${city.icbm}"

# ── Page UI Content ──────────────────────────────────────────────────────────
hero:
  headline: "${heroHeadline}"
  subline: "${heroSubline}"
  cta_primary: "Get an Instant Quote"
  cta_secondary: "View Samples"

product_details:
  city: "${displayCity}"
  variant: "${displayVariant}"
  sku: "${sku}"
  price_from: ${variant.priceFrom}
  currency: "${product.currency}"
  turnaround: "${city.turnaround}"
  availability: "${product.availability}"
  min_quantity: ${product.minQuantity}

# ── Structured Data ───────────────────────────────────────────────────────────
schema:
  type: "Product"
  aggregate_rating:
    rating_value: ${variant.ratingValue}
    review_count: ${variant.reviewCount}
    best_rating: 5
  offers:
    price: ${variant.priceFrom}
    price_currency: "${product.currency}"
    availability: "https://schema.org/InStock"
    valid_through: "2027-12-31"

breadcrumb:
  - label: "Home"
    url: "/"
  - label: "${product.category.charAt(0).toUpperCase() + product.category.slice(1)}"
    url: "/${product.category}"
  - label: "${displayProduct}"
    url: "/${product.category}/${product.product}"
  - label: "${displayCity} – ${displayVariant}"
    url: "${canonicalPath}"

# ── AI Search Layer ───────────────────────────────────────────────────────────
faq:
${faqYaml}

entities:
  - name: "${displayProduct} ${displayCity}"
    type: "Product"
  - name: "${displayCity}"
    type: "City"${cityEntity(city)}
  - name: "${displayVariant}"
    type: "ProductVariant"
  - name: "United Arab Emirates"
    type: "Country"
    wikidata: "Q878"

speakable_css_selectors:
  - ".hero-headline"
  - ".product-summary"
  - ".faq-section"

content_intent: "transactional"

# ── E-E-A-T Signals ──────────────────────────────────────────────────────────
eeat:
  years_in_business: ${product.yearsInBusiness}
  certifications:
${product.certifications.map((c) => `    - "${c}"`).join('\n')}
  trust_badges:
${product.trustBadges.map((b) => `    - "${b}"`).join('\n')}

# ── Internal Linking ─────────────────────────────────────────────────────────
related:
${relatedYaml}
---

## ${heroHeadline}

${variant.description}. Order online and get fast delivery to ${displayCity} and across the UAE.

### Why Choose Upshot Solutions for ${displayProduct} in ${displayCity}?

- **${city.turnaround} turnaround** — order before 12pm for same-day dispatch
- **Premium ${displayVariant} quality** — ${variant.finish.toLowerCase()}
- **Competitive bulk pricing** — from ${product.minQuantity} units, volume discounts from 500
- **Design service available** — supply your artwork or use our free design service
- **UAE-wide delivery** — all seven emirates covered
`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
let created = 0;
let skipped = 0;
let dryRun = 0;

for (const product of products) {
  if (filterProduct && product.product !== filterProduct) continue;

  for (const city of cities) {
    if (filterCity && city.slug !== filterCity) continue;

    for (const variant of product.variants) {
      const pageSlug = `${city.slug}-${variant.slug}`;
      const dir = join(ROOT, 'src/content/products', product.category, product.product);
      const filePath = join(dir, `${pageSlug}.md`);

      const related = buildRelated(
        product.category,
        product.product,
        city,
        variant,
        cities,
        product.variants
      );
      const content = buildFrontmatter(product, city, variant, related);

      if (!WRITE) {
        console.log(`  [dry-run] ${filePath.replace(ROOT, '').replace(/\\/g, '/')}`);
        dryRun++;
        continue;
      }

      if (existsSync(filePath) && !OVERWRITE) {
        console.log(`  [skip]    ${pageSlug}.md  (already exists)`);
        skipped++;
        continue;
      }

      mkdirSync(dir, { recursive: true });
      writeFileSync(filePath, content, 'utf-8');
      console.log(`  ✓  ${pageSlug}.md`);
      created++;
    }
  }
}

console.log('');
if (!WRITE) {
  console.log(`Dry run — ${dryRun} file(s) would be generated. Add --write to create them.`);
} else {
  console.log(`Done — ${created} created, ${skipped} skipped.`);
}
