---
products:
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Collect and publish project statistics such as API structure counts and file extension breakdown.
---
# `stats`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}

When enabled, the stats plugin collects information about your project during build:

- API structure counts (references, schemas, parameters, operations, and more) per OpenAPI definition.
- Optional file extension breakdown across your content directory.

The collected data is exposed to the Realm statistics page.

## Options

{% table %}

- Option
- Type
- Description

---

- fileExtensions
- boolean
- When `true`, the plugin counts files by extension across the project. Virtual files and files without an extension are excluded. Defaults to `false`.

---

- apis
- [[API Stats Object](#api-stats-object)]
- Restrict collection to specific API definitions and override their display name.
Each item must include both `name` and `path`.
When omitted, the plugin collects stats for every definition listed under the root `apis` configuration (using the root key as the name).
When no root `apis` are configured, the definition's relative path is used as the name.

{% /table %}

### API Stats Object

{% table %}

- Option
- Type
- Description

---

- name
- string
- Required display name for the API definition in the statistics output.

---

- path
- string
- Required file path to the OpenAPI definition, relative to the project root. Must match a bundled definition file for the entry to be included.

{% /table %}

## Examples

### Default behavior with root-level APIs

With no `stats` section, the plugin collects stats for every root-level API and uses the root key as the name.
File extensions are not collected.

```yaml
apis:
  users:
    root: ./apis/users.yaml
  orders:
    root: ./apis/orders.yaml
```

### Custom stats selection with file extension breakdown

To enable file extension collection and restrict API stats to a subset of APIs (with custom names), add a `stats` section:

```yaml
apis:
  users:
    root: ./apis/users.yaml
  orders:
    root: ./apis/orders.yaml

stats:
  fileExtensions: true
  apis:
    - name: Public Users API
      path: ./apis/users.yaml
```

