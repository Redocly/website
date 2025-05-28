---
excludeFromSearch: true
---

# `meta`

{% admonition type="warning" name="Warning" %}
This configuration option is deprecated in favor of [seo](seo.md) starting with version `1.1.0-beta.69` of the Portal.

We strongly recommend updating your configuration to avoid portal build failures.
{% /admonition %}


## Usage

Use the `meta` section to control the contents of your portal's HTML `<head>` element.

Add it to the top level of the `siteConfig.yaml` file and configure supported options inside it. Some of the options can be used in the front matter of MD(X) pages to override the site-wide configuration.


## Options

| Option  | Description | Front matter |
| ------------- | ------------- | :----: |
| `description` | Sets the contents of the `<meta name="description">` tag in your portal. The description should be up to 150 characters long. This text may be used for your portal in search engine results pages. | ✔️ |
| `image`       | Sets the rich metadata image that is used when sharing links to your portal on social media. You must provide the path to an existing image in your portal project. | ✔️ |
| `keywords`    | Sets the contents of the `<meta name="keywords">` tag in your portal. Provide the keywords as a comma-separated list, e.g. `keywords: documentation, api, openapi`. | ✔️ |
| `lang`        | Sets the language attribute for your portal to indicate the language in which the content is written. Provide the `lang` value as a language tag with optional subtags (for example, `en-US` for United States English, `es` for Spanish). Consult the [W3.org guide](https://www.w3.org/International/questions/qa-choosing-language-tags) and the [language subtag registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) for more information about language tags and subtags. | ✔️ |
| `siteUrl`     | Sets the base URL for canonical links in your portal. When this option is configured, it automatically adds `rel="canonical"` to the head of all HTML pages in your portal. Starting with version `1.1.0-beta.50` of the portal, this option is used as a prerequisite for the portal sitemap. When it is configured, a sitemap is automatically generated for the portal, and sitemap-related settings can be configured for individual pages in [the front matter](../../guides/markdown.md#supported-front-matter-options). | ❌ |
| `title`       | Sets the default contents of the `<title>` tag in your portal. This title is used for your portal in search engine results pages, and when sharing links to your portal on social media. The title set here is appended to page titles (e.g. for `title: Redocly`, it's "Page title - Redocly"). When a page doesn't have a defined title, the title set here is used as a fallback. | ✔️ |


## Examples
{% tabs %}
{% tab label="In siteConfig" %}
```yaml
meta:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
  siteUrl: https://www.example.com
  image: .images/example-portal-home.png
  keywords: 'documentation, api, portal'
  lang: en-US
```
{% /tab  %}
{% tab label="In front matter" %}
```md
---
title: Example Markdown page
description: GitHub-flavored Markdown example
image: .images/example-page.png
keywords: 'markdown, github'
lang: en-US
---

Example text
```
{% /tab  %}
{% /tabs  %}
