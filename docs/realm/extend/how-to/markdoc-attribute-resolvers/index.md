# Built-in markdoc attribute resolvers

Custom Markdoc attribute resolvers define special attributes that are resolved during build time. 
Use this functionality to:
- transform file paths into proper slugs
- load file content

## Overview

As an alternative to custom types, you can now add `resolver: <type>` within your Markdoc schema attributes. 
Custom attribute resolvers are a cleaner and more intuitive way to handle dynamic content resolution.

Find a list of available attribute resolvers on the [Markdoc attribute resolvers page](./list/index.md).

## Step-by-step guide

Follow these steps to create a custom Markdoc tag that uses attribute resolvers in your project:

1. Set up your project structure

First, ensure you have the necessary files in your project:

```
your-project/
├── @theme/
│   ├── markdoc/
│   │   ├── schema.ts          # Your Markdoc schema
│   │   └── components.tsx     # Your React components
│   ├── components/
│   │   └── MyComponent.tsx    # Custom component
│── content/
│   └── example.md             # Content file
```

2. Create your React component

Create a React component that will receive the resolved attributes:

```typescript
// components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  content: string;
  link: string;
}

export function MyComponent({ title, content, link }: MyComponentProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      <a href={link}>Learn more</a>
    </div>
  );
}
```

3. Define a schema for your Markdoc tag

In your `markdoc/schema.ts` file, define the tag with attribute resolvers:

```typescript
// markdoc/schema.ts
import { Schema } from '@markdoc/markdoc';

export const tags: Record<string, Schema> = {
  myTag: {
    render: 'MyComponent',
    attributes: {
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        resolver: 'rawContent'
      },
      link: {
        type: String,
        resolver: 'link'
      }
    },
  }
};
```

4. Register your component

In your `markdoc/components.tsx` file, register your component:

```typescript
// markdoc/components.tsx
import { MyComponent } from '../components/MyComponent';

export const components = {
  MyComponent,
};
```

5. Use the tag in your content

Now you can use your component in Markdown files:

```markdoc {% process=false %}
{% myComponent 
  title="My Custom Component"
  content="../content/example.md"
  link="./getting-started.md"
/%}
```

6. Test and validate

1. **Build your project** to ensure the resolvers work correctly
2. **Check the resolved values** in your browser's developer tools
3. **Verify file paths** exist and are accessible
4. **Test with different path formats** (relative, absolute)

## Migrate from custom types

If you were previously using custom types for similar functionality, you can now simplify your schema:

**Before:**
```typescript
import { Link } from '@redocly/theme/markdoc/attributes/link';
import { RawContent } from '@redocly/theme/markdoc/attributes/raw-content';

export const tags: Record<string, Schema> = {
  card: {
    render: 'Card',
    attributes: {
      to: { type: Link },
      content: { type: RawContent }
    },
  }
}
```

**After:**
```typescript
export const tags: Record<string, Schema> = {
  card: {
    render: 'Card',
    attributes: {
      to: { type: String, resolver: 'link' },
      content: { type: String, resolver: 'rawContent' }
    },
  }
}
```

## Use advanced features

### Combine multiple resolvers

You can use multiple resolvers in a single component:

```typescript
export const tags: Record<string, Schema> = {
  featureCard: {
    render: 'FeatureCard',
    attributes: {
      title: {
        type: String,
        required: true
      },
      link: {
        type: String,
        resolver: 'link'
      },
      description: {
        type: String,
        resolver: 'rawContent'
      },
      icon: {
        type: String,
        resolver: 'link'
      }
    },
  }
}
```

### Resolve paths

Resolvers support various path formats:

- **Relative paths**: `../file.md`, `./config.yaml`
- **Absolute paths**: `/docs/api-reference`, `/static/images/logo.png`
- **File extensions**: Automatically handles different file types

## Follow best practices

1. Use descriptive attribute names: Choose clear names that indicate the purpose of the resolved content.
2. Validate file existence: Always ensure referenced files exist in your project structure.
3. Handle errors gracefully: Provide fallbacks or default values when possible.
4. Document dependencies: Keep track of which files your components depend on.

## See examples in practice

### Navigation component

```typescript
export const tags: Record<string, Schema> = {
  navLink: {
    render: 'NavLink',
    attributes: {
      label: { type: String, required: true },
      href: { type: String, resolver: 'link' },
      external: { type: Boolean, default: false }
    },
  }
}
```

```markdoc {% process=false %}
{% navLink label="Getting Started" href="./getting-started.md" /%}
{% navLink label="API Reference" href="/docs/api" /%}
```

### Content display component

```typescript
export const tags: Record<string, Schema> = {
  contentDisplay: {
    render: 'ContentDisplay',
    attributes: {
      title: { type: String, required: true },
      source: { type: String, resolver: 'rawContent' },
      language: { type: String, default: 'text' }
    },
  }
}
```

```markdoc {% process=false %}
{% contentDisplay title="Configuration Example" source="../examples/config.json" language="json" /%}
```

This approach provides a clean, maintainable way to handle dynamic content in your Markdoc components while ensuring proper validation and error handling.
