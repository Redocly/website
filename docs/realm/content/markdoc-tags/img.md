# Image Tag

The `image` tag allows you to embed images into your content with various customization options.

## Syntax and usage

Use the `image` tag to include images.
Customize with attributes like `src`, `alt`, `width`, and `height`.

{% markdoc-example renderDemo=true %}

```md
{% img
  alt="Image with custom class"
  srcSet="./images/img-markdoc/image-example-light.png light, ./images/img-markdoc/image-example-dark.png dark"
  className="custom-image-class"
/%}
```
{% /markdoc-example %}

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- src
- string
- **Conditionally required.**
  The source URL of the image.

---

- srcSet
- string
- **Conditionally required.**
  A set of source URLs to use for different color modes.

---

- alt
- string
- Descriptive text that provides context for the image to help with accessibility and people with visual impairments or who use assistive technologies to understand the content of images.

---

- className
- string
- CSS class to apply to the image.

---

- width
- string | number
- Sets the width of the image. Accepts:
  - Numbers (treated as pixels, for example, width=300 → "300px")
  - String values with units (for example, "100%", "300px", "20rem", "50vw")

---

- height
- string | number
- Sets the height of the image. Accepts:
  - Numbers (treated as pixels, for example, height=300 → "300px")
  - String values with units (for example, "100%", "300px", "20rem", "50vw")

---

- withLightbox
- boolean
- Opens the image in a lightbox when the image is clicked.
  The lightbox image is opened in its original size or is scaled down to fit the screen if its original size is larger than then screen size.
  Default: `false`.

---

- lightboxStyle
- object | string
- Inline styles to apply to the image lightbox.
  Accepts either a CSS string or an object with camelCase properties:
  - As an object: {"backgroundColor": "red", "opacity": "0.5"}
  - As a string: "background-color: red; opacity: 0.5"
  Common properties include:
  - background-color: Control lightbox background color
  - opacity: Control lightbox transparency

---

- align
- string
- Describes how you want the image aligned on the page.
  Options: left, right, center, justify, initial, or inherit.
  Default value: left

---

- border
- string
- Sets the border style of the image. Accepts standard CSS border values, such as:
  - "1px solid black" - thin black border
  - "2px dashed #FF0000" - dashed red border
  - "3px double gray" - double-line gray border

  {% admonition type="info" %}
   Note: Border styles can also be applied using the style attribute.
  {% /admonition %}

---

- style
- object | string
- Inline styles to apply to the image.
  Accepts either a CSS string or an object with camelCase properties:
  - As an object: {"marginTop": "20px", "boxShadow": "0 4px 8px rgba(0,0,0,0.1)"}
  - As a string: "margin-top: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1)"
  Common properties include:
  - margin, padding: Control spacing around the image
  - boxShadow: Add shadow effects
  - opacity: Control image transparency
  - borderRadius: Round the corners
  - filter: Apply visual effects (blur, brightness, etc.)

{% /table %}

## Examples

### Basic image with alt text

{% markdoc-example renderDemo=true %}

```md
{% img
  alt="Basic example image"
  srcSet="./images/img-markdoc/image-example-light.png light, ./images/img-markdoc/image-example-dark.png dark"
/%}
```
{% /markdoc-example %}


### Image with width and height

{% markdoc-example renderDemo=true %}
```md
{% img
  alt="Image with dimensions"
  srcSet="./images/img-markdoc/image-example-light.png light, ./images/img-markdoc/image-example-dark.png dark"
  width=300
  height=200
/%}
```
{% /markdoc-example %}

### Image with alignment

{% markdoc-example renderDemo=true %}
```md
{% img
  alt="Center aligned image"
  width=200
  height=200
  srcSet="./images/img-markdoc/image-example-light.png light, ./images/img-markdoc/image-example-dark.png dark"
  align="right"
/%}
```
{% /markdoc-example %}

### Image with border

{% markdoc-example renderDemo=true %}
```md
{% img
  alt="Image with border"
  srcSet="./images/img-markdoc/image-example-light.png light, ./images/img-markdoc/image-example-dark.png dark"
  border="10px solid red"
/%}
```
{% /markdoc-example %}

### Image with custom styles

{% markdoc-example renderDemo=true %}
```md
{% img
  alt="Styled image"
  srcSet="./images/img-markdoc/image-example-light.png light, ./images/img-markdoc/image-example-dark.png dark"
  style={"border": "10px solid red", "borderRadius": "50px", "cursor": "pointer"}
/%}
```
{% /markdoc-example %}

### Image with srcSet for different color modes

{% markdoc-example renderDemo=true %}
```md
{% img
  alt="Color mode aware image"
  width=200
  height=200
  srcSet="./images/img-markdoc/image-example-light.png light, ./images/img-markdoc/image-example-dark.png dark"
/%}
```
{% /markdoc-example %}

### Image with className

{% markdoc-example renderDemo=true %}

```md
{% img
  alt="Image with custom class"
  srcSet="./images/img-markdoc/image-example-light.png light, ./images/img-markdoc/image-example-dark.png dark"
  className="custom-image-class"
/%}
```
{% /markdoc-example %}

## Best practices

**Write meaningful alt text**

Always include descriptive alt text that conveys the purpose and content of the image.
Descriptive alt text improves accessibility and helps users understand the image's context when it fails to load or if users have visual impairments or use assistive technologies to understand the content of images.

**Use images purposefully**

Only include images that add value to your content.
Avoid decorative images that don't contribute to understanding the subject matter.

**Maintain responsive design**

Set appropriate width and height attributes to prevent layout shifts and to prevent pixelation.
Also, consider how images display across different screen sizes.

**Enhance visual hierarchy**

Use alignment to create visual flow and balance.
Apply consistent styling (borders, shadows, etc.) across similar image types.
