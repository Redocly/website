import * as React from 'react';
import styled from 'styled-components';
import { CDNIcon } from '@redocly/theme/icons/CDNIcon/CDNIcon';

const BLOG_RSS_PATH = '/blog/feed.xml';

interface BlogRssSubscriptionProps {
  className?: string;
}

export function BlogRssSubscription({ className }: BlogRssSubscriptionProps) {
  const rssFeedUrl = React.useMemo(() => {
    if (typeof window === 'undefined') return BLOG_RSS_PATH;
    return `${window.location.origin}${BLOG_RSS_PATH}`;
  }, []);

  return (
    <SubscribeButton
      href={rssFeedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Open Redocly blog RSS feed in a new tab"
    >
      <CDNIcon name="rss" size="1em" color="currentColor" />
      Subscribe via RSS
    </SubscribeButton>
  );
}

const SubscribeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid var(--border-color-primary, rgba(22, 119, 255, 0.4));
  background: rgba(22, 119, 255, 0.05);
  color: var(--text-color-primary, #0a1c2b);
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover,
  &:focus-visible {
    background: rgba(22, 119, 255, 0.12);
    border-color: rgba(22, 119, 255, 0.8);
    color: var(--text-color-primary, #0a1c2b);
  }

  &:focus-visible {
    outline: 2px solid rgba(22, 119, 255, 0.6);
    outline-offset: 2px;
  }
`;

export default BlogRssSubscription;

