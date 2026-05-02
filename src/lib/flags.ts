/**
 * Feature flags — flip these to switch UI variants at build time.
 */

/** true → photo background cards  |  false → SVG icon cards */
export const CATEGORY_PHOTO_CARDS = true;

/** true → animated typewriter product ticker above stats numbers  |  false → static stats only */
export const STATS_TYPEWRITER = true;

/** true → horizontal arrow flow diagram  |  false → numbered card blocks */
export const HOW_IT_WORKS_FLOW = true;

/** true → print technology showcase  |  false → client testimonials */
export const TECH_SHOWCASE = true;

/** true → "UAE's Trusted" highlighted white+bold in hero badge  |  false → uniform teal */
export const HERO_BADGE_HIGHLIGHT = true;

/** true → city name cycles (Dubai → Abu Dhabi → Sharjah) in hero sub-copy  |  false → static list */
export const HERO_CITY_CYCLE = true;

/**
 * true  → "Browse Products" CTA moves from hero into the ticker/stats band
 *          (hero keeps only the primary WhatsApp CTA; ticker band gets a
 *           "Browse all products →" pill on the trailing edge)
 * false → original layout: both CTAs side-by-side in the hero
 */
export const BROWSE_IN_TICKER = true;

/**
 * true  → hero background is a large commercial printer photo (right-side),
 *          blended seamlessly into the dark charcoal via luminosity blend-mode
 *          + a left-to-right dark gradient. All text/CTAs unchanged.
 * false → original geometric diagonal-line pattern background
 */
export const HERO_PRINTER_BG = true;
