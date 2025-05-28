# Webhooks


> The incoming webhooks that MAY be received as part of this API and that the API consumer MAY choose to implement. Closely related to the callbacks feature, this section describes requests initiated other than by an API call, for example by an out of band registration. The key name is a unique string to refer to each webhook, while the (optionally referenced) [Path Item Object](./path-item.md) describes a request that may be initiated by the API provider and the expected responses. An example is available.

## Visuals

```yaml

webhooks:
  resultPosted:
    $ref: ./webhooks/chess-result-posted.yaml

```

Redocly renders the webhook in the sidebar navigation with a badge named "Event" by default.
Redocly renders the badge with the full word "Webhook" with the operation summary.

The following image shows how Redocly renders webhooks in the sidebar navigation.

![webhooks in sidebar](./images/webhooks-sidebar.png)

The following image shows how Redocly renders the summary heading.

![webookssummary](./images/webhooks-summary.png)

The following image shows how Redocly renders the entire webhook operation.

![webhooks](./images/webhooks.png)

## Types

- `WebhooksMap`
- [`PathItem`](./path-item.md)

![webhooks map](./images/webhooks-map-path-item-relationship.png)

```mermaid
erDiagram
          WebhookMap }|..|{ PathItem : has
```
