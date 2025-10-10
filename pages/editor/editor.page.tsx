import * as React from 'react';
import EditorPage from '@redocly/marketing-pages/pages/editor/editor.page.js';

export const frontmatter = {
  seo: {
    title: 'Swagger Editor',
    description: 'Edit and Preview Openapi/Swagger Documentation',
  },
  slug: '/editor',
  footer: {
    hide: true,
  },
};

export default function EditorPageWrapper() {
  return <EditorPage />;
}
