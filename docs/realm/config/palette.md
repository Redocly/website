---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Choose a predefined brand color palette for UI elements across your project.
---
# `palette`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}

Use `palette` to apply one of the built-in brand palettes from `@redocly/theme`.
The selected palette controls the primary color tokens used by buttons, links, and other interface elements in both light and dark color modes.

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "palette"} /%}

## Options

{% table %}

- Option
- Type
- Description

---

- palette
- string
- Name of the built-in color palette.

  Available values:
  - `slate`
  - `pink`
  - `coral`
  - `amber`
  - `jade`
  - `cyan`
  - `ocean`
  - `indigo`
  - `iris`

{% /table %}

## Examples

Use the following in `redocly.yaml` to apply the `ocean` palette globally:

```yaml {% title="redocly.yaml" %}
palette: ocean
```

## Resources

- **[Color mode](./color-mode.md)** - Configure available color modes and selection behavior
- **[Configuration options](./index.md)** - Explore other project configuration options
