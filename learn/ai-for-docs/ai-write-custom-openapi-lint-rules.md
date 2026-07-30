---
seo:
 title: Use AI to write custom OpenAPI lint rules
 description: How to use AI to draft custom Redocly CLI lint rules in JavaScript for checks configurable rules can't express, then test and ship them safely.
---

# Use AI to write custom OpenAPI lint rules

Most API standards fit neatly into a Redocly CLI [configurable rule](https://redocly.com/docs/cli/rules/configurable-rules): a subject, an assertion, a severity, done. But some checks need real logic. Maybe a response schema has to match the same properties as its matching request schema, or a description field has to pass a Markdown linter before it counts as complete. Configurable rules can't express that kind of comparison, so the next step is a custom rule written in JavaScript.

This is also where AI earns its keep. A model that has seen the [custom plugin](https://redocly.com/docs/cli/custom-plugins) structure and the "visitor pattern" that drives it can draft a working rule from a plain-language description faster than most people can write one from scratch. This article covers how to brief that model, what the generated code needs before you trust it, and where a hand-coded rule fits next to the rules you already run.

## Try configurable rules first

Before reaching for JavaScript, check whether a [configurable rule](https://redocly.com/docs/cli/rules/configurable-rules) already covers the case, because it is easier to read and maintain than a plugin. [Built-in rules](https://redocly.com/docs/cli/rules/built-in-rules) and configurable assertions cover casing, required fields, enums, patterns, and several relationship checks between neighboring OpenAPI nodes. [Use AI to enforce your API style guide at scale](https://redocly.com/learn/ai-for-docs/ai-enforce-api-style-guide-at-scale) walks through drafting that YAML with AI, so it's worth reading first if you haven't set up any configurable rules yet.

Custom plugins exist for what's left over: checks that reach across the document in ways a single assertion can't, pull in an outside library, or apply logic that doesn't map to a `subject` and `assertion` pair. That's a small slice of most rulesets, so treat a hand-coded rule as the exception, not the default.

## Turn the rule idea into a plain-language brief

Before you prompt a model for code, write the rule the same way you'd write a configurable rule: name it, state the node it applies to, and describe the failure condition in one or two sentences. [Use AI to accelerate and improve reviews](https://redocly.com/learn/ai-for-docs/ai-reviews) makes this point about style checklists, and the same logic holds for lint rules. A clear one-line brief produces a cleaner first draft than a vague request, and it gives you something concrete to check the generated code against afterward.

```markdown {% process=false %}
Rule idea: every "Operation" that returns a paginated list must include a "next" and
"previous" field in its 200 response schema, matching by property name.
```

## Prompt AI for the visitor code

Give the model the [rules in plugins](https://redocly.com/docs/cli/custom-plugins/custom-rules) shape directly, rather than asking it to guess the interface. Each custom rule is a function that returns visitor methods keyed by OpenAPI node type, and Redocly CLI calls those methods while it walks the document. The `ctx.report()` method is how a rule flags a problem at a specific location.

```markdown {% process=false %}
You are writing a Redocly CLI custom plugin rule in JavaScript.

Rule idea:
[paste the one-line brief]

Requirements:
1. Export a function that returns an object with a visitor method for the
   relevant OpenAPI node type (see Operation, Response, Schema).
2. Call ctx.report() with a clear message when the condition fails, and pass
   the node's location when available.
3. Keep the rule to one file, one exported function, no external dependencies
   unless I ask for them.
4. Add a one-line comment above the export explaining what the rule checks.

Return only the JavaScript for the rule file.
```

Review what comes back the way you'd review any generated code, not the way you'd skim a lint warning: check that the visitor method targets the node type you meant. A rule that should key on `Response` sometimes gets written against `MediaTypesMap` instead, which changes what the rule sees and when it fires.

## Wire the rule into your project

A generated rule file does nothing until a plugin exports it and `redocly.yaml` enables it. Put the rule in its own file, for example `plugins/rules/paginated-list-fields.js`, and export it from a small plugin module:

```js {% process=false %}
import PaginatedListFields from './rules/paginated-list-fields.js';

export default function myRulesPlugin() {
  return {
    id: 'my-rules',
    rules: {
      oas3: {
        'paginated-list-fields': PaginatedListFields,
      },
    },
  };
}
```

Then register the plugin file and turn the rule on:

```yaml {% process=false %}
plugins:
  - plugins/my-rules.js

rules:
  my-rules/paginated-list-fields: error
```

Run `redocly lint openapi.yaml` locally, then wire the same [lint command](https://redocly.com/docs/cli/commands/lint) into CI so every pull request gets the check a local run would catch.

## Give the model context when the check needs it

Some checks can't be answered by looking at one node alone. If a rule needs to compare a property against its sibling, the visitor needs a "nested visitor," which gives access to parent context as the model walks the tree, so tell the model this up front, or a generated rule that skips the nesting will silently miss the comparison it was supposed to make. Also flag when a node might get processed more than once: top-level visitor functions run once per node even if a `$ref` points at it from several places, which matters when the rule's logic depends on counting occurrences. Check the [visitor pattern](https://redocly.com/docs/cli/custom-plugins/visitor) reference afterward if the generated code seems to assume otherwise.

## A grounded example: linting Markdown inside OpenAPI

At Redocly, we [built a custom plugin](https://redocly.com/blog/lint-markdown) so that Markdown inside OpenAPI `description` fields gets the same linting as any other Markdown file, because a good Markdown linter has no way to reach into a YAML or JSON document on its own. The plugin visits every description field, pulls out its Markdown content, runs it through a Markdown linting library, and reports any failures through the same `ctx.report()` path a hand-written rule would use. That example is worth studying even if your first custom rule has nothing to do with Markdown, since it shows the pattern at a useful scale: pull a value out of the document, hand it to an existing library, and translate that library's output into lint problems.

## Test before you trust it

Treat a generated rule like a small, untested pull request, because that's what it is. Run it against a spec you know passes today and confirm no new warning appears, then run it against a spec with the violation built in and confirm it fires with a message that points at the problem. AI-drafted rules tend to fail in predictable ways: they target the wrong node type, they check whether a field exists rather than checking its value, or they report a message that doesn't match what the code actually checked. Catch those before the rule reaches every pull request, not after, then set severity to `warn` for a week if existing specs might violate it, and promote to `error` once the warning count settles near zero.

## Where AI stops helping

AI is good at drafting visitor code from a description, and reasonably good at explaining why an existing rule isn't firing when you expect it to. It's not good at knowing which edge cases matter for your API, because that judgment depends on context the model doesn't have, such as which fields are legacy or which "violation" is intentional by design. Keep a human reviewing every generated rule before it ships with `error` severity, and simplify a rule back to a configurable assertion when one would have done the job. Fewer custom files means fewer things that break when Redocly CLI's plugin interface changes.

## How Redocly can help

[Redocly CLI custom plugins](https://redocly.com/docs/cli/custom-plugins) run hand-written JavaScript rules next to your built-in and configurable ones from the same `redocly.yaml`, with the same per-rule severity controls, so a check that started as an AI-drafted visitor function enforces exactly the way the rest of your ruleset does, in every editor run and every CI job.
