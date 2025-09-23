/**
 * Text Clamping Utility
 * Clamps blog post excerpts by words, adding ellipsis when text is truncated.
 * Supports responsive breakpoints and recalculates on resize.
 */

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} The debounced function
 */
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Get the computed line height of an element
 * @param {HTMLElement} element - The element to measure
 * @returns {number} The line height in pixels
 */
function getLineHeight(element) {
  const computedStyle = window.getComputedStyle(element);
  const lineHeight = computedStyle.lineHeight;
  
  // If line-height is "normal" or a unitless number, calculate from font-size
  if (lineHeight === 'normal' || !lineHeight.includes('px')) {
    const fontSize = parseFloat(computedStyle.fontSize);
    return fontSize * 1.3; // Default multiplier for "normal" line-height
  }
  
  return parseFloat(lineHeight);
}

/**
 * Calculate the maximum number of lines that fit in the allowed height
 * @param {HTMLElement} element - The element to measure
 * @param {number} maxLines - The maximum number of lines allowed
 * @returns {number} The calculated max height in pixels
 */
function calculateMaxHeight(element, maxLines) {
  const lineHeight = getLineHeight(element);
  return lineHeight * maxLines;
}

/**
 * Check if the current screen size is large (≥992px, Bootstrap lg breakpoint)
 * @returns {boolean} True if screen is large
 */
function isLargeScreen() {
  return window.innerWidth >= 992;
}

/**
 * Get the appropriate clamp value based on screen size
 * @param {HTMLElement} element - The element with clamp attributes
 * @returns {number} The number of lines to clamp to
 */
function getClampValue(element) {
  const defaultClamp = parseInt(element.dataset.clamp || '3', 10);
  const largeClamp = element.dataset.clampLg;
  
  if (isLargeScreen() && largeClamp) {
    return parseInt(largeClamp, 10);
  }
  
  return defaultClamp;
}

/**
 * Use binary search to find the longest text that fits within the allowed lines
 * @param {HTMLElement} element - The element to measure
 * @param {string[]} words - Array of words from the original text
 * @param {number} maxHeight - Maximum allowed height in pixels
 * @returns {number} The maximum number of words that fit
 */
function findMaxWords(element, words, maxHeight) {
  let left = 0;
  let right = words.length;
  let maxWords = 0;
  
  // Store original content for restoration
  const originalContent = element.textContent;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const testText = words.slice(0, mid).join(' ');
    
    // Set test text and measure height
    element.textContent = testText;
    const currentHeight = element.scrollHeight;
    
    if (currentHeight <= maxHeight) {
      maxWords = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  // Restore original content
  element.textContent = originalContent;
  
  return maxWords;
}

/**
 * Clamp text for a single element
 * @param {HTMLElement} element - The element to clamp
 */
function clampElement(element) {
  // Get or store the original full text
  let fullText = element.dataset.fulltext;
  if (!fullText) {
    fullText = element.textContent.trim();
    element.dataset.fulltext = fullText;
  }
  
  // Get clamp value based on screen size
  const maxLines = getClampValue(element);
  const maxHeight = calculateMaxHeight(element, maxLines);
  
  // Split text into words
  const words = fullText.split(/\s+/).filter(word => word.length > 0);
  
  // If no words, nothing to clamp
  if (words.length === 0) {
    return;
  }
  
  // Set full text temporarily to measure
  element.textContent = fullText;
  
  // If text already fits, no need to clamp
  if (element.scrollHeight <= maxHeight) {
    return;
  }
  
  // Find maximum words that fit
  const maxWords = findMaxWords(element, words, maxHeight);
  
  // If we need to truncate
  if (maxWords < words.length && maxWords > 0) {
    const clampedText = words.slice(0, maxWords).join(' ') + '…';
    element.textContent = clampedText;
  } else if (maxWords === 0) {
    // If even one word doesn't fit, show ellipsis only
    element.textContent = '…';
  }
}

/**
 * Initialize text clamping for all elements with the specified class
 */
function initializeTextClamping() {
  const elements = document.querySelectorAll('.post-excerpt-js');
  
  elements.forEach(element => {
    clampElement(element);
  });
}

/**
 * Recalculate clamping for all elements (used on resize)
 */
function recalculateTextClamping() {
  const elements = document.querySelectorAll('.post-excerpt-js');
  
  elements.forEach(element => {
    // Clear any previous clamping by restoring full text
    const fullText = element.dataset.fulltext;
    if (fullText) {
      element.textContent = fullText;
    }
    
    // Re-clamp with current dimensions
    clampElement(element);
  });
}

// Debounced resize handler
const debouncedRecalculate = debounce(recalculateTextClamping, 250);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTextClamping);

// Recalculate on window resize
window.addEventListener('resize', debouncedRecalculate);

// Export functions for potential external use
window.TextClamp = {
  initialize: initializeTextClamping,
  recalculate: recalculateTextClamping,
  clampElement: clampElement
};