---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `layout`

Controls the layout of the API docs page, affecting how the panels are displayed.
The default value is `three-panel` which uses the default layout with the sidebar, middle panel, and right panel with code samples.
Set the value to `stacked` to move the entire right panel into the middle panel.
The `stacked` layout is identical to the layout activated by selecting the **Change View** button on the API documentation page.

The `layout` option is a string that sets the layout of the API documentation page.

## Options

{% table %}

- Option
- Type
- Description

---

- layout
- string
- Controls the layout of the API docs page.
  Possible values: `three-panel` or `stacked`.
  Default value is `three-panel`.

{% /table %}

## Examples

The following example configures the layout for the API documentation page to be set to `stacked`:

```yaml {% title="redocly.yaml" %}
asyncapi:
  layout: 'stacked'
```

The following example configures the layout for the API documentation page to be set to `three-panel`:

```yaml {% title="redocly.yaml" %}
asyncapi:
  layout: 'three-panel'
```

## Resources

- **[AsyncAPI configuration](./index.md)** - Complete guide to AsyncAPI configuration options for customizing API reference documentation
- **[AsyncAPI Specification](https://www.asyncapi.com/docs/reference/specification/latest)** - Official AsyncAPI Specification documentation for understanding event-driven API description standards
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
