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
# `redirects`

Redirects allow you to change which resource a URL points to.
Read about how to [manage redirects](../content/add-redirects.md) for more explanation and examples.
The configuration options are detailed below.

## Options

### Sources map

{% table %}

- Option
- Type
- Description

---

- _/{source}_
- [Destination object](#destination-object)
- **REQUIRED**.
  Source is an absolute path that must start with a forward slash.
  It may be an exact path; for example: `/sample/content/`.
  Alternatively it may use a wildcard at the end of the absolute path; for example: `/sample/*`.
  The wildcard symbol (`*`) is only supported as the last path segment.

{% /table %}

### Destination object

{% table %}

- Option
- Type
- Description

---

- to
- string
- **REQUIRED**.
  Absolute path to the destination. It may be an exact path; for example: `/new-url/`.
  Alternatively, it may be a URL to an external resource; for example: `https://redocly.com`.
  If the source uses a wildcard, the destination may also use a wildcard at the end of the path to indicate that the matched part of the path should be used; for example `/new-url/*`, `https://redocly.com/*`.
  This option is not available for redirects defined in front matter.

---

- type
- integer
- HTTP status code for the redirect.
  Default value: `301`.

{% /table %}

## Examples

The following is an example of redirects configured in `redocly.yaml`:

```yaml
redirects:
  '/some-old-url/':
    to: '/new-url/'
  '/some-other-old-url':
    to: '/new-url/'
    type: 307
  '/external-redirect/':
    to: 'https://redocly.com'
  '/url-with-wildcard-redirect/*':
    to: '/new-url/*'
```

## Resources

- Read more about [how to manage redirects](../content/add-redirects.md).
