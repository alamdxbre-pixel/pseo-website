/**
 * analytics.ts — lightweight GA4 event helpers.
 *
 * Events are pushed to window.dataLayer. Partytown (configured with
 * forward: ['dataLayer.push']) forwards them to the GA4 worker thread,
 * keeping the main thread free.
 *
 * All functions are no-ops during SSR (typeof window === 'undefined').
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

function pushEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: eventName, ...params });
}

/** Fire when a visitor clicks any WhatsApp link or the sticky WhatsApp bar. */
export function trackWhatsAppClick(context: {
  product?: string;
  variant?: string;
  city?: string;
}): void {
  pushEvent('whatsapp_click', {
    event_category: 'engagement',
    wa_product: context.product ?? 'generic',
    wa_variant: context.variant ?? undefined,
    wa_city: context.city ?? undefined,
  });
}

/** Fire when a visitor clicks a CTA button (campaign CtaBanner or hero CTAs). */
export function trackCtaClick(context: {
  label: string;
  destination: string;
}): void {
  pushEvent('cta_click', {
    event_category: 'engagement',
    cta_label: context.label,
    cta_destination: context.destination,
  });
}

/**
 * GA4 enhanced-ecommerce view_item event.
 * Fire once when a product detail page becomes visible.
 */
export function trackViewItem(context: {
  item_id: string;
  item_name: string;
  item_category?: string;
  price?: number;
  currency?: string;
}): void {
  pushEvent('view_item', {
    event_category: 'ecommerce',
    currency: context.currency ?? 'AED',
    value: context.price ?? 0,
    items: [
      {
        item_id: context.item_id,
        item_name: context.item_name,
        item_category: context.item_category,
        price: context.price ?? 0,
        currency: context.currency ?? 'AED',
      },
    ],
  });
}
