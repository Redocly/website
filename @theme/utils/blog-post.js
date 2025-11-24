import { copyStaticFile } from '@redocly/realm/dist/server/utils/fs.js';

const BLOG_IMAGES_DIR = 'blog/images/';
const BLOG_METADATA_PATH = 'blog/metadata/blog-metadata.yaml';

export const buildAndSortBlogPosts = async (postRoutes, context, outdir) => {
  const posts = [];

  const metadataContentRecord = await context.cache.load(BLOG_METADATA_PATH, 'yaml');
  const metadata = await transformMetadata(metadataContentRecord.data, context.fs.cwd, outdir);

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
        .map((categoryId) => {
          const categoryData = metadata.categories.get(categoryId);
          if (!categoryData) return null;
          
          if (categoryData.category && categoryData.subcategory) {
            return categoryData; 
          } else {
            return { 
              category: {
                id: categoryData.id, 
                label: categoryData.label 
              }
            };
          }
        })
        .filter(Boolean),
      image:
        frontmatter.image &&
        (await copyStaticFile(context.fs.cwd, BLOG_IMAGES_DIR + frontmatter.image, outdir)),
      //   content,
    });
  }

  return { posts: posts.sort(sortByDatePredicate), metadata: metadataContentRecord.data };
};

async function transformMetadata(metadata, cwd, outdir) {
  const authors = new Map();
  const categories = new Map();

  for (const author of metadata.authors) {
    authors.set(author.id, {
      ...author,
      image: await copyStaticFile(cwd, BLOG_IMAGES_DIR + author.image, outdir),
    });
  }

  // Mapping category and subcategory
  for (const category of metadata.categories) {
    // Store main category as-is (for posts with just main categories)
    categories.set(category.id, category);

    // Store subcategories with both category and subcategory objects
    if (category.subcategories) {
      for (const subcategory of category.subcategories) {
        const fullId = `${category.id}:${subcategory.id}`;
        categories.set(fullId, {
          category: {
            id: category.id,
            label: category.label
          },
          subcategory: {
            id: subcategory.id,
            label: subcategory.label
          }
        });
      }
    }
  }

  return { authors, categories };
}

function sortByDatePredicate(a, b) {
  const aDate = new Date(a.publishedDate);
  const bDate = new Date(b.publishedDate);

  if (aDate.getTime() > bDate.getTime()) {
    return -1;
  } else if (aDate.getTime() < bDate.getTime()) {
    return 1;
  }
  return 0;
}
