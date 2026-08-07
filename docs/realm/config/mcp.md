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

The MCP server requires authentication to verify user permissions, even if the documentation site is public.
For more information on how the MCP server handles sessions and timeouts, see [MCP server overview](../customization/mcp-server/index.md#authentication-and-timeouts).

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
- List of patterns or identifiers to ignore in the MCP server.
  Default: `[]`.

{% /table %}

## Access control

Role-based access control (RBAC) that protects content in your project also protects that content over the Docs MCP server.
The Docs MCP server enforces access with the same RBAC engine as the portal, so each authenticated client receives only the API descriptions, schemas, skills, and search results that its teams are permitted to access — the same content it could see in the portal.
When RBAC restricts anonymous access, the `/mcp` endpoint requires authentication and returns `401` to unauthenticated clients.
To restrict the server itself rather than individual content, set a team-based role for the `mcp` feature, as described in [Restrict access to the MCP server](../customization/mcp-server/index.md#restrict-access-to-the-mcp-server).

{% admonition type="info" %}
The `hide` and `ignore` options remove content from the build for all clients.
They are build-time removal, not access control — use RBAC to control who can access content.
{% /admonition %}

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

### Ignore specific patterns

Ignore specific files and filename patterns in the MCP server:

```yaml
# Global settings
mcp:
  hide: false
  docs:
    hide: false
    # Ignored patterns
    ignore:
      - openapi-files/**
      - test-endpoints
```

## Default configuration

```yaml
mcp:
  hide: false
  docs:
    hide: false
    name: Docs MCP server
```

## Resources

- **[MCP servers overview](../customization/mcp-server/index.md)** - Configure MCP servers and integrate with third-party services
- **[Agent skills](../customization/agent-skills/index.md)** - Publish `SKILL.md` instructions that the MCP server exposes as resources
- **[Docs MCP reference](../customization/mcp-server/openapi.yaml)** - Review the structured Docs MCP specification, tool schemas, and authentication metadata
- **[Restrict access to the MCP server](../customization/mcp-server/index.md#restrict-access-to-the-mcp-server)** - Limit the `/mcp` endpoint to specific teams and review the responses clients receive when access is denied
- **[Role-based access control](./access/rbac.md#features-configuration)** - Configure team-based permissions that also govern which content clients can access over the Docs MCP server
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
- **[Connect MCP Markdoc tag](../content/markdoc-tags/connect-mcp.md)** - Add `Connect MCP` button anywhere in your documentation
