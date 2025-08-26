# `rules`

## Introduction

The `rules` configuration blocks configure linting rules and their severity.
Configure [built-in rules](https://redocly.com/docs/cli/rules/built-in-rules) included by default, [configurable rules](https://redocly.com/docs/cli/rules/configurable-rules) you add yourself, and [rules from plugins](https://redocly.com/docs/cli/configuration/reference/apis).
The `rules` block can be used at the root of a configuration file, or inside an [API-specific section](./apis.md).

## Options

{% table %}

- Option
- Type
- Description

---

- {rule name}
- [Rule object](#rule-object)
- **REQUIRED**.
  Add as many rule entries as you like.
  These keys must be built-in rules (for example `security-defined`), configurable rules that you declare here (for example `rule/my-custom-rule`), or a rule from a plugin (for example `my-plugin/add-awesome`).

{% /table %}

### Rule object

{% table %}

- Option
- Type
- Description

---

- severity
- string
- Severity level of this rule.
  Must be one of `error`, `warn`, or `off`.

---

- message
- string
- Optional custom message for this rule.
  Example: `My Error Description. {{message}}`.
  The {{message}} placeholder renders with the default error message for the rule.
  Include the {{message}} placeholder if you want to provide the user with your custom message as well as the default error message for the rule.

---

- {additional properties}
- any
- Some rules allow additional configuration, check the details of each rule to find out the values that can be supplied here.
  For example the [`boolean-parameter-prefixes` rule](https://redocly.com/docs/cli/rules/oas/boolean-parameter-prefixes) supports an additional option of `prefixes` that accepts an array of strings.

{% /table %}

## Examples

This section covers some examples and common use cases.

### Use shorthand format

When the only configuration needed for a rule is the severity, you can set this as the value for the rule.
The example below sets the `tag-description` rule to `error`:

```yaml
rules:
  tag-description: error
```

This shorter syntax can help to keep your configuration file more readable.

### Configure built-in rules

It's rare for our default rulesets to perfectly fit your project.
Adjust the severity level of the rules to suit your needs, so that you can have certainty about the quality of your APIs.
The following example shows some rules configuration:

```yaml
rules:
  info-license: error
  no-ambiguous-paths: error
  boolean-parameter-prefixes:
    severity: error
    prefixes:
      - is
      - can
```

All the rules are configured to produce errors if their criteria are not met, the first two use the shorthand syntax to configure the severity of the rule since no other options are needed for those rules.
The `boolean-parameter-prefixes` rule also accepts a list of allowed prefixes, and those are also configured in the example.

### Configure your own rules

Redocly supports [configurable rules](https://redocly.com/docs/cli/rules/configurable-rules), and those are configured in the config file.
A rule to check that all `operationId` fields are in camel case is shown in the following example:

```yaml
rules:
  rule/operationId-casing:
    subject:
      type: Operation
      property: operationId
    assertions:
      casing: camelCase

```

The configurable rules have user-defined names that all start with `rule/` and then a meaningful name.
Read the [configurable rules documentation](https://redocly.com/docs/cli/rules/configurable-rules) for all the details on what configurable rules can do and how to to use them.

### Configure rules from custom plugins

Redocly also supports [custom plugins](https://redocly.com/docs/cli/custom-plugins/custom-rules) for advanced users.
Those are also configured in the `rules` section of the configuration file, using the plugin's module name as a prefix.

The following example shows how to enable a rule named `validate` from a plugin called `openapi-markdown`:

```yaml
plugins:
  - './openapi-markdown.js'

rules:
  openapi-markdown/validate: warn
```

The example includes an example of including the plugin in your configuration.

## Resources

- **[APIs configuration](./apis.md)** - Set per-API configuration options in redocly.yaml for granular control over different API specifications
- **[Decorators](./openapi/decorators.md)** - Apply transformations to your OpenAPI documents for enhanced functionality and customization
- **[Redocly CLI cookbook](https://github.com/Redocly/redocly-cli-cookbook)** - Comprehensive resource for configurable rules, plugins, and practical implementation examples
- **[Rules documentation](https://redocly.com/docs/cli/rules)** - Complete guide to understanding and implementing linting rules for API documentation quality
- **[Configurable rules documentation](https://redocly.com/docs/cli/rules/configurable-rules)** - Detailed documentation for customizing and configuring rule behavior
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
