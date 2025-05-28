# `boolean`

> The boolean type matches only two special values: `true` and `false`. Note that values that evaluate to `true` or `false`, such as 1 and 0, are not accepted by the schema.

## Visuals

The following schema describes a boolean.

```yaml
type: boolean
description: True if it is active
example: true
```

The following image shows the boolean schema.

![schema boolean](./images/schema-boolean.png)

## Types

- SchemaProperties

```ts
const SchemaProperties: NodeType = {
  properties: {},
  additionalProperties: 'Schema',
};
```
