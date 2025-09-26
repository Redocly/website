import * as React from 'react';
import Page from '@redocly/marketing-pages/pages/editor-preview/editor-preview.page.js';
import { RedoclyOpenAPIDocs } from '@redocly/openapi-docs';

export default function PreviewRoute() {
  return <Page RedoclyOpenAPIDocs={RedoclyOpenAPIDocs} />;
};
