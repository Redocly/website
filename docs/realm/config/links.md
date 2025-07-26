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
# `links`

{% admonition type="warning" %}
Formerly known as the `stylesheets` option.
{% /admonition %}

Add custom fonts, stylesheets, and other links to pages.
These links are added to the `<head>` HTML element of each page of your published project.
The `@theme/styles.css` file is imported automatically.

## Options

`links` is a list of `link` objects.

### Link object

{% table %}

- Option
- Type
- Description

---

- href
- string
- **REQUIRED**.
  URL or path to the linked document (such as a stylesheet, image, etc.).

---

- as
- string
- Specifies type of content being loaded by the link.

---

- crossorigin
- string
- Specifies if CORS is used to send the request.

---

- fetchpriority
- string
- Specifies if the fetch priority.

---

- hreflang
- string
- Specifies the language of the linked document.

---

- imagesizes
- string
- Indicates to preload the appropriate resource used by an `<img>` element with corresponding values for its `srcset` and `sizes` attributes.

---

- imagesrcset
- string
- Indicates to preload the appropriate resource used by an `<img>` element with corresponding values for its `srcset` and `sizes` attributes.

---

- integrity
- string
- Contains inline metadata — a base64-encoded cryptographic hash of the resource (file) you're telling the browser to fetch.

---

- media
- string
- Value must be a media type.

---

- prefetch
- boolean
- Identifies a resource that might be required by the next navigation and that the user agent should retrieve it.
  This allows the user agent to respond faster when the resource is requested in the future.

---

- referrerpolicy
- string
- Adds the `referrerpolicy` attribute with corresponding value to the script tag.
  Possible values: `no-referrer`, `no-referrer-when-downgrade`, `origin`, `origin-when-cross-origin`, `same-origin`, `strict-origin`, `strict-origin-when-cross-origin`, `unsafe-url`, `''`.
  Default value: `strict-origin-when-cross-origin` (with fallback to `''`).

---

- rel
- string
- Names a relationship of the linked document to the current document.
  The attribute must be a space-separated list of link type values.

---

- sizes
- string
- Defines the sizes of the icons for visual media contained in the resource.

---

- title
- string
- Has special semantics on the `<link>` element.
  When used on a `<link rel="stylesheet">` it defines a default or an alternate stylesheet.

---

- type
- string
- Define the type of the content linked to.
  The value of the attribute should be a MIME type such as text/html, text/css, and so on.

{% /table %}

## Example

```yaml
links:
  - href: ./css/fix.css
    rel: stylesheet
  - href: https://fonts.gstatic.com
    rel: preconnect
  - href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700'
```

The example above will produce following link tags:

```html
<link href="/static/assets/fix-abc45ff91aedc.css" rel="stylesheet" />
<link href="https://fonts.gstatic.com" rel="preconnect" />
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700" />
```

## Related options

- [scripts](./scripts.md)

## Resources

- [Add custom CSS styles](../branding/customize-styles.md)
