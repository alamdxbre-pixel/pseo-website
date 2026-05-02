import { describe, it, expect } from 'vitest';
import { buildWhatsAppLink, buildProductWhatsAppLink } from '../lib/utils';

describe('buildWhatsAppLink', () => {
  it('returns a valid wa.me URL', () => {
    const url = buildWhatsAppLink('971500000000', 'Hello');
    expect(url).toBe('https://wa.me/971500000000?text=Hello');
  });

  it('URL-encodes spaces', () => {
    const url = buildWhatsAppLink('971500000000', 'Hello World');
    expect(url).toContain('Hello%20World');
  });

  it('URL-encodes special characters: apostrophe, slash, ampersand', () => {
    const url = buildWhatsAppLink('971500000000', "It's a test & more / here");
    // encodeURIComponent encodes & and / but preserves apostrophe (RFC 3986 unreserved)
    expect(url).toContain('%26'); // & encoded
    expect(url).toContain('%2F'); // / encoded
    expect(url).not.toContain('&');  // raw & must not appear in query value
    expect(url).not.toContain(' ');  // spaces must be encoded
    // apostrophe is a valid unreserved char — URL is still parseable
    expect(() => new URL(url)).not.toThrow();
  });
});

describe('buildProductWhatsAppLink', () => {
  it('builds a quote request URL with all fields', () => {
    const url = buildProductWhatsAppLink({
      product: 'Visiting Cards 300GSM Gloss',
      variant: 'Gloss',
      city: 'Dubai',
      phoneNumber: '971500000000',
    });
    expect(url).toMatch(/^https:\/\/wa\.me\/971500000000\?text=/);
    expect(decodeURIComponent(url)).toContain('Visiting Cards 300GSM Gloss');
    expect(decodeURIComponent(url)).toContain('(Gloss)');
    expect(decodeURIComponent(url)).toContain('Dubai');
    expect(decodeURIComponent(url)).toContain('quote');
  });

  it('omits variant part when variant is undefined', () => {
    const url = buildProductWhatsAppLink({
      product: 'Banner Print',
      city: 'Abu Dhabi',
      phoneNumber: '971500000000',
    });
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain('Banner Print');
    expect(decoded).not.toContain('undefined');
    expect(decoded).not.toMatch(/\(\)/); // no empty parens
  });

  it('handles special characters in product name', () => {
    const url = buildProductWhatsAppLink({
      product: "Men's T-Shirt & Cap Set",
      city: 'Sharjah',
      phoneNumber: '971500000000',
    });
    const queryPart = url.split('?text=')[1];
    // & must be encoded — raw & would break query string parsing
    expect(queryPart).not.toContain('&');
    expect(queryPart).toContain('%26');
    // Decoded version should restore original text
    expect(decodeURIComponent(queryPart)).toContain("Men's T-Shirt & Cap Set");
    // URL must be parseable
    expect(() => new URL(url)).not.toThrow();
  });

  it('produces a URL that is parseable', () => {
    const url = buildProductWhatsAppLink({
      product: 'Visiting Cards',
      city: 'Dubai',
      phoneNumber: '971500000000',
    });
    expect(() => new URL(url)).not.toThrow();
  });
});
