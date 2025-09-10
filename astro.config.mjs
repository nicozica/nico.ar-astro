// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  srcDir: 'src',
  integrations: [],
  output: 'server', // Enable server-side rendering for dynamic pages
  adapter: node({
    mode: 'standalone'
  }),
});
