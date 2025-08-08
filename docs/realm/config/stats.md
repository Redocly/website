---
products:
  - Reef
  - Realm
---
# `stats`

Configure statistics collection for your API documentation project. The stats plugin collects information about file extensions and API definitions in your project.

## How it works

The `stats` configuration allows you to control what statistics are collected and for which APIs. By default, API statistics are collected for all OpenAPI definitions in the project, while file extension statistics are disabled.

## Options

{% table %}

- Option
- Type
- Description

---

- fileExtensions
- boolean
- Enable or disable file extension statistics collection. Default: `false`

---

- apis
- array
- Optional array of specific APIs to collect statistics for. When provided, statistics are calculated only for the specified APIs.

{% /table %}

### API configuration object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED**. The name of the API for statistics collection.

---

- path
- string
- **REQUIRED**. Path to the OpenAPI definition file.

{% /table %}

## Examples

### Basic configuration

Enable file extension statistics:

```yaml {% title="redocly.yaml" %}
stats:
  fileExtensions: true
```

### Configure specific APIs

Collect statistics only for specific APIs:

```yaml {% title="redocly.yaml" %}
stats:
  fileExtensions: true
  apis:
    - name: petstore
      path: ./apis/petstore.yaml
    - name: users
      path: ./apis/users.yaml
```
## Default behavior

- **API statistics**: Collected for all OpenAPI definitions in the project. For definitions listed in the root level `apis`, their names are used instead of file paths in the statistics output.
- **File extension statistics**: Disabled by default.

## Resources

- Explore other [configuration options](./index.md) for your project.
