// SSG robots.txt — generated at build time so SITE_URL env var is baked in.
// Explicitly lists all major AI crawlers for maximum GEO/AEO visibility.
export const prerender = true;

export async function GET() {
  const siteUrl = (import.meta.env.SITE ?? 'https://yoursite.com').replace(/\/$/, '');

  const body = [
    '# ── Default rule ────────────────────────────────────────────────────────────',
    'User-agent: *',
    'Allow: /',
    '',
    '# ── AI search crawlers — explicit allowlist for GEO / AEO visibility ────────',
    '',
    '# OpenAI (ChatGPT browsing + SearchGPT)',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    '',
    '# Anthropic Claude',
    'User-agent: Claude-Web',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    '# Google AI Overview / Gemini',
    'User-agent: Google-Extended',
    'Allow: /',
    '',
    '# Perplexity AI',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    '# Bing / Copilot',
    'User-agent: Bingbot',
    'Allow: /',
    '',
    '# ── Search engine crawlers ───────────────────────────────────────────────────',
    '',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: Googlebot-Image',
    'Allow: /',
    '',
    '# ── Sitemap ──────────────────────────────────────────────────────────────────',
    '',
    `Sitemap: ${siteUrl}/sitemap-index.xml`,
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
