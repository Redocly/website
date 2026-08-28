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

Set the URLs used to download the AsyncAPI description or other documentation related files from the API documentation page.

## Options

{% table %}

- Option
- Type
- Description

---

- downloadUrls
- [[downloadUrls object](#api-description-url-object)]
- Set the URLs used to download the AsyncAPI description or other related to documentation files from the API documentation.

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
  Custom title displayed in **Download AsyncAPI** description section for a specific URL.
  This title can help users quickly identify what the content is about or represents.
  Users see it before they access the download URL provided in the object.

---

- url
- string
-
  **REQUIRED.**
  An absolute URL to the file.

{% /table %}

## Examples

The following example sets the download URLs for an AsyncAPI description:

```yaml {% title="redocly.yaml" %}
asyncapi:
  downloadUrls:
    - title: Download Events API
      url: 'https://example.com/events.yaml'
```

## Resources

- **[AsyncAPI configuration](./index.md)** - Complete guide to AsyncAPI configuration options for customizing API reference documentation
- **[AsyncAPI Specification](https://www.asyncapi.com/docs/reference/specification/latest)** - Official AsyncAPI Specification documentation for understanding event-driven API description standards
- **[Add AsyncAPI descriptions](../../content/api-docs/add-asyncapi-docs.md)** - Step-by-step guide to adding AsyncAPI documentation to your Redocly project
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
