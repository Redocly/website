---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `downloadUrls`

Set the URLs used to download the OpenAPI description or other documentation related files from the API documentation page.

## Options

{% table %}

- Option
- Type
- Description

---

- downloadUrls
- [[downloadUrls object](#api-description-url-object)]
- Set the URLs used to download the OpenAPI description or other related to documentation files from the API documentation.

{% /table %}

### API description URL object

{% table %}

- Option
- Type
- Description

---

- title
- string
-
  Custom title to use for displaying in _Download OpenAPI specification section_ for specific url.
  This title can help users quickly identify what the content is about
  or what it represents before they access the download URL provided in the object.

---

- url
- string
-
  --REQUIRED.--
  An absolute URL to the file.

{% /table %}

## Examples

The following example sets the download URLs for an OpenAPI description:

```yaml {% title="redocly.yaml" %}
openapi:
  downloadUrls:
    - title: Download OpenApiDescription
      url: 'https://example.com/museum.yaml'
```

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[Hide download buttons](./hide-download-buttons.md)** - Toggle the appearance of download buttons used to access your API description files
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- [OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)
- Explore other [configuration options](../index.md) for your project.
