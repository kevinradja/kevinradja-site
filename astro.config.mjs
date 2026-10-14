import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://kevinradja-site.vercel.app',
  trailingSlash: 'always',
  i18n: { defaultLocale: 'fr', locales: ['fr', 'en'], routing: { prefixDefaultLocale: false } },
});
