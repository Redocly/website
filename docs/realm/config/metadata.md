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
# `metadata`

Configure metadata properties for your project, APIs, and documentation files. Metadata is used for content categorization, search facets, catalog filtering, and scorecard functionality.

## How it works

The `metadata` option accepts an object with key-value pairs:
- Keys can be any string identifier
- Values can be any scalar value (string, number, boolean)
- Some metadata keys have special functionality (e.g., `redocly_category` for search facets)

Metadata can be defined in several ways, with the following priority (highest to lowest):
1. `x-metadata` extension in OpenAPI files
2. Front matter in Markdown files
3. `metadata` in the `redocly.yaml` configuration

## Options

{% table %}

- Option
- Type
- Description

---

- metadata
- object
- An object of key-value pairs. Keys can be any string, and values can be any scalar value.

{% /table %}

## Examples

### Basic metadata configuration

```yaml {% title="redocly.yaml" %}
metadata:
  owner: Redocly
  team: Documentation
  department: Engineering
  status: Published
```

### API-specific metadata

You can define metadata for specific APIs in your configuration:

```yaml {% title="redocly.yaml" %}
apis:
  museum:
    root: ./museum.yaml
    type: openapi
    metadata:
      owner: API Team
      category: eCommerce
      status: Beta
```

### Use the x-metadata extension in OpenAPI files

```yaml {% title="openapi.yaml" %}
openapi: 3.1.0
info:
  title: Museum API
  description: A sample API for museum tickets
  version: 1.0.0
  x-metadata:
    owner: API Team
    department: Product
    category: eCommerce
    status: Production
```

### Use metadata in Markdown front matter

```markdown {% title="introduction.md" %}
---
metadata:
  owner: Documentation Team
  category: Guides
  status: Draft
  redocly_category: Learn
---

# Introduction

This is an introduction to our API documentation.
```

### Use metadataGlobs for pattern-based assignment

```yaml {% title="redocly.yaml" %}
metadataGlobs:
  'apis/museum/**':
    owner: Museum Team
    redocly_category: API Reference
  'guides/**':
    redocly_category: Guides
  '**':
    company: Redocly
```

### Use reserved metadata keys

Some metadata keys are reserved for specific functionality:

```yaml {% title="redocly.yaml" %}
metadata:
  redocly_category: API Reference  # Used for search facets and categorization
  team: API Team                   # Can be used for scorecard team attribution
  owner: John Doe                  # Can be used for ownership attribution
```

## Reserved metadata keys

While most metadata keys can be used for any purpose, some have special functionality:

- `redocly_category`: Used for search facets and content categorization
- `team` and `owner`: Often used for attribution in scorecards and catalogs

## Resources

- [metadataGlobs](./metadata-globs.md) - Apply metadata using glob patterns
- [x-metadata extension](../content/api-docs/openapi-extensions/x-metadata.md) - Add metadata to OpenAPI files
- [catalog classic](./catalog-classic.md) - Configure catalogs that use metadata for filtering
- [scorecard](./scorecard.md) - Configure scorecards that use metadata for targeting
- [Configure search facets](../navigation/search/configure-search-facets.md) - Use metadata for search facets