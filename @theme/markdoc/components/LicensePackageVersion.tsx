import * as React from 'react';
import { licenses } from './LicensesTable';

export function LicensesPackageVersion({
  content,
}: {
  content: {
    licenseName: string;
    code: string;
  };
}) {
  return (
    <>
      <code>
        {content.code}
        {licenses[content.licenseName].packageVersion}
      </code>
    </>
  );
}
