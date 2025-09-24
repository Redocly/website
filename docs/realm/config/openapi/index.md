---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: |-
  Customize the behavior and appearance of integrated API documentation.
  Requires an OpenAPI description.
---
# `openapi`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}

## Options

{% table %}

- Option
- Type
- Description

---

- [codeSamples](./code-samples.md)
- [Code Samples object](./code-samples.md)
- Configure the generated code samples in your API documentation.

---

- [corsProxyUrl](./cors-proxy-url.md)
- string
- Specifies custom CORS proxy server.

---

- [downloadUrls](./download-urls.md)
- [[API description URL object](./download-urls.md#api-description-url-object)]
- List the URLs used to download the API description in JSON or YAML format.

---

- [events](./events.md)
- object
- Event hooks to get notified about various user events in API docs

---

- excludeFromSearch
- boolean
- Excludes an OpenAPI description file from search results and `llms.txt` when set to `true`.
  Default: `false`.

  You can [apply it to a specific files](#exclude-an-api-from-search), or to [all OpenAPI descriptions](#exclude-all-apis-from-search).

---

- feedback
- [Feedback object](../feedback.md#options)
- Hide or customize the type of or text included in the feedback form that displays at the end of each endpoint.

---

- [generatedSamplesMaxDepth](./generated-samples-max-depth.md)
- number
- Sets the number of levels to display in generated payload samples.

---

- [hideDownloadButtons](./hide-download-buttons.md)
- boolean
- Toggle the appearance of a **Download OpenAPI description** section.

---

- [hideInfoMetadata](./hide-info-metadata.md)
- boolean
- Toggle the appearance of **OpenAPI info metadata** sections.

---

- [hidePropertiesPrefix](./hide-properties-prefix.md)
- boolean
- Hides the parent name for nested properties.

---

- [hideReplay](./hide-replay.md)
- boolean
- Hides the Replay (Try it) functionality.

---

- [hideSchemaTitles](./hide-schema-titles.md)
- boolean
- Hides the schema field title next to the type.

---

- [jsonSamplesExpandLevel](./json-samples-expand-level.md)
- number | string
- Sets the default expand level for JSON payload samples.
  Use `all` to expand all levels.

---

- [layout](./layout.md)
- string
- Specifies layout options for OpenAPI documentation.
  Possible values: `three-panel` | `stacked`.
  Default value: `three-panel`.

---

- [maxDisplayedEnumValues](./max-displayed-enum-values.md)
- number
- Specifies number of enum values to display.

---

- [onlyRequiredInSamples](./only-required-in-samples.md)
- boolean
- Displays only required fields in request samples.

---

- [sanitize](./sanitize.md)
- boolean
- Sanitize HTML/Markdown to prevent [cross-site scripting (XSS)](https://owasp.org/www-community/attacks/xss/) attacks.

---

- [schemaDefinitionsTagName](./schema-definitions-tag-name.md)
- string
- Sets a schema definitions tag name that is applied to all schemas and displayed in the sidebar navigation.

---

- [schemasExpansionLevel](./schemas-expansion-level.md)
- number | string
- Sets the default expand level for schemas.
  Use `all` to expand all levels.

---

- [showExtensions](./show-extensions.md)
- [string] | boolean
- Displays specification extensions ('x-' fields).
  If a list is provided, only those specification extensions are displayed.

---

- [sortRequiredPropsFirst](./sort-required-props-first.md)
- boolean
- Sorts schema properties to display required properties first.

{% /table %}


## Examples

### Configure multiple APIs

In your config file, the openapi options can be defined in the root-level or per-API.

- Root-level options apply to all API descriptions.
- API-level options apply only to individual descriptions.
- If both are present, then the options are merged, but the _per-API options take precedence_.

The following example shows separate configurations for multiple APIs:

```yaml {% title="redocly.yaml" %}
logo: images/awesome-logo.svg
openapi:
  hideReplay: true
apis:
  museum@default:
    root: 'openapi/museum.yaml'
    openapi:
      downloadUrls:
        - title: Download OpenApiDescription
          url: 'https://github.com/Redocly/museum-openapi-example/blob/main/openapi.yaml'
      hideReplay: false
      codeSamples:
        languages:
          - lang: 'curl'
            label: 'curl'
      hideRequestPayloadSample: true
  museum@test:
    root: 'openapi/museum-test.yaml'
    openapi:
      hideDownloadButtons: true
      hideReplay: true
      codeSamples:
        languages:
          - lang: 'Node.js'
          - lang: 'go'
rules:
  example-rule-name: error
```

### Exclude an API from search

To exclude a specific API from the search results, locate the API in `redocly.yaml` and under the `openapi` key, set the `excludeFromSearch` option to `true`.

```yaml {% title="redocly.yaml" %}
apis:
  museum@default:
    root: 'openapi/redocly-museum.yaml'
    openapi:
      excludeFromSearch: true
```

### Exclude all APIs from search

To exclude all APIs from the search results, under the `openapi` key, set the `excludeFromSearch` option to `true`.

```yaml {% title="redocly.yaml" %}
openapi:
  excludeFromSearch: true
```

## Resources

- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards and best practices
- **[Migration guide](./config-migration.md)** - Migrate from reference docs 2.x to the newest Redoc configuration for updated features and functionality
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
