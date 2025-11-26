import type { ApiFunctionsContext, PageStaticData } from '@redocly/config';
import { readSharedData } from '@redocly/realm/dist/server/utils/shared-data.js';
import { formatRssDate, escapeXml } from '../@theme/utils/rss';

const BLOG_SLUG = '/blog/';
const RSS_ITEMS_LIMIT = 50;
const ALL_POSTS_SHARED_DATA_ID = 'blog-posts';

type BlogCategory = { category: { label: string }; subcategory?: { label: string } };
type BlogAuthor = { name?: string };
type BlogPost = {
  slug: string;
  title: string;
  description?: string;
  publishedDate: string;
  author?: BlogAuthor;
  categories: BlogCategory[];
};


function escapeXmlForCategories(unsafe: string): string {
  return unsafe.replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;').replace(/</g, '&lt;');
}


function buildRssItem(post: BlogPost, origin: string): string {
  const link = `${origin}${post.slug}`;
  const pubDate = formatRssDate(post.publishedDate);

  const categoryLabels = post.categories.map(formatCategory);
  const categoriesXml = categoryLabels
    .map((label) => `<category>${escapeXmlForCategories(label)}</category>`)
    .join('');

  const author = escapeXml(post.author?.name || 'Redocly Team');
  const description = `<p>${(post.description || '').replace(/]]>/g, ']]&gt;')}</p>`;

  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      ${categoriesXml}
      <description><![CDATA[${description}]]></description>
      <author>${author}</author>
    </item>
  `;
}

function formatCategory(category: BlogCategory): string {
  return category.category.label + (category.subcategory ? ` > ${category.subcategory.label}` : '');
}

async function readBlogPosts(outdir: string): Promise<BlogPost[]> {
  try {
    const sharedData = (await readSharedData(ALL_POSTS_SHARED_DATA_ID, outdir)) as {
      posts: BlogPost[];
    };
    if (!sharedData) {
      console.warn('[Blog RSS] No shared data found for blog posts.');
      return [];
    }

    return sharedData.posts;
  } catch (error) {
    console.error('[Blog RSS] Failed to read shared blog posts data:', error);
    return [];
  }
}

export default async function blogRssHandler(
  request: Request,
  context: ApiFunctionsContext,
  staticData: PageStaticData,
) {
  try {
    const outdir = String(staticData.props?.outdir || '');
    const posts = await readBlogPosts(outdir);

    const sortedPosts = posts
      .filter((post) => Boolean(post.publishedDate))
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
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
    <lastBuildDate>${formatRssDate(Date.now())}</lastBuildDate>
    <atom:link href="${escapeXml(request.url)}" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

    return new Response(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
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
