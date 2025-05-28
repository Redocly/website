---
excludeFromSearch: true
---

# `logo`

## Usage

Use the `logo` section to display a custom logo in the portal navbar. Add it to the top level of the `siteConfig.yaml` file and configure supported options inside it.

You must provide the path to the logo image as the value of the `image` property in the `logo` object. The image file must exist in the portal project.


## Options

Option | Type | Description | Default
-- | -- | -- | --
`image` | string | Path to the image file (png or svg) of the logo. | -
`altText` | string | The alt text used with the image for the logo. | The `seo.title` defined in `siteConfig.yaml`.
`href` | string (URL) | Full URL with protocol logo's link (omit this property if you want to link to the portal home). | The portal's home page.

{% admonition type="info" name="Related options" %}
Customize the logo size and spacing by modifying the [developer portal theme](../theme.md).
{% /admonition %}


## Examples

{% tabs %}
{% tab label="Common configuration with portal home link" %}
```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
logo:
  image: ./images/logos/logo-example.png
  altText: My logo rocks
```
{% /tab  %}
{% tab label="With external link from the logo" %}
```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
logo:
  image: ./images/logos/logo-example.png
  altText: My logo rocks
  href: https://example.com
```
{% /tab  %}
{% /tabs  %}
