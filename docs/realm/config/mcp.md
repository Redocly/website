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

Redocly automatically generates a Model Context Protocol (MCP) server from your documentation and API descriptions.
The MCP server makes your content accessible to AI tools in the MCP ecosystem (such as ChatGPT, Claude, Cursor, Goose).
Use the `mcp` options to hide the server, select how it exposes its tools, and let AI agents call your documented APIs.

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

- variant
- string
- Select how the Docs MCP server exposes its tools.
  Possible values: `tools` (one tool per capability), `codemode` (two tools: `execute` and `describe-tools`; required for API calling).
  For the difference, review [Server variants](../customization/mcp-server/index.md#server-variants).
  Default: `tools`.

---

- docs
- [Docs object](#docs-object)
- Docs MCP configuration options.

---

- gateway
- [Gateway object](#gateway-object)
- API calling configuration options.
  Lets AI agents execute requests against your documented APIs.

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
- List of glob patterns matched against the file paths of API descriptions in your project.
  Matching APIs are excluded from the MCP server.
  Default: `[]`.

{% /table %}

### Gateway object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Control API calling from the MCP server.
  API calling stays off unless this option is explicitly set to `false`, and requires `variant: codemode`.
  Default: `true`.

---

- allowedHosts
- [string]
- Additional hosts AI agents can call, on top of the hosts from the `servers` URLs of every callable API.
  Entries are hostnames (no scheme, port, or path); a `*.` prefix matches exactly one subdomain label.
  Default: `[]`.

{% /table %}

## Examples

### Basic configuration

Serve the Docs MCP server with a custom display name:

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

Exclude API descriptions from the MCP server by file path pattern:

```yaml
mcp:
  docs:
    ignore:
      - internal-apis/**
      - openapi/drafts/*.yaml
```

### Let AI agents call your APIs

Switch the server to code mode, turn on API calling, and allow one extra host:

```yaml
mcp:
  variant: codemode
  gateway:
    hide: false
    allowedHosts:
      - sandbox.example.com
```

For the full setup, including per-API opt-in and opt-out, follow [Let AI agents call your APIs](../customization/mcp-server/call-apis-with-ai-agents.md).

### Default configuration

The following example shows every `mcp` option set to its default value:

```yaml
mcp:
  hide: false
  variant: tools
  docs:
    hide: false
    name: "Docs MCP server"
    ignore: []
  gateway:
    hide: true
    allowedHosts: []
```

## Resources

- **[MCP server overview](../customization/mcp-server/index.md)** - What the Docs MCP server exposes, the server variants, and the security model
- **[Let AI agents call your APIs](../customization/mcp-server/call-apis-with-ai-agents.md)** - Turn on API calling and choose which APIs agents can call
- **[OpenAPI extension: `x-mcp`](../content/api-docs/openapi-extensions/x-mcp.md)** - Per-API and per-endpoint control over how APIs participate in the MCP server
- **[Connect MCP Markdoc tag](../content/markdoc-tags/connect-mcp.md)** - Add a Connect MCP button anywhere in your documentation
