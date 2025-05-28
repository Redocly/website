# x-nullable

{% admonition type="info" name="Compatibility warning" %}
This specification extension is supported only in OpenAPI 2.0.
{% /admonition %}

## Usage

Use `x-nullable` in your OpenAPI 2.0 documents to mark schemas with the label `Nullable` in the API documentation. This indicates that the value of a particular property may be `null`. Add it to the `schema` OpenAPI object.

| Field Name |  Type   | Description                 |
| :--------- | :-----: | :-------------------------- |
| x-nullable | boolean | Marks schema as a nullable. |

## Examples

```yaml
swagger: '2.0'
info: ...
tags: [...]
schemas:
  country:
    type: string
    description: Country of origin
    x-nullable: true
```
