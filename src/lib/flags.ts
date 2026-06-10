/**
 * Feature flags — flip these to switch UI variants at build time.
 */

/**
 * Active colour theme — change this number to switch the entire site palette.
 *
 *  0 → Original Teal      (#0D7377)  — main branch baseline
 *  1 → Bold Orange        (#E07020)  — feature/theme-update
 *  2 → Forest Green       (#3A7D40)  — feature/theme-update-2
 *  3 → Burnt Amber        (#C8693A)  — feature/theme-update-3
 *  4 → Sandy Gold         (#C9A66B)  — feature/theme-update-4  ← current
 *
 * All themes share Deep Navy (#0B1F3B) as the dark structural colour (themes 1-4).
 * Theme 0 uses the original Charcoal (#1C2028) as dark colour.
 */
export const ACTIVE_THEME = 1 as 0 | 1 | 2 | 3 | 4;

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

/** true → show Campaigns section in navigation  |  false → hide Campaigns */
export const SHOW_CAMPAIGNS = false;

/** true → show Services section in navigation  |  false → hide Services */
export const SHOW_SERVICES = false;
