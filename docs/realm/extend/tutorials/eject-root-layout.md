# Add custom React providers to the Root Layout


This topic explains how to add your own React providers to the `RootLayout`.
This is useful if you want to add a custom context provider to your app, for example, to provide a theme, query client, or other providers.

## Eject the `RootLayout`

### Eject the `RootLayout` locally

To eject the `RootLayout` run the following command:

```bash
npx @redocly/cli eject component 'layouts/RootLayout.tsx'
```

<!-- This is not available yet for everyone.

### Eject the `RootLayout` in Reunite

In Reunite, you can eject the `RootLayout` by using the new beta `Theme components` panel.
Navigate to the `layouts` folder and select eject icon next to the `RootLayout.tsx`.
-->

## Edit the ejected component

The ejected component is placed in the `@theme/layouts` folder.

You are free to edit the component as you see fit.
Make sure to keep the same component name.

### Wrap the component without changing the original

You can also wrap the component with your own providers without changing the original component.

To do this import the `RootLayout` with a different name in your `RootLayout.tsx`.

```tsx {% title="@theme//layouts/RootLayout.tsx" %}
import React from 'react';
import { RootLayout as OriginalRootLayout } from '@redocly/theme/layouts/RootLayout';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function RootLayout(props) {
  return (
    <QueryClientProvider client={queryClient}>
      <OriginalRootLayout {...props} />
    </QueryClientProvider>
  );
}
```

## Resources

- [Eject components](../how-to/eject-components)
