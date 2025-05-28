# `contact`

| Field Name      |  Type  | Description                                                                                                                                            |
| :-------------- | :----: | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| name             | string | The identifying name of the contact person or organization. |
| url             | string | The URL pointing to the contact information. |
| email             | string | The email address of the contact person or organization. |

## Visuals

### `contact` example

The following example defines a contact object within the info object.

```yaml
info:
  title: Example
  version: ''
  description: |
    # My API description in Markdown

    This is a sample of an info description.
  contact:
    name: API team
    email: team@redocly.com
    url: https://redocly.com/contact-us/
```

![info contact](./images/contact-1.png)

## Types

- `Contact` (found in the [Info object](./info.md))

```js
const Contact: NodeType = {
  properties: {
    name: { type: 'string' },
    url: { type: 'string' },
    email: { type: 'string' },
  },
};
```
