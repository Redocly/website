---
template: ../@theme/templates/BlogPost
title: Document your MCP server with introspect-mcp
description: The new introspect-mcp command asks a running MCP server what it can do and records its tools, prompts, and resources in the x-mcp extension of your OpenAPI description. The command also has a --check mode that fails CI when the docs drift.
seo:
  title: Document your MCP server with introspect-mcp
  description: The new introspect-mcp command asks a running MCP server what it can do and records its tools, prompts, and resources in the x-mcp extension of your OpenAPI description. The command also has a --check mode that fails CI when the docs drift.
author: dmytro-ananskyi
publishedDate: "2026-09-10"
categories:
  - redocly:product-updates
  - redocly:redocly-cli
  - api-specifications:openapi
---

If your API ships an MCP (Model Context Protocol) server, that server is an API surface of its own: tools with input schemas, prompts with arguments, resources with URIs.
AI agents discover all of it at runtime - but the humans evaluating your API usually can't, because that surface lives only in the server code.

The [`x-mcp` OpenAPI extension](../docs/realm/content/api-docs/openapi-extensions/x-mcp.md) gives it a home: the MCP server's capabilities, documented inside the same OpenAPI description as the rest of your API.
The new experimental [`introspect-mcp`](../docs/cli/commands/introspect-mcp) command in Redocly CLI fills that extension in for you - by asking the server itself.

## Ask the server, not the source code

Point the command at a running MCP server and tell it which file to write:

```bash
npx @redocly/cli@latest introspect-mcp https://learn.microsoft.com/api/mcp -o openapi.yaml
```

That's the public MCP server of Microsoft Learn, Microsoft's documentation and training platform, so you can run this exact command right now.
The CLI connects over Streamable HTTP, falling back to the legacy HTTP+SSE transport for older servers.
It negotiates the protocol version, lists every tool, prompt, and resource — following pagination — and writes the result.
If `openapi.yaml` doesn't exist yet, it's scaffolded from the server's own name, version, and instructions.

A trimmed excerpt from a real run:

```yaml
x-mcp:
  protocolVersion: '2025-06-18'
  capabilities:
    # ...the logging, prompts, and resources capabilities
    tools:
      listChanged: true
  tools:
    - name: microsoft_docs_search
      title: Microsoft Docs Search
      # ...the tool's long description
      inputSchema:
        type: object
        properties:
          query:
            description: >-
              a query or topic about Microsoft/Azure products, services,
              platforms, developer tools, frameworks, or APIs
            type: string
            default: null
      # ...the tool's outputSchema, and the other two tools
```

For servers that require authentication, pass headers the same way you would with `curl`:

```bash
npx @redocly/cli@latest introspect-mcp https://example.com/mcp -H "Authorization: Bearer $MCP_TOKEN" -o openapi.yaml
```

## Local servers work too

Most published MCP servers aren't HTTP endpoints, they're packages you launch with `npx`.
The `--command` option starts one as a local process and introspects it over stdio:

```bash
npx @redocly/cli@latest introspect-mcp --command "npx -y @modelcontextprotocol/server-everything" -o openapi.yaml
```

Running that against the MCP reference server records 13 tools, 4 prompts, and 7 resources in one go.
The spawned process inherits your environment, so a server that reads its API key from an environment variable behaves exactly as it does in your shell.

## Refresh without losing your edits

The command updates the description in place: your `info`, `paths`, and `components` stay untouched, and only `servers` and `x-mcp` change.
On every refresh the tool, prompt, and resource lists are replaced with what the server reports.
Renamed or removed entries don't linger, but the annotations the MCP protocol doesn't carry are yours.
They're preserved by entry name: `tags` and `security` on tools, prompts, and resources, and `example` on prompt arguments.

Suppose the [Redocly Cafe API](https://cafe.redocly.com/openapi/cafe) shipped an MCP server for order management.
Its OpenAPI description already defines an `OAuth2` security scheme and an `Orders` tag, so you annotate the introspected tool to match:

```yaml
x-mcp:
  tools:
    - name: orders/create
      description: Create an order.
      inputSchema:
        type: object
        properties:
          customerName:
            type: string
        required:
          - customerName
      tags:
        - Orders
      security:
        - OAuth2:
            - orders:write
```

When the server's schemas or descriptions change, rerun the command: the wire-level data refreshes, and `tags` and `security` stay where you put them.

## Fail the build when the docs drift

An MCP server evolves, and a documented snapshot goes stale quietly.
The `--check` flag turns the command into a CI guardrail: it compares the file with what an introspection run would produce, writes nothing, and exits with code `1` when they disagree.

```bash
npx @redocly/cli@latest introspect-mcp https://learn.microsoft.com/api/mcp -o openapi.yaml --check
```

A real report, after the server renamed a tool:

```text
openapi.yaml is out of date with the MCP server:
  - tools - added: microsoft_docs_search; removed: microsoft_docs_search_v1

Run the command without --check to update it.
```

Add that one line to your pipeline and the build fails the moment your published API description and your MCP server tell different stories.

## From YAML to rendered docs

Once `x-mcp` is in the description, it's regular OpenAPI: lint it, bundle it, version it in Git.
And [Redocly Realm](../docs/realm/index.md) renders the extension as MCP documentation right next to your API reference.
The tools, prompts, and resources you just introspected become reader-facing docs — no extra authoring step.

To learn more, see the [`introspect-mcp` documentation](../docs/cli/commands/introspect-mcp) and the [`x-mcp` extension reference](../docs/realm/content/api-docs/openapi-extensions/x-mcp.md).

Have you pointed it at your MCP server yet? The command is new and experimental — [tell us what it got right and what it missed](https://github.com/Redocly/redocly-cli/issues), and help shape where it goes next.
