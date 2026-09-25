---
template: '../@theme/templates/BlogPost'
title: "How AI agents should handle API discovery"
description: "Agents pick an endpoint from the fields they can query. A catalog has to expose status, ownership, and tags so a retired API is visible before the call."
seo:
  title: "How AI agents should handle API discovery | Redocly"
  description: "How AI agents should discover APIs through governed catalogs that expose status, ownership, and tags as fields an agent can query."
author: adam-altman
publishedDate: "2026-09-24"
categories:
  - api-catalog
  - internal-developer-portal
  - technical-documentation:ai-assisted-docs
---

# How AI agents should handle API discovery

## Key takeaways

- Agents lack organizational intuition, so a flat list of similar-sounding endpoints leads them to pick a "best fit" by semantic similarity — an ambiguity a human would resolve with a quick question becomes a silent failure for an agent.
- Once agents can invoke tools, an API catalog becomes an active system of record that defines what an agent can see, touch, and never reach.
- Machine-readable discovery layers — MCP servers, agent cards, llms.txt files, and skill files — let agents read structured metadata.
- A stale catalog entry sends an agent to a retired endpoint, which returns a 404 mid-task with no colleague to ask — and the workflow collapses.
- Governance controls like role-based visibility and ownership metadata determine which APIs an agent can see.

Most docs orgs built their API catalogs, portals, and reference pages for you — a reader who could ask a colleague when something looked ambiguous. An agent cannot ask a teammate which of two similar endpoints is the one still in use. It reads what's in front of it, picks the option that looks closest to a match, and calls that endpoint. As agents start calling APIs on their own, the industry is running into a discovery problem that reference docs alone were never built to solve, and the fix runs through governed, machine-readable catalogs.

## Why AI agents can't discover APIs the way people do

### Human intuition vs. machine literalism

A developer who lands on an unfamiliar API surface brings context that never appears in any spec: which team owns which service, which endpoint is the "real" one versus the one someone forgot to deprecate, and who to ping when two options look interchangeable. People usually get that context from their team: who owns the service, which endpoint was deprecated, and who to ask when two names look the same. That is what lets them skip the old option before they call it.

An agent never sees who owns a service, which endpoint was left deprecated, or who a person would ask. Given a flat list of similar-sounding endpoints, an agent will pick a "best fit" based on semantic similarity in names and descriptions. An ambiguity a human would resolve with a two-line Slack message becomes, for an agent, a decision made silently and confidently in the wrong direction.

### What happens when an agent guesses wrong

A wrong call often still returns a response, so the mistake is easy to miss at the moment it happens. An agent doesn't raise a hand and ask for clarification the way a new hire might; it calls the endpoint that matched, gets a response, and keeps going. If that endpoint is deprecated, scoped for a different environment, or simply the wrong tool for the job, the error surfaces downstream — in a broken workflow, a security exception, or data written to the wrong place — long after the decision that caused it. [Why API catalogs are critical for agentic software development](https://redocly.com/blog/api-catalogs-agentic-software) describes zombie APIs — old, overlapping, or undocumented endpoints that humans learned to route around but that agents call anyway because nothing tells them not to.

## What "handling API discovery" actually means for an agent

### Reading structured metadata

Handling discovery well means giving agents something other than paragraphs to parse. Reference docs are written for a reader who can skim, infer, and ask questions; an agent works best against structured metadata — tags, ownership fields, status flags, and machine-readable descriptions that don't require inference. A portal renders pages for a person. A catalog stores tags, ownership, and status as fields an agent can query before it chooses an endpoint.

### Telling "available" apart from "deprecated" and "security-critical"

Metadata only helps if it answers the questions that matter before a call goes out: is this endpoint still live, is it deprecated in favor of something else, and does it touch anything sensitive enough to require an extra permission check? Without those signals encoded somewhere an agent can read, "available" and "deprecated" look identical from the outside, and "security-critical" isn't visible at all. OWASP lists improper inventory management as a top API security risk, and that risk gets sharper once agents are the ones finding and calling endpoints nobody remembered to retire.

## The building blocks agents need to discover APIs safely

### A centralized, governed API catalog as the system of record

Once agents can invoke tools, an API catalog operates as an active system of record — the thing that decides what an agent can see, what it's allowed to touch, and what stays permanently out of reach. Our research shows [a governed API catalog becomes the system of record agents rely on](https://redocly.com/blog/api-catalogs-agentic-software), reporting a return in the range of 24:1 to 52:1 on comprehensive catalog work once avoided rebuilds and velocity gains are counted, and citing Australia Post's reported drop in portal bounce rate from roughly 30% to under 2% after automating catalog publishing — a metric that maps closely to how often an agent picks the right endpoint on the first try. A catalog works as a system of record when one place holds the status, the owner, and the current endpoint for every API an agent might call.

### Machine-readable discovery layers: MCP servers, llms.txt, agent cards, skill files

Standardizing on machine-readable discovery layers is what lets agents read structured metadata. The Model Context Protocol (MCP) gives agents a standard way to discover which tools a service exposes and how to call them: Our projects now ship [a built-in MCP server that ships with every project](https://redocly.com/blog/ai-features-summer-2026), publishing [a server card that lets agents discover the MCP server's tools and capabilities](https://redocly.com/docs/realm/customization/mcp-server) without a human pasting in a URL. llms.txt files play a narrower, complementary role: a plain-text file at a site's root that points an agent to the pages worth reading first, without the two-way handshake MCP provides. Alongside MCP and llms.txt, agent cards (following the A2A pattern) and [task-focused skill files agents can follow](https://redocly.com/docs/realm/customization/agent-skills) round out the layer agents actually read — SKILL.md-style files that describe how to do a task.

### Consistent schemas and naming so agents don't burn reasoning on translation

None of that metadata helps if every team names things differently. When an agent has to translate customer_id in one service and custId in another before it can even compare options, it's spending reasoning budget on translation. Keeping the underlying OpenAPI descriptions consistent through linting and shared naming conventions is what makes discovery reliable. Our Code mode for MCP shows the efficiency stakes directly: agents that [combine several discovery calls into a single script](https://redocly.com/blog/mcp-code-mode) cut LLM costs by up to 80% on documentation tasks, without a quality tradeoff the source calls out — savings that come from consistent, script-friendly schemas as much as from the code-mode pattern itself.

## Governance as a discovery filter

### Role-based visibility and permission boundaries

Governance controls — role-based access, ownership metadata, scorecards — decide which APIs an agent can see. We give teams a way to [control which skills are published for discovery](https://redocly.com/docs/realm/config/skills), which means an agent operating with a support-tier role never sees the internal billing-admin endpoint at all.

### Keeping the catalog fresh so discovery doesn't collapse mid-workflow

Once agents are the ones calling APIs, a catalog entry that still points at a retired endpoint makes them fail in the middle of the task. A human who hits a stale link asks a colleague and moves on; an agent that calls a catalog entry pointing at a retired endpoint gets a 404 mid-task and has no colleague to ask. The task stops there, because the agent can only retry that same call or stop. Keeping catalog entries current — automatically — is what keeps that failure from happening in production.

## A practical starting checklist for agent-ready API discovery

Docs orgs starting this work can check a short list before calling anything "agent-ready": a centralized catalog that agents can query directly; structured status metadata (available, deprecated, security-critical) attached to every entry; a published MCP server or agent card so agents can discover tools and skills without manual setup; consistent naming and schemas enforced through linting; role-based visibility so agents only see what they're scoped to use; and an automated freshness check that catches drift before an agent does.

## FAQs

### What's the difference between an API portal and an API catalog when AI agents are the audience?

A portal renders documentation for a person to read, skim, and infer meaning from. A catalog exposes the same information as structured, queryable metadata — tags, ownership, status flags — built for a system to query directly. When agents are the audience, an agent can't infer what a portal only implies, so the catalog has to expose status, ownership, and tags as fields the agent can query.

### Why can't an AI agent use the same intuition a human developer uses to pick between similar-looking APIs?

Human intuition about which endpoint is "the real one" comes from organizational context that never makes it into a spec: who owns what, which service is deprecated, and who to ask when something looks ambiguous. Agents work only from what's written down, so a flat list of similar-sounding endpoints leaves them picking a "best fit" by semantic similarity.

### What is MCP, and how does it relate to API discovery for agents?

The Model Context Protocol gives agents a standard way to discover which tools a service exposes and how to call them. Our projects publish a server card so agents can find an MCP server's tools and capabilities on their own, which is what makes [a built-in MCP server that ships with every project](https://redocly.com/blog/ai-features-summer-2026) useful for discovery.

### How do agent skills and agent cards let agents discover a service on their own?

Agent skills are SKILL.md-style files that describe how to complete a task step by step, and agent cards (following the A2A pattern) describe what a service can do and how to reach it. Together they give an agent [task-focused skill files agents can follow](https://redocly.com/docs/realm/customization/agent-skills), so it doesn't need a human to paste in a URL or explain the workflow first.

### What metadata does a catalog need to be "agent-ready"?

At minimum, a catalog needs status flags (available, deprecated, security-critical), ownership information, and consistent tags and naming across services. Without those signals, an agent can't tell a live endpoint from a retired one, and OWASP's improper-inventory-management risk becomes a live problem the moment agents are doing the calling.

### How does governance (RBAC, scorecards) act as a discovery filter for agents?

Role-based access and ownership metadata decide what the agent can see in the first place. A properly scoped catalog lets teams [control which skills are published for discovery](https://redocly.com/docs/realm/config/skills), so a support-tier agent never sees a billing-admin endpoint at all.

## How we can help

Reef gives teams [an internal catalog with scorecards and API Scout](https://redocly.com/reef) that surfaces hidden, underused, or duplicate APIs and attaches the metadata agents need to tell "available" from "deprecated" or "security-critical". Those fields tell an agent whether an API is available, deprecated, or security-critical before it makes the call.
