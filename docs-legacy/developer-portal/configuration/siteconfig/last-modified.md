---
excludeFromSearch: true
---

# `disableLastModified`

## Usage

When set to `true`, this option hides the "Last updated {time} ago" label at the top of each MD(X) page.

- To modify all pages in the portal, add it to the top level of the `siteConfig.yaml` file.
- To override the site-wide configuration, add it to the front matter of specific MD(X) pages.


## Examples
{% tabs %}
{% tab label="In siteConfig" %}
```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
disableLastModified: true
```
{% /tab  %}
{% tab label="In front matter" %}
```md
---
seo:
  title: Markdown example
  description: GitHub-flavored Markdown example
disableLastModified: false
---

Example text
```
{% /tab  %}
{% /tabs  %}
