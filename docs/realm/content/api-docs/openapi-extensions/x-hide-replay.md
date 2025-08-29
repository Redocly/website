# OpenAPI extension: `x-hideReplay`

Replay lets users make API request from your documentation, to quickly and easily try the experience.
Use `x-hideReplay` to turn off replay for one operation, removing the "Try It" button.

## Location

Use the `x-hideReplay` extension in an Operation declaration.

## Options

{% table %}

- Option
- Type
- Description

---

- x-hideReplay
- boolean
- Hides the Replay for the operation on which it was set to `true`.

{% /table %}

## Examples

The following example shows how to disable Replay on the `ExamplePath` operation.

```yaml
paths:
  /example:
    get:
      summary: Example operation
      description: Example description
      operationId: examplePath
      responses: [...]
      parameters: [...]
      x-hideReplay: true
```

This operation will have complete documentation, but without interactive features.

## Resources

- Learn more about [Replay the API Explorer](../replay.md)
- Control which extensions are included in your API reference documentation with the [showExtensions configuration setting](../../../config/openapi/show-extensions.md).
- Configure the [mock server](../../../config/mock-server.md) used in Replay.
- See all [openapi configuration settings](../../../config/openapi/index.md).
- See a full [list of supported OpenAPI extensions](./index.md).
