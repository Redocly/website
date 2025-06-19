# `apis`

## Introduction

If your project contains multiple APIs, you can use the `apis` configuration section to set up rules and settings for individual APIs.

## Options

{% table %}

- Option
- Type
- Description

---

- `{name}@{version}`
- [API object](#api-object)
- **REQUIRED**. Each API needs a name and optionally a version. Supports alphanumeric characters and underscores.

{% /table %}

### API object

{% table %}

- Option
- Type
- Description

---

- root
- string
- **REQUIRED**. Path to the root API description file.

---

- rules
- [Rules object](./rules.md)
- Additional rule configuration for this API.

---

- decorators
- [Decorators object](./openapi/decorators.md)
- Additional decorator configuration for this API.

---

- preprocessors
- [Decorators object](./openapi/decorators.md)
- Preprocessors run before linting, and follow the same structure as decorators. We recommend the use of decorators over preprocessors in most cases.

---

- output
- Output file path
- When running `bundle` without specifying an API, the bundled API description is saved to this location.

{% /table %}

## Examples

The following example shows a simple `redocly.yaml` configuration file with settings for multiple APIs.

```yaml
apis:
  orders@v3:
    root: orders/openapi.yaml
    rules:
      tags-alphabetical: error
      operation-operationId-unique: error
      spec-strict-refs: error
  newsletter:
    root: newsletter/openapi.yaml
    rules:
      info-contact: off
      operation-summary: off
```

The following example shows `redocly.yaml` configuration file with settings for multiple APIs outputs.

```yaml
apis:
  main@v1:
    root: openapi-v1.yaml
    output: v1/bundled.yaml
  main@v2:
    root: openapi-v2.yaml
    output: v2/bundled.yaml
```

When running `redocly bundle` with this config, the bundled API descriptions are saved to the corresponding location.

## Resources

- [extends](./openapi/extends.md) sets the base ruleset to use.
- [rules](./rules.md) settings define the linting rules that are used.
- [decorators](./openapi/decorators.md) offer some transformations for your OpenAPI documents.
- More information and examples of [per-API configuration](https://redocly.com/docs/cli/configuration/apis).
- Explore other [configuration options](./index.md) for your project.
