---
seo:
 title: Use AI to track your docs' visibility in AI search
 description: Run a weekly Phronesis-style assistant panel so you can score AI search visibility, catch misses, and turn every fail into a docs PR.
---

# Use AI to track your docs' visibility in AI search

When a developer asks an assistant how to authenticate or set up webhooks, the answer may invent a header, skip a required step, or never mention your site. Screenshots of one lucky chat do not tell you whether that is a rare miss or a weekly pattern.

Docs teams need a program with the same discipline as dogfooding: a frozen set of tasks, the same rules for what the assistant may see, a pass or fail mark, and a docs change for every fail. This article adapts Redocly's [Phronesis](https://redocly.com/blog/phronesis) habit to assistants so you can track whether your published docs still show up in AI search answers that matter.

## Borrow Phronesis for assistants

At Redocly, Phronesis pairs work through a real customer workflow each week, write a debrief, and share findings company-wide. That practice built product empathy and coincided with a large jump in free-trial conversions, as described in the [Phronesis](https://redocly.com/blog/phronesis) write-up.

You can run a lighter version for documentation visibility. Instead of employees clicking through the product UI, assistants attempt the same developer tasks using only public docs. When they fail, you learn which pages are invisible, incomplete, or easy to misread in AI search. The method overlaps [Use AI to test your documentation's usability](https://redocly.com/learn/ai-for-docs/ai-usability-testing), with one added requirement: keep a week-over-week score so visibility trends are visible in planning, not only in Slack threads.

## Freeze a task panel from real demand

Invented prompts invent strategy. Pull ten to twenty tasks from onboarding checklists, top support tickets, and the docs pages that already earn organic clicks. Write each task the way a stranger would ask it, without pasting your URL, and name the page that should carry the answer if the assistant does its job.

Keep the panel stable for at least four weekly runs before you swap tasks. Example rows:

```text {% process=false %}
AUTH-01: Obtain an OAuth access token for the sandbox and call GET /me
WH-02: Create a webhook for order.created and verify the signature
ERR-03: Recover from a 429 with the documented backoff rules
```

Cap the list so a human can review every fail in under an hour. A short panel you finish beats a long panel you skip.

## Give assistants only public docs

For a fair visibility test, the assistant should not receive private runbooks or Slack lore. Two access modes work:

1. Paste the relevant public Markdown or HTML into the session (or point the model at a short allowlisted set of URLs).
2. Connect an MCP server that serves published docs, with strict tool permissions so the agent cannot reach internal systems.

Treat MCP as experimental access plumbing. Redocly's MCP guidance stresses permission boundaries and careful scoping, so start with read-only docs tools and keep sensitive operations out of the server. Publishing an [llms.txt](https://redocly.com/blog/llms-txt-overhyped) file does not replace this loop: manifests help discovery hygiene, but weekly task scores tell you whether assistants still complete work from your pages.

## Score pass, fail, and clarifying questions

For each task and assistant, record:

1. Pass or fail against a written success criterion (token obtained, signature verified, backoff applied).
2. Whether your domain or expected URL appeared in citations.
3. Clarifying questions the assistant asked (often missing prerequisites or ambiguous steps).

A citation with a wrong procedure is still a fail. A correct procedure with no citation still means discoverability is weak even when teachability is strong. Keep ChatGPT, Perplexity, and other assistants in separate columns so one surface's win does not hide another's miss.

Store the raw answer next to the score. Without evidence, the weekly review becomes opinion theater.

Report a simple weekly rollup: tasks attempted, pass rate per assistant, top three clarifying questions, and links to open docs PRs. That one page is enough for a docs lead to defend investment without inventing a vanity "AI visibility" percentage.

## Turn every fail into a docs PR

A fail that does not open a pull request will return next week. For each miss, write a one-line defect and a Before/After tied to the task.

Before: webhook guide lists events but never names the signature header or verification steps.

After: the page opens with a short answer capsule, then numbered verification steps, then a sample payload, then a link to the OpenAPI operation that defines the fields.

Validate the OpenAPI side with [Redocly CLI](https://redocly.com/redocly-cli) when the fix depends on the contract, publish, and re-run the same task the following week. This matches the publish-once idea in [How AI fits into modern API documentation](https://redocly.com/learn/ai-for-docs/ai-modern-api-docs): humans and assistants should share one trustworthy surface. Align portal browse paths with [Use AI to help developers find and understand your APIs faster](https://redocly.com/learn/ai-for-docs/ai-help-developers-find-understand-apis), because both journeys rest on the same pages.

## Best practices

Make the weekly run a calendar event with an owner, the same way Phronesis protects time on the team calendar.

Version the task panel in git next to the docs so prompts change with the product.

Require evidence packs before anyone claims a visibility win in sprint planning.

When two assistants disagree on the same task, ask whether your page states the answer in extractable steps before you blame ranking luck.

Rotate one new task in each month from fresh support tickets, and retire one task that has passed for four straight weeks, so the panel stays tied to current product pain without resetting the trend line.

## Summary

AI search visibility becomes measurable when you treat it like Phronesis for assistants: a frozen task panel, public-docs-only access, pass or fail scoring, and a docs PR for every miss. Start with ten tasks, one weekly hour of review, and three Before/After fixes, then grow the panel only as fast as you can remediate.

## How Redocly can help

[Revel](https://www.redocly.com/revel) is the external developer portal where partners meet structured quickstarts, search, and assistant-ready pages. When your weekly panel fails on authentication or webhooks, fix those pages in the same surface humans and assistants already use, so the next run can prove the edit landed.
