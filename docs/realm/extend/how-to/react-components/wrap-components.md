# Customize theme components

To customize an existing theme component, you can override the component by mirroring the original import path.
Overriding a component ensures that the updated version is used consistently across the entire site.
This approach is especially useful for applying design updates or behavior changes across the entire documentation without modifying each usage manually.

Since components are imported directly from the theme, your replacement must follow the same file structure.

For example, if the component is imported like this:

```tsx
import Admonition from '@redocly/theme/components/Admonition/Admonition';
```

Place your custom component in the following structure:

```treeview
@theme/
└── components/
    └── Admonition/
        └── Admonition.tsx
```

If the file structure matches the import path, the theme automatically uses your version of the component instead of the default one.

## Example

```tsx {% title="Admonition.tsx" %}
import React from 'react';

import { Admonition as Original } from '@redocly/theme/components/Admonition/Admonition';

export const Admonition = (props) => {
  return <Original {...props} className="my-admonition" />;
};
```

Now, every time the `Admonition` component is used — whether on pages or in other components — the customized version renders automatically.

## Resources

- Learn how to use the customized components in [Components usage tutorial](./use-in-react-page.md).
- Discover components you can customize in [List of customizable components](./list/index.md).
- Discover icons you can customize in [List of customizable icons](./list/icons.md).