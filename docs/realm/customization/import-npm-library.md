# Import an external NPM library

This topic explains how to incorporate external React component libraries from NPM into your project.
You'll learn how to install and import UI components from popular React libraries.

## Install the library

### Install the library locally

Use npm to install the external library.
For example, to install React Icons, use the following command:

```bash
npm install react-icons
```

### Install the library in Reunite

If you are working in Reunite, you can install the library by adding it to the `package.json` file.

```json
{
  // ...
  "dependencies": {
    // existing dependencies
    "react-icons": "^4.11.0"
  }
}
```

Follow the steps in [Run a specific version in Reunite](../get-started/upgrade-realm-version.md#run-a-specific-version-in-reunite)
to create a `package.json` file if you don't have one already.

## Import and use components

After installation, you can import components directly in your React files, as in the following example:

```tsx
import * as React from 'react';
import { FaHeart, FaThumbsUp } from 'react-icons/fa';

export function MyComponent() {
  return (
    <div>
      <FaHeart color="red" size={24} />
      <FaThumbsUp color="blue" size={24} />
    </div>
  );
}
```

## Usage with Markdoc

{% admonition type="info" %}
See [Build markdoc tags](./build-markdoc-tags.md) for more information about how to register
and use custom Markdoc tags.
{% /admonition %}

To use external components within Markdoc, you'll need to register them in your schema, as in the following example:

```ts {% title="@theme/markdoc/schema.ts" %}
// @theme/markdoc/schema.ts
import type { Schema } from '@markdoc/markdoc';

export const tags: Record<string, Schema> = {
  // ... existing tags ...
  reactIcon: {
    render: 'ReactIcon',
    attributes: {
      name: {
        type: 'string',
        required: true,
      },
      size: {
        type: 'number',
        default: 24,
      },
      color: {
        type: 'string',
        default: 'currentColor',
      },
    },
  },
};
```

You also need to export your components as in the following example:

```tsx {% title="@theme/markdoc/components.ts" %}
import * as React from 'react';
import { FaHeart, FaThumbsUp } from 'react-icons/fa';

export function ReactIcon({ name, size = 24, color = 'currentColor' }) {
  const icons = {
    heart: FaHeart,
    thumbsUp: FaThumbsUp,
  };

  const IconComponent = icons[name];
  return <IconComponent size={size} color={color} />;
}
```

You can use the icon component in your Markdoc files, as in the following example:

```markdoc {% process=false %}
{% reactIcon name="heart" color="red" /%}
{% reactIcon name="thumbsUp" color="blue" size=32 /%}
```

## Resources

- **[Build custom Markdoc tags](./build-markdoc-tags.md)** - Create reusable Markdoc components using imported NPM libraries for enhanced functionality
- **[Built-in icon components](../content/markdoc-tags/icon.md)** - Use Redocly's built-in icon system and learn patterns for extending it with external icon libraries