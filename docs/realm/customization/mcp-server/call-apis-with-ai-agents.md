---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
description: Turn on API calling so AI agents connected to your docs can execute requests against your documented APIs.
---

# Let AI agents call your APIs

AI agents connected to your project's Docs MCP server can read about your APIs: discover endpoints, inspect schemas, and search documentation.
With API calling turned on, the same agents can also execute requests against the documented APIs — discover an endpoint, build the request from the documentation, and call it, all inside guardrails your project defines.
Agent requests run through a sandboxed `fetch` function that only reaches allow-listed hosts derived from your API descriptions, and Redocly never stores API credentials.

To let agents call your APIs:

1. Switch the MCP server to code mode.
2. Turn on API calling.
3. Choose which APIs agents can call.

## Before you begin

Make sure you have the following before you begin:

- a project on an Enterprise or Enterprise+ plan
- the Docs MCP server enabled — it is enabled by default unless `mcp.hide` or `mcp.docs.hide` is set to `true`
- OpenAPI descriptions with `servers` URLs that point to the hosts agents should call

## Switch the MCP server to code mode

API calling is available only in code mode, where the agent writes JavaScript that runs in a sandbox instead of calling individual documentation tools.

To switch, set `mcp.variant` in your `redocly.yaml`:

```yaml
mcp:
  variant: codemode
```

Connected agents now get exactly two tools: `execute` and `describe-tools`.
The documentation tools remain available inside the sandbox on the global `tools` object, so nothing is lost — the agent chains calls in code and returns only the result.

## Turn on API calling

API calling stays off until you explicitly set `mcp.gateway.hide` to `false`:

```yaml
mcp:
  variant: codemode
  gateway:
    hide: false
```

With both options set, the sandbox gains a `fetch` function scoped to your documented APIs, and eligible API docs pages additionally advertise the MCP endpoint in their rendered API reference.

## Choose which APIs agents can call

After the project opts in, eligibility is decided per API:

- APIs without RBAC restrictions are callable by default.
- APIs restricted by RBAC are not callable unless you opt them in explicitly.
- Any API can be opted out while staying discoverable.

To opt an RBAC-restricted API in, add `x-mcp.gateway` to its `info` object:

```yaml
info:
  title: Billing API
  version: 1.0.0
  x-mcp:
    gateway: {}
```

To opt any API out of calling while keeping it readable through the documentation tools:

```yaml
info:
  title: Billing API
  version: 1.0.0
  x-mcp:
    gateway:
      hide: true
```

If no APIs are callable, agents do not get the `fetch` function at all.

For all `x-mcp` roles and options, review the [`x-mcp` extension reference](../../content/api-docs/openapi-extensions/x-mcp.md).

## Allow additional hosts

Agents can call the hosts named in the `servers` URLs of every callable API.
Add `mcp.gateway.allowedHosts` when those URLs do not cover everything agents need — for example, an extra environment, or server URLs built from variables that do not resolve to a fixed, dotted hostname:

```yaml
mcp:
  variant: codemode
  gateway:
    hide: false
    allowedHosts:
      - sandbox.example.com
      - '*.api.example.com'
```

Host rules:

- Entries are hostnames, not URLs — no scheme, port, or path.
- `*.` wildcards match exactly one subdomain label: `*.api.example.com` matches `eu.api.example.com` but not `a.b.api.example.com` or `api.example.com`.
- Requests whose URL host is a loopback, private-network, link-local, or cloud-metadata address are always blocked.

## Authenticate API calls

Two separate layers of authentication apply:

- Access to the MCP server follows your project's existing access controls — anonymous for public projects, OAuth sign-in when the project requires login.
  RBAC also filters which APIs an agent can call: an agent can never call an API its user cannot view.
- Credentials for the API itself come from the agent, per call.
  The agent reads the API's security schemes from the documentation, then includes the credentials with each request — for example, an `Authorization` header in its `fetch` call.
  Redocly forwards them to allow-listed hosts and never stores them.

A failed authentication attempt is not an error: the API's response (for example, a `401` status) is returned to the agent as data, so it can report the problem or adjust.

## Execution limits

Every `execute` call runs inside a sandbox with fixed limits:

{% table %}

- Limit
- Value

---

- Execution time
- 10 seconds of sandbox execution per `execute` call.
  Time spent waiting on tool and `fetch` calls does not count toward it.

---

- Memory
- 64 MiB

---

- Tool and `fetch` calls
- 100 combined calls per execution

---

- Request time
- 30 seconds per `fetch` request

---

- Response size
- 1 MiB per `fetch` response

---

- Result size
- 1 MiB per returned result

---

- Redirects
- Not followed; the agent receives the redirect response as data

{% /table %}

## Verify the setup

1. [Connect an AI agent](./connect-ai-agent.md) to your MCP server.
2. Ask the agent to list its tools — expect `execute` and `describe-tools`.
3. Ask the agent to describe the `fetch` tool — the response lists the callable APIs.
4. Ask the agent to call one of your endpoints, for example: "Call the list-events endpoint of the Museum API and summarize the response."

Behind the scenes, the agent runs code similar to the following in its `execute` call:

```js
const { items } = await tools.listApis({ filter: 'museum' });
const { endpoints } = await tools.getEndpoints({ name: items[0].name });
const ep = endpoints.find((e) => e.method === 'GET' && e.path.includes('special-events'));
const info = await tools.getEndpointInfo({ name: items[0].name, path: ep.path, method: ep.method });
const url = (info.servers?.[0]?.url ?? '') + ep.path;
const res = await fetch(url);
return res.ok ? await res.json() : { status: res.status, error: await res.text() };
```

## Troubleshoot common problems

{% table %}

- Symptom
- Cause and fix

---

- The build fails with the error `mcp.gateway.hide: false has no effect without mcp.variant: codemode`
- API calling requires code mode.
  Set `mcp.variant: codemode`, or remove `mcp.gateway.hide: false`.

---

- The agent reports `Host "…" is not allowed`
- The requested host is not covered by any callable API's `servers` URLs or by `mcp.gateway.allowedHosts`.
  Fix the API's `servers` URL or add the host to `allowedHosts`.

---

- An API is missing from the callable list
- The API is opted out (`x-mcp.gateway.hide: true`), restricted by RBAC without an explicit `x-mcp.gateway` opt-in, excluded by `mcp.docs.ignore`, or filtered by RBAC for the connected user.

---

- The agent sees individual tools instead of `execute`
- The server is in the default `tools` variant.
  Set `mcp.variant: codemode`.

{% /table %}

## Related how-tos

- [Connect an AI agent to the MCP server](./connect-ai-agent.md)

## Resources

- **[MCP configuration reference](../../config/mcp.md)** - All `mcp` configuration options, including `variant` and the `gateway` object
- **[OpenAPI extension: `x-mcp`](../../content/api-docs/openapi-extensions/x-mcp.md)** - Per-API opt-in and opt-out controls for API calling
- **[Model Context Protocol server](./index.md)** - What the Docs MCP server exposes and how it protects your content
- **[Docs MCP reference](./openapi.yaml)** - Structured reference for the server's tools, schemas, and authentication metadata
