import * as React from 'react';
import styled from 'styled-components';

import { Link as SimpleLink } from '@redocly/theme/components/Link/Link';
import { H2Title } from '@redocly/marketing-pages/components/TypographyElements/TypographyElements.js';
import { breakpoints } from '@redocly/theme/core/utils';

export type DocsOverviewSectionInfo = {
  link: string;
  items: Array<{ title: string; description?: string; link: string; hash?: 'string' }>;
};

export type DocsOverviewInfo = {
  guides: DocsOverviewSectionInfo;
  configuration: DocsOverviewSectionInfo;
  resources: DocsOverviewSectionInfo;
  changelog: DocsOverviewSectionInfo;
};

export function DocsOverview({ info }: { info: DocsOverviewInfo }) {
  return (
    <>
      <H2Title color="var(--color-text-dimmed)">
        Guides <LinkItem to={info.guides.link}>See more →</LinkItem>
      </H2Title>
      <Group>
        {info.guides.items.map((i, idx) => (
          <Card key={idx} to={i.link}>
            <CardTitle>{i.title}</CardTitle>
            <p>{i.description}</p>
          </Card>
        ))}
      </Group>
      <Split>
        <Column>
          <H2Title color="var(--color-text-dimmed)" my={0}>
            Configuration
          </H2Title>
          {info.configuration.items.map((i, idx) => (
            <ColumnItem key={idx} to={i.link}>
              <ColumnItemTitle>{i.title}</ColumnItemTitle>
              <p>{i.description}</p>
            </ColumnItem>
          ))}
        </Column>
        <Column>
          <H2Title color="var(--color-text-dimmed)" my={0}>
            Resources
          </H2Title>
          {info.resources.items.map((i, idx) => (
            <ColumnItem key={idx} to={i.link}>
              <ColumnItemTitle>{i.title}</ColumnItemTitle>
              <p>{i.description}</p>
            </ColumnItem>
          ))}
        </Column>
      </Split>
      <H2Title color="var(--color-text-dimmed)" my={0}>
        Changelog <LinkItem to={info.changelog.link}>See more →</LinkItem>
      </H2Title>
      {info.changelog.items.map((i, idx) => (
        <ChangelogItem key={idx} to={i.link + i.hash}>
          {i.title} <Chevron />
        </ChangelogItem>
      ))}
    </>
  );
}

function Chevron() {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.58582 6.0003L1.29289 2.4956C0.902369 2.07996 0.902369 1.40608 1.29289 0.99044C1.68342 0.574801 2.31658 0.574801 2.70711 0.99044L6.70711 5.24768C6.90238 5.45551 7.00001 5.72791 7 6.0003C7.00001 6.27269 6.90238 6.54508 6.70711 6.75291L2.70711 11.0101C2.31658 11.4257 1.68342 11.4257 1.29289 11.0101C0.902369 10.5945 0.902369 9.9206 1.29289 9.50496L4.58582 6.0003Z"
        fill="#0044D4"
      />
      <path
        d="M1.29289 2.4956L1.1107 2.66679H1.1107L1.29289 2.4956ZM4.58582 6.0003L4.76802 6.17149L4.92886 6.0003L4.76802 5.82911L4.58582 6.0003ZM1.29289 0.99044L1.47509 1.16163H1.47509L1.29289 0.99044ZM2.70711 0.99044L2.52491 1.16163L2.70711 0.99044ZM6.70711 5.24768L6.8893 5.0765L6.70711 5.24768ZM7 6.0003L6.75 6.00029V6.00031L7 6.0003ZM6.70711 6.75291L6.8893 6.9241L6.70711 6.75291ZM2.70711 11.0101L2.8893 11.1813L2.70711 11.0101ZM1.29289 11.0101L1.47509 10.8389H1.47509L1.29289 11.0101ZM1.29289 9.50496L1.47509 9.67615H1.47509L1.29289 9.50496ZM1.1107 2.66679L4.40363 6.17149L4.76802 5.82911L1.47509 2.32442L1.1107 2.66679ZM1.1107 0.819254C0.629767 1.33111 0.629767 2.15493 1.1107 2.66679L1.47509 2.32442C1.17497 2.005 1.17497 1.48105 1.47509 1.16163L1.1107 0.819254ZM2.8893 0.819254C2.40004 0.29853 1.59996 0.29853 1.1107 0.819254L1.47509 1.16163C1.76688 0.851072 2.23312 0.851072 2.52491 1.16163L2.8893 0.819254ZM6.8893 5.0765L2.8893 0.819254L2.52491 1.16163L6.52491 5.41887L6.8893 5.0765ZM7.25 6.00031C7.25001 5.66907 7.13129 5.33405 6.8893 5.0765L6.52491 5.41887C6.67346 5.57697 6.75001 5.78674 6.75 6.00029L7.25 6.00031ZM6.8893 6.9241C7.13129 6.66655 7.25001 6.33152 7.25 6.00029L6.75 6.00031C6.75001 6.21386 6.67346 6.42362 6.52491 6.58172L6.8893 6.9241ZM2.8893 11.1813L6.8893 6.9241L6.52491 6.58172L2.52491 10.8389L2.8893 11.1813ZM1.1107 11.1813C1.59996 11.702 2.40004 11.702 2.8893 11.1813L2.52491 10.8389C2.23312 11.1495 1.76688 11.1495 1.47509 10.8389L1.1107 11.1813ZM1.1107 9.33378C0.629767 9.84563 0.629767 10.6694 1.1107 11.1813L1.47509 10.8389C1.17497 10.5195 1.17497 9.99557 1.47509 9.67615L1.1107 9.33378ZM4.40363 5.82911L1.1107 9.33378L1.47509 9.67615L4.76802 6.17149L4.40363 5.82911Z"
        fill="white"
      />
    </svg>
  );
}

const LinkItem = styled(SimpleLink)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none!important;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Card = styled(SimpleLink)`
  color: inherit !important;
  background: linear-gradient(180deg, #f4f8ff 0%, rgba(244, 248, 255, 0) 100%);
  /* Faint-Gray */

  border: 1px solid var(--border-color-secondary);
  text-decoration: none!important;
  box-sizing: border-box;
  border-radius: 8px;

  padding: 30px;

  margin-bottom: 15px;
  width: 100%;

  @media screen and (min-width: ${breakpoints.large}) {
    width: calc(33.33% - 20px);
  }

  &:hover {
    border: 1px solid var(--border-color-primary);
  }
`;

const CardTitle = styled.h3`
  && {
    font-size: 22px;
    line-height: 34px;
    color: #0044d4;
    margin: 0;
  }
`;

const Column = styled.div`
  flex: 1;
  margin: 15px;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  display: flex;
  flex-direction: column;
`;

const Split = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.medium}) {
    flex-direction: row;
  }
`;

const ColumnItem = styled(SimpleLink)`
  border-bottom: 1px solid rgba(0, 68, 212, 0.2);
  padding: 20px 0;
  margin: 5px 0;
  color: inherit !important;
  text-decoration: none!important;
`;

const ColumnItemTitle = styled.h4`
  font-size: 20px;
  line-height: 30px;
  color: #0044d4;
  margin: 0;
`;

const ChangelogItem = styled(SimpleLink)`
  display: block;
  background: #FFFFFF;
  border: 1px solid rgba(0, 68, 212, 0.2);
  box-sizing: border-box;
  border-radius: 8px;
  padding: 9px 20px;
  font-size: 18px;
  line-height: 28px;
  color: background: #0044D4;
  margin-bottom: 9px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-decoration: none!important;
`;
