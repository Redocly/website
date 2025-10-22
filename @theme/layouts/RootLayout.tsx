import React from 'react';

import type { JSX } from 'react';

import { Navbar } from '@redocly/theme/components/Navbar/Navbar';
import { Footer } from '@redocly/theme/components/Footer/Footer';
import { SkipContent } from '@redocly/theme/components/SkipContent/SkipContent';
import { AIAssistantButton } from '@redocly/theme/components/Buttons/AIAssistantButton';
import { useThemeHooks } from '@redocly/theme/core/hooks';

export type LayoutConfig = {
  children: React.ReactNode;
};

export function RootLayout({ children }: LayoutConfig): JSX.Element {
  const { useSearch } = useThemeHooks();
  const { askAi } = useSearch();
  
  const path = window.location.pathname;
  const isDocsPage = path.startsWith('/docs');

  return (
    <div data-component-name="layouts/RootLayout">
      <SkipContent />
      <Navbar />
      {children}
      <Footer />
      {askAi && isDocsPage && <AIAssistantButton />}
    </div>
  );
}
