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
import { ArrowDownIcon } from '@redocly/theme/icons/ArrowDownIcon/ArrowDownIcon';
import { Button } from '@redocly/theme/components/Button/Button';
import { Link } from '@redocly/theme/components/Link/Link';
import { LoadMore } from '@redocly/theme/components/LoadMore/LoadMore';
import { Tag } from '@redocly/theme/components/Tag/Tag';
import { MARKDOWN_CLASS_NAME } from '@redocly/theme/core/constants';

// @ts-ignore
import licensesData from '../licenses.yaml';

interface LicenseEntry {
  name: string;
  license: string;
  repository: string;
}

interface LicensesFile {
  realmVersion: string;
  packages: LicenseEntry[];
}

const ITEMS_PER_PAGE = 100;

export const frontmatter = {
  seo: {
    title: 'Third-party licenses',
    description: 'Open-source packages included in Realm and their licenses.',
  },
};

export default function ThirdPartyLicenses() {
  const { realmVersion, packages } = licensesData as LicensesFile;

  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedLicenses, setSelectedLicenses] = React.useState<string[]>([]);
  const [itemsToRender, setItemsToRender] = React.useState(ITEMS_PER_PAGE);

  const searchedPackages = React.useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return packages;
    return packages.filter(
      (entry) =>
        entry.name.toLowerCase().includes(term) ||
        entry.license.toLowerCase().includes(term) ||
        entry.repository.toLowerCase().includes(term),
    );
  }, [packages, searchTerm]);

  const licenseCounts = React.useMemo(() => {
    const counts = new Map<string, number>();
    for (const entry of searchedPackages) {
      counts.set(entry.license, (counts.get(entry.license) ?? 0) + 1);
    }
    return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [searchedPackages]);

  const activeLicenses = selectedLicenses.filter((license) =>
    licenseCounts.some(([name]) => name === license),
  );

  const filteredPackages = activeLicenses.length
    ? searchedPackages.filter((entry) => activeLicenses.includes(entry.license))
    : searchedPackages;

  const resetPagination = () => setItemsToRender(ITEMS_PER_PAGE);

  const toggleLicense = (license: string) => {
    resetPagination();
    setSelectedLicenses((prev) =>
      prev.includes(license) ? prev.filter((item) => item !== license) : [...prev, license],
    );
  };

  const filterLabel =
    activeLicenses.length === 0
      ? 'Filter by license'
      : activeLicenses.length === 1
        ? activeLicenses[0]
        : `${activeLicenses.length} licenses`;

  return (
    <Wrapper>
      <DocumentationLayout tableOfContent={null}>
        <Markdown>
          <Heading level={1} id="third-party-licenses">
            Third-party licenses
          </Heading>
          <p>
            Realm is built on open-source software. This page lists the third-party packages
            included in Realm {realmVersion} and its products, together with their licenses and
            source repositories. It covers the latest stable release and is regenerated
            automatically with every stable release.
          </p>

          <Controls>
            <SearchInput
              placeholder="Search packages"
              value={searchTerm}
              onChange={(value) => {
                setSearchTerm(value);
                resetPagination();
              }}
              isLoading={false}
            />
            <Dropdown
              closeOnClick={false}
              withArrow
              trigger={
                <Button variant="outlined" data-active={activeLicenses.length > 0}>
                  {filterLabel}
                </Button>
              }
            >
              <DropdownMenu>
                {licenseCounts.map(([license, count]) => (
                  <DropdownMenuItem
                    key={license}
                    content={license}
                    prefix={<CheckboxIcon checked={activeLicenses.includes(license)} />}
                    suffix={<Count>{count}</Count>}
                    onAction={() => toggleLicense(license)}
                  />
                ))}
              </DropdownMenu>
            </Dropdown>
            {(activeLicenses.length > 0 || searchTerm) && (
              <Button
                variant="text"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLicenses([]);
                  resetPagination();
                }}
              >
                Clear
              </Button>
            )}
          </Controls>

          <Summary>
            {filteredPackages.length === packages.length
              ? `${packages.length} packages`
              : `${filteredPackages.length} of ${packages.length} packages`}
          </Summary>

          <div className="md-table-wrapper">
            <table className={MARKDOWN_CLASS_NAME}>
              <thead>
                <tr>
                  <th>Package</th>
                  <th>License</th>
                </tr>
              </thead>
              <tbody>
                {filteredPackages.slice(0, itemsToRender).map((entry) => (
                  <tr key={entry.name}>
                    <td>
                      {entry.repository ? (
                        <Link to={entry.repository} target="_blank" external>
                          {entry.name}
                        </Link>
                      ) : (
                        entry.name
                      )}
                    </td>
                    <td>
                      <Tag color="grey" variant="outline" textTransform="none">
                        {entry.license}
                      </Tag>
                    </td>
                  </tr>
                ))}
                {filteredPackages.length === 0 && (
                  <tr>
                    <td colSpan={2}>
                      <Empty>No packages match your search.</Empty>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredPackages.length > itemsToRender && (
            <LoadMore
              icon={<ArrowDownIcon />}
              onClick={() => setItemsToRender((prev) => prev + ITEMS_PER_PAGE)}
              disabled={false}
              blinking={false}
              label={`Load more (${filteredPackages.length - itemsToRender} remaining)`}
            />
          )}
        </Markdown>
      </DocumentationLayout>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  [data-component-name='Dropdown/Dropdown'] ul {
    max-height: 320px;
    overflow-y: auto;
    padding: var(--dropdown-menu-padding);
  }

  [data-component-name='Dropdown/Dropdown'] button[data-active='true'] {
    border-color: var(--color-primary-base);
    color: var(--color-primary-base);
  }

  .md-table-wrapper {
    margin-top: var(--spacing-xs);
  }

  table.${MARKDOWN_CLASS_NAME} td {
    vertical-align: middle;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin-top: var(--spacing-md);

  [data-component-name='Search/SearchInput'] {
    flex: 1;
    min-width: 240px;
    max-width: 360px;
    height: auto;
    gap: var(--search-trigger-gap);
    padding: var(--search-trigger-padding);
    border: var(--search-trigger-border-width) var(--search-trigger-border-style)
      var(--search-trigger-border-color);
    border-radius: var(--search-trigger-border-radius);
    background: var(--search-trigger-bg-color);
    color: var(--search-trigger-color);
    line-height: var(--search-trigger-line-height);

    &:hover,
    &:focus-within {
      border-color: var(--search-trigger-border-color-hover);
    }

    > svg {
      width: var(--search-trigger-icon-size);
      height: var(--search-trigger-icon-size);

      path {
        fill: var(--search-trigger-color);
      }
    }

    input {
      padding: 0;
      background: transparent;
      font-size: var(--font-size-base);
      line-height: var(--search-trigger-line-height);

      &::placeholder {
        color: var(--search-trigger-color);
      }
    }
  }
`;

const Count = styled.span`
  margin-left: auto;
  padding-left: var(--spacing-sm);
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
`;

const Summary = styled.p`
  margin: var(--spacing-xs) 0 0;
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
`;

const Empty = styled.div`
  padding: var(--spacing-md) 0;
  text-align: center;
  color: var(--text-color-secondary);
`;
