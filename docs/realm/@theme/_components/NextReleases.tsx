// @ts-ignore eslint-disable-next-line
import * as React from 'react';
import styled from 'styled-components';

import { Button } from '@redocly/theme/components/Button/Button';
import { ChevronIcon } from '../_icons/Chevron';
import { ChangelogSection, matchesSearch } from './ChangelogSection';
import { SHORT_NAMES, type ShortNameValues } from '../../changelog.page';
import { HighlightContext } from './Highlight';

type NextChangelogItem = {
  record: {
    timestamp: number;
    changes: {
      minor: string[];
      patch: string[];
    };
    dependencies: Record<string, string>;
  };
  version: string;
};

type NextReleasesProps = {
  nextChangelogs: Record<string, NextChangelogItem[]>;
  packages: ShortNameValues[];
};

export const NextReleases: React.FC<NextReleasesProps> = ({
  nextChangelogs,
  packages,
}: NextReleasesProps) => {
  const [itemsToShow, setItemsToShow] = React.useState(1);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [searchTerm] = React.useContext(HighlightContext);

  const filteredChangelogs = React.useMemo(() => {
    return Object.entries(nextChangelogs)
      .filter(([packageName]) => packages.includes(SHORT_NAMES[packageName] || packageName))
      .flatMap(
        ([packageName, items]) =>
          ((items as NextChangelogItem[]) || [])
            .filter((item) => matchesSearch(searchTerm, { packageName, isNext: true, ...item }))
            .slice(0, itemsToShow)
            .map((item) => ({
              packageName,
              ...item,
            })) || [],
      )
      .sort((a, b) => {
        const versionA = parseInt(a.version.split('next.')[1] || a.version.split('next-')[1]);
        const versionB = parseInt(b.version.split('next.')[1] || b.version.split('next-')[1]);
        return versionB - versionA;
      });
  }, [nextChangelogs, packages, itemsToShow, searchTerm]);

  const hasItems = filteredChangelogs.length > 0;
  const hasMore = Object.values(nextChangelogs).some((items) => items?.length > itemsToShow);

  if (!hasItems) return null;

  return (
    <NextReleasesWrapper>
      <NextReleasesHeader onClick={() => setIsExpanded(!isExpanded)}>
        <HeaderContent>
          <ChevronWrapper>
            <StyledChevron $isExpanded={isExpanded} />
          </ChevronWrapper>
          <TextContainer>
            <SectionHeader>Next release</SectionHeader>
            <p>
              Try the "next" release candidate or wait until it is promoted to the latest version at
              the beginning of each month
            </p>
          </TextContainer>
        </HeaderContent>
      </NextReleasesHeader>
      {isExpanded && hasItems && (
        <>
          <ChangelogSection items={filteredChangelogs} packages={packages} isNextRelease={true} />
          {hasMore && (
            <ShowMoreSection>
              <Button onClick={() => setItemsToShow((prev) => prev + 1)}>
                Load previous release candidates
              </Button>
            </ShowMoreSection>
          )}
        </>
      )}
    </NextReleasesWrapper>
  );
};

const ShowMoreSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;

  button {
    font-size: var(--font-size-base);
    line-height: 22px;
    background: var(--border-color-secondary);
    border: 1px solid var(--border-color-primary);
  }
`;

const NextReleasesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--bg-color-tonal);
  border-radius: 12px;
  border: 1px solid var(--border-color-primary);
  padding: var(--spacing-base);
`;

const NextReleasesHeader = styled.div`
  cursor: pointer;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  gap: 2px;
  width: 100%;
  height: auto;
`;

const SectionHeader = styled.h2`
  font-weight: 600;
  font-size: var(--font-size-xl);
  line-height: 28px;
  color: var(--text-color-primary);
  margin: 0;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    color: var(--text-color-secondary);
    margin: 0;
  }
`;

const ChevronWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 0 0;
  gap: 10px;
  width: 24px;
  height: 26px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const StyledChevron = styled(ChevronIcon)<{ $isExpanded: boolean }>`
  width: 14px;
  height: 14px;
  transform: rotate(${(props) => (props.$isExpanded ? '0deg' : '-90deg')}) scaleX(-1);
  transition: transform 0.3s ease;
  cursor: pointer;

  path {
    fill: var(--text-color-secondary);
  }
`;
