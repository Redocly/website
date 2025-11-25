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
      <FirstThreePostsWrapper>
        <RssButtonContainer>
          <BlogRssSubscription />
        </RssButtonContainer>
        <FirstThreePosts />
      </FirstThreePostsWrapper>

      <FeaturedClassics />

      <LatestPosts />

      <SubscribeCardSection>
        <SubscribeCard>
          <CardEyebrow>Stay in the loop</CardEyebrow>
          <CardTitle>Subscribe to the Redocly blog</CardTitle>
          <CardDescription>
            Get notified about new releases, API best practices, and company updates the moment they ship.
            Plug the RSS feed into your reader or workflow automation.
          </CardDescription>
          <CardActions>
            <BlogRssSubscription />
          </CardActions>
        </SubscribeCard>
      </SubscribeCardSection>

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

const FirstThreePostsWrapper = styled.div`
  position: relative;
`;

const RssButtonContainer = styled.div`
  position: absolute;
  top: -48px;
  right: 0;
  z-index: 10;

  @media screen and (min-width: 1400px) {
    right: calc((100% - 1240px) / 2);
  }

  @media screen and (max-width: 1399px) {
    right: calc((100% - 90vw) / 2);
  }

  @media (max-width: 640px) {
    position: static;
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }
`;

const SubscribeCardSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 64px 24px 16px;
`;

const SubscribeCard = styled.div`
  width: 100%;
  max-width: 960px;
  border-radius: 16px;
  padding: 48px;
  background: linear-gradient(135deg, rgba(32, 125, 255, 0.08), rgba(148, 97, 255, 0.08));
  border: 1px solid rgba(10, 28, 43, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 640px) {
    padding: 32px 24px;
  }
`;

const CardEyebrow = styled.span`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(10, 28, 43, 0.72);
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 32px;
  line-height: 1.2;
  color: #0a1c2b;
`;

const CardDescription = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.5;
  color: rgba(10, 28, 43, 0.8);
`;

const CardActions = styled.div`
  margin-top: 12px;
  display: inline-flex;
`;
