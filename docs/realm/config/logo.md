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
# `logo`

Use the `logo` section to display a custom logo in the project navbar.

You must provide the path to the logo image as the value of the `image` property in the logo object. The image file may be external or must exist in the project.

## Options

{% table %}

- Option
- Type
- Description

---

- image
- string
- **Conditionally required**. URL or path to the image file (png or svg) of the logo.

---

- srcSet
- string
- **Conditionally required**. Comma-separated list of logo file paths and corresponding color mode. When configured, the logo changes when the user switches between color modes.

---

- altText
- string
- Alternate text for the logo.

---

- link
- string
- Logo link to a full URL including the protocol (for example, `https://www.redocly.com).

---

- favicon
- string
- URL or path to the favicon (png or svg).

{% /table %}

\* Logo object must include either `image` or `srcSet` ("mutually exclusive").

## Examples

### Logo from local asset

```yaml {% title="redocly.yaml" %}
logo:
  image: ./images/logos/logo-example.svg
  altText: Amazing example logo
  link: "https://example.com"
  favicon: ./images/logos/favicon-example.svg
```

### Logo from URL

```yaml {% title="redocly.yaml" %}
logo:
  image: "https://example.com/logo-example.svg"
  altText: Amazing example logo
  link: "https://example.com"
  favicon: "https://example.com/favicon.ico"
```

### Logo from srcSet

Used to configure logos for a specific color mode.

```yaml {% title="redocly.yaml" %}
logo:
  srcSet: "./images/example-logo-light.svg light, ./images/example-logo-dark.svg dark"
  altText: Amazing example logo
  link: "https://example.com"
  favicon: ./images/logos/favicon-example.svg
```

## Related options

- [navbar](navbar.md)

## Resources

- Explore other [configuration options](./index.md) for your project.
