import styled from 'styled-components';
import * as React from 'react';

import apiReferenceDocsLicense from '../../../docs-legacy/api-reference-docs/assets/licenses.json';
import developerPortalLicense from '../../../docs-legacy/developer-portal/assets/licenses.json';

export const licenses = {
  'api-reference-docs': apiReferenceDocsLicense,
  'developer-portal': developerPortalLicense,
};

export function LicensesTable({ license }) {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <ColumnName> Project </ColumnName>
            <ColumnName> License </ColumnName>
          </tr>
        </thead>
        <tbody>
          {licenses[license].packages.map((pack) => (
            <tr key={pack.name}>
              <RowElement>
                {' '}
                {pack.repository ? (
                  <a href={pack.repository} target="_blank">
                    {pack.name}
                  </a>
                ) : (
                  pack.name
                )}{' '}
              </RowElement>
              <RowElement> {pack.license} </RowElement>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

const ColumnName = styled.th`
  background-color: var(--color-primary-main);
  padding: 8px;
  color: var(--secondary-color);
  text-align: left;
  margin-left: 3px;
  border: 1px solid var(--secondary-color);
`;

const RowElement = styled.td`
  padding: 8px;
  border-bottom: 1px solid rgb(228, 231, 235);
  border-right: 1px solid rgb(228, 231, 235);
  border-left: 1px solid rgb(228, 231, 235);
`;

const Table = styled.table`
  border-spacing: 0px;
`;
