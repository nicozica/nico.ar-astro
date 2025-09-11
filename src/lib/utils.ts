// Utility functions for the blog

/**
 * Format date in English format for meta information
 * @param dateStr ISO date string
 * @returns Formatted date like "Apr 30, 2025"
 */
export function formatDateEn(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric', 
    year: 'numeric'
  });
}

/**
 * Strip HTML tags from text
 * @param html HTML string
 * @returns Plain text
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&[^;]+;/g, ' ') // Replace HTML entities with spaces
    .replace(/\s+/g, ' ') // Collapse whitespace
    .trim();
}

/**
 * Compute reading time from content
 * @param content HTML or plain text content
 * @returns Reading time in minutes
 */
export function computeReadingTime(content: string): number {
  const plainText = stripHtml(content);
  const words = plainText.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.round(words / 200)); // 200 words per minute
}

/**
 * Get clean excerpt from text with proper truncation
 * @param text Source text (HTML or plain)
 * @param maxChars Maximum characters (default: 180)
 * @returns Clean excerpt with ellipsis if truncated
 */
export function getExcerpt(text: string, maxChars: number = 180): string {
  const plainText = stripHtml(text);
  
  if (plainText.length <= maxChars) {
    return plainText;
  }
  
  // Find the last complete word within the limit
  const truncated = plainText.substring(0, maxChars);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex === -1) {
    // No spaces found, just truncate
    return truncated + '…';
  }
  
  return truncated.substring(0, lastSpaceIndex) + '…';
}
