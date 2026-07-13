// URL normalization for WordPress-authored content.
//
// WordPress runs on a backend host (wp.nico.ar) while the site is published on
// nico.ar. Editors linking between posts inside WordPress produce backend URLs,
// which must never reach the published HTML.
//
// Only <a href> is rewritten. Media keeps pointing at WordPress on purpose: the
// public site does not serve /wp-content/, so rewriting an image host would
// break the image.

/** Origin the site is published on. */
export const PUBLIC_ORIGIN = 'https://nico.ar';

/** Hosts that already are the public site. */
const PUBLIC_HOSTS = new Set(['nico.ar', 'www.nico.ar']);

/** Paths only WordPress can serve: uploads, admin, API. Never rewritten. */
const WP_RESERVED_PREFIXES = [
  '/wp-content/',
  '/wp-admin/',
  '/wp-includes/',
  '/wp-json/',
  '/wp-login.php',
];

/** Route a post is published under. Trailing slash is the canonical form. */
export function postPath(slug: string): string {
  return `/posts/${slug}/`;
}

/**
 * Derive the WordPress origin from the REST base URL, so the backend host is
 * configured in one place (PUBLIC_WP_BASE) instead of hardcoded here.
 */
export function getWpOrigin(wpBase: string | undefined): string | null {
  if (!wpBase) return null;
  try {
    return new URL(wpBase).origin;
  } catch {
    return null;
  }
}

/** The post slug a URL path refers to, for both /<slug>/ and /posts/<slug>/. */
function slugFromPath(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 1) return segments[0];
  if (segments.length === 2 && segments[0] === 'posts') return segments[1];
  return null;
}

interface RewriteContext {
  /** Slugs published by WordPress, used to confirm a link has a local route. */
  knownSlugs: ReadonlySet<string>;
  /** Origin of the WordPress backend, or null when it is not configured. */
  wpOrigin: string | null;
  /** Called for backend links with no known public equivalent. */
  onUnmapped?: (href: string) => void;
}

function rewriteHref(href: string, ctx: RewriteContext): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href; // Relative, mailto:, #anchor — already fine.
  }

  const isBackend = ctx.wpOrigin !== null && url.origin === ctx.wpOrigin;
  const isPublic = PUBLIC_HOSTS.has(url.hostname);
  if (!isBackend && !isPublic) return href; // External link.

  // Uploads and admin routes exist only on WordPress.
  if (WP_RESERVED_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
    return href;
  }

  const slug = slugFromPath(url.pathname);
  if (slug !== null && ctx.knownSlugs.has(slug)) {
    return `${postPath(slug)}${url.search}${url.hash}`;
  }

  // A backend URL we cannot map to a local route: keep the path but move it off
  // the backend host, and report it so the link can be checked by hand.
  if (isBackend) {
    ctx.onUnmapped?.(href);
    return `${PUBLIC_ORIGIN}${url.pathname}${url.search}${url.hash}`;
  }

  // Public host, no local route (e.g. /about-me): already correct, leave it.
  return href;
}

/**
 * Rewrite internal links in a WordPress HTML fragment.
 *
 * Matches href attributes inside <a> tags only, so img src/srcset are left
 * untouched.
 */
export function normalizeContentLinks(html: string, ctx: RewriteContext): string {
  return html.replace(/<a\s[^>]*>/gi, (tag) =>
    tag.replace(/href="([^"]*)"/i, (_match, href: string) => `href="${rewriteHref(href, ctx)}"`),
  );
}
