---
seo:
 title: Use AI to keep API monitoring in sync with your docs
 description: Learn how to use AI to update Respect Monitoring's Arazzo workflows whenever your OpenAPI spec or docs change, so monitoring never tests a stale contract.
---

# Use AI to keep API monitoring in sync with your docs

Most teams set up API monitoring once, watch it pass for a few weeks, and move on. Then the docs change: a field gets renamed, a new required parameter ships, an endpoint gets deprecated. The monitoring workflow does not know any of that happened, so it keeps testing the version of the contract that shipped last quarter.

This is drift in the other direction. Most guidance on API drift starts with the live API diverging from the docs. Just as often, the docs and spec move first, and the monitoring setup gets left behind.

This article covers why monitoring falls out of sync with docs, how to prompt AI with a spec diff instead of a whole file, and where [Respect](https://redocly.com/respect) still has to verify the result against a real server.

## The other direction of drift

When people talk about API drift, they usually mean production changed and the docs did not catch up. [Use AI to detect drift between your docs and your live API](https://redocly.com/learn/ai-for-docs/ai-detect-drift-docs-live-api) covers that direction well: Respect runs scheduled checks, something fails, and AI helps a writer turn the failure into a doc fix.

This article starts from the opposite end. A technical writer or API owner updates the OpenAPI description because a field changed type or an endpoint moved. The monitoring workflow that tests that same contract lives in a separate file, written earlier, and nobody updates it in the same pull request. So the monitoring keeps passing against an outdated picture of the API, which means a real problem could ship without triggering a single alert.

## Why monitoring falls behind the docs it is supposed to check

Monitoring configuration and API documentation usually live in separate files, so a spec change does not automatically touch the workflow that tests it. [Respect Monitoring](https://redocly.com/docs/realm/setup/respect-monitoring) runs [Arazzo](https://redocly.com/docs/cli/) workflows against your OpenAPI Description, checking status codes, response schemas, content types, and the success criteria you define. Those steps name specific fields and values, so when the spec changes, the workflow needs the same edit or it starts testing the wrong thing.

Three patterns show up often:

| Pattern | What happens |
|---|---|
| Renamed or removed field | Success criteria still checks the old field name, so the check stops asserting anything useful |
| New required parameter | The monitoring request never sends it, so Respect fails for the wrong reason or a request your real clients could not send gets accepted |
| Deprecated endpoint | The workflow keeps calling a path nobody documents, wasting a check that could cover something that matters |

None of these show up as a failure right away, which is why they are easy to miss. The workflow keeps returning green, so the team assumes coverage is current when it is really testing a snapshot from months ago.

## Give AI the diff, not the whole spec

Pasting an entire OpenAPI file into a prompt and asking whether the monitoring still matches produces vague answers, because the model has to guess which parts changed. A scoped diff works better: paste only what moved, and ask for the matching edit to the Arazzo workflow.

### A prompt template for updating Arazzo steps

```markdown
You are updating an Arazzo workflow so it matches a changed OpenAPI Description.

Context:
- The OpenAPI diff (old and new versions of the changed paths or schemas).
- The current Arazzo workflow steps that reference those paths.

Rules:
- Only change steps tied to the pasted diff. Leave every other step untouched.
- If a field was renamed, update success criteria and parameter references to match.
- If a field was removed, remove it from requests and assertions, and flag the removal.
- If a new required parameter was added, add it with a realistic placeholder value.
- Do not invent workflow steps, fields, or endpoints outside the pasted diff.

Deliverable: the updated Arazzo steps, plus a short summary of what changed and why.
```

The same "give it a checklist, not a wall of text" idea shows up in [Use AI to enforce tone and style consistency across docs](https://redocly.com/learn/ai-for-docs/ai-enforce-tone-style-consistency-across-docs): a scoped input gets a scoped answer, while a long document invites the model to guess.

## Where Respect Monitoring keeps AI honest

AI can draft the workflow edit, but it cannot confirm the edit is correct against a real server. That is what [Respect](https://redocly.com/respect) is for. [Use cases for Respect](https://redocly.com/docs/respect/use-cases) include running the same workflow as a pull request check before merge, then on a schedule against staging or production once it ships.

Respect Monitoring runs four checks every time a workflow fires: status code, success criteria, content type, and response schema. Set the run frequency with the `interval` option on the `trigger` object in `redocly.yaml`, and results show up as a chart, with Slack or email alerts so a failing run reaches a person instead of a dashboard nobody opens.

AI proposes the edit, and Respect Monitoring proves it, because a plausible-looking Arazzo update is not the same as a correct one. The pull request check catches errors before they reach production, the same way the [drift command](https://redocly.com/docs/cli/commands/drift) catches mismatches between recorded traffic and an OpenAPI Description on the reactive side of this problem.

## A workflow for keeping monitoring current

Treat monitoring updates as part of the same change that updates the docs, not a separate task for later:

1. When an OpenAPI Description changes, pull the diff for the paths and schemas that moved.
2. Paste that diff, plus the current Arazzo steps, into the prompt template above.
3. Review the model's change summary like a pull request from a person.
4. Merge the spec change and the Arazzo update together, so Respect Monitoring's check runs against the new workflow before merge.
5. Watch the first scheduled runs after merge; a workflow that passes once in review can still fail against live data the model never saw.

### Best practices

- Ask for a change summary every time, even for small edits, so review takes seconds instead of a full re-read.
- Keep [Redocly CLI](https://redocly.com/docs/cli/) linting active on the spec; [built-in rules](https://redocly.com/docs/cli/rules/built-in-rules) catch mistakes a monitoring run would only surface later.
- Route alerts to the channel API owners already watch, not a separate one that gets muted after the first noisy week.

## What AI cannot decide for you

A model cannot tell you whether a removed field was intentional or a mistake, and it cannot decide whether the resulting hole in coverage is acceptable risk. Those calls need someone who knows the roadmap and the customers depending on the endpoint. [Use AI to review API design for backward compatibility risks](https://redocly.com/learn/ai-for-docs/ai-api-design-backward-compatibility-risks) covers a related judgment call: what counts as a breaking change before monitoring even enters the picture.

AI also cannot guarantee full coverage. [Use AI to find gaps in your documentation coverage](https://redocly.com/learn/ai-for-docs/ai-find-gaps-documentation-coverage) makes the case for three lenses: lint for missing fields, AI for missing steps in a multi-page workflow, and Respect for problems that only show up once code ships. Keeping monitoring in sync with the docs is one piece of that third lens, not a replacement for the other two.

## How Redocly can help

Once your docs and monitoring workflows are current, [Respect](https://redocly.com/respect) is what proves it stays that way. Respect Monitoring runs your Arazzo workflows on a schedule against real endpoints, checking status codes, schemas, and content types against the OpenAPI Description you publish, and it sends real-time alerts by Slack or email when a run fails. Ship your spec update and monitoring update together, and Respect gives you ongoing confirmation that the two still match, instead of a support ticket.
