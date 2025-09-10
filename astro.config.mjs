// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  srcDir: 'src',
  integrations: [],
  output: 'static', // Static site generation for better performance
  trailingSlash: 'ignore', // Flexible trailing slash handling
});
