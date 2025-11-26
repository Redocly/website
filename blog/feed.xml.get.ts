import type { ApiFunctionsContext, PageStaticData } from '@redocly/config';
import { readSharedData } from '@redocly/realm/dist/server/utils/shared-data.js';

const BLOG_SLUG = '/blog/';
const RSS_ITEMS_LIMIT = 50;
const ALL_POSTS_SHARED_DATA_ID = 'blog-posts';

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

function escapeXmlForCategories(unsafe: string): string {
  return unsafe
    .replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;')
    .replace(/</g, '&lt;');
}

function formatRssDate(timestamp: string): string {
  return new Date(timestamp).toUTCString();
}

function buildRssItem(post: BlogPost, origin: string): string {
  const link = `${origin}${post.slug}`;
  const pubDate = formatRssDate(post.date);
  
  const categoriesArray = Array.isArray(post.categories) ? post.categories : [];
  const categoryLabels = categoriesArray
    .map((cat) => (typeof cat?.label === 'string' ? cat.label : null))
    .filter((label): label is string => Boolean(label));
  
  const categoriesXml = categoryLabels
    .map(label => `<category>${escapeXmlForCategories(label)}</category>`)
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

function mapCategory(category: any): BlogCategory | null {
  if (!category || typeof category !== 'object') {
    return null;
  }

  const mainLabel = typeof category.category?.label === 'string' ? category.category.label : '';
  const subLabel = typeof category.subcategory?.label === 'string' ? category.subcategory.label : '';

  if (mainLabel && subLabel) {
    return { label: `${mainLabel} > ${subLabel}` };
  }

  if (mainLabel) {
    return { label: mainLabel };
  }

  return null;
}

function mapToBlogPost(post: any): BlogPost | null {
  if (!post) {
    return null;
  }

  const postDate = post.publishedDate || post.date;
  const slug = typeof post.slug === 'string' ? post.slug : '';
  const title = typeof post.title === 'string' ? post.title : '';

  if (!slug || !title || !postDate) {
    return null;
  }

  const categoriesList = Array.isArray(post.categories) ? post.categories : [];
  const categories: BlogCategory[] = categoriesList
    .map(mapCategory)
    .filter((cat): cat is BlogCategory => cat !== null);

  let authorName: string | undefined;
  if (typeof post.author === 'object' && typeof post.author?.name === 'string') {
    authorName = post.author.name;
  } else if (typeof post.author === 'string') {
    authorName = post.author;
  }

  const author: BlogAuthor = { name: authorName || 'Redocly Team' };

  return {
    slug,
    title,
    description: typeof post.description === 'string' ? post.description : '',
    date: postDate,
    author,
    categories,
  };
}

async function readBlogPosts(outdir?: string): Promise<BlogPost[]> {
  if (!outdir) {
    console.warn('[Blog RSS] Missing outdir. Cannot read shared blog posts data.');
    return [];
  }

  try {
    const sharedData = await readSharedData(ALL_POSTS_SHARED_DATA_ID, outdir);
    if (!sharedData) {
      console.warn('[Blog RSS] No shared data found for blog posts.');
      return [];
    }

    const postsSource = Array.isArray((sharedData as any).posts)
      ? (sharedData as any).posts
      : Array.isArray(sharedData)
        ? sharedData
        : [];

    if (!Array.isArray(postsSource)) {
      console.warn('[Blog RSS] Shared data does not contain a posts array.');
      return [];
    }

    return postsSource
      .map(mapToBlogPost)
      .filter((post): post is BlogPost => Boolean(post));
  } catch (error) {
    console.error('[Blog RSS] Failed to read shared blog posts data:', error);
    return [];
  }
}

export default async function blogRssHandler(
  request: Request,
  context: ApiFunctionsContext,
  staticData: PageStaticData
) {
  try {
    const outdir =
      typeof staticData?.props?.outdir === 'string' ? staticData.props.outdir : undefined;
    const posts = await readBlogPosts(outdir);

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

