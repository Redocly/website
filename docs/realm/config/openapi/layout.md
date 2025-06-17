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

Controls the layout of the API docs page, affecting how the panels are displayed. The default value is `three-panel` which uses the default layout with the sidebar, middle panel, and right panel with code samples. Set the value to `stacked` to move the entire right panel into the middle panel. The `stacked` layout is identical to the layout activated by selecting the **Change View** button on the API documentation page.

{% admonition type="info" %}
{% partial file="../../_partials/config/_unsupported-redoc-ce.md" variables={"optionName": "layout"} /%}
{% /admonition %}

The `layout` option is a string that sets the layout of the API documentation page.

## Options

{% table %}

* Option
* Type
* Enum
* Description

---

* layout
* string
* `three-panel` | `stacked`.
* Controls the layout of the API docs page. Default value is `three-panel`.


{% /table %}

## Examples

The following example configures the layout for the API documentation page to be set to `stacked`:

```yaml {% title="redocly.yaml" %}
openapi:
  layout: 'stacked'
```

![stacked layout](../images/stacked-layout.png)

```yaml {% title="redocly.yaml" %}
openapi:
  layout: 'three-panel'
```

![three panel layout](../images/three-panel-layout.png)

## Related options

- [openapi](./index.md) - Learn more about using `openapi` configuration.

## Resources

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)
