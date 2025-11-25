import type { ApiFunctionsContext } from '@redocly/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';

import { extractFrontmatter, parseSimpleYaml } from '../utils/frontmatter';

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

type BlogMetadata = {
  authors?: Array<{ id: string; name?: string }>;
  categories?: Array<{ id: string; label?: string }>;
};

async function readBlogMetadata(blogDir: string): Promise<BlogMetadata> {
  const metadataPath = path.join(blogDir, 'metadata', 'blog-metadata.yaml');
  try {
    const metadataContent = await fs.readFile(metadataPath, 'utf8');
    return parseSimpleYaml(metadataContent) as BlogMetadata;
  } catch {
    return {};
  }
}

let cachedBlogDir: string | null | undefined;

async function directoryExists(dirPath: string): Promise<boolean> {
  try {
    const stats = await fs.stat(dirPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function resolveBlogDir(): Promise<string | null> {
  if (cachedBlogDir !== undefined) {
    return cachedBlogDir;
  }

  const candidates = new Set<string>();
  candidates.add(path.join(rootDir, 'blog'));
  candidates.add(path.join(process.cwd(), 'blog'));

  const traverseDepth = 6;
  for (let depth = 0; depth < traverseDepth; depth += 1) {
    const segments = Array(depth + 1).fill('..');
    candidates.add(path.resolve(__dirname, ...segments, 'blog'));
  }

  for (const candidate of Array.from(candidates)) {
    if (await directoryExists(candidate)) {
      cachedBlogDir = candidate;
      return candidate;
    }
  }

  cachedBlogDir = null;
  return null;
}

async function readBlogPostsFromFilesystem(): Promise<BlogPost[]> {
  const blogDir = await resolveBlogDir();
  if (!blogDir) {
    console.warn('[Blog RSS] Blog directory not found for filesystem fallback.');
    return [];
  }

  const metadata = await readBlogMetadata(blogDir);
  const authorMap = new Map<string, string>();
  const categoryMap = new Map<string, string>();

  metadata.authors?.forEach((author) => {
    if (author?.id) {
      authorMap.set(author.id, author.name || author.id);
    }
  });

  metadata.categories?.forEach((category) => {
    if (category?.id) {
      categoryMap.set(category.id, category.label || category.id);
    }
  });

  let entries: import('fs').Dirent[];
  try {
    entries = await fs.readdir(blogDir, { withFileTypes: true });
  } catch (error) {
    console.warn('[Blog RSS] Failed to read blog directory contents:', error);
    return [];
  }
  const posts: BlogPost[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;

    const filePath = path.join(blogDir, entry.name);
    const content = await fs.readFile(filePath, 'utf8');
    const frontmatter = extractFrontmatter(content) as Record<string, any>;

    if (!frontmatter?.title || !frontmatter?.date) {
      continue;
    }

    const slugName = entry.name.replace(/\.md$/, '');
    const categoriesInput = Array.isArray(frontmatter.categories) ? frontmatter.categories : [];
    const categories = categoriesInput.map((categoryId: string) => ({
      label: categoryMap.get(categoryId) || categoryId,
    }));

    const authorId = typeof frontmatter.author === 'string' ? frontmatter.author : '';
    const author = authorId ? { name: authorMap.get(authorId) || authorId } : undefined;

    posts.push({
      slug: `${BLOG_SLUG}${slugName}`,
      title: frontmatter.title,
      description: frontmatter.description || '',
      date: frontmatter.date,
      author,
      categories,
    });
  }

  return posts;
}

async function readBlogPosts(rootDir: string): Promise<BlogPost[]> {
  try {
    return await readBlogPostsFromPageData(rootDir);
  } catch (error) {
    console.warn('[Blog RSS] Falling back to filesystem posts:', error);
    return readBlogPostsFromFilesystem();
  }
}

export default async function blogRssHandler(request: Request, context: ApiFunctionsContext) {
  try {
    const posts = await readBlogPosts(rootDir);

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

