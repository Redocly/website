---
seo:
 title: Use AI to enforce REST API naming conventions
 description: How to turn a naming checklist into Redocly CLI lint rules with AI, then catch inconsistent operationId, path, and property names before you ship.
---

# Use AI to enforce REST API naming conventions before you ship

A naming standard written down in a wiki rarely stops the next team from shipping `userId` next to `user_id` in the same API. Most "naming drift" is not malicious. It happens because two teams work from the same guide months apart and each one has to decide something the guide never addressed. By the time a reviewer notices, clients already depend on the inconsistent field.

This article shows how to condense a naming standard into a short checklist, use AI to catch drift while a spec is still a draft, and turn the recurring findings into Redocly CLI lint rules that run on every pull request.

## Why naming drifts without enforcement

A style guide answers why a convention exists and when to break it. A lint rule answers whether one file violates a stated rule right now. Naming drift shows up where those two fall out of step: a guide that says "use camelCase for properties" does not stop a rushed pull request from adding `user_name` because nobody reread the guide before shipping.

The drift compounds because naming choices leak into client code. Once an SDK generates a method around `getUserID`, renaming it later breaks every caller. That is why naming review works best before merge, when a wrong choice costs a comment instead of a deprecation cycle.

## Turn your naming rules into a short checklist

Long prose guides are hard for a model, and a reviewer, to apply consistently. [Use AI to accelerate and improve reviews](https://redocly.com/learn/ai-for-docs/ai-reviews) makes this point for documentation review, and the same logic holds for API naming: a one-page checklist beats a fifty-page style manual because every line maps to a single yes-or-no check.

Rewrite prose like "identifiers should be clear, consistent, and follow standard casing" into inspectable lines:

```markdown {% process=false %}
- [ ] operationId uses camelCase
- [ ] Path parameters use camelCase, wrapped in braces: {userId}
- [ ] Query parameters use camelCase
- [ ] Resource names in paths are plural nouns: /users, not /user
- [ ] Boolean properties read as a question: isActive, not active
```

If your organization has never agreed on a standard, the [API guidelines builder](https://redocly.com/api-governance) and the post on how to [build your own API guidelines](https://redocly.com/blog/build-your-own-api-guidelines) both suggest answering only the naming questions that come up in real reviews first, then expanding the checklist as new patterns appear.

## Ask AI to catch naming problems before you write a rule

Once the checklist exists, paste it alongside a draft OpenAPI file and ask a model to flag every line the spec violates. [Use AI to review API design for gaps and inconsistencies](https://redocly.com/learn/ai-for-docs/ai-review-api-design-gaps-inconsistencies) covers this same review pattern for the broader API design; naming is one of the themes that shows up most often, alongside inconsistent URL style between `/resource/{id}` and query-parameter variants for the same concept.

```markdown {% process=false %}
Checklist:
[paste naming checklist]

Review this OpenAPI excerpt against every checklist line and list:
1. Each field, parameter, or operationId that violates a line
2. The line it violates
3. A suggested rename that keeps existing casing where the checklist allows it

[paste OpenAPI excerpt]
```

Run this review before the spec goes to a human reviewer, not instead of one. The model is good at spotting the mismatch between `usrNm` and `transaction_type` in the same schema, but it will not tell you whether `usrNm` should exist at all.

## Turn AI's findings into Redocly CLI lint rules

A naming problem that shows up twice in review is worth encoding once. Redocly CLI's [configurable rules](https://redocly.com/docs/cli/rules/configurable-rules) let you define a subject, an assertion, and a severity, so the same violation gets caught automatically on every future file instead of waiting for the next AI-assisted pass.

Prose rule: operation IDs must use camelCase so generated SDK method names read naturally.

```yaml {% process=false %}
rules:
  rule/operationId-camelCase:
    subject:
      type: Operation
      property: operationId
    assertions:
      casing: camelCase
    message: operationId must use camelCase per the naming checklist
    severity: error
```

Before you write a new rule, check whether Redocly CLI's [built-in rules](https://redocly.com/docs/cli/rules/built-in-rules) or [recommended ruleset](https://redocly.com/docs/cli/rules/recommended) already cover it. Extending an existing rule and adjusting its severity is easier to maintain than a custom rule that duplicates the same casing check.

## Run the naming ruleset before every merge

Put the naming rules in a shared `redocly.yaml`, either at the repo root or in a dedicated standards package other services import. The [guide to configuring a ruleset](https://redocly.com/docs/cli/guides/configure-rules) shows how `extends` layers the recommended ruleset, then your naming rules, then any per-API override for a legacy service that cannot change this quarter.

```yaml {% process=false %}
extends:
  - recommended
  - ./org-naming-standards.yaml

rules:
  rule/operationId-camelCase: error
```

Wire the [lint command](https://redocly.com/docs/cli/commands/lint) into CI so every pull request sees the same naming checks a developer runs locally, which is the core promise behind [API standards and governance](https://redocly.com/docs/cli/api-standards): one ruleset, enforced the same way everywhere it runs. When AI review keeps flagging the same naming pattern but lint reports nothing on it, that repeat finding is the signal to promote the checklist line into a new rule.

## When AI and lint disagree on a name

Disagreement between the AI review and the lint output usually falls into one of three cases. The model calls a name unclear even though it passes every casing rule, which means the concern is subjective and belongs in review, not in a pattern assertion that risks false positives. Lint fails on a legacy API you cannot rename this quarter, so you lower that rule to `warn` for that one API instead of deleting it everywhere. Or the model proposes a pattern that is stricter than your checklist intends, and a person narrows the rule before it ships.

Human judgment stays final for the trade-offs the checklist does not settle. Lint enforces what you already agreed on, and AI helps you notice when the agreement needs to grow.

## How Redocly can help

Naming conventions hold up only when the check runs the same way on every file, whether or not a reviewer happens to open it. [Redocly CLI](https://redocly.com/docs/cli/) turns a naming checklist into rule-based linting with configurable severity, whether you start from a built-in casing rule or write your own, so a name pattern you agree on once keeps getting enforced on every OpenAPI file you ship after that.
