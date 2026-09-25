---
seo:
 title: Use AI to convert Swagger to OpenAPI and docs-as-code
 description: How to prompt AI to migrate a Swagger 2.0 file to OpenAPI 3.x, what to check by hand, and how Redocly CLI and a docs-as-code workflow keep the result trustworthy.
---

# Use AI to convert Swagger to OpenAPI and docs-as-code

Most API teams have at least one Swagger 2.0 file still running in production, usually because nobody wanted to schedule the rewrite. The file works, so it sits there while every newer service ships with OpenAPI 3.x, and the distance between the two versions grows every quarter.

An AI assistant can draft that rewrite in minutes once you give it the old file and a clear set of rules. This article covers what changes between the two versions, how to prompt AI to do the conversion without inventing fields, and how to check the result inside a docs-as-code workflow before anyone merges it.

## Why teams still have Swagger 2.0 files lying around

Rewriting a spec by hand competes with every other item on a roadmap, so it loses. Swagger 2.0 still validates, still renders, and still feeds whatever tooling was built around it years ago, which means the migration only happens when something forces it: a new tool that expects OpenAPI 3.x, a client library that dropped Swagger support, or an audit that flags the mismatch.

That delay compounds. The [OpenAPI Specification](https://redocly.com/learn/openapi/openapi-visual-reference) is the direct descendant of Swagger, since SmartBear donated the Swagger specification to the Linux Foundation in 2015 and it was renamed from there. Every OpenAPI 3.x feature released since then, from better schema reuse to webhook support, stays out of reach until the underlying file gets rewritten.

## What changes between Swagger 2.0 and OpenAPI 3.x

The rewrite is mechanical in places and genuinely new in others, so it helps to separate the two before you prompt anything. The root object property renames from `swagger` to `openapi`, and the value has to be a quoted string like `3.0.3` rather than a bare number. Request bodies move out of the parameters list and into their own `requestBody` object, and the old `definitions` section becomes `components/schemas`.

Beyond renaming, OpenAPI 3.x added attributes that Swagger 2.0 users used to fake with vendor extensions or contract by convention. A property can now carry `writeOnly: true` for values like passwords that only travel one direction, and `nullable: true` replaces the ad-hoc conventions teams used to mark a field as optionally empty, according to [Redocly's account of migrating three specs from Swagger 2 to OpenAPI 3](https://redocly.com/blog/openapi-3). An AI assistant that knows this list in advance produces a more complete first draft than one asked to "just convert this."

## How to prompt AI to do the conversion

Treat the prompt like a spec review, not a translation request. Paste the full Swagger 2.0 file, then state the target version, the fields you expect to see, and what the model should do when it is unsure rather than letting it guess.

### A context block that limits guessing

```markdown {% process=false %}
You are converting a Swagger 2.0 file to OpenAPI 3.0.

Rules:
- Rename the root `swagger` key to `openapi` and set it to a quoted version string.
- Move body parameters into `requestBody` with the correct content type.
- Move `definitions` into `components/schemas` and update every `$ref`.
- Add `nullable` or `writeOnly` only where the original description or example already implies it; otherwise leave the field unchanged.
- List every field you were unsure about at the end, instead of just guessing.

[Paste the Swagger 2.0 file here]
```

That last rule matters most. A model under pressure to produce a finished-looking file will fill in missing pieces with plausible defaults, and plausible is not the same as correct when the field controls billing or authentication.

## What to verify before you trust the output

AI is good at the mechanical parts of this rewrite: renaming keys, restructuring request bodies, and updating `$ref` paths so nothing breaks. It is not reliable at knowing which fields your team really treats as nullable, optional, or write-only, because that context usually lives in a database schema or a conversation, not in the old file.

That is exactly the split a deterministic tool is built to close. [Redocly CLI](https://redocly.com/docs/cli) already treats Swagger 2.0 as a supported input, which is why its own [guide for teams moving off swagger-cli](https://redocly.com/docs/cli/guides/migrate-from-swagger-cli) walks through linting and bundling either version with the same commands. Running `redocly lint` against the converted file catches malformed references, missing required fields, and type mismatches before a human even opens the diff. From there, you can [configure a lint ruleset](https://redocly.com/docs/cli/guides/configure-rules) once and reuse it on every future conversion, so the same checks apply whether the file came from AI or from a person.

## Put the conversion inside a docs-as-code workflow

A converted spec is still a draft until it goes through the same review path as any other change to your API. [Docs-as-code](https://redocly.com/blog/docs-as-code) treats documentation the way you treat application code, so the converted file goes into a branch, a pull request, and a diff that a reviewer can read line by line, rather than landing straight on the main branch.

That structure pays off twice here. First, Git history means you can see exactly which lines the AI changed and which ones a human touched afterward, so nobody has to guess how a disputed field ended up the way it did. Second, a platform like [Reunite](https://redocly.com/reunite) gives that pull request a home, with a Git-based editor and review flow so the spec conversion moves through the same commit, diff, and merge steps your team already trusts for code. A lint pass that only ever runs on someone's laptop is a lint pass that eventually gets skipped, which is the whole argument for running it inside the pull request instead.

## Best practices

1. Paste the full Swagger 2.0 file into the prompt, not a summary, so the model can trace every `$ref` it needs to move.
2. Tell the model to flag uncertain fields instead of guessing, and review that flagged list before anything else.
3. Lint the converted file with the same ruleset you already use for OpenAPI 3.x, so a Swagger-era file gets no special treatment.
4. Open the conversion as a pull request, even if you are the only reviewer, so the diff exists if a question comes up later.

## How Redocly can help

Once AI has drafted the Swagger-to-OpenAPI conversion, [Redocly CLI](https://redocly.com/docs/cli) gives you a deterministic way to check it: the same linting and bundling commands that already treat Swagger 2.0 as a supported input will flag malformed references and missing fields in the converted file before anyone merges it. From there, [Reunite](https://redocly.com/reunite) gives that review a docs-as-code home, so the conversion moves through a Git-based pull request and diff instead of landing on the main branch unreviewed.
