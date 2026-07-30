---
seo:
 title: Use AI to write custom OpenAPI lint rules
 description: How to prompt a model to draft Redocly CLI configurable rules and custom rule plugins from a plain description of a standard, then test the result before you trust it.
---

# Use AI to write custom OpenAPI lint rules

A team agrees that every error response needs a machine-readable code, or that internal endpoints should never reach the public spec, and then the standard sits in a ticket because nobody writes the lint rule. It stays unenforced until an incident forces the issue.

A model can turn that standard into a working rule faster than most people expect. Describe the standard in plain language, and AI can draft a "[configurable rule](https://redocly.com/docs/cli/rules/configurable-rules)" or a "[custom rule plugin](https://redocly.com/docs/cli/custom-plugins/custom-rules)" for Redocly CLI in the form your OpenAPI files already use. This article covers how to prompt for each type, when to reach for which one, and how to test a generated rule before it can block a merge.

## Two ways to extend Redocly CLI linting

Redocly CLI ships two ways to add a rule beyond the built-in and [recommended rulesets](https://redocly.com/docs/cli/rules/recommended). A configurable rule is pure YAML: name a subject, such as an operation or a schema property, then attach assertions like casing, pattern, or required, and the linter checks every matching node. No code, just a block under `rules` in your Redocly configuration.

A custom rule plugin is a small JavaScript function that returns a "visitor object," walking the document and calling `context.report()` wherever it finds a problem. Reach for this approach when the check needs logic an assertion cannot express, such as comparing two fields or counting occurrences. Most standards fit the first approach, so save the second for standards that genuinely need it.

## Start from a plain description of the standard

Write the standard the way you would explain it to a new hire, before you think about YAML. Name the node it applies to, what must be true, and why. A vague version ("responses should be documented well") gives a model too little to anchor on, while a specific version gives it a target:

```markdown {% process=false %}
Standard: Every error response (4xx or 5xx) must include a "code" field
in its schema so client code can branch on it without parsing message text.
```

If you already keep standards in a checklist, pull one line at a time rather than pasting the whole document. One rule per prompt keeps the output easy to check and keeps your redocly.yaml readable, since each entry maps back to a single line.

## Prompt AI to draft a configurable rule

Give the model the standard, one violating OpenAPI excerpt, and the fields a configurable rule expects: subject, assertions, optional `where`, message, and severity. Ask it to explain which assertion keys it chose, so you can check the mapping instead of trusting it blind.

```markdown {% process=false %}
Draft a Redocly CLI configurable rule from this standard:
[paste the one-line standard]

Example excerpt that violates it:
[paste yaml]

Return a rule name prefixed with rule/, the subject (node type and
property), the assertions needed (use only keys from Redocly's
configurable rules: casing, contains, defined, disallowed, enum,
minLength, maxLength, mutuallyRequired, pattern, ref, required),
a where clause if only some nodes should be checked, a short message,
and a severity of error or warn. If the standard cannot be expressed
with these assertions, say so instead of forcing an approximate rule.
```

That last instruction matters. A model under pressure to produce YAML will sometimes force a rough approximation rather than admit an assertion cannot express the standard, and flagging that case saves you from shipping a rule that only partly checks what you meant.

## Before and after: a standard becomes a rule

Standard: every error response schema needs a machine-readable `code` field.

A model working from that line and a violating excerpt might propose this:

```yaml {% process=false %}
rule/error-response-has-code:
  subject:
    type: Schema
    property: required
  where:
    - subject:
        type: Response
        matchParentKeys: /^[45]/
      assertions:
        defined: true
  message: Error response schemas must list "code" as a required field so clients can branch on it
  severity: error
  assertions:
    contains:
      - code
```

Running [lint](https://redocly.com/docs/cli/commands/lint) against a spec now surfaces the same line every time a 4xx or 5xx response is missing the field, instead of waiting for a reviewer to notice it in a diff. Treat the draft like any generated code: read the `where` clause carefully, since it decides which responses actually get checked.

## When the standard needs a custom rule plugin

Some standards do not reduce to a single subject and assertion. "Every endpoint tagged `internal` must not declare public servers" compares two parts of the same operation at once, which a configurable rule cannot do, so ask for a plugin instead.

```markdown {% process=false %}
Draft a Redocly CLI custom rule plugin for this standard, including why
it needs cross-field logic: [paste the standard]. Return a function that
returns a visitor object for the relevant OpenAPI node type, using
ctx.report() with a clear message and ctx.location for the location.
Keep the function to one concern and explain which node type it visits.
```

A generated plugin might look like this for the internal-endpoint example:

```javascript {% process=false %}
export default function NoInternalInPublicServers() {
  return {
    Operation: {
      enter(operation, ctx) {
        const tags = operation.tags || [];
        if (tags.includes('internal') && operation.servers?.length) {
          ctx.report({
            message: 'Internal operations should not declare public servers',
            location: ctx.location.child('servers'),
          });
        }
      },
    },
  };
}
```

Read a generated plugin like a pull request from someone new to the codebase: check the node type it visits, whether the condition matches your tagging convention, and whether the message tells the next person how to fix the problem.

## Test the rule before you trust it

Every generated rule needs a run against real files before it enters a shared configuration. Add the draft to a local `redocly.yaml`, then run [lint](https://redocly.com/docs/cli/commands/lint) against specs you already know the answer for: one that should pass and one that should fail.

Watch for two failure modes. A configurable rule's `where` clause can be narrower or wider than intended, so it silently skips nodes you meant to check. A custom rule plugin can throw on document contents the model did not consider, such as a field that is sometimes an object and sometimes an array, so run it against your messiest real spec, not just a simple example.

Start new rules at `warn` if the standard is new to the team, then promote to `error` once a run across your real APIs shows the violation count trending toward zero. That gives authors time to fix existing violations instead of blocking every open pull request at once.

## Best practices

1. Check the [built-in rules](https://redocly.com/docs/cli/rules/built-in-rules) and recommended ruleset first, so the model only drafts what does not already exist.
2. Draft one rule per prompt, from one plain-language standard, and ask the model to flag when the standard needs a plugin instead of an approximate assertion.
3. Run every draft against a known pass file and a known fail file before it enters a shared `redocly.yaml`.
4. Start new rules at `warn`, then promote to `error` once real runs show adoption. The [guide to configuring a ruleset](https://redocly.com/docs/cli/guides/configure-rules) covers per-rule overrides as your standards mature.

## Where AI stops and the linter takes over

A model can propose an assertion or a visitor function, but it cannot know whether a `where` clause matches your real data until you run it, and it cannot judge whether a standard is worth enforcing at all. Keep the plain-language description as the thing humans agree to first, and the generated YAML or JavaScript as what follows from it.

Once a rule is in your configuration, Redocly CLI applies it the same way on every file, every time. A standard that only lives in a ticket protects nothing; a rule that runs in CI protects it by default.

## How Redocly can help

Redocly CLI runs configurable rules and custom rule plugins the same way, whether a person or a model drafted them, so a rule sketched from a plain-language standard still gets validated against your OpenAPI spec every time you lint. [Explore Redocly CLI](https://redocly.com/docs/cli/) to see how built-in, configurable, and custom rules combine into one ruleset for local runs and CI.
