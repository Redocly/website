---
seo:
 title: API monitoring best practices
 description: Monitor the OpenAPI contract on a few Arazzo workflows in CI and on a schedule, with alerts and git next to the spec, instead of uptime-only pings.
---

# API monitoring best practices

## Key takeaways

- Treat the OpenAPI description as the contract the monitor must enforce, not as optional documentation.
- Cover critical Arazzo workflows first; do not equate path count with safety.
- Run the same workflows in CI and on a hosted schedule, with alerts that name an owner.
- Keep Arazzo, OpenAPI, and docs in one git review so monitors cannot silently rot.

API monitoring is easy to confuse with uptime. A probe that receives HTTP 200 looks healthy, and [dashboards that stay green while a required field disappears](https://redocly.com/blog/api-contract-testing-arazzo) are a common incident story. Clients do not consume "the server responded." They consume the contract you published: status codes, headers, and body shape.

Best practice is to treat the OpenAPI description as that contract, watch a small set of real user workflows, assert what the spec already promised, and keep those monitors in the same git project as the spec and the docs. The rest of this article is that loop, not a catalog of ping products.

## Monitor the contract, not only uptime

Uptime answers a narrow question: did this URL respond in time? Contract monitoring asks whether the response still matches the description customers and generated SDKs rely on. [A response-format change that client tests never saw](https://redocly.com/learn/testing/contract-testing-101) can ship behind a 200 and a green availability tile.

That does not make pings useless. Keep them for "is the load balancer up?" Put contract checks on the paths where a wrong body is a customer-visible break. Respect's hosted checks, for example, compare live responses to [status, schema, content type, and success criteria](https://redocly.com/docs/realm/reunite/project/respect-monitoring) from the OpenAPI description linked in an Arazzo workflow. [Checks that go past availability](https://redocly.com/blog/respect) are the difference between "the API is up" and "the API still keeps its promise."

If you only have budget for one kind of monitor this quarter, put it on the contract for the jobs you cannot pause. Availability without schema checks will not catch [a schema mismatch that only showed up against the live server](https://redocly.com/learn/arazzo/practical-example-series/api-contract-testing-01).

## Prefer workflows over exhaustive path lists

Most customer jobs are not a single operation. Login, create, and read-back share tokens and ids. A per-path monitor on `GET /orders/{id}` can stay green while `POST /orders` stops returning the id the GET needs, or while the token step starts issuing a different header.

[Describe the sequence of calls, not only each operation](https://redocly.com/learn/arazzo/what-is-arazzo). Arazzo is the OpenAPI Initiative format for that choreography. Monitoring the workflow tests data flow, not only isolated status codes.

Do not aim for "every path in the spec has a check." Exhaustive lists create mute-able noise and delay the first useful schedule. Start with the two or three jobs that represent revenue, partners, or the happy path in your getting-started guide. Expand when an incident shows a gap, not when a completeness score looks low.

Health endpoints belong in availability monitoring. They rarely belong in the first contract-workflow set, because they are designed not to exercise the product.

## Assert what the spec already promised

Weak assertions are how silent failures hide. "Status is 2xx" will not notice a required field going missing. "Body is JSON" will not notice an extra property you never meant to leak.

For each step, [spell out what success means for each step](https://redocly.com/learn/arazzo/success-criteria-and-failure-handling) in addition to the automatic OpenAPI checks. Typical baseline:

- Status matches a documented response
- `Content-Type` matches the documented media type
- Body validates against the documented schema
- One business check the schema cannot see by itself (for example, the create response `id` is present and reused on the next step)

If the spec is wrong, fix the spec. Do not weaken the monitor to match a bug you intend to keep. If production is right and the spec is stale, that is a documentation and description change, not a reason to delete the schema check.

Revisit assertions when you add required fields or change error shapes. A success criterion that still looks for a removed property is workflow rot, and it trains the team to ignore failures.

## Schedule by risk, then alert with a next step

Run monitors where failure has an owner. [Run on a schedule or on every project build](https://redocly.com/docs/realm/reunite/project/respect-monitoring/configure-respect-monitoring): `build` catches description and environment breaks before a deploy is considered done; `schedule` catches production drift after merge. Intervals should match blast radius. A checkout workflow might run every few minutes in production; a rarely used admin export can wait hours.

Alerts need a next step, not only a red tile. [Notify Slack when a workflow fails, and archive the ones you retired](https://redocly.com/docs/realm/reunite/project/respect-monitoring/manage-respect-monitoring). Subscribe per workflow so a noisy experimental flow cannot drown the critical one. Include enough in the alert (workflow, step, check type) that the person who gets it can classify production versus description versus assertion without hunting for context.

If you set SLA or uptime thresholds, treat them as a second signal. Schema failures and SLO breaches are different conversations. Do not page the docs team for a 500 that is a service outage, and do not page only SRE for a 200 whose body no longer matches the spec.

## Run the same checks in CI and in production

The Arazzo file should not be a production-only artifact. [The same Arazzo file in CI](https://redocly.com/respect-cli) is how you find a broken workflow before it pages anyone. Developers can run Respect CLI locally against a sandbox; the pipeline can run named workflows on pull requests that touch OpenAPI or Arazzo files.

Hosted schedules then reuse that file. If CI and production monitors diverge, you will debug "works in GitHub Actions" failures that are really environment or secret differences. Keep server URLs and inputs explicit. Staging should be allowed to fail a workflow that production has not shipped yet, without muting the production job.

When you need to find routes nobody wrote a workflow for, [compare recorded traffic to the OpenAPI description](https://redocly.com/blog/catch-api-drift) with `proxy` and `drift`. That practice complements scheduled workflows. It does not replace them. Traffic capture is how you discover undocumented behavior; Arazzo is how you keep watching the jobs you already care about.

## Keep monitors next to the spec

Monitors rot when they live in a separate click-ops project from the OpenAPI file. Put Arazzo descriptions in the same repository (or the same Reunite project) as the spec and the docs, and review them together. A PR that adds a required field should update the schema, the example, and the workflow assertion in one diff.

Archive retired workflows instead of leaving them red forever. A dashboard full of abandoned jobs is how teams learn that red is normal.

When the description, the docs, and the monitor disagree, decide which of the three is the source of truth for that change, then update the other two. The OpenAPI file should win for generated reference. The monitor should win as the test that production still matches that file. Prose guides should follow, not invent a fourth contract.

That is the practice in one line: monitor the contract on a few real workflows, on a schedule the team will honor, in git next to the spec. Uptime remains a separate, smaller question.

## FAQs

### How is API monitoring different from uptime monitoring?

Uptime asks whether a URL responded in time. API monitoring in this sense asks whether the response still matches the published contract. [Dashboards that stay green while a required field disappears](https://redocly.com/blog/api-contract-testing-arazzo) are an uptime success and a contract failure.

### How many workflows should we start with?

Two or three jobs that represent revenue, partners, or the getting-started happy path. Expand when an incident shows a gap. Do not wait until every path has a check.

### What should a monitor assert besides HTTP 200?

At least documented status, content type, and schema, plus [what success means for each step](https://redocly.com/learn/arazzo/success-criteria-and-failure-handling) when the schema cannot see the business rule (for example, reuse of a created `id`).

### Should monitors run in CI, on a schedule, or both?

Both. [The same Arazzo file in CI](https://redocly.com/respect-cli) catches breaks before merge. [Run on a schedule or on every project build](https://redocly.com/docs/realm/reunite/project/respect-monitoring/configure-respect-monitoring) to catch production drift after merge.

### Where should Arazzo files live relative to the OpenAPI description?

In the same git project (or Reunite project) as the spec and the docs, so a required-field change updates schema, example, and assertion in one review.

### How do we stop alert noise without dropping coverage?

Subscribe per workflow, archive retired flows, and keep health pings out of the first contract-workflow set. [Notify Slack when a workflow fails, and archive the ones you retired](https://redocly.com/docs/realm/reunite/project/respect-monitoring/manage-respect-monitoring) so the channel matches the jobs you still mean to honor.

## How Redocly can help

Respect provides [scheduled contract checks with alerts when behavior diverges](https://redocly.com/respect) from the OpenAPI description you already maintain, so the practices above (workflows, assertions, CI plus schedule) sit on one Arazzo file instead of a pile of unrelated pings.
