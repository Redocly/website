---
products:
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Customize the root layout

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The `RootLayout` component renders the navbar, the page content, and the footer on every page of your project.
Eject it when you need to add an element to every page, or to change the element that wraps the page.

If you only need to add React providers, eject the [`CustomContexts`](./add-react-providers.md) component instead.
It is a smaller file, and your project keeps the updates Redocly makes to the layout.

## Before you eject

Most page-level changes have a simpler option:

- To show an announcement at the top of pages, use the [`banner`](../config/banner.md) option.
- To hide the navbar or the footer, on all pages or on one page, use [`navbar.hide`](../config/navbar.md) or [`footer.hide`](../config/footer.md).
- To change what the navbar or the footer contains, eject the `Navbar` or the `Footer` component.
- To change the content area of a page, use [custom page templates](./custom-page-templates.md).
- To add React providers, eject the [`CustomContexts`](./add-react-providers.md) component.

## Wrap the root layout

To add an element to every page, wrap the `RootLayout` instead of ejecting it.
Your project keeps the updates Redocly makes to the layout, and your file stays short.

Create the file yourself, and import the original component under a different name:

```tsx {% title="@theme/layouts/RootLayout.tsx" %}
import React from 'react';
import { RootLayout as OriginalRootLayout } from '@redocly/theme/layouts/RootLayout';

import { SupportButton } from '../components/SupportButton';

export function RootLayout(props: React.ComponentProps<typeof OriginalRootLayout>) {
  return (
    <>
      <OriginalRootLayout {...props} />
      <SupportButton />
    </>
  );
}
```

The `SupportButton` component now renders on every page.

Some components read browser state, such as `window` or `localStorage`.
Load those with the `dynamic` helper from `@redocly/theme` and the `ssr: false` option.
The component then renders only in the browser.

## Eject the root layout

Eject the `RootLayout` when you need to change the element that wraps the page, or the order of the parts inside it.

{% tabs %}

  {% tab label="Reunite" %}
  To eject the `RootLayout` in Reunite:

  1. In the `Theme components` panel, navigate to the `layouts` folder.
  1. Click the eject icon next to the `RootLayout.tsx`.

  {% /tab %}

  {% tab label="CLI" %}

  To eject the `RootLayout` locally, run the following command:

  ```bash
  npx @redocly/cli eject component 'layouts/RootLayout.tsx'
  ```
  {% /tab %}

{% /tabs %}

Reunite and the CLI put the ejected component in the `@theme/layouts` folder.
Keep the component name, and keep the `CustomContexts` component around the page.
If you remove `CustomContexts`, ejecting it has no effect on your project, because nothing renders it.

The following example adds a class to the element that wraps the page.
The class lets you style the landing page and the documentation pages differently:

```tsx {% title="@theme/layouts/RootLayout.tsx" %}
import React from 'react';
import { useLocation } from 'react-router';

import type { JSX } from 'react';

import { Navbar } from '@redocly/theme/components/Navbar/Navbar';
import { Footer } from '@redocly/theme/components/Footer/Footer';
import { SkipContent } from '@redocly/theme/components/SkipContent/SkipContent';
import { AIAssistantButton } from '@redocly/theme/components/Buttons/AIAssistantButton';
import { useThemeHooks } from '@redocly/theme/core/hooks';
import { CustomContexts } from '@redocly/theme/layouts/CustomContexts';

export type LayoutConfig = {
  children: React.ReactNode;
};

export function RootLayout({ children }: LayoutConfig): JSX.Element {
  const { useSearch } = useThemeHooks();
  const { askAi } = useSearch();
  const { pathname } = useLocation();

  return (
    <div
      data-component-name="layouts/RootLayout"
      className={pathname === '/' ? 'landing-page' : 'documentation-page'}
    >
      <CustomContexts>
        <SkipContent />
        <Navbar />
        {children}
        <Footer />
        {askAi && <AIAssistantButton />}
      </CustomContexts>
    </div>
  );
}
```

Add the styles for the two classes to your [theme stylesheet](../branding/customize-styles.md).

## Resources

- **[Add custom React providers](./add-react-providers.md)** - Eject the `CustomContexts` component when you only need to add providers
- **[Custom page templates](./custom-page-templates.md)** - Change the content area of a page instead of the whole layout
- **[Component ejection guide](./eject-components/index.md)** - Learn the fundamentals of ejecting and customizing built-in components
- **[Customization](./index.md)** - Discover customizable components and customization options for your project
