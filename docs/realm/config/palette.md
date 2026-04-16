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
  - `amber`
  - `coral`
  - `cyan`
  - `indigo`
  - `iris`
  - `jade`
  - `ocean`
  - `pink`
  - `slate`

{% /table %}

## Examples

Use the following in `redocly.yaml` to apply the `ocean` palette globally:

```yaml {% title="redocly.yaml" %}
palette: ocean
```

{% cards cardMinWidth=150 %}

{% card title="Amber" icon="bee" to="../products/amber/" %}
Preview our `amber` palette.
{% /card %}

{% card title="Coral" icon="dolphin" to="../products/coral/" %}
Preview our `coral` palette.
{% /card %}

{% card title="Cyan" icon="dove" to="../products/cyan/" %}
Preview our `cyan` palette.
{% /card %}

{% card title="Indigo" icon="hat-wizard" to="../products/indigo/" %}
Preview our `indigo` palette.
{% /card %}

{% card title="Iris" icon="trillium" to="../products/iris/" %}
Preview our `iris` palette.
{% /card %}

{% card title="Jade" icon="leaf" to="../products/jade/" %}
Preview our `jade` palette.
{% /card %}

{% card title="Ocean" icon="wave" to="../products/ocean/" %}
Preview our `ocean` palette.
{% /card %}

{% card title="Pink" icon="balloon" to="../products/pink/" %}
Preview our `pink` palette.
{% /card %}

{% card title="Slate" icon="mountain" to="../products/slate/" %}
Preview our `slate` palette.
{% /card %}

{% /cards %}

## Resources

- **[Color mode](./color-mode.md)** - Configure available color modes and selection behavior
- **[Configuration options](./index.md)** - Explore other project configuration options
