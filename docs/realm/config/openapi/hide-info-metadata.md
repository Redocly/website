---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `hideInfoMetadata`

You can add metadata to an API with the `info.x-metadata` extension or the `metadata` configuration option.
The API reference displays that metadata by default.

{% admonition type="info" %}
{% partial file="../../_partials/config/_unsupported-redoc-ce.md" variables={"optionName": "hideInfoMetadata"} /%}
{% /admonition %}

{% img
  src="../images/metadata-show.png"
  alt="Screenshot of API documentation where hideInfoMetadata option is set to false"
  withLightbox=true
/%}

To omit the metadata section, set the `hideInfoMetadata` option.


## Options

{% table %}

- Option
- Type
- Description

---

- hideInfoMetadata
- boolean
- Hide the **OpenAPI info metadata** section of the API reference page.
  Default: `false`.


{% /table %}

## Examples

The following example hides the `metadata` content:

```yaml {% title="redocly.yaml" %}
openapi:
  hideInfoMetadata: true
```

```yaml {% title="openapi.yaml" %}
openapi: 3.1.0
info:
  title: Redocly Museum API
  description: Imaginary, but delightful Museum API for interacting with museum services and information.
  Built with love by Redocly.
  version: 1.1.0
  x-metadata:
    createdAt: '2016-11-15T00:53:45.524Z'
    domain: fake-museum-example.com
...
```

{% img
  src="../images/metadata-hide.png"
  alt="Screenshot of API documentation where hideInfoMetadata is set to true"
  withLightbox=true
/%}

## Resources

- **[OpenAPI configuration](./index.md)** - All the options you can set under `openapi`.
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - The official standard for API descriptions.
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - A visual map of every part of an OpenAPI description.
- **[Configuration options](../index.md)** - All the other options for your project.
