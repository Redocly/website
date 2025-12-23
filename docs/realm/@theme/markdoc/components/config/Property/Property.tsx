import * as React from 'react';
import styled from 'styled-components';
import { Products, Plan } from '../utils/types';
import PropertyCondition from './PropertyCondition';
import { withPathPrefix } from '@redocly/theme/core/utils';

type PropertyManifestItem = {
  route: string;
  title: string;
  description: string;
  products?: Products[];
  plans?: Plan[];
};

function normalizeFileKey(p: string): string {
  let r = p.trim();
  if (r.startsWith('./')) r = r.slice(2);
  if (r.startsWith('/')) r = r.slice(1);
  if (r.startsWith('docs/realm/')) r = r.slice('docs/realm/'.length);
  return r;
}

function fileToSlug(file: string): string {
  const key = normalizeFileKey(file);
  let p = key.replace(/\.md$/, '');
  p = p.replace(/\/index$/, '');
  p = `${window.location.pathname.replace(/\/$/, '')}/${p}`;
  return p;
}

async function loadFromPageData(file: string): Promise<PropertyManifestItem | null> {
  try {
    const slug = fileToSlug(file);
    const slugPath = slug.replace(/^\//, '').replace(/\/$/, '');
    const url = withPathPrefix(`/page-data/${encodeURI(slugPath)}/data.json`);
    // eslint-disable-next-line no-console
    console.debug('[ConfigProperty] Fallback page-data fetch for', file, '→', url);
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    // shape: see portal PageData; we need props.frontmatter and props.seo
    const fm = data?.props?.frontmatter || {};
    const seo = data?.props?.seo || {};
    const title: string = seo.title || slugPath.split('/').pop();
    const description: string = (fm.description as string) || seo.description || '';
    return {
      route: slug,
      title,
      description,
      products: fm.products as Products[] | undefined,
      plans: fm.plans as Plan[] | undefined,
    };
  } catch {
    // eslint-disable-next-line no-console
    console.warn('[ConfigProperty] Fallback page-data fetch failed for', file);
    return null;
  }
}

export interface ConfigPropertyProps {
  file: string;
}

export function ConfigProperty({ file }: ConfigPropertyProps): React.ReactElement {
  const [meta, setMeta] = React.useState<PropertyManifestItem | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  function fileToFallbackTitle(f: string): string {
    const key = normalizeFileKey(f);
    let p = key.replace(/\.md$/, '').replace(/\/index$/, '');
    const parts = p.split('/');
    return parts[parts.length - 1] || 'config property';
  }

  React.useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    void (async () => {
      const found = await loadFromPageData(file);
      if (!mounted) return;
      setMeta(found);
      setIsLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [file]);

  if (isLoading) {
    return (
      <PropertyItem>
        <PropertyTitleContainer>
          <PropertyTitle as={'span'}>{fileToFallbackTitle(file)}</PropertyTitle>
        </PropertyTitleContainer>
        <PropertyDescription>Loading description and requirements…</PropertyDescription>
      </PropertyItem>
    );
  }

  if (!meta) {
    return (
      <PropertyItem>
        <PropertyTitleContainer>
          <PropertyTitle as={'span'}>Unknown config property</PropertyTitle>
        </PropertyTitleContainer>
        <PropertyDescription>No metadata found for: {file}</PropertyDescription>
      </PropertyItem>
    );
  }
  return (
    <PropertyItem>
      <PropertyTitleContainer>
        <PropertyTitle href={meta.route}>{meta.title}</PropertyTitle>
        <PropertyCondition plans={meta.plans} products={meta.products} />
      </PropertyTitleContainer>
      <PropertyDescription>{meta.description}</PropertyDescription>
    </PropertyItem>
  );
}

const PropertyItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  gap: 4px;
`;

const PropertyTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const PropertyTitle = styled.a`
  font-size: var(--font-size-lg);
  color: var(--link-color-primary);
`;

const PropertyDescription = styled.p`
  line-height: var(--line-height-base);
  color: var(--text-color-secondary);
  font-size: var(--font-size-base);
  margin: 0 !important;
`;
