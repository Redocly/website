---
seo:
  title: Add the table of contents to a page
excludeFromSearch: true

---

# Page table of contents

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

{% admonition type="info" name="Important" %}
Page table of contents is supported on MDX pages starting with version `1.1.0-beta.47` of the Portal.

The same Portal version introduced changes to table of contents configuration options. This guide has been updated to distinguish between the _Old_ and _New_ configuration approach.
{% /admonition %}

Add a table of contents (TOC) automatically to any Markdown or MDX page.

You can see an example of what it looks like on the right side of this page.

This guide describes:

1. How to enable or disable the TOC globally
2. How to override TOC settings for any specific page(s)
3. How content is sourced for the TOC

## Configure the TOC globally

To enable the TOC on all pages, add this to the `siteConfig.yaml` file:
{% tabs %}
{% tab label="New" %}
```yaml
toc:
  enable: true
```
{% /tab  %}
{% tab label="Old" %}
```yaml
enableToc: true
```
{% /tab  %}
{% /tabs  %}
The TOC is disabled by default. If you want to disable it explicitly, add this to the `siteConfig.yaml`:
{% tabs %}
{% tab label="New" %}
```yaml
toc:
  enable: false
```
{% /tab  %}
{% tab label="Old" %}
```yaml
enableToc: false
```
{% /tab  %}
{% /tabs  %}
### Control the TOC maximum depth

You can control the maximum depth of the TOC. The maximum depth refers to how many heading levels render in the TOC (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`...).

Set it using a numeric value corresponding to the heading level.

The default value in the portal is `4`, meaning the portal displays `h1`, `h2`, `h3`, and `h4` headings in the TOC (except for the initial `h1`, which is interpreted as the page title).

You can adjust the maximum depth in [the siteConfig.yaml file](../configuration/siteconfig/table-of-contents.md) or in the front matter of any page.
{% tabs %}
{% tab label="New" %}
```yaml
toc:
  enable: true
  maxDepth: 3
```
{% /tab  %}
{% tab label="Old" %}
```yaml
enableToc: true
tocMaxDepth: 3
```
{% /tab  %}
{% /tabs  %}
## Override page TOC settings

You can override the global setting in the [front matter](./markdown.md#front-matter) of any Markdown or MDX page.

In the following example, the TOC is hidden on the page even if it is enabled globally.
{% tabs %}
{% tab label="New" %}
```yaml
---
seo:
  title: Markdown example
  description: GitHub-Flavored Markdown example
toc:
  enable: false
---
Example text
```
{% /tab  %}
{% tab label="Old" %}
```yaml
---
title: Markdown example
description: GitHub-Flavored Markdown example
enableToc: false
---
Example text
```
{% /tab  %}
{% /tabs  %}
{% admonition type="info" %}
Open and close the front matter appropriately using three or more dashes `---`, or the front matter is invalid and display as text on your page.
{% /admonition %}

## Source of TOC content

The TOC content comes from the `h2`, `h3`, and `h4` tags on the page.

It is also sourced from any additional `h1` tags except the opening `h1` tag.

# A second h1 example

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

## An h2 example

### An h3 example

Any `h3` content appears indented.

#### And an h4 example

Any `h4` content appears further indented.

##### And an h5 too

Any `h5` content does appear in the page table of contents.
