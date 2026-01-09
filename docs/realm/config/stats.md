---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Configure project statistics collection to track file types, API structures, and project evolution over time.
---
# `stats`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}
Project stats provide insights into how your documentation project evolves, including file type distributions and API structure metrics.

Stats data is collected during project builds and displayed in three locations:
- **Deploy page**: Shown alongside other checks like build and link checker
- **Project-level page**: Table view with stats from all builds
- **Realm portal**: Dedicated stats page accessible at `redocly/project/stats`

## Default behavior

By default, the stats feature:
- **API statistics**: Collected for all OpenAPI definitions in the project.
  For definitions listed in the root-level [`apis`](./apis.md#examples), their names are used instead of file paths in the statistics output.
- **File extension statistics**: Disabled by default.

## Options

{% table %}

- Option
- Type
- Description

---

- fileExtensions
- boolean
- Enable or disable file extension statistics collection.
  When enabled, collects counts of files grouped by extension (e.g., `.md`, `.yaml`, `.json`, `.png`, `.svg`).
  Default: `false`

---

- apis
- [[API Object](#api-object)]
- Optional list of specific APIs to include in statistics.
  When provided, statistics are calculated only for the specified APIs.
  When omitted, statistics are calculated for all OpenAPI definitions in the project.

{% /table %}

### API Object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED.** Name to use for this API in the statistics output.

---

- path
- string
- **REQUIRED.** Path to the OpenAPI definition file relative to the project root.

{% /table %}

## Statistics data structure

Stats data includes:

**File extensions:**
- Extension type (e.g., `.md`, `.yaml`, `.json`, `.png`, `.svg`)
- Count of files with each extension

**API statistics:**
- API name
- Number of references
- Number of external documents
- Number of schemas
- Number of parameters
- Number of links
- Number of path items
- Number of operations
- Number of tags

## Examples

### Enable file extension statistics

Enable collection of file extension statistics:

```yaml {% title="redocly.yaml" %}
stats:
  fileExtensions: true
```

### Collect stats for specific APIs

Calculate statistics only for specified APIs:

```yaml {% title="redocly.yaml" %}
stats:
  apis:
    - name: Pet Store API
      path: ./openapi/petstore.yaml
    - name: User Management API
      path: ./openapi/users.yaml
```

### Full configuration

Enable both file extensions and specify APIs:

```yaml {% title="redocly.yaml" %}
stats:
  fileExtensions: true
  apis:
    - name: Main API
      path: ./openapi/main.yaml
    - name: Secondary API
      path: ./openapi/secondary.yaml
```

### Default behavior (no configuration)

When `stats` is not configured, API statistics are automatically collected for all OpenAPI definitions in the project, and file extension statistics are disabled:

```yaml {% title="redocly.yaml" %}
# No stats configuration needed
# API stats are collected automatically for all OpenAPI definitions
apis:
  main-api:
    root: ./openapi/main.yaml
  secondary-api:
    root: ./openapi/secondary.yaml
```

## Access stats data

Stats data is available in:
- **Reunite (Cloud)**: Project-level stats visible to organization owners; deploy-level stats visible to all users
- **Realm portal**: Stats page accessible for logged-in users

## Resources

- **[Configure APIs](./apis.md)** - Define your OpenAPI definitions and understand how API names are used in statistics
- **[Project configuration](./index.md)** - Explore other project configuration options for comprehensive documentation customization

