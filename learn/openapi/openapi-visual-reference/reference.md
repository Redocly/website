# Reference Object

## OAS 3.1

{% admonition type="info" %}
The `summary` and `description` fields are new in OAS 3.1.
Prior, the `$ref` has no sibling properties.
{% /admonition %}

## Reference Object

A simple object to allow referencing other components in the OpenAPI document, internally and externally.

The `$ref` string value contains a URI [RFC3986](https://tools.ietf.org/html/rfc3986), which identifies the location of the value being referenced.

See the rules for resolving Relative References.

### Fixed Fields

Field Name | Type | Description
---|:---:|---
`$ref` | `string` | **REQUIRED**. The reference identifier. This MUST be in the form of a URI.
summary | `string` | A short summary which by default SHOULD override that of the referenced component. If the referenced object-type does not allow a `summary` field, then this field has no effect.
description | `string` | A description which by default SHOULD override that of the referenced component. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation. If the referenced object-type does not allow a `description` field, then this field has no effect.

This object cannot be extended with additional properties and any properties added SHALL be ignored.

Note that this restriction on additional properties is a difference between Reference Objects and [`Schema Objects`](./schemas.md) that contain a `$ref` keyword.

### Reference Object Example

```json
{
 "$ref": "#/components/schemas/Pet"
}
```

```yaml
$ref: '#/components/schemas/Pet'
```

### Relative Schema Document Example
```json
{
  "$ref": "Pet.json"
}
```

```yaml
$ref: Pet.yaml
```

### Relative Documents With Embedded Schema Example
```json
{
  "$ref": "definitions.json#/Pet"
}
```

```yaml
$ref: definitions.yaml#/Pet
```

## Visual examples

Redocly renders references the same as if the corresponding values were defined in place.

## Types

References do not have their own type, and take the type of whatever they define.

## More resources

- [Learn to use `$ref`](https://redocly.com/docs/resources/ref-guide/)
