---
excludeFromSearch: true
---

# `enableToc`

{% admonition type="warning" name="Warning" %}
This configuration option is deprecated in favor of [toc](table-of-contents.md) starting with version `1.1.0-beta.47` of the Portal.

We strongly recommend updating your configuration to avoid portal build failures.
{% /admonition %}


## Usage

When set to `true`, displays a table of contents (ToC) on the right side of each MD(X) page.

- To modify all pages in the portal, add it to the top level of the `siteConfig.yaml` file.
- To override the site-wide configuration, add it to the front matter of specific MD(X) pages.

Read more about [ToC configuration](../../guides/page-toc.md).


## Examples
{% tabs %}
{% tab label="In siteConfig" %}
```yaml
meta:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
enableToc: true
```
{% /tab  %}
{% tab label="In front matter" %}
```md
---
title: Markdown example
description: GitHub-flavored Markdown example
enableToc: false
---

Example text
```
{% /tab  %}
{% /tabs  %}
