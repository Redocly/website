---
template: ../@theme/templates/BlogPost
title: "API contract testing from OpenAPI using Arazzo"
description: Your OpenAPI spec is a contract. Learn how to enforce it automatically with API contract testing using the Arazzo standard and Redocly's Respect CLI.
seo:
  title: "API contract testing from OpenAPI using Arazzo"
  description: Your OpenAPI spec is a contract. Learn how to enforce it automatically with API contract testing using the Arazzo standard and Redocly's Respect CLI.
  image: ./images/api-contract-testing-arazzo.png
author: roman-marshevskyi
publishedDate: "2026-04-17"
categories:
  - api-governance:compliance-quality
  - redocly:product-updates
image: api-contract-testing-arazzo.png
---
A developer ships a small backend change.
The API still returns `200 OK`.
Integration tests pass.
Monitoring dashboards stay green.

Two days later, support tickets start pouring in.
The mobile app is crashing on a screen that nobody changed.
Turns out the API dropped a required field from the response--`totalPrice`, gone.
The response was still valid JSON.
Still `200`.

Nobody's tests checked whether the API kept its promise.

That's the problem API contract testing solves.
And with [Arazzo](/learn/arazzo/what-is-arazzo) and [Respect](/respect-cli), you can set it up in two commands.

---

## Why your current tests miss this

You probably already test your API.
Unit tests, integration tests, maybe end-to-end flows.
Here's why contract drift still gets through:

- **Unit tests** verify isolated functions. They don't send HTTP requests to your live API.
- **Integration tests** check whether components work together. They don't validate the response body against your OpenAPI schema.
- **E2E tests** confirm user flows work. They don't notice when a new field leaks internal data or a required field disappears.
- **Uptime monitoring** confirms the API responds. It doesn't care what's in the response.

None of these are designed to enforce your API contract.
All of them can pass while your API silently breaks it.

{% table %}
- Testing type
- What it answers
- Catches contract drift?
---
- Unit tests
- Does this function work in isolation?
- No
---
- Integration tests
- Do components work together?
- Sometimes, indirectly
---
- E2E tests
- Does the user flow complete?
- Sometimes, indirectly
---
- Uptime monitoring
- Is the API responding?
- No
---
- **Contract testing**
- **Does the response match the OpenAPI spec?**
- **Yes, by definition**
{% /table %}

Contract testing is the missing layer.
It treats your OpenAPI description as the source of truth and validates every live response against it--status codes, content types, schemas, headers.
Not "does it work?" but "does it match the contract?"

---

## What Respect does about it

[Respect](/respect-cli) is an open-source CLI that removes an entire class of tests you currently maintain.
It's part of [Redocly CLI](https://github.com/Redocly/redocly-cli)--the same toolchain you may already use for linting and bundling OpenAPI.

You already wrote these tests.
You just didn't realize your spec could replace them.

No assertions to write.
No test scripts to keep in sync.
No spec duplicated in a test framework.

Your OpenAPI description already defines what the API should return.
Respect reads it, sends real HTTP requests to your live API, and validates every response against the spec.
The spec **is** the test.

```bash {% title="Two commands. Zero test code." %}
# Generate test workflows from your OpenAPI spec
npx @redocly/cli generate-arazzo openapi.yaml

# Run contract tests against your live API
npx @redocly/cli respect auto-generated.arazzo.yaml --verbose
```

That's it.
No test framework to configure.
No collection files to export.
No assertion libraries.
Just your spec, your running API, and the truth about whether they agree.

{% admonition type="info" name="Works with the API you have" %}
Respect doesn't require a perfect OpenAPI description.
Start with what you have--even a partially documented spec catches real issues.
You can iteratively improve your spec as Respect reveals gaps.
{% /admonition %}

---

## What Arazzo adds: multi-step workflows without glue code

OpenAPI describes individual endpoints.
But real API usage is never a single call.

You authenticate, create a resource, read it back, update it, verify the update.
Before Arazzo, testing these flows meant writing custom glue code: scripts that chain requests, extract tokens, pass IDs between steps, and hope nothing breaks when the API changes.

The [Arazzo Specification](https://spec.openapis.org/arazzo/v1.0.1/arazzo-specification-v1.0.1.html)--an open standard from the OpenAPI Initiative--replaces all of that with pure data flow.
No custom code.
Outputs from one step feed directly into the next, declared in YAML:

```yaml {% title="cafe-order-flow.arazzo.yaml" %}
arazzo: "1.0.1"
info:
  title: Redocly Cafe order flow
  version: 1.0.0
sourceDescriptions:
  - name: cafeApi
    type: openapi
    url: openapi.yaml
workflows:
  - workflowId: createMenuItemAndOrder
    steps:
      - stepId: createMenuItem
        operationId: cafeApi.createMenuItem
        requestBody:
          payload:
            name: "Espresso"
            price: 350
            category: "beverage"
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          menuItemId: $response.body#/id

      - stepId: placeOrder
        operationId: cafeApi.createOrder
        requestBody:
          payload:
            customerName: "Mary Ann"
            orderItems:
              - menuItemId: $steps.createMenuItem.outputs.menuItemId
                quantity: 2
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          orderId: $response.body#/id

      - stepId: verifyOrder
        operationId: cafeApi.getOrderById
        parameters:
          - name: orderId
            in: path
            value: $steps.placeOrder.outputs.orderId
        successCriteria:
          - condition: $statusCode == 200
```

See `$steps.createMenuItem.outputs.menuItemId`?
The menu item ID from step one flows into step two automatically, then the order ID flows into step three.
This replaces the glue scripts, the variable chaining, the brittle test harnesses.
One YAML file. In your repo. Versioned with your API.

{% admonition type="info" name="Arazzo is an open standard" %}
Arazzo is maintained by the OpenAPI Initiative--the same organization behind OpenAPI itself.
Your workflow definitions are portable and vendor-neutral.
[Learn more about Arazzo](/learn/arazzo/what-is-arazzo).
{% /admonition %}

---

## What gets caught

When Respect runs your workflows, it validates every response against the linked OpenAPI description.
Here's what that looks like in practice.

{% cards columns=2 %}
  {% card title="Status codes" %}
  Your spec says `201 Created`, but the API returns `200 OK` after a refactor.
  Functionally fine.
  Contractually broken.
  Every consumer expecting `201` now has a bug.
  Respect catches it.
  {% /card %}
  {% card title="Content types" %}
  The spec declares `application/json`, but a new middleware starts returning `text/html` on error paths.
  Client JSON parsers choke silently.
  Respect catches it.
  {% /card %}
  {% card title="Response schemas" %}
  A developer removes a `required` field.
  Or worse: an internal field like `internal_user_id` leaks into the public response.
  Schema validation catches both--missing fields and dangerous extras.
  Respect catches it.
  {% /card %}
  {% card title="Headers" %}
  CORS headers disappear after a proxy update.
  `Cache-Control` goes missing.
  A security header gets silently dropped.
  Respect catches it.
  {% /card %}
{% /cards %}

Here's a concrete example.
Say your OpenAPI spec defines this response schema for `GET /orders/{orderId}`:

```yaml {% title="Expected: Order schema from openapi.yaml" %}
properties:
  id:
    type: string
    pattern: ^ord_[0-9abcdefghjkmnpqrstvwxyz]{26}$
  customerName:
    type: string
  status:
    type: string
    enum: [placed, preparing, completed, canceled]
  totalPrice:
    type: integer
    minimum: 0
  orderItems:
    type: array
    minItems: 1
    items:
      type: object
      properties:
        menuItemId:
          type: string
        quantity:
          type: integer
          minimum: 1
      required: [menuItemId, quantity]
      additionalProperties: false
required: [id, customerName, status, totalPrice, orderItems]
additionalProperties: false
```

But after a deploy, `GET /orders/{orderId}` returns:

```json {% title="Actual response -- spot the problems" %}
{
  "id": "ord_01h1s5z6vf2mm1mz3hevnn9va7",
  "customerName": "Mary Ann",
  "status": "fulfilled",
  "totalPrice": 200,
  "orderItems": [
    { "menuItemId": "itm_01h1s5z6vf2mm1mz3hevnn9va7", "quantity": 2 }
  ],
  "internalCostCents": 45
}
```

Two contract violations:
1. `status` is `"fulfilled"` -- not in the enum. Every client with a switch on `placed | preparing | completed | canceled` just hit the default case.
2. `internalCostCents` leaked into the public API. That's internal pricing data exposed to consumers.

Respect flags both automatically.
No test code needed--the OpenAPI spec already defines what's allowed.

This is exactly the kind of bug that passes every other test.

---

## Running it in practice

{% tabs %}
  {% tab label="Quick start" %}
  Two commands, from nothing to validated contracts:

  ```bash {% title="Generate and run" %}
  npx @redocly/cli generate-arazzo openapi.yaml
  npx @redocly/cli respect auto-generated.arazzo.yaml --verbose
  ```

  {% /tab %}
  {% tab label="CI/CD (GitHub Actions)" %}
  Gate every pull request on contract compliance:

  ```yaml {% title=".github/workflows/contract-tests.yml" %}
  name: API Contract Tests
  on: [pull_request]
  jobs:
    contract-test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 22
        - run: npm install -g @redocly/cli
        - run: redocly respect ./tests/api-contracts.arazzo.yaml --verbose
  ```

  Non-zero exit code on contract violations.
  Broken contracts don't merge.
  {% /tab %}
  {% tab label="Custom workflows" %}
  Write targeted Arazzo files for your critical paths.
  This example shows a real order lifecycle--with reusable atomic workflows for auth and cleanup:

  ```yaml {% title="cafe-orders.arazzo.yaml" %}
  arazzo: 1.0.1
  info:
    title: Cafe API - Orders
    version: 1.0.0
  sourceDescriptions:
    - name: cafeApi
      type: openapi
      url: openapi.yaml
    - name: authorization
      type: arazzo
      url: atomic-operations/authorization.arazzo.yaml
    - name: create-menu-item
      type: arazzo
      url: atomic-operations/create-menu-item.arazzo.yaml

  workflows:
    - workflowId: crud-orders-workflow
      summary: CRUD Orders
      steps:
        - stepId: authorize
          workflowId: $sourceDescriptions.authorization.workflows.authorize-with-code
          outputs:
            access_token: $outputs.access_token_with_code
            client_id: $outputs.client_id

        - stepId: create-menu-item
          workflowId: $sourceDescriptions.create-menu-item.workflows.create-menu-item-workflow
          parameters:
            - name: accessToken
              value: $steps.authorize.outputs.access_token
            - name: clientId
              value: $steps.authorize.outputs.client_id
          outputs:
            menuItemId: $outputs.menuItemId

        - stepId: create-order
          operationId: $sourceDescriptions.cafeApi.createOrder
          requestBody:
            payload:
              customerName: John
              orderItems:
                - menuItemId: $steps.create-menu-item.outputs.menuItemId
                  quantity: 3
                  comment: "add more chocolate"
          successCriteria:
            - condition: $statusCode == 201
            - condition: $response.body#/id != null
          outputs:
            orderId: $response.body#/id

        - stepId: update-order-status
          operationId: $sourceDescriptions.cafeApi.updateOrder
          parameters:
            - name: orderId
              in: path
              value: $steps.create-order.outputs.orderId
          requestBody:
            payload:
              status: completed
          successCriteria:
            - condition: $statusCode == 200
            - condition: $response.body#/status == 'completed'

        - stepId: get-order-by-id
          operationId: $sourceDescriptions.cafeApi.getOrderById
          parameters:
            - name: orderId
              in: path
              value: $steps.create-order.outputs.orderId
          successCriteria:
            - condition: $statusCode == 200
            - condition: $response.body#/customerName == 'John'
  ```

  Notice the composition: `authorization` and `create-menu-item` are separate Arazzo files referenced as source descriptions.
  Each is reusable across multiple test workflows.
  {% /tab %}
{% /tabs %}

---

## The open-standards advantage

Respect builds on two open standards.
This avoids tool lock-in entirely.

- **OpenAPI** defines your API contract. The same file you use for docs, code generation, and governance now also powers your tests.
- **Arazzo** defines your test workflows. An open spec from the OpenAPI Initiative, not a proprietary format tied to a single tool.

Your test definitions are plain YAML files that live in your repo, version with your code, and work with any Arazzo-compatible tool.
When your OpenAPI description changes, contract tests validate against the updated spec automatically.
No separate test layer to keep in sync.

One spec. One workflow layer. No duplication.

---

## From CLI to continuous monitoring

Respect CLI is free and open source--run it locally, in CI, anywhere.
When you need always-on validation, [Respect Monitoring](/respect) extends the same foundation into a hosted service.

{% table %}
- Capability
- Respect CLI (free)
- Respect Monitoring (hosted)
---
- Contract testing
- Yes
- Yes
---
- CI/CD integration
- Yes
- Yes
---
- Scheduled checks
- Manual / cron
- Built-in (minute / hour / day)
---
- Alerts (Slack, email)
- No
- Yes
---
- Dashboards and trend tracking
- No
- Yes
---
- Multi-environment
- Manual config
- Built-in (staging, production)
---
- Pricing
- Free, forever
- 1,000 requests/month free, then usage-based
{% /table %}

Start with the CLI during development.
Graduate to Monitoring when you need continuous assurance in production.

---

## FAQ

**Do I need to write test code?**

No.
`redocly generate-arazzo openapi.yaml` creates test workflows from your spec automatically.
Customize them for specific scenarios if you want, but the defaults cover your endpoints out of the box.

**What if my OpenAPI spec is incomplete?**

Start with what you have.
An incomplete spec still catches real drift on the endpoints it covers.
You can expand coverage incrementally as Respect reveals gaps.

**Does this work in CI/CD?**

Yes.
Respect returns standard exit codes--non-zero means contract violations.
GitHub Actions, GitLab CI, Jenkins, CircleCI, plain shell scripts--anything that can run a CLI.
Broken contracts don't merge.

---

## Run it once and see what breaks

Your OpenAPI description already defines the contract.
You just haven't been enforcing it.

You will find something.

```bash
npx @redocly/cli respect your-api.arazzo.yaml --verbose
```

- [Respect CLI](/respect-cli) -- open source, free forever. [View on GitHub](https://github.com/Redocly/redocly-cli/tree/main/packages/respect-core).
- [Documentation](/docs/respect) -- guides, use cases, command reference.
- [Respect Monitoring](/respect) -- continuous, hosted contract validation.
- [Learn Arazzo](/learn/arazzo/what-is-arazzo) -- the workflow standard.

Your API has been making promises.
Time to find out if it's keeping them.
