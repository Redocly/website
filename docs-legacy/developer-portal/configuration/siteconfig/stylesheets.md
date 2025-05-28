---
excludeFromSearch: true
---

# `stylesheets`

## Usage

Custom CSS is defined in the `stylesheets` section. Use this section to link to local CSS files in the portal project, or to import custom fonts.

Add it to the top level of the `siteConfig.yaml` file.


{% admonition type="info" name="Related options" %}
Use [scripts](scripts.md) to add custom scripts to your portal.
{% /admonition %}


## Examples

```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
stylesheets:
  - './static/main.css'
  - 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700'
```
