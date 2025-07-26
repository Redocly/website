---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `metadataGlobs`

Configure glob patterns to apply metadata to specific files or directories. This metadata is used by features like search, catalog, and scorecard for content categorization.

## How it works

The `metadataGlobs` option lets you define metadata properties for files matching specific patterns:

- File-specific metadata takes precedence over metadata applied through glob patterns
- More specific glob patterns take precedence over broader patterns

## Examples

### Configuration options

You can target a file, folder, or every file.
The metadata takes a key/value format and you can supply one or more pairs of data.

```yaml
metadataGlobs:
  'foo/bar.md':       # Apply metadata only to the bar.md file
    property: Bar 
  'bar/**':           # Apply metadata to all files inside the bar folder
    property: Foo 
  '**':               # Apply metadata to all files
    property: Foo Bar
    owner: Redocly
```

### Real-world example

Here's how we use `metadataGlobs` on our own website to categorize content for search and navigation:

```yaml
metadataGlobs:
  'blog/**':
    redocly_category: Blog
  'learn/**':
    redocly_category: Learn
```

This configuration applies the `redocly_category: Blog` metadata to all files in the `blog` directory and `redocly_category: Learn` to all files in the `learn` directory.
These categories help organize content in search results.

## Resources

- [Configure search facets](../navigation/search/configure-search-facets.md)
- [Catalog](./catalog-classic.md)
- [Scorecard](./scorecard.md)