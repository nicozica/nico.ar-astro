/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_WP_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
