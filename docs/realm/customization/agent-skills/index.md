---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# Agent skills

Agent skills let AI agents complete tasks in your product — like placing an order or searching your catalog — by following steps you write, not by guessing from your reference docs.

Each skill is a short, task-focused Markdown file named `SKILL.md` that follows the [agentskills.io](https://agentskills.io) format.
You author skills alongside your docs, and Realm publishes them at [standard discovery endpoints](#agent-discovery) so agents can find and load them.

## Add a skill

Place each skill in its own folder under `@skills` at your project root, with the instructions in a `SKILL.md` file:

```treeview
your-project/
├── @skills/
│   ├── orders/
│   │   └── SKILL.md
│   └── menu/
│       └── SKILL.md
└── redocly.yaml
```

Use kebab-case folder names — the folder name determines the skill's [slug](#skill-slugs-and-collisions).
Inside `@skills` folders, Realm matches the filename case-insensitively, so `skill.md` works the same as `SKILL.md`.

You can also add a root skill — a single file at the project root named exactly `SKILL.md`.
A root skill is a good place to orient an agent before it picks a task-specific skill.

## Skill format

Every `SKILL.md` file starts with YAML front matter followed by Markdown instructions.
The body is served verbatim.
Write it for agents: state when to use the skill, then give ordered steps and links to the relevant reference pages.

{% table %}

- Field
- Type
- Description

---

- name
- string
- **REQUIRED.** Display name for the skill.

---

- description
- string
- **REQUIRED.** One or two sentences describing what the skill does and when an agent needs to use it.
  Agents use `description` to decide whether to load the skill.

---

- rbac
- Map[string, string]
- Access rules for the skill, using the same scheme as [page RBAC](../../access/page-permissions.md).
  Requires an Enterprise or Enterprise+ plan.

---

- tags
- [string]
- Labels that group related skills.
  Tags appear in the [agent card](#agent-card).

{% /table %}

A skill that is missing `name` or `description`, or that has invalid front matter, is skipped with a build warning.

### Example

This skill guides an agent through placing a cafe order and is available only to authenticated users:

````markdown {% title="@skills/orders/SKILL.md" %}
---
name: orders
description: >-
  Place a Redocly Cafe order for drinks or desserts and track its status.
  Use when a customer wants to order from the menu or asks about an order they already placed.
rbac:
  authenticated: read
  '*': none
tags:
  - cafe
  - orders
---

# Place a cafe order

## When to use

Use this skill when a user wants to order drinks or desserts from the cafe menu, or check the status of an order they already placed.

## Steps

1. Find the items the customer wants with `GET /menu`. Note the `menuItemId` of each item.
2. Place the order with `POST /orders`. The request body takes `customerName` and `orderItems`.
    Each order item requires `menuItemId` and `quantity`.
3. Track the order with `GET /orders/{orderId}` until its `status` is `completed`.

## Reference

- Cafe API reference: [https://cafe.redocly.com/openapi/cafe](https://cafe.redocly.com/openapi/cafe)
````

## Skill slugs and collisions

Each skill's slug identifies it in the [discovery endpoints](#agent-discovery), as the path segment of the skill's published URL.
The slug depends on where the skill is defined:

- A `@skills` folder's slug is its folder name, converted to a URL-safe form.
- The root `SKILL.md` slug is your project slug.

Slugs must be unique.
If two `@skills` folders produce the same slug, or a folder collides with the root skill, Realm keeps one skill and logs a build warning for the rest.
The root skill always wins a collision.

## Agent discovery

An agent needs only your project URL to discover your skills.
It reads the skills index to see which skills are available, then fetches the `SKILL.md` file for the task at hand.
A2A-compatible agents can start from the agent card instead.

Discovery respects [RBAC](../../access/rbac.md) and the [`skills` configuration](../../config/skills.md).
For agents without access, a protected skill is omitted from the skills index, the agent card, and the MCP resources.
A direct request for its `SKILL.md` returns `404`, as if it doesn't exist.

### Skills index

The skills index is available at `/.well-known/agent-skills/index.json` at your project root and follows the [agentskills.io](https://agentskills.io) discovery schema.

```http
GET https://example.com/.well-known/agent-skills/index.json
```

The following example response lists a single published skill:

```json
{
  "$schema": "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
  "skills": [
    {
      "name": "orders",
      "type": "skill-md",
      "description": "Place a Redocly Cafe order for drinks or desserts and track its status. Use when a customer wants to order from the menu or asks about an order they already placed.",
      "url": "https://example.com/.well-known/agent-skills/orders/SKILL.md",
      "digest": "sha256:dced662f5761ef4a8c0ba4b6168901d131a058a37ef5df58c5ade73cf222152a"
    }
  ]
}
```

Each entry links to the skill's `SKILL.md` and includes a `digest` — a `sha256` hash of the file's contents — so an agent can detect when a skill changes.

### Skill files

Fetch a skill's instructions from the `url` in its index entry.
Each file is served as `text/markdown` at `/.well-known/agent-skills/<slug>/SKILL.md`, where `<slug>` is the [skill's slug](#skill-slugs-and-collisions).

```http
GET https://example.com/.well-known/agent-skills/orders/SKILL.md
```

### Agent card

Realm hosts an [Agent-to-Agent (A2A)](https://a2a-protocol.org) agent card at `/.well-known/agent-card.json`.
The agent card is a standardized JSON document that lets A2A-compatible agents discover your site and its skills in a single request.
It complements the [MCP server](../mcp-server/index.md) with a lightweight discovery layer.

```http
GET https://example.com/.well-known/agent-card.json
```

For an agent with access to the restricted `orders` skill, the following agent card is returned:

```json
{
  "name": "Redocly Cafe docs",
  "description": "Documentation agent card announcing this site's agent skills and MCP server.",
  "url": "https://example.com/a2a",
  "documentationUrl": "https://example.com/",
  "version": "0.0.1",
  "protocolVersion": "0.3.0",
  "preferredTransport": "HTTP+JSON",
  "capabilities": {
    "streaming": false,
    "pushNotifications": false,
    "extensions": [
      {
        "uri": "https://modelcontextprotocol.io",
        "description": "Model Context Protocol server exposing the documentation tools and skills.",
        "params": {
          "url": "https://example.com/mcp",
          "authentication": {
            "required": true,
            "schemes": ["bearer", "oauth2"]
          }
        }
      }
    ]
  },
  "defaultInputModes": ["text/plain"],
  "defaultOutputModes": ["text/plain"],
  "skills": [
    {
      "id": "orders",
      "name": "orders",
      "description": "Place a Redocly Cafe order for drinks or desserts and track its status. Use when a customer wants to order from the menu or asks about an order they already placed.",
      "tags": ["cafe", "orders"],
      "url": "https://example.com/.well-known/agent-skills/orders/SKILL.md"
    }
  ]
}
```

The card's `name` and `description` map from the `title` and `description` fields of your [`seo` configuration](../../config/seo.md).
Each entry in `skills` uses the skill's [slug](#skill-slugs-and-collisions) as its `id`.
When the MCP server requires login, the MCP extension declares its authentication schemes so an agent knows to authenticate.

### Skills as MCP resources

When skills are published, Realm also registers them as resources on the [Docs MCP server](../mcp-server/index.md).
An agent connected over MCP can read each skill as a `text/markdown` resource without fetching the skills index separately.

## Resources

- **[`skills` configuration](../../config/skills.md)** - Hide skills or exclude files from discovery
- **[`mcp` configuration](../../config/mcp.md)** - Enable and configure the Docs MCP server
- **[Model Context Protocol server](../mcp-server/index.md)** - Connect an AI tool to the MCP server that exposes your skills as resources
- **[RBAC concepts](../../access/rbac.md)** - Control which teams and users can access each skill
