---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `hidePaginationButtons`

The `hidePaginationButtons` option allows you to hide the `previous` and `next` page buttons of the GraphQL documentation.
This is useful for single-page applications where you want to control the pagination programmatically.

## Options

{% table %}

* Option
* Type
* Description

---

* hidePaginationButtons
* boolean
* Controls the pagination buttons visibility. Default value is `false`


{% /table %}

## Examples

The following example hides the pagination buttons of the GraphQL documentation.

```yaml {% title="redocly.yaml" %}
graphql:
  hidePaginationButtons: true
```

## Related options

- [graphql](./index.md) - Learn more about using `graphql` configuration.

## Resources

- [GraphQL](https://graphql.org/)
