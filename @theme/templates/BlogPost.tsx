import React from 'react';
import styled from 'styled-components';

import type { Post } from '@redocly/marketing-pages/components/Blog/types.js';

import { useThemeHooks } from '@redocly/theme/core/hooks';
import { Markdown } from '@redocly/theme/components/Markdown/Markdown';
import PostInfo from '@redocly/marketing-pages/components/Blog/PostInfo.js';
import { MediaBox } from '@redocly/marketing-pages/components/PositionItems/MediaBox.js';
import { Box } from '@redocly/marketing-pages/ui/Box.js';

import { RecentPosts } from '../components/Blog/RecentPosts';

// Local version of @redocly/marketing-pages/templates/BlogPost.js — the only
// difference is the RecentPosts section, which excludes the currently open post.
export default function BlogPost(props: { children?: React.ReactNode }) {
  const { usePageProps } = useThemeHooks();
  const pageProps = usePageProps();

  const { publishedDate, author, categories, title, image, slug } = pageProps.metadata as Post & {
    slug?: string;
  };

  return (
    <PageWrapper style={{ background: 'white' }}>
      <BlogMediaBox>
        <PostInfo
          authorName={author?.name}
          authorBIO={author?.authorBIO}
          publishedDate={publishedDate}
          categories={categories}
          title={title}
          author={author}
          avatar={author?.image}
          image={image}
        />

        <Markdown>{props.children}</Markdown>
      </BlogMediaBox>

      <MediaBox>
        <Box style={{ margin: '80px 0' }}>
          <RecentPosts currentSlug={slug} />
        </Box>
      </MediaBox>
    </PageWrapper>
  );
}

const BlogMediaBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: calc(90vw);

  @media screen and (min-width: 900px) {
    max-width: 800px;
  }
`;

const PageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;
