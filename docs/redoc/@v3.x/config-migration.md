---
seo:
  title: Migration from Redoc CE 2.x to 3.x
---

# Migration from Redoc CE 2.x to 3.x

Redoc CE 3.x is a new renderer.
It keeps the `<redoc>` element, the `init` function, and the `RedocStandalone` component.
However, the script format, some names, and the set of configuration options changed.
This page lists what to update when you move a Redoc CE 2.x page to 3.x.

## Page and API changes

{% table %}

- Redoc CE 2.x
- Redoc CE 3.x

---

- `<script src="…/bundles/redoc.standalone.js">`
- `<script type="module" src="…/bundle/redoc.standalone.js">`.
  The bundle is an ES module and lives in the `bundle` folder of the package.

---

- `Redoc.init(specOrSpecUrl, options, element, callback)` on the global `Redoc` object
- `init(specOrSpecUrl, options, element)` imported from the bundle: `import { init } from '…/bundle/redoc.standalone.js'`.
  There is no callback argument and no global object.

---

- OpenAPI only
- OpenAPI, AsyncAPI, and GraphQL descriptions, detected from the file.
  See [Supported specifications](./supported-specifications.md).

---

- `<RedocStandalone specUrl="…" />` and `<RedocStandalone spec={…} />`
- Unchanged.
  `specUrl` also accepts AsyncAPI documents and GraphQL schema files, and `spec` also accepts a GraphQL schema in SDL.
  `options` and `onLoaded` keep their names.

---

- Peer dependencies `react`, `react-dom`, `mobx`, `styled-components`, `core-js`
- Peer dependencies `react` and `react-dom` 19.2.7, `styled-components` 6, and `@redocly/config`.

---

- Deep links in the URL fragment, for example `#tag/Events/operation/listSpecialEvents`
- Deep links in the URL fragment by default, for example `#/events/listspecialevents`, or path-based with `router="history"` and `base-path`.
  Redoc CE 3.x does not recognize the 2.x fragment format, so update links you have shared.

---

- Search only when `disableSearch` is not set
- Search is always available.

---

- Telemetry not collected
- Anonymous [telemetry](./telemetry.md) is collected by default and turned off with `disable-telemetry="true"`.

---

- `<!-- Redoc-Inject: <security-definitions> -->` in `info.description`
- Removed.
  Each operation shows its security requirements with a **View security details** action.

---

- Vendor extensions from the 2.x list
- All 2.x extensions keep working, and 3.x adds `x-tags` and `x-mcp`.
  See [specification extensions](./redoc-vendor-extensions.md) for the full list and the Redocly-only extensions Redoc CE ignores.

{% /table %}

## Configuration options

The following table contains the changes in configuration options between Redoc CE 2.x and Redoc CE 3.x.
Options that stayed the same are listed to confirm they still apply.

{% table %}

- Option in 2.x
- Type in 2.x
- In 3.x

---

- `disableSearch`
- `boolean`
- Removed.
  Search is always available.

---

- `downloadDefinitionUrl`, `downloadFileName`
- `string`
- Replaced by `downloadUrls`, a list of `{ title, url }` objects

---

- `downloadUrls`
- `[{ title?, url }]`
- Unchanged

---

- `expandDefaultServerVariables`
- `boolean`
- Removed

---

- `expandResponses`
- `{ [code: string]: boolean } | 'all'`
- Removed

---

- `expandSingleSchemaField`
- `boolean`
- Removed

---

- `generatedSamplesMaxDepth`
- `number`
- Unchanged.
  The default changed from `10` to `8`.

---

- `hideDownloadButton`
- `boolean`
- Renamed to `hideDownloadButtons`

---

- `hideDownloadButtons`
- `boolean`
- Unchanged

---

- `hideHostname`
- `boolean`
- Removed

---

- `hideLoading`
- `boolean`
- Unchanged

---

- `hideOneOfDescription`
- `boolean`
- Removed

---

- `hidePropertiesPrefix`
- `boolean`
- Unchanged.
  The default changed from `true` to `false`.

---

- `hideRequestPayloadSample`
- `boolean`
- Removed

---

- `hideSchemaPattern`
- `boolean`
- Unchanged

---

- `hideSchemaTitles`
- `boolean`
- Unchanged

---

- `hideSecuritySection`
- `boolean`
- Removed

---

- `hideSingleRequestSampleTab`
- `boolean`
- Removed

---

- `jsonSampleExpandLevel`
- `number | 'all'`
- Renamed to `jsonSamplesExpandLevel`

---

- `jsonSamplesExpandLevel`
- `number | 'all'`
- Unchanged

---

- `maxDisplayedEnumValues`
- `number`
- Unchanged.
  When not set, 3.x displays `10` values before collapsing the rest, where 2.x displayed all of them.

---

- `menuToggle`
- `boolean`
- Removed

---

- `minCharacterLengthToInitSearch`
- `number`
- Removed

---

- `nativeScrollbars`
- `boolean`
- Removed

---

- `onlyRequiredInSamples`
- `boolean`
- Unchanged

---

- `pathInMiddlePanel`
- `boolean`
- Removed

---

- `payloadSampleIdx`
- `number`
- Removed

---

- `requiredPropsFirst`
- `boolean`
- Renamed to `sortRequiredPropsFirst`.
  The old name is still accepted.

---

- `sanitize`
- `boolean`
- Unchanged

---

- `schemaDefinitionsTagName`
- `string`
- Unchanged

---

- `schemaExpansionLevel`
- `number | 'all'`
- Renamed to `schemasExpansionLevel`

---

- `schemasExpansionLevel`
- `number | 'all'`
- Unchanged

---

- `scrollYOffset`
- `number | string | () => number`
- Accepts a number or a function.
  CSS selector strings are no longer supported.

---

- `showExtensions`
- `boolean | [string]`
- Unchanged.
  As an attribute, a comma-separated string is also accepted.

---

- `showObjectSchemaExamples`
- `boolean`
- Removed

---

- `showWebhookVerb`
- `boolean`
- Removed

---

- `simpleOneOfTypeLabel`
- `boolean`
- Removed

---

- `sortEnumValuesAlphabetically`, `sortOperationsAlphabetically`, `sortPropsAlphabetically`, `sortTagsAlphabetically`
- `boolean`
- Removed

---

- `sortRequiredPropsFirst`
- `boolean`
- Unchanged

---

- `theme`
- `object`
- Removed.
  Customize the appearance with [CSS variables](./deployment/html.md#theme-configuration) instead.

---

- `untrustedSpec`
- `boolean`
- Renamed to `sanitize`

{% /table %}

## New options in 3.x

- `layout`: `three-panel` or `stacked`.
- `router` and `basePath`: hash or path-based deep links.
- `disableTelemetry`: turn off telemetry.
- `events`: callbacks for reader interactions.
- `codeSamples.languages`: order and labels of the sample languages.
- `ignoreNamedSchemas` and `skipBundle`: control how the description is processed.
- AsyncAPI and GraphQL options such as `jsonSamplesDepth`, `menu`, and `info`.

See [Configure Redoc CE](./config.md) for the full reference.

## Resources

- **[Configure Redoc CE](./config.md)** - Configuration options for Redoc CE 3.x
- **[Use Redoc CE in HTML](./deployment/html.md)** - Update the script tag, attributes, and `init` calls
- **[Use Redoc CE React component](./deployment/react.md)** - Update the `RedocStandalone` props and dependencies
