# Specification extensions

OpenAPI can be extended by using specification extensions.
> ## Specification Extensions
>
> While the OpenAPI Specification tries to accommodate most use cases, additional data can be added to extend the specification at certain points.
>
> The extensions properties are implemented as patterned fields that are always prefixed by `"x-"`.
>
> Field Pattern | Type | Description
> ---|:---:|---
> ^x- | Any | Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. Field names beginning `x-oai-` and `x-oas-` are reserved for uses defined by the [OpenAPI Initiative](https://www.openapis.org/). The value can be `null`, a primitive, an array or an object.
>
> The extensions may or may not be supported by the available tooling, but those may be extended as well to add requested support (if tools are internal or open-sourced).

Redocly has created and supports a [number of extensions](https://redocly.com/docs-legacy/api-reference-docs/spec-extensions/) which are represented visually in the API docs.

Redocly also supports additional extensions for lint rules and bundle decorators.
