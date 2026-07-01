---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: |-
  Customize the behavior and appearance of AsyncAPI documentation.
  Requires an AsyncAPI description file.
---
# `asyncapi`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Customize the behavior and appearance of AsyncAPI documentation.
Requires an AsyncAPI description file.

## Options

{% table %}

- Option
- Type
- Description

---

- [downloadUrls](./download-urls.md)
- [[API description URL object](./download-urls.md#api-description-url-object)]
- List the URLs used to download the AsyncAPI description in JSON or YAML format.

---

- excludeFromSearch
- boolean
- Excludes an AsyncAPI description file from search results and `llms.txt` when set to `true`.
  Default: `false`.

  You can [apply it to a specific file](#exclude-an-api-from-search), or to [all AsyncAPI descriptions](#exclude-all-apis-from-search).

---

- feedback
- [Feedback object](../feedback.md#options)
- Hide or customize the type of or text included in the feedback form that displays at the end of each page.

---

- [jsonSamplesDepth](./json-samples-depth.md)
- number
- Sets the default depth for rendering JSON samples in protocol binding panels.
  Default value: `3`.

---

- [layout](./layout.md)
- string
- Specifies layout options for AsyncAPI documentation.
  Possible values: `three-panel` | `stacked`.
  Default value: `three-panel`.

{% /table %}

## Examples

### Configure multiple APIs

In your config file, the asyncapi options can be defined in the root-level or per-API.

- Root-level options apply to all API descriptions.
- API-level options apply only to individual descriptions.
- If both are present, then the options are merged, but the _per-API options take precedence_.

The following example shows separate configurations for multiple APIs:

```yaml {% title="redocly.yaml" %}
logo: images/awesome-logo.svg
asyncapi:
  layout: stacked
apis:
  events@default:
    root: 'asyncapi/events.yaml'
    asyncapi:
      downloadUrls:
        - title: Download AsyncAPI description
          url: 'https://github.com/Redocly/museum-events-example/blob/main/events.yaml'
      jsonSamplesDepth: 4
  events@v2:
    root: 'asyncapi/events-v2.yaml'
    asyncapi:
      layout: three-panel
rules:
  example-rule-name: error
```

### Exclude an API from search

To exclude a specific API from the search results, locate the API in `redocly.yaml` and under the `asyncapi` key, set the `excludeFromSearch` option to `true`.

```yaml {% title="redocly.yaml" %}
apis:
  events@default:
    root: 'asyncapi/events.yaml'
    asyncapi:
      excludeFromSearch: true
```

### Exclude all APIs from search

To exclude all APIs from the search results, under the `asyncapi` key, set the `excludeFromSearch` option to `true`.

```yaml {% title="redocly.yaml" %}
asyncapi:
  excludeFromSearch: true
```

## Resources

- **[AsyncAPI Specification](https://www.asyncapi.com/docs/reference/specification/latest)** - Official AsyncAPI Specification documentation for understanding event-driven API description standards and best practices
- **[Add AsyncAPI descriptions](../../content/api-docs/add-asyncapi-docs.md)** - Step-by-step guide to adding AsyncAPI documentation to your Redocly project
- **[Supported AsyncAPI extensions](../../content/api-docs/asyncapi-extensions/index.md)** - Complete list of all AsyncAPI extensions supported by Redocly for enhanced API documentation
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
