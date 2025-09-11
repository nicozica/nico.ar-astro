// Client-side pagination handler
function initializePagination() {
  // Check if we're on the homepage and handle page parameter
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const requestedPage = parseInt(urlParams.get('page') || '1', 10);
    
    // If we're on page 1, remove the page parameter from URL
    if (requestedPage === 1 && urlParams.has('page')) {
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
    
    // If requesting a page other than 1, we need to load that page's content
    if (requestedPage > 1) {
      loadPage(requestedPage);
    }
  }
}

async function loadPage(page) {
  try {
    // Show loading state
    const postsContainer = document.querySelector('.posts-grid');
    
    if (postsContainer) {
      postsContainer.style.opacity = '0.5';
    }
    
    // Fetch posts data (this would need to be implemented with your WordPress API)
    // For now, we'll just update the URL and reload
    const newUrl = page === 1 ? '/' : `/?page=${page}`;
    window.location.href = newUrl;
    
  } catch {
    // Fallback: just navigate to the URL
    window.location.href = page === 1 ? '/' : `/?page=${page}`;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePagination);
