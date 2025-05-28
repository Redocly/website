# `openapi`

**REQUIRED**

Type: `string`

> This string MUST be the semantic version number of the OpenAPI Specification version that the OpenAPI document uses. The openapi field SHOULD be used by tooling specifications and clients to interpret the OpenAPI document. This is not related to the API info.version string.

## Visuals

There is no visual example for this particular property.

```yaml OAS 3.0
openapi: 3.0.3
```
```yaml OAS 3.1
openapi: 3.1.0
```

The value for the `openapi` map must be a string.
The values `3.0` or `3.1` convert to a number by YAML processors so it isn't correct unless it's quoted to indicate it's a string.

```yaml OAS 3.0
openapi: "3.0"
```

The closest thing to a visual is the download button.

![download button](./images/openapi-download-button.png)

The download button can be disabled with the configuration option `hideDownloadButton` set to `true`.

## Types

The `openapi` property is part of the root object.
The name for the root object is `Root`:

- `Root`

{% admonition type="info" name="Swagger 2.0" %}
Prior to version 3.0.0, the root object property was named `swagger`.
{% /admonition %}
