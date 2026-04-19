---
products:
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Configure project statistics collection for APIs and file extensions.
---
# `stats`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Use the `stats` option to control which project statistics are collected during builds.

By default, statistics are not collected.

Statistics collection starts only when the `stats` object contains at least one of these keys:
- `fileExtensions`
- `apis`

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "stats"} /%}

## Options

{% table %}

- Option
- Type
- Description

---

- fileExtensions
- boolean
- Enables file extension statistics collection.
  When this key is set in `stats`, stats collection is enabled.
  Default: `false`

---

- apis
- [[API object](#api-object)]
- Optional list of APIs to include in statistics.
  When this key is set in `stats`, stats collection is enabled.
  Statistics are calculated only for the APIs listed in this array.

{% /table %}

### API object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED.** Display name used for the API in statistics output.

---

- path
- string
- **REQUIRED.** Path to the OpenAPI description file.

{% /table %}

## Examples

Enable stats collection with file extension statistics:

```yaml {% title="redocly.yaml" %}
stats:
  fileExtensions: true
```

Enable stats collection for specific APIs only:

```yaml {% title="redocly.yaml" %}
stats:
  fileExtensions: true
  apis:
    - name: Public API
      path: openapi/public.yaml
    - name: Admin API
      path: openapi/admin.yaml
```
