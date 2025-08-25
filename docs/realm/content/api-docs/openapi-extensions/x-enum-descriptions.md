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
- [ [Enum Description Object](#enum-description-object) ]
- A list of the enum values and descriptions to include in the documentation.

{% /table %}

### Enum Description Object

{% table %}

- Option
- Type
- Description

---

- _enum value_
- string
- More information or explanation about when to choose this value.

{% /table %}

## Examples

The following example shows a schema with two short-named options, and the `x-enumDescriptions` entry to list all enum entries and give additional context for each:

```yaml
components:
  schemas:
    TicketType:
      description: Type of ticket being purchased. Use `general` for regular museum entry and `event` for tickets to special events.
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

- See all [openapi configuration settings](../../../config/openapi/index.md).
- Control which extensions are included in your API reference documentation with the [showExtensions configuration setting](../../../config/openapi/show-extensions.md).
- See a full [list of supported OpenAPI extensions](./index.md).
