---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
description: Connect AI clients to your documentation and published APIs with the Docs MCP server.
---

# Docs MCP server

The Docs Model Context Protocol (MCP) server connects AI clients to the documentation and API descriptions in your project.
Users can ask an AI client to find documentation, inspect API operations, or call APIs that you make available for requests.

The server is available at `/mcp` on your project URL.
For example, a project at `https://docs.example.com` has a Docs MCP server at `https://docs.example.com/mcp`.
If the project uses a path prefix, the prefix is also part of the MCP server URL.

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

## Docs MCP capabilities

The Docs MCP server provides two related capabilities through the same endpoint:

- **Documentation discovery**: Search Markdown content and inspect the OpenAPI and GraphQL descriptions available to the user.
- **API requests**: Send requests to hosts declared by eligible OpenAPI descriptions.

AI clients discover the tools and resources available from the server when they connect.
The exact tool interface may vary, but the documentation and API access rules remain the same.

## Content and access

The Docs MCP server uses the same project access rules as your published site.
An authenticated user can discover only the content their teams are permitted to access.
Anonymous clients receive only content available to the `anonymous` team.

You can also restrict access to the entire `/mcp` endpoint with the `access.rbac.features.mcp` configuration.
If anonymous access is not permitted, supported MCP clients prompt the user to sign in to the project.

Removing content with `mcp.docs.ignore` is different from restricting it with RBAC:

- `mcp.docs.ignore` excludes matching API descriptions from the Docs MCP server for every user.
- RBAC keeps the content in the server and determines which users can access it.

See the [MCP configuration reference](../../config/mcp.md) and [RBAC feature configuration](../../config/access/rbac.md#features-configuration) for the available controls.

## API request access

API requests are controlled per OpenAPI description.
The visibility of the description establishes the default:

- API descriptions available to anonymous users are eligible for requests by default.
- RBAC-protected API descriptions must explicitly allow requests.
- Any API description can explicitly prevent requests.

Eligible descriptions must declare usable root-level OpenAPI `servers`.
Those server entries define the hosts an AI client can call.
The restriction applies to hosts, not individual paths or operations, so project owners should review each server host before allowing requests.

For configuration steps and the complete access model, see [Allow AI clients to call APIs](./allow-api-requests.md).

## MCP server discovery

Redocly publishes a server card at `/.well-known/mcp/server-card.json` when the Docs MCP server is available.
The card identifies the `/mcp` endpoint and describes its transport, authentication requirements, and capabilities for clients that support server-card discovery.

API reference pages can also display a connection action when their OpenAPI descriptions advertise the Docs MCP server with `x-mcp` metadata.

## Get started

{% cards columns=2 %}

{% card title="Connect an AI client" icon="link" to="./connect-ai-client.md" %}
Add the Docs MCP server to Cursor, Claude Code, or Visual Studio Code and verify the connection.
{% /card %}

{% card title="Allow API requests" icon="server" to="./allow-api-requests.md" %}
Choose which OpenAPI descriptions can make requests and review the host-level security boundary.
{% /card %}

{% /cards %}

## Resources

- **[MCP configuration reference](../../config/mcp.md)** - Configure the Docs MCP server name, exclusions, and visibility
- **[Role-based access control](../../config/access/rbac.md)** - Control access to project content and the MCP feature
- **[`x-mcp` OpenAPI extension](../../content/api-docs/openapi-extensions/x-mcp.md)** - Describe MCP servers and configure API request eligibility
- **[Agent skills](../agent-skills/index.md)** - Publish task-focused instructions as MCP resources
