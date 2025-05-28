import { buildAndSortBlogPosts } from './utils/blog-post.js';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const BLOG_SLUG = '/blog/';
const ABOUT_SLUG = '/about/';

const LATEST_POSTS_SHARED_DATA_ID = 'blog-latest-posts';
const ALL_POSTS_SHARED_DATA_ID = 'blog-posts';

function __dirname(url) {
  const __filename = fileURLToPath(url);
  return path.dirname(__filename);
}

export function fromCurrentDir(moduleUrl, filePath) {
  return path.resolve(__dirname(moduleUrl), filePath);
}

export default function blogPlugin() {
  /** @type {import("@redocly/realm/dist/server/plugins/types").LifecyclePluginInstance } */
  const pluginInstance = {
    id: 'plugin',
    async afterRoutesCreated(actions, context) {
      const postRoutes = actions
        .getAllRoutes()
        .filter((route) => route.slug.startsWith(BLOG_SLUG) && route.slug !== BLOG_SLUG);
      const postsData = await buildAndSortBlogPosts(postRoutes, context, actions.outdir);

      const latestPosts = postsData.posts.slice(0, 3);

      // Create shared data for blog pages
      await actions.createSharedData(LATEST_POSTS_SHARED_DATA_ID, latestPosts);
      await actions.createSharedData(ALL_POSTS_SHARED_DATA_ID, postsData);

      // Add latest posts shared data to all blog posts and update metadata
      for (const post of postsData.posts) {
        actions.addRouteSharedData(
          post.slug,
          LATEST_POSTS_SHARED_DATA_ID,
          LATEST_POSTS_SHARED_DATA_ID,
        );

        const postRoute = actions.getRouteBySlug(post.slug);

        postRoute.metadata = { ...postRoute.metadata, ...post };
      }
      // Add latest posts shared data to the about page
      actions.addRouteSharedData(
        ABOUT_SLUG,
        LATEST_POSTS_SHARED_DATA_ID,
        LATEST_POSTS_SHARED_DATA_ID,
      );

      // Add all posts shared data to the blog index page
      actions.addRouteSharedData(BLOG_SLUG, ALL_POSTS_SHARED_DATA_ID, ALL_POSTS_SHARED_DATA_ID);
    },
  };

  return pluginInstance;
}
