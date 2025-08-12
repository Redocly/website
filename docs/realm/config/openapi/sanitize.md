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

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - Visual guide to OpenAPI specification structure and HTML sanitization practices
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
