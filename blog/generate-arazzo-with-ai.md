---
template: ../@theme/templates/BlogPost
title: Generate realistic Arazzo workflows with AI
description: The generate-arazzo command now has a --with-ai option that turns a one-workflow-per-operation skeleton into realistic multi-step workflows, using your own local AI assistant.
seo:
  title: Generate realistic Arazzo workflows with AI
  description: The generate-arazzo command now has a --with-ai option that turns a one-workflow-per-operation skeleton into realistic multi-step workflows, using your own local AI assistant.
author: dmytro-ananskyi
publishedDate: "2026-09-03"
categories:
  - redocly:product-updates
  - redocly:redocly-cli
  - api-specifications:arazzo
---

Every Arazzo file starts the same way: someone opens an OpenAPI description and asks, "so what does a real session with this API look like?"

Redocly CLI has answered part of that question for a while.
The [`generate-arazzo`](../docs/cli/commands/generate-arazzo) command reads an OpenAPI description and produces an Arazzo file you can lint, extend, and execute with [Respect](../pages/respect-cli/respect-cli.page.tsx).
The new `--with-ai` option changes what that file contains: instead of a mechanical skeleton, you get workflows that read like how the API is actually used.
What's more, it runs on the AI assistant you already have, with no API keys to configure.

## What you get without AI

Plain `generate-arazzo` is deterministic and instant.
Running it against the [Redocly Cafe API](https://cafe.redocly.com/openapi/cafe) — our OAuth2-protected sample — creates one workflow per operation.
Each operation has a single step and a success criterion taken from the first documented response:

```yaml
workflows:
  - workflowId: post-menu-workflow
    inputs:
      $ref: '#/components/inputs/OAuth2'
    steps:
      - stepId: post-menu-step
        operationId: $sourceDescriptions.cafe.createMenuItem
        x-security:
          - schemeName: OAuth2
            values:
              accessToken: $inputs.OAuth2
        successCriteria:
          - condition: $statusCode == 201
  - workflowId: get-menu-workflow
    steps:
      - stepId: get-menu-step
        operationId: $sourceDescriptions.cafe.listMenuItems
        successCriteria:
          - condition: $statusCode == 200
  # ...and one more workflow like these for every other operation
```

This is a useful scaffold, and it stays available as the default.
However, it has a known gap: the operations don't know about each other.
Nothing passes the created menu item's ID to the steps that read or delete it.
Turning the file into a runnable test still means resolving every dependency by hand.

## What changes with `--with-ai`

Add one flag:

```bash
npx @redocly/cli@latest generate-arazzo openapi.yaml --with-ai
```

The same operations now come back as a scenario: the menu item's lifecycle, starting with the API's own OAuth2 client registration.
A shortened excerpt from a real run:

```yaml
workflows:
  - workflowId: manage-menu-items
    summary: Create, view, and remove menu items
    inputs:
      $ref: '#/components/inputs/OAuth2'
    steps:
      - stepId: register-oauth2-client
        operationId: $sourceDescriptions.cafe.registerOAuth2Client
        requestBody:
          contentType: application/json
          payload:
            name: pos-terminal
            redirectUris:
              - https://api.cafe.redocly.com/callback
            scopes:
              - menu:read
              - menu:write
              - orders:read
              - orders:write
              - revenue:read
            grantTypes:
              - authorization_code
              - client_credentials
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          client-id: $response.body#/clientId
          client-secret: $response.body#/clientSecret
      - stepId: create-menu-item
        operationId: $sourceDescriptions.cafe.createMenuItem
        x-security:
          - schemeName: OAuth2
            values:
              accessToken: $inputs.OAuth2
        requestBody:
          contentType: multipart/form-data
          payload:
            name: Cappuccino
            price: 4500
            category: beverage
            volume: 250
            containsCaffeine: true
            photoTextDescription: A hot cappuccino in a white ceramic cup.
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          menu-item-id: $response.body#/id
      # ...two read steps (menu item photo, menu list) omitted
      - stepId: delete-menu-item
        operationId: $sourceDescriptions.cafe.deleteMenuItem
        x-security:
          - schemeName: OAuth2
            values:
              accessToken: $inputs.OAuth2
        parameters:
          - name: menuItemId
            in: path
            value: $steps.create-menu-item.outputs.menu-item-id
        successCriteria:
          - condition: $statusCode == 204
```

The differences are exactly the parts you used to write by hand:

- Related operations are grouped into a lifecycle instead of isolated single-step workflows.
- Steps pass data to each other.
  The created menu item's ID becomes an output and feeds the delete step's path parameter.
- The authentication flow is part of the scenario: the workflow registers an OAuth2 client first,
  requesting every grant type the scheme declares, and keeps the `x-security` setup on every protected step.
- Payloads satisfy the schemas instead of being empty stubs: the beverage includes its required `volume` and `containsCaffeine` fields,
  and the client registration supplies the `redirectUris` that the `authorization_code` grant requires.

## Your AI, your machine, no API keys

`--with-ai` runs a locally installed AI assistant in non-interactive mode: Claude Code (`claude`), Codex CLI (`codex`), or Cursor CLI (`cursor`).
If you already use one of them, there is nothing to configure.
No API key is passed to or stored by Redocly CLI, and nothing is sent to Redocly.

Keep one thing in mind: the option sends your resolved OpenAPI description to the selected AI provider.
Make sure it contains no secrets you are not allowed to share.

The answer is never trusted blindly.
Every generated step must reference an operation that really exists in your description.
The result must pass validation with the built-in ruleset, and if anything is rejected — or the provider is unavailable — the command keeps the deterministic skeleton.
You always get a valid file.
The generated file starts with a comment marking the workflows as AI-inferred, and the result varies between runs: review it before use.

## Tune it with the companion options

- `--ai-provider` — `claude` (default), `codex`, or `cursor`.
- `--ai-model` — pass a specific model to the provider; otherwise its default applies.
- `--max-workflows` — a ceiling, not a target (default `10`): small APIs collapse into a few scenarios, large APIs get the most likely ones.
- `--ai-concurrency` — how many workflows are designed in parallel on large descriptions (default: `4`).

Large APIs are handled automatically.
When a description is too big to fit a single prompt, the command switches to a two-phase mode.
The AI first picks scenarios from a compact index of every operation, then designs each workflow from only its own operations.
GitHub's REST API description — 12.9&nbsp;MB, more than 1,200 operations — produces three lifecycle workflows in about half a minute this way.

## Try it

Generate a workflow file from the hosted Redocly Cafe description:

```bash
npx @redocly/cli@latest generate-arazzo 'https://cafe.redocly.com/_bundle/openapi/cafe.yaml' --with-ai --max-workflows 3
```

Then compare it with the plain run:

```bash
npx @redocly/cli@latest generate-arazzo 'https://cafe.redocly.com/_bundle/openapi/cafe.yaml' -o baseline.arazzo.yaml
```

After writing the file, the command prints the ready-to-run `respect` command for it — including an `--input` placeholder for every workflow input it declared.
The path from OpenAPI description to executed workflow is: generate, replace the placeholder values, run.

To learn more, see the [`generate-arazzo` documentation](../docs/cli/commands/generate-arazzo) or read about [what Arazzo is](../learn/arazzo/what-is-arazzo.md).

Have you tried generating workflows with AI, and did the scenarios match how your API is really used? [Let us know](https://github.com/Redocly/redocly-cli/issues) — the option is new, and real-world feedback shapes where it goes next.
