---
template: ../@theme/templates/BlogPost
title: Arazzo Specification 1.1 Release
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

The Arazzo Specification 1.1 release moves API workflow descriptions closer to the way modern systems actually behave.
API workflows are rarely a single request followed by a single response.
They often involve several APIs, events, retries, shared data, and rules for deciding whether a workflow should continue.

Arazzo already gave teams a standard way to describe multi-step API workflows.
Version 1.1 expands that model so workflows can cross more boundaries, compose more cleanly, and extract data more precisely.

## From HTTP-only flows to mixed API workflows

The largest change in Arazzo 1.1 is support for AsyncAPI descriptions.

In Arazzo 1.0, workflows were centered on OpenAPI-described HTTP operations.
That was already useful for tasks such as onboarding a user, placing an order, or running an end-to-end API test.
But many real workflows also include asynchronous behavior: publish an event, wait for a message, correlate a response, or continue only after another system acknowledges the work.

Arazzo 1.1 allows `sourceDescriptions` to reference AsyncAPI documents as well as OpenAPI and Arazzo documents.
Steps can then use AsyncAPI operations or channels, and each asynchronous step declares whether it sends or receives a message.

```yaml
sourceDescriptions:
  - name: CafeNotifications
    url: ./cafe-notifications.asyncapi.yaml
    type: asyncapi
```

Example send + receive sequence:

```yaml
- stepId: placeOrder
  description: Send an order message to the async channel
  operationId: $sourceDescriptions.asyncOrderApi.placeOrder
  action: send
  parameters:
    - name: requestId
      in: header
      value: $inputs.correlationId
  requestBody:
    payload:
      productId: $inputs.productDetails.productId
      quantity: $inputs.productDetails.quantity

- stepId: confirmOrder
  description: Wait for an order confirmation message
  operationId: $sourceDescriptions.asyncOrderApi.confirmOrder
  action: receive
  correlationId: $inputs.correlationId
  dependsOn:
    - placeOrder
  timeout: 6000
  outputs:
    orderId: $message.payload.orderId
```

This makes it possible to describe a workflow that starts with an HTTP request, publishes to an event bus, waits for a response message, and then uses that response in a later step.

Two additions make those event-driven workflows easier to reason about:

- `correlationId` connects an outgoing message with the incoming message the workflow is waiting for.
- `timeout` defines how long the step should wait before it fails.

The new `dependsOn` field also lets a step declare the other steps that must finish before it can run.
This is useful when a workflow is not purely linear, or when several steps prepare data before another step can continue.

## Reuse workflows instead of repeating them

Arazzo 1.1 improves workflow composition by allowing Action Objects to call another workflow and pass inputs with the `parameters` field.

This is especially useful for shared behavior.
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

The result is smaller workflow files and a cleaner separation between the business workflow and the support workflows around it.

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

Selectors are available in several places where workflows map or reuse data, including workflow outputs, step outputs, request bodies, parameters, and payload replacement values.

Arazzo 1.1 also refines expression typing.
The Expression Type Object can now identify both the expression language and version.
That matters for teams that need predictable behavior across tooling, especially when different versions of JSONPath or XPath may interpret expressions differently.

## Align with OpenAPI 3.2 query strings

OpenAPI 3.2 added support for describing an entire query string as a value.
Arazzo 1.1 aligns with that model by adding `querystring` as an option for the Parameter Object `in` field.

That means workflows can pass complex query structures as one mapped value instead of modeling every individual query parameter.

```yaml
- name: searchParams
  in: querystring
  value: "sort=desc&limit=10"
```

This is helpful for search, filtering, and other operations where the query string can be dynamic or composed from several workflow inputs.

## Make cross-document references less fragile

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

Not every important specification change adds a new field.
Some changes make the existing model easier to implement consistently.

Arazzo 1.1 adds clarification in a few areas that matter for tool builders and workflow authors:

- A complete ABNF grammar for runtime expressions.
- Defined ordering for resolving Source Description Objects.
- Explicit truthy and falsy evaluation semantics for success criteria.

These details reduce guesswork.
They also make it easier for editors, linters, validators, generators, and workflow execution tools to agree on how the same Arazzo description should behave.

## Why this release matters

Arazzo 1.1 keeps the specification focused on its core purpose: describing how APIs work together to complete a task.
The difference is that "APIs working together" now covers more of the systems teams actually operate.

With AsyncAPI support, Arazzo can describe workflows that include events and messages.
With workflow composition, teams can reuse common flows.
With selectors and expression versions, data mapping becomes more precise.
With `$self` and clearer semantics, multi-document workflows become more reliable.

For teams using Arazzo for documentation, testing, workflow execution, or generated examples, these changes make the description more expressive without changing the basic idea: capture the knowledge of how a task moves across APIs in a standard, machine-readable format.

To learn more, visit the [what is Arazzo](https://redocly.com/learn/arazzo/what-is-arazzo) or read the [latest Arazzo specification](https://spec.openapis.org/arazzo/v1.1.0.html).

Are you using [Respect](../pages/respect-cli/respect-cli.page.tsx), or would AsyncAPI support help your workflows? [Let us know](../pages/contact-us/contact-us.page.tsx) about your experience with Respect and whether you want us to support AsyncAPI.
