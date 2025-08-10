---
excludeFromSearch: true
---

# x-hideTryItPanel

## Usage

Use `x-hideTryItPanel` to disable the _Try it_ panel for the specific operation.

| Field Name       |  Type   | Description                                                               |
| :--------------- | :-----: | :------------------------------------------------------------------------ |
| x-hideTryItPanel | boolean | Hides the _Try it_ panel for the operation on which it was set to `true`. |

## Examples

```yaml
openapi: '3.0'
info: ...
tags: [...]
paths:
  /example:
    get:
      summary: Example summary
      description: Example description
      operationId: examplePath
      responses: [...]
      parameters: [...]
      x-hideTryItPanel: true
```
