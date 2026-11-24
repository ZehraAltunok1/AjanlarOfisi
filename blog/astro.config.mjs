import { defineConfig } from 'astro/config';

export default defineConfig({
  // Real domain is set when the site moves to Vercel (ADR-005).
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  trailingSlash: 'ignore',
});
