---
seo:
 title: Use AI to convert Swagger to OpenAPI and docs-as-code
 description: How to use AI to draft a Swagger 2.0 to OpenAPI 3.x conversion, then validate and review the result through a docs-as-code workflow.
---

# Use AI to convert Swagger to OpenAPI and docs-as-code

Somewhere in most API teams' repositories sits a Swagger 2.0 file nobody wants to touch. The endpoints still work, the file still lints against the old schema, and rewriting it by hand for OpenAPI 3.x feels like a week of tedious edits with no visible payoff.

That tedium is exactly what AI is good at: reading an old structure and drafting the new one, field by field. The risk is trusting the draft too much, because a conversion that looks right can still be wrong in a way nobody notices until a consumer's integration breaks.

This article shows how to draft the conversion with AI, confirm it with Redocly CLI, and move the result through a docs-as-code workflow instead of treating it as a one-off edit.

## Why teams still carry Swagger 2.0 specs

Most Swagger 2.0 files earn their place through sheer inertia. The endpoints still return the right data, the file still passes a Swagger 2.0 validator, and nobody wants to spend a sprint rewriting syntax for an API that already works. That math changes once the tooling around the API starts assuming OpenAPI 3.x by default: a mock server that expects a `requestBody` object, a style guide built for `components/schemas`, or a partner who asks for an OpenAPI 3.1 file and gets a shrug instead.

The obstacle is rarely size. A file with a hundred operations described in Swagger 2.0 takes about the same effort to convert as a file with ten, once a team knows the pattern, but converting by hand raises the odds of breaking something a consumer depends on without anyone noticing until later. That risk is why AI helps here: it can apply the same rename-and-move pattern consistently across many operations without losing attention around operation eighty.

## What changes when you move from Swagger 2.0 to OpenAPI 3.x

The differences between the two formats follow a short, predictable list, and knowing it up front makes an AI-drafted conversion easier to check. [Swagger 2.0's `host`, `basePath`, and `schemes` fields collapse into a single OpenAPI 3.x `servers` array](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md), which is more compact and lets you list a staging and a production URL in the same file. The root `definitions` object becomes `components/schemas`, so every `$ref` in the file has to point at the new path instead of the old one, and security definitions move the same way, from a root-level object into `components/securitySchemes`.

Request bodies work differently too. Swagger 2.0 described a JSON payload as a parameter with `in: body`, limited to one per operation, while [OpenAPI 3.x replaces that with a dedicated `requestBody` object](https://swagger.io/docs/specification/v3_0/describing-request-body/describing-request-body/) that maps each content type, JSON, form data, multipart, to its own schema. That is closer to how the API behaves in practice, since a single endpoint often accepts more than one content type. None of this changes what the API does; it changes how precisely the file says so.

## Use AI to draft the conversion, then check its assumptions

Feeding an AI assistant the whole Swagger 2.0 file and asking for an OpenAPI 3.x version gets you most of the mechanical rewrite in one pass: the field renames, the restructured `servers` block, the moved schemas. Treat that output as a draft, not a finished file, because a model that sounds confident about a rename can be just as confident about a rename it got wrong.

> Before: a Swagger 2.0 operation with `consumes: [application/json]` at the top of the file and a body parameter referencing `#/definitions/Order`.

> After: an OpenAPI 3.x operation with a `requestBody` whose `content.application/json.schema` points to `#/components/schemas/Order`, and no top-level `consumes` field at all.

That transformation is usually correct, but ask AI to flag anywhere it had to guess, such as which content type a body parameter without an explicit `consumes` value was meant to use. That is exactly the kind of unstated assumption that reads fine and ships wrong.

## Validate the converted file with Redocly CLI before anyone builds on it

A draft, however good, is not the same as a valid OpenAPI file, so run it through something deterministic before anyone downstream relies on it. [Redocly CLI](https://redocly.com/redocly-cli) supports OpenAPI 3.2, 3.1, and 3.0 alongside legacy Swagger 2.0, so you can lint the original file for a baseline and then lint the converted file against the same or a stricter ruleset to confirm nothing about the API's behavior changed along the way. The [lint command](https://redocly.com/docs/cli/commands/lint) reports missing fields, broken `$ref` paths, and other mistakes an AI conversion is prone to leave behind, such as a schema renamed in one place and not another.

Once the file passes lint, the [bundle command](https://redocly.com/docs/cli/commands/bundle) combines any multi-file structure into one output, which is useful if the conversion also reorganized how the description is split across files. If the team's linting or bundling still runs on the deprecated `swagger-cli` package, this is also the moment to move that tooling forward; Redocly publishes a [migration guide for existing swagger-cli users](https://redocly.com/docs/cli/guides/migrate-from-swagger-cli) that maps the old commands to their Redocly CLI equivalents.

## Put the migration through a docs-as-code workflow

A converted spec file is not finished once it passes lint; it still needs a reviewer who can see what changed and why, which is what a "docs-as-code" workflow is for. Treating the OpenAPI file [the way you treat code](https://redocly.com/blog/docs-as-code), Markdown and YAML in git, with changes reviewed as a diff, means the conversion goes through a pull request instead of landing as an overwrite nobody reviewed. [A clear branching strategy](https://redocly.com/blog/git-branching-for-docs) keeps a migration this size contained to its own branch while the rest of the docs keep shipping normally.

That pull request is also where a person catches what AI and the linter cannot: whether a renamed field still means the same thing to the team that consumes it. [Reunite](https://redocly.com/reunite) gives reviewers a visual, git-based way to [review that pull request](https://redocly.com/docs/realm/reunite/project/pull-request/review-pull-request) side by side with the rendered docs, so a reviewer sees the practical effect of the conversion instead of a wall of YAML diff.

## What AI and automated tools still leave to you

AI is fast at rewriting structure, and Redocly CLI is reliable at confirming the result is well-formed, but neither one knows whether a semantic detail still matches what the API does in practice. A `nullable` field, an example value copied from an old ticket, or a description written for a field that no longer exists after the conversion: nothing mechanical catches those, because they are not syntax errors.

That is the same limit AI runs into everywhere else in a docs workflow: [it accelerates the draft and the review, while deterministic checks and a person confirm what matters most](https://redocly.com/learn/ai-for-docs/ai-modern-api-docs). The pattern here, AI drafts the rewrite, a linter narrows down what to check, a person makes the final call, follows [the same logic Redocly applies to its own review pass](https://redocly.com/learn/ai-for-docs/ai-reviews). None of that changes the underlying work of migrating a spec; it just means the last mile of judgment stays with someone who understands what the API is for.

## How Redocly can help

Converting Swagger 2.0 to OpenAPI 3.x is exactly the kind of task where handing AI a spec and getting back an improved version pays off, provided something deterministic checks the result before anyone trusts it. [Redocly CLI](https://redocly.com/redocly-cli) is built to support that whole range, from linting the legacy Swagger 2.0 file for a baseline, to validating the OpenAPI 3.x draft AI produced, to bundling the result into a single description your docs-as-code pipeline can publish. Run it locally while you convert, then [run the same lint in CI](https://redocly.com/blog/getting-started-api-governance) on every pull request, so a mis-mapped `$ref` or a dropped security scheme gets caught before it reaches a reader.
