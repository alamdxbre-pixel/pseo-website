# Step 02 — Product Content Collection & Zod Schema

**GitHub Issue:** [#3](https://github.com/alamdxbre-pixel/pseo-website/issues/3)  
**Branch:** `step-02-product-collection`  
**Build status:** `pnpm build` exits 0 — 2 pages + sitemap

---

## What Was Built

Astro v5 Content Collections wired up with production-grade Zod schemas for all four collection types. The schema is designed to power 300–700 programmatic pages with full SEO metadata baked into each Markdown file.

---

## Files Created

| File | Purpose |
|---|---|
| `src/content/config.ts` | Astro `defineCollection` + Zod schemas for all 4 collections |
| `src/content/products/print/visiting-cards/dubai-300gsm-gloss.md` | Sample product page — 300GSM Gloss visiting card, Dubai |
| `src/content/products/print/visiting-cards/dubai-300gsm-matt.md` | Sample product page — 300GSM Matt visiting card, Dubai |
| `src/content/categories/print.md` | Category seed — Print collection |
| `src/content/pages/home.md` | Pages collection seed — Homepage metadata |
| `src/content/campaigns/` | Empty campaigns directory (seed MDs added in Step 9) |

---

## Collection Schemas

### `productsCollection` — the core pSEO schema

Every product MD file carries a rich frontmatter object validated by Zod at build time. Sections:

| Section | Key fields |
|---|---|
| **Routing** | `page_slug`, `category`, `product`, `lang`, `hreflang_pair`, `published`, `arabic_ready`, `date_published`, `date_modified` |
| **SEO core** | `title` (10–70 chars), `description` (50–160 chars), `canonical`, `robots` (index, follow, max_snippet, max_image_preview, max_video_preview) |
| **Open Graph** | `og.title`, `og.description`, `og.image`, `og.type` |
| **Geo** | `geo.region` (e.g. `AE-DU`), `geo.placename`, `geo.position` (`lat;lon`), `geo.icbm` (`lat, lon`) |
| **Hero** | `hero.headline`, `hero.subheadline`, `hero.cta_primary`, `hero.cta_secondary`, `hero.image` |
| **Product details** | `product_details.city`, `product_details.variant`, `product_details.sku`, `product_details.price_from`, `product_details.currency`, `product_details.turnaround`, `product_details.availability`, `product_details.min_quantity` |
| **Schema.org** | `schema.type` (Product / Service / LocalBusiness), `schema.aggregate_rating`, `schema.offers` |
| **Breadcrumb** | Array of `{ name, url }` — renders JSON-LD BreadcrumbList |
| **FAQ** | Array of `{ question, answer }` — min 1, renders JSON-LD FAQPage |
| **Entities** | Array of `{ name, type, wikidata, description }` — feeds AI entity recognition |
| **Content intent** | Enum: `informational` / `commercial` / `transactional` / `navigational` |
| **E-E-A-T** | `eeat.author`, `eeat.reviewer`, `eeat.credentials`, `eeat.last_reviewed` |
| **Related** | Cross-links to related product slugs |
| **Campaigns** | Campaign tags to link to active campaign blocks |

**Zod refinements:**
- `date_modified` must be ≥ `date_published`
- `hreflang_pair` requires `arabic_ready: true`

### `categoriesCollection`

| Field | Type | Purpose |
|---|---|---|
| `title` | string | Category page `<title>` |
| `description` | string | Category meta description |
| `page_slug` | string (optional) | URL override — defaults to filename |
| `icon` | string (optional) | Lucide icon name for nav |
| `nav_label` | string | Label in mega-menu navigation |
| `og` | partial OG | Open Graph overrides |
| `published` | boolean | Draft/live toggle |

### `pagesCollection`

| Field | Type | Purpose |
|---|---|---|
| `title` | string | Page `<title>` |
| `description` | string | Meta description |
| `canonical` | string | Canonical URL path |
| `og` | partial OG | Open Graph overrides |
| `robots` | robots object | Crawl directives |
| `published` | boolean | Draft/live toggle |
| `date_modified` | string | Last-modified ISO date |

### `campaignsCollection`

| Field | Type | Purpose |
|---|---|---|
| `title` | string | Campaign page title |
| `page_slug` | string | URL segment |
| `status` | enum: scheduled / active / expired | Controls rendering |
| `valid_from` / `valid_through` | ISO dates | Offer validity window |
| `offer_headline` | string | Displayed headline |
| `schema_type` | enum: Event / Offer | JSON-LD schema type |
| `blocks` | discriminated union array | Page-builder blocks |

Campaign blocks use Zod `discriminatedUnion` on `type`:
- `hero_banner` — headline, sub, image, CTA
- `countdown_timer` — deadline date/time
- `product_grid` — array of product slugs to feature
- `rich_text` — HTML content string
- `cta_banner` — headline, button label, WhatsApp link

---

## Sample Product MD Structure

```
src/content/products/
└── print/
    └── visiting-cards/
        ├── dubai-300gsm-gloss.md   ← sku VC-DXB-300G, AED 49
        └── dubai-300gsm-matt.md    ← sku VC-DXB-300M, AED 55
```

URL pattern (resolved in Step 3): `/print/visiting-cards/dubai-300gsm-gloss`

Both files include:
- 4 FAQ items (renders JSON-LD FAQPage)
- 4 geo-tagged entities with Wikidata IDs (Q612 = Dubai, Q878 = UAE)
- 4-item breadcrumb chain
- Full schema.org Product offers block with AggregateRating
- `speakable_css_selectors` for AI voice / featured snippets
- `content_intent: "commercial"` for conversion-focused pages

---

## Design Decisions

| Decision | Rationale |
|---|---|
| `page_slug` instead of `slug` | `slug` is a reserved field in Astro v5 Content Layer — renamed to avoid silent stripping before Zod validation |
| Zod `.refine()` for cross-field rules | Catches arabic/hreflang inconsistencies at build time, not runtime |
| `description` max 160 chars enforced | Hard build failure on SEO meta that would be truncated in SERPs |
| Campaigns collection empty at seed | Campaigns are Step 9 concern — directory scaffolded to satisfy glob-loader |
| Entities with Wikidata IDs | Feeds AI knowledge graph disambiguation (Gemini/ChatGPT entity recognition) |

---

## Next Step

**Step 3** ([Issue #4](https://github.com/alamdxbre-pixel/pseo-website/issues/4)) — Dynamic product page route  
`src/pages/[category]/[product]/[slug].astro` with `getStaticPaths()` reading the products collection.  
Generates one HTML page per published MD: `/print/visiting-cards/dubai-300gsm-gloss`.
