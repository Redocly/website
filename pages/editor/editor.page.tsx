import * as React from 'react';
import EditorPage from '@redocly/marketing-pages/pages/editor/editor.page.js';
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

export default function EditorPageWrapper() {
  const languageService = React.useMemo(() => new LanguageServerService(), []);
  return <EditorPage languageService={languageService} />;
}