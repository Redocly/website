import * as React from 'react';
import styled from 'styled-components';

import { useThemeHooks } from '@redocly/theme/core/hooks';
import { PageActionsContext } from '@redocly/theme/core/contexts';
import { Markdown } from '@redocly/theme/components/Markdown/Markdown';
import PostInfo from '@redocly/marketing-pages/components/Blog/PostInfo.js';
import { MediaBox } from '@redocly/marketing-pages/components/PositionItems/MediaBox.js';
import { Box } from '@redocly/marketing-pages/ui/Box.js';
import { RecentPosts } from '@redocly/marketing-pages/components/Blog/RecentPosts.js';

type BlogAuthor = { name?: string; authorBIO?: string; image?: string };
type BlogPostData = {
  publishedDate?: string;
  author?: BlogAuthor;
  categories?: unknown[];
  title?: string;
  image?: string;
};
type BlogHooks = {
  usePageSharedData: <T>(key: string) => T | undefined;
  useMarkdocRenderer: (ast: unknown) => React.ReactNode;
};

// The `blog-post` entity comes from @theme/plugin.js; the page body is the
// markdoc document the post's markdown file produced.
export default function BlogPost() {
  const { usePageSharedData, useMarkdocRenderer } = useThemeHooks() as unknown as BlogHooks;
  const post = usePageSharedData<BlogPostData>('blog-post') ?? {};
  const document = usePageSharedData<{ ast?: unknown }>('document');
  const body = useMarkdocRenderer(document?.ast);
  const author = post.author;

  return (
    <PageWrapper style={{ background: 'white' }}>
      <ContentWrapper>
        <PostInfo
          authorName={author?.name}
          authorBIO={author?.authorBIO}
          publishedDate={post.publishedDate}
          categories={post.categories ?? []}
          title={post.title}
          author={author}
          avatar={author?.image}
          image={post.image}
        />
        <PageActionsContext.Provider value={true}>
          <Markdown>{body}</Markdown>
        </PageActionsContext.Provider>
      </ContentWrapper>
      <MediaBox>
        <Box my="80px">
          <RecentPosts />
        </Box>
      </MediaBox>
    </PageWrapper>
  );
}

const ContentWrapper = styled.div`
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
