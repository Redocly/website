---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
---

# Model Context Protocol server

Model Context Protocol (MCP) is a standard that enables applications to provide context to large language models (LLMs).
With MCP servers, AI assistants can retrieve additional information relevant to a user's query.

Realm provides built-in MCP server capabilities that expose your API Docs to AI assistants.

## Benefits

- **Real-time API guidance** — users receive accurate, contextual help about API endpoints and operations.
- **Secure API access** — AI assistants can make authenticated requests to act on behalf of a user.
- **Dynamic documentation** — AI assistants can extract and explain API reference content based on user needs.

## Docs MCP server

Use the Docs MCP server to explore and discover APIs in your project.
For the current MCP endpoint details, authentication semantics, server metadata, and tool schemas, see the [Docs MCP reference](./openapi.yaml).

Connected AI clients see three tools:

- `execute` runs a short script that the AI client writes.
  The script can search documentation, read API descriptions, and [call the APIs you allow](#call-apis-through-the-mcp-server).
- `describe-tools` tells the AI client what the script can do and which APIs it can call.
- `manageApiCredentials` returns a secure link where the user adds, replaces, or removes the credentials that the server sends to an API.

Anonymous clients also see `createAnonymousSession`.
It returns a session ID that keeps stored credentials with the same anonymous session.

## Call APIs through the MCP server

AI clients can also call the APIs you document.
The `execute` script sends the request, and the MCP server forwards it to the API.
Your OpenAPI descriptions decide which APIs the server can call and which hosts it can reach.

### Which APIs can be called

An API description that anonymous users can read is callable by default.
An API description that RBAC protects is not callable until you allow it.
To allow it, add an empty `gateway` object to `x-mcp` in the Info Object:

```yaml {% title="openapi.yaml" %}
info:
  title: Orders API
  version: 1.0.0
  x-mcp:
    gateway: {}
```

To stop calls to any API, set `gateway.hide: true` instead.
RBAC still applies: a user can only call an API that they can read.
See the [`x-mcp` extension](../../content/api-docs/openapi-extensions/x-mcp.md#gateway-object) for the option reference.

### Which hosts can be reached

The server calls only the hosts in the root-level `servers` array of the API description.
Use full `http` or `https` URLs with a public hostname, for example `https://api.example.com`.
A server variable with an `enum` allows each listed value.
The server never reaches `localhost`, private networks, or a hostname without a dot.

{% admonition type="warning" %}
An allowed host is reachable in full, not only the paths in the description.
Do not list a host that has endpoints AI clients must not reach.
{% /admonition %}

### How users add API credentials

The server never sends the user's MCP token to an API.
When an API needs a credential, the user adds their own:

{% numbered-list %}
  {% numbered-item %}
  The API answers `401`.
  The MCP server gives the AI client a link to a credentials page on your project.
  {% /numbered-item %}
  {% numbered-item %}
  The user opens the link in a browser and pastes the credential.
  The link works one time and expires after 15 minutes.
  {% /numbered-item %}
  {% numbered-item %}
  The client sends the request again, and the server adds the credential.
  {% /numbered-item %}
{% /numbered-list %}

The credential never enters the chat, and the AI model never sees it.
The form follows the security schemes of the API: bearer tokens, API keys in a header or cookie, and OAuth2 client credentials.
If an operation accepts several schemes, the client asks the user which one they have.

Users can replace or remove a credential at any time with the `manageApiCredentials` tool.
The server stores credentials encrypted, for each user only.
They expire after 30 days, or after 24 hours for anonymous users.

### Limits

- Each call has a 30-second timeout and a 1 MiB response limit.
- One `execute` script can make up to 25 calls.
- One client IP address can make 60 calls per minute and 2000 calls per day.
- The server does not follow redirects.
- The server logs each call without credential values or response bodies.

## MCP server card

The MCP server card is a standardized JSON document that lets agents discover the Docs MCP server: its tools, transport endpoint, and capabilities.
The discovery is a single request that follows the Model Context Protocol server-card format.
It is available at `/.well-known/mcp/server-card.json` when the MCP server is enabled.

```http
GET https://example.com/.well-known/mcp/server-card.json
```

The following example response describes a login-protected server that also publishes skills:

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
  "version": "1.0",
  "protocolVersion": "2025-06-18",
  "serverInfo": {
    "name": "Docs MCP server",
    "title": "Docs MCP server",
    "version": "2026-07-13"
  },
  "description": "Redocly Cafe documentation.",
  "documentationUrl": "https://example.com/",
  "transport": {
    "type": "streamable-http",
    "endpoint": "/mcp"
  },
  "capabilities": {
    "logging": {},
    "tools": { "listChanged": true },
    "resources": { "listChanged": true },
    "completions": {}
  },
  "authentication": {
    "required": true,
    "schemes": ["bearer", "oauth2"]
  },
  "tools": ["dynamic"]
}
```

The card lists the server's tools, declares its `/mcp` transport endpoint, and states its authentication requirements when the server requires login.
When your project publishes [agent skills](../agent-skills/index.md#skills-as-mcp-resources), the card's capabilities advertise resource support so agents know to list them.

## Restrict access to the MCP server

Control which teams can access the MCP server with the `rbac.features.mcp` option, the same way `rbac.features.aiSearch` controls access to AI search.

In the following example, only members of the Developers team can access the MCP server:

```yaml {% title="redocly.yaml" %}
access:
  rbac:
    features:
      mcp:
        Developers: read
```

When a team-based role is set for the `mcp` feature, only teams with a role other than `none` can access the MCP server.
Users must sign in unless the `anonymous` team is granted such a role, either directly or through the `*` wildcard.
The wildcard covers all teams that are not listed explicitly, including `anonymous`.
When the `anonymous` team has no access, requests without a valid token receive a `401` response.
Authenticated users who don't belong to an allowed team receive a `403` response.

For more details, see the [RBAC configuration reference](../../config/access/rbac.md#features-configuration).

## Connect an AI agent to the MCP server

After you enable the Docs MCP server in [configuration](../../config/mcp.md), it is available at `/mcp` on your project root URL.
For example: `https://example.com/mcp`.

### Use the MCP server

Users can connect their preferred AI tools that support MCP (for example, Cursor, Claude Code and VS Code) to your MCP server.

{% numbered-list %}
  {% numbered-item %}
  Enable the MCP server in your [configuration](../../config/mcp.md).
  {% /numbered-item %}
  {% numbered-item %}
  Copy your MCP server URL and add it to your tool.
  {% /numbered-item %}
{% /numbered-list %}

After connecting, the tool can access your OpenAPI documentation.

{% tabs %}
  {% tab label="Cursor" %}

#### Connect Cursor to the MCP server

{% numbered-list %}
  {% numbered-item %}
  In Cursor, open the command palette.
  - macOS: `Command + Shift + P`
  - Windows/Linux: `Ctrl + Shift + P`
  {% /numbered-item %}
  {% numbered-item %}
  Type "Open MCP settings" in the command palette.
  {% /numbered-item %}
  {% numbered-item %}
  Select "Add custom MCP".
  {% /numbered-item %}
{% /numbered-list %}

Cursor opens the `mcp.json` file.

#### Configure the MCP server

{% numbered-list %}
  {% numbered-item %}
  In `mcp.json`, add your server configuration:

  ```json
  {
    "mcpServers": {
      "example-mcp": {
        "url": "https://example.com/mcp"
      }
    }
  }
  ```

  Optionally, you can also pass additional headers that will be sent with each request:

  ```json
  {
    "mcpServers": {
      "example-mcp": {
        "url": "https://example.com/mcp",
        "headers": {
          "Authorization": "Basic MTIzOjEyMw=="
        }
      }
    }
  }
  ```
  {% /numbered-item %}
  {% numbered-item %}
  Save the `mcp.json` file.
  {% /numbered-item %}
  {% numbered-item %}
  Return to MCP settings and confirm the connection.
  If authentication is required, select **Needs login** and complete the sign‑in flow.
  After connecting, Cursor displays the list of available tools.
  {% /numbered-item %}
{% /numbered-list %}

#### Test the Cursor connection

In Cursor chat (Agent mode), ask a question that triggers an MCP tool.

  {% /tab %}

  {% tab label="Claude Code" %}

### Connect Claude Code to the MCP server

{% numbered-list %}
  {% numbered-item %}
  Run: `claude mcp add --transport http ${MCP_SERVER_NAME} ${URL}` where `${MCP_SERVER_NAME}` is your desired server name and `${URL}` is the MCP server URL.
  {% /numbered-item %}
  {% numbered-item %}
  In the Claude Code CLI, type `/mcp` and complete authentication if prompted.
  {% /numbered-item %}
  {% numbered-item %}
  Claude Code lists the available tools with descriptions and parameters.
  {% /numbered-item %}
{% /numbered-list %}

#### Test the Claude Code connection

In the Claude Code CLI, ask the AI agent to perform an instruction that uses an MCP tool.

  {% /tab %}

  {% tab label="Claude Desktop" %}

### Connect Claude Desktop to the MCP server

The Claude Desktop configuration file only launches stdio commands, so the entry connects to the remote server through the `mcp-remote` bridge.

{% numbered-list %}
  {% numbered-item %}
  In Claude Desktop, open **Settings → Developer → Edit Config**.
  {% /numbered-item %}
  {% numbered-item %}
  Add this entry to the configuration file:

  ```json
  {
    "mcpServers": {
      "example-mcp": {
        "command": "npx",
        "args": ["-y", "mcp-remote", "https://example.com/mcp"]
      }
    }
  }
  ```
  {% /numbered-item %}
  {% numbered-item %}
  Restart Claude Desktop.
  {% /numbered-item %}
{% /numbered-list %}

If the MCP server requires authentication, `mcp-remote` opens a sign‑in page in your browser on the first connection.

#### Test the Claude Desktop connection

In a Claude Desktop chat, ask a question that uses an MCP tool.

  {% /tab %}

   {% tab label="VS Code" %}

### Connect VS Code to the MCP server

{% numbered-list %}
  {% numbered-item %}
  In VS Code, open the command palette.
  - macOS: `Command + Shift + P`
  - Windows/Linux: `Ctrl + Shift + P`
  {% /numbered-item %}
  {% numbered-item %}
  Type "MCP: Add Server" in the command palette.
  {% /numbered-item %}
  {% numbered-item %}
  Select "HTTP" to connect to a remote MCP server.
  {% /numbered-item %}
  {% numbered-item %}
  Enter the MCP server URL (for example, `https://example.com/mcp`).
  {% /numbered-item %}
  {% numbered-item %}
  Enter a name for the connection.
  {% /numbered-item %}
{% /numbered-list %}

If the MCP server requires authentication, VS Code prompts you to open a sign‑in page.
Complete the sign‑in flow with your credentials.

#### Test the VS Code connection

Open Chat with AI in Agent mode and select the Tools icon.
Confirm that your MCP connection appears with a list of available tools.

Ask the AI to perform a query that uses an MCP tool.

  {% /tab %}

  {% tab label="Codex CLI" %}

### Connect Codex CLI to the MCP server

{% numbered-list %}
  {% numbered-item %}
  Run: `codex mcp add ${MCP_SERVER_NAME} --url ${URL}` where `${MCP_SERVER_NAME}` is your desired server name and `${URL}` is the MCP server URL.
  {% /numbered-item %}
  {% numbered-item %}
  If the MCP server requires authentication, run `codex mcp login ${MCP_SERVER_NAME}` and complete the sign‑in flow.
  {% /numbered-item %}
  {% numbered-item %}
  Run `codex mcp list` and confirm the server appears.
  {% /numbered-item %}
{% /numbered-list %}

#### Test the Codex CLI connection

In the Codex CLI, ask the AI agent to perform an instruction that uses an MCP tool.

  {% /tab %}

  {% tab label="ChatGPT desktop app" %}

### Connect the ChatGPT desktop app to the MCP server

{% numbered-list %}
  {% numbered-item %}
  In the ChatGPT desktop app, go to **Settings → Plugins → MCPs**.
  {% /numbered-item %}
  {% numbered-item %}
  Add a server with the "Streamable HTTP" type and your MCP server URL (for example, `https://example.com/mcp`).
  {% /numbered-item %}
  {% numbered-item %}
  Restart the app.
  {% /numbered-item %}
{% /numbered-list %}

#### Test the ChatGPT connection

In a ChatGPT chat, ask a question that uses an MCP tool.

  {% /tab %}
{% /tabs %}

## Public endpoint for anonymous users

When RBAC restricts content, the `/mcp` endpoint requires authentication and anonymous users cannot browse the content that RBAC marks public.
To keep public content reachable for AI tools without a login, enable the public endpoint:

```yaml
mcp:
  docs:
    publicEndpoint: true
```

The MCP server then also serves `/mcp-public` on your project root URL.
Requests to it are never challenged for authentication, any provided credentials are ignored, and the served APIs and search results include only content available to the `anonymous` team.
The `/mcp` endpoint keeps working as before for authenticated users.

{% admonition type="warning" %}
Everything your RBAC rules grant to the `anonymous` team becomes reachable over `/mcp-public` without a login.
Review these rules before you enable the endpoint.
{% /admonition %}

If you [restrict the MCP server itself](#restrict-access-to-the-mcp-server) with the `rbac.features.mcp` configuration, it must grant access to the `anonymous` team, or the `/mcp-public` endpoint is not registered and the build logs a note.

The public endpoint is only served when `/mcp` requires authentication and the `anonymous` team can reach some content.
When the project has no protected content, `/mcp` already serves anonymous users, so `/mcp-public` is not registered and the build logs a note instead.
A project that uses [`requiresLogin`](../../config/access/requires-login.md) without `rbac` rules has no public content, so `/mcp-public` is not registered either.

Users discover the public endpoint in three ways:

- A browser visit to `/mcp-public` displays the same setup page as `/mcp`, with connection snippets that point at the public endpoint and a note that it serves public content only.
- The two setup pages link to each other: the `/mcp` page links to the public endpoint, and the `/mcp-public` page links back to the main endpoint.
- When an unauthenticated MCP client connects to the restricted `/mcp` endpoint, the `401` response body mentions the `/mcp-public` URL.

## Resources

- **[MCP configuration reference](../../config/mcp.md)** - Configure MCP for your project
- **[`x-mcp` OpenAPI extension](../../content/api-docs/openapi-extensions/x-mcp.md)** - Describe MCP servers and control API request eligibility
- **[AI governance FAQ](../../faq/ai-governance.md#mcp-server-security)** - Security answers about API requests for compliance reviews
- **[RBAC configuration reference](../../config/access/rbac.md)** - Restrict MCP server access to specific teams
- **[Agent skills](../agent-skills/index.md)** - Publish task-focused `SKILL.md` instructions and the discovery endpoints agents read to find them
