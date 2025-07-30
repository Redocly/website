# OpenAPI extension: `x-example` and `x-examples`

{% admonition type="warning" name="Compatibility warning" %}

These specification extensions are supported only in OpenAPI 2.0 as a backwards compatibility feature.
OpenAPI 3.x and later supports `example` and `examples` fields, without the need for the `x-` prefix.

{% /admonition %}

Use `x-example` and `x-examples` to add examples to an OpenAPI description.
When specified, the content of the example is rendered in the JSON tab in the right panel of the API documentation.

## Location

Use the `x-example` in any location where `example` can be used in OpenAPI v3.

## Options

{% table %}

- Option
- Type
- Description

---

- x-examples
- [Example Object](https://spec.openapis.org/oas/v3.1.0#example-object)
- Object that contains examples for the request. Applies when `in` is `body` and MIME type is `application/json`

{% /table %}

## Examples

The difference between these extensions is in the content they support (single example value or an entire example object).

`x-example` - maps the MIME type to an example value (any JSON):

```yaml
x-example:
  application/json:
    message: OK
    type: success
  text/plain: 'OK'
```

`x-examples` - maps the MIME type to a whole example object with a custom name. It's possible to include multiple objects for the same type:

```yaml
x-examples:
  application/json:
    my-example-name:
      summary: Some Example
      value:
        message: OK
        type: success
    another-example:
      summary: Another Example
      value:
        message: Something went wrong
        type: error
```

## Resources

- Learn more about [examples in OpenAPI](https://learn.openapis.org/specification/docs.html).
- Control which extensions are included in your API reference documentation with the [showExtensions configuration setting](../../../config/openapi/show-extensions.md).
- See all [openapi configuration settings](../../../config/openapi/index.md).
- See a full [list of supported OpenAPI extensions](./index.md).
