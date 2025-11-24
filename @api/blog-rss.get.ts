import type { ApiFunctionsContext } from '@redocly/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';

const BLOG_SLUG = '/blog/';
const RSS_ITEMS_LIMIT = 50;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

type BlogCategory = { label: string };
type BlogAuthor = { name?: string };
type BlogPost = {
  slug: string;
  title: string;
  description?: string;
  date: string;
  author?: BlogAuthor;
  categories: BlogCategory[];
};

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRssDate(timestamp: string): string {
  return new Date(timestamp).toUTCString();
}

function buildRssItem(post: any, origin: string): string {
  const link = `${origin}${post.slug}`;
  const pubDate = formatRssDate(post.date);
  const categories = (post.categories || [])
    .map((category: { label: string }) => `<category>${escapeXml(category.label)}</category>`)
    .join('');
  const author = escapeXml(post.author?.name || 'Redocly Team');

  const description = `<p>${escapeXml(post.description || '')}</p>`;

  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      ${categories}
      <description><![CDATA[${description}]]></description>
      <author>${author}</author>
    </item>
  `;
}

async function readBlogPostsFromPageData(rootDir: string): Promise<BlogPost[]> {
  const pageDataPath = path.join(rootDir, 'client/page-data/shared/blog-posts.json');
  
  try {
    const blogPostsData = JSON.parse(await fs.readFile(pageDataPath, 'utf8'));
    const postsData = blogPostsData.posts || [];
    
    const posts: BlogPost[] = postsData.map((post: any) => ({
      slug: post.slug || '',
      title: post.title || '',
      description: post.description || '',
      date: post.date || '',
      author: typeof post.author === 'object' ? post.author : { name: post.author?.name || 'Redocly Team' },
      categories: post.categories || [],
    }));

    return posts;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to read blog posts from ${pageDataPath}: ${errorMessage}`);
  }
}

export default async function blogRssHandler(request: Request, context: ApiFunctionsContext) {
  try {
    const posts = await readBlogPostsFromPageData(rootDir);

    const sortedPosts = posts
      .filter((post) => Boolean(post.date))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, RSS_ITEMS_LIMIT);

    const url = new URL(request.url);
    const origin = `${url.protocol}//${url.host}`;
    const rssItems = sortedPosts.map((post) => buildRssItem(post, origin)).join('');

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Redocly Blog</title>
    <link>${escapeXml(origin + BLOG_SLUG)}</link>
    <description>Latest posts from the Redocly blog.</description>
    <language>en-us</language>
    <lastBuildDate>${formatRssDate(new Date().toISOString())}</lastBuildDate>
    <atom:link href="${escapeXml(request.url)}" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';

    console.error('[Blog RSS] Error generating RSS feed:', {
      message: errorMessage,
      stack: errorStack,
    });

    return context.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate blog RSS feed',
      details: errorMessage,
    });
  }
}

