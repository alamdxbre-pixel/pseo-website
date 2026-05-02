/**
 * pages-seed.mjs — Seed data for bulk page generation.
 *
 * Structure:
 *   products[]  — product type definitions with shared metadata
 *   cities[]    — GCC/UAE city definitions with geo coordinates
 *
 * generate-pages.mjs cross-joins each product × city × variant to produce
 * one MD file per combination in src/content/products/{category}/{product}/.
 */

export const cities = [
  {
    name: 'Dubai',
    slug: 'dubai',
    region: 'AE-DU',
    position: '25.2048;55.2708',
    icbm: '25.2048, 55.2708',
    turnaround: '24–48 hours',
    wikidata: 'Q612',
  },
  {
    name: 'Abu Dhabi',
    slug: 'abu-dhabi',
    region: 'AE-AZ',
    position: '24.4539;54.3773',
    icbm: '24.4539, 54.3773',
    turnaround: '24–48 hours',
    wikidata: 'Q3392',
  },
  {
    name: 'Sharjah',
    slug: 'sharjah',
    region: 'AE-SH',
    position: '25.3462;55.4209',
    icbm: '25.3462, 55.4209',
    turnaround: '48–72 hours',
    wikidata: 'Q131491',
  },
  {
    name: 'Ajman',
    slug: 'ajman',
    region: 'AE-AJ',
    position: '25.4052;55.5136',
    icbm: '25.4052, 55.5136',
    turnaround: '48–72 hours',
    wikidata: 'Q131489',
  },
];

export const products = [
  {
    category: 'print',
    product: 'visiting-cards',
    displayName: 'Visiting Cards',
    currency: 'AED',
    minQuantity: 100,
    availability: 'InStock',
    yearsInBusiness: 10,
    certifications: ['ISO 9001', 'Dubai Chamber Member'],
    trustBadges: ['5-star Google Reviews', 'Same-day Delivery'],
    variants: [
      {
        name: '300GSM Gloss',
        slug: '300gsm-gloss',
        skuPrefix: 'VC',
        skuSuffix: '300G',
        priceFrom: 49,
        description: '300GSM stock · Full-colour CMYK · Same-day dispatch available',
        finish: 'Gloss finish gives a shiny, vibrant surface that makes colours pop.',
        ratingValue: 4.9,
        reviewCount: 214,
      },
      {
        name: '300GSM Matt',
        slug: '300gsm-matt',
        skuPrefix: 'VC',
        skuSuffix: '300M',
        priceFrom: 49,
        description: '300GSM stock · Full-colour CMYK · Elegant matte finish',
        finish: 'Matt finish offers a premium, non-reflective surface with a soft feel.',
        ratingValue: 4.8,
        reviewCount: 187,
      },
      {
        name: '400GSM Soft Touch',
        slug: '400gsm-soft-touch',
        skuPrefix: 'VC',
        skuSuffix: '400ST',
        priceFrom: 79,
        description: '400GSM ultra-thick · Soft-touch lamination · Premium executive cards',
        finish: 'Soft-touch lamination creates a velvety, luxurious feel.',
        ratingValue: 4.9,
        reviewCount: 143,
      },
    ],
    faqBase: [
      {
        q: 'How fast can I get visiting cards printed in {city}?',
        a: 'We offer {turnaround} turnaround, with same-day dispatch for orders placed before 12pm.',
      },
      {
        q: 'What is the minimum order for visiting cards in {city}?',
        a: 'Minimum is 100 cards. Bulk discounts apply from 500 cards.',
      },
      {
        q: 'Do you deliver visiting cards across UAE?',
        a: 'Yes — all emirates including Dubai, Abu Dhabi, Sharjah, Ajman, RAK, and Fujairah.',
      },
      {
        q: 'What is {variant} finish?',
        a: '{finish}',
      },
    ],
  },
  {
    category: 'print',
    product: 'flyers',
    displayName: 'Flyers',
    currency: 'AED',
    minQuantity: 250,
    availability: 'InStock',
    yearsInBusiness: 10,
    certifications: ['ISO 9001', 'Dubai Chamber Member'],
    trustBadges: ['5-star Google Reviews', 'Fast Turnaround'],
    variants: [
      {
        name: 'A5 Gloss',
        slug: 'a5-gloss',
        skuPrefix: 'FL',
        skuSuffix: 'A5G',
        priceFrom: 89,
        description: 'A5 size · 150GSM gloss paper · Vivid full-colour print',
        finish: 'Gloss coating enhances colour vibrancy for eye-catching promotions.',
        ratingValue: 4.8,
        reviewCount: 132,
      },
      {
        name: 'A4 Gloss',
        slug: 'a4-gloss',
        skuPrefix: 'FL',
        skuSuffix: 'A4G',
        priceFrom: 129,
        description: 'A4 size · 150GSM gloss paper · Vivid full-colour print',
        finish: 'Larger format for maximum visual impact at exhibitions and events.',
        ratingValue: 4.7,
        reviewCount: 98,
      },
    ],
    faqBase: [
      {
        q: 'How fast can I get flyers printed in {city}?',
        a: 'We offer {turnaround} turnaround for flyer printing in {city}.',
      },
      {
        q: 'What is the minimum order quantity for flyers?',
        a: 'Minimum is 250 flyers. Volume pricing is available from 500 units.',
      },
      {
        q: 'Can I get custom flyer designs?',
        a: 'Yes — our in-house design team can create a custom flyer from your brief. Design turnaround is 1 business day.',
      },
      {
        q: 'Do you deliver flyers across the UAE?',
        a: 'Yes — we deliver to all UAE emirates, typically within {turnaround} from print completion.',
      },
    ],
  },
];
