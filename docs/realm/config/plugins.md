# `plugins`

## Introduction

Redocly supports [custom plugins](https://redocly.com/docs/cli/custom-plugins) for extending lint and decorator behavior.
Use plugins when you need to add rules beyond the [built-in](https://redocly.com/docs/cli/rules/built-in-rules) and [configurable](https://redocly.com/docs/cli/rules/configurable-rules), or decorators beyond the [built-in decorators](https://redocly.com/docs/cli/decorators).

## Options

The `plugins` configuration is an array of paths to plugin files, relative to the config file.
You can include as many plugins as you need.

## Examples

A basic example of including two plugins from a directory named `plugins/` is shown in the example below:

```yaml
plugins:
  - plugins/my-best-plugin.js
  - plugins/another-plugin.js
```

Remember that you need to include plugins in the `plugins` section before you can use the content of the plugin elsewhere in the configuration file.

## Resources

- [apis](./apis.md) configuration options allow setting per-API configuration in `redocly.yaml`.
- [rules](./rules.md) settings define the linting rules that are used.
- [decorators](./openapi/decorators.md) offer some transformations for your OpenAPI documents.
- The [Redocly CLI cookbook](https://redocly.com/blog/redocly-cli-cookbook/) has many examples of plugins.
- Explore other [configuration options](./index.md) for your project.
