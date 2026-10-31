import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [preact()],
  base: process.env.SITE_BASE || '/',
  trailingSlash: 'always',
});