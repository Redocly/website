---
excludeFromSearch: true
---

# `toc`

## Usage

Use the `toc` section to control the behavior of page table of contents (TOC) in Markdown and MDX pages. Add it to the top level of the `siteConfig.yaml` file and configure supported options inside it.

Some of the options can be used in the front matter of MD(X) pages to override the site-wide configuration. Read more about [ToC configuration](../../guides/page-toc.md).

When enabled, the page TOC is displayed on the right side of each MD(X) page. Note that the first H1 heading on a page is never included in the TOC. Any subsequent H1 headings are included.


## Options

| Option  | Description | Front matter |
| ------------- | ------------- | :----: |
| `enable` | When set to `true`, displays a table of contents (ToC) on the right side of each MD(X) page. | ✔️ |
| `maxDepth` | This option is dependent on and related to `enable: true`. Use it to set the maximum depth (amount of heading levels) displayed in the table of contents. The value must be provided as an integer. The default value is 4, which means that headings from H1 to H4 are displayed in the TOC. | ✔️ |


## Examples

{% tabs %}
{% tab label="In siteConfig" %}
```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
toc:
  enable: true
  maxDepth: 2
```
{% /tab  %}
{% tab label="In front matter" %}
```md In front matter
---
seo:
  title: Markdown example
  description: GitHub-flavored Markdown example
toc:
  enable: false
---

Example text
```
{% /tab  %}
{% /tabs  %}
