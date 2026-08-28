---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
description: Make your content accessible to AI tools.
---

# `mcp`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Redocly automatically generates Model Context Protocol (MCP) servers from your documentation and OpenAPI descriptions.
MCP servers make your content accessible to AI tools in the MCP ecosystem (such as ChatGPT, Claude, Cursor, Goose).

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hide the MCP server globally.
  When set to `true`, all MCP functionality is disabled.
  Default: `false`.

---

- docs
- [Docs object](#docs-object)
- Docs MCP configuration options.

---

{% /table %}

### Docs object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hide the Docs MCP server.
  Default: `false`.

---

- name
- string
- Set the name displayed to MCP clients during the initial connection.
  Default: `"Docs MCP server"`.

---

- ignore
- [string]
- List of glob patterns, matched against file paths, for content to exclude from the MCP server.
  Default: `[]`.

---

- publicEndpoint
- boolean
- Serve an additional MCP endpoint at `/mcp-public` that requires no authentication.
  The endpoint ignores any provided credentials and exposes only content available to the `anonymous` team.
  It never grants access to protected content.
  Useful when RBAC restricts some content but public content must stay reachable for AI tools without a login.
  Before you enable it, review which content your RBAC rules grant to the `anonymous` team: that content becomes reachable without a login.
  When the project has no protected content, `/mcp` already serves anonymous users and the `/mcp-public` endpoint is not registered.
  The [`rbac.features.mcp`](./access/rbac.md#features-configuration) configuration also applies to this endpoint: it must grant access to the `anonymous` team, or the `/mcp-public` endpoint is not registered.
  With [`requiresLogin`](./access/requires-login.md) and no `rbac` rules, no content is public, so the `/mcp-public` endpoint is not registered.
  Default: `false`.

{% /table %}

## Access control

Role-based access control (RBAC) that protects content in your project also protects that content over the Docs MCP server.
The Docs MCP server enforces access with the same RBAC engine as the portal.
Each authenticated client receives only the API descriptions, schemas, skills, and search results that its teams are permitted to access.
That is the same content the client could see in the portal.

When RBAC restricts anonymous access, the `/mcp` endpoint requires authentication and returns `401` to unauthenticated clients.
To restrict the server itself rather than individual content, set a team-based role for the `mcp` feature.
The steps are described in [Restrict access to the MCP server](../customization/mcp-server/index.md#restrict-access-to-the-mcp-server).

{% admonition type="info" %}
The `hide` and `ignore` options remove content from the build for all clients.
They are build-time removal, not access control — use RBAC to control who can access content.
{% /admonition %}

### Token audience validation

The Docs MCP server compares the `aud` (audience) claim of each bearer token to your organization ID.
A token whose `aud` names a different organization is recorded in the logs and in telemetry, and the request still goes through.

Set the `REDOCLY_MCP_ENFORCE_TOKEN_AUDIENCE` environment variable to `true` to reject those requests with a `401` response instead.
Two cases skip the comparison in both modes.
Tokens that carry no `aud` claim skip it, because portal session tokens and some identity provider setups don't set one.
Projects that run without an organization ID, such as self-hosted deployments, also skip it.

## Examples

### Basic configuration

```yaml
# Global settings
mcp:
  hide: false
  # Docs MCP settings
  docs:
    hide: false
    name: My Custom Docs MCP Server
```

### Public endpoint for anonymous users

Serve public content to unauthenticated MCP clients on a project with restricted content:

```yaml
mcp:
  docs:
    publicEndpoint: true
```

{% admonition type="warning" %}
Everything your RBAC rules grant to the `anonymous` team becomes reachable over `/mcp-public` without a login.
Review these rules before you enable the endpoint.
{% /admonition %}

Authenticated users keep connecting to `/mcp`.
Anonymous users and unauthenticated integrations connect to `/mcp-public` and receive only the content that is available to the `anonymous` team.
A browser visit to `/mcp-public` displays the setup page with connection snippets for the public endpoint.
The two setup pages link to each other.
The `401` response from the restricted `/mcp` endpoint mentions the public URL.

### Ignore specific patterns

Ignore files and file path patterns in the MCP server:

```yaml
# Global settings
mcp:
  hide: false
  docs:
    hide: false
    # Ignored patterns
    ignore:
      - openapi-files/**
      - '**/test-endpoints*'
```

## Default configuration

```yaml
mcp:
  hide: false
  docs:
    hide: false
    name: Docs MCP server
    publicEndpoint: false
```

## Resources

- **[MCP servers overview](../customization/mcp-server/index.md)** - Configure MCP servers and integrate with third-party services
- **[Agent skills](../customization/agent-skills/index.md)** - Publish `SKILL.md` instructions that the MCP server exposes as resources
- **[Restrict access to the MCP server](../customization/mcp-server/index.md#restrict-access-to-the-mcp-server)** - Limit the `/mcp` endpoint to specific teams and review the responses clients receive when access is denied
- **[Role-based access control](./access/rbac.md#features-configuration)** - Configure team-based permissions that also govern which content clients can access over the Docs MCP server
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
- **[Connect MCP Markdoc tag](../content/markdoc-tags/connect-mcp.md)** - Add `Connect MCP` button anywhere in your documentation
