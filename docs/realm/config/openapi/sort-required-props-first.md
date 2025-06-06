---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `sortRequiredPropsFirst`

By default, fields are rendered in the order they appear in the API description.

The `sortRequiredPropsFirst` option changes the order to display required fields first in each schema section.

## Options

{% table %}

* Option
* Type
* Description

---

* sortRequiredPropsFirst
* boolean
* Sort the required schema properties before the optional ones. Default value is `false`.

{% /table %}

## Examples

The following example configures Redoc to show required properties first:

```yaml {% title="redocly.yaml" %}
openapi:
  sortRequiredPropsFirst: true
```

## Resources

- [openapi](./index.md) - Learn more about using `openapi` configuration.
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)
- Explore other [configuration options](../index.md) for your project.
