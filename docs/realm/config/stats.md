# `stats`

## Introduction

The stats feature allows you to view statistics for specific project versions and track how these metrics change over time


## Options

{% table %}

- Option
- Type
- Description

---

- fileExtensions
- boolean
- File extension statistics.
  Default: `false`.

---

- apis
- [[APIs Statistics Object](#apis-statistics-object)]
- List of APIs to calculate statistics.


{% /table %}


### APIs Statistics Object

{% table %}

- Option
- Type
- Description

---

- name
- string
- Name of API.

---

- path
- string
- Path to the root API description file.

{% /table %}


## Example

```yaml
stats:
  fileExtensions: true
  apis:
    - name: Orders API
      path: orders/openapi.yaml
```