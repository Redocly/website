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

# Custom MCP tools

Extend your project's [MCP server](./index.md) with your own tools.
Create an `@mcp` folder in your project and add one file per tool.
Each `.ts` or `.js` file inside the folder is registered as a separate MCP tool, named after the file.

For example, `@mcp/get-weather.ts` becomes a tool named `get-weather`, served at `/mcp` next to the built-in tools.

## Create a tool

A tool file has a single default export with a description, a JSON Schema for its input arguments, and an `execute` function:

```ts {% title="@mcp/get-weather.ts" %}
import type { McpToolDefinition } from '@redocly/config';

const tool: McpToolDefinition<{ city: string }> = {
  description: 'Get the current weather for a city.',
  inputSchema: {
    type: 'object',
    required: ['city'],
    properties: {
      city: { type: 'string', description: 'City name, for example "Berlin".' },
    },
  },
  annotations: { title: 'Get weather', readOnlyHint: true },
  async execute(args, context) {
    const response = await fetch(`https://wttr.in/${encodeURIComponent(args.city)}?format=j1`);
    if (!response.ok) {
      throw new Error(`Weather lookup failed: ${response.status}`);
    }
    const data = await response.json();
    return data.current_condition;
  },
};

export default tool;
```

Subfolders inside `@mcp` are supported for organization and do not affect tool names.
Because tool names are file names, each file name must be unique across your `@mcp` folders.

Tool files run in Node.js; `fetch` and `context.fs` work without any additional setup.
If a tool imports Node.js built-ins (for example `node:fs`), install `@types/node` in your project for editor type support when editing locally.
The Reunite editor loads type definitions automatically.

## Tool definition

The default export supports the following properties:

{% table %}

- Property
- Type
- Description

---

- description
- string
- **REQUIRED.** Human-readable description shown to MCP clients and AI models.

---

- execute
- function
- **REQUIRED.** The tool implementation.
  Receives `(args, context, extra)` and returns a [tool result](#tool-result): a plain value, or a full MCP result object.

---

- inputSchema
- object
- JSON Schema for the tool's input arguments.
  Must describe an object.
  Default: `{ type: 'object', properties: {} }`

---

- outputSchema
- object
- JSON Schema describing the tool's structured output.

---

- annotations
- object
- Behavior hints for MCP clients, as defined by the MCP specification:
  `title`, `readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`.

---

- isAvailable
- function
- Controls whether the tool is advertised to the current MCP connection.
  Receives the same `context` object as `execute` and returns a boolean or a `Promise<boolean>`.

{% /table %}

## Execute function

The `execute` function receives three arguments:

{% table %}

- Argument
- Type
- Description

---

- args
- object
- The input arguments from the MCP client, validated against `inputSchema`.

---

- context
- [McpToolContext](#context)
- Information about the project and the current user.

---

- extra
- object
- MCP protocol metadata: `requestId`, `sessionId`, `authInfo`, `requestInfo`, `_meta`.

{% /table %}

### Context

The most useful `context` properties:

{% table %}

- Property
- Type
- Description

---

- user
- object
- The current user: `email`, `teams`, `claims`, `isAuthenticated`, `idpAccessToken`.

---

- config
- object
- The resolved project configuration from `redocly.yaml`.

---

- baseUrl
- string
- Origin of the current request.

---

- accessToken
- string
- Access token of the authenticated MCP connection, when present.

---

- metadata
- object
- Free-form caller metadata, parsed from the `X-Redocly-AI-Metadata` request header.

---

- fs
- object
- Scoped file access to the built project output, which includes a Markdown version of every page.
  `fs.readFile(path)` returns a file's text; paths that point outside the output directory are rejected.

{% /table %}

### Tool result

Return a plain value from `execute` and it is wrapped into an MCP result automatically:

- A string becomes the tool's text response as-is.
- Any other JSON-serializable value (an object, array, or number) is serialized to JSON.
- Throw an `Error` to report a failed call; the message becomes the error response.

```ts
async execute(args) {
  return `Hello, ${args.name}!`;
}
```

Declare an `outputSchema` when a tool returns structured data, so AI clients know the shape of the result without inspecting it first.

For protocol-level control, such as multiple content parts, non-text content, or an explicit error flag, return a full MCP result object with a `content` array instead:

```js
{
  content: [{ type: 'text', text: 'Response text' }],
  isError: false,
}
```

## Availability and authorization

Your project's access controls apply to the MCP server as a whole:
if the project requires login or restricts content with RBAC, MCP clients must authenticate before calling any tool.

Use `isAvailable` to hide a tool from specific connections, for example from anonymous users:

```ts
isAvailable: (context) => context.user.isAuthenticated,
```

`isAvailable` only controls whether the tool is advertised to the MCP client.
Always enforce authorization inside `execute` as well to protect direct tool calls.

## Constraints

- Tool names come from file names and may only contain letters, numbers, hyphens, and underscores (max 64 characters).
- Names must not collide with built-in tools (for example `search` or `list-apis`).
- Tool files must not have module-level side effects.
  Each file is imported once at build time to read its schema; `execute` and `isAvailable` run only when a tool is called.
- Import heavy dependencies inside `execute` instead of at the top of the file.
- Keep shared helper code outside the `@mcp` folder.
  Every file inside it must be a tool.

A tool file that violates these rules fails the production build with an error that names the file.
In preview mode, the error is reported and the tool is skipped.

## Resources

- **[Model Context Protocol server](./index.md)** - Overview of the built-in MCP server and how to connect AI tools to it
- **[MCP configuration reference](../../config/mcp.md)** - Enable, disable, and configure the MCP server for your project
- **[API functions reference](../api-functions/api-functions-reference.md)** - Folder-based server-side endpoints that follow the same file conventions
