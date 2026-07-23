---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `jsonSamplesDepth`

The `jsonSamplesDepth` option sets the default depth for rendering JSON samples in the protocol binding panels (such as channel, operation, and message bindings) of your AsyncAPI documentation.
Use this option to set the depth to a comfortable default value for the data structure of your API.

## Options

{% table %}

- Option
- Type
- Description

---

- jsonSamplesDepth
- number
- Sets the default depth for rendering JSON samples.
  Default value is `3`.

{% /table %}

## Examples

The following example sets the depth for JSON samples to five levels.

```yaml {% title="redocly.yaml" %}
asyncapi:
  jsonSamplesDepth: 5
```

Using this setting, the samples will show up to five levels of nested data.

## Resources

- **[AsyncAPI configuration](./index.md)** - Complete guide to AsyncAPI configuration options for customizing API reference documentation
- **[AsyncAPI Specification](https://www.asyncapi.com/docs/reference/specification/latest)** - Official AsyncAPI Specification documentation for understanding event-driven API description standards
- **[Layout](./layout.md)** - Control the layout of the AsyncAPI documentation page to complement how samples are displayed
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
