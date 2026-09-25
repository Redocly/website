// The blog: category and preview routes, the post lists the marketing-pages
// components read, one resolved entity per post, and the RSS feed.

import yaml from 'js-yaml';
import { createEntityLoader, defineContentPlugin } from 'realm-plus/plugin';

import {
  indexBlogMetadata,
  renderBlogFeed,
  resolveBlogPost,
  sortByPublishedDate,
} from './utils/blog-post.js';

const PLUGIN_ID = 'blog';
const BLOG_DIR = 'blog/';
const BLOG_METADATA_PATH = 'blog/metadata/blog-metadata.yaml';
const BLOG_SLUG = '/blog';
const ABOUT_SLUG = '/about';
const ABOUT_PAGE_PATH = 'pages/about/about.page.tsx';
const LATEST_POSTS_COUNT = 3;

const BLOG_TEMPLATE = 'source:@theme/blog.page.tsx';
const PREVIEW_TEMPLATE = 'source:@theme/preview.route.tsx';

// Dependency keys the templates read through `usePageSharedData`.
const ALL_POSTS_KEY = 'blog-posts';
const LATEST_POSTS_KEY = 'blog-latest-posts';
const POST_KEY = 'blog-post';

const POSTS_ENTITY_KEY = `${PLUGIN_ID}:posts`;
const LATEST_POSTS_ENTITY_KEY = `${PLUGIN_ID}:latest-posts`;
const FEED_ENTITY_KEY = `${PLUGIN_ID}:feed`;

/** A top-level `blog/<name>.md` file. */
function isBlogPost(path) {
  return path.startsWith(BLOG_DIR) && path.endsWith('.md') && !path.slice(BLOG_DIR.length).includes('/');
}

async function readMetadata(io) {
  return yaml.load(await io.readFile(BLOG_METADATA_PATH)) ?? {};
}

function categorySlug(category, subcategory) {
  return `/blog/category/${category.id}${subcategory ? `/${subcategory.id}` : ''}`;
}

function siteOrigin(config) {
  const siteUrl = config?.seo?.siteUrl;
  return typeof siteUrl === 'string' ? siteUrl.replace(/\/+$/, '') : '';
}

// Resolves `/blog/images/<file>` to content-asset URLs and collects the asset
// usages and file deps the loader must report.
function createImageResolver(context) {
  const entityDeps = [];
  const assetUsages = [];

  return {
    async resolve(src) {
      const resolved = await context.markdown.resolveImageReference(src, '');
      entityDeps.push(...resolved.entityDeps);
      assetUsages.push(...resolved.assetUsages);
      if (resolved.result.kind === 'assetRef') {
        return resolved.result.url;
      }
      // A missing image stays a dep so the post re-resolves once it appears.
      entityDeps.push({ kind: 'file', path: src.replace(/^\//, '') });
      return src;
    },
    collected() {
      return { entityDeps, assetUsages };
    },
  };
}

const postsLoader = createEntityLoader(POSTS_ENTITY_KEY, async (context) => {
  const { posts, metadata } = context.args;
  const index = indexBlogMetadata(metadata);
  const images = createImageResolver(context);
  const resolved = [];
  for (const post of posts) {
    resolved.push(await resolveBlogPost(post, index, images.resolve));
  }
  return { value: { posts: sortByPublishedDate(resolved), metadata }, ...images.collected() };
});

const latestPostsLoader = createEntityLoader(LATEST_POSTS_ENTITY_KEY, async (context) => {
  const { posts } = await context.entities.load(POSTS_ENTITY_KEY);
  return { value: posts.slice(0, context.args.limit) };
});

const postLoader = createEntityLoader(`${PLUGIN_ID}:post`, async (context) => {
  const { posts } = await context.entities.load(POSTS_ENTITY_KEY);
  return { value: posts.find((post) => post.slug === context.args.slug) ?? null };
});

const feedLoader = createEntityLoader(FEED_ENTITY_KEY, async (context) => {
  const { posts } = await context.entities.load(POSTS_ENTITY_KEY);
  const xml = renderBlogFeed({ posts, origin: context.args.origin });
  return {
    value: {
      body: await context.createBlobRef(xml, { format: 'text' }),
      contentType: 'application/rss+xml; charset=utf-8',
    },
  };
});

export default defineContentPlugin({
  id: PLUGIN_ID,
  version: '1.0.1',
  content: {
    filter: { match: (path) => isBlogPost(path) || path === BLOG_METADATA_PATH },
    async extractAll(ctx) {
      const metadata = await readMetadata(ctx.io);
      const routes = [
        {
          routeId: 'preview',
          slug: '/preview',
          template: PREVIEW_TEMPLATE,
          metadata: { title: 'Preview', navbar: { hide: true }, footer: { hide: true } },
        },
      ];

      for (const category of metadata.categories ?? []) {
        routes.push({
          routeId: `category:${category.id}`,
          slug: categorySlug(category),
          template: BLOG_TEMPLATE,
          metadata: { title: category.label },
        });
        for (const subcategory of category.subcategories ?? []) {
          routes.push({
            routeId: `category:${category.id}:${subcategory.id}`,
            slug: categorySlug(category, subcategory),
            template: BLOG_TEMPLATE,
            metadata: { title: `${category.label} • ${subcategory.label}` },
          });
        }
      }

      return { routes };
    },
  },
  loaders: [postsLoader, latestPostsLoader, postLoader, feedLoader],
  async finalize(ctx) {
    const metadata = await readMetadata(ctx.io);
    const posts = [];
    for (const file of ctx.files) {
      if (!isBlogPost(file.path) || file.manifest.ignore === true) continue;
      const route = ctx.routes.byFilePath(file.path);
      if (route) posts.push({ slug: route.slug, frontmatter: file.manifest });
    }

    const all = postsLoader.withArgs({ posts, metadata }, { stableKey: POSTS_ENTITY_KEY });
    const latest = latestPostsLoader.withArgs(
      { limit: LATEST_POSTS_COUNT },
      { stableKey: LATEST_POSTS_ENTITY_KEY },
    );
    const feed = feedLoader.withArgs(
      { origin: siteOrigin(ctx.config) },
      { stableKey: FEED_ENTITY_KEY },
    );

    const entities = [all, latest, feed];
    // The about page keeps its file-derived slug until frontmatter slugs land.
    const aboutSlug = ctx.routes.byFilePath(ABOUT_PAGE_PATH)?.slug ?? ABOUT_SLUG;
    const attach = [
      { slug: BLOG_SLUG, deps: { [ALL_POSTS_KEY]: all } },
      { slug: aboutSlug, deps: { [LATEST_POSTS_KEY]: latest } },
    ];

    for (const post of posts) {
      const ref = postLoader.withArgs(
        { slug: post.slug },
        { stableKey: `${PLUGIN_ID}:post:${post.slug}` },
      );
      entities.push(ref);
      attach.push({ slug: post.slug, deps: { [POST_KEY]: ref, [LATEST_POSTS_KEY]: latest } });
    }

    for (const category of metadata.categories ?? []) {
      attach.push({ slug: categorySlug(category), deps: { [ALL_POSTS_KEY]: all } });
      for (const subcategory of category.subcategories ?? []) {
        attach.push({ slug: categorySlug(category, subcategory), deps: { [ALL_POSTS_KEY]: all } });
      }
    }

    return {
      entities,
      attach,
      staticFiles: [{ path: 'blog/feed.xml', producer: feed, audience: 'public' }],
    };
  },
});
