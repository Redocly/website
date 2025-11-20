// @ts-ignore eslint-disable-next-line
import * as React from 'react';
import styled from 'styled-components';
import { Button } from '@redocly/theme/components/Button/Button';
import { CDNIcon } from '@redocly/theme/icons/CDNIcon/CDNIcon';

const SHORT_NAMES = {
  '@redocly/realm': 'Realm',
  '@redocly/reef': 'Reef',
  '@redocly/revel': 'Revel',
  '@redocly/redoc': 'Redoc',
  reunite: 'Reunite',
} as const;

type ShortNameValues = typeof SHORT_NAMES[keyof typeof SHORT_NAMES];

interface RssSubscriptionProps {
  className?: string;
}

export function RssSubscription({ className }: RssSubscriptionProps) {
  const [isRssModalOpen, setIsRssModalOpen] = React.useState(false);
  const [selectedProducts, setSelectedProducts] = React.useState<ShortNameValues[]>(Object.values(SHORT_NAMES));
  const [includeRc, setIncludeRc] = React.useState(false);
  
  const rssFeedUrl = React.useMemo(() => {
    if (typeof window === 'undefined') return '/api/changelog-rss';
    const baseUrl = window.location.origin;
    const url = new URL(`${baseUrl}/api/changelog-rss`);
    
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
  
  const handleCopyUrl = React.useCallback(() => {
    navigator.clipboard.writeText(rssFeedUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy URL:', err);
      // Fallback: select the text so user can copy manually
      const urlInput = document.querySelector('input[readonly][value*="changelog-rss"]') as HTMLInputElement;
      if (urlInput) {
        urlInput.select();
        urlInput.setSelectionRange(0, 99999);
      }
    });
  }, [rssFeedUrl]);

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
  onProductsChange,
  onIncludeRcChange,
  onCopyUrl,
  onClose,
  isCopied,
}: RssModalProps) {
  const handleProductToggle = (product: ShortNameValues) => {
    if (selectedProducts.includes(product)) {
      if (selectedProducts.length > 1) {
        onProductsChange(selectedProducts.filter(p => p !== product));
      }
    } else {
      onProductsChange([...selectedProducts, product]);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Configure RSS Feed</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          <Section>
            <SectionTitle>Select Products</SectionTitle>
            <ProductList>
              {Object.values(SHORT_NAMES).map((product) => (
                <ProductItem key={product}>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product)}
                      onChange={() => handleProductToggle(product)}
                      disabled={selectedProducts.length === 1 && selectedProducts.includes(product)}
                    />
                    <span>{product}</span>
                  </CheckboxLabel>
                </ProductItem>
              ))}
            </ProductList>
          </Section>
          <Section>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={includeRc}
                onChange={(e) => onIncludeRcChange(e.target.checked)}
              />
              <span>Include release candidates (next versions)</span>
            </CheckboxLabel>
          </Section>
          <Section>
            <SectionTitle>RSS Feed URL</SectionTitle>
            <UrlContainer>
              <UrlInput type="text" value={rssFeedUrl} readOnly />
              <CopyButton 
                onClick={onCopyUrl} 
                disabled={isCopied}
                icon={isCopied ? <CDNIcon name="check" size="1em" color="currentColor" /> : undefined}
                iconPosition="left"
              >
                {isCopied ? 'Copied' : 'Copy URL'}
              </CopyButton>
            </UrlContainer>
          </Section>
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
  background-color: var(--bg-color-modal-overlay, rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: var(--bg-color);
  border-radius: 8px;
  box-shadow: var(--bg-raised-shadow, 0px 8px 24px 8px rgba(0, 0, 0, 0.04), 0px 4px 12px 0px rgba(0, 0, 0, 0.08));
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid var(--border-color-primary);
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color-primary);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  line-height: 1;
  color: var(--text-color-secondary);
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--text-color-primary);
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color-primary);
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  
  input[type="checkbox"] {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
  
  input[type="checkbox"]:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  span {
    color: var(--text-color-primary);
  }
`;

const UrlContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const UrlInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--border-color-primary);
  border-radius: 4px;
  background: var(--bg-color);
  color: var(--text-color-primary);
  font-family: var(--font-family-monospaced, monospace);
  font-size: 12px;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-main);
  }
`;

const CopyButton = styled(Button)`
  white-space: nowrap;
  flex-shrink: 0;
`;

