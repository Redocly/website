# Migration guide: Redocly configuration file

The Redocly configuration file is used by multiple Redocly apps to help you control their behavior.

- Redocly CLI uses it as the central configuration file when working with your API definitions.
- Workflows uses it in the API registry to manage your APIs lint, bundle, mock servers, and control advanced features like region and link resolution.
- API docs uses it to apply your custom settings for API reference documentation.
- Developer portal uses it to apply custom settings for API reference documentation.
- VS Code extension uses it for linting criteria, to apply custom settings for live documentation preview, and to set API definition root files.

The Redocly configuration file has evolved and may continue to evolve until we release our next product.

Our goal for changes is generally to simplify its usage, improve the integration of Redocly apps, and standardize the way they interpret the configuration file.

We encourage all users to start using the new configuration file.
Although still supported, the legacy configuration file is deprecated.
You will receive warning messages in build logs if you decide to keep it, and it won't work any longer at the general release.

The documentation has been updated to reflect these changes, and all examples in the documentation refer to the new configuration file.

This guide lists all changes in reverse chronological order.

## 1.0.0-beta.128 (2023-06-07)

### Changes

- Change the prefix from `assert/` to `rule/` as a prefix for configurable rules. The `assert/` prefix continues to work with a warning of the deprecated syntax.

### Examples

Before:
```yaml
rules:
  assert/oxford-comma:
    subject:
      type: any
      property: description
    assertions:
      notPattern: /(?:[^\s,]+,){1,} \w+ (?:and|or) \w+[.?!]/i
```

After:
```yaml
rules:
  rule/oxford-comma:
    subject:
      type: any
      property: description
    assertions:
      notPattern: /(?:[^\s,]+,){1,} \w+ (?:and|or) \w+[.?!]/i
```

## 1.0.0-beta.121 (2023-01-25)

### Changes

- Moved and renamed the `features.openapi` and `features.mockServer` into the `theme` object with the names `openapi` and `mockServer`.

### Examples

Before:
```yaml
features.openapi: {}
features.mockServer: {}
```

After:
```yaml
theme:
  openapi: {}
  mockServer: {}
```


## 1.0.0-beta.111 (2022-10-10)

### Changes

- Renamed four type names for alignment with the OpenAPI specification.
  - `PathsMap` to `Paths`
  - `ResponsesMap` to `Responses`
  - `EncodingsMap` to `EncodingMap`
  - `SecuritySchemeFlows` to `OAuth2Flows`

The type names are used in assertions and custom plugins.

### Examples

The following is an example of an assertion usage before the change.

```yaml Before
assert/has-multiple-responses:
  subject: ResponsesMap
  minLength: 2
```

The following example converts that assertion to reflect the change.

```yaml After
assert/has-multiple-responses:
  subject: Responses
  minLength: 2
```


## 1.0.0-beta.109 (2022-09-08)

### Changes

- Renamed node types.
  - `DefinitionRoot` to `Root`
  - `ServerVariableMap` to `ServerVariablesMap`
  - `PathMap` to `PathsMap` (subsequently renamed to `Paths` in 1.0.0-beta.111)
  - `CallbackMap` to `CallbacksMap`
  - `MediaTypeMap` to `MediaTypesMap`
  - `ExampleMap` to `ExamplesMap`
  - `EncodingMap` to `EncodingsMap` (subsequently reverted in 1.0.0-beta.111)
  - `HeaderMap` to `HeadersMap`
  - `LinkMap` to `LinksMap`
- Removed the `styleguide` object from the configuration file.
- Renamed the `operation-security-defined` rule to `security-defined`.

The type names are used in assertions and custom plugins.
The `styleguide` object (formerly known as the `lint` object) is used in the root of the configuration file and in APIs objects.
The properties moved up one level (to the root and the APIs object) with the exception of `doNotResolveExamples` which moved to the `resolve` object.
### Examples

The following is an example of an assertion usage before the change.

```yaml Before
assert/has-multiple-examples:
  subject: ExampleMap
  minLength: 2
```

The following example converts that assertion to reflect the change.

```yaml After
assert/has-multiple-examples:
  subject: ExamplesMap
  minLength: 2
```

The following is an example of a configuration with a `styleguide` before the change.

```yaml Before
apis:
  core@v1:
    root: ./openapi.yaml
    styleguide:
      rules:
        operation-summary: error
styleguide:
  rules:
    operation-operationId-url-safe: error
```

The follow example converts the configuration to reflect the change.

```yaml After
apis:
  core@v1:
    root: ./openapi.yaml
    rules:
      operation-summary: error
rules:
  operation-operationId-url-safe: error
```

## 1.0.0-beta.108 (2022-08-22)

### Changes

- Renamed `no-servers-empty-enum` to `no-server-variables-empty-enum` and fixed incorrect docs of `no-empty-enum-servers`.

### Examples

The following example shows the rule before the change.

```yaml
# ...
rules:
  no-servers-empty-enum: error
```

The following example shows the rule after the change.

```yaml
# ...
rules:
  no-server-variables-empty-enum: error
```

- Change rules config from `disallowAdditionalProperties` default `true` to `allowAdditionalProperties` default `false`.

Almost all Redocly configuration boolean options use a default value of `false` so this change was made to enforce consistency.

This change impacts three rules:
- [no-invalid-media-type-examples](https://redocly.com/docs/cli/rules/no-invalid-media-type-examples/)
- [no-invalid-parameter-examples](https://redocly.com/docs/cli/rules/no-invalid-parameter-examples/)
- [no-invalid-schema-examples](https://redocly.com/docs/cli/rules/no-invalid-schema-examples/)

If you rely on the default values, there is no change to the configuration.


### Default configuration change examples

The following shows the configuration before the change.

```yaml Before
rules:
  no-invalid-media-type-examples:
    disallowAdditionalProperties: false
```

The following shows the configuration after the change.

```yaml After
rules:
  no-invalid-media-type-examples:
    allowAdditionalProperties: true
```

## 1.0.0-beta.106 (2022-08-09)

### Changes

- Renamed `lint` into `styleguide` in Redocly configuration.
- Improved naming consistency.

The reason for the change is that `lint` is the name of a command and also an object in the configuration file that impacts multiple commands (not only the `lint` command).

A subsequent change has been made to remove the lint and styleguide objects and promote their properties up one level.


### Examples

The following shows the configuration before the change.

```yaml Before
lint:
  rules:
    no-invalid-media-type-examples: error
```

The following shows the configuration after the change.

```yaml After
styleguide:
  rules:
    no-invalid-media-type-examples: error
```

## Previous changes

### Supported file names

You can now name the configuration file `redocly.yaml` or `.redocly.yaml` (deprecated).

Previously, only the `.redocly.yaml` file name was supported, which sometimes caused issues because it was a hidden file.

Redocly apps don't have an order of precedence or a specific preference for either of the supported file names.
They will use whichever configuration file is detected in your working directory or project root.

Multiple configuration files in the same directory are not allowed.
If you have a `redocly.yaml` and a `.redocly.yaml` file  in the same directory, Redocly apps display a warning in the output and ask you to choose one file to use.

The `.redocly.yaml` name has been deprecated and superceded by the `redocly.yaml` filename.

### Changed properties

- Renamed `apiDefinitions` to `apis`.

- Previously, every API under `apiDefinitions` was identified by its `definitionId` or alias. Now, the APIs under `apis` are identified by their name and version in the format `name@version`. The version is optional, and when not provided, Redocly apps interpret it as `latest` by default. The API name and version from the configuration file are directly used by Redocly apps. This reduces the complexity of having arbitrary aliases as an extra layer between the API and Redocly apps.

- Previously, the alias mapped directly to the path of the OpenAPI definition (as a string value). Now, the `name@version` is an object that requires a separate `root` property to provide the path to the OpenAPI definition.

- Renamed `referenceDocs` to `features.openapi`. All supported configuration options and their format remain the same.

Compare these examples to understand the changes:
{% tabs %}
{% tab label="New configuration" %}
```yaml
apis:
  main@v1:
    root: ./openapi/openapi.yaml
lint:
  rules:
    example-rule-name: error
features.openapi:
  pagination: section
  showConsole: true
  theme:
    menu:
      backgroundColor: '#fffff'
```
{% /tab  %}
{% tab label="Legacy configuration" %}
```yaml
apiDefinitions:
  main: ./openapi/openapi.yaml
lint:
  rules:
    example-rule-name: error
referenceDocs:
  pagination: section
  showConsole: true
  theme:
    menu:
      backgroundColor: '#fffff'
```
{% /tab  %}
{% /tabs  %}
