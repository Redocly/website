---
products:
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Configure statistics your APIs and files.
---
# `project-statistics`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}
Using these rules you can configure statistics that would be gathered.

## Options

{% table %}

- Option
- Type
- Description

---


- fileExtensions
- [boolean]
- Turn on/off calculation of statistics related to files extension

---

- apis
- [[API Object](#api-object)]
- List of APIs that would be used for statistics. By default used APIs from `apis` property

{% /table %}

### API Object

{% table %}

- Option
- Type
- Description

---

- name
- string
- Name of the API.

---

- path
- string
- Path to the API.

---

{% /table %}

## Examples

The following example `redocly.yaml` file configuration adds file extensions statistics:

```yaml {% title="redocly.yaml" %}
projectStatistics:
  fileExtensions: true
```

The following sample ruleset configuration file is for the file extensions statistics and for API statistics:

```yaml {% title="api-ruleset-baseline.yaml" %}
projectStatistics:
  fileExtensions: true
  apis:
    - name: Example
      path: path/to/openapi.yaml
```

## Resources

- **[OpenAPI reference](./openapi/index.md)** - Customize the behavior and appearance of integrated API documentation.
