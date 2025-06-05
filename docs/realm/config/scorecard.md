---
products:
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `scorecard`

Reunite's scorecard feature enables you to add and create sets of rules and test your API description files against them.
Using these rules you can maintain quality across your existing APIs and ensure that newly-added or updated APIs match your criteria.
An API scorecard can include multiple sets of rules, corresponding to different quality levels.

## Options

{% table %}

- Option
- Type
- Description

---

- levels
- [[Level Object](#level-object)]
- List of levels to score against.

---

- targets
- [[Target Object](#target-object)]
- Provide custom `minimumLevel` for specific targets.

---

- teamMetadataProperty
- [[Team Metadata Object](#team-metadata-object)]
- Provide custom team label and team metadata property.

---
- ignore
- [string]
- Provide a list of files or directories to skip when calculating scorecard.
{% /table %}

### Level Object

{% table %}

- Option
- Type
- Description

---

- name
- string
- Name of the level.

---

- extends
- [string]
- Inherit configurations. In case of conflict, priority goes to configurations further down the list.
  Finally, explicit declarations inline takes precedence over configurations inherited through the extends feature.
  Built-in configurations include recommended and minimal.

---

- rules
- [Rule Object](https://redocly.com/docs/cli/configuration/rules)
- Change the severity level of any rules in your extended configurations. Some rules may also receive additional configurations.

{% /table %}

### Target Object

{% table %}

- Option
- Type
- Description

---

- minimumLevel
- string
- The minimum level refers to a level using the name defined in `levels`.

---

- where
- [Where Object](#where-object)
- Specify which API descriptions to apply the `minimumLevel` to.

---
- rules
- [Rule Object](https://redocly.com/docs/cli/configuration/rules)
- Customize rules for the target. Useful for disabling rules based on the metadata.

{% /table %}

### Where Object

{% table %}

- Option
- Type
- Description

---

- metadata
- [Where Metadata Object](#where-metadata-object)
- Specify which API descriptions to apply the `minimumLevel` to based on the metadata.

{% /table %}

### Where Metadata Object

{% table %}

- Option
- Type
- Description

---

- _(name of metadata key)_
- string
- Specify the exact value of the metadata key to match against. Also supports ISO 8601 date range.
  Specify a string with a leading and trailing slash to match against a regex.

{% /table %}


### Example

```yaml
where:
  metadata:
    title: 'My API'
    version: '/^1\\.0\\.*/'
```

### Team Metadata Object

{% table %}

- Option
- Type
- Description

---

- property
- string
- The property name to use for the team name.

---

- label
- string
- The label to use for the team name.

---

- default
- string
- The default team name to use when the property is not found.

{% /table %}

## Examples

The following example `redocly.yaml` file configuration adds three levels to the project's API scorecard: Baseline, Silver, and Gold:

```yaml {% title="redocly.yaml" %}
scorecard:
  levels:
    - name: Baseline
      extends:
        - ./api-ruleset-baseline.yaml
    - name: Silver
      extends:
        - ./api-ruleset-silver.yaml
    - name: Gold
      extends:
        - ./api-ruleset-gold.yaml
```

The following sample ruleset configuration file is for the Baseline level and applies the [Redocly minimal ruleset](https://redocly.com/docs/cli/rules/minimal) and adds a few additional [built-in rules](https://redocly.com/docs/cli/rules/built-in-rules):

```yaml {% title="api-ruleset-baseline.yaml" %}
extends:
  - minimal
rules:
  no-ambiguous-paths: error # This rule enforces paths to match only one PathItem entry, including template variables
  no-invalid-schema-examples: error # This rule enforces schema examples to match their declared types
  spec-strict-refs: error # This rule enforces $refs to reference elements in the component section
```

The following sample ruleset configuration is for the Silver level and applies the [Redocly minimal ruleset](https://redocly.com/docs/cli/rules/minimal), adds a few additional [built-in rules](https://redocly.com/docs/cli/rules/built-in-rules), and a few additional [configurable rules](https://redocly.com/docs/cli/configuration/rules):

```yaml {% title="api-ruleset-silver.yaml" %}
extends:
  - minimal
rules:
  no-ambiguous-paths: error # This rule enforces paths match only one PathItem entry, including template variables
  no-invalid-schema-examples: error # This rule enforces schema examples to match their declared types
  spec-strict-refs: error # This rule enforces $refs to reference elements in the component section
  paths-kebab-case: error # This rule enforces all paths to be written using kebab case
  rule/operationId-casing: # The following configurable three rules enforce camel case for operation ids, parameters, and schema properties
    subject:
      type: Operation
      property: operationId
    assertions:
      casing: camelCase
  rule/parameter-casing:
    subject:
      type: Parameter
    assertions:
      casing: camelCase
  rule/schema-properties-casing:
    subject:
      type: Schema
      property: properties
    assertions:
      casing: camelCase
```

The following sample ruleset configuration is for the Gold level:

```yaml {% title="api-ruleset-gold.yaml" %}
extends:
  - minimal
rules:
  no-ambiguous-paths: error # This rule enforces paths match only one PathItem entry, including template variables
  no-invalid-schema-examples: error # This rule enforces schema examples to match their declared types
  spec-strict-refs: error # This rule enforces $refs to reference elements in the component section
  paths-kebab-case: error # This rule enforces all paths to be written using kebab case
  rule/operationId-casing: # The following configurable three rules enforce camel case for operation ids, parameters, and schema properties
    subject:
      type: Operation
      property: operationId
    assertions:
      casing: camelCase
  rule/parameter-casing:
    subject:
      type: Parameter
    assertions:
      casing: camelCase
  rule/schema-properties-casing:
    subject:
      type: Schema
      property: properties
    assertions:
      casing: camelCase
  rule/headers-include-example: # The following two configurable rules enforce that headers and parameters include examples
    subject:
      type: Header
    assertions:
      requireAny:
        - example
        - examples
  rule/params-must-include-examples:
    subject:
      type: Parameter
    assertions:
      requireAny:
        - example
        - examples
      mutuallyExclusive:
        - example
        - examples
  rule/operation-security-defined: # This configurable rule enforces the security property of the Paths Operation OpenAPI node type is defined
    subject:
      type: Operation
      property: security
    where:
      - subject:
          type: Paths
        assertions:
          defined: true
    assertions:
      defined: true
    message: "Property `security` must be defined"
  rule/terms-url: # This configurable rule enforces the terms of service property of the Info OpenAPI node type is defined
    subject:
      type: Info
      property: termsOfService
    assertions:
      defined: true
```

### Ignore example
To ignore a specific file from the scorecard calculation, for example `openapi.yaml`, use `ignore` property:
```yaml
scorecard:
  ignore:
    - openapi.yaml
```

To ignore a directory, for example `catalog/`:
```yaml
scorecard:
  ignore:
    - catalog/*
```

To ignore every file with a specific extension, for example `.yaml`:
```yaml
scorecard:
  ignore:
    - "**/*.yaml"
```

## Related options

- Check out the different ways you can customize the behavior and appearance of integrated API documentation on the [OpenAPI reference](./openapi/index.md) page.
- Learn more about the different ways you can configure an API catalog, using the [Catalog reference](./catalog-legacy.md).

## Resources

- Learn more about the [Scorecard](../setup/concepts/scorecard.md) feature including what it displays and where to find the reports.
- Learn how to add either Redocly built-in rule sets or custom rule sets to the scorecard for your projects in [Configure scorecard](../setup/how-to/configure-scorecard.md).
