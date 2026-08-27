---
seo:
 title: Use AI to generate API test data and edge cases
 description: How to prompt AI for realistic payloads and boundary-condition edge cases from your OpenAPI description, then turn the results into Arazzo workflows Respect checks against a live API.
---

# Use AI to generate API test data and edge cases

Writing test data by hand is slow, and most people default to the same handful of "happy path" values: a valid email, a normal string, a positive number. Real traffic is messier. Fields arrive empty, numbers overflow, and enums receive values nobody documented, so tests that only cover the obvious case miss exactly the inputs that break production.

A large language model reads your OpenAPI description and drafts a wide set of payloads fast, including the boundary conditions a schema implies but does not spell out. It cannot confirm your API handles them. This article covers how to prompt for realistic test data and edge cases, then turn the results into runnable [Arazzo](https://redocly.com/learn/arazzo/what-is-arazzo) workflows that [Respect](https://redocly.com/docs/respect) checks against a real endpoint.

## Why hand-written test data misses edge cases

Most manual test suites grow one ticket at a time: someone hits a bug, writes a test for it, and moves on. That pattern covers known failures well and new ones poorly, because nobody sits down to enumerate every boundary a schema allows.

[API Contract Testing 101](https://redocly.com/learn/testing/contract-testing-101) names "data variability and edge cases" as a specific testing challenge: designing suites that cover a wide range of inputs without the test count exploding. The recommended fix is not exhaustive manual coverage. It pairs deterministic contract validation with data-generation tools, so teams can define targeted edge-case tests instead of hand-writing hundreds of near-duplicate payloads.

An OpenAPI description already states the boundaries a model can mine: `maxLength` on a string, `minimum` and `maximum` on a number, an `enum` list, and which fields are `required`. A `string` field with `maxLength: 50` implies a test at 50 characters and one at 51. A `required` array with one missing entry implies a validation-error test your suite may not have. AI is well suited to reading that list and drafting many candidate cases quickly, since it treats schema constraints as a checklist rather than something to notice by accident.

## Prompt AI for realistic payloads and boundary conditions

Give the model the OpenAPI operation, not a description of it. Paste the full `requestBody` schema and any existing `examples`, and state which category of edge case you want first: boundary values, missing or extra fields, wrong types, or invalid enum members. A narrow request produces a usable table; a vague one produces generic filler.

```markdown {% process=false %}
You are generating test data for an API operation from its OpenAPI schema.

Schema:
[paste requestBody schema for one operation]

Existing examples:
[paste any documented examples]

Generate:
1. Three valid payloads that differ meaningfully (not just renamed values).
2. Five edge-case payloads: one per boundary (min length, max length,
   min/max numeric value, empty optional array, missing required field).
3. Two payloads with a wrong type for a field that has a strict type.
4. For each payload, state the expected HTTP status and one sentence on why.

Do not invent fields the schema does not define.
```

Requiring an expected status forces the model to reason about validation instead of only producing shapes. Reviewing a table of ten labeled payloads is also faster than reading raw JSON, since a reviewer can spot a wrong "expected status" without re-deriving the schema.

[Use AI to review API design for gaps and inconsistencies](https://redocly.com/learn/ai-for-docs/ai-review-api-design-gaps-inconsistencies) covers the same technique earlier, naming "forgotten edge cases" before anyone writes a handler. Generating test data applies that skill after the schema exists, to prove the implementation matches it.

## Turn AI suggestions into Arazzo workflows Respect can run

A table of payloads in chat does not test anything. To make AI's output count, it needs to run against a live server, and that is what [Arazzo](https://redocly.com/learn/arazzo/what-is-arazzo) and Respect are for.

Start from a real file instead of a blank workflow. Redocly CLI's [`generate-arazzo`](https://redocly.com/docs/cli/commands/generate-arazzo) command reads an OpenAPI description and scaffolds one workflow step per operation:

```sh
npx @redocly/cli generate-arazzo openapi.yaml
```

The output, `auto-generated.arazzo.yaml` by default, links each step to an operation and checks only the first documented status code, so it needs extending. [Generate and run API tests with Respect](https://redocly.com/docs/respect/guides/run-generated-tests) shows how: add authentication headers, then edit a step to send an edge-case payload AI drafted, and add a `successCriteria` line for the status the model predicted.

Run the workflow with Respect once it names real edge cases:

```sh
npx @redocly/cli respect auto-generated.arazzo.yaml --verbose
```

Respect sends each request to the live API and checks the response against the linked OpenAPI description, so a payload AI expected to fail validation either fails, or the run reports a contract mismatch you can act on. [Respect use cases](https://redocly.com/docs/respect/use-cases) cover running the same workflow locally, in pull-request CI, and on a schedule, so an edge case worth testing once stays tested on every later change.

## Serve generated data through the mock server before you touch a live API

Not every edge case needs a live server on day one. The mock server built into Redocly's API reference [serves responses from an OpenAPI description's `examples`](https://redocly.com/docs/realm/content/api-docs/configure-mock-server) with no backend running, which is a low-risk place to sanity-check a payload AI generated before you point it at staging.

The `strictExamples` setting controls how literal that check is. With it on, the mock server returns documented examples exactly as written, so you can confirm a payload maps to the response you expect. With it off, the server echoes request values back, closer to how a real API might treat fields it does not validate strictly. Checking an AI-drafted payload against both modes shows whether your documented examples cover the edge case, or whether the schema allows an input no example demonstrates.

## What AI cannot verify alone

A model reasons about your schema, not your server. It can flag that a string field has no `maxLength` and suggest testing an extremely long value, but it cannot know whether your database column truncates that string, rejects it, or throws an unhandled error, because it never sends the request.

The same limit applies to expected statuses. AI predicts a `422` for a missing required field by convention, but only Respect running against your API confirms your service returns that code instead of a generic `500`. Treat every AI-suggested edge case as a hypothesis, and a green Respect run as the only evidence it held.

## Best practices

1. Paste the schema itself, not a paraphrase, so AI edge cases map to real constraints instead of assumptions about them.
2. Ask for an expected status with every generated payload, so review time goes to checking reasoning instead of re-deriving it.
3. Scaffold with `generate-arazzo` first, then add AI-suggested edge cases as new steps rather than rewriting the generated file from scratch.
4. Run edge-case workflows in PR CI once, then schedule the same file so a fix that regresses later gets caught the same way.

## Summary

AI drafts test data fast because it can enumerate every boundary a schema implies faster than a person reviewing the same file line by line. That speed only pays off once the payloads run against a live endpoint, which is why the workflow pairs AI-suggested edge cases with Arazzo files Respect executes rather than trusting generated JSON on sight.

## How Redocly can help

Turning AI-suggested edge cases into evidence takes a runner that executes real requests against a real API, which is exactly what [Respect](https://redocly.com/docs/respect) does. Scaffold a starter workflow from your OpenAPI description with Redocly CLI's [`generate-arazzo`](https://redocly.com/docs/cli/commands/generate-arazzo) command, add the boundary-condition and invalid-input steps AI helped you name, and let Respect run that workflow locally, in CI, or on a schedule so every edge case you generate keeps getting checked against your live API, not just against a model's prediction.
