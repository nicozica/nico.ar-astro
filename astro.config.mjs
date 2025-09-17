// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  srcDir: 'src',
  integrations: [],
  output: 'static', // Static site generation for better performance
  trailingSlash: 'ignore', // Flexible trailing slash handling
  build: {
    inlineStylesheets: 'auto', // Inline critical CSS automatically
  },
  vite: {
    build: {
      cssCodeSplit: false, // Bundle all CSS for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['bootstrap']
          }
        }
      }
    }
  }
});
