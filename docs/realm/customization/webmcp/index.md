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

# WebMCP tools

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% partial file="../../_partials/experimental.md" /%}

[WebMCP](https://github.com/webmachinelearning/webmcp) is a proposed browser standard.
A page registers tools, and an AI agent that runs in the reader's browser can call them.

Your project publishes these tools automatically.
An agent can search your documentation, read and open pages, instead of guessing at URLs or reading the rendered HTML.
The reader sees every page the agent opens, because the tools drive the same site the reader is looking at.

WebMCP is different from the [MCP server](../mcp-server/index.md).
The MCP server serves agents that connect from outside the browser, such as Cursor or Claude Code.
WebMCP serves the agent that is already in the tab with the reader.
You can use either or both in your project.

## Tools on every page

{% table %}

- Tool
- Description

---

- `get_current_page`
- Reports the page the reader is on, the product and version in scope, and whether the page is an API reference.

---

- `search_docs`
- Searches the project and returns matching pages with their titles and URLs.

---

- `read_page`
- Returns the Markdown source of a page.
  Omit the page to read the page the reader is on.

---

- `get_site_overview`
- Returns the navigation tree, limited to the pages the reader can access.

---

- `read_skill`
- Lists the [agent skills](../agent-skills/index.md) the project publishes, or returns one by name.

---

- `navigate_page`
- Moves the browser tab to another page of the project.

---

- `leave_feedback`
- Reports that a page is wrong, outdated, confusing, or incomplete.
  The report is available on the Reunite **Feedback** page.

{% /table %}

## Tools on API reference pages

Your project adds the following tools while the reader is on an API reference page.
It removes them again when the reader leaves that page.

{% table %}

- Tool
- Description

---

- `list_api_operations`
- Lists the operations of the API on the page, with the method, the path, and the documentation URL of each one.

---

- `get_api_operation`
- Returns one operation in full: the parameters, the request body, the responses, and the examples.

---

- `get_api_authentication`
- Returns the servers and the security schemes of the API.
  Credentials are never included.

{% /table %}

## Access control

The tools return only the content the reader can access.
Anonymous readers receive only the pages, search results, and navigation tree they can see on the site.
For more information, see [RBAC](../../config/access/rbac.md).

Agents never receive stored credentials.
The `get_api_authentication` tool returns the type of each security scheme and its OAuth flows.
It removes the values that [Try it](../configure-request-values.md) puts into a request.

## Turn off the feedback tool

The `leave_feedback` tool is removed when you hide the feedback form:

```yaml {% title="redocly.yaml" %}
feedback:
  hide: true
```

For more information, see [`feedback`](../../config/feedback.md).

## Browser support

WebMCP is an origin trial in Chrome 149 and later, and in Edge 150 and later.
Safari and Firefox do not support it.
A browser without WebMCP shows your documentation normally and registers no tools.

## Resources

- **[MCP server](../mcp-server/index.md)** - Serve your documentation to agents that connect from outside the browser
- **[Agent skills](../agent-skills/index.md)** - Describe tasks that an agent can complete against your product
- **[Make docs AI ready](../../ai-ready/index.md)** - Every way to serve your documentation to AI tools
- **[`feedback`](../../config/feedback.md)** - Configure the feedback form and the feedback tool
