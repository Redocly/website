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

Provide the path to the logo image as the value of the `image` property in the logo object.
The image file may be external or must exist in the project.

Alternatively, use `srcSet` to configure separate images for each color mode.

## Options

{% table %}

- Option
- Type
- Description

---

- image
- string
- **Conditionally required**.
  URL or path to the image file (png or svg) of the logo.
  Mutually exclusive with `srcSet`.

---

- srcSet
- string
- **Conditionally required**.
  Comma-separated list of logo file paths and corresponding color modes.
  When configured, the logo changes when the user switches between color modes.
  Mutually exclusive with `image`.

---

- altText
- string
- Alternative text for the logo.

---

- link
- string
- Logo link to a full URL including the protocol (for example, `https://www.redocly.com).

---

- favicon
- string
- URL or path to the favicon (png or svg).

{% /table %}

## Examples

### Add a logo using a local file

The following is an example of `logo` configuration with `image` and `favicon` from project's assets.

```yaml {% title="redocly.yaml" %}
logo:
  image: ./images/logos/logo-example.svg
  altText: Amazing example logo
  link: "https://example.com"
  favicon: ./images/logos/favicon-example.svg
```

### Add a logo using a remote file

The following is an example of `logo` configuration with `image` and `favicon` from remote assets.


```yaml {% title="redocly.yaml" %}
logo:
  image: "https://example.com/logo-example.svg"
  altText: Amazing example logo
  link: "https://example.com"
  favicon: "https://example.com/favicon.ico"
```

### Add separate logo images for color modes

The following is an example of `logo` configuration with separate logo images for the light and the dark color mode.

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
- Add [custom color modes](../extend/how-to/add-color-mode.md).
