import * as React from 'react';

import { Route, Routes as DomRoutes, useParams } from 'react-router-dom';
import { PageLayout } from '@redocly/theme/layouts/PageLayout';
import { useThemeHooks } from '@redocly/theme/core/hooks';

import { SecondaryPostCard } from '@redocly/marketing-pages/components/Blog/SecondaryPostCard.js';

import { Button } from '@redocly/marketing-pages/components/Button/CustomButton.js';
import { CallToAction } from '@redocly/marketing-pages/components/CallToAction/CallToAction.js';
import { FirstThreePosts } from '@redocly/marketing-pages/components/Blog/FirstThreePosts.js';
import { FeaturedClassics } from '@redocly/marketing-pages/components/Blog/FeaturedClassics.js';
import { LatestPosts } from '@redocly/marketing-pages/components/Blog/LatestPosts.js';
import { ContactUs } from '@redocly/marketing-pages/components/Blog/ContactUs.js';
import { Breadcrumbs } from '@redocly/theme/components/Breadcrumbs/Breadcrumbs';
import { BreadcrumbItem } from '@redocly/theme/core/types';
import { H2 } from '@redocly/theme/components/Typography/H2';
import styled from 'styled-components';

export default function BlogRoutes() {
  return (
    <PageLayout>
      <DomRoutes>
        <Route path="/" element={<BlogMain />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/category/:category/:subcategory/" element={<CategoryPage />} />
      </DomRoutes>
    </PageLayout>
  );
}

// Blog main page component
function BlogMain() {
  return (
    <PageWrapper>
      <FirstThreePosts />

      <FeaturedClassics />

      <LatestPosts />

      <ContactUs />

      <CallToAction title="Launch API docs you'll be proud of">
        <Button
          to="https://auth.cloud.redocly.com/registration"
          size="large"
          className="landing-button"
        >
          Start 30-day free trial
        </Button>
      </CallToAction>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

// Category page component
function CategoryPage() {
  const { category, subcategory } = useParams();
  // @ts-ignore
  const { usePageSharedData } = useThemeHooks();
  const { posts, metadata } = usePageSharedData<any>('blog-posts');

  const postList = React.useMemo(() => {
    return posts.filter((post) => {
      if (!post.categories || post.categories.length === 0) {
        return false;
      }
      return post.categories.some((postCategory) => {
        if (
          subcategory &&
          postCategory.subcategory &&
          postCategory.subcategory.id === subcategory &&
          postCategory.category.id === category
        ) {
          return true;
        } else if (postCategory.category.id === category && !subcategory) {
          return true;
        }
        return false;
      });
    });
  }, [posts, category, subcategory]);
  
  const categoryLabel = React.useMemo(() => {
    if (!metadata?.categories) return category;
    const categoryData = metadata.categories.find(cat => cat.id === category);
    return categoryData?.label || category;
  }, [metadata, category]);

  const subcategoryLabel = React.useMemo(() => {
    if (!subcategory || !metadata?.categories) return subcategory;
    const categoryData = metadata.categories.find(cat => cat.id === category);
    const subcategoryData = categoryData?.subcategories?.find(sub => sub.id === subcategory);
    return subcategoryData?.label || subcategory;
  }, [metadata, category, subcategory]);

  const breadcrumbItems: BreadcrumbItem[] = subcategory
    ? [
        { label: 'Blog', link: '/blog' },
        { label: categoryLabel || '', link: `/blog/category/${category}` },
        { label: subcategoryLabel || '', link: `/blog/category/${category}/${subcategory}` },
      ]
    : [
        { label: 'Blog', link: '/blog' },
        { label: categoryLabel || '', link: `/blog/category/${category}` },
      ];

  return (
    <CategoryWrapper>
      <Breadcrumbs additionalBreadcrumbs={breadcrumbItems} />
      <StyledH2>{subcategory ? subcategoryLabel : categoryLabel}</StyledH2>
      <CardsWrapper>
      {postList.map((post) => (
        <SecondaryPostCard
          key={post.slug}
          title={post.title}
          to={`${post.slug}`}
          img={post.image}
          description={post.description}
          publishedDate={post.publishedDate}
            author={post.author}
          />
        ))}
      </CardsWrapper>
    </CategoryWrapper>
  );
}

const StyledH2 = styled(H2)`
  font-family: 'Red Hat Display';
  font-weight: 700;
  font-size: 54px;
  line-height: 64px;

  margin: 0;

`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 96px auto 160px;
  max-width: 1032px;
`;