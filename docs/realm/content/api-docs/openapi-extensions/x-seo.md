# OpenAPI extension: `x-seo`

Use `x-seo` to control the SEO meta tags rendered in the HTML `<head>` of an individual operation page: the page title, description, keywords, and the image used when the page link is shared.

{% admonition type="info" %}
`x-seo` replaces the legacy Redoc `x-meta` extension (and its nested `seo` object).
The supported fields are identical: `title`, `description`, `keywords`, and `image`.
{% /admonition %}

## Location

Use the `x-seo` extension in an Operation Object.

## Options

{% table %}

- Option
- Type
- Description

---

- title
- string
- Sets the page `<title>`, and the `og:title` and `twitter:title` meta tags for the operation page.

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

When a field is omitted, `title` and `description` fall back to the operation `summary`.
`keywords` and `image` have no fallback and are added only when set.

## Examples

The following example sets all four SEO fields on the `getMuseumHours` operation:

```yaml
paths:
  /museum-hours:
    get:
      summary: Get museum hours
      operationId: getMuseumHours
      x-seo:
        title: "Custom page title"
        description: "Detailed page description"
        keywords: documentation, operation, example
        image: 'https://example.com/image.png'
      responses: [...]
```

Each field is resolved independently, so you can override only the fields you need.
In the following example, `title` and `description` fall back to the operation `summary`, while `keywords` and `image` come from the extension:

```yaml
paths:
  /museum-hours:
    get:
      summary: Get museum hours
      operationId: getMuseumHours
      x-seo:
        keywords: museum, hours, opening times
        image: 'https://example.com/museum.png'
      responses: [...]
```

## Resources

- **[Search engine optimization](../../realm-seo.md)** - Configure site-wide SEO, meta tags, and social sharing for your Redocly project.
- **[x-metadata](./x-metadata.md)** - Add a custom metadata table to the top of the API overview (info-level metadata).
- **[Show extensions configuration](../../../config/openapi/show-extensions.md)** - Control which extensions are included in your API reference documentation for optimal presentation.
- **[Supported OpenAPI extensions](./index.md)** - Complete list of all OpenAPI extensions supported by Redocly for enhanced API documentation.
