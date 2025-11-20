import React from 'react';
import styled from 'styled-components';

import { Button } from '@redocly/marketing-pages/components/Button/CustomButton.js';
import { CallToAction } from '@redocly/marketing-pages/components/CallToAction/CallToAction.js';
import { FirstThreePosts } from '@redocly/marketing-pages/components/Blog/FirstThreePosts.js';
import { FeaturedClassics } from '@redocly/marketing-pages/components/Blog/FeaturedClassics.js';
import { LatestPosts } from '@redocly/marketing-pages/components/Blog/LatestPosts.js';
import { ContactUs } from '@redocly/marketing-pages/components/Blog/ContactUs.js';
import { BlogRssSubscription } from './_components/BlogRssSubscription';

export default function Blog() {
  return (
    <PageWrapper>
      <FirstThreePosts />

      <SubscribeSection>
        <BlogRssSubscription />
      </SubscribeSection>

      <FeaturedClassics />

      <LatestPosts />

      <ContactUs />

      <CallToAction title="Launch API docs you’ll be proud of">
        <Button to="https://auth.cloud.redocly.com/registration" size="large" className="landing-button">
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

const SubscribeSection = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0 56px;
`;
