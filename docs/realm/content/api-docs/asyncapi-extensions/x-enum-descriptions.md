# AsyncAPI extension: `x-enumDescriptions`

The enum (short for "enumeration") fields in AsyncAPI allow you to restrict the value of a field to a list of allowed values.
These values need to be short and machine-readable, but that can make them harder for humans to parse and work with.

Add `x-enumDescriptions` to your AsyncAPI description to show a helpful table of enum options and an explanation of what each one means.
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

The following example shows a schema with vehicle type options, and the `x-enumDescriptions` entry to provide clear descriptions for each enum value:

```yaml
components:
  schemas:
    RideType:
      description: Category of vehicle requested by the passenger for their ride.
      type: string
      enum: [STANDARD, PREMIUM, ELECTRIC]
      x-enumDescriptions:
        STANDARD: Standard sedan or compact vehicle _(most common option)_
        PREMIUM: Luxury vehicle with premium features and amenities
        ELECTRIC: Environmentally friendly electric or hybrid vehicle
      example: STANDARD
```

## Resources

- See a full [list of supported AsyncAPI extensions](./index.md).
