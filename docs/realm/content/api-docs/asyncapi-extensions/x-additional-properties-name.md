# AsyncAPI extension: `x-additionalPropertiesName`

AsyncAPI allows description of "additionalProperties" that may be included in a schema.
Their names are unknown, but the field types can be added to the API description so that producers and consumers understand whether additional fields are permitted and any additional rules that apply.

Since the field names are not specified, they are displayed with a generic name in the API reference documentation.
Use `x-additionalProperties` to display a more meaningful name in this scenario.

## Location

Use `x-additionalPropertiesName` as a property of `additionaProperties` in an AsyncAPI Schema.

## Options

{% table %}

- Option
- Type
- Description

---

- x-additionalPropertiesName
- string
- Add a display name for an `additionalProperty`. By default it shows as `property name*`.

{% /table %}

## Examples

The following example shows how to use `x-additionalPropertiesName` with a driver rating schema:

```yaml
components:
  schemas:
    DriverRating:
      type: object
      required:
        - rideId
        - driverId
        - timestamp
      properties:
        rideId:
          type: string
          format: uuid
          description: Unique identifier of the ride that was rated
        driverId:
          type: string
          description: Identifier of the driver who was rated
        timestamp:
          type: string
          format: date-time
          description: Time when the rating was submitted
      additionalProperties:
        x-additionalPropertiesName: customRating
        type: string
        description: Additional custom rating categories or feedback
```
The additional properties appear in the documentation as `customRating*`.

## Resources

- See a full [list of supported AsyncAPI extensions](./index.md).
