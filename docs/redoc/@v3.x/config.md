# Configure Redoc

Redoc comes with many configuration options to help you customize your API documentation.

Each deployment type has documentation on how to configure options for that type of Redoc project.
This page lists all the options you can use with Redoc.

**Versions: 3.x**

Redoc 3.x supports the following configuration options:

- [`downloadUrls`](../../public/config/openapi/download-urls.md)
- [`generatedSamplesMaxDepth`](../../public/config/openapi/generated-samples-max-depth.md)
- [`hideDownloadButtons`](../../public/config/openapi/hide-download-buttons.md)
- [`hidePropertiesPrefix`](../../public/config/openapi/hide-properties-prefix.md)
- [`hideSchemaTitles`](../../public/config/openapi/hide-schema-titles.md)
- [`jsonSamplesExpandLevel`](../../public/config/openapi/json-samples-expand-level.md)
- [`layout`](../../public/config/openapi/layout.md)
- [`maxDisplayedEnumValues`](../../public/config/openapi/max-displayed-enum-values.md)
- [`onlyRequiredInSamples`](../../public/config/openapi/only-required-in-samples.md)
- [`sanitize`](../../public/config/openapi/sanitize.md)
- [`schemaDefinitionsTagName`](../../public/config/openapi/schema-definitions-tag-name.md)
- [`schemasExpansionLevel`](../../public/config/openapi/schemas-expansion-level.md)
- [`showExtensions`](../../public/config/openapi/show-extensions.md)
- [`sortRequiredPropsFirst`](../../public/config/openapi/sort-required-props-first.md)

Additionally, the following options are available from the previous versions of Redoc:

{% table %}

- Option
- Type
- Description

---

- skipBundle
- boolean
- Used when the definition is provided directly and should not be re-bundled.

---

- ignoreNamedSchemas
- [string]
- Ignore specific schema by name.

---

- scrollYOffset
- string
- Specifies a vertical scroll-offset.
This setting is useful when there are fixed positioned elements at the top of the page, such as navbars, headers, etc.

---

- hideLoading
- boolean
- Hides the loading animation. Does not apply to CLI.

---

- hideSidebar
- boolean
- Hides the left sidebar.

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

- **[Redoc deployment guide](./deployment/intro.md)** - Learn about the different ways you can deploy API documentation with Redoc
- **[Use the Redoc Docker image](./deployment/docker.md)** - Deploy API documentation with Docker
- **[Use Redoc in HTML](./deployment/html.md)** - Deploy API documentation embedded in an HTML page
- **[Use Redoc React component](./deployment/react.md)** - Deploy API documentation in a React page
- **[Migration from Redoc 2.x to 3.x](./config-migration.md)** - Migrate Redoc configuration to version 3.x
- **[Telemetry](./telemetry.md)** - Learn about the telemetry used in Redoc

