---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# AsyncAPI extension: `x-seo`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Use `x-seo` to control the SEO meta tags rendered in the HTML `<head>` of an individual operation or channel page: the page title, description, keywords, and the image used when the page link is shared.

## Location

The `x-seo` extension can be added to an Operation Object or a Channel Object.

## Options

{% table %}

- Option
- Type
- Description

---

- title
- string
- Sets the page `<title>`, and the `og:title` and `twitter:title` meta tags for the page.

---

- description
- string
- Sets the `<meta name="description">`, and the `og:description` and `twitter:description` meta tags.

---

- keywords
- string
- Sets the `<meta name="keywords">` tag. Provide a comma-separated list of keywords.

---

- image
- string
- Sets the `og:image` and `twitter:image` meta tags — the rich preview image shown when the page link is shared.

{% /table %}

When a field is omitted, `title` and `description` fall back to the operation or channel `title` and `description`.
`keywords` and `image` have no fallback and are added only when set.

## Examples

### `x-seo` on an operation

```yaml
operations:
  receiveLightMeasurement:
    action: receive
    channel:
      $ref: '#/channels/lightMeasured'
    x-seo:
      title: "Custom page title"
      description: "Detailed page description"
      keywords: documentation, operation, example
      image: 'https://example.com/image.png'
```

### `x-seo` on a channel

```yaml
channels:
  lightMeasured:
    address: light/measured
    x-seo:
      title: "Light measured channel"
      description: "Events emitted whenever the light intensity changes"
      keywords: events, light, telemetry
      image: 'https://example.com/light.png'
```

## Resources

- **[Search engine optimization](../../realm-seo.md)** - Configure site-wide SEO, meta tags, and social sharing for your Redocly project.
- **[x-metadata](./x-metadata.md)** - Add a custom metadata table to the top of the API overview (info-level metadata).
- **[Supported AsyncAPI extensions](./index.md)** - Complete list of all AsyncAPI extensions supported by Redocly for enhanced API documentation.
