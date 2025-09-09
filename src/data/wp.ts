export const WP_BASE = import.meta.env.PUBLIC_WP_BASE; // e.g. https://example.com/wp-json/wp/v2

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  categories?: number[];
  featured_media?: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
      }>
    >;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export async function getPosts(page = 1, perPage = 10): Promise<WPPost[]> {
  if (!WP_BASE) {
    // Return mock data for development
    return getMockPosts();
  }

  try {
    const res = await fetch(
      `${WP_BASE}/posts?page=${page}&per_page=${perPage}&_embed`
    );
    if (!res.ok) throw new Error(`WP posts failed: ${res.status}`);
    return res.json();
  } catch (error) {
    console.warn('WordPress API not available, using mock data:', error);
    return getMockPosts();
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!WP_BASE) {
    // Return mock data for development
    return getMockPostBySlug(slug);
  }

  try {
    const res = await fetch(`${WP_BASE}/posts?slug=${slug}&_embed`);
    if (!res.ok) throw new Error(`WP post failed: ${res.status}`);
    const arr = await res.json();
    return arr[0] || null;
  } catch (error) {
    console.warn('WordPress API not available, using mock data:', error);
    return getMockPostBySlug(slug);
  }
}

export async function getCategories(): Promise<WPCategory[]> {
  if (!WP_BASE) {
    return getMockCategories();
  }

  try {
    const res = await fetch(`${WP_BASE}/categories`);
    if (!res.ok) throw new Error(`WP categories failed: ${res.status}`);
    return res.json();
  } catch (error) {
    console.warn('WordPress API not available, using mock data:', error);
    return getMockCategories();
  }
}

// Mock data for development
function getMockPosts(): WPPost[] {
  return [
    {
      id: 1,
      slug: 'rethinking-mfa-user-sends-code',
      date: '2024-06-15T10:00:00',
      title: {
        rendered: 'Rethinking MFA: What Happens When the User Sends the Code',
      },
      excerpt: {
        rendered:
          'Traditional Multi-Factor Authentication (MFA) methods, such as SMS-based One-Time Passwords (OTPs), incur significant costs and may present...',
      },
      content: {
        rendered:
          '<p>Traditional Multi-Factor Authentication (MFA) methods, such as SMS-based One-Time Passwords (OTPs), incur significant costs and may present security vulnerabilities.</p><p>In this article, we explore alternative approaches to user authentication that could revolutionize how we think about security.</p>',
      },
      categories: [1, 2],
      _embedded: {
        'wp:term': [
          [
            { id: 1, name: 'Design', slug: 'design' },
            { id: 2, name: 'Dev', slug: 'dev' },
            { id: 3, name: 'UX', slug: 'ux' },
          ],
        ],
      },
    },
    {
      id: 2,
      slug: 'the-linux-designer',
      date: '2024-04-30T09:00:00',
      title: { rendered: 'The Linux Designer' },
      excerpt: {
        rendered:
          "I've always been fascinated by computers and how people interact with them. I've never been a fan of any particular technology and have always stayed open...",
      },
      content: {
        rendered:
          "<p>I've always been fascinated by computers and how people interact with them. I've never been a fan of any particular technology and have always stayed open to trying new things, especially when it comes to operating systems.</p>",
      },
      categories: [4, 5, 6],
      _embedded: {
        'wp:term': [
          [
            { id: 4, name: 'Day-to-day work', slug: 'day-to-day-work' },
            { id: 5, name: 'Productivity', slug: 'productivity' },
            { id: 6, name: 'Technology', slug: 'technology' },
          ],
        ],
      },
    },
    {
      id: 3,
      slug: 'psychology-of-the-web',
      date: '2024-06-14T14:30:00',
      title: { rendered: 'The Psychology of the Web' },
      excerpt: {
        rendered:
          'A few years ago, I attended a webinar that explored a topic that has fascinated me since the beginning of my career as a designer: the profound influence of...',
      },
      categories: [1, 2],
      _embedded: {
        'wp:term': [
          [
            { id: 1, name: 'Design', slug: 'design' },
            { id: 2, name: 'UX', slug: 'ux' },
          ],
        ],
      },
    },
    {
      id: 4,
      slug: 'future-user-authentication-biometrics-passkeys',
      date: '2024-07-20T11:15:00',
      title: {
        rendered: 'The Future of User Authentication: Biometrics vs. Passkeys',
      },
      excerpt: {
        rendered:
          'Traditional Multi-Factor Authentication (MFA) methods, such as SMS based One-Time Passwords (OTPs), incur significant costs and may present...',
      },
      categories: [1, 6, 2],
      _embedded: {
        'wp:term': [
          [
            { id: 1, name: 'Design', slug: 'design' },
            { id: 6, name: 'Technology', slug: 'technology' },
            { id: 2, name: 'UX', slug: 'ux' },
          ],
        ],
      },
    },
  ];
}

function getMockPostBySlug(slug: string): WPPost | null {
  const posts = getMockPosts();
  return posts.find(post => post.slug === slug) || null;
}

function getMockCategories(): WPCategory[] {
  return [
    { id: 1, name: 'Design', slug: 'design', count: 15 },
    { id: 2, name: 'UX', slug: 'ux', count: 12 },
    { id: 3, name: 'Dev', slug: 'dev', count: 8 },
    { id: 4, name: 'Day-to-day work', slug: 'day-to-day-work', count: 5 },
    { id: 5, name: 'Productivity', slug: 'productivity', count: 7 },
    { id: 6, name: 'Technology', slug: 'technology', count: 10 },
  ];
}
