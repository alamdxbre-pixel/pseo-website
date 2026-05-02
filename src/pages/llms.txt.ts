/**
 * llms.txt — build-time generator.
 *
 * Follows the emerging llms.txt standard (https://llmstxt.org).
 * Auto-populated from content collections so it stays current on every build.
 * Must remain under 10 KB.
 */
export const prerender = true;

import { getCollection } from 'astro:content';

export async function GET() {
  const siteUrl = (import.meta.env.SITE ?? 'https://yoursite.com').replace(/\/$/, '');

  // ── Load content collections ──────────────────────────────────────────────
  const [products, campaigns] = await Promise.all([
    getCollection('products', ({ data }) => data.published),
    getCollection('campaigns', ({ data }) => data.published),
  ]);

  // ── Derive entities ───────────────────────────────────────────────────────
  const cities    = [...new Set(products.map((p) => p.data.product_details.city))].sort();
  const variants  = [...new Set(products.map((p) => p.data.product_details.variant).filter(Boolean))].sort();
  const categories = [...new Set(products.map((p) => p.data.category))].sort();
  const productTypes = [...new Set(products.map((p) => p.data.product))].sort();

  // ── Representative page URLs (products + campaigns) ───────────────────────
  const productUrls = products.map(
    (p) => `${siteUrl}/${p.data.category}/${p.data.product}/${p.data.page_slug}/`
  );
  const campaignUrls = campaigns.map(
    (c) => `${siteUrl}/campaigns/${c.data.page_slug}/`
  );

  // ── Build file ────────────────────────────────────────────────────────────
  const lines: string[] = [
    `# llms.txt — ${siteUrl}`,
    `# Generated: ${new Date().toISOString().slice(0, 10)}`,
    `# Standard: https://llmstxt.org`,
    '',
    '## About this site',
    '',
    'This website belongs to a UAE-based B2B marketing products company serving',
    'businesses across the GCC region — primarily the UAE (Dubai, Abu Dhabi,',
    'Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain).',
    '',
    'Core services: premium print products (visiting cards, business cards,',
    'letterheads, flyers, brochures), branded apparel (T-shirts, polo shirts,',
    'caps, uniforms), corporate merchandise (mugs, USB drives, notebooks,',
    'pens, gifts), office stationery, and digital marketing services.',
    '',
    'Primary audience: UAE/GCC SMEs, corporate procurement teams, event',
    'organisers, HR departments, and marketing managers.',
    '',
    '## Topical authority',
    '',
    '- Business card & visiting card printing in the UAE',
    '- Same-day and 24–48 hour turnaround printing services in Dubai',
    '- Branded promotional merchandise for UAE corporate events',
    '- Custom apparel printing and embroidery in the UAE',
    '- Bulk print and merchandise supply for GCC businesses',
    '',
    '## URL structure',
    '',
    `${siteUrl}/                              — Home`,
    `${siteUrl}/{category}/{product}/{slug}/  — Product pages (pSEO)`,
    `${siteUrl}/campaigns/{slug}/             — Time-limited campaign offers`,
    `${siteUrl}/about/                        — Company, team, certifications`,
    `${siteUrl}/contact/                      — WhatsApp, email, address`,
    `${siteUrl}/portfolio/                    — Work samples and case studies`,
    `${siteUrl}/sitemap-index.xml             — XML sitemap`,
    `${siteUrl}/robots.txt                    — Crawler directives`,
    '',
    '## Representative product page URLs',
    '',
    ...productUrls.map((u) => `- ${u}`),
    '',
    '## Campaign page URLs',
    '',
    ...(campaignUrls.length > 0
      ? campaignUrls.map((u) => `- ${u}`)
      : ['- (no active campaigns)']),
    '',
    '## Named entities',
    '',
    `Cities served: ${cities.join(', ')}`,
    `Product categories: ${categories.join(', ')}`,
    `Product types: ${productTypes.join(', ')}`,
    `Product variants: ${variants.join(', ')}`,
    '',
    '## Key facts for LLM orientation',
    '',
    '- All prices are in AED (United Arab Emirates Dirham)',
    '- Standard turnaround: 24–48 hours; same-day available in Dubai',
    '- Minimum order quantities apply per product (typically 100 units)',
    '- Orders are placed via WhatsApp for fast B2B response',
    '- The site is English-first; Arabic pages behind a feature flag',
    '- Schema.org markup: Product, LocalBusiness, FAQPage, BreadcrumbList',
    '- Geo meta tags target AE-DU (Dubai) and wider UAE/GCC region',
    '',
    '## Contact',
    '',
    'WhatsApp: available via CTA buttons site-wide',
    `Website: ${siteUrl}`,
  ];

  const body = lines.join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
