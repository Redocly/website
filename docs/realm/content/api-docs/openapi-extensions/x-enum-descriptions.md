# OpenAPI extension: `x-enumDescriptions`


The enum (short for "enumeration") fields in OpenAPI allow you to restrict the value of a field to a list of allowed values.
These values need to be short and machine-readable, but that can make them harder for humans to parse and work with.

Add `x-enumDescriptions` to your OpenAPI description to show a helpful table of enum options and an explanation of what each one means.
This field supports Markdown.

{% admonition type="warning" name="Include all options" %}
When `x-enumDescriptions` is used, only the options listed in this section are displayed in documentation.
Check that all options are included to ensure the documentation is complete.
{% /admonition %}

## Options

{% table %}

- Option
- Type
- Description

---

- x-enumDescriptions
- Map[string, string]
- A map of the enum values and corresponding descriptions to include in the documentation.

{% /table %}


## Examples

The following example shows a schema with two short-named options, and the `x-enumDescriptions` entry to list all enum entries and give additional context for each:

```yaml
components:
  schemas:
    TicketType:
      description: Type of ticket being purchased.
      Use `general` for regular museum entry and `event` for tickets to special events.
      type: string
      enum:
        - event
        - general
      x-enumDescriptions:
        event: Event Tickets _(timed entry)_
        general: General Admission
      example: event
```

## Resources

- **[OpenAPI configuration settings](../../../config/openapi/index.md)** - Complete reference for all available OpenAPI configuration options and customization settings
- **[Show extensions configuration](../../../config/openapi/show-extensions.md)** - Control which extensions are included in your API reference documentation for optimal presentation
- **[Supported OpenAPI extensions](./index.md)** - Complete list of all OpenAPI extensions supported by Redocly for enhanced API documentation
