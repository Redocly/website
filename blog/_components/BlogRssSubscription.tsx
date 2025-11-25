import * as React from 'react';
import styled from 'styled-components';
import { CDNIcon } from '@redocly/theme/icons/CDNIcon/CDNIcon';

const BLOG_RSS_PATH = '/blog/feed.xml';

interface BlogRssSubscriptionProps {
  className?: string;
}

export function BlogRssSubscription({ className }: BlogRssSubscriptionProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const urlDisplayRef = React.useRef<HTMLAnchorElement>(null);

  const rssFeedUrl = React.useMemo(() => {
    if (typeof window === 'undefined') return BLOG_RSS_PATH;
    return `${window.location.origin}${BLOG_RSS_PATH}`;
  }, []);

  const copyButtonIcon = React.useMemo(() => {
    return isCopied ? (
      <CDNIcon name="check" size="1em" color="currentColor" />
    ) : (
      <CDNIcon name="link" size="1em" color="currentColor" />
    );
  }, [isCopied]);

  const selectUrlText = React.useCallback(() => {
    const element = urlDisplayRef.current;
    if (!element || typeof window === 'undefined') return;
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }, []);

  const handleCopy = React.useCallback(() => {
    if (!navigator?.clipboard) return;
    navigator.clipboard
      .writeText(rssFeedUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Failed to copy RSS URL', error);
        selectUrlText();
      });
  }, [rssFeedUrl, selectUrlText]);

  return (
    <>
      <SubscribeButton
        type="button"
        className={className}
        onClick={() => setIsModalOpen(true)}
        aria-haspopup="dialog"
      >
        <CDNIcon name="rss" size="1em" color="currentColor" />
        Subscribe via RSS
      </SubscribeButton>
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <div>
                <ModalTitle>The easiest way to follow Redocly blog updates</ModalTitle>
                <ModalDescription>Don&apos;t miss a thing, follow our blog changelog.</ModalDescription>
              </div>
              <CloseButton
                type="button"
                aria-label="Close RSS configuration modal"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <Section>
                <SectionTitle>Your blog RSS Feed URL</SectionTitle>
                <UrlContainer>
                  <UrlLink
                    href={rssFeedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Blog RSS feed URL"
                    ref={urlDisplayRef}
                  >
                    {rssFeedUrl}
                  </UrlLink>
                  <CopyButton type="button" onClick={handleCopy} disabled={isCopied}>
                    {copyButtonIcon}
                    {isCopied ? 'Copied' : 'Copy URL'}
                  </CopyButton>
                </UrlContainer>
              </Section>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

const SubscribeButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid var(--border-color-primary, rgba(22, 119, 255, 0.4));
  background: transparent;
  color: var(--text-color-primary, #0a1c2b);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(22, 119, 255, 0.08);
    color: var(--text-color-primary, #0a1c2b);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(10, 28, 43, 0.55);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const ModalContent = styled.div`
  background: #ffffff;
  width: min(480px, 100%);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 24px 64px rgba(10, 28, 43, 0.22);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  line-height: 1.2;
  color: #0a1c2b;
`;

const ModalDescription = styled.p`
  margin: 8px 0 0;
  color: #4a5568;
  font-size: 16px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #4a5568;
  font-size: 28px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  line-height: 1;

  &:hover {
    background: rgba(10, 28, 43, 0.08);
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #4a5568;
`;

const UrlContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const UrlLink = styled.a`
  flex: 1;
  border-radius: 12px;
  border: 1px solid rgba(10, 28, 43, 0.12);
  padding: 12px 16px;
  font-size: 14px;
  font-family: var(--font-family-mono, 'IBM Plex Mono', monospace);
  color: #0a1c2b;
  background: #f8fafc;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  word-break: break-all;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  &:focus-visible {
    outline: 2px solid rgba(32, 125, 255, 0.6);
    outline-offset: 2px;
    background: #ffffff;
  }
`;

const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(120deg, #207dff, #9461ff);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default BlogRssSubscription;

