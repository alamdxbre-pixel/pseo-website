import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: import.meta.env.SITE_URL || 'https://yoursite.com',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),

    partytown({
      config: {
        // Forward GA4 dataLayer calls from the web worker
        forward: ['dataLayer.push'],
      },
    }),

    sitemap({
      // Custom sitemap entries controlled per-page via frontmatter in Step 11
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
