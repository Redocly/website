// @ts-ignore eslint-disable-next-line
import * as React from 'react';
import styled from 'styled-components';
import { Button } from '@redocly/theme/components/Button/Button';
import { CDNIcon } from '@redocly/theme/icons/CDNIcon/CDNIcon';
import { RealmIcon } from '../_icons/Realm';
import { ReefIcon } from '../_icons/Reef';
import { RevelIcon } from '../_icons/Revel';
import { RedocIcon } from '../_icons/Redoc';
import { ReuniteIcon } from '../_icons/Reunite';
import { ReplayIcon } from '../_icons/Replay';

const SHORT_NAMES = {
  '@redocly/realm': 'Realm',
  '@redocly/reef': 'Reef',
  '@redocly/revel': 'Revel',
  '@redocly/redoc': 'Redoc',
  '@redocly/replay': 'Replay',
  reunite: 'Reunite',
} as const;

type ShortNameValues = typeof SHORT_NAMES[keyof typeof SHORT_NAMES];

const PRODUCTS = [
  { key: '@redocly/realm', label: SHORT_NAMES['@redocly/realm'], Icon: RealmIcon },
  { key: '@redocly/reef', label: SHORT_NAMES['@redocly/reef'], Icon: ReefIcon },
  { key: '@redocly/revel', label: SHORT_NAMES['@redocly/revel'], Icon: RevelIcon },
  { key: '@redocly/redoc', label: SHORT_NAMES['@redocly/redoc'], Icon: RedocIcon },
  { key: 'reunite', label: SHORT_NAMES.reunite, Icon: ReuniteIcon },
  { key: '@redocly/replay', label: SHORT_NAMES['@redocly/replay'], Icon: ReplayIcon },
] as const;

interface RssSubscriptionProps {
  className?: string;
  initialSelectedProducts?: readonly string[];
}

const isValidProductLabel = (label: string): label is ShortNameValues =>
  PRODUCTS.some((product) => product.label === label);

const sanitizeSelectedProducts = (
  products?: readonly string[],
): ShortNameValues[] => {
  const allProductLabels = PRODUCTS.map((product) => product.label);

  if (!products?.length) {
    return allProductLabels;
  }

  const filtered = products.filter(isValidProductLabel);
  if (!filtered.length) {
    return allProductLabels;
  }

  return Array.from(new Set(filtered));
};

export function RssSubscription({ className, initialSelectedProducts }: RssSubscriptionProps) {
  const [isRssModalOpen, setIsRssModalOpen] = React.useState(false);
  const [selectedProducts, setSelectedProducts] = React.useState<ShortNameValues[]>(() =>
    sanitizeSelectedProducts(initialSelectedProducts),
  );
  const [includeRc, setIncludeRc] = React.useState(false);
  const urlDisplayRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (!isRssModalOpen) {
      setSelectedProducts(sanitizeSelectedProducts(initialSelectedProducts));
    }
  }, [initialSelectedProducts, isRssModalOpen]);

  const rssFeedUrl = React.useMemo(() => {
    const rssUrl = 'https://redocly.com/docs/changelog/feed.xml';
    const url = new URL(rssUrl);

    // Add products as a single comma-separated array parameter
    if (selectedProducts.length > 0) {
      url.searchParams.set('products', selectedProducts.join(','));
    }

    // Add include-rc flag if enabled
    if (includeRc) {
      url.searchParams.set('include-rc', 'true');
    }

    return url.toString();
  }, [selectedProducts, includeRc]);

  const [isCopied, setIsCopied] = React.useState(false);

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

  const handleCopyUrl = React.useCallback(() => {
    navigator.clipboard.writeText(rssFeedUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy URL:', err);
      selectUrlText();
    });
  }, [rssFeedUrl, selectUrlText]);

  return (
    <>
      <RssButton
        className={className}
        variant="outlined"
        onClick={() => setIsRssModalOpen(true)}
        title="Subscribe to changelog updates via RSS. You can add this feed to Slack or any RSS reader."
        icon={<CDNIcon name="rss" size="1em" color="currentColor" />}
        iconPosition="right"
      >
        Subscribe via RSS
      </RssButton>
      {isRssModalOpen && (
        <RssModal
          selectedProducts={selectedProducts}
          includeRc={includeRc}
          rssFeedUrl={rssFeedUrl}
          urlDisplayRef={urlDisplayRef}
          onProductsChange={setSelectedProducts}
          onIncludeRcChange={setIncludeRc}
          onCopyUrl={handleCopyUrl}
          onClose={() => setIsRssModalOpen(false)}
          isCopied={isCopied}
        />
      )}
    </>
  );
}

interface RssModalProps {
  selectedProducts: ShortNameValues[];
  includeRc: boolean;
  rssFeedUrl: string;
  urlDisplayRef: React.RefObject<HTMLAnchorElement>;
  onProductsChange: (products: ShortNameValues[]) => void;
  onIncludeRcChange: (include: boolean) => void;
  onCopyUrl: () => void;
  onClose: () => void;
  isCopied: boolean;
}

function RssModal({
  selectedProducts,
  includeRc,
  rssFeedUrl,
  urlDisplayRef,
  onProductsChange,
  onIncludeRcChange,
  onCopyUrl,
  onClose,
  isCopied,
}: RssModalProps) {
  const modalTitleId = React.useId();
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  const handleProductToggle = React.useCallback((product: ShortNameValues) => {
    if (selectedProducts.includes(product)) {
      onProductsChange(selectedProducts.filter((p) => p !== product));
    } else {
      onProductsChange([...selectedProducts, product]);
    }
  }, [onProductsChange, selectedProducts]);

  const copyButtonIcon = React.useMemo(() => {
    return isCopied ? <CDNIcon name="check" size="1em" color="currentColor" /> : <CDNIcon name="link" size="1em" color="currentColor" />;
  }, [isCopied]);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <HeaderText>
            <ModalTitle id={modalTitleId}>The easiest way to follow Redocly updates</ModalTitle>
            <ModalDescription>Don't miss a thing, follow our changelog.</ModalDescription>
          </HeaderText>
          <CloseButton
            variant="ghost"
            size="small"
            onClick={onClose}
            aria-label="Close RSS configuration modal"
            icon={<CDNIcon name="close" size="1em" color="currentColor" />}
          />
        </ModalHeader>
        <ModalBody>
          <Section>
            <SectionTitle>Select products to follow:</SectionTitle>
            <ProductGrid role="group" aria-label="Select products to include in RSS feed">
              {PRODUCTS.map(({ label, Icon }) => {
                const isActive = selectedProducts.includes(label);
                return (
                  <ProductButton
                    key={label}
                    type="button"
                    onClick={() => handleProductToggle(label)}
                    $active={isActive}
                    aria-pressed={isActive}
                  >
                    <ProductIcon aria-hidden="true">
                      <Icon width={32} height={32} />
                    </ProductIcon>
                    <ProductName>{label}</ProductName>
                  </ProductButton>
                );
              })}
            </ProductGrid>
            <ReleaseCandidatesToggle htmlFor="rss-include-rc">
              <input
                id="rss-include-rc"
                type="checkbox"
                checked={includeRc}
                onChange={(e) => onIncludeRcChange(e.target.checked)}
              />
              <span>Include release candidates</span>
            </ReleaseCandidatesToggle>
          </Section>
          <UrlSection>
            <SectionTitle>
              {selectedProducts.length === 0 ?
                'All products RSS Feed URL' :
                'Your custom RSS Feed URL'}
            </SectionTitle>
            <UrlContainer>
              <UrlLink
                href={rssFeedUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RSS feed URL"
                ref={urlDisplayRef}
              >
                {rssFeedUrl}
              </UrlLink>
              <CopyButton
                onClick={onCopyUrl}
                icon={copyButtonIcon}
                disabled={isCopied}
                iconPosition="left"
                variant="primary"
              >
                {isCopied ? 'Copied' : 'Copy URL'}
              </CopyButton>
            </UrlContainer>
          </UrlSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}

const RssButton = styled(Button)`
  white-space: nowrap;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-color-modal-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: var(--bg-color);
  border-radius: 16px;
  width: min(580px, calc(100% - 32px));
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
  gap: 24px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: var(--font-size-xl);
  line-height: var(--line-height-xl);
  font-family: var(--font-family-base);
  font-weight: 600;
  color: var(--text-color-primary);
`;

const ModalDescription = styled.p`
  margin: 0;
  color: var(--text-color-secondary);
  font-size: 15px;
  line-height: 1.4;
`;

const CloseButton = styled(Button)`
  width: 22px;
  height: 22px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UrlSection = styled(Section)`
  gap: 24px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color-secondary);
  letter-spacing: 0.01em;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 160px);
  gap: 8px;
  justify-content: space-between;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 160px);
    justify-content: center;
  }

  @media (max-width: 360px) {
    grid-template-columns: 160px;
  }
`;

const ProductButton = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ $active }) => ($active ? 'var(--border-color-primary)' : 'var(--border-color-secondary)')};
  background: ${({ $active }) => ($active ? 'var(--bg-color-active)' : 'var(--bg-color-tonal)')};
  border-radius: 4px;
  padding: 12px 16px;
  display: flex;
  width: 160px;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
  color: var(--text-color-primary);
  font-weight: 600;

  &:hover {
    border-color: var(--border-color-primary);
    background: var(--bg-color-hover);
    transform: none;
  }
`;

const ProductIcon = styled.div`
  width: 20px;
  height: 20px;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ProductName = styled.span`
  font-size: var(--font-size-lg);
  font-weight: 500;
  line-height: var(--line-height-lg);
`;

const ReleaseCandidatesToggle = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--text-color-primary);

  input[type='checkbox'] {
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 4px;
    background: var(--bg-color);
    border: 1px solid var(--text-color-primary);
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  input[type='checkbox']::after {
    content: '';
    width: 7.93px;
    height: 6.32px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    mask: url("data:image/svg+xml,%3Csvg width='8' height='7' viewBox='0 0 8 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 3.5L3 6L7.5 0.5' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
    background: var(--text-color-primary);
    transition: transform 0.15s ease;
  }

  input[type='checkbox']:checked::after {
    transform: translate(-50%, -50%) scale(1);
  }
`;

const UrlContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const UrlLink = styled.a`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--border-color-primary);
  border-radius: 8px;
  background: var(--bg-color);
  color: var(--text-color-primary);
  font-family: var(--font-family-monospaced, monospace);
  font-size: 14px;
  height: 32px;
  line-height: 16px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  word-break: break-all;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  &:focus-visible {
    outline: 2px solid var(--color-primary-main);
    outline-offset: 2px;
  }
`;

const CopyButton = styled(Button)`
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 130px;
`;

