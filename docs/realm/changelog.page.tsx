// @ts-ignore eslint-disable-next-line
import * as React from 'react';
import styled from 'styled-components';

import { DocumentationLayout } from '@redocly/theme/layouts/DocumentationLayout';
import { Markdown } from '@redocly/theme/components/Markdown/Markdown';
import { Heading } from '@redocly/theme/markdoc/components/Heading/Heading';
import { Dropdown } from '@redocly/theme/components/Dropdown/Dropdown';
import { DropdownMenu } from '@redocly/theme/components/Dropdown/DropdownMenu';
import { DropdownMenuItem } from '@redocly/theme/components/Dropdown/DropdownMenuItem';
import { SearchInput } from '@redocly/theme/components/Search/SearchInput';
import { CheckboxIcon } from '@redocly/theme/icons/CheckboxIcon/CheckboxIcon';
import { Button } from '@redocly/theme/components/Button/Button';

import { HighlightContext } from './@theme/_components/Highlight';
import { ChangelogSection, SectionHeader, matchesSearch } from './@theme/_components/ChangelogSection';
import { NextReleases } from './@theme/_components/NextReleases';
import { hasChanges, type ChangelogEntry } from './@theme/_utils/changelog';
import { RssSubscription } from './@theme/_components/RssSubscription';

// @ts-ignore
import changelogData from './changelogs.yaml';

export enum CHANGE_TYPE {
  minor = 'minor',
  patch = 'patch',
}

export const SHORT_NAMES = {
  '@redocly/realm': 'Realm',
  '@redocly/reef': 'Reef',
  '@redocly/revel': 'Revel',
  '@redocly/redoc': 'Redoc',
  reunite: 'Reunite',
  // TODO: uncomment before first replay release
  // replay: 'Replay',
}

type ShortNameValues = typeof SHORT_NAMES[keyof typeof SHORT_NAMES];

const DEFAULT_FILTERS = ['Realm', 'Reunite'];
const DEFAULT_ITEMS_TO_RENDER = 20;

interface NextChangelogItem {
  record: ChangelogEntry;
  version: string;
}

interface ChangelogWithDeps {
  record: ChangelogEntry;
  packageName: string;
  version: string;
}

interface ProcessedChangelogs {
  changelogsWithResolvedDeps: ChangelogWithDeps[];
  nextChangelogs: Record<string, NextChangelogItem[]>;
  latestReleases: ChangelogWithDeps[];
}

export const frontmatter = {
  seo: {
    title: 'Redocly Changelog',
  },
};

export default function Changelog() {
  const changelogs = changelogData as Record<string, Record<string, ChangelogEntry>>;

  // Process changelogs and next changelogs
  const { changelogsWithResolvedDeps, nextChangelogs, latestReleases }: ProcessedChangelogs = React.useMemo<ProcessedChangelogs>(() => {
    const resolved: ChangelogWithDeps[] = [];
    const latest: ChangelogWithDeps[] = [];
    
    const nextChangelogs: Record<string, NextChangelogItem[]> = {
      '@redocly/realm': [],
      '@redocly/reef': [],
      '@redocly/revel': [],
      '@redocly/redoc': [],
    };

    for (const packageName of Object.keys(changelogs)) {
      const records = Object.entries(changelogs[packageName])
      const sortedRecords = records.sort((a, b) => b[1].timestamp - a[1].timestamp);
      
      let latestRelease: string | null = null;

      for (const [version, record] of sortedRecords) {
        const isNextVersionChangelog = isNextVersion(version);
        const resolvedRecord = resolveDepsDeep(record);

        if (!hasChanges(resolvedRecord)) continue; // Skip if resolved record has no changes

        if (!isNextVersionChangelog) {
          if (!latestRelease) {
            latestRelease = version;
            latest.push({
              record: resolvedRecord,
              packageName,
              version,
            });
          }
        } else {
          // Skip next versions that are less than or equal to latest stable release
          if (latestRelease && compareVersions(version, latestRelease) <= 0) {
            continue;
          }
          nextChangelogs[packageName]?.push({
            record: resolvedRecord,
            version,
          });
        }

        if (!isNextVersionChangelog) {
          resolved.push({
            record: resolvedRecord,
            packageName,
            version,
          });
        }
      }
    }
    
    /**
     * Processes next release changelogs by:
     * 1. Sorting items by their next version number
     * 2. For each item, accumulates all changes from previous next versions
     * 3. Combines current item changes with all previous changes to show full changelog
     * 
     * Example:
     * next.1: [Change A]
     * next.2: [Change B]
     * next.3: [Change C]
     * 
     * Will display as:
     * next.1: [Change A]
     * next.2: [Change B, Change A]
     * next.3: [Change C, Change B, Change A]
     */
    const accumulateNextVersionChanges = (items: NextChangelogItem[]): NextChangelogItem[] => {
      const sortedItems = [...items].sort((a, b) => 
        parseInt(a.version.split('next.')[1]) - parseInt(b.version.split('next.')[1])
      );

      return items.map(item => {
        const itemIndex = sortedItems.findIndex(i => i.version === item.version);
        const allChanges = [item, ...sortedItems.slice(0, itemIndex).reverse()];
        
        return {
          ...item,
          record: {
            ...item.record,
            changes: {
              minor: [...new Set(allChanges.flatMap(i => i.record.changes.minor))],
              patch: [...new Set(allChanges.flatMap(i => i.record.changes.patch))],
            }
          }
        };
      });
    };

    return {
      changelogsWithResolvedDeps: resolved,
      nextChangelogs: Object.fromEntries(
        Object.entries(nextChangelogs).map(([pkg, items]) => [pkg, accumulateNextVersionChanges(items)])
      ),
      latestReleases: latest,
    };
  }, [changelogs]);

  // Filter out latest releases from previous releases list
  const previousReleases = React.useMemo(() => {
    return changelogsWithResolvedDeps
      .filter(item => !latestReleases.some(
        latest => latest.packageName === item.packageName && latest.version === item.version
      ))
      .sort((a, b) => b.record.timestamp - a.record.timestamp);
  }, [changelogsWithResolvedDeps, latestReleases]);

  const [packages, setPackages] = React.useState<ShortNameValues[]>(DEFAULT_FILTERS);
  const [searchTerm, setSearchTerm] = React.useState('');

  const [itemsToRender, setItemsToRender] = React.useState(DEFAULT_ITEMS_TO_RENDER);

  React.useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const recordIdx = filteredChangelogs.findIndex(({ packageName, version }) => {
      return hash === `#${(SHORT_NAMES[packageName] || packageName) + '@' + version}`;
    });

    setItemsToRender(Math.max(DEFAULT_ITEMS_TO_RENDER, recordIdx + 5));
    setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const filteredChangelogs = React.useMemo(() => {
    return changelogsWithResolvedDeps.filter(({ packageName, version, record }) => {
      if (!packages.includes(SHORT_NAMES[packageName] || packageName)) {
        return false;
      }
      return matchesSearch(searchTerm, { 
        packageName, 
        version, 
        record,
        isNext: isNextVersion(version)
      });
    });
  }, [packages, changelogsWithResolvedDeps, searchTerm]);

  function resolveDepsDeep(entry: ChangelogEntry, seen: string[] = []): ChangelogEntry {
    const resolved = { ...entry };
    resolved.changes = { ...entry.changes };

    if (Object.keys(entry?.dependencies || []).length > 0) {
      for (const [depPackage, depVersion] of Object.entries(entry.dependencies)) {
        if (seen.includes(depPackage)) {
          continue;
        }

        const normPackage = depPackage === '@redocly/portal' ? '@redocly/realm' : depPackage;
        const depEntry = changelogs[normPackage]?.[depVersion];

        // If timestamp is different, it means the dependency was updated in a previous release, so no need to include it again
        if (!depEntry || depEntry.timestamp !== entry.timestamp) continue;

        const resolvedDep = resolveDepsDeep(depEntry, [...seen, depPackage]);

        resolved.changes.minor = resolved.changes.minor.concat(resolvedDep.changes.minor);
        resolved.changes.patch = resolved.changes.patch.concat(resolvedDep.changes.patch);
      }
    }
    resolved.changes.minor = Array.from(new Set(resolved.changes.minor));
    resolved.changes.patch = Array.from(new Set(resolved.changes.patch));
    return resolved;
  }

  function isNextVersion(version: string) {
    return version.includes('-next');
  }

  function compareVersions(nextVersion: string, stableVersion: string): number {
    const nextBase = nextVersion.split('-next')[0];
    return nextBase.localeCompare(stableVersion, undefined, { numeric: true });
  }

  return (
    <HighlightContext.Provider value={[searchTerm]}>
      <Wrapper>
        <DocumentationLayout tableOfContent={null} feedback={null}>
          <Markdown>
          <HeaderSection>
              <CustomHeading level={1} id="changelog">
                Changelog
              </CustomHeading>
              <RssSubscription initialSelectedProducts={packages} />
            </HeaderSection>
            <ControlsWrap>
              <Dropdown
                closeOnClick={false}
                withArrow
                trigger={<Button variant="outlined">Filter Products</Button>}
              >
                <DropdownMenu>
                  {Object.values(SHORT_NAMES).map((shortName) => (
                    <DropdownMenuItem
                      content={shortName}
                      key={shortName}
                      prefix={<CheckboxIcon checked={packages.includes(shortName)} />}
                      onAction={() => {
                        setItemsToRender(DEFAULT_ITEMS_TO_RENDER);
                        setPackages((prev) => {
                          if (prev.includes(shortName)) {
                            if (prev.length === 1) {
                              return prev;
                            }
                            return prev.filter((item) => item !== shortName);
                          }
                          return [...prev, shortName];
                        });
                      }}
                    />
                  ))}
                </DropdownMenu>
              </Dropdown>
              <SearchInput
                placeholder="Search changelog"
                value={searchTerm}
                onChange={(value) => {
                  setSearchTerm(value);
                  setItemsToRender(DEFAULT_ITEMS_TO_RENDER);
                }}
                isLoading={false}
              />
            </ControlsWrap>

            <NextReleases 
              nextChangelogs={nextChangelogs}
              packages={packages}
            />

            {latestReleases.length > 0 && (
              <ChangelogSection 
                items={latestReleases} 
                packages={packages} 
                isLatestRelease={true}
              >
                {(filteredItems) => filteredItems.length > 0 && (
                  <LatestReleaseSection>
                    <SectionHeader>Latest release</SectionHeader>
                    {filteredItems}
                  </LatestReleaseSection>
                )}
              </ChangelogSection>
            )}

            {previousReleases.length > 0 && (
              <ChangelogSection 
                items={previousReleases} 
                packages={packages} 
                itemsToRender={itemsToRender}
                isPreviousRelease={true}
              >
                {(filteredItems) => filteredItems.length > 0 && (
                  <PreviousReleasesSection>
                    <SectionHeader>Previous releases</SectionHeader>
                    {filteredItems}
                  </PreviousReleasesSection>
                )}
              </ChangelogSection>
            )}

            {filteredChangelogs.length > itemsToRender && (
              <ShowMoreSection>
                <Button onClick={() => setItemsToRender((prev) => prev + 20)}>
                  Load more
                </Button>
              </ShowMoreSection>
            )}
          </Markdown>
        </DocumentationLayout>
      </Wrapper>
    </HighlightContext.Provider>
  );
}

const Wrapper = styled.div`
  [data-component-name='Breadcrumbs/Breadcrumb'] {
    display: none;
  }

  [data-component-name='Markdown/Markdown'] {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  [data-component-name='Dropdown/Dropdown'] {
    button + div {
      width: 100%;
    }
    ul {
      width: 100%;
      padding: var(--dropdown-menu-padding);
    }
  }

  .tag-product-realm,
  .tag-product-reunite,
  .tag-product-reef,
  .tag-product-revel,
  .tag-product-redoc {
    border-radius: 4px;
    color: white;
    border: 0;
    gap: 0;
    text-transform: inherit;
  }

  .tag-product-realm {
    background: linear-gradient(90deg, #1677ff 0%, #08c7e0 100%);
  }

  .tag-product-reunite {
    background: linear-gradient(134deg, #207dff 0%, #9461ff 91.65%);
  }

  .tag-product-reef {
    background: #a45cff;
  }

  .tag-product-revel {
    background: #735cff;
  }

  .tag-product-redoc {
    background: linear-gradient(270deg, #1677ff 0%, #30a9ff 100%);
  }

  .tag-version {
    background-color: transparent;
    border: 1px solid var(--text-color-primary);
    border-radius: 4px;
    gap: 0;
    text-transform: inherit;
  }
`;

const ControlsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 12px;
  flex-wrap: wrap;

  [data-component-name='Search/SearchInput'] {
    max-width: 250px;
    border: 1px solid var(--border-color-primary);
    border-radius: 4px;
    height: 34px;

    input {
      background: transparent;
    }
  }
`;

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

const LatestReleaseSection = styled.div`
  border-bottom: 1px solid var(--border-color-primary);
`;

const PreviousReleasesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const CustomHeading = styled(Heading)`
  margin-top: 0 !important;
  margin-bottom: 0 !important;
`;
