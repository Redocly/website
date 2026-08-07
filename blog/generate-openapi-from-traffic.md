---
template: ../@theme/templates/BlogPost
title: Generate OpenAPI from real traffic (with AI)
description: The new generate-spec command infers an OpenAPI description from recorded HTTP traffic - with AI refinement.
seo:
  title: Generate OpenAPI from real traffic (with AI)
  description: The new generate-spec command infers an OpenAPI description from recorded HTTP traffic - with AI refinement.
author: adam-sobaniec
publishedDate: "2026-08-05"
categories:
  - redocly:redocly-cli
  - redocly:product-updates
  - api-specifications:openapi
---

Plenty of production APIs have no OpenAPI description at all.
The endpoints live in code, the knowledge lives in people's heads, and the closest thing to documentation is a wiki page nobody fully trusts.

Human developers cope with that - they read the source, ask a colleague, poke around with curl.
AI agents can't.
They learn what your API can do from a machine-readable description of it, and without one its capabilities are invisible to them.

So the blank page is worth removing, and it is usually the only thing in the way: writing a description by hand for dozens of existing endpoints is exactly the kind of backfill work that never makes it into a sprint.
The new `generate-spec` command in Redocly CLI removes it.
Your API already produces the raw material every time someone uses it: traffic.
`generate-spec` reads recorded HTTP traffic and infers an OpenAPI 3.2 description from it.

## From traffic to description

The command accepts HAR files, Kong logs, Nginx/Apache JSON logs, and NDJSON - a file or a whole folder of them.
Traffic parsing is shared with the [`drift` command](./catch-api-drift.md), so any log that works with `drift` works here too.

From the recorded exchanges it builds a baseline deterministically - no AI involved yet, same traffic in, same description out:

- Identifier-like path segments (numeric IDs, UUIDs, prefixed tokens like `prd_…`) become named path parameters, so a hundred URLs collapse into one templated path.
- Request and response schemas are merged across all observations; a property becomes optional as soon as one sample omits it.
- Alternative body shapes for the same operation are preserved as `oneOf` variants, and object shapes that repeat across the document are extracted into `components/schemas`.
- String values are analyzed conservatively: consistent well-known patterns get a `format` (`uuid`, `date-time`, `email`, `uri`), and strings that only ever take a small set of repeated values become an `enum`.

## Example: the Cafe API

Here is what that looks like end to end, on Redocly Cafe - our public demo API, so you can follow along on the same traffic if you want.
Pretend for a moment that its OpenAPI description doesn't exist, and let's reconstruct it from traffic.

First, record some.
The `proxy` command starts a local reverse proxy that captures everything passing through into a HAR file:

```bash
redocly proxy --target https://api.cafe.redocly.com --har ./cafe.har
```

```
Proxy listening on http://127.0.0.1:4040 → forwarding to https://api.cafe.redocly.com/
Recording traffic to ./cafe.har
Press Ctrl+C to stop.
```

{% admonition type="warning" name="Record in a sandboxed environment" %}
The proxy records complete exchanges - URLs, headers, cookies, and request and response bodies - so a capture taken against production holds whatever that traffic held, including credentials and personal data.
Record against a test environment with synthetic data.
This matters in every mode, not only with AI: observed values reach the generated description as enums and examples, so a description inferred from real user data isn't safe to pass around either.
{% /admonition %}

Send a few requests through it - browse the menu, filter it, download some menu item photos:

```bash
curl http://127.0.0.1:4040/menu
curl "http://127.0.0.1:4040/menu?category=dessert"
curl "http://127.0.0.1:4040/menu?category=beverage"
curl -o tiramisu.png http://127.0.0.1:4040/menu-item-images/prd_0000000000seedtrams0000000
curl -o tea.png http://127.0.0.1:4040/menu-item-images/prd_0000000000seedteabv0000000
curl -o cheesecake.png http://127.0.0.1:4040/menu-item-images/prd_0000000000seedchesc0000000
```

Press <kbd>`Ctrl`</kbd> + <kbd>`C`</kbd> to stop the proxy and write the HAR file:

```sh
Captured 6 exchange(s) to ./cafe.har
```

Now ask for a description:

```bash
redocly generate-spec ./cafe.har --title "Cafe API" -o cafe-openapi.yaml
```

```sh
Inferred a baseline OpenAPI description from traffic: 2 operation(s).
Written to: cafe-openapi.yaml
Done in 0s.
```

The result is a valid OpenAPI 3.2 description - about a hundred lines of it, from six requests.
The frame: a server URL inferred from the capture, and one path per discovered endpoint:

```yaml
openapi: 3.2.0
info:
  title: Cafe API
  version: 1.0.0
servers:
  - url: https://api.cafe.redocly.com
paths:
  /menu:
    # …
  /menu-item-images/{menu-item-imageId}:
    # …
```

Rather than paste the whole file, let's zoom in on what the inference did.

Start with the paths: the three photo URLs collapsed into one templated path, because the `prd_…` identifiers were recognized as IDs and became a required path parameter:

```yaml
/menu-item-images/{menu-item-imageId}:
  get:
    operationId: get-menu-item-images-menu-item-imageId
    responses:
      '200':
        description: OK
    parameters:
      - name: menu-item-imageId
        in: path
        required: true
        schema:
          type: string
```

Inside the `/menu` response schema, every menu item property got a type, and the observed values were mined for more:

```yaml
properties:
  # …
  price:
    type: integer
  category:
    type: string
    enum:
      - beverage
      - dessert
  createdAt:
    type: string
    format: date-time
  photoUrl:
    type: string
    format: uri
```

`category` became an enum because every observed value was one of the two, and `createdAt` and `photoUrl` matched well-known patterns in every sample.
The `category` query parameter on the same operation stayed a plain string - two observations aren't enough evidence, so the inference stays conservative rather than guessing:

```yaml
parameters:
  - name: category
    in: query
    required: false
    schema:
      type: string
```

The merge across samples also noticed which properties come and go.
Beverages have volume, desserts have calories, so `volume`, `containsCaffeine`, and `calories` are typed but absent from the `required` list:

```yaml
properties:
  # …
  volume:
    type: integer
  containsCaffeine:
    type: boolean
  calories:
    type: integer
required:
  - id
  - name
  - price
  - photoTextDescription
  - category
  - createdAt
  - updatedAt
  - object
  - photoUrl
```

It's still a hypothesis, though - the description only knows what the traffic showed.
`price` is an integer because every observed price happened to be whole.
`id` and `name` came out as enums of the five menu items the capture contained, which is over-fitting rather than a rule of the API - the same mechanism that turns real values into published enums if you record real traffic.
The photo response has no schema because its body is a PNG, not JSON.
Endpoints nobody called don't exist, nothing has a human-readable description, and names like `{menu-item-imageId}` are derived mechanically - rename them when you review.
More traffic tightens the hypothesis, and your e2e test suite is a free source of it: route the tests through `proxy` once, and the whole run becomes input.

## Refine it with AI

For everything determinism can't reach, add `--with-ai`:

```bash
redocly generate-spec ./cafe.har --title "Cafe API" --with-ai --ai-provider claude -o cafe-openapi.yaml
```

The command refines the baseline one operation at a time, sending each operation together with a shape-diverse sample of its real recorded exchanges to an AI provider.
The AI narrows types, adds formats, enums, descriptions, and examples, and models alternative payloads explicitly with `oneOf` and `allOf`.

Three providers are supported - `claude` (Claude Code), `codex` (Codex CLI), and `cursor` (Cursor CLI).
Each runs the corresponding locally installed CLI in non-interactive mode, so the provider you already use and pay for is the one doing the work.
`--ai-provider` is optional and defaults to `claude`; pick a model with `--ai-model` or let the provider use its default.

The AI's answer is never trusted blindly.
A refined operation is only accepted when it keeps the operation's path and method, keeps every response status code observed in the traffic, and passes validation with the `spec` ruleset.
A rejected refinement keeps its deterministic baseline, and if refinement fails entirely, the command falls back to the baseline description - you never end up with less than the deterministic run would have given you.

{% admonition type="warning" name="Traffic leaves your machine" %}
`--with-ai` sends samples of the recorded traffic - URLs, query strings, request and response bodies - to the selected AI provider.
Beyond recording in a sandbox, make sure the traffic holds no secrets or personal data you are not allowed to share with that provider.
{% /admonition %}

## How much does `--with-ai` actually add?

Fair question, and the Cafe API can answer it with ground truth: its real, handwritten [OpenAPI description](https://cafe.redocly.com/openapi/cafe) exists - we only pretended it doesn't.
Whatever `generate-spec` reconstructs from traffic can be scored against what the API team actually wrote.

So we recorded a fuller session than the six-request capture above - 30 requests covering every endpoint: the OAuth2 client registration dance, menu items created in both categories, orders placed, updated, and deleted, photo downloads, and the errors a real session produces along the way (a `400`, a few `404`s, even a `409`).
Then we generated a description twice from that one capture - once deterministically, once with `--with-ai` - and scored both against the handwritten description.

Two things are worth measuring separately:

- **Precision** - of every checkable claim the generated description makes about a property the handwritten description also documents (its type, its format, its enum values, whether it's required), how many agree.
  This is the "can I trust what it says" number.
- **Recall** - of everything the handwritten description documents, how much the generated one recovered.
  This is the "how much work is left" number.

For response schemas:

| Metric                                 | Deterministic | `--with-ai` |
| -------------------------------------- | ------------- | ----------- |
| Response properties recovered          | 97.5%         | 98.3%       |
| Correct types                          | 100%          | 100%        |
| Correct formats                        | 100%          | 100%        |
| Correct enum values                    | 100%          | 100%        |
| Correct `required`                     | 69.2%         | 72.2%       |
| **Precision, all claims**              | **87.8%**     | **89.2%**   |
| Formats documented, recovered          | 53.1%         | 62.5%       |
| Enums documented, recovered            | 66.7%         | 66.7%       |
| `required` documented, recovered       | 91.3%         | 94.2%       |
| Properties carrying a description      | 0%            | 97.5%       |
| Numeric and length constraints         | 0             | 21          |
| Run time                               | under 1s      | 6-15 min    |

Responses tell the same story as the walkthrough: the deterministic baseline is already *correct* - it never contradicted the handwritten description on a single type, format, or enum value - and what `--with-ai` adds there is everything determinism structurally cannot produce: descriptions on nearly every property, constraints, examples, and formats inferred from context rather than repetition.

Request bodies are a different story:

| Metric                              | Deterministic | `--with-ai` |
| ----------------------------------- | ------------- | ----------- |
| Request properties recovered        | 55.9%         | 61.8%       |
| Correct types                       | 78.9%         | **100%**    |
| Correct `required`                  | 81.8%         | **100%**    |
| **Precision, all claims**           | **80.0%**     | **100%**    |
| Properties carrying a description   | 0%            | 85.7%       |

## What actually changed

`POST /menu` accepts `multipart/form-data`, and in a multipart form every value is a string on the wire.
The deterministic baseline can only write down what it saw:

```yaml
requestBody:
  content:
    multipart/form-data:
      schema:
        type: object
        properties:
          name:
            type: string
          price:
            type: string
          category:
            type: string
          volume:
            type: string
          containsCaffeine:
            type: string
          calories:
            type: string
        required:
          - name
          - price
          - category
```

This is the one place in the whole experiment where the baseline was *wrong* rather than merely incomplete - `price`, `volume`, `calories`, and `containsCaffeine` are not strings - and it is exactly what the AI fixed.
The same request body after `--with-ai`:

```yaml
requestBody:
  content:
    multipart/form-data:
      schema:
        oneOf:
          - $ref: '#/components/schemas/BeverageCreate'
          - $ref: '#/components/schemas/DessertCreate'
        discriminator:
          propertyName: category
          mapping:
            beverage: '#/components/schemas/BeverageCreate'
            dessert: '#/components/schemas/DessertCreate'
```

```yaml
BeverageCreate:
  description: Creation request for a beverage menu item.
  allOf:
    - $ref: '#/components/schemas/MenuItemCreateBase'
    - type: object
      properties:
        category:
          type: string
          enum:
            - beverage
        volume:
          type: integer
          minimum: 0
          description: Serving volume in millilitres.
          example: 180
        containsCaffeine:
          type: boolean
          description: Whether the beverage contains caffeine.
          example: true
MenuItemCreateBase:
  type: object
  description: Attributes shared by every menu item creation request.
  properties:
    name:
      type: string
      description: Human-readable name of the menu item.
      example: flat-white
    price:
      type: integer
      minimum: 0
      description: Price in the smallest currency unit (for example cents).
      example: 450
    # …
  required:
    - name
    - price
    - category
```

Every type is corrected, and constraints, descriptions, and examples appeared - but the bigger change is the shape itself.
The AI noticed from the samples that beverages and desserts carry different fields and modeled the union explicitly: `allOf` composition over the shared attributes, selected by a `category` discriminator.
The handwritten description models menu items exactly the same way - `oneOf` beverage or dessert, discriminated by `category`.
Traffic plus AI converged on the design the API team chose by hand, where the baseline could only offer one merged object with everything optional.

The rest of the delta, briefly:

- Descriptions went from zero to 97.5% of response properties, plus a summary and description on every refined operation.
- 21 numeric and length constraints appeared, along with realistic `example` values.
- Identifier patterns were inferred on path parameters, such as `pattern: ^ord_[0-9a-z]+$` on the order ID.
- The over-fitting the walkthrough warned about got cleaned up: the baseline turned the two observed order IDs into an `enum`, and the AI demoted it to a plain string with a description and a realistic `example` - while real enums like `category` and order `status` stayed.
- `required` was cleaned up where the traffic over-claimed it - optional client-registration fields that every sample happened to include.

The guardrails did real work during this run, too: one operation's refinement failed on a transient provider error and kept its deterministic baseline, so the output stayed valid and complete.

One caveat travels from API to API: path parameters.
Every Cafe path parameter was recognized, because its identifiers are prefixed tokens (`prd_…`, `ord_…`) that the deterministic inference detects.
On APIs whose path segments are ordinary words - organization names, repository names, branches - those segments stay hardcoded, and AI refinement can't rescue them because a refined operation must keep its path.
Reviewing paths by hand is the one non-optional step.

{% admonition type="info" name="About these numbers" %}
They come from one capture of one small API, scored by a script we wrote for the occasion, so treat them as an illustration rather than a benchmark.
The handwritten description isn't perfect ground truth either: the traffic hit a `409` on `DELETE /menu/{menuItemId}` and a live `/health` endpoint that the handwritten description doesn't document - real API behavior that counts against the generated description as "not in the spec".
{% /admonition %}

{% admonition type="warning" name="Experimental" %}
The `generate-spec` command is experimental.
Flags, output, and behavior may change - including breaking changes - in upcoming releases while we shape it with your feedback.
{% /admonition %}

## Get started

The `generate-spec` command is available now in the latest [Redocly CLI](https://redocly.com/docs/cli) - see the [command reference](https://redocly.com/docs/cli/commands/generate-spec) for all options.
Run it on your traffic, review what comes out, lint it with your own ruleset, and tell us what you think on the [Redocly CLI GitHub repository](https://github.com/Redocly/redocly-cli/issues).

And once you have a description, don't let it rot.
Point the [`drift` command](./catch-api-drift.md) at next week's traffic and it tells you the moment reality moves.
Generate, then guard.
