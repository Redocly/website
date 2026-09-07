// @ts-ignore eslint-disable-next-line
import * as React from 'react';
import styled from 'styled-components';
import dynamicReact from '@markdoc/markdoc/dist/react';
import markdoc from '@markdoc/markdoc';
import { Highlight, HighlightContext } from './Highlight';
import { Heading } from '@redocly/theme/markdoc/components/Heading/Heading';
import { SHORT_NAMES } from '../../changelog.page';
import { RealmIcon } from '../_icons/Realm';
import { ReefIcon } from '../_icons/Reef';
import { RevelIcon } from '../_icons/Revel';
import { RedocIcon } from '../_icons/Redoc';
import { ReuniteIcon } from '../_icons/Reunite';
import { ReplayIcon } from '../_icons/Replay';
import { processChanges, type ChangelogEntry } from '../_utils/changelog';

const PRODUCT_ICONS = {
  '@redocly/realm': RealmIcon,
  '@redocly/reef': ReefIcon,
  '@redocly/revel': RevelIcon,
  '@redocly/redoc': RedocIcon,
  reunite: ReuniteIcon,
  replay: ReplayIcon,
};

type ChangelogSectionProps = {
  items: Array<{
    record: ChangelogEntry;
    packageName: string;
    version: string;
  }>;
  packages: string[];
  itemsToRender?: number;
  isNextRelease?: boolean;
  isLatestRelease?: boolean;
  isPreviousRelease?: boolean;
  children?: (filteredItems: React.ReactNode[]) => React.ReactNode;
};

export const matchesSearch = (
  searchTerm: string,
  item: {
    packageName: string;
    version: string;
    record: {
      changes: {
        minor: string[];
        patch: string[];
      };
      timestamp: number;
    };
    isLatest?: boolean;
    isNext?: boolean;
  },
) => {
  if (!searchTerm) return true;

  const searchTermLower = searchTerm.toLowerCase();
  const dateStr = new Date(item.record.timestamp).toISOString().split('T')[0]; // YYYY-MM-DD

  return (
    item.packageName.toLowerCase().includes(searchTermLower) ||
    item.version.toLowerCase().includes(searchTermLower) ||
    item.record.changes.minor.some((change) => change.toLowerCase().includes(searchTermLower)) ||
    item.record.changes.patch.some((change) => change.toLowerCase().includes(searchTermLower)) ||
    (item.isLatest && 'latest'.includes(searchTermLower)) ||
    (item.isNext && 'next'.includes(searchTermLower)) ||
    dateStr.includes(searchTermLower)
  );
};

export const ChangelogSection: React.FC<ChangelogSectionProps> = ({
  items,
  packages,
  itemsToRender = Infinity,
  isNextRelease = false,
  isLatestRelease = false,
  isPreviousRelease = false,
  children,
}) => {
  const [searchTerm] = React.useContext(HighlightContext);

  const filteredItems = React.useMemo(() => {
    const filtered = items
      .filter(({ packageName }) => packages.includes(SHORT_NAMES[packageName] || packageName))
      .filter((item) =>
        matchesSearch(searchTerm, {
          ...item,
          isNext: isNextRelease,
          isLatest: isLatestRelease,
        }),
      )
      .slice(0, itemsToRender);

    return filtered.map((item, index) => (
      <Record
        key={`${item.packageName}-${item.version}`}
        isNextRelease={isNextRelease}
        isPreviousRelease={isPreviousRelease}
      >
        <RecordTitle
          packageName={item.packageName}
          version={item.version}
          isLatest={isLatestRelease}
          /* Only show "next" tag once per package to avoid duplicate labels when multiple versions exist */
          isNext={
            isNextRelease && filtered.findIndex((i) => i.packageName === item.packageName) === index
          }
          timestamp={item.record.timestamp}
        />
        <ChangelogContent record={item.record} />
      </Record>
    ));
  }, [items, packages, searchTerm, itemsToRender]);

  return children ? children(filteredItems) : <>{filteredItems}</>;
};

const RecordTitle = ({
  packageName,
  version,
  isLatest = false,
  isNext = false,
  timestamp = null,
}) => {
  const id = SHORT_NAMES[packageName] + '@' + version;

  return (
    <StyledHeading level={2} id={id}>
      <RecordHeader>
        <TagsGroup>
          <ProductTag>
            {React.createElement(PRODUCT_ICONS[packageName])}
            <span>
              <Highlight>{SHORT_NAMES[packageName]}</Highlight>
            </span>
          </ProductTag>
          <VersionTag>
            <span>
              <Highlight>{version}</Highlight>
            </span>
          </VersionTag>
          {isLatest && (
            <MonoTag>
              <span>
                <Highlight>latest</Highlight>
              </span>
            </MonoTag>
          )}
          {isNext && (
            <MonoTag>
              <span>
                <Highlight>next</Highlight>
              </span>
            </MonoTag>
          )}
        </TagsGroup>
        {timestamp && (
          <DateTag>
            <Highlight>{new Date(timestamp).toISOString().split('T')[0]}</Highlight>
          </DateTag>
        )}
      </RecordHeader>
    </StyledHeading>
  );
};

const ChangelogContent = ({ record }: { record: ChangelogEntry }) => {
  const { features, fixes } = processChanges(record);

  return (
    <ContentWrapper>
      {features.length > 0 && (
        <>
          <SectionTitle>Features</SectionTitle>
          <List>
            {features.map((change, idx) => (
              <ListItem key={idx}>
                <Highlight>{simpleRenderMarkdown(change)}</Highlight>
              </ListItem>
            ))}
          </List>
        </>
      )}

      {fixes.length > 0 && (
        <>
          <SectionTitle>Fixes</SectionTitle>
          <List>
            {fixes.map((change, idx) => (
              <ListItem key={idx}>
                <Highlight>{simpleRenderMarkdown(change)}</Highlight>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </ContentWrapper>
  );
};

function simpleRenderMarkdown(str: string) {
  const replacedLinks = str.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, link) => {
    return `[${text}](${link
      .replace(/^\.?\//, '')
      .replace(/\.(md|page.tsx)$/, '')
      .replace(/\/index$/, '')})`;
  });
  return dynamicReact(markdoc.transform(markdoc.parse(replacedLinks)), React, {});
}

const RecordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
`;

const StyledHeading = styled(Heading)`
  margin: 0 !important;
  a {
    display: flex;
    height: 100%;

    svg {
      margin: auto 0 !important;
      visibility: visible;
    }
  }
`;

const Record = styled.div<{ isPreviousRelease?: boolean; isNextRelease?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  gap: 16px;

  ${(props) =>
    props.isNextRelease &&
    `
    padding: 16px 26px 16px 26px;
  `}

  ${(props) =>
    props.isPreviousRelease &&
    `
    border-bottom: 1px solid var(--border-color-primary);
  `}
`;

const TagsGroup = styled.span`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const BaseTag = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  height: 26px;
  border: 1px solid var(--border-color-primary);
  border-radius: 4px;
  padding: 1px 8px;
  font-size: var(--font-size-base);
  line-height: 22px;

  span {
    color: var(--text-color-primary);
  }
`;

const ProductTag = styled(BaseTag)`
  gap: 4px;

  svg {
    height: 14px;
    width: 14px;
    visibility: visible !important;
  }

  span {
    font-weight: 400;
  }
`;

const VersionTag = styled(BaseTag)`
  span {
    font-weight: 500;
  }
`;

// Combined NextTag and LatestTag into a single MonoTag component since they share the same styles
const MonoTag = styled(BaseTag)`
  span {
    font-family: 'SF Mono';
    font-weight: 600;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DateTag = styled.div`
  color: var(--text-color-secondary);
  font-size: var(--font-size-base);
  font-weight: initial;
  line-height: 20px;
`;

const SectionTitle = styled.h3`
  font-weight: 600;
  font-size: var(--font-size-lg);
  line-height: 24px;
  color: var(--text-color-primary);
  margin: 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0 !important;
  margin: 0 !important;
`;

const ListItem = styled.li`
  position: relative;
  padding-left: 24px;
  margin-bottom: 8px;
  font-size: var(--font-size-base);
  line-height: 20px;
  color: var(--text-color-secondary);

  &:before {
    content: '';
    position: absolute;
    left: 8px;
    top: 8px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--text-color-secondary);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionHeader = styled.h2`
  font-weight: 600;
  font-size: var(--font-size-xl);
  line-height: 28px;
  color: var(--text-color-primary);
  margin: 0;
`;
