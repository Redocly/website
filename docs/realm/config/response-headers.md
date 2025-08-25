---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `responseHeaders`

You can configure custom response headers for your project. Custom headers are added to the response header object if requested resource matches a configured pattern.

## Options

### Patterns map

{% table %}

- Option
- Type
- Description

---

- _{glob pattern}_
- [[Header object](#header-object)]
- **REQUIRED.** A glob pattern used to match requested resource. It can match any assets, routes, or both.

{% /table %}

### Header object

{% table %}

- Option
- Type
- Description

---

- name
- string
- Response header name

---

- value
- string
- Response header value

{% /table %}

## Examples

The following is an example of custom headers for CSS, JS files, and a /my-markdown/ route:

```yaml
responseHeaders:
  '**/*.js':
    - name: X-Content-Type-Options
      value: nosniff
    - name: Cache-Control
      value: no-cache

  '**/*.css':
    - name: X-XSS-Protection
      value: 1; mode=block

  /my-markdown/:
    - name: X-Frame-Options
      value: DENY
```

## Resources

- **[Block search indexing](./seo.md#block-indexing-with-response-headers)** - Use responseHeaders to control search engine indexing and SEO optimization strategies
