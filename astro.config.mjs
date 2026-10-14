import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://kevinradja-site.vercel.app',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap({ filter: (page) => !/\/portfolio\/|\/404/.test(page), i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-US' } } })],
  i18n: { defaultLocale: 'fr', locales: ['fr', 'en'], routing: { prefixDefaultLocale: false } },
});
