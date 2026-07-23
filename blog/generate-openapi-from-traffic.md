---
template: ../@theme/templates/BlogPost
title: No OpenAPI description yet? Generate one from real traffic
description: The new generate-spec command infers an OpenAPI description from recorded HTTP traffic - deterministically first, with optional AI refinement.
seo:
  title: No OpenAPI description yet? Generate one from real traffic
  description: The new generate-spec command infers an OpenAPI description from recorded HTTP traffic - deterministically first, with optional AI refinement.
author: adam-sobaniec
publishedDate: "2026-07-15"
categories:
  - redocly:redocly-cli
  - redocly:product-updates
  - api-specifications:openapi
---

Plenty of production APIs have no OpenAPI description at all.
The endpoints live in code, the knowledge lives in people's heads, and the closest thing to documentation is a wiki page nobody fully trusts.

For years that was survivable - human developers can read source code, ask a colleague, poke around with curl.
Your newest consumers can't.
AI agents don't attend onboarding calls or absorb tribal knowledge; they learn what your API can do from a machine-readable description of it.
An OpenAPI description is the foundation that everything an agent touches is built on: reference docs, SDKs, MCP tools, request validation.
Without one, your API's capabilities are simply invisible to them.

So if your API doesn't have an OpenAPI description yet, this is a good moment to start.
The obstacle was never conviction - it's the blank page.
Writing a description by hand for an API with dozens of existing endpoints is exactly the kind of backfill work that never makes it into a sprint.

The new `generate-spec` command in Redocly CLI removes the blank page.
Your API already produces the raw material every time someone uses it: traffic.
`generate-spec` reads recorded HTTP traffic and infers an OpenAPI 3.1 description from it.

## From traffic to description

The command accepts HAR files, Kong logs, Nginx/Apache JSON logs, and NDJSON - a file or a whole folder of them.
Traffic parsing is shared with the [`drift` command](./catch-api-drift.md), so any log that works with `drift` works here too.

From the recorded exchanges it builds a baseline deterministically - no AI involved, same traffic in, same description out:

- Identifier-like path segments (numeric IDs, UUIDs, prefixed tokens like `prd_…`) become named path parameters, so a hundred URLs collapse into one templated path.
- Request and response schemas are merged across all observations; a property becomes optional as soon as one sample omits it.
- Alternative body shapes for the same operation are preserved as `oneOf` variants, and object shapes that repeat across the document are extracted into `components/schemas`.
- String values are analyzed conservatively: consistent well-known patterns get a `format` (`uuid`, `date-time`, `email`, `uri`), and strings that only ever take a small set of repeated values become an `enum`.

## Try it on the Cafe API

Like last time, you don't need your own API to see it work - Redocly Cafe, our public demo API, will do.
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

```
Captured 6 exchange(s) to ./cafe.har
```

Now ask for a description:

```bash
redocly generate-spec ./cafe.har --title "Cafe API" -o cafe-openapi.yaml
```

```
Inferred a baseline OpenAPI description from traffic: 2 operation(s).
Written to: cafe-openapi.yaml
Done in 0s.
```

The result is a valid OpenAPI 3.1 description - about a hundred lines of it, from six requests.
The frame: a server URL inferred from the capture, and one path per discovered endpoint:

```yaml
openapi: 3.1.0
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

`category` became an enum because all eighteen observed values were one of the two, and `createdAt` and `photoUrl` matched well-known patterns in every sample.
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
Each runs the corresponding locally installed CLI in non-interactive mode, so the provider you already use and pay for is the one doing the work; pick a model with `--ai-model` or let the provider use its default.

The AI's answer is never trusted blindly.
A refined operation is only accepted when it keeps the operation's path and method, keeps every response status code observed in the traffic, and passes validation with the `spec` ruleset.
A rejected refinement keeps its deterministic baseline, and if refinement fails entirely, the command falls back to the baseline description - you never end up with less than the deterministic run would have given you.

{% admonition type="warning" name="Traffic leaves your machine" %}
`--with-ai` sends samples of the recorded traffic - URLs, query strings, request and response bodies - to the selected AI provider.
Capture in a sandboxed environment with synthetic data, and make sure the traffic contains no secrets or personal data you are not allowed to share.
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
