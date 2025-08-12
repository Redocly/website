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

- **[APIs configuration](./apis.md)** - Set per-API configuration options in redocly.yaml for customized plugin behavior across different API specifications
- **[Rules configuration](./rules.md)** - Define linting rules that work with plugins for comprehensive API validation and quality enforcement
- **[Decorators](./openapi/decorators.md)** - Apply transformations to your OpenAPI documents for enhanced functionality when used with plugins
- **[Redocly CLI cookbook](https://redocly.com/blog/redocly-cli-cookbook/)** - Find many practical examples of plugins and their implementation in real-world scenarios
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
