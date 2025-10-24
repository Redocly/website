---
products:
  - Realm
  - Redoc
  - Revel
  - Reef
  - Redocly CLI
plans:
  - Community
  - Pro
  - Enterprise
  - Enterprise+
description: Configure rules and settings for individual APIs in multi-API projects.
---
# `apis`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

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
- **REQUIRED**.
  Each API needs a name and optionally a version.
  Supports alphanumeric characters and underscores.

{% /table %}

### API object

{% table %}

- Option
- Type
- Description

---

- root
- string
- **REQUIRED**.
  Path to the root API description file.

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
- Preprocessors run before linting, and follow the same structure as decorators.
  We recommend the use of decorators over preprocessors in most cases.

---

- output
- string
- Output file path.
  When running `bundle` without specifying an API, the bundled API description is saved to this location.
  Example: `docs/api.yaml`.

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

- **[Extends configuration](./openapi/extends.md)** - Set the base ruleset to use for consistent API validation and linting across your documentation
- **[Rules configuration](./rules.md)** - Define the linting rules that are used for API validation and quality enforcement
- **[Decorators](./openapi/decorators.md)** - Apply transformations to your OpenAPI documents for enhanced functionality and custom modifications
- **[Per-API configuration examples](https://redocly.com/docs/cli/configuration/apis)** - Detailed information and examples for configuring individual APIs with specific settings
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
