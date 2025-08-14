---
excludeFromSearch: true
---

# x-servers

{% admonition type="info" name="Compatibility warning" %}

This specification extension is supported only in OpenAPI 2.0.

{% /admonition %}

## Usage

Use `x-servers` in your OpenAPI 2.0 documents to define one or more target hosts for the API. Add it to the root OpenAPI object.

This specification extension provides compatibility via backporting from the OpenAPI 3.0 [`servers`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#serverObject) object. It doesn't support templates.

## Examples

```yaml
swagger: '2.0'
info: ...
tags: [...]
x-servers:
  - url: https://development.gigantic-server.com/v1
    description: Development server
  - url: https://staging.gigantic-server.com/v1
    description: Staging server
```
