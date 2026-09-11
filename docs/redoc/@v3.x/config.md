# Configure Redoc CE

Redoc CE comes with many configuration options to help you customize your API documentation.
This page lists all the options you can use with Redoc CE 3.x, and how to pass them in each deployment method.

## Pass options

Options have the same names in every deployment method; only the syntax differs:

- **[Redocly CLI](./deployment/cli.md#configure-redoc-ce):** the `openapi`, `asyncapi`, or `graphql` key in `redocly.yaml`, matching the type of your description, or the same names as command-line options: `--graphql.layout=stacked`.
- **[HTML element](./deployment/html.md#configure-redoc-ce):** kebab-case attributes on `<redoc>`, for example `schemas-expansion-level="all"`.
  Attributes are strings, so options that take objects or arrays need the `init` function instead.
- **[JavaScript `init` function](./deployment/html.md#the-init-function):** the second argument, for example `init(url, { schemasExpansionLevel: 'all' })`.
- **[React component](./deployment/react.md):** the `options` prop of `RedocStandalone`.
- **[Docker image](./deployment/docker.md#pass-configuration-options):** kebab-case attributes in the `REDOC_OPTIONS` environment variable.

## Standalone options

The following options control the Redoc CE page itself.
In HTML and Docker they are attributes of `<redoc>`, and in `init` they are part of the options object.
In React, `basePath` is a prop of `RedocStandalone`, and the other options go in the `options` prop.

{% table %}

- Option
- Type
- Description

---

- router
- string
- Routing mode for deep links.
  `hash` keeps the route in the URL fragment and works from any static host.
  `history` uses path-based URLs and needs a server that returns the page for every path.
  Available in HTML, Docker, and `init`.
  The React component always uses path-based routing unless it renders inside a `HashRouter`.
  Default: `hash`.

---

- basePath
- string
- Path prefix the documentation is served under, used to build route URLs with `history` routing and in React.
  Default: `/`.

---

- disableTelemetry
- boolean
- Turns off [telemetry](./telemetry.md) when set to `true`.
  Available in HTML, Docker, `init`, and the React `options` prop.
  With Redocly CLI, set it under the `openapi`, `asyncapi`, or `graphql` key of `redocly.yaml`, or pass the `--disableTelemetry` flag.
  Default: `false`.

---

- hideLoading
- boolean
- Hides the loading spinner shown while the description loads.
  Default: `false`.

---

- skipBundle
- boolean
- Skips resolving and bundling `$ref`s in the description.
  Requires a description object rather than a URL.
  Default: `false`.

---

- scrollYOffset
- number | function
- Vertical offset in pixels, or a function that returns one, for pages with a fixed header above the documentation.
  Default: `0`.

---

- apiLogo
- object
- Logo at the top of the sidebar, as `{ imageUrl, href, altText, backgroundColor }`.
  OpenAPI and AsyncAPI descriptions can set the logo in the `info.x-logo` extension instead; GraphQL schemas have no `info` object, so use this option.

{% /table %}

## Common options

Redoc CE 3.x also supports the following configuration options:

### OpenAPI options

- [downloadUrls](../../realm/config/openapi/download-urls.md)
- [events](../../realm/config/openapi/events.md)
- [generatedSamplesMaxDepth](../../realm/config/openapi/generated-samples-max-depth.md)
- [hideDownloadButtons](../../realm/config/openapi/hide-download-buttons.md)
- [hidePropertiesPrefix](../../realm/config/openapi/hide-properties-prefix.md)
- [hideSchemaTitles](../../realm/config/openapi/hide-schema-titles.md)
- [jsonSamplesExpandLevel](../../realm/config/openapi/json-samples-expand-level.md)
- [layout](../../realm/config/openapi/layout.md)
- [maxDisplayedEnumValues](../../realm/config/openapi/max-displayed-enum-values.md)
- [onlyRequiredInSamples](../../realm/config/openapi/only-required-in-samples.md)
- [sanitize](../../realm/config/openapi/sanitize.md)
- [schemaDefinitionsTagName](../../realm/config/openapi/schema-definitions-tag-name.md)
- [schemasExpansionLevel](../../realm/config/openapi/schemas-expansion-level.md)
- [showExtensions](../../realm/config/openapi/show-extensions.md)
- [sortRequiredPropsFirst](../../realm/config/openapi/sort-required-props-first.md)

### AsyncAPI options

In `redocly.yaml`, these options go under the `asyncapi` key.

- [downloadUrls](../../realm/config/asyncapi/download-urls.md)
- [jsonSamplesDepth](../../realm/config/asyncapi/json-samples-depth.md)
- [layout](../../realm/config/asyncapi/layout.md)

### GraphQL options

In `redocly.yaml`, these options go under the `graphql` key.

- [fieldExpandLevel](../../realm/config/graphql/field-expand-level.md)
- [info](../../realm/config/graphql/info.md)
- [jsonSamplesDepth](../../realm/config/graphql/json-samples-depth.md)
- [menu](../../realm/config/graphql/menu.md)
- [samplesMaxInlineArgs](../../realm/config/graphql/samples-max-inline-args.md)
- [showBuiltInDirectives](../../realm/config/graphql/show-built-in-directives.md)
- [showBuiltInScalars](../../realm/config/graphql/show-built-in-scalars.md)

### Other options

{% table %}

- Option
- Type
- Description

---

- codeSamples
- object
- Order and labels of the language tabs in the request samples panel of OpenAPI operations, as `{ languages: [{ lang, label }] }`.
  Redoc CE does not generate code samples.
  A language tab appears next to the **Payload** tab only when the operation provides a sample for it in `x-codeSamples`.
  Default order: curl, JavaScript, Node.js, Python, Java, C#, PHP, Go, Ruby, R, and Payload.

---

- hideSchemaPattern
- boolean
- Hides the `pattern` constraint in OpenAPI schema fields.
  Default: `false`.

---

- ignoreNamedSchemas
- [string]
- Names of OpenAPI schemas to leave out of the documentation.
  As an attribute, pass a comma-separated string.
  Default: none.

{% /table %}

## Example

The same configuration passed as `<redoc>` attributes, as an `init` options object, and under the `openapi` key of `redocly.yaml` for Redocly CLI:

```html
<redoc
  spec-url="https://redocly.github.io/redoc/cafe.yaml"
  layout="stacked"
  schema-definitions-tag-name="Schemas"
  schemas-expansion-level="all"
  json-samples-expand-level="1"
  sort-required-props-first="true"
  show-extensions="true"
  hide-schema-titles="true"
  max-displayed-enum-values="5"
  disable-telemetry="true"
></redoc>
<script type="module" src="https://cdn.redoc.ly/redoc/v3.x/bundle/redoc.standalone.js"></script>
```

```js
import { init } from 'https://cdn.redoc.ly/redoc/v3.x/bundle/redoc.standalone.js';

init('https://redocly.github.io/redoc/cafe.yaml', {
  layout: 'stacked',
  schemaDefinitionsTagName: 'Schemas',
  schemasExpansionLevel: 'all',
  jsonSamplesExpandLevel: 1,
  sortRequiredPropsFirst: true,
  showExtensions: true,
  hideSchemaTitles: true,
  maxDisplayedEnumValues: 5,
  disableTelemetry: true,
  downloadUrls: [
    { title: 'Download OpenAPI description', url: 'https://redocly.github.io/redoc/cafe.yaml' },
  ],
});
```

```yaml {% title="redocly.yaml" %}
openapi:
  layout: stacked
  schemaDefinitionsTagName: Schemas
  schemasExpansionLevel: all
  jsonSamplesExpandLevel: 1
  sortRequiredPropsFirst: true
  showExtensions: true
  hideSchemaTitles: true
  maxDisplayedEnumValues: 5
  downloadUrls:
    - title: Download OpenAPI description
      url: https://redocly.github.io/redoc/cafe.yaml
```

## Resources

- **[Redoc CE deployment guide](./deployment/intro.md)** - The different ways to deploy API documentation with Redoc CE
- **[Use Redocly CLI with Redoc CE](./deployment/cli.md)** - Pass options in `redocly.yaml` or as command line flags
- **[Use Redoc CE in HTML](./deployment/html.md)** - Pass options as attributes or through the `init` function
- **[Use Redoc CE React component](./deployment/react.md)** - Pass options in the `options` prop
- **[Use the Redoc CE Docker image](./deployment/docker.md)** - Pass options in the `REDOC_OPTIONS` environment variable
- **[Redoc CE specification extensions](./redoc-vendor-extensions.md)** - The `x-` extensions Redoc CE reads
- **[Migration from Redoc CE 2.x to 3.x](./config-migration.md)** - Migrate Redoc CE configuration to version 3.x
- **[Telemetry](./telemetry.md)** - The telemetry Redoc CE collects and how to turn it off
