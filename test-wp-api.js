// Test script for WordPress API - Run this in browser console when dev server is running
// To test: npm run dev, then open http://localhost:4321 and paste this in browser console

const testWordPressAPI = () => {
  const wpBase = import.meta.env.PUBLIC_WP_BASE;
  
  if (!wpBase) {
    console.warn('❌ PUBLIC_WP_BASE not configured. Current value:', wpBase);
    console.info('ℹ️  To test with real WordPress data:');
    console.info('1. Create/edit .env file in project root');
    console.info('2. Add: PUBLIC_WP_BASE=https://your-wordpress-site.com/wp-json/wp/v2');
    console.info('3. Restart dev server (Ctrl+C and npm run dev)');
    return;
  }
  
  console.log('🔍 Testing WordPress API:', wpBase);
  
  fetch(`${wpBase}/posts?_embed&per_page=1&page=1&status=publish`)
    .then(r => {
      console.log('📊 X-WP-TotalPages:', r.headers.get('X-WP-TotalPages'));
      return r.json();
    })
    .then(posts => {
      if (posts.length > 0) {
        const post = posts[0];
        console.log('✅ WordPress API working!');
        console.log('📝 Post title:', post.title?.rendered);
        console.log('🖼️  Featured image:', post._embedded?.['wp:featuredmedia']?.[0]?.source_url);
        console.log('👤 Author:', post._embedded?.author?.[0]?.name);
        console.log('🏷️  Categories:', post._embedded?.['wp:term']?.[0]?.map(t => t.name));
      } else {
        console.warn('⚠️  No posts found');
      }
    })
    .catch(e => {
      console.error('❌ WordPress API error:', e);
      console.info('💡 Common issues:');
      console.info('- CORS: WordPress might block requests from localhost');
      console.info('- URL: Check if PUBLIC_WP_BASE URL is correct');
      console.info('- Network: Check if WordPress site is accessible');
    });
};

// Run the test
testWordPressAPI();
