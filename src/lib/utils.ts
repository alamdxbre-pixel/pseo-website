import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind class names safely, resolving conflicts.
 * Used by all shadcn/ui components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price value with currency for display.
 */
export function formatPrice(amount: number, currency = 'AED'): string {
  return `${currency} ${amount.toLocaleString('en-AE')}`;
}

/**
 * Build a pre-filled WhatsApp wa.me deep link from raw message text.
 * Handles all special characters via encodeURIComponent.
 */
export function buildWhatsAppLink(
  phoneNumber: string,
  message: string
): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}

/**
 * Build a product-specific WhatsApp quote request deep link.
 *
 * @example
 * buildProductWhatsAppLink({
 *   product: "Visiting Cards 300GSM Gloss",
 *   variant: "Gloss",
 *   city: "Dubai",
 *   phoneNumber: "971500000000",
 * })
 * // => "https://wa.me/971500000000?text=Hi%2C%20I%27d%20like%20..."
 */
export interface ProductWhatsAppParams {
  product: string;
  city: string;
  phoneNumber: string;
  variant?: string;
}

export function buildProductWhatsAppLink({
  product,
  city,
  phoneNumber,
  variant,
}: ProductWhatsAppParams): string {
  const variantPart = variant ? ` (${variant})` : '';
  const message =
    `Hi, I'd like to get a quote for: ${product}${variantPart} — ${city}. ` +
    `Please share pricing and turnaround time. Thank you!`;
  return buildWhatsAppLink(phoneNumber, message);
}
