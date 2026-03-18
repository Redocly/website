# x-allowReserved extension

Respect supports the `x-allowReserved` extension on step parameters in Arazzo descriptions.
Use it when a step passes a query parameter whose value must keep RFC 3986 reserved characters unencoded in the request URL.

## When to use it

Use `x-allowReserved` when:

- A query parameter value contains reserved characters: `: / ? # [ ] @ ! $ & ' ( ) * + , ; =`.
- You need the query string value sent "as-is".
  For example, the value is a full URL or a value that already uses reserved characters.
- Without `x-allowReserved`, Respect encodes reseved characters (for example, `:` → `%3A`).

This matches the OpenAPI 3.x [Parameter.allowReserved](https://spec.openapis.org/oas/v3.0.3#parameter-object) behavior.
When a step uses an OpenAPI operation, Respect also honors `allowReserved` from the operation's parameters.
For step parameters you define in the Arazzo description, use the `x-allowReserved` extension.

## Configuration

{% table %}

- Field name {% width="25%" %}
- Type {% width="25%" %}
- Description

---

- x-allowReserved
- `boolean`
- Set to `true` to leave RFC 3986 reserved characters in the parameter value unencoded in the request URL.

{% /table %}

## Example

```yaml
workflows:
  - workflowId: example
    steps:
      - stepId: get-with-filter
        operationId: my-api.getSearch
        parameters:
          - in: query
            name: filter
            value: "https://example.com/path/to;x,y(z)a*b.c[1]@v"
            x-allowReserved: true
        successCriteria:
          - condition: $statusCode == 200
```

With `x-allowReserved: true`, the query string is sent as:

`?filter=https://example.com/path/to;x,y(z)a*b.c[1]@v`

Reserved characters in the value are left unencoded.

## Resources

- [Respect commands](../commands/index.md)
- OpenAPI 3 [Parameter object](https://spec.openapis.org/oas/v3.0.3#parameter-object) (`allowReserved`)
