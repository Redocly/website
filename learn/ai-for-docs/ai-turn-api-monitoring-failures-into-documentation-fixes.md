---
seo:
 title: Use AI to turn API monitoring failures into documentation fixes
 description: When Respect alerts fire, classify production versus workflow versus docs with AI, then land a small documentation PR and wait for the next green run.
---

# Use AI to turn API monitoring failures into documentation fixes

## Key takeaways

- Treat each Respect failure as a three-way classification: production, workflow, or docs.
- Give AI the failure output, the OpenAPI operation, and the docs paragraph; require a verdict with quoted evidence.
- When docs are wrong, patch the spec first if the portal is generated, then the example or guide, as a Reunite PR.
- Do not archive the alert until the next scheduled run passes.

Scheduled monitors are only half of the loop. The other half is what happens after Slack lights up. Most teams already know how to [subscribe the workflow to Slack or email](https://redocly.com/docs/realm/reunite/project/respect-monitoring/manage-respect-monitoring). Fewer have a default for the next thirty minutes: is production wrong, is the Arazzo file wrong, or did the docs fall behind a behavior that is now correct?

This article assumes [scheduled truth checks against live endpoints](https://redocly.com/learn/ai-for-docs/ai-detect-drift-docs-live-api) are already running. The sibling piece is about detecting drift. This one is a runbook: capture the failure, classify it, and when the mismatch belongs in documentation, open a small PR instead of leaving a mute-able alert.

## An alert is a classification problem

A Respect failure is a fact about one workflow against one environment. It is not yet a documentation task. Treating every red row as "update the guide" will paper over outages. Treating every red row as "page the API owners" will burn writers on assertion bugs.

The useful first move is classification into three buckets: production, workflow, or docs. AI is fast at a first pass when you paste artifacts. Humans still own the merge, especially when the verdict is "leave the docs, fix the service."

Do not start from a screenshot of a dashboard tile. Start from the check that failed and the operation it was bound to.

## Capture enough of the failure to reproduce it

Before anyone prompts a model, collect a packet that another engineer could replay:

- Workflow id and step name
- [Which automatic check failed](https://redocly.com/docs/realm/reunite/project/respect-monitoring): status code, content type, schema, or success criteria
- Expected versus observed (status, `Content-Type`, or the schema path that broke)
- Linked OpenAPI `operationId` or method plus path
- The public docs paragraph or example that describes that step
- Environment (staging versus production) and approximate time

If the hosted run is thin, [reproduce the failing workflow locally](https://redocly.com/learn/arazzo/testing-arazzo-workflows) with Respect CLI against the same server and save verbose output. [Send the same requests your monitor sends](https://redocly.com/docs/respect) so you are not debugging a different client.

When the failure is "this field exists in traffic but not in the spec," and the Arazzo step never asserted it, you may also have [recorded traffic that does not match the description](https://redocly.com/blog/catch-api-drift). That is still a classification problem. It is a different evidence pack (HAR plus `drift` output), not a reason to skip the three buckets.

Redact tokens and customer payloads. Keep method, path, status, and the JSON pointer that failed.

## Three buckets: production, workflow, or docs

### Production is the mismatch

Production is wrong when the live response violates a description you still intend to keep. Status 500 on a documented 201, a missing required property, or a new error body that leaks internals: fix the service. Keep the monitor. Optionally tighten [the step's success criteria](https://redocly.com/learn/arazzo/success-criteria-and-failure-handling) so the same bug cannot return as a silent 200.

### The workflow file is the mismatch

The workflow is wrong when production matches the intended contract, but Arazzo asks for something else: an outdated status, a step order that no longer matches the product, a success criterion copied from a tutorial, or a server URL pointed at the wrong environment. Fix the Arazzo file (and inputs), not the customer-facing guide.

### The docs are the mismatch

Docs are wrong when production is the behavior you want, the workflow assertions match that behavior, and the portal, recipe, or code sample still describes the old world. Typical tells: a sample that omits a now-required header, a tutorial that still shows a removed field, or reference text that lists status codes the spec no longer documents.

If the portal is generated from OpenAPI, update the spec first, then the Markdown guide. Generated reference will overwrite a hand-edit on the next build. Guides and task-based examples still need a human pass, because a schema fix does not rewrite a "before you begin" paragraph.

When two buckets could apply, prefer production. Shipping a docs patch that blesses an outage is the failure mode this runbook exists to prevent.

## A triage prompt that refuses to guess

Paste the packet. Require a verdict, quotes, and a smallest-diff draft. Reject a rewrite of the whole page.

```text
Classify this API monitoring failure. Buckets: production, workflow
(Arazzo), or docs. If unsure, say so and list what is missing.

Attached:
- Respect / CLI output (redacted)
- OpenAPI snippet for the operation
- Docs section that claims to describe this step

Rules:
- Quote the exact expected vs observed lines you used.
- Do not invent paths, fields, or status codes.
- If docs are the mismatch, propose the smallest patch (spec YAML
  and/or Markdown) limited to this operation or example.
- If production is the mismatch, do not draft a docs change that
  makes the failure look intended.
```

Read the answer like a code review. If the model cannot quote the failure, it does not have enough context. If it "fixes" docs by deleting the example, that is not a smallest diff. If it updates a guide but the OpenAPI still describes the old response, the portal will fight the PR on the next generate.

AI drafts the classification and the patch. Lint, contract tests, and a reviewer still have to agree.

## Turn a docs verdict into a Reunite PR

Keep the change scoped to the failing operation or the one example that lied. A monitoring-driven docs PR that also "cleans up" unrelated pages is how review stalls and the alert stays red.

Open the change in the same git workflow you use for other documentation. [Review the before and after in git](https://redocly.com/reunite) with the visual diff, then run [the same three-layer review you already run on doc PRs](https://redocly.com/learn/ai-for-docs/ai-automate-documentation-reviews-pr-workflow): an AI checklist on the prose, Redocly CLI lint on the spec, and a human for whether this page should say what production now does.

If the spec changed, say so in the PR body and link the Respect failure (workflow id, step, timestamp). Writers who were not on the alert should be able to see why this paragraph moved.

Do not merge a docs-only fix for a production bucket. If the verdict flipped during review, close the docs PR and hand the failure to the service owners with the same packet.

## Close the loop so the alert can go quiet

Merge is not the end of the runbook. Wait for [the next scheduled interval](https://redocly.com/docs/realm/reunite/project/respect-monitoring/configure-respect-monitoring), or re-run the workflow in CI against the environment that failed. Archive or mute only after that run is green.

If production was the bucket, keep the monitor and consider a stricter success criterion on the field that broke. If the workflow was the bucket, the next green run is the proof the assertion matches intent. If docs were the bucket, the next green run proves you did not "fix" documentation by weakening the check.

The habit is short: capture, classify, patch the thing that is wrong, then confirm the monitor. AI makes the first draft of the verdict and the docs diff. Respect keeps the check in place so the same lie cannot sit in the portal until the next support spike.

## FAQs

### What should we paste into AI when Slack only shows "workflow failed"?

Paste the workflow id, step, [which automatic check failed](https://redocly.com/docs/realm/reunite/project/respect-monitoring), expected versus observed, the OpenAPI snippet, and the docs paragraph. If the alert is thin, [reproduce the failing workflow locally](https://redocly.com/learn/arazzo/testing-arazzo-workflows) and attach verbose output.

### How do we tell a bad assertion from a production bug?

If production still matches the description you intend to keep, the workflow file is the mismatch. If the live response violates that description, production is the mismatch. Tighten [the step's success criteria](https://redocly.com/learn/arazzo/success-criteria-and-failure-handling) only after you decide the description is still right.

### Should we update the OpenAPI file or the Markdown guide first?

When the portal is generated from OpenAPI, update the spec first, then the guide. A hand-edit to generated reference will be overwritten on the next build.

### How small should the documentation PR be?

Limit it to the failing operation or the one example that lied. Run [the same three-layer review you already run on doc PRs](https://redocly.com/learn/ai-for-docs/ai-automate-documentation-reviews-pr-workflow), and [review the before and after in git](https://redocly.com/reunite).

### When is it wrong to "fix" docs and leave production unchanged?

When the live response violates a contract you still intend to publish. A docs patch that blesses an outage is the failure mode this runbook exists to prevent.

### How does this relate to detecting drift with Respect?

Detecting drift is [scheduled truth checks against live endpoints](https://redocly.com/learn/ai-for-docs/ai-detect-drift-docs-live-api). This article starts after those checks fire, and turns a classified docs mismatch into a merged PR.

## How Redocly can help

Respect sends [alerts when a critical workflow stops matching the spec](https://redocly.com/respect), which is the input this runbook needs. From there, classify the failure and land the docs-shaped outcome as a small git change, with the monitor still running until the next interval is green.
