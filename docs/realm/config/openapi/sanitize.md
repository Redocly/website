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

The `sanitize` option enables HTML/Markdown sanitization for the OpenAPI description.

## Options

{% table %}

* Option
* Type
* Description

---

* sanitize
* boolean
* Sanitize HTML/Markdown to prevent [cross-site scripting (XSS) attacks](https://owasp.org/www-community/attacks/xss/). Default value is `false`.


{% /table %}

## Examples

If set to `true`, the API description is considered untrusted and all HTML/Markdown is sanitized to prevent XSS.

```yaml {% title="redocly.yaml" %}
openapi:
  sanitize: true
```

## Resources

- [openapi](./index.md) - Learn more about using `openapi` configuration.
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)
- Explore other [configuration options](../index.md) for your project.
