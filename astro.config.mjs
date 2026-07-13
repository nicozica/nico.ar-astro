// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nico.ar', // Required for Open Graph URLs
  srcDir: 'src',
  integrations: [],
  output: 'static', // Static site generation for better performance
  trailingSlash: 'ignore', // Flexible trailing slash handling
  // Astro 7 defaults this to 'jsx', which drops the whitespace before an inline
  // element on the next line ("born in <a>Salto</a>" renders as "born inSalto").
  // Keep HTML whitespace rules so prose reads as written.
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto', // Inline critical CSS automatically
  },
  vite: {
    build: {
      cssCodeSplit: false, // Bundle all CSS for better caching
    }
  }
});
