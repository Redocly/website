---
seo:
 title: Use AI to enforce REST API naming conventions before you ship
 description: How to use AI to catch inconsistent operationId, path, and field naming before code ships, then lock the fix in with Redocly CLI configurable rules in CI.
---

# Use AI to enforce REST API naming conventions before you ship

A single service can keep its naming tidy through memory alone. Once a handful of teams ship endpoints against the same OpenAPI surface, that memory runs out: one service calls it `userId`, another calls it `user_id`, and a third mixes `camelCase` paths with `kebab-case` ones. Nobody planned the drift, but nobody stopped it either.

Asking a model to review a spec before code ships catches a good share of these mismatches early, when a rename costs a diff instead of a client migration. This article shows how to prompt AI to flag naming drift in `operationId` values, paths, and fields, then turn the agreed pattern into a [configurable rule](https://redocly.com/docs/cli/rules/configurable-rules) so Redocly CLI catches every future violation without anyone rereading a wiki page.

## Why naming drifts across a growing API surface

Naming conventions rarely fail because a team disagrees with the rule. They fail because the rule lives in a document nobody opens before writing a new endpoint. A new hire copies the closest example they can find, and if that example already broke the pattern, the mistake compounds.

The [API standards and governance](https://redocly.com/docs/cli/api-standards) guide frames this as a consistency problem: should resource names use `kebab-case` or `camelCase` in URLs, and does every operation follow the same rule once you have an answer. Redocly CLI and the hosted platform share one lint configuration, so the same question gets the same answer everywhere you check it.

Naming drift also carries a cost beyond human readers now. When one API calls a field `userId` and another calls it `user_id`, an AI agent consuming both has to spend reasoning effort translating between them, which the [API catalogs for agentic software](https://redocly.com/blog/api-catalogs-agentic-software) post calls out directly. Consistent naming is no longer only a style preference; it is part of what makes an API usable by both people and the tools that read on their behalf.

## Ask AI to review naming before code ships

[Use AI to review API design for gaps and inconsistencies](https://redocly.com/learn/ai-for-docs/ai-review-api-design-gaps-inconsistencies) covers the wider pre-implementation review pattern. Naming is one of the five checks in that prompt skeleton, so you can scope a pass specifically to it once a design is close to final.

Give the model your domain context, a representative OpenAPI excerpt, and a narrow question:

```markdown {% process=false %}
Review this OpenAPI excerpt for naming inconsistencies only.

For each operationId, path, and field name, flag:
1. Casing that does not match the rest of the file (camelCase vs snake_case vs kebab-case)
2. The same concept named two different ways across endpoints
3. Verbs that do not follow a consistent pattern (getX vs fetchX vs retrieveX)

[paste paths, schemas, or notes]
```

The [operationId is API design](https://redocly.com/blog/operationid-is-api-design) post is a good reference to share alongside the excerpt. It recommends a `verb-noun` pattern, for example `getEvents`, and reaching for a more specific verb such as `archiveProduct` once plain create, read, update, and delete no longer describe the action. The model does not need to invent a convention from scratch; it needs your existing pattern and a clear signal about where the current spec breaks it.

## Turn naming rules into Redocly CLI rules

A naming decision that only lives in a review comment gets forgotten by the next pull request. Once a rule is stable, ask the model to draft it as a Redocly [configurable rule](https://redocly.com/docs/cli/rules/configurable-rules), which supports a `casing` assertion for `camelCase`, `kebab-case`, `snake_case`, `PascalCase`, `MACRO_CASE`, `COBOL-CASE`, and `flatcase`.

Written rule: operation IDs must use camelCase so generated SDK method names read naturally.

```yaml {% process=false %}
rules:
  rule/operationId-camelCase:
    subject:
      type: Operation
      property: operationId
    assertions:
      casing: camelCase
    message: operationId must use camelCase, for example getEvents or archiveProduct
    severity: error
```

Some naming rules do not need a custom assertion at all. Redocly's [built-in rules](https://redocly.com/docs/cli/rules/built-in-rules) already cover common cases: [paths-kebab-case](https://redocly.com/docs/cli/rules/oas/paths-kebab-case) requires kebab-case in URL paths instead of camelCase or snake_case, and [operation-operationId-url-safe](https://redocly.com/docs/cli/rules/oas/operation-operationId-url-safe) requires every `operationId` to be URL-safe. Check the built-in list before you ask a model to reinvent a rule that already ships in the [recommended ruleset](https://redocly.com/docs/cli/rules/recommended).

## Run the ruleset in CI so drift cannot merge

A rule that only runs on someone's laptop protects nothing. Point a shared `redocly.yaml` at `recommended` plus your naming rules, then run the [lint command](https://redocly.com/docs/cli/commands/lint) on every pull request that touches an OpenAPI file.

```yaml {% process=false %}
extends:
  - recommended
  - ./org-naming-standards.yaml

rules:
  paths-kebab-case: error
  operation-operationId-url-safe: error
```

The [guide to configuring a ruleset](https://redocly.com/docs/cli/guides/configure-rules) shows how `extends` layers a shared standards file on top of `recommended`, so many services can import the same naming rules from one place instead of copying YAML between repositories. When one legacy API cannot meet the new pattern yet, override its severity in that API's own block rather than weakening the rule everywhere.

Because lint runs the same way locally and in CI, a developer sees the same violation before push that a reviewer would see in the pull request. That repetition, not the initial review, is what actually stops naming drift from shipping.

## When AI and lint disagree on a name

Disagreement between a model's suggestion and your shipped rule usually falls into one of three buckets. Sometimes a model flags a name as unclear even though it passes every casing and pattern check, which makes it a judgment call for a human reviewer rather than a lint failure. Other times a legacy API fails a new rule because renaming it now would break existing clients, so the right move is lowering that one API's severity to warn and tracking the rename separately instead of deleting the rule everywhere. A generated pattern assertion can also be stricter than intended and reject a name your guide actually allows, and when that happens, narrow the rule rather than accept every AI suggestion as final.

[Use AI to enforce your API style guide at scale](https://redocly.com/learn/ai-for-docs/ai-enforce-api-style-guide-at-scale) covers this same trade-off for style guides in general: lint owns what your team has already agreed to encode, and humans keep the final call on anything the guide still settles through judgment rather than a pattern match.

## Best practices

1. Start new naming rules at `severity: warn` for existing services, then promote to `error` once violation counts trend toward zero.
2. Version your naming standards file in Git and reference the same commit when you prompt a model to draft or update a rule.
3. Ask the model to separate deterministic findings (casing, uniqueness, pattern) from subjective ones like clarity, so only the first group becomes a rule.
4. Re-run the naming review whenever the convention changes, the same way you would update a test after a requirement changes.
5. Pair naming checks with the broader review pattern in [Use AI to accelerate and improve reviews](https://redocly.com/learn/ai-for-docs/ai-reviews) so naming does not become the only thing a design review covers.

## How Redocly can help

A wiki page about naming conventions cannot stop the next pull request from breaking the pattern, but a lint rule can. [Explore Redocly CLI](https://redocly.com/docs/cli/) to turn the naming decisions your team has already made into rule-based checks with configurable severity, so a convention written once runs the same way on every OpenAPI file, on every pull request, instead of depending on someone remembering to reread the guide.
