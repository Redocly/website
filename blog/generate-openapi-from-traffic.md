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
That has always been a problem for documentation and SDKs.
In the AI era it is also an integration problem, because an OpenAPI description is the contract AI agents read to learn how to call an API.

There are two usual fixes: write the description by hand, or ask an AI assistant to derive it from the source code.
Writing by hand is slow.
The source-code route fails exactly when you need it most: on a large codebase the model loses track, guesses how handlers behave, and produces a description that looks right but quietly disagrees with the API - and you can't tell where.

The new `redocly generate-spec` command starts from evidence instead: recorded HTTP traffic, which shows what the API actually does.
It first infers a baseline description deterministically.
Then it uses AI only where AI really helps - one operation at a time, grounded in real recorded exchanges, with every answer verified before it is accepted.

## From traffic to description

The command accepts HAR files, Kong logs, Nginx/Apache JSON logs, and NDJSON - a single file or a whole folder of them.
Traffic parsing is shared with the [`drift` command](./catch-api-drift.md), so any log that works with `drift` works here too.

From the recorded exchanges it builds a baseline deterministically - no AI involved yet, same traffic in, same description out:

- Identifier-like path segments (numeric IDs, UUIDs, prefixed tokens like `prd_…`) become named path parameters, so a hundred URLs become one templated path.
- Request and response schemas are merged across all observations; a property becomes optional as soon as one sample omits it.
- Alternative body shapes for the same operation are preserved as `oneOf` variants, and object shapes that repeat across the document are extracted into `components/schemas`.
- String values are analyzed conservatively: strings that consistently match well-known patterns get a `format` (`uuid`, `date-time`, `email`, `uri`), and strings that only ever take a small set of repeated values become an `enum`.

## Example: the Cafe API

Here is what that looks like end to end, on Redocly Cafe - our public demo API, so you can follow along on the same traffic if you want.
Pretend for a moment that its OpenAPI description doesn't exist, and let's reconstruct it from traffic.

First, record some.
The `proxy` command starts a local reverse proxy that captures everything passing through into a HAR file:

```bash
redocly proxy --target https://api.cafe.redocly.com --har ./cafe.har
```

```sh
Proxy listening on http://127.0.0.1:4040 → forwarding to https://api.cafe.redocly.com/
Recording traffic to ./cafe.har
Press Ctrl+C to stop.
```

{% admonition type="warning" name="Record in a sandboxed environment" %}
The proxy records complete exchanges - URLs, headers, cookies, and request and response bodies.
A capture taken against production contains whatever that traffic contained, including credentials and personal data.
Record against a test environment with synthetic data.
This matters in every mode, not only with AI: observed values end up in the generated description as enums and examples, so a description inferred from real user data is not safe to share either.
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

The result is a valid OpenAPI 3.2 description - about a hundred lines, from six requests.
The outline: a server URL inferred from the capture, and one path per discovered endpoint:

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

Rather than paste the whole file, let's look at what the inference did.

Start with the paths: the three photo URLs became one templated path, because the `prd_…` identifiers were recognized as IDs and turned into a required path parameter:

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

Inside the `/menu` response schema, every menu item property got a type, and the observed values were analyzed for more detail:

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
The `category` query parameter on the same operation stayed a plain string - two observations are not enough evidence, so the inference stays conservative instead of guessing:

```yaml
parameters:
  - name: category
    in: query
    required: false
    schema:
      type: string
```

The merge across samples also detected which properties are not always present.
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

The result is still only a hypothesis - the description knows only what the traffic showed.
`price` is an integer because every observed price happened to be a whole number.
`id` and `name` became enums of the five menu items in the capture.
That is over-fitting, not a rule of the API - and the same mechanism publishes real values as enums if you record real traffic.
The photo response has no schema because its body is a PNG, not JSON.
Endpoints that nobody called are missing, there are no human-readable descriptions, and names like `{menu-item-imageId}` are generated mechanically - rename them when you review.
More traffic makes the hypothesis stronger, and your e2e test suite is a free source of it: route the tests through `proxy` once, and the whole run becomes input.

## Refine it with AI

The baseline is structurally correct, but it can't explain anything.
It can tell you `price` is an integer; it can't tell you the price is in cents.
It can't write a human-readable description, can't add a `minimum: 0` that no traffic sample proves, and can't tell whether two body shapes are noise or two variants of one union.
That is the layer AI adds. Turn it on with `--with-ai`:

```bash
redocly generate-spec ./cafe.har --title "Cafe API" --with-ai --ai-provider claude -o cafe-openapi.yaml
```

What comes back is everything the deterministic step cannot produce:

- **Documentation** - a summary and description on every operation, and descriptions on nearly every property and parameter.
- **Semantic types and constraints** - `minimum: 0` on prices and quantities, identifier patterns like `^ord_[0-9a-z]+$`, and formats inferred from what a field means rather than from repeated values.
- **Real API design** - alternative payloads modeled as `oneOf` unions with a discriminator, and shared structure extracted into `allOf` base components.
- **Over-fitting cleanup** - values that were wrongly locked into enums become plain typed fields with a realistic `example`, while genuine enums stay.

### Built to keep the AI honest

"Ask AI for an OpenAPI description" usually fails for one reason: context.
Give a model a whole codebase - or a whole traffic dump - and it loses track, then fills the gaps with plausible guesses.
`generate-spec` structures the work so this cannot happen:

- **One operation per prompt.**
  Each prompt contains a single operation from the baseline, the component schemas it references, and a small sample of its recorded exchanges - a few real requests, picked so that every observed payload variant is included.
  Prompt size stays bounded no matter how large the API or the capture is; the 500th operation gets the same focused attention as the first.
- **Determinism and AI work together, not against each other.**
  The AI does not rebuild anything from scratch - it refines the baseline.
  It is also told that the detected enums and formats come from the *full* traffic, so it may correct them when a sample contradicts them, but it may never drop them just because its small sample does not show them.
- **Nothing is trusted blindly.**
  A refined operation is accepted only if it keeps the operation's path and method, keeps every response status code observed in the traffic, does not redefine components owned by other operations, and passes validation with the `spec` ruleset.
  On top of that, only the requested operation is merged back, so the AI cannot invent, drop, or rename endpoints even if it tries.
  A rejected refinement keeps its deterministic baseline.
  If refinement fails completely, the command falls back to the baseline description - you never get less than the deterministic run would have given you.

### Runs on the AI you already have

Three providers are supported - `claude` (Claude Code), `codex` (Codex CLI), and `cursor` (Cursor CLI).
Each one runs the locally installed CLI in non-interactive mode, so the subscription you already use and pay for does the work - no new API key, no separate billing, no vendor decision to make.
`--ai-provider` is optional and defaults to `claude`; pick a model with `--ai-model` or let the provider use its default.

Operations are refined in parallel.
`--ai-concurrency` (default 4) is the main way to make it faster: rerunning the full 14-operation Cafe capture from the experiment below took under a minute with `--ai-concurrency 6`.

{% admonition type="warning" name="Traffic leaves your machine" %}
`--with-ai` sends samples of the recorded traffic - URLs, query strings, request and response bodies - to the selected AI provider.
Three design choices limit what is exposed: headers are never included in prompts, so recorded `Authorization` headers and cookies stay on your machine; the provider CLI runs in a fresh empty directory, so none of your local files or AI-assistant rules enter the prompt; and the prompt tells the model to never copy secret-looking values into generated examples.
These are safety layers, not a guarantee - record in a sandbox, and make sure the traffic contains no secrets or personal data you are not allowed to share with that provider.
{% /admonition %}

## How much does `--with-ai` actually add?

Fair question, and the Cafe API can answer it precisely: its real, handwritten [OpenAPI description](https://cafe.redocly.com/openapi/cafe) exists - we only pretended it doesn't.
So whatever `generate-spec` reconstructs from traffic can be scored against what the API team actually wrote.

We recorded a fuller session than the six-request capture above - 30 requests covering every endpoint: the OAuth2 client registration flow, menu items created in both categories, orders placed, updated, and deleted, photo downloads, and the errors a real session produces along the way (a `400`, a few `404`s, even a `409`).
Then we generated a description twice from that one capture - once deterministically, once with `--with-ai` - and scored both against the handwritten description.

Two things are worth measuring separately:

- **Precision** - when the generated description makes a claim about a property that the handwritten description also documents (its type, its format, its enum values, whether it is required), how often is the claim correct?
  This is the "can I trust what it says" number.
- **Recall** - of everything the handwritten description documents, how much did the generated one recover?
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
| Run time                               | under 1s      | 1-15 min¹   |

¹ Depends heavily on the model and `--ai-concurrency` - the largest models at the default concurrency are the slowest, while a rerun of the same capture with `--ai-concurrency 6` finished in under a minute.

Responses tell the same story as the walkthrough.
The deterministic baseline is already *correct*: it never contradicted the handwritten description on a single type, format, or enum value.
What `--with-ai` adds is what determinism cannot produce at all: descriptions on nearly every property, constraints, examples, and formats inferred from context rather than repetition.

Request bodies are a different story:

| Metric                              | Deterministic | `--with-ai` |
| ----------------------------------- | ------------- | ----------- |
| Request properties recovered        | 55.9%         | 61.8%       |
| Correct types                       | 78.9%         | **100%**    |
| Correct `required`                  | 81.8%         | **100%**    |
| **Precision, all claims**           | **80.0%**     | **100%**    |
| Properties carrying a description   | 0%            | 85.7%       |

## What actually changed

`POST /menu` accepts `multipart/form-data`, and every value in a multipart form is sent as a string.
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

This is the one place in the whole experiment where the baseline was *wrong* rather than just incomplete - `price`, `volume`, `calories`, and `containsCaffeine` are not strings - and it is exactly what the AI fixed.
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
The AI noticed from the samples that beverages and desserts carry different fields, and modeled the union explicitly: `allOf` composition over the shared attributes, selected by a `category` discriminator.
The handwritten description models menu items exactly the same way - `oneOf` beverage or dessert, discriminated by `category`.
Traffic plus AI arrived at the same design the API team chose by hand; the baseline could only offer one merged object with everything optional.

The rest of the changes, briefly:

- Descriptions went from zero to 97.5% of response properties, plus a summary and description on every refined operation.
- 21 numeric and length constraints appeared, along with realistic `example` values.
- Identifier patterns were inferred on path parameters, such as `pattern: ^ord_[0-9a-z]+$` on the order ID.
- The over-fitting the walkthrough warned about was cleaned up: the baseline turned the two observed order IDs into an `enum`, and the AI demoted it to a plain string with a description and a realistic `example` - while real enums like `category` and order `status` stayed.
- `required` was cleaned up where the traffic over-claimed it - optional client-registration fields that every sample happened to include.

The guardrails did real work during this run, too: one operation's refinement failed on a transient provider error and kept its deterministic baseline, so the output stayed valid and complete.

One caveat applies to every API: path parameters.
Every Cafe path parameter was recognized, because its identifiers are prefixed tokens (`prd_…`, `ord_…`) that the deterministic inference detects.
On APIs whose path segments are ordinary words - organization names, repository names, branches - those segments stay hardcoded, and AI refinement cannot fix them, because a refined operation must keep its path.
Reviewing paths by hand is the one step you cannot skip.

{% admonition type="info" name="About these numbers" %}
They come from one capture of one small API, scored by a script we wrote for this article, so treat them as an illustration rather than a benchmark.
The handwritten description isn't perfect ground truth either: the traffic hit a `409` on `DELETE /menu/{menuItemId}` and a live `/health` endpoint that the handwritten description doesn't document - real API behavior that counts against the generated description as "not in the spec".
{% /admonition %}

{% admonition type="warning" name="Experimental" %}
The `generate-spec` command is experimental.
Flags, output, and behavior may change - including breaking changes - in upcoming releases while we shape it with your feedback.
{% /admonition %}

## Get started

The `generate-spec` command is available now in the latest [Redocly CLI](https://redocly.com/docs/cli) - see the [command reference](https://redocly.com/docs/cli/commands/generate-spec) for all options.
Run it on your traffic, review what comes out, lint it with your own ruleset, and tell us what you think on the [Redocly CLI GitHub repository](https://github.com/Redocly/redocly-cli/issues).
The description you get back is the contract everything else builds on: API docs, generated SDKs, and the AI agents that need it to call your API at all.

And once you have a description, don't let it go stale.
Point the [`drift` command](./catch-api-drift.md) at next week's traffic and it tells you as soon as the API changes.
Generate, then guard.
