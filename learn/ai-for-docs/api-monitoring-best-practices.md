---
seo:
 title: API monitoring best practices
 description: Monitor the OpenAPI contract on a few Arazzo workflows in CI and on a schedule, with alerts and git next to the spec, instead of uptime-only pings.
---

# API monitoring best practices

## Key takeaways

- Uptime and latency checks confirm that a server is responding, not that its responses still match the OpenAPI contract, so a 200 OK can hide a dropped field, a changed type, or an undocumented status code.
- Best-practice monitoring tests live API behavior against the OpenAPI and Arazzo descriptions on a schedule, using tools like Respect to autogenerate tests instead of hand-writing assertions.
- Start with the critical workflows that matter most to the business, then automate checks and route alerts through Slack or email so failures reach the right people fast.
- Multi-step workflows need their own tests, since a single-endpoint check can miss failures that only appear when data flows from one call to the next.
- A monitoring failure is only useful if it turns into a fix. Teams should trace each alert back to a spec, docs, or code change and merge it through their normal review process.

Most teams that ship an API also set up some form of monitoring, and for years that has meant checking whether an endpoint returns a 200 status code within an acceptable response time. Uptime dashboards turn green, latency graphs stay flat, and everyone assumes the API is healthy. But an API can be up, fast, and still broken in ways that uptime checks never see: a field silently dropped from a response, a type that changed from a string to a number, or an undocumented status code that a client doesn't know how to handle. The dashboard stays green while the contract between the API and its consumers falls apart, and the first people to notice are often the customers filing support tickets, not the team watching the monitor.

This is the gap that best-practice API monitoring is meant to close. Rather than asking only whether the server is responding, it asks whether the server is responding the way the OpenAPI description says it will. Reading through the [benefits and challenges of contract testing](https://redocly.com/learn/testing/contract-testing-101) is a useful starting point for docs orgs and platform teams trying to explain why uptime alone doesn't prove that an API works the way it's documented.

## Why traditional uptime monitoring isn't enough

Uptime and latency checks answer a narrow question well: is something listening on the other end. They don't ask whether the response body matches the schema a team published, whether a required field is still present, or whether an error case returns the status code the documentation promises. Because these checks pass as long as a server responds at all, they can mask exactly the kind of change most likely to break an integration. Industry writing on this problem has started calling out the pattern directly, noting how [monitoring dashboards stay green while the API breaks](https://redocly.com/blog/api-contract-testing-arazzo) underneath, because nothing in a simple ping check was ever designed to catch a contract violation. The cost of that blind spot shows up
downstream, in [unexpected status codes, incorrect content types, and schema mismatches](https://redocly.com/blog/respect) that surface in a customer's integration long before they show up in an internal alert.

## Monitor against your OpenAPI contract, not just status codes

A more reliable approach treats the OpenAPI description as the thing being tested, rather than documentation that simply sits next to the code. Respect, Redocly's monitoring product, works this way: it [checks your API responses match what the OpenAPI description says](https://redocly.com/docs/respect), comparing live behavior against the schemas, required fields, and status codes already defined in the spec. Because the tests come from the spec itself, teams don't have to hand-write assertions for every field. Respect [autogenerates tests from OpenAPI to get started quickly](https://redocly.com/docs/respect/what-is-respect), which lowers the barrier for docs owners and platform engineers who want contract-level coverage without building a testing framework from
scratch. Getting started only takes a small first step: you can [write your first test description](https://redocly.com/docs/respect/get-started) against a real or demo API and see, right away, what contract-based monitoring surfaces that a status-code check would have missed.

## Prioritize critical workflows before trying to cover everything

Trying to monitor every endpoint on day one is a common instinct, and it usually backfires. Large APIs can have hundreds of operations, and treating them all as equally urgent tends to produce noisy alerts that teams eventually learn to ignore. A steadier approach starts with the handful of workflows that matter most to the business, such as authentication, checkout, or account creation, whatever the equivalent "if this breaks, support gets flooded" path looks like for a given product. Reviewing [common monitoring use cases](https://redocly.com/docs/respect/use-cases) can help teams see how others have scoped this first pass before expanding coverage. Once the critical paths are solid, monitoring can grow outward to secondary endpoints, rather than starting broad and
thin.

## Automate checks on a schedule and alert through the tools your team already uses

Monitoring that depends on someone remembering to run it manually tends to lapse. A more durable pattern is to schedule checks so they run continuously, and to route failures into the channels a team already watches, rather than a dashboard nobody checks between incidents. Inside Reunite, teams can [schedule automated checks and configure alerts](https://redocly.com/docs/realm/reunite/project/respect-monitoring/configure-respect-monitoring) so that contract failures land in Slack, email, or wherever on-call already lives. Speed matters here, because an alert that arrives minutes after a contract violation is far more useful than a report generated once a week: it gives the team a chance to fix the problem before a customer opens a ticket about it.

## Catch breaking changes and drift before customers do

Specs and implementations tend to drift apart over time, often without any single change feeling significant enough to flag. A field gets renamed in code but not in the spec, or a new required parameter ships without an update to the description. Left unchecked, this drift accumulates until the documentation and the API describe two different systems. Scheduled contract tests are one of the more effective ways to [catch drift between what your OpenAPI description says and what your API does](https://redocly.com/blog/catch-api-drift) before it reaches a customer's integration. Related tooling that pairs AI with monitoring can also help teams [detect drift between your docs and your live API](https://redocly.com/learn/ai-for-docs/ai-detect-drift-docs-live-api), turning a
raw diff into a plain-language summary of what changed.

## Test multi-step workflows, not just single endpoints

Real usage of most APIs isn't a single call made in isolation. A customer logs in, then fetches a resource, then updates it, then confirms the update went through. Testing each endpoint independently can miss failures that only appear when data flows from one step to the next, such as a token that isn't accepted on the follow-up call or a resource ID that doesn't round-trip cleanly. This is where Arazzo, the specification for describing multi-step API workflows, becomes useful alongside Respect: teams can [test multi-step API workflows](https://redocly.com/learn/arazzo/testing-arazzo-workflows) and [define success criteria for each step](https://redocly.com/learn/arazzo/success-criteria-and-failure-handling), so a failure at step three gets reported clearly rather than
buried in a generic error. For teams starting from an existing OpenAPI description, it's possible to [auto-generate a starting workflow from an OpenAPI description](https://redocly.com/docs/respect/commands/generate-arazzo) rather than authoring the whole sequence by hand.

## Close the loop by turning monitoring failures into documentation and spec fixes

A monitoring failure that never becomes a fix is just noise with extra steps. The most useful monitoring setups treat each alert as the start of a small, well-scoped task: confirm whether the bug lives in production, the spec, or the docs, then update whichever one is wrong. Because Respect Monitoring runs against a Git-connected project, a failure can turn into a concrete change quickly. A writer or engineer can [open a pull request with the fix](https://redocly.com/docs/realm/reunite/project/pull-request/open-pull-request), whether that means correcting a schema, updating a description, or patching the API itself, and get it reviewed through the same workflow the team already uses for other docs and spec changes. Over time, this habit of closing the loop is what
keeps the OpenAPI description trustworthy enough to keep testing against.

## Conclusion

Uptime monitoring will always have a place, but it answers a smaller question than most teams assume it does. The more useful question, and the one that protects customers from breakage that's hard to spot, is whether the API still behaves the way its OpenAPI and Arazzo descriptions say it should. That means testing the contract itself, focusing first on the workflows that matter most, scheduling checks so nothing depends on memory, treating drift as something to catch early rather than explain later, and following every failure through to a real fix in the spec or the docs. None of this replaces careful API design or good documentation, but it does keep the two honest with each other after launch, which is usually where the real risk lives.

## FAQs

**Is uptime monitoring the same as API monitoring?**
No. Uptime monitoring only confirms that a server responds within an expected time, while API monitoring in the best-practice sense also checks whether the response body, status codes, and types still match what the OpenAPI description promises. An API can pass every uptime check and still be broken in ways that only show up when responses are validated against the contract.

**What does it mean to monitor an API against its contract?**
It means testing live responses against the schemas, required fields, and status codes already defined in the OpenAPI description, rather than writing separate assertions by hand. Respect works this way: it [checks your API responses match what the OpenAPI description says](https://redocly.com/docs/respect) and reports any mismatches.

**How do I decide which endpoints to monitor first?**
Start with the workflows that would cause the most damage if they broke, such as authentication or checkout, rather than trying to cover every endpoint at once. Reviewing [common monitoring use cases](https://redocly.com/docs/respect/use-cases) can help you scope this first pass before expanding coverage to secondary endpoints.

**What is API drift, and how is it caught?**
Drift is the gradual gap that opens up between an OpenAPI description and the API's actual behavior, often from small changes that never get reflected in the spec. Scheduled contract tests help teams [catch drift between what your OpenAPI description says and what your API does](https://redocly.com/blog/catch-api-drift) before it reaches a customer's integration.

**Can monitoring cover multi-step workflows, not just single requests?**
Yes. Using the Arazzo specification alongside Respect, teams can [test multi-step API workflows](https://redocly.com/learn/arazzo/testing-arazzo-workflows) so that failures which only appear when data flows from one call to the next, like a token that isn't accepted on a follow-up request, get caught and reported clearly.

**What should happen after a monitoring check fails?**
A failure should lead to a concrete fix, not just an acknowledged alert. Once the cause is confirmed, whether it's a bug, a spec error, or outdated docs, a writer or engineer can [open a pull request with the fix](https://redocly.com/docs/realm/reunite/project/pull-request/open-pull-request) and route it through the team's normal review process.

## How Redocly can help

The thesis here comes down to trust: an API's documentation is only as reliable as the checks that keep it honest against what the API actually does in production. Respect offers [continuous API monitoring powered by OpenAPI Arazzo workflows](https://redocly.com/respect), so teams can move from watching a dashboard stay green to knowing, on a schedule, that real responses still match the contract they published.
