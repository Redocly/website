# Link Object

## Visuals

Redocly does not render links.

Polling an audience of over 10,000 APIs:
- 1.3% of definitions use links very sparsely (once or twice).
- None use links extensively.

## Types

- Link

```ts
const Link: NodeType = {
  properties: {
    operationRef: { type: 'string' },
    operationId: { type: 'string' },
    parameters: null,
    requestBody: null,
    description: { type: 'string' },
    server: 'Server',
  },
};
```
