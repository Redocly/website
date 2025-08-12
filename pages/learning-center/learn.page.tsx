import * as React from 'react';

import Page from '@redocly/marketing-pages/pages/learning-center/learn.page.js';
import { cards } from './cards';

export const frontmatter = {
  seo: {
    title: 'Learn',
  },
  slug: '/learn',
};

export default function() {
  return <Page cards={cards} />
}