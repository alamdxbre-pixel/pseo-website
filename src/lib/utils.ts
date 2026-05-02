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
 * Build a pre-filled WhatsApp wa.me deep link.
 * Moved to dedicated utility in Step 8 — this is the base version.
 */
export function buildWhatsAppLink(
  phoneNumber: string,
  message: string
): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}
