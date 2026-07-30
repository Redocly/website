---
seo:
 title: Use AI to serve your docs to coding agents with an MCP server
 description: How Redocly's built-in Docs MCP server turns your API documentation into a live tool coding agents can query directly, and where that beats a static llms.txt index.
---

# Use AI to serve your docs to coding agents with an MCP server

A developer opens Cursor, points it at your API, and asks how to authenticate. Where does the answer come from? Most teams assume it comes from the docs, then quietly hope the agent read the right page instead of inventing a plausible-sounding endpoint that doesn't exist.

Static pages, a copy-pasted spec, or a general index file don't give an agent much to act on, so it does what any model does when it runs short on grounding: it guesses. This article covers what a "Model Context Protocol," or "MCP," server does with your documentation, how to turn on Redocly's built-in version, and why [Redocly's own testing found it beats a static index file](https://redocly.com/blog/llms-txt-overhyped) for this exact job.

## Why a docs page isn't built for a coding agent

A coding agent doesn't read a page the way a person does. It calls a tool and expects a structured answer back, which means a page designed for scrolling and skimming has to be scraped and reinterpreted before the agent can use it at all. That extra step is where mistakes creep in, because the agent is reconstructing structure that the page never explicitly gave it.

Most teams already noticed this problem and reached for `llms.txt`, a Markdown index meant to point AI tools at the right pages, part of the broader case Redocly makes for [rethinking modern API documentation with AI in mind](https://redocly.com/learn/ai-for-docs/ai-modern-api-docs). It's a reasonable idea, but reasonable and effective aren't the same thing, and the difference matters once agents start writing code instead of summarizing text.

## What the Docs MCP server exposes

Redocly closes the distance between a page built for people and a tool an agent can call with the [Docs MCP server](https://redocly.com/docs/realm/customization/mcp-server), generated automatically from the OpenAPI descriptions and Markdown that already make up your documentation, so an agent gets a live tool instead of a page to interpret. Once enabled through the [`mcp` configuration block](https://redocly.com/docs/realm/config/mcp), the server is available at the `/mcp` endpoint on your project's root URL, and tools like Cursor, Claude Code, and VS Code connect to that single address.

Discovery works the same way for any compatible agent: a request to `/.well-known/mcp/server-card.json` returns a standardized "server card" that lists the server's tools, its transport endpoint, and what authentication it requires. An agent reads that card once and knows exactly what it can call next, rather than guessing from a rendered page what operations exist.

## Turn on the server and connect an agent

Enabling the server is a configuration change, not a new integration to build. In `redocly.yaml`:

```yaml
mcp:
  hide: false
  docs:
    hide: false
    name: "Docs MCP server"
```

From there, a reader can connect their own editor without leaving the page. The [`connect-mcp` Markdoc tag](https://redocly.com/docs/realm/content/markdoc-tags/connect-mcp) renders a button that opens a dropdown for Cursor, VS Code, or a copied configuration snippet, so setup is a click instead of a support ticket. Teams with more specific needs can also declare protocol version, tools, resources, and prompts directly in the OpenAPI description with the [`x-mcp` extension](https://redocly.com/docs/realm/content/api-docs/openapi-extensions/x-mcp), which keeps that detail versioned alongside the spec it describes instead of living in a separate config file.

## Before and after: how an agent answers a question

Before: an agent reads a marketing-style API overview page, sees no explicit list of required fields, and tells a developer that a `customer_id` field is required on every order lookup. It isn't, not anymore, and the agent has no way to know that from prose written for a different reader.

After: the same agent, connected to the MCP server, calls a tool that returns the current operation schema directly from the OpenAPI description. The field shows up as optional, because that's what the spec says today, and the agent's answer matches the API instead of an old assumption baked into a paragraph somewhere.

## Why this beats a static index file

Redocly built `llms.txt` support early and then tested it against real use, and the results were candid: no model in that testing spontaneously read or acted on the file on its own, and when someone did paste it in manually, pasting the Markdown docs themselves worked just as well or better. An index file only helps once a person already knows to reach for it, which is a narrow win for something marketed as infrastructure.

Docs MCP servers tested differently, because they give an agent something to call instead of something to read. Redocly's own summary of that comparison put it plainly: the static index was smoke, and the MCP server was fire. That distinction is why this article treats MCP as the mechanism worth building around, and treats `llms.txt` as a smaller, optional addition rather than the main event.

## Serve the right catalog to the right agent

Not every agent asking about your API belongs to the same audience, so the docs feeding it should match, an idea Redocly has already applied to [how developers find and understand APIs faster](https://redocly.com/learn/ai-for-docs/ai-help-developers-find-understand-apis) more broadly. A coding agent working on behalf of a partner or customer developer is an external visitor, and it should reach the same rendered docs, quickstarts, and MCP server that a human developer would land on. An internal agent, one helping an engineer on your own team decide whether to reuse an existing service, needs ownership, status, and duplication context that has no place on a public page.

[Redocly's own writing on API catalogs and agentic software development](https://redocly.com/blog/api-catalogs-agentic-software) makes the internal case directly: a governed catalog can act as the MCP server for an internal platform, letting an agent search available tools at request time instead of hardcoding a fixed list into its system prompt. Redocly's [broader explainer on MCP](https://redocly.com/blog/mcp) is candid about a limit worth repeating here: the protocol itself doesn't enforce access control, so a server that exposes more than intended is a configuration mistake waiting to happen, not a hypothetical. Decide what an agent can reach with the same care you'd use for a human account, and revisit that scope as the catalog grows.

## How Redocly can help

Once you know which audience an agent represents, Redocly gives you a product built for that audience instead of one server trying to serve everyone the same way. [Revel](https://redocly.com/revel), Redocly's external developer portal, is where a coding agent working for a partner or customer developer should land: turn on the Docs MCP server there, and the same portal that renders quickstarts and reference pages for a human also answers an agent's tool calls without a second integration. For internal agents, [Reef](https://redocly.com/reef) is the catalog built to answer "does this API already exist," so an engineering team's coding agents can query real ownership and status data instead of guessing from a name in a repo. Serving docs to coding agents starts with the same choice you already made for humans: know your audience, then choose the product that already puts the right documentation in front of them.
