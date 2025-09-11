# OpenAPI extension: `x-servers`

{% admonition type="warning" name="Compatibility warning" %}

These specification extensions are supported only in OpenAPI 2.0.
For OpenAPI 3.0 and later, use the `servers` section.

{% /admonition %}

Use `x-servers` in your OpenAPI 2.0 documents to define one or more target hosts for the API.

This specification extension provides compatibility via backporting from the OpenAPI 3.0 [`servers`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#serverObject) object.
It doesn't support templates.

## Location

Use the `x-servers` extension in the root OpenAPI object.

## Options

{% table %}

- Option
- Type
- Description

---

- x-servers
- [ [Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#serverObject) ]
- A list of server objects used to add one or more target hosts for the API.

{% /table %}

## Examples

The following example show how to adds development and staging hosts to OpenAPi description.

```yaml
swagger: '2.0'
x-servers:
  - url: https://development.example.com/v1
    description: Development server
  - url: https://staging.example.com/v1
    description: Staging server
```

## Resources

- Configure the [mock server](../../../config/mock-server.md).
- Control which extensions are included in your API reference documentation with the [showExtensions configuration setting](../../../config/openapi/show-extensions.md).
- See all [openapi configuration settings](../../../config/openapi/index.md).
- See a full [list of supported OpenAPI extensions](./index.md).
