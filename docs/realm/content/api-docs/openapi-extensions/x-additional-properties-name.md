# OpenAPI extension: `x-additionalPropertiesName`

OpenAPI allows description of "additionalProperties" that may be included in a schema.
Their names are unknown, but the field types can be added to the API description so that producers and consumers understand whether additional fields are permitted and any additional rules that apply.

Since the field names are not specified, they are displayed with a generic name in the API reference documentation.
Use `x-additionalProperties` to display a more meaningful name in this scenario.

## Location

Use `x-additionalPropertiesName` as a property of `additionaProperties` in an OpenAPI Schema.

## Options

{% table %}

- Option
- Type
- Description

---

- x-additionalPropertiesName
- string
- Add a display name for an `additionalProperty`.
  By default it shows as `property name*`.

{% /table %}

## Examples

The following example shows a schema that accepts any fields as long as the values are numbers between 0-100, for a set of sensors reporting fill levels:

```yaml
components:
  schemas:
    FillLevel:
      type: object
      properties:
        reportTime:
          type: string
          format: date-time
          description: Report creation time.
      required:
        - reportTime
      additionalProperties:
        x-additionalPropertiesName: percentage
        type: integer
        minimum: 0
        maximum: 100
```

The additional properties appear in the documentation as `percentage*`.

## Resources

- **[Show extensions configuration](../../../config/openapi/show-extensions.md)** - Control which extensions are included in your API reference documentation for optimal presentation
- **[OpenAPI configuration settings](../../../config/openapi/index.md)** - Complete reference for all available OpenAPI configuration options and customization settings
- **[Supported OpenAPI extensions](./index.md)** - Complete list of all OpenAPI extensions supported by Redocly for enhanced API documentation
