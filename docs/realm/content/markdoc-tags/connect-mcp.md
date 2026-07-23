---
products:
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
---
# Connect MCP tag

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The `connect-mcp` tag renders a button that connects a reader's MCP client to the MCP (Model Context Protocol) server.
When clicked or hovered, it displays a dropdown menu with options to connect via Cursor, VS Code, or copy the MCP configuration.

{% admonition type="info" name="Before you begin"%}
The Connect MCP button uses the project's built-in Docs MCP server, which is enabled by default.
If the server is hidden with `mcp.hide` or `mcp.docs.hide`, the button has nothing to connect to — refer to the [MCP configuration reference](../../config/mcp.md).
{% /admonition %}

## Syntax and usage

Add the `connect-mcp` tag where you want the button to appear.

{% markdoc-example %}
```markdoc {% process=false %}
{% connect-mcp /%}
```
{% /markdoc-example %}

The button opens a dropdown menu on hover with connection options.
Users can click to connect their editor or copy the configuration.

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- placement
- string
- Sets the vertical placement of the dropdown menu relative to the button.
  Accepts `top` or `bottom`.
  Default: `bottom`.

---

- alignment
- string
- Sets the horizontal alignment of the dropdown menu relative to the button.
  Accepts `start` or `end`.
  Default: `start`.

---

- options
- array
- Specifies which connection options to display in the dropdown.
  Accepts an array containing any combination of: `cursor`, `vscode`, `copy`.
  Default: `["cursor", "vscode", "copy"]`.

{% /table %}

## Examples

### Basic usage

Display the **Connect MCP** button with all default options:

{% connect-mcp /%}


{% markdoc-example %}
```markdoc {% process=false %}
{% connect-mcp /%}
```
{% /markdoc-example %}

### Dropdown placement

Display the dropdown above the button:

{% connect-mcp placement="top" /%}


{% markdoc-example %}
```markdoc {% process=false %}
{% connect-mcp placement="top" /%}
```
{% /markdoc-example %}

### Dropdown alignment

Align the dropdown to the end (right side) of the button:

{% connect-mcp alignment="end" /%}


{% markdoc-example %}
```markdoc {% process=false %}
{% connect-mcp alignment="end" /%}
```
{% /markdoc-example %}

### Display specific options

Display only the Cursor connection option:

{% connect-mcp options=["cursor"] /%}

{% markdoc-example %}


```markdoc {% process=false %}
{% connect-mcp options=["cursor"] /%}
```
{% /markdoc-example %}

Display only the Copy option configuration:

{% connect-mcp options=["copy"] /%}


{% markdoc-example %}
```markdoc {% process=false %}
{% connect-mcp options=["copy"] /%}
```
{% /markdoc-example %}

### Combined attributes

Customize multiple attributes:

{% connect-mcp placement="top" alignment="end" options=["vscode", "copy"] /%}

{% markdoc-example %}


```markdoc {% process=false %}
{% connect-mcp placement="top" alignment="end" options=["vscode", "copy"] /%}
```
{% /markdoc-example %}

## Best practices

**Use placement strategically**

Use `placement="top"` when the button appears near the bottom of the page to prevent the dropdown from extending beyond the viewport.

**Choose appropriate alignment**

Use `alignment="start"` for inline usage in content to align the dropdown with the left side of the button.
Use `alignment="end"` for navbar or right-aligned layouts to align the dropdown with the right side of the button.

**Display relevant options**

Customize the `options` array to display only the connection methods relevant to your audience.
If your users primarily use Cursor, consider showing only that option to reduce cognitive load.

## Resources

- **[MCP configuration](../../config/mcp.md)** - Configure the MCP server and Connect MCP button visibility
- **[MCP server overview](../../customization/mcp-server/index.md)** - What the Docs MCP server exposes and how it protects your content
- **[Connect an AI agent to the MCP server](../../customization/mcp-server/connect-ai-agent.md)** - Connection steps for Cursor, Claude Code, and VS Code
- **[Markdoc overview for technical writers](https://redocly.com/learn/markdoc)** - How Markdoc syntax works in your documentation
- **[Markdoc tags](./index.md)** - Full list of supported Markdoc tags
