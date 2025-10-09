import * as React from 'react';
import Page from '@redocly/marketing-pages/pages/editor/editor.page.js';
import { LanguageServerService } from './service/languageServerService';

export const frontmatter = {
  seo: {
    title: 'Redocly Editor',
  },
  slug: '/editor',
  footer: {
    hide: true,
  },
};

export default function EditorPage() {
  const languageService = React.useMemo(() => new LanguageServerService(), []);
  console.log("languageService", languageService);
  return <Page languageService={languageService} />;
};