---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# `showSchemaCatalogLinks`

Display links with a reference to a specific schema in an OpenAPI file which can be used as `$ref` value in other OpenAPI files within the same project.
These links are always displayed for OpenAPI requests and are shown for schemas when the [`schemaDefinitionsTagName`](./schema-definitions-tag-name.md) option is configured.

## Options

{% table %}

- Option
- Type
- Description

---

- showSchemaCatalogLinks
- boolean
- Displays links to schemas and requests on an OpenAPI page.
  These links can be used as `$ref` value in other OpenAPI files within the same project.
  Default value: `false`.

{% /table %}

## Examples

### Enable schema catalog links globally

Enable schema catalog links for all APIs in your project.

```yaml {% title="redocly.yaml" %}
openapi:
  showSchemaCatalogLinks: true
```

### Enable schema catalog links for a specific API

Enable schema catalog links for a single API while keeping them disabled for others.

```yaml {% title="redocly.yaml" %}
apis:
  main@v1:
    openapi:
      showSchemaCatalogLinks: true
```

### Disable schema catalog links for a specific API

Override global settings to disable schema catalog links for a particular API.

```yaml {% title="redocly.yaml" %}
openapi:
  showSchemaCatalogLinks: true

apis:
  main@v1:
    openapi:
      showSchemaCatalogLinks: false
```

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
