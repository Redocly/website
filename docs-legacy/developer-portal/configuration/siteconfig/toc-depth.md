---
excludeFromSearch: true
---

# `tocMaxDepth`


{% admonition type="warning" name="Warning" %}
This configuration option is deprecated in favor of [toc](table-of-contents.md) starting with version `1.1.0-beta.47` of the Portal.

We strongly recommend updating your configuration to avoid portal build failures.
{% /admonition %}

## Usage

This option is dependent on, and related to `enableToc: true`. Use it to set the maximum depth (amount of heading levels) displayed in the table of contents. The value of `tocMaxDepth` must be configured as an integer. The default value is 4.

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
tocMaxDepth: 4
```
{% /tab  %}
{% tab label="In front matter" %}
```md
---
title: Markdown example
description: GitHub-flavored Markdown example
enableToc: true
tocMaxDepth: 2
---

Example text
```
{% /tab  %}
{% /tabs  %}
