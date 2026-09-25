// Pure helpers for the blog plugin: post lists from frontmatter plus the metadata
// yaml, author and category resolution, and the RSS feed.

export const BLOG_IMAGES_DIR = '/blog/images/';
const RSS_ITEMS_LIMIT = 50;

/**
 * Authors by id and categories by id (`category` and `category:subcategory`), as the
 * templates expect them.
 */
export function indexBlogMetadata(metadata) {
  const authors = new Map();
  const categories = new Map();

  for (const author of metadata?.authors ?? []) {
    authors.set(author.id, author);
  }

  for (const category of metadata?.categories ?? []) {
    const parent = { id: category.id, label: category.label };
    categories.set(category.id, { category: parent });
    for (const subcategory of category.subcategories ?? []) {
      categories.set(`${category.id}:${subcategory.id}`, {
        category: parent,
        subcategory: { id: subcategory.id, label: subcategory.label },
      });
    }
  }

  return { authors, categories };
}

/** Newest first. */
export function sortByPublishedDate(posts) {
  return [...posts].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );
}

/**
 * A post for the templates: every frontmatter field plus `slug`, the resolved
 * `author` (with its image URL), resolved `categories` pairs and the `image` URL.
 */
export async function resolveBlogPost(post, index, resolveImage) {
  const { frontmatter, slug } = post;
  const author = frontmatter.author ? index.authors.get(frontmatter.author) : undefined;

  return {
    ...frontmatter,
    slug,
    author: author
      ? {
          ...author,
          image: author.image ? await resolveImage(BLOG_IMAGES_DIR + author.image) : undefined,
        }
      : undefined,
    categories: (frontmatter.categories ?? [])
      .map((id) => index.categories.get(id))
      .filter(Boolean),
    image: frontmatter.image ? await resolveImage(BLOG_IMAGES_DIR + frontmatter.image) : undefined,
  };
}

export function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeXmlForCategories(unsafe) {
  return String(unsafe)
    .replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;')
    .replace(/</g, '&lt;');
}

export function formatRssDate(timestamp) {
  return new Date(timestamp).toUTCString();
}

function formatCategory(category) {
  return (
    category.category.label + (category.subcategory ? ` > ${category.subcategory.label}` : '')
  );
}

function renderRssItem(post, origin) {
  const link = `${origin}${post.slug}`;
  const categoriesXml = (post.categories ?? [])
    .map((category) => `<category>${escapeXmlForCategories(formatCategory(category))}</category>`)
    .join('');
  const description = `<p>${(post.description || '').replace(/]]>/g, ']]&gt;')}</p>`;

  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${formatRssDate(post.publishedDate)}</pubDate>
      ${categoriesXml}
      <description><![CDATA[${description}]]></description>
      <author>${escapeXml(post.author?.name || 'Redocly Team')}</author>
    </item>
  `;
}

/** RSS 2.0 for the newest posts; `origin` is the site URL without a trailing slash. */
export function renderBlogFeed({ posts, origin, blogSlug = '/blog/', limit = RSS_ITEMS_LIMIT }) {
  const items = sortByPublishedDate(posts.filter((post) => Boolean(post.publishedDate)))
    .slice(0, limit)
    .map((post) => renderRssItem(post, origin))
    .join('');
  const feedUrl = `${origin}${blogSlug}feed.xml`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Redocly Blog</title>
    <link>${escapeXml(origin + blogSlug)}</link>
    <description>Latest posts from the Redocly blog.</description>
    <language>en-us</language>
    <lastBuildDate>${formatRssDate(Date.now())}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}
