import { copyStaticFile } from '@redocly/realm/dist/server/utils/fs.js';

const BLOG_IMAGES_DIR = 'blog/images/';
const BLOG_METADATA_PATH = 'blog/metadata/blog-metadata.yaml';

export const buildAndSortBlogPosts = async (postRoutes, context, outdir) => {
  const posts = [];

  const metadataContentRecord = await context.cache.load(BLOG_METADATA_PATH, 'yaml');
  const metadata = transformMetadata(metadataContentRecord.data, context.fs.cwd, outdir);

  for (const route of postRoutes) {
    const {
      data: { content, frontmatter },
    } = await context.cache.load(route.fsPath, 'markdown-frontmatter');

    if (frontmatter?.ignore === true || (await context.isPathIgnored(route.fsPath))) {
      continue;
    }

    posts.push({
      ...frontmatter,
      slug: route.slug,
      author: metadata.authors.get(frontmatter.author),
      categories: (frontmatter.categories || [])
        .map((categoryId) => metadata.categories.get(categoryId))
        .filter(Boolean),
      image:
        frontmatter.image &&
        copyStaticFile(context.fs.cwd, BLOG_IMAGES_DIR + frontmatter.image, outdir),
      //   content,
    });
  }

  return { posts: posts.sort(sortByDatePredicate), metadata: metadataContentRecord.data };
};

function transformMetadata(metadata, cwd, outdir) {
  const authors = new Map();
  const categories = new Map();

  for (const author of metadata.authors) {
    authors.set(author.id, {
      ...author,
      image: copyStaticFile(cwd, BLOG_IMAGES_DIR + author.image, outdir),
    });
  }

  for (const category of metadata.categories) {
    categories.set(category.id, category);
  }

  return { authors, categories };
}

function sortByDatePredicate(a, b) {
  const aDate = new Date(a.date);
  const bDate = new Date(b.date);

  if (aDate.getTime() > bDate.getTime()) {
    return -1;
  } else if (aDate.getTime() < bDate.getTime()) {
    return 1;
  }
  return 0;
}
