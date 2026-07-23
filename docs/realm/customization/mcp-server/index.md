---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
description: Expose your API documentation to AI assistants through the built-in Docs MCP server.
---

# Model Context Protocol server

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Model Context Protocol (MCP) is a standard that connects AI assistants to external data and tools.
Every Redocly project on an eligible plan serves a built-in MCP server — the Docs MCP server — at `/mcp` on the project root URL, with no configuration required.
AI agents connected to it can search your documentation, discover your APIs, and inspect endpoints, schemas, and security requirements.
Projects can additionally let connected agents call the documented APIs, so an agent moves from reading about an endpoint to executing a request without leaving your project.

## Docs MCP server

The Docs MCP server is enabled by default.
To turn it off, set `mcp.hide` or `mcp.docs.hide` to `true` in your [project configuration](../../config/mcp.md).

The server exposes tools for working with your published documentation:

- API discovery: list APIs, endpoints, security schemes, and full OpenAPI descriptions.
- GraphQL discovery: list schemas and fetch types, when the project documents GraphQL APIs.
- Search: full-text search across the documentation content.
- Identity: a `whoami` tool, when the project requires authentication.

For endpoint details, authentication semantics, server metadata, and tool schemas, review the [Docs MCP reference](./openapi.yaml).

## Server variants

The `mcp.variant` configuration option controls how the server exposes its tools:

{% table %}

- Variant
- Tools served
- Description

---

- tools
- One tool per capability: `list-apis`, `get-endpoints`, `get-endpoint-info`, `get-security-schemes`, `get-full-api-description`, `search`, and, depending on the project, `whoami` and the GraphQL tools.
- The default.
  The agent calls each documentation tool directly.

---

- codemode
- Two tools: `execute` and `describe-tools`.
- The agent writes JavaScript that runs in a sandbox against the same documentation tools, chains calls, and returns only the result.
  Keeps the agent's context footprint fixed regardless of how many APIs the project documents, and is required for [API calling](#api-calling).

{% /table %}

In code mode, the agent calls `describe-tools` to get exact TypeScript signatures for the sandbox tools, then batches its work into a single `execute` call instead of many round-trips.

## API calling

By default, agents can only read about your APIs.
With API calling turned on, the code-mode sandbox also provides a `fetch` function that executes requests against the documented APIs — the agent discovers an endpoint, builds the request from the documentation, and calls it in one step.

API calling is off until the project explicitly opts in with `mcp.gateway.hide: false`, and stays scoped by guardrails your project defines:

- Agents can only reach hosts from the documented `servers` URLs of callable APIs, plus any hosts listed in `mcp.gateway.allowedHosts`.
- APIs without RBAC restrictions are callable by default, and APIs restricted by RBAC require a per-API opt-in.
- Requests run in an isolated sandbox with strict time, call, and response-size limits.

To set it up, follow [Let AI agents call your APIs](./call-apis-with-ai-agents.md).

## Access control

Access to the MCP server follows your project's existing access controls:

- Public projects accept anonymous MCP connections.
- Projects with `requiresLogin` or restrictive RBAC require authentication: MCP clients run a standard OAuth 2.0 flow with PKCE, prompting the user to sign in through the browser.
- RBAC filters every response, so an agent only sees the APIs, endpoints, and content its user is permitted to view.

## Security model

Connecting an agent never widens what its user can already do:

- Sandboxed execution: in code mode, agent-written JavaScript runs in an isolated sandbox with no file system, network, or Node.js API access beyond the provided tools.
- Host allowlist: the `fetch` function only reaches allow-listed hosts derived from your API descriptions and configuration.
  Requests to unrelated hosts, and to loopback, private-network, and cloud-metadata addresses, are blocked.
- Zero credential custody: to call an API that requires authentication, the agent includes the API's credentials with each call; Redocly forwards them to allow-listed hosts and never stores them.

## Related how-tos

- [Connect an AI agent to the MCP server](./connect-ai-agent.md)
- [Let AI agents call your APIs](./call-apis-with-ai-agents.md)

## Resources

- **[MCP configuration reference](../../config/mcp.md)** - All `mcp` configuration options, including server variants and API calling
- **[Docs MCP reference](./openapi.yaml)** - Structured reference for the server's tools, schemas, and authentication metadata
- **[OpenAPI extension: `x-mcp`](../../content/api-docs/openapi-extensions/x-mcp.md)** - Per-API and per-endpoint control over how APIs participate in the MCP server
- **[Connect MCP Markdoc tag](../../content/markdoc-tags/connect-mcp.md)** - Add a Connect MCP button anywhere in your documentation
