---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `hideReplay`


The `hideReplay` configuration option allows you to control the visibility of the `Try it` buttons associated with API requests.

For example, you might want to hide the `Try it` button in your public API documentation, and make it visible only on your internal website.

## Options

{% table %}

* Option
* Type
* Description

---

* hideReplay
* boolean
* Hide the `Replay` component that allows users to interactively send requests to an API. Defaults to `false`.

{% /table %}

## Examples

The following example hides the `Replay` component from the API reference documentation.

```yaml {% title="redocly.yaml" %}
openapi:
  hideReplay: true
```

## Related options

- [openapi](./index.md) - Learn more about using `openapi` configuration.

## Resources

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/docs/openapi-visual-reference/)
