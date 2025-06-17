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

## Related options

- [openapi](./index.md) - Learn more about using `openapi` configuration.

## Resources

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/docs/openapi-visual-reference/)
