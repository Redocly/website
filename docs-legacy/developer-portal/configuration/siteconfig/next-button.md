---
excludeFromSearch: true
---

# `showNextButton`

## Usage

When set to `false`, this option hides the "Next to" navigation button at the bottom of each MD(X) page.

- To modify all pages in the portal, add it to the top level of the `siteConfig.yaml` file.
- To override the site-wide configuration, add it to the front matter of specific MD(X) pages.

{% admonition type="info" name="Related options" %}
Use [showPrevButton](prev-button.md) to show or hide the "Back to" button.
{% /admonition %}


## Examples
{% tabs %}
{% tab label="In siteConfig" %}
```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
showNextButton: true
```
{% /tab  %}
{% tab label="In front matter" %}
```md
---
seo:
  title: Markdown example
  description: GitHub-flavored Markdown example
showNextButton: false
---

Example text
```
{% /tab  %}
{% /tabs  %}
