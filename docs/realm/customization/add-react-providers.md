---
products:
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Add custom React providers

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

This topic explains how to make your own React providers available on every page of your project by ejecting the `CustomContexts` component.
Use it to provide a component library theme, a query client, feature flags, or any other value your custom components read from React context.

The `RootLayout` renders `CustomContexts` around the navbar, the page content, and the footer.
By default the component renders its children unchanged, so ejecting it has no effect until you add your providers.
Eject the [`RootLayout`](./eject-root-layout.md) only when you need to add an element to every page or change the element that wraps the page.

## Eject the `CustomContexts` component

{% tabs %}

  {% tab label="Reunite" %}
  To eject the `CustomContexts` component in Reunite:

  1. In the `Theme components` panel, navigate to the `layouts` folder.
  1. Click the eject icon next to the `CustomContexts.tsx`.

  {% /tab %}

  {% tab label="CLI" %}

  To eject the `CustomContexts` component locally, run the following command:

  ```bash
  npx @redocly/cli eject component 'layouts/CustomContexts.tsx'
  ```
  {% /tab %}

{% /tabs %}

Reunite and the CLI put the ejected component in the `@theme/layouts` folder.
It looks like the following:

```tsx {% title="@theme/layouts/CustomContexts.tsx" %}
import React from 'react';

import type { JSX } from 'react';

type CustomContextsProps = React.PropsWithChildren<{}>;

// Eject this component to wrap every page in custom React context providers.
export function CustomContexts({ children }: CustomContextsProps): JSX.Element {
  return <>{children}</>;
}
```

## Add providers to the ejected component

Wrap `children` with the providers you need.
Keep the component name and the `children` prop, because the `RootLayout` renders the component with the page content as its children.

The following example provides a `FeatureFlagsContext` and a hook that reads it:

```tsx {% title="@theme/layouts/CustomContexts.tsx" %}
import React, { createContext, useContext } from 'react';

import type { JSX } from 'react';

type CustomContextsProps = React.PropsWithChildren<{}>;

type FeatureFlags = {
  showPricingCalculator: boolean;
};

const FeatureFlagsContext = createContext<FeatureFlags>({ showPricingCalculator: false });

export function useFeatureFlags() {
  return useContext(FeatureFlagsContext);
}

export function CustomContexts({ children }: CustomContextsProps): JSX.Element {
  return (
    <FeatureFlagsContext.Provider value={{ showPricingCalculator: true }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}
```

Any [React page](./create-react-page.md), [Markdoc tag component](./build-markdoc-tags.md), or other ejected component can then read the value:

```tsx {% title="@theme/markdoc/components/PricingCalculator.tsx" %}
import React from 'react';

import { useFeatureFlags } from '../../layouts/CustomContexts';

export function PricingCalculator() {
  const { showPricingCalculator } = useFeatureFlags();

  if (!showPricingCalculator) {
    return null;
  }

  return <div>Pricing calculator</div>;
}
```

Providers from third-party libraries, such as a component library `ThemeProvider`, work the same way.
Install the library in your project before you import it.

## Resources

- **[Customize the root layout](./eject-root-layout.md)** - Eject the `RootLayout` when you need to add an element to every page or change the element that wraps the page
- **[Import an NPM library](./import-npm-library.md)** - Add third-party packages, such as component libraries, to your project
- **[Component ejection guide](./eject-components/index.md)** - Learn the fundamentals of ejecting and customizing built-in components
- **[Customization](./index.md)** - Discover customizable components and customization options for your project
