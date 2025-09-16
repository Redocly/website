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
description: Configure metadata properties for your project, APIs, and documentation files.
---
# `metadata`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}
Metadata is used for content categorization, search facets, catalog filtering, and scorecard functionality.

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
- An object of key-value pairs.
  Keys can be any string, and values can be any scalar value.

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

## Catalog categorization

Catalogs are important tools to make APIs more discoverable.
At full potential, a catalog should include all of your APIs and be filterable across categories that users find useful.

### Importance of categorization

Despite its predominance in library systems, Amazon does not use the Dewey Decimal System to organize books.
The Dewey Decimal System assigns numerical codes based on subject matter and works well for physical libraries where users locate books on shelves.

Amazon, as an online retailer, uses a hierarchical categorization system that sorts books into categories and subcategories based on genre, subject matter, and other criteria.
This system allows users to easily browse and discover books by filtering through categories of interest or using search functions.

While the Dewey Decimal System serves physical libraries well, Amazon's categorization system is better suited for digital environments where users can search and navigate through vast collections.

Similarly, Redocly has a flexible categorization system that allows definition of metadata in APIs (using `x-metadata`), in Markdown front matter, or in the `metadata` object of the configuration file.

### Category governance

Distributed category creation can lead to overlapping categories, or near-identical categories that result in confusing results.
Instead, categories should be created sparingly, and category values should also be created sparingly.

Self-categorization of data is important for scalability and must happen in a distributed way across teams.
You need a mechanism to enforce a limited number of categories and accepted values in a distributed fashion.

Redocly lint rules can enforce `x-metadata` usage in APIs and `metadata` in configuration files using the `metadata-schema` rule.

```yaml {% title="redocly.yaml" %}
rules:
  metadata-schema:
    type: object
    properties:
      team:
        type: string
        enum:
          - Finance
          - Operations  
          - Marketing
          - Product
          - Engineering
        description: Team responsible for the API.
      category:
        type: string
        enum:
          - Accounting
          - Analytics
          - Payments
          - User Management
        description: Business category for the API.
```

This governance approach helps prevent inconsistencies like "Managerial Accounting" versus "Management Accounting" that can occur with distributed teams.

## Reserved metadata keys

While most metadata keys can be used for any purpose, some have special functionality:

- `redocly_category`: Used for search facets and content categorization
- `team` and `owner`: Often used for attribution in scorecards and catalogs

## Resources

- **[MetadataGlobs](./metadata-globs.md)** - Apply metadata using glob patterns for automated content organization and categorization
- **[x-metadata extension](../content/api-docs/openapi-extensions/x-metadata.md)** - Add metadata to OpenAPI files for enhanced documentation and search functionality
- **[Catalog classic](./catalog-classic.md)** - Configure catalogs that use metadata for filtering and organization of API documentation
- **[Scorecard](./scorecard.md)** - Configure scorecards that use metadata for targeting specific content and quality assessment
- **[Configure search](./search.md#apply-facets-to-files)** - Use metadata for search facets to enable advanced content filtering and discovery