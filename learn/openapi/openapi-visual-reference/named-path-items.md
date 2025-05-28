# Named Path Items

{% admonition type="info" name="New to OAS 3.1" %}
Reusable `pathItems` can be declared in the `components`.
{% /admonition %}

Path items can be named in the components

```yaml
components:
  pathItems:
    getStatus:
      # PathItem Object
```

## Visual

- See [Path Item Object](./path-item.md).

## Types

- `NamedPathItems` is a map of `PathItem` objects (OAS 3.1 only)
- `PathItem`

```js
const PathItem: NodeType = {
  properties: {
    $ref: { type: 'string' },
    servers: listOf('Server'),
    parameters: listOf('Parameter'),
    summary: { type: 'string' },
    description: { type: 'string' },
    get: 'Operation',
    put: 'Operation',
    post: 'Operation',
    delete: 'Operation',
    options: 'Operation',
    head: 'Operation',
    patch: 'Operation',
    trace: 'Operation',
  },
};
```
