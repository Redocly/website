---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `sanitize`

The `sanitize` option cleans HTML and Markdown in the OpenAPI description.
Use it when the description comes from a source you do not trust.

## Options

{% table %}

- Option
- Type
- Description

---

- sanitize
- boolean
- Remove unsafe HTML and Markdown to prevent [cross-site scripting (XSS) attacks](https://owasp.org/www-community/attacks/xss/).
  Default: `false`.


{% /table %}

## Examples

When set to `true`, Redoc treats the API description as untrusted.
It removes any markup that could run a script.

```yaml {% title="redocly.yaml" %}
openapi:
  sanitize: true
```

## Resources

- **[OpenAPI configuration](./index.md)** - All the options you can set under `openapi`.
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - The official standard for API descriptions.
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - A visual map of every part of an OpenAPI description.
- **[Configuration options](../index.md)** - All the other options for your project.
