---
template: ../@theme/templates/BlogPost
title: Arazzo 1.1 Release
description: Arazzo 1.1 adds AsyncAPI support, workflow composition, selectors, identity-based references, and clearer runtime behavior.
seo:
  title: Arazzo Specification 1.1 Release
  description: Arazzo 1.1 adds AsyncAPI support, workflow composition, selectors, identity-based references, and clearer runtime behavior.
author: dmytro-ananskyi
publishedDate: "2026-05-20"
categories:
  - api-specifications:arazzo
  - redocly:product-updates
---

The Arazzo Specification 1.1 moves API workflow descriptions closer to the way modern systems actually behave.
API workflows are rarely a single request followed by a single response.
They often involve several APIs, events, retries, shared data, and rules for deciding whether a workflow should continue.

Arazzo already gave teams a standard way to describe multi-step API workflows.
Version 1.1 expands that model so workflows can cross more boundaries, compose more cleanly, and extract data more precisely.

## From HTTP-only flows to mixed API workflows

The largest change in Arazzo 1.1 is support for AsyncAPI descriptions.

In Arazzo 1.0, workflows were centered on OpenAPI-described HTTP operations.
Developers could use Arazzo to describe workflows and run end-to-end or contract tests for synchronous APIs.
However, many real-life workflows also include asynchronous behavior: publish an event, wait for a message, correlate a response, or continue only after another system acknowledges the work.

Arazzo 1.1 allows `sourceDescriptions` to reference AsyncAPI documents in addition to OpenAPI and Arazzo documents.
Steps can then use AsyncAPI operations or channels, and each asynchronous step declares whether it sends or receives a message.

```yaml
sourceDescriptions:
  - name: CafeNotifications
    url: ./cafe-notifications.asyncapi.yaml
    type: asyncapi
```

An async step example::

```yaml
- stepId: placeOrder
  operationId: $sourceDescriptions.CafeNotifications.placeOrder
  action: send
  parameters:
    - name: requestId
      in: header
      value: $inputs.correlationId
  requestBody:
    payload:
      productId: $inputs.productDetails.productId

- stepId: confirmOrder
  operationId: $sourceDescriptions.CafeNotifications.confirmOrder
  action: receive
  correlationId: $inputs.correlationId
  timeout: 6000
  outputs:
    orderId: $message.payload.orderId
```

This makes it possible to describe a workflow that starts with an HTTP request, publishes to an event bus, waits for a response message, and then uses that response in a later step.

Two additions make these event-driven workflows easier to reason about:

- `correlationId` connects an outgoing message with the incoming message the workflow is waiting for.
- `timeout` defines how long the step should wait before it fails.

The new `dependsOn` field also lets a step declare which steps must finish before it can run.
Use `dependsOn` when writing workflows that aren't purely linear, or when several steps prepare data before another step can continue.

## Reuse workflows instead of repeating them

Arazzo 1.1 improves workflow composition by allowing Action Objects to call another workflow and pass inputs with the `parameters` field.
These new reuse capabilities are especially useful for shared behavior.

For example, many workflows need the same token refresh sequence, the same setup step, or the same cleanup step.
Instead of repeating that logic in every workflow, Arazzo descriptions can point to a reusable workflow and map the values it needs.

```yaml
name: renewSessionAfterUnauthorized
type: retry
workflowId: renewCustomerSession
parameters:
  - name: sessionRenewalToken
    value: $inputs.sessionRenewalToken
```

In this example, the values under `parameters` are passed as inputs to the `renewCustomerSession` workflow.
The `sessionRenewalToken` becomes an input value available inside that called workflow.

As a result, your workflow files are smaller and have a cleaner separation between the business workflow and the support workflows around it.

## Select the exact data you need

Arazzo workflows often depend on data produced earlier in the sequence.
A response body might contain the user ID needed in the next request, or a message payload might contain the status that decides whether a workflow succeeded.

Version 1.1 introduces the Selector Object for more precise data extraction.
Selectors can use `jsonpath`, `xpath`, or `jsonpointer`, with a `context` that defines where selection starts.

```yaml
outputs:
  orderConfirmationCode:
    context: $response.body
    selector: $.order.confirmation.code
    type: jsonpath
```

Selectors are available in several places where workflows map or reuse data, including: workflow outputs, step outputs, request bodies, parameters, and payload replacement values.

Arazzo 1.1 also refines expression typing.
The Expression Type Object can now identify both the expression language and version.
WIth this feature, teams can assure predictable behavior across tooling, especially when different versions of JSONPath or XPath may interpret expressions differently.

## Align with OpenAPI 3.2

### Add support for query strings

OpenAPI 3.2 added support for describing an entire query string as a value.
Arazzo 1.1 aligns with that model by adding `querystring` as an option for the Parameter Object `in` field.
As a consequence, workflows can pass complex query structures as one mapped value instead of modeling every individual query parameter.

```yaml
- name: searchParams
  in: querystring
  value: "sort=desc&limit=10"
```

Use this option for search, filtering, and other operations where the query string can be dynamic or composed from several workflow inputs.

### Make cross-document references less fragile

Arazzo descriptions can now define a root-level `$self` URI.
When another Arazzo document references that description by URI, implementations use `$self` as the document identity if it is present.

```yaml
arazzo: 1.1.0
$self: https://api.example.com/workflows/cafe-ordering.arazzo.yaml
info:
  title: A cafe ordering workflow
  version: 1.0.0
```

This helps avoid ambiguity when workflows are split across files, moved between environments, or resolved through different URLs.
For larger API programs, stable identity is important because workflow reuse only works well when references are predictable.

## Clearer rules for implementers

Arazzo 1.1 adds clarification in a few areas that matter for tool builders and workflow authors: clarified grammar for runtime expressions, defined ordering for resolving Source Description Objects, explicitly describe truthy and falsy success criteria evaluation semantics.
These details reduce guesswork.
They also make it easier for editors, linters, validators, generators, and workflow execution tools to agree on how an Arazzo description file should behave.

## Why this release matters

Arazzo 1.1 keeps the specification focused on its core purpose: describing how APIs work together to complete a task.

To learn more, visit the [what is Arazzo](../learn/arazzo/what-is-arazzo) or read the [Arazzo specification 1.1](https://spec.openapis.org/arazzo/v1.1.0.html).

Are you using [Respect](../pages/respect-cli/respect-cli.page.tsx), or would AsyncAPI support help your workflows? [Let us know](https://github.com/Redocly/redocly-cli/issues) about your experience with Respect and whether you want us to support AsyncAPI.
