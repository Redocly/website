---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise+
description: Hide Redocly attribution information from the browser console.
---
# `removeAttribution`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}

## Examples

Below is an example configuration to remove the Redocly attribution from the browser console:

```yaml {% title="redocly.yaml" %}
removeAttribution: true
```

## Resources

- **[Configuration options](./index.md)** - Complete redocly.yaml configuration file reference for all available project settings and customization options

