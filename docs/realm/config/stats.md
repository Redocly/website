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
description: Enable an internal project statistics page with OpenAPI metrics and optional file-type breakdown.
---
# `stats`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

## Introduction

{% $frontmatter.description %}

When you add a `stats` object to `redocly.yaml`, the build registers a hidden page at `/redocly/project/stats` that summarizes OpenAPI usage across the APIs in your project (references, schemas, operations, tags, and related counts). The page is not shown in the sidebar.

By default, each row is labeled with the API definition path. You can map paths to friendlier names with `stats.apis`. Set `stats.fileExtensions` to include a second table that counts files in the project by extension.

{% admonition type="info" %}
Access follows [`access.rbac`](./access/rbac.md) `content` rules for the route `/redocly/project/stats`. Broad patterns (for example `**`) apply to this page too. When no configured pattern matches, the page uses a default authenticated read scope.
{% /admonition %}

## Options

{% table %}

- Option
- Type
- Description

---

- fileExtensions
- boolean
- When `true`, adds a **Files** section with counts grouped by file extension. Default: `false`.

---

- apis
- [array of objects](#api-object)
- Optional list of API definitions to analyze. When omitted, all configured APIs are analyzed. Each item provides a friendlier display name for an API definition; the stats row for that definition shows `name` instead of the raw path.

{% /table %}

### API object

{% table %}

- Option
- Type
- Description

---

- name
- string
- Name of the API shown in the stats output.

---

- path
- string
- Path to the OpenAPI root file (same path as in your [`apis`](./apis.md) configuration, using forward slashes).

{% /table %}

## Examples

### Enable the stats page

```yaml {% title="redocly.yaml" %}
stats: {}
```

### Friendly API names and file extension breakdown

```yaml {% title="redocly.yaml" %}
stats:
  fileExtensions: true
  apis:
    - name: Public catalog API
      path: openapi/catalog.yaml
    - name: Admin API
      path: openapi/admin.yaml
```

## Default behavior

- `fileExtensions` is disabled by default.
- If `apis` is not set, stats are calculated for all configured APIs.
- If `apis` is set, stats are calculated only for the APIs listed in this option.

## Reunite and CI builds

When `REDOCLY_METADATA_OUTPUT_FOLDER` is set during a build, stats data is also written to `stats.json` in that folder for downstream processing (for example in Reunite).
