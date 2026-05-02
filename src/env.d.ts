// src/env.d.ts — Astro environment variable types
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL: string;
  readonly PUBLIC_GA4_ID: string;
  readonly PUBLIC_CLARITY_ID: string;
  readonly ENABLE_ARABIC: string;
  readonly WHATSAPP_NUMBER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
