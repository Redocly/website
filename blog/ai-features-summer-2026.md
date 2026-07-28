---
template: ../@theme/templates/BlogPost
title: "Your docs, ready for AI agents: what we shipped and what's next"
description: Developers ask AI before they open your docs. Here's everything Redocly shipped in two months to make your documentation the source AI tools trust, and the roadmap for what agents will do next.
seo:
  title: "Your docs, ready for AI agents: what we shipped and what's next"
  description: Developers ask AI before they open your docs. Here's everything Redocly shipped in two months to make your documentation the source AI tools trust, and the roadmap for what agents will do next.
author: illia-nykonchuk
publishedDate: '2026-07-28'
categories:
  - redocly:product-updates
---

# Your docs, ready for AI agents: what we shipped and what's next

Where does a developer go first with an API question today?
Increasingly, not to your docs.
They ask Claude, Codex, or Cursor, and they trust whatever comes back.

That puts a hard question to every API team: when an AI answers about your API, is it reading your documentation, or guessing?

We've spent the last two months making sure it's reading.
Here's what shipped, and where it's heading.

## Your docs are an MCP server

Projects ship with a built-in [Docs MCP server](https://redocly.com/docs/realm/customization/mcp-server) at `/mcp`.
There's nothing to build and nothing to host: point an AI tool at your docs and it can search pages, list APIs, and read endpoint details directly from the source of truth, with your RBAC rules enforced on every call.

In just two months, the server got substantially more capable:

- **GraphQL support.** The Docs MCP server is no longer OpenAPI-only. Agents can now list your [GraphQL APIs](https://redocly.com/docs/realm/content/api-docs/add-graphql-docs), browse types, and read whole schemas.
- **Multi-version APIs.** Projects that document several versions expose all of them, so agents answer against the version your user is actually on.
- **Search that respects locales.** An English question no longer pulls back the same page in every translation.

### Connecting takes less than a minute, and stays connected

A capable server is worthless if people give up while connecting to it, so we removed the friction point by point:

- Opening `/mcp` in a browser now shows a **setup page** with one-click setup for popular tools like VS Code and Cursor, instead of raw JSON.
- Clients that support Client ID Metadata Documents **connect without any registration step**.
- Access tokens **refresh automatically**. Sessions used to expire mid-conversation and force a re-login; now they just keep working.
- Tools carry **standard MCP annotations**, so AI clients know which are safe to call without confirmation.

The whole thing is [configurable in one place](https://redocly.com/docs/realm/config/mcp), and you can put a [connect button](https://redocly.com/docs/realm/content/markdoc-tags/connect-mcp) right on your pages.

## Discoverable by the whole agent ecosystem

The next generation of agents won't wait for a human to paste in a URL. They'll discover services on their own, and a Redocly project now introduces itself:

- An **MCP server card** and an **A2A agent card** describe what your project offers, in the standard formats agents already look for.
- **[Agent skills](https://redocly.com/docs/realm/customization/agent-skills)** go a step further: drop task-focused skill files into an `@skills` folder, and agents follow the steps you wrote instead of guessing from reference docs.

## Content that LLMs actually understand

MCP is one door into your docs; [`llms.txt`](https://redocly.com/docs/realm/config/seo) is the other, and we made what's behind both doors better:

- `llms.txt` output now includes **OpenAPI code samples and response samples**, and correctly renders `oneOf` and discriminator schemas: exactly the parts of an API description agents used to trip over.
- Custom Markdoc tags can define their **own LLM rendering** with `renderForLlms`, with locale support. If you built a custom component, its content is no longer invisible to AI.

## An AI Assistant in Reunite that knows your setup, not just our docs

The AI Assistant in Reunite got smarter.
It now answers from your setup: your plan and subscription, your members, your build logs, and your project configuration.

Questions that used to mean opening a support ticket and waiting for a reply now get answered instantly.
Ask "why did my build fail?" and you get your build's answer, not a generic troubleshooting page.
And when a human really is needed, the **Contact support** option appears the moment the assistant decides so.

## Where this is heading

Everything above makes your docs something agents can _read_.
The next wave makes them something agents can _act through_:

- **Gateway MCP.** Agents stop just reading about your API and start calling it, with your documentation as the interface. Your docs become the fastest way for any AI tool to integrate with your product.
- **Code mode.** Instead of a long chain of tool calls, an agent writes a short script that runs in a sandbox and chains the calls itself. Same answers, a fraction of the tokens, ships alongside Gateway MCP.
- **Custom MCP tools.** Add your own tools to your project's MCP server, so agents can do what's specific to your product, not only what's built in.
- **Maintainer.** An agent that watches the signals your docs already produce (search queries, feedback, page analytics, support questions), finds the real gaps, validates them and opens pull requests with fixes. Docs that improve while you sleep.
- **Embeddable AI Assistant.** The assistant that answers from your docs, on any website, with a single script tag.

## Try it in the next five minutes

Open `/mcp` on your Redocly project, follow the setup page, and ask your AI tool a question about your own API.
That's the whole setup.

Useful links:

- [Docs MCP server documentation](https://redocly.com/docs/realm/customization/mcp-server)
- [Agent skills documentation](https://redocly.com/docs/realm/customization/agent-skills)
- [Redocly changelog](https://redocly.com/docs/realm/changelog)
