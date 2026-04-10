# `link` resolver

The `link` resolver transforms file paths into proper route slugs or static asset URLs.
Use it for handling navigation links, image sources, and other file references.

## Schema definition

```typescript
export const tags: Record<string, Schema> = {
  card: {
    render: 'Card',
    attributes: {
      title: {
        type: String
      },
      to: {
        type: String,
        resolver: 'link'
      },
      icon: {
        type: String,
        resolver: 'link'
      }
    },
  }
}
```

### Usage examples

**Navigation links:**
```markdoc {% process=false %}
{% card to="../file.md" icon="/images/icon.png" /%}
```

**Relative paths:**
```markdoc {% process=false %}
{% card to="./getting-started/installation.md" /%}
```

**Absolute paths:**
```markdoc {% process=false %}
{% card to="/docs/api-reference" /%}
```

**Static assets:**
```markdoc {% process=false %}
{% card icon="/static/images/logo.svg" /%}
```

## What it does

The `link` resolver:
- converts relative file paths to their corresponding route slugs
- resolves static assets to their final URLs
- validates that referenced files exist
- handles both relative and absolute paths
- supports query parameters and hash fragments

## Handle errors

The `link` resolver provides comprehensive error handling:

- **File Not Found**: Throws descriptive errors when referenced files don't exist.
- **Invalid Paths**: Validates path formats and provides helpful error messages.
- **Build-time Validation**: All errors are caught during the build process.
