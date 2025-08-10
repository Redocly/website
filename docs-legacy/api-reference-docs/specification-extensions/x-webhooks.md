---
excludeFromSearch: true
---

# x-webhooks

{% admonition type="warning" name="Compatibility warning" %}
This specification extension is supported in OpenAPI 2.0 and 3.0.

In OpenAPI 3.1, use `webhooks` instead.

{% /admonition %}

## Usage

Use `x-webhooks` in your OpenAPI 2.0 and 3.0 definitions to document webhooks the same way you document APIs. Add it to the root OpenAPI object.

The only difference between the format of the OpenAPI 3.1 `webhooks` and the extension's format is the `x-` prefix to the field name (which becomes `x-webhooks`).

| Field name | Type                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| webhooks   | Map[string, Path Item Object \| Reference Object] | The incoming webhooks that MAY be received as part of this API and that the API consumer MAY choose to implement. Closely related to the callbacks feature, this section describes requests initiated other than by an API call, for example by an out of band registration. The key name is a unique string to refer to each webhook, while the (optionally referenced) Path Item Object describes a request that may be initiated by the API provider and the expected responses. An [example](https://github.com/OAI/OpenAPI-Specification/blob/master/examples/v3.1/webhook-example.yaml) is available. |

## Examples

```yaml
openapi: '3.0'
info: ...
tags: [...]
x-webhooks:
  feed-pets:
    post:
      summary: Send bits to feed one or more pets
      operationId: feed-pets
      tags:
        - Post operations
      requestBody:
        $ref: '#/components/schemas/NewPet'
      responses:
        2XX:
          description: >-
            Return any 2XX status to indicate that the data was received
            successfully
```

### In Reference docs

![Webhook content in the middle panel](./images/x-webhooks.png)
