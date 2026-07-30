---
seo:
 title: Use AI to test API calls live while you write your docs
 description: Pair AI drafting with Redocly's live "Try it" testing so writers catch broken API examples before they publish, not after.
---

# Use AI to test API calls live while you write your docs

A code sample can look perfect and still be wrong. The endpoint path is right, the headers are right, and the response body matches the schema, but the call fails the moment a reader tries it, because a required field changed last sprint and nobody updated the example.

Most writers find out when a support ticket arrives. By then the example has been live for weeks, teaching readers the wrong thing the whole time.

This article shows how to close that distance while you're still drafting: use AI to spot likely trouble spots and suggest fixes, then confirm every claim against a live "Try it" call before you publish.

## Why an example that reads well can still be wrong

Most API documentation describes what a request should look like, not what happens when someone sends it. A writer copies a request body from an old ticket, adjusts the field names to match the current OpenAPI description, and moves on. The example reads well and passes a casual review, so it ships.

The trouble shows up later. Auth scopes get added, a parameter becomes optional, a response field gets renamed, and the static example doesn't know any of that happened. It keeps describing a version of the API that no longer runs, so a reader who copies it gets an error they can't explain from the page in front of them.

## Test the call while you write it, not after you publish

Redocly gives you a way to close that distance before publishing instead of after it. Run the `preview` command from Redocly CLI while you edit an OpenAPI description, and a local server updates the rendered documentation every time you save. That catches broken formatting and missing fields, but it doesn't tell you whether the request works.

That's what the "Try it" console does. Inside the preview, every operation includes a live console called [Replay](https://redocly.com/docs/end-user/test-apis-replay), where you fill in real parameters and send the request instead of just reading about it. Replay returns the real status code, response body, and headers, so a claim in your prose, such as "this returns a 201 with the new resource ID," either holds up or it doesn't.

### Point Replay at a live server or the mock server

Replay can send that request to a live server, to a built-in [mock server](https://redocly.com/docs/realm/content/api-docs/configure-mock-server), or to another environment you configure, and you switch between them from a dropdown in the console. The mock server helps early, before a staging environment exists or when you'd rather not spend a real API quota on documentation testing, because it generates a response from the examples already in your OpenAPI description.

Once a staging or production environment exists, point the same request at it. When the mock response and the live response disagree, you've found either a documentation problem or a code problem, and you found it before a reader did.

## Where AI fits into the loop

None of this replaces AI. It gives AI something concrete to react to.

Ask an AI assistant to read a new or changed OpenAPI operation and draft the request example, the expected response, and a few edge cases worth testing, such as a missing optional field, an invalid enum value, or an expired token. Treat that draft as a starting point, not a verdict. This is close to how "MCP" already works for developers: a Model Context Protocol server connects an assistant to your documentation and API definitions directly inside the editor, so it can [explore endpoints and test calls](https://redocly.com/learn/ai-for-docs/ai-modern-api-docs) without switching to a browser tab. It's also the same "give AI a task and watch where it fails" logic behind [using AI as a usability tester](https://redocly.com/learn/ai-for-docs/ai-usability-testing), narrowed down to a single call instead of a full workflow.

Run the AI's draft through Replay next. If the assistant assumed a field was required and the live response comes back fine without it, the assistant guessed wrong and the live call wins. If the live call fails in a way the docs don't mention, that's a real problem worth documenting, not something to wave away as a hallucination.

## A workflow: draft, test with AI, confirm live, fix

A workflow that holds up in practice looks like this:

1. Draft or update the OpenAPI operation and its example.
2. Ask AI to check the example against the schema and suggest edge cases: a missing field, a bad type, an expired token.
3. Run `redocly preview` and open the operation in the rendered docs.
4. Send the original example and each AI-suggested edge case through Replay, against the mock server first and the live environment once one exists.
5. Fix whatever Replay disproves, whether that means changing the example or rewriting the prose, and move on.

Before: "Include the `customer_id` field to look up an order." Nothing about that sentence looks wrong on its own. After sending the request through Replay, though, the call succeeds without `customer_id`, because the field became optional last release. The fix: "Include the `customer_id` field to narrow results, or omit it to search across all customers." That exchange, built on the same [before-and-after checklist habit](https://redocly.com/learn/ai-for-docs/ai-reviews) Redocly uses for its own review pass, took less time than writing this paragraph.

## Keep AI advisory, let the live response decide

AI reads a spec well and guesses where readers will get stuck, but it has no way to know whether your server behaves the way the spec says it will, and it states a wrong guess as confidently as a correct one. Treat every AI-drafted example and edge case as a hypothesis, then let Replay or a live call confirm or rule it out.

This also protects against a subtler risk: AI trained on general API patterns may suggest a response format that has nothing to do with your API. A live call catches that right away, while a reviewer skimming for tone might not notice at all.

The pattern holds beyond API examples. Wherever you can point AI at something checkable, a live request, a build log, a rendered preview, its answers get more useful and its mistakes get cheaper to catch. A prose-only review can't offer that same check, because there's nothing underneath the words to test them against.

## How Redocly can help

The "Try it" console and mock server, both part of [Redoc](https://redocly.com/redoc), turn every code example on the page into something a writer can run before publishing instead of something that merely reads well. Pair that with [Redocly CLI](https://redocly.com/redocly-cli)'s local `preview` command, and you can test a request the moment you change the OpenAPI description behind it, catching a stale example or a mismatched claim while the change is still fresh instead of after a reader files a ticket.
