import * as React from 'react';
import styled from 'styled-components';

import { useThemeHooks } from '@redocly/theme/core/hooks';

import { ArticleCard } from '@redocly/marketing-pages/components/Blog/RecentPosts.js';
import { H2Title } from '@redocly/marketing-pages/components/TypographyElements/TypographyElements.js';

type RecentPost = { slug: string; title: string; description?: string };

// Same layout as marketing-pages RecentPosts, but reads the deeper 'blog-recent-posts'
// shared data and filters out the post it renders on, so a post never lists itself.
export function RecentPosts({ currentSlug }: { currentSlug?: string }) {
  // @ts-ignore
  const { usePageSharedData } = useThemeHooks();
  const recentPosts = usePageSharedData<RecentPost[]>('blog-recent-posts') ?? [];

  const posts = recentPosts.filter((post) => post.slug !== currentSlug).slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <>
      <H2Title textAlign={{ base: 'center' }} mb={{ base: '34px', small: '42px' }}>
        Latest from our blog
      </H2Title>
      <RecentPostsGrid>
        {posts.map((post) => (
          <ArticleCard
            key={post.slug}
            title={post.title}
            description={post.description ?? ''}
            slug={post.slug}
          />
        ))}
      </RecentPostsGrid>
    </>
  );
}

const RecentPostsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 5rem;
  justify-items: center;

  @media screen and (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
