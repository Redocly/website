---
products:
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Markdoc tags

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Use Markdoc tags in your project to add rich formatting, interactivity and reuse capability to your content.

## Built-in tags

The following Markdoc tags are included with the official Markdoc package:

- [Partial](./partial.md): Reuse content between project pages.
- [Table](./table.md): Create rich tables with less syntax.

## Redocly tags

The following Markdoc tags are custom-made by Redocly:

- [Admonition](./admonition.md): Add color-coded banners to highlight important information.
- [Cards](./cards.md): Organize links in a "card" or "tile" layout.
- [Code snippet](./code-snippet.md): Pull fragments code files directly into your documentation pages.
- [Code group](./code-group.md): Organize a series of `code-snippet` tags into a tabbed layout.
- [Code walkthrough](./code-walkthrough/index.md): Create interactive, step-by-step instructions for complex code development tasks.
  - [Step](./code-walkthrough/step.md): Define individual procedures of a code walkthrough.
  - [Toggle](./code-walkthrough/toggle.md): Add toggles to allow users to switch between variants of walkthrough content.
  - [Input](./code-walkthrough/input.md): Add input fields to code walkthroughs.
- [Connect MCP](./connect-mcp.md): Add a button that allows users to connect to the MCP (Model Context Protocol) server.
- [Image](./img.md): Embed images into your project.
- [Icon](./icon.md): Render [Font Awesome](https://fontawesome.com/icons) icons in your project.
- [Inline SVG](./inline-svg.md): Render and style SVG images in your project.
- [Login button](./login-button.md): Add a login button visible only to unauthenticated users.
- [JSON schema](./json-schema.md): Render schemas inside a pre-styled element.
- [JSON Example](./json-example.md): Render JSON examples directly in your documentation pages.
- [Markdoc Example](./markdoc-example.md): Add examples of Markdoc syntax alongside the rendered element.
- [OpenAPI code sample](./openapi-code-sample.md): Render sample code snippets directly in your documentation pages.
- [OpenAPI response sample](./openapi-response-sample.md): Render response examples directly in your documentation.
- [Replay OpenAPI](./replay-openapi.md): Add the Replay consoe to make API calls directly from a documentation page.
- [Tabs](./tabs.md): Organize content variants into switchable tabs.

## Resources

- **[Markdoc tag library](./tag-library.md)**: Explore Markdoc tags and their rendered examples
- **[Create code walkthrough](./code-walkthrough/create-code-walkthrough.md)**: Follow the tutorial to add code walkthroughs to your project
