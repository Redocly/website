---
template: '../@theme/templates/BlogPost'
title: "How an MCP server connects AI agents to your API documentation"
description: "An MCP server lets agents query current API docs at request time, with the same access rules as the portal."
seo:
  title: "How an MCP server connects AI agents to your API documentation | Redocly"
  description: "How an MCP server connects AI agents to live API documentation, including Docs MCP, role-based access, and code mode."
author: adam-altman
publishedDate: "2026-09-24"
categories:
  - technical-documentation:ai-assisted-docs
  - api-specifications:contract-patterns
---

# How an MCP server connects AI agents to your API documentation

## Key takeaways

- An MCP server turns your API documentation into a live, callable interface, so agents pull current facts from your source of truth.
- We generate a Docs MCP server automatically from your existing OpenAPI descriptions and docs content, and enforce it with the same role-based access control that already governs your portal.
- Server-log evidence shows agents reach documentation through MCP far more often than through llms.txt, which sees close to no genuine AI request traffic by comparison.
- Code mode lets an agent write a script against MCP tools, cutting LLM cost by up to 80% on multi-step documentation questions.
- Tools like introspect-mcp record a running MCP server's tools, prompts, and resources into version-controlled OpenAPI content that CI can lint alongside the rest of the spec.

## Models answer from an old snapshot of your API

Most large language models are trained on a snapshot of the internet, frozen months before anyone asks them a question. When someone asks an AI assistant how to authenticate against a company's API, the model doesn't check that company's live docs: it reaches into whatever version of those docs, or something close enough, made it into training data, sometimes a year or more out of date. The result is confident-sounding prose that cites an endpoint that moved, a parameter that got renamed, or an auth scheme the API dropped two releases back.

This is the knowledge-cutoff problem: models generate the statistically likely answer, which isn't always the current one. Any API whose docs changed after the model's training cutoff has this problem. The model needs a live query against the current docs at the moment someone asks.

## What an MCP server is

The Model Context Protocol was donated by Anthropic to the Agentic AI Foundation, a Linux Foundation directed fund co-founded by Anthropic, Block, and OpenAI, as a standardized way to connect AI systems to external data sources and tools, according to its Wikipedia entry. Under that standard, a client (usually embedded inside the AI agent itself) sends structured requests to a server, and the server exposes a defined set of tools, resources, and prompts the agent can call. An OpenAPI file describes an interface for a human or a code generator to read once, while an MCP server is a live endpoint the agent queries at the moment it needs an answer. Teams that want that structure visible can use the x-mcp extension to [describe an MCP server's tools, resources, and prompts in the OpenAPI description](https://redocly.com/docs/realm/content/api-docs/openapi-extensions/x-mcp) itself, which keeps that surface next to the rest of the API reference.

## How an MCP server exposes API documentation specifically

Applied to documentation, an MCP server turns a set of docs pages and an OpenAPI description into something an agent can call directly. We generate this automatically: every project now ships with [a built-in Docs MCP server available at /mcp on every project](https://redocly.com/blog/ai-features-summer-2026), built from the same OpenAPI descriptions and content that already power the docs site, so there's no separate content pipeline to maintain. You can [enable the Docs MCP server and connect an AI tool to it](https://redocly.com/docs/realm/customization/mcp-server) directly from your project, without standing up separate infrastructure. Once an agent connects, it can search pages, list the APIs a project exposes, and read endpoint details on demand, the same information a developer would eventually find by browsing, retrieved live instead and scoped to exactly the question that was asked.

## Inside a real request: from agent question to grounded answer

The straightforward way an agent uses an MCP server is tool calling: it asks a question, the server offers a tool it can invoke, the agent calls that tool, reads the result, and decides whether it needs another call. For a multi-step question (which endpoints changed in the last release and what should an integration update in response), that pattern can mean dozens of round trips, each one adding tokens and latency. We built an alternative for our own Docs MCP server: code mode lets the agent write a short script against the available tools, then run that script once and read the combined result. In measured use, [code mode cut LLM costs by up to 80% on documentation questions](https://redocly.com/blog/mcp-code-mode), with one internal audit example dropping from 39 client-visible tool calls and $0.27 per audit down to 3.5 calls and $0.06, at equivalent or better answer quality. When a question needs more than one lookup, one script against the tools costs less than a chain of separate calls.

## Access control for an MCP server

Turning documentation into something an agent can call directly means deciding who can reach it and how much they can see. If your Docs MCP server touches internal or partner-only APIs, it needs the same guardrails as the portal that already limits who can read them. We enforce this by checking bearer tokens and letting a team [restrict which teams can reach the MCP server with role-based access control](https://redocly.com/docs/realm/config/mcp), so an authenticated client only receives the descriptions, schemas, and search results its team is already permitted to see; when a project restricts anonymous access, unauthenticated requests to /mcp get a 401. The server card is the manifest an agent reads first to learn what a server offers: it lists what exists, while access control decides what comes back once the client asks.

## MCP vs. llms.txt: which one gets agent traffic?

Docs teams spent much of the last two years debating llms.txt, a proposed convention for a plain-text summary file aimed at AI crawlers. Server-log evidence complicates that story: [agents reach documentation through MCP far more often than through llms.txt](https://redocly.com/blog/llms-txt-still-overhyped), which sees close to no genuine AI request traffic by comparison. llms.txt is a static file an agent might fetch once and still misread or outgrow, while an MCP server is a live interface the agent queries fresh every time, scoped to the specific question in front of it. If you can only staff one of the two, put the effort into the MCP server: that is the path the logs show agents actually requesting.

## Getting started without overexposing your API

Start with one API: connect it against the docs you already treat as public reference, then widen scope once you've written and tested role-based access rules against real clients.

Redoc 3.0 helps answer what an agent would see, since it's built to [render MCP alongside OpenAPI, GraphQL, and AsyncAPI in one interface](https://redocly.com/redoc-ce), so a team can inspect a server's surface the same way it reviews the rest of its spec. Before publishing a server's tool set more broadly, use a command like introspect-mcp to [ask a running MCP server what it can do and record the answer automatically](https://redocly.com/blog/introspect-mcp) into the OpenAPI description. That turns an otherwise invisible surface into ordinary, version-controlled OpenAPI content that CI can lint and a reviewer can check on every pull request, the same discipline docs orgs already apply to the rest of the spec, now extended to what the agent-facing side of the project is allowed to do.

## FAQs

### What is an MCP server, in plain terms?

An MCP server is a live endpoint the agent calls for an answer, and the server replies from the docs and OpenAPI description you publish now. Under the client-server model, the agent's embedded client sends a request, and the server answers from the same OpenAPI descriptions and content behind the docs site, so the response reflects what's true right now.

### How is an MCP server different from a REST API or OpenAPI file?

An OpenAPI file is something a human or a code generator reads once, up front, to understand the shape of an API. An MCP server is queried at the moment the agent needs an answer, and it can search pages, list APIs, and read endpoint details on demand.

### Does adding an MCP server replace my existing API documentation?

It sits alongside the docs a team already publishes and reads from the same source. Our Docs MCP server is generated from the OpenAPI descriptions and content that already power the docs site, so the agent-facing surface and the human-facing docs stay in sync by construction.

### Is it safe to expose an MCP server for internal or authenticated APIs?

It can be safe when the MCP server enforces the same access rules as the portal. A Docs MCP server needs the same guardrails as the portal it's built from: bearer tokens and role-based access control that limit which teams can reach it, so a client only gets back what its team is already permitted to see, and an unauthenticated request to a restricted project's /mcp endpoint gets a 401.

### Do I still need llms.txt if I already have an MCP server?

Server-log evidence suggests llms.txt is doing very little work compared with MCP: agents reach documentation through MCP far more often than through llms.txt, which sees close to no genuine AI request traffic. A static summary file is something an agent might fetch once and still misread, while an MCP server answers the specific question in front of it every time, which is likely why the traffic difference looks the way it does.

### What is code mode for MCP, and why does it lower cost?

Code mode lets an agent write a short script against the available MCP tools and run it once. In measured use that cut LLM costs by up to 80% on documentation questions, with one audit example dropping from 39 tool calls and $0.27 down to 3.5 calls and $0.06 at equivalent or better answer quality. When a question needs more than one lookup, one script against the tools costs less than a chain of separate calls.

## How we can help

Once agents can query documentation directly, the next question most teams face is where external developers and their agents go to find that documentation in the first place. Revel is our external developer showcase, and it gives outside developers a dedicated place to browse an API, one that an MCP-connected agent can query the same way, so both the human evaluating an integration and the agent helping them work from the same live, current source. Reef offers the equivalent internal catalog for teams that need that same MCP-driven discovery inside the company. If external adoption is the goal, [showcase your API documentation to external developers and their agents](https://redocly.com/revel) with Revel.
