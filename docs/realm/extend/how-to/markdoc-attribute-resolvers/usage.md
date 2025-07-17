# Use advanced features

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
