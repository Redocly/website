---
seo:
 title: Use AI to decide which API endpoints to monitor first
 description: Rank Arazzo workflows with AI from OpenAPI, traffic hints, and support tickets, then schedule that first slice in Respect instead of monitoring every path.
---

# Use AI to decide which API endpoints to monitor first

## Key takeaways

- Monitor a few high-risk Arazzo workflows first. Do not treat every OpenAPI path as a required check.
- Rank with OpenAPI plus traffic hints and support tickets, then discard any path the spec cannot support.
- Put the ranked list on a Respect schedule (CLI `--workflow`, then hosted jobs and alerts) so the ranking is not a slide.
- Re-rank after launches, incidents, and spec changes so coverage follows the product.

Most teams start API monitoring as if the OpenAPI file were a checklist: every path gets a ping, and coverage is the percentage of operations that return something. That score feels complete, and it is a poor predictor of whether customers can still complete a job. A green check on `GET /items/{id}` does not tell you whether login still issues a token, whether create still returns the fields the next call needs, or whether [a 200 OK can still drop a required field](https://redocly.com/blog/api-contract-testing-arazzo).

The useful first question is not "which endpoints are we missing?" It is "which short sequences, if they broke, would page support or stop a partner?" AI is good at ranking those sequences when you give it the spec plus a little operational context. Deterministic monitors then run the ranked list. The ranking is a draft; the schedule is the decision.

## Why covering every endpoint fails

Exhaustive path monitors fail in three predictable ways. They produce noise: low-traffic admin routes and experimental stubs fail for reasons nobody will fix this week, so on-call learns to mute the channel. They miss the failures that matter: checkout is not one operation, and a token that still validates on a health path can still be rejected on the write that follows. They stall rollout, because a program that must cover hundreds of operations never ships the first ten.

Uptime-style checks make the problem worse. They answer whether a server responded, not whether the response still matches the description you publish. Contract-aware monitoring is the opposite bet: assert [status codes, content types, schemas, and success criteria](https://redocly.com/docs/realm/reunite/project/respect-monitoring) on the flows customers run, and accept that many operations will have no dedicated monitor until they earn one.

Treat "every endpoint" as a backlog, not a launch criterion. The first slice should be small enough that a failure still has an owner.

## Rank workflows, not isolated paths

What is worth monitoring first is usually a workflow: authenticate, create a resource, read it back, maybe cancel. That is [sequences of operations rather than isolated paths](https://redocly.com/learn/arazzo/what-is-arazzo), which is what Arazzo is for. Ranking `POST /orders` without the token step and the subsequent GET will either false-alarm on auth setup or miss a break that only appears when steps share data.

Ask AI to propose Arazzo-shaped flows, not a sorted table of paths. A good proposal names the job ("partner creates an order and fetches its status"), the operations in order, and what must be true after each step. A bad proposal is a restated tag list from the spec ("all `/billing/*` routes, high priority") with no success criteria and no evidence.

If the model returns an operation that is not in the OpenAPI file, drop it. Invented paths are how ranking sessions turn into fiction. The spec is the allowlist; traffic and tickets are only weights on top of it.

## Inputs AI needs to rank well

Give the model four kinds of input, and withhold the rest.

- OpenAPI, or a slice. A domain tags file or a single versioned description is enough. Whole-org dumps bury the signal and invite hallucinated servers.
- Traffic or SLI hints. Even coarse notes help: "80% of 5xx last month were `POST /checkout`", "this partner integration is 30% of production writes." You do not need a perfect analytics export.
- Support tickets and incident titles. Phrases like "example returns 404" or "pagination changed" often point at workflows docs already claim to cover.
- Known revenue or partner paths. List the two or three jobs the business cannot pause, even if they are not the noisiest in logs.

Do not paste secrets, full HAR dumps, or customer payloads. Summarize: method, path, status, and the field that surprised you. If tickets mention [holes in multi-step stories](https://redocly.com/learn/ai-for-docs/ai-find-gaps-documentation-coverage), include the job name ("create subscription after OAuth") rather than the entire guide.

When the spec and the tickets disagree, say so in the prompt. "Tickets say clients send `Idempotency-Key` on POST /orders; the spec does not document that header" is a ranking input. It is also a docs or spec task, not a reason to monitor an undocumented operation until someone owns the contract.

## A ranking prompt that produces a schedule

Ask for a short ordered list you can paste into an Arazzo file, not a rewritten specification. Constrain the output: at most seven workflows, each with a name, steps tied to `operationId`s, success criteria, and a one-line reason that cites the inputs you provided.

```text
You are ranking API workflows to monitor first. Use only operations
that appear in the attached OpenAPI. Do not invent paths, servers,
or fields.

Inputs: OpenAPI (attached). Traffic notes: {paste}. Support themes:
{paste}. Business-critical jobs: {paste}.

Return at most 7 workflows. For each:
- workflowId (kebab-case)
- steps: method + path or operationId, in order
- success criteria (status and one schema or field check per step)
- why it outranks the rest (cite a ticket theme or traffic hint)
- what we are explicitly not covering yet

If an input mentions a path that is not in the spec, list it under
"needs spec decision" instead of a workflow.
```

Read the result like a test plan. Merge duplicates. Reject anything whose steps cannot be executed with the security schemes you use in staging. If the model ranks an internal debug route above checkout because a ticket mentioned it once, put that ticket on a docs list and keep checkout first.

The output of this step is an ordered backlog, not a promise that the first item is the only risk. You are choosing where limited monitor budget goes this month.

## Make the list operational in Respect

A ranking that stays in a doc is a brainstorm. Put the first slice in an Arazzo file in the same repository as the OpenAPI description, then [run named workflows from the Arazzo file](https://redocly.com/docs/cli/commands/respect) with the Respect CLI `--workflow` option so you are not executing every flow while the list is still in draft.

[Run the same Arazzo file in CI first](https://redocly.com/respect-cli). A workflow that cannot pass against staging with a non-production token is not ready for a hosted schedule. Fix the description, the environment, or the assertions before you page anyone.

When the first two or three workflows are green in CI, [schedule those workflows on an interval](https://redocly.com/docs/realm/reunite/project/respect-monitoring/configure-respect-monitoring) in `redocly.yaml` (`schedule` for ongoing checks, `build` if you also want them on project builds). Start with a conservative interval on production and a tighter one on staging. Subscribe alerts only for the workflows in the first slice, so the channel stays tied to ranked risk.

As the list changes, [archive workflows that are no longer in the first slice](https://redocly.com/docs/realm/reunite/project/respect-monitoring/manage-respect-monitoring) instead of leaving retired flows on the dashboard. Archived does not mean forgotten; it means the on-call view matches the current ranking.

## Re-rank when the surface changes

Re-run the ranking when you ship a new public job, after an incident that surprised you, and when a spec diff adds or removes operations in a tagged domain. The prompt can take the previous workflow list as an extra input: "keep these unless the new spec makes them impossible, and propose at most two additions."

Do not freeze the first brainstorm for a year. Coverage that never moves is how exhaustive monitoring sneaks back in under a new name. When alerts start firing, [turn later alerts into doc or spec fixes](https://redocly.com/learn/ai-for-docs/ai-detect-drift-docs-live-api) rather than adding more paths in a panic. New monitors should still win a rank against the current slice.

The habit is small and repeatable: rank a few workflows from the contract plus operational hints, schedule only those, and re-rank when the product changes. AI drafts the ordered list. Respect and CI make the list true.

## FAQs

### Why not monitor every operation in the OpenAPI file?

Because exhaustive path lists create mute-able noise, miss multi-step failures, and delay the first useful schedule. Rank [sequences of operations rather than isolated paths](https://redocly.com/learn/arazzo/what-is-arazzo), then add operations only when they earn a place against that slice.

### What inputs should we give an AI besides the spec?

Traffic or SLI hints, support-ticket themes, and the two or three jobs the business cannot pause. Withhold secrets and full payload dumps. If tickets describe [holes in multi-step stories](https://redocly.com/learn/ai-for-docs/ai-find-gaps-documentation-coverage), pass the job name, not the entire guide.

### How is a workflow different from an endpoint for monitoring?

A workflow is an ordered job (authenticate, create, read) that shares data across calls. An endpoint monitor on a single GET can stay green while the POST that supplies its id has already broken.

### How do we stop AI inventing undocumented paths?

State that the OpenAPI file is an allowlist, and move anything the model invents into a "needs spec decision" list. Do not schedule a monitor for an undocumented operation until someone owns the contract.

### When should CI workflows move to hosted monitoring?

After it passes in CI against staging with non-production credentials. Then [schedule those workflows on an interval](https://redocly.com/docs/realm/reunite/project/respect-monitoring/configure-respect-monitoring) and subscribe alerts only for that first slice.

### How often should we re-rank the monitor list?

After a new public job, after an incident that surprised you, and when a spec diff changes a tagged domain. Re-ranking is how the list stays a decision instead of a frozen brainstorm.

## How Redocly can help

Respect is built for [scheduled monitoring of the paths that matter first](https://redocly.com/respect): Arazzo workflows on an interval, with alerts when those critical sequences stop matching the OpenAPI description, so a ranked list becomes coverage instead of a slide.
