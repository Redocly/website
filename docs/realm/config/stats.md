---
products:
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Configure project statistics collection for API and file extension metrics.
---
# `stats`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

## Introduction

{% $frontmatter.description %}
Use this option to control what data is collected for the project statistics page.

## Options

{% table %}

- Option
- Type
- Description

---

- fileExtensions
- boolean
- Enables file extension statistics. Default is `false`.

---

- apis
- [array of objects](#api-object)
- Optional list of API definitions to analyze. When omitted, all configured APIs are analyzed.

{% /table %}

### API object

{% table %}

- Option
- Type
- Description

---

- name
- string
- Name of the API shown in stats output.

---

- path
- string
- Path to the API description file.

{% /table %}

## Examples

```yaml
stats:
  fileExtensions: true
```

```yaml
stats:
  fileExtensions: true
  apis:
    - name: main-api
      path: openapi/main.yaml
    - name: partner-api
      path: openapi/partner.yaml
```

## Default behavior

- `fileExtensions` is disabled by default.
- If `apis` is not set, stats are calculated for all configured APIs.
- If `apis` is set, stats are calculated only for the APIs listed in this option.
