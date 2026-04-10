# `rawContent` resolver

The `rawContent` resolver loads the raw content of a file and makes it available as an attribute in your component.

## Schema definition

```typescript
export const tags: Record<string, Schema> = {
  codeBlock: {
    render: 'CodeBlock',
    attributes: {
      source: {
        type: String,
        resolver: 'rawContent'
      }
    },
  }
}
```

### Usage examples

**Loading text files:**
```markdoc {% process=false %}
{% codeBlock source="../config.json" /%}
```

**Loading configuration files:**
```markdoc {% process=false %}
{% codeBlock source="./settings.yaml" /%}
```

**Loading code snippets:**
```markdoc {% process=false %}
{% codeBlock source="../examples/hello-world.js" /%}
```

## What it does

The `rawContent` resolver:
- reads the entire content of the specified file
- stores the content in an attribute with the suffix `RawContent`
- validates that the file exists before attempting to read it
- supports both relative and absolute paths
- works with any text-based file format

## Handle errors

The `rawContent` resolver provides comprehensive error handling:

- **File Not Found**: Throws descriptive errors when referenced files don't exist.
- **Build-time Validation**: All errors are caught during the build process.
