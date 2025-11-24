import type { ApiFunctionsContext } from '@redocly/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';

import { extractFrontmatter, parseSimpleYaml } from '../utils/frontmatter.js';

const BLOG_SLUG = '/blog/';
const BLOG_DIR = 'blog';
const RSS_ITEMS_LIMIT = 50;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Get project root by going up one level from @api/ directory
const rootDir = path.resolve(__dirname, '..');

// Try to find the correct path for blog metadata
// In deployment, files might be in a different location
async function findBlogMetadataPath(): Promise<string> {
  const possiblePaths = [
    path.join(rootDir, 'blog/metadata/blog-metadata.yaml'),
    path.join(process.cwd(), 'blog/metadata/blog-metadata.yaml'),
    // Try relative to __dirname at different levels
    path.resolve(__dirname, '../blog/metadata/blog-metadata.yaml'),
    path.resolve(__dirname, '../../blog/metadata/blog-metadata.yaml'),
    path.resolve(__dirname, '../../../blog/metadata/blog-metadata.yaml'),
    path.resolve(__dirname, '../../../../blog/metadata/blog-metadata.yaml'),
    // Try absolute paths (less common but possible)
    path.resolve('/blog/metadata/blog-metadata.yaml'),
    // Try from process.cwd() at different levels
    path.resolve(process.cwd(), '../blog/metadata/blog-metadata.yaml'),
    path.resolve(process.cwd(), '../../blog/metadata/blog-metadata.yaml'),
  ];

  console.log('[Blog RSS] Searching for blog metadata file...');
  for (const possiblePath of possiblePaths) {
    try {
      await fs.access(possiblePath);
      console.log('[Blog RSS] Found blog metadata at:', possiblePath);
      return possiblePath;
    } catch (error) {
      // Log for debugging but continue searching
      console.log('[Blog RSS] Path not found:', possiblePath);
    }
  }
  
  // If not found, try to search in common parent directories
  const searchDirs = [rootDir, process.cwd(), __dirname];
  for (const searchDir of searchDirs) {
    try {
      // Try to find blog directory by searching up
      let currentDir = searchDir;
      for (let i = 0; i < 5; i++) {
        const testPath = path.join(currentDir, 'blog/metadata/blog-metadata.yaml');
        try {
          await fs.access(testPath);
          console.log('[Blog RSS] Found blog metadata by searching:', testPath);
          return testPath;
        } catch {
          // Continue
        }
        currentDir = path.resolve(currentDir, '..');
        // Stop if we've reached the filesystem root
        if (currentDir === path.resolve(currentDir, '..')) break;
      }
    } catch {
      // Continue to next search directory
    }
  }
  
  // Return the default path if none found (will fail with a clear error)
  const defaultPath = path.join(rootDir, 'blog/metadata/blog-metadata.yaml');
  console.error('[Blog RSS] Could not find blog metadata file, using default:', defaultPath);
  return defaultPath;
}

async function findBlogDirectory(): Promise<string> {
  const possiblePaths = [
    path.join(rootDir, 'blog'),
    path.join(process.cwd(), 'blog'),
    // Try relative to __dirname at different levels
    path.resolve(__dirname, '../blog'),
    path.resolve(__dirname, '../../blog'),
    path.resolve(__dirname, '../../../blog'),
    path.resolve(__dirname, '../../../../blog'),
    // Try absolute paths
    path.resolve('/blog'),
    // Try from process.cwd() at different levels
    path.resolve(process.cwd(), '../blog'),
    path.resolve(process.cwd(), '../../blog'),
  ];

  console.log('[Blog RSS] Searching for blog directory...');
  for (const possiblePath of possiblePaths) {
    try {
      const stats = await fs.stat(possiblePath);
      if (stats.isDirectory()) {
        console.log('[Blog RSS] Found blog directory at:', possiblePath);
        return possiblePath;
      }
    } catch {
      // Continue to next path
    }
  }
  
  // If not found, try to search in common parent directories
  const searchDirs = [rootDir, process.cwd(), __dirname];
  for (const searchDir of searchDirs) {
    try {
      // Try to find blog directory by searching up
      let currentDir = searchDir;
      for (let i = 0; i < 5; i++) {
        const testPath = path.join(currentDir, 'blog');
        try {
          const stats = await fs.stat(testPath);
          if (stats.isDirectory()) {
            console.log('[Blog RSS] Found blog directory by searching:', testPath);
            return testPath;
          }
        } catch {
          // Continue
        }
        currentDir = path.resolve(currentDir, '..');
        // Stop if we've reached the filesystem root
        if (currentDir === path.resolve(currentDir, '..')) break;
      }
    } catch {
      // Continue to next search directory
    }
  }
  
  // Return the default path if none found
  const defaultPath = path.join(rootDir, 'blog');
  console.error('[Blog RSS] Could not find blog directory, using default:', defaultPath);
  return defaultPath;
}

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
    console.log('[Blog RSS] Starting RSS feed generation');
    console.log('[Blog RSS] Calculated root directory (from __dirname):', rootDir);
    console.log('[Blog RSS] process.cwd():', process.cwd());
    console.log('[Blog RSS] __dirname:', __dirname);

    // Dynamically find the blog metadata path
    const blogMetadataPath = await findBlogMetadataPath();
    console.log('[Blog RSS] Found blog metadata path:', blogMetadataPath);

    let metadataRaw: string;
    try {
      metadataRaw = await fs.readFile(blogMetadataPath, 'utf8');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      console.error('[Blog RSS] Failed to read metadata file:', {
        path: blogMetadataPath,
        error: errorMessage,
        stack: errorStack,
      });
      throw new Error(`Failed to read blog metadata file at ${blogMetadataPath}: ${errorMessage}`);
    }

    const metadata = parseSimpleYaml(metadataRaw) || {};
    const authorsMap = new Map<string, BlogAuthor>(
      (metadata.authors as RawAuthor[] | undefined)?.map((author) => [author.id, author]) ?? [],
    );
    const categoriesMap = new Map<string, BlogCategory>(
      (metadata.categories as RawCategory[] | undefined)?.map((category) => [category.id, category]) ?? [],
    );

    // Dynamically find the blog directory
    const blogDirPath = await findBlogDirectory();
    console.log('[Blog RSS] Found blog directory:', blogDirPath);

    let files: any[];
    try {
      files = await fs.readdir(blogDirPath, { withFileTypes: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : 'No stack trace';
      console.error('[Blog RSS] Failed to read blog directory:', {
        path: blogDirPath,
        error: errorMessage,
        stack: errorStack,
      });
      throw new Error(`Failed to read blog directory at ${blogDirPath}: ${errorMessage}`);
    }

    const markdownPosts = files.filter((entry) => entry.isFile() && entry.name.endsWith('.md'));
    console.log('[Blog RSS] Found markdown files:', markdownPosts.length);

    const posts: BlogPost[] = [];

    for (const file of markdownPosts) {
      const filePath = path.join(blogDirPath, file.name);
      try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const frontmatter = extractFrontmatter(fileContent);

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
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('[Blog RSS] Failed to process blog post file:', {
          file: file.name,
          path: filePath,
          error: errorMessage,
        });
        // Continue processing other files even if one fails
      }
    }

    console.log('[Blog RSS] Processed posts:', posts.length);

    const sortedPosts = posts
      .filter((post) => Boolean(post.date))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, RSS_ITEMS_LIMIT);

    console.log('[Blog RSS] Sorted and filtered posts:', sortedPosts.length);

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

    console.log('[Blog RSS] RSS feed generated successfully');
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
    const errorName = error instanceof Error ? error.name : 'UnknownError';

    console.error('[Blog RSS] Error generating RSS feed:', {
      name: errorName,
      message: errorMessage,
      stack: errorStack,
      rootDir,
      calculatedRootDir: rootDir,
      processCwd: process.cwd(),
      __dirname,
    });

    // Include error details in response for debugging in deployment
    return context.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate blog RSS feed',
      details: errorMessage,
      rootDir,
      processCwd: process.cwd(),
    });
  }
}

