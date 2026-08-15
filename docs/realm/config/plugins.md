---
products:
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Configure custom plugins to extend lint and decorator behavior.
---
# `plugins`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

## Introduction

Configure custom plugins to extend lint and decorator behavior.
Use a plugin when the [built-in rules](https://redocly.com/docs/cli/rules/built-in-rules), [configurable rules](https://redocly.com/docs/cli/rules/configurable-rules), and [built-in decorators](https://redocly.com/docs/cli/decorators) do not cover your needs.
To learn how to write one, see [custom plugins](https://redocly.com/docs/cli/custom-plugins).

## Options

The `plugins` option is a list of paths to plugin files.
Paths are relative to the config file.
Add as many plugins as you need.

## Examples

The following example includes two plugins from a directory named `plugins/`:

```yaml
plugins:
  - plugins/my-best-plugin.js
  - plugins/another-plugin.js
```

List a plugin in the `plugins` section first.
Then you can use its content elsewhere in the configuration file.

## Resources

- **[APIs configuration](./apis.md)** - Set options per API in `redocly.yaml`.
- **[Rules configuration](./rules.md)** - Define the lint rules your plugins work with.
- **[Decorators](./openapi/decorators.md)** - Transform your OpenAPI documents.
- **[Redocly CLI cookbook](https://redocly.com/blog/redocly-cli-cookbook/)** - Practical examples of plugins from real projects.
- **[Configuration options](./index.md)** - All the other options for your project.
