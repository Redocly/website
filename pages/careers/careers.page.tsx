import * as React from 'react';

import Page from '@redocly/marketing-pages/pages/careers/careers.page.js';
import { positions } from './positions';

export const frontmatter = {
  seo: {
    title: 'Careers',
  },
  slug: '/careers',
};

export default function() {
  return <Page positions={positions} />
}