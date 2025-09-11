/**
 * Decode HTML entities in text strings
 * Useful for WordPress titles that may contain &amp;, &lt;, etc.
 */
export function decodeEntities(str: string): string {
  // Server-side fallback - basic entity replacement
  if (typeof document === 'undefined') {
    return str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
      .replace(/&#x60;/g, '`')
      .replace(/&#x3D;/g, '=');
  }
  
  // Client-side - use textarea element for full entity decoding
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}
