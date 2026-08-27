---
seo:
 title: Use AI to serve your docs to coding agents with an MCP server
 description: What an MCP server exposes to coding agents, how to decide which docs pages belong on it, and why Redocly treats MCP as promising but still experimental.
---

# Use AI to serve your docs to coding agents with an MCP server

A coding agent working inside an editor hits the same wall a new hire does: it needs one specific fact, right now, and stopping to ask a person breaks its flow. A "Model Context Protocol" (MCP) server answers that need directly, because it gives the agent a live, queryable connection to your published docs instead of a static snapshot memorized during training. Point that server at the right pages, and the agent pulls a current authentication example on demand rather than guessing from an outdated blog post.

This article covers what a docs-serving MCP server exposes, how to decide which pages belong on it, and where Redocly's own caution about MCP still applies. You will come away with a short checklist for a first, narrow deployment and the questions worth asking before you widen it.

## What an MCP server gives a coding agent

MCP follows a client-server pattern. An "MCP client," usually built into the coding agent or IDE, sends requests over a standard JSON interface, and an "MCP server" answers by exposing tools, documents, or APIs in a machine-readable form. For a docs use case, that server typically offers a narrow set of read tools: search the docs, fetch a page, list endpoints, or look up an error code.

That narrow scope is a sensible place to start, because over half of MCP tools in use today just expose documentation or basic static data. That statistic makes a docs-only server one of the more proven categories of MCP use rather than an experimental edge case. The agent's client calls those tools mid-task, gets back real content from your published docs, and folds the answer into whatever it is building instead of inventing an endpoint name that does not exist.

## Choosing which pages to expose

Not every page belongs on the server, since a page written for skimming will not survive being handed to a tool that cannot skim. [Use AI to help developers find and understand your APIs faster](https://redocly.com/learn/ai-for-docs/ai-help-developers-find-understand-apis) makes the case for task-shaped pages, where each page answers one question on its own, and that same structure is what makes a page worth exposing to an agent. A page that already tells a human "here is how to get an access token" in one screen will serve an agent just as well, while a page that assumes the reader already read three prior chapters will confuse both.

### Start with pages that already answer one task

Begin with the 10 to 15 pages your team already trusts: authentication, the quickstart, rate limits, and the error reference. Leave out anything built for browsing, like a long changelog or a marketing overview, because an agent has no way to skim and will quote whatever paragraph the search tool hands it. An "llms.txt" file, [a machine-readable index redocly.com publishes](https://redocly.com/llms.txt) at the site root, is a useful pattern here, since it lists only the stable entry points you want tools to find first rather than every page you have ever shipped. For more on shaping individual pages so a model quotes the right snippet, see [optimizations to make to your docs for LLMs](https://redocly.com/blog/optimizations-to-make-to-your-docs-for-llms).

## Keeping the source deterministic

An MCP server should read from the same published docs that humans read, not a separate copy that quietly drifts out of sync. That guarantee only holds if the underlying OpenAPI description stays accurate, which is a job for deterministic tooling rather than AI judgment. Redocly CLI lints and validates the spec so the pages your server serves match what the API does, an idea covered in more depth in [how AI fits into modern API documentation](https://redocly.com/learn/ai-for-docs/ai-modern-api-docs).

At Redocly, we run an internal AI assistant alongside MCP servers that answer engineering questions about our own APIs, components, and async events, and they act as a first line of support before a question reaches a subject-matter expert. That first line only holds up because the docs behind it are validated before they publish, not after an agent has already repeated them to an engineer as fact.

## Take the security caution seriously

MCP is genuinely useful, but it is also young, and [our own review of MCP](https://redocly.com/blog/mcp) is candid about where it still falls short. One documented incident involved a misconfigured MCP server that exposed internal tools to broader access than intended. That was not prompt injection; it was a plain permissions-scope mistake in how the tools were described and invoked, which matters because the protocol itself does not enforce access control, so that responsibility sits with whoever builds the server.

For a docs server, keep the scope narrow on purpose. Expose read-only tools against public or already-approved content, skip anything that touches internal systems or write actions, and review those boundaries the same way you would review a new public API. Redocly's advice holds here too: read the full spec, review security boundaries carefully, and ask whether a simpler direct integration would serve just as well before you reach for MCP by default.

## A narrow first deployment

A first deployment can stay small on purpose:

- Point the server at pages you already publish through your developer portal, not an internal draft.
- Limit tools to search and fetch, so the agent can find and read a page but never modify anything.
- Maintain a short, curated index, similar to llms.txt, so the server surfaces your best pages first.
- Log the queries agents make, then fix the pages that keep coming up empty or unclear.

Each of these choices trades a little reach for a lot of control, and that trade is worth making until you have evidence the narrow version is limiting agents in practice.

## Where an MCP server cannot help

An MCP server delivers your docs faster, but it does not fix docs that were already unclear. If your error reference leaves out a status code, the agent will guess at the missing piece exactly the way a confused human would, only faster and with more confidence. A reader gets no signal that the answer came from a missing entry in your docs rather than a real fact, because the agent states the guess just as confidently as it states anything else. Running the same task-based checks described in [use AI to test your documentation's usability](https://redocly.com/learn/ai-for-docs/ai-usability-testing) against the pages you expose through MCP is a practical way to catch that problem before an agent surfaces it in front of a customer.

The tradeoff running through all of this is reach against control: a wider MCP server puts more of your docs in front of more agents, but every page you add is a page whose accuracy and scope you now have to keep defending. Start narrow, prove the value, then widen deliberately instead of all at once.

## How Redocly can help

Once you decide which pages an MCP server should expose, the underlying developer portal still has to hold up its end. [Revel](https://redocly.com/revel), Redocly's external developer portal, gives you a published, structured surface built for task-shaped search, so an MCP server pointed at Revel pages returns the same accurate authentication steps and quickstarts your human readers already rely on. For internal-only agents, [Reef](https://redocly.com/reef) plays the same role as a catalog, tracking ownership and scorecards so an agent querying it knows which API is current before it recommends one to a developer.
