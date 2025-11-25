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
  border: 1px solid var(--border-color-primary);
  background: var(--bg-color-tonal);
  color: var(--text-color-primary);
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: var(--bg-color-hover);
    color: var(--text-color-primary);
  }
`;

export default BlogRssSubscription;

