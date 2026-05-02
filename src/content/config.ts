import { defineCollection, z } from 'astro:content';

// ── Shared sub-schemas ────────────────────────────────────────────────────────

const robotsSchema = z.object({
  index: z.boolean().default(true),
  follow: z.boolean().default(true),
  /** -1 = unlimited. Positive integer = character limit. */
  max_snippet: z.union([z.literal(-1), z.number().int().positive()]).default(-1),
  max_image_preview: z.enum(['none', 'standard', 'large']).default('large'),
  max_video_preview: z.union([z.literal(-1), z.number().int().nonnegative()]).default(-1),
});

const sitemapSchema = z.object({
  priority: z.number().min(0).max(1).default(0.7),
  changefreq: z
    .enum(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'])
    .default('weekly'),
});

const ogSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  image_width: z.number().int().positive().default(1200),
  image_height: z.number().int().positive().default(630),
  type: z.enum(['website', 'product', 'article']).default('product'),
});

const geoSchema = z.object({
  /** ISO 3166-2 e.g. "AE-DU" for Dubai */
  region: z.string(),
  placename: z.string(),
  /** Semicolon-separated lat;lon e.g. "25.2048;55.2708" */
  position: z.string().regex(/^-?\d+(\.\d+)?;-?\d+(\.\d+)?$/, {
    message: 'geo.position must be "lat;lon" e.g. "25.2048;55.2708"',
  }),
  /** Comma-separated lat, lon for ICBM meta tag */
  icbm: z.string().regex(/^-?\d+(\.\d+)?, -?\d+(\.\d+)?$/, {
    message: 'geo.icbm must be "lat, lon" e.g. "25.2048, 55.2708"',
  }),
});

const heroSchema = z.object({
  headline: z.string(),
  subline: z.string(),
  cta_primary: z.string().default('Get an Instant Quote'),
  cta_secondary: z.string().default('View Samples'),
});

const productDetailsSchema = z.object({
  city: z.string(),
  variant: z.string().optional(),
  sku: z.string().optional(),
  price_from: z.number().positive(),
  currency: z.string().default('AED'),
  turnaround: z.string(),
  availability: z.enum(['InStock', 'OutOfStock', 'PreOrder']).default('InStock'),
  min_quantity: z.number().int().positive().optional(),
});

const schemaOrgSchema = z.object({
  type: z.enum(['Product', 'Service', 'LocalBusiness']).default('Product'),
  aggregate_rating: z
    .object({
      rating_value: z.number().min(1).max(5),
      review_count: z.number().int().positive(),
      best_rating: z.number().default(5),
    })
    .optional(),
  offers: z
    .object({
      price: z.number().positive(),
      price_currency: z.string().default('AED'),
      availability: z.string().default('https://schema.org/InStock'),
      /** ISO 8601 date — keeps offer schema valid in rich results */
      valid_through: z.string().optional(),
    })
    .optional(),
});

const breadcrumbItemSchema = z.object({
  label: z.string(),
  url: z.string(),
});

const faqItemSchema = z.object({
  q: z.string(),
  a: z.string(),
});

const entitySchema = z.object({
  name: z.string(),
  type: z.string(),
  /** Wikidata Q-identifier for knowledge graph alignment e.g. "Q612" */
  wikidata: z.string().optional(),
});

const eeatSchema = z.object({
  years_in_business: z.number().int().nonnegative().optional(),
  certifications: z.array(z.string()).default([]),
  trust_badges: z.array(z.string()).default([]),
});

// ── Products collection ───────────────────────────────────────────────────────

const productsCollection = defineCollection({
  type: 'content',
  schema: z
    .object({
      // ── Routing & Lifecycle ───────────────────────────────────────────────
      /** URL slug segment — renamed from 'slug' to avoid Astro v5 reserved field */
      page_slug: z.string().min(1),
      category: z.string().min(1),
      product: z.string().min(1),
      lang: z.enum(['en', 'ar']).default('en'),
      /** Slug of the paired Arabic/English page. Only set when arabic_ready: true */
      hreflang_pair: z.string().optional(),
      published: z.boolean().default(true),
      arabic_ready: z.boolean().default(false),
      /** ISO 8601 date */
      date_published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'date_published must be YYYY-MM-DD',
      }),
      /** ISO 8601 date — must not be before date_published */
      date_modified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'date_modified must be YYYY-MM-DD',
      }),

      // ── SEO Core ─────────────────────────────────────────────────────────
      title: z.string().min(10).max(70),
      description: z.string().min(50).max(160),
      canonical: z.string().startsWith('/'),
      robots: robotsSchema.default({}),
      sitemap: sitemapSchema.default({}),

      // ── Social / OG ──────────────────────────────────────────────────────
      og: ogSchema,

      // ── Geo Targeting ────────────────────────────────────────────────────
      geo: geoSchema,

      // ── Page UI Content ──────────────────────────────────────────────────
      hero: heroSchema,
      product_details: productDetailsSchema,

      // ── Structured Data (Schema.org JSON-LD) ─────────────────────────────
      schema: schemaOrgSchema.default({}),
      breadcrumb: z.array(breadcrumbItemSchema).min(1),

      // ── AI Search Layer ──────────────────────────────────────────────────
      faq: z.array(faqItemSchema).min(1),
      entities: z.array(entitySchema).default([]),
      speakable_css_selectors: z.array(z.string()).default(['.hero-headline', '.product-summary', '.faq-section']),
      content_intent: z
        .enum(['informational', 'transactional', 'commercial'])
        .default('transactional'),

      // ── E-E-A-T Signals ──────────────────────────────────────────────────
      eeat: eeatSchema.default({}),

      // ── Internal Linking (PageRank distribution) ──────────────────────────
      related: z.array(z.string()).default([]),

      // ── Campaign Tagging ─────────────────────────────────────────────────
      campaign: z.array(z.string()).default([]),
    })
    .refine(
      (data) => {
        // date_modified must not be earlier than date_published
        return data.date_modified >= data.date_published;
      },
      {
        message: 'date_modified must not be before date_published',
        path: ['date_modified'],
      }
    )
    .refine(
      (data) => {
        // hreflang_pair only makes sense when arabic_ready is true
        if (data.hreflang_pair && !data.arabic_ready) {
          return false;
        }
        return true;
      },
      {
        message: 'hreflang_pair requires arabic_ready: true',
        path: ['hreflang_pair'],
      }
    ),
});

// ── Categories collection ─────────────────────────────────────────────────────

const categoriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Optional override — defaults to filename if omitted */
    slug: z.string().optional(),
    icon: z.string().optional(),
    nav_label: z.string(),
    og: ogSchema.partial(),
    published: z.boolean().default(true),
  }),
});

// ── Pages collection (static pages: home, about, contact, portfolio) ──────────

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(10).max(70),
    description: z.string().min(50).max(160),
    canonical: z.string().startsWith('/'),
    og: ogSchema.partial(),
    robots: robotsSchema.default({}),
    published: z.boolean().default(true),
    date_modified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
});

// ── Campaigns collection (Step 9) ─────────────────────────────────────────────

const campaignBlockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('hero_banner'),
    headline: z.string(),
    subline: z.string().optional(),
    image: z.string().optional(),
    cta: z.string().optional(),
    cta_url: z.string().optional(),
  }),
  z.object({
    type: z.literal('countdown_timer'),
    end_date: z.string(), // ISO 8601 datetime
    label: z.string().optional(),
  }),
  z.object({
    type: z.literal('product_grid'),
    tag: z.string().optional(),
    featured_slugs: z.array(z.string()).optional(),
    columns: z.number().int().min(1).max(4).default(3),
    max_items: z.number().int().positive().default(12),
  }),
  z.object({
    type: z.literal('rich_text'),
    content: z.string(),
  }),
  z.object({
    type: z.literal('cta_banner'),
    headline: z.string(),
    button: z.string(),
    url: z.string(),
    background_color: z.string().optional(),
  }),
]);

const campaignsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    page_slug: z.string(),
    status: z.enum(['scheduled', 'active', 'expired']).default('scheduled'),
    valid_from: z.string().regex(/^\d{4}-\d{2}-\d{2}/),
    valid_through: z.string().regex(/^\d{4}-\d{2}-\d{2}/),
    offer_headline: z.string().optional(),
    hero_image: z.string().optional(),
    og: ogSchema.partial().optional(),
    schema_type: z.enum(['Event', 'Offer']).default('Offer'),
    published: z.boolean().default(true),
    campaign_tag: z.string(), // matches product `campaign` array entries
    blocks: z.array(campaignBlockSchema).default([]),
  }),
});

// ── Export all collections ────────────────────────────────────────────────────

export const collections = {
  products: productsCollection,
  categories: categoriesCollection,
  pages: pagesCollection,
  campaigns: campaignsCollection,
};
