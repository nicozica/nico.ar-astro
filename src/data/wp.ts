export interface WPImage {
  source_url: string;
  alt_text?: string;
}

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    ["wp:featuredmedia"]?: Array<WPImage>;
    author?: Array<{ name: string }>;
    ["wp:term"]?: Array<Array<{ id: number; name: string; slug: string }>>; // categories, tags
  };
}

export interface WPList<T> { 
  items: T[]; 
  totalPages: number; 
}

const BASE = import.meta.env.PUBLIC_WP_BASE;

// Helper functions for clean URL construction
const listUrl = (page = 1, perPage = 6) =>
  `${BASE}/posts?_embed&per_page=${perPage}&page=${page}&status=publish&orderby=date&order=desc`;

const bySlugUrl = (slug: string) => 
  `${BASE}/posts?slug=${slug}&_embed&status=publish`;

export async function getPosts(page = 1, perPage = 6): Promise<WPList<WPPost>> {
  if (!BASE) {
    console.warn('PUBLIC_WP_BASE not configured, using mock data');
    return { items: getMockPosts(), totalPages: 2 };
  }

  try {
    const res = await fetch(listUrl(page, perPage));
    if (!res.ok) throw new Error(`WP posts failed: ${res.status}`);
    
    const items: WPPost[] = await res.json();
    const totalPages = Number(res.headers.get("X-WP-TotalPages") || 1);
    
    return { items, totalPages };
  } catch (error) {
    console.error('WordPress API error:', error);
    console.warn('Falling back to mock data');
    return { items: getMockPosts(), totalPages: 2 };
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost> {
  if (!BASE) {
    console.warn('PUBLIC_WP_BASE not configured, using mock data');
    const post = getMockPostBySlug(slug);
    if (!post) throw new Error("Post not found");
    return post;
  }

  try {
    const res = await fetch(bySlugUrl(slug));
    if (!res.ok) throw new Error(`WP post failed: ${res.status}`);
    
    const arr: WPPost[] = await res.json();
    if (!arr?.length) throw new Error("Post not found");
    
    return arr[0];
  } catch (error) {
    console.error('WordPress API error:', error);
    console.warn('Falling back to mock data');
    const post = getMockPostBySlug(slug);
    if (!post) throw new Error("Post not found");
    return post;
  }
}

export function getFeatured(post: WPPost): { src?: string; alt?: string } {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  return { src: media?.source_url, alt: media?.alt_text || post.title.rendered };
}

export function getAuthor(post: WPPost): string | undefined {
  return post._embedded?.author?.[0]?.name;
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
          '<p>Traditional Multi-Factor Authentication (MFA) methods, such as SMS-based One-Time Passwords (OTPs), incur significant costs and may present security vulnerabilities.</p><p>In this article, we explore alternative approaches to user authentication that could revolutionize how we think about security.</p><h2>The Problem with SMS-Based OTP</h2><p>While SMS-based authentication has been widely adopted, it comes with several limitations that businesses and users are beginning to recognize.</p><h2>Useful links</h2><ul><li><a href="https://auth0.com/blog/sms-authentication-security" target="_blank" rel="noopener">Auth0 Security Guide</a> - Comprehensive guide to SMS authentication security</li><li><a href="https://www.nist.gov/publications/sp-800-63b" target="_blank" rel="noopener">NIST Guidelines</a> - Digital identity authentication guidelines</li></ul>',
      },
      _embedded: {
        ["wp:featuredmedia"]: [
          {
            source_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=450&fit=crop',
            alt_text: 'MFA Authentication concept'
          }
        ],
        ["wp:term"]: [
          [
            { id: 1, name: 'Design', slug: 'design' },
            { id: 2, name: 'Dev', slug: 'dev' },
            { id: 3, name: 'UX', slug: 'ux' },
          ],
        ],
        author: [
          { name: 'Nicolas Zicarelli' }
        ]
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
          "<p>I've always been fascinated by computers and how people interact with them. I've never been a fan of any particular technology and have always stayed open to trying new things, especially when it comes to operating systems.</p><p>After years of using macOS for design work, I decided to make the switch to Linux and document my journey.</p><h2>The Switch</h2><p>Making the transition from macOS to Linux as a designer wasn't just about changing operating systems—it was about rethinking my entire workflow.</p>",
      },
      _embedded: {
        ["wp:term"]: [
          [
            { id: 4, name: 'Day-to-day work', slug: 'day-to-day-work' },
            { id: 5, name: 'Productivity', slug: 'productivity' },
            { id: 6, name: 'Technology', slug: 'technology' },
          ],
        ],
        author: [
          { name: 'Nicolas Zicarelli' }
        ]
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
      content: {
        rendered:
          '<p>A few years ago, I attended a webinar that explored a topic that has fascinated me since the beginning of my career as a designer: the profound influence of psychology on web design.</p><p>Understanding user psychology is crucial for creating effective digital experiences.</p><h2>Cognitive Load Theory</h2><p>One of the most important concepts in web psychology is cognitive load theory, which explains how users process information.</p>',
      },
      _embedded: {
        ["wp:featuredmedia"]: [
          {
            source_url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=450&fit=crop',
            alt_text: 'Web psychology concept illustration'
          }
        ],
        ["wp:term"]: [
          [
            { id: 1, name: 'Design', slug: 'design' },
            { id: 2, name: 'UX', slug: 'ux' },
          ],
        ],
        author: [
          { name: 'Nicolas Zicarelli' }
        ]
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
      content: {
        rendered:
          '<p>Traditional Multi-Factor Authentication (MFA) methods, such as SMS based One-Time Passwords (OTPs), incur significant costs and may present security vulnerabilities.</p><p>As we move toward a passwordless future, two technologies are emerging as frontrunners: biometric authentication and passkeys.</p><h2>Biometric Authentication</h2><p>Biometric authentication uses unique physical characteristics to verify identity.</p><h2>Passkeys: The New Standard</h2><p>Passkeys represent a fundamental shift in how we think about authentication.</p>',
      },
      _embedded: {
        ["wp:term"]: [
          [
            { id: 1, name: 'Design', slug: 'design' },
            { id: 6, name: 'Technology', slug: 'technology' },
            { id: 2, name: 'UX', slug: 'ux' },
          ],
        ],
        author: [
          { name: 'Nicolas Zicarelli' }
        ]
      },
    },
  ];
}

function getMockPostBySlug(slug: string): WPPost | null {
  const posts = getMockPosts();
  return posts.find(post => post.slug === slug) || null;
}
