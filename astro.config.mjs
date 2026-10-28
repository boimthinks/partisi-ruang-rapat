// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { rehypeAutoLinks } from './src/plugins/rehype-autolinks.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://partisiruangrapat.web.id',
  output: 'static',
  trailingSlash: 'always',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  markdown: {
    rehypePlugins: [rehypeAutoLinks]
  },
  integrations: [
    sitemap()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
