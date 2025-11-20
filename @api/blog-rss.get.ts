import type { ApiFunctionsContext } from '@redocly/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';
import matter from 'gray-matter';
import YAML from 'yaml';

const BLOG_SLUG = '/blog/';
const BLOG_DIR = 'blog';
const RSS_ITEMS_LIMIT = 50;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = process.cwd();

const BLOG_METADATA_PATH = path.join(rootDir, 'blog/metadata/blog-metadata.yaml');

type BlogCategory = { label: string };
type RawCategory = BlogCategory & { id: string };
type BlogAuthor = { name?: string };
type RawAuthor = BlogAuthor & { id: string };
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

  const description = `
    <p>${escapeXml(post.description || '')}</p>
    <p><strong>Author:</strong> ${escapeXml(post.author?.name || 'Redocly Team')}</p>
  `;

  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      ${categories}
      <description><![CDATA[${description}]]></description>
    </item>
  `;
}

export default async function blogRssHandler(request: Request, context: ApiFunctionsContext) {
  try {
    const metadataRaw = await fs.readFile(BLOG_METADATA_PATH, 'utf8');
    const metadata = YAML.parse(metadataRaw) || {};
    const authorsMap = new Map<string, BlogAuthor>(
      (metadata.authors as RawAuthor[] | undefined)?.map((author) => [author.id, author]) ?? [],
    );
    const categoriesMap = new Map<string, BlogCategory>(
      (metadata.categories as RawCategory[] | undefined)?.map((category) => [category.id, category]) ?? [],
    );

    const blogDirPath = path.join(rootDir, BLOG_DIR);
    const files = await fs.readdir(blogDirPath, { withFileTypes: true });
    const markdownPosts = files.filter((entry) => entry.isFile() && entry.name.endsWith('.md'));

    const posts: BlogPost[] = [];

    for (const file of markdownPosts) {
      const filePath = path.join(blogDirPath, file.name);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);

      if (frontmatter?.ignore === true) continue;

      const slug = `${BLOG_SLUG}${file.name.replace(/\.md$/, '')}`;

      const categories = (frontmatter.categories || [])
        .map((categoryId: string) => categoriesMap.get(categoryId))
        .filter(Boolean);

      posts.push({
        slug,
        title: frontmatter.title ?? slug,
        description: frontmatter.description,
        date: frontmatter.date,
        author: authorsMap.get(frontmatter.author),
        categories,
      });
    }

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
    console.error('[Blog RSS] Error generating RSS feed:', error);
    return context.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate blog RSS feed',
    });
  }
}

