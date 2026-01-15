# Configure Redoc CE

Redoc CE comes with many configuration options to help you customize your API documentation.

Each deployment type has documentation on how to configure options for that type of Redoc CE project.
This page lists all the options you can use with Redoc CE.

**Versions: 3.x**

Redoc CE 3.x supports the following configuration options:

- [`downloadUrls`](https://redocly.com/docs/realm/config/openapi/download-urls)
- [`generatedSamplesMaxDepth`](https://redocly.com/docs/realm/config/openapi/generated-samples-max-depth.md)
- [`hideDownloadButtons`](https://redocly.com/docs/realm/config/openapi/hide-download-buttons.md)
- [`hidePropertiesPrefix`](https://redocly.com/docs/realm/config/openapi/hide-properties-prefix.md)
- [`hideSchemaTitles`](https://redocly.com/docs/realm/config/openapi/hide-schema-titles.md)
- [`jsonSamplesExpandLevel`](https://redocly.com/docs/realm/config/openapi/json-samples-expand-level.md)
- [`layout`](https://redocly.com/docs/realm/config/openapi/layout.md)
- [`maxDisplayedEnumValues`](https://redocly.com/docs/realm/config/openapi/max-displayed-enum-values.md)
- [`onlyRequiredInSamples`](https://redocly.com/docs/realm/config/openapi/only-required-in-samples.md)
- [`sanitize`](https://redocly.com/docs/realm/config/openapi/sanitize.md)
- [`schemaDefinitionsTagName`](https://redocly.com/docs/realm/config/openapi/schema-definitions-tag-name.md)
- [`schemasExpansionLevel`](https://redocly.com/docs/realm/config/openapi/schemas-expansion-level.md)
- [`showExtensions`](https://redocly.com/docs/realm/config/openapi/show-extensions.md)
- [`sortRequiredPropsFirst`](https://redocly.com/docs/realm/config/openapi/sort-required-props-first.md)

Additionally, the following options are available from the previous versions of Redoc CE:

{% table %}

- Option
- Type
- Description

---

- skipBundle
- boolean
- When `true`, skips the bundle step when building API docs.
  Use when the description files are provided directly and do not require re-bundling.

---

- ignoreNamedSchemas
- [string]
- Provide a list of schema names to ignore when building docs.

---

- scrollYOffset
- string
- Specifies a vertical scroll-offset in pixels.
  Use when your docs have fixed positioned elements at the top of the page, such as navbars, headers, etc.

---

- hideLoading
- boolean
- When `true`, hides the loading animation.
  Does not apply to CLI-rendered docs.

---

- hideSidebar
- boolean
- When `true`, hides the left sidebar.


{% /table %}

Example:

```yaml
downloadUrls:
  - title: Download OpenApiDescription
    url: 'https://example.com/museum.yaml'
  - title: Download OpenApiDescription json
    url: 'https://example.com/museum.json'
schemaDefinitionsTagName: Schemas
hideSidebar: true
jsonSamplesExpandLevel: 1
generatedSamplesMaxDepth: 3
hideDownloadButtons: false
hideLoading: true
hideSchemaTitles: false
maxDisplayedEnumValues: 3
onlyRequiredInSamples: true
routingBasePath: docs/api
schemasExpansionLevel: 3
sortRequiredPropsFirst: true
showExtensions: true
sanitize: true
skipBundle: false
ignoreNamedSchemas: ['java.io.ObjectStreamField']
layout: three-panel
scrollYOffset: 100
hidePropertiesPrefix: false
```

## Resources

- **[Redoc CE deployment guide](./deployment/intro.md)** - Learn about the different ways you can deploy API documentation with Redoc CE
- **[Use the Redoc CE Docker image](./deployment/docker.md)** - Deploy API documentation with Docker
- **[Use Redoc CE in HTML](./deployment/html.md)** - Deploy API documentation embedded in an HTML page
- **[Use Redoc CE React component](./deployment/react.md)** - Deploy API documentation in a React page
- **[Migration from Redoc CE 2.x to 3.x](./config-migration.md)** - Migrate Redoc CE configuration to version 3.x
- **[Telemetry](./telemetry.md)** - Learn about the telemetry used in Redoc CE

