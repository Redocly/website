import * as React from 'react';
import Page from '@redocly/marketing-pages/pages/editor-preview/editor-preview.page.js';
import { RedocStandalone } from '@redocly/api-docs/lib/RedocStandalone.js';
import { safeSlugify } from '@redocly/api-docs/lib/utils/string.js';

export default function PreviewRoute() {
  const [isAllowed, setIsAllowed] = React.useState(false);

  React.useEffect(() => {
    // Only allow rendering when embedded in an iframe
    if (typeof window !== 'undefined') {
      const embedded = window.top !== window.self;
      setIsAllowed(embedded);
      if (!embedded) {
        // If accessed directly, navigate away (e.g., to home)
        try {
          window.location.replace('/');
        } catch (_e) {
          // noop
        }
      }
    }
  }, []);

  if (!isAllowed) return null;

  return (
    <Page
      RedoclyOpenAPIDocs={RedocStandalone}
      safeSlugify={safeSlugify}
    />
  );
};
