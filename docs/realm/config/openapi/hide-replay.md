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


The `hideReplay` option controls whether the `Try it` buttons appear on API requests.
For example, you can hide the button in your public API docs and keep it visible on your internal site.

{% admonition type="info" %}
{% partial file="../../_partials/config/_unsupported-redoc-ce.md" variables={"optionName": "hideReplay"} /%}
{% /admonition %}

## Options

{% table %}

- Option
- Type
- Description

---

- hideReplay
- boolean
- Hide the `Replay` component that lets users send requests to an API from the docs.
  Default: `false`.

{% /table %}

## Examples

The following example hides the `Replay` component:

```yaml {% title="redocly.yaml" %}
openapi:
  hideReplay: true
```

## Resources

- **[Replay API explorer](https://redocly.com/docs/end-user/test-apis-replay)** - How users test APIs from the reference docs.
- **[OpenAPI configuration](./index.md)** - All the options you can set under `openapi`.
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - The official standard for API descriptions.
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - A visual map of every part of an OpenAPI description.
- **[Configuration options](../index.md)** - All the other options for your project.
