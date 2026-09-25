---
name: redocly-markdoc-tags
description: >-
  Use when adding or editing a Markdoc tag in a page of a Redocly documentation project (Realm, Revel,
  Reef, or Redoc): admonition, tabs, code-group, accordion, cards, table, img, icon, partial and
  raw-partial, if and else, code-snippet, numbered-list, inline-svg, diagram, code-walkthrough,
  login-button, connect-mcp, or markdoc-example. Also use for Markdoc syntax ({% tag %}, attribute
  values, variables such as $frontmatter or $rbac, and functions such as equals or includes), for a tag
  that does not render or has a wrong attribute, and for building a custom Markdoc tag (@theme/markdoc).
  Not for page files, links, or front matter (use redocly-authoring) or API reference docs
  (use redocly-api-reference).
---

# Redocly Markdoc tags reference

Full syntax, attributes, and examples of the built-in Markdoc tags in Redocly projects.

If a detail is not in this file, fetch the `Full reference` link of the section. Do not guess option names.

## Markdoc syntax

Markdoc is standard Markdown plus tags.
A tag with content has an opening and a closing tag, and a self-closing tag ends with `/%}`.

```markdoc
{% admonition type="info" name="Note" %}
Markdown works inside tags. {% icon name="book" /%}
{% /admonition %}
```

| Value | Syntax | Example |
| --- | --- | --- |
| String | Double quotes | `name="Read this"` |
| Number, boolean | No quotes | `columns=2`, `withLightbox=true` |
| Array, object | JSON | `options=["copy"]`, `style={"marginTop": "20px"}` |
| Variable | `$` prefix | `title=$frontmatter.title` |
| Function call | Name and arguments | `src=concat("/img/", $frontmatter.id)` |

- Markdoc treats only `undefined`, `null`, and `false` as false. `0`, an empty string, and an empty array are true.
- A class shorthand adds a CSS class: `{% inline-svg file="./logo.svg" .my-class /%}`, or `{% class="highlight" %}` after a Markdown block.
- Put the opening tag, the content, and the closing tag of a block tag on separate lines.
  A block tag on one line can be parsed as inline content, which causes invalid nesting and hydration errors.

Full reference: https://redocly.com/docs/realm/content/markdoc-tags.md

## Variables and functions

Output a variable or a function with its own tag, such as `{% $frontmatter.title %}`, or use it in an attribute or a condition.

| Variable | Description |
| --- | --- |
| `$frontmatter.{property}` | A front matter property of the page. |
| `$rbac.teams` | RBAC teams of the user. Output `{% $rbac %}` to troubleshoot. |
| `$user.email`, `$user.{claim}` | Email and other identity provider claims of the user. |
| `$lang` | Locale of the page. |
| `$env.{name}` | A `PUBLIC_` environment variable, such as `$env.PUBLIC_REDOCLY_BRANCH_NAME`. |

Also available: `$user.authCookie`, `$remoteAddr.ipAddress`, `$idpAccessToken`.

Functions: `equals(a, b)`, `and(...)`, `or(...)`, `not(a)`, `default(a, b)` (`b` when `a` is undefined), `debug(a)`, `includes(array, value)`, `concat(...)`.

Full reference: https://redocly.com/docs/realm/customization/markdoc-variables.md

## Built-in tags

A child tag (`tab`, `card`, `accordion`, `numbered-item`, `step`) works only inside its parent.
Before you use a custom tag of the project, read its schema in `@theme/markdoc/schema.ts` for the attribute names.

Full reference: https://redocly.com/docs/realm/content/markdoc-tags/tag-library.md

### Admonition

A color-coded banner for important information.
The title attribute is `name`, not `title`.

```markdoc
{% admonition type="warning" name="Before you begin" %}
Helpful context such as permissions or prerequisites.
{% /admonition %}
```

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | string | - | **Required.** `info`, `warning`, `success`, `danger`, or `idea`. |
| `name` | string | - | Header text. Renders in all caps. |

### Tabs

Switchable panels for variants of the same content.

```markdoc
{% tabs %}
  {% tab label="npm" icon="brands npm" %}
  Install with npm.
  {% /tab %}
  {% tab label="yarn" %}
  Install with yarn.
  {% /tab %}
{% /tabs %}
```

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `id` (tabs) | string | - | Unique ID. The query parameter key for deep links. |
| `size` (tabs) | string | `medium` | `small` or `medium`. |
| `label` (tab) | string | - | **Required.** Tab name. Not `title`. |
| `icon` (tab) | string | - | Icon. See [Icon](#icon). |
| `disable` (tab) | boolean | `false` | Make the tab non-interactive. |

### Code group

Code blocks in tabs or a dropdown.
Put fenced code blocks, `code-snippet` tags, or both directly in `code-group`.
There is no `{% code %}` tag.

````markdoc
{% code-group %}
```js {% title="JavaScript" %}
const greeting = "Hello, world!";
```

```python {% title="Python" %}
greeting = "Hello, world!"
```
{% /code-group %}
````

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | string | `tabs` | `tabs` or `dropdown`. |

The tab name comes from the `title` fence attribute, then from the `file` of a `code-snippet`, then from the language.
In `dropdown` mode, names come from the language.

### Accordion

A collapsible section.
Group related accordions, such as FAQ items, in `accordion-group`.

```markdoc
{% accordion-group singleExpanded=true %}
  {% accordion title="How do I order?" expanded=true %}
  Use the `POST /orders` endpoint.
  {% /accordion %}
  {% accordion title="Can I cancel an order?" %}
  Yes, before the order is ready.
  {% /accordion %}
{% /accordion-group %}
```

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `title` (accordion) | string | - | **Required.** Header text. |
| `expanded` (accordion) | boolean | `false` | Expand the accordion on page load. |
| `singleExpanded` (accordion-group) | boolean | `false` | Opening one accordion closes the others. |

### Code snippet

Renders a code block from a local file, or from a part of it.

```markdoc
{% code-snippet file="./examples/redocly.yaml" language="yaml" from="footer" to="redirects" title="redocly.yaml" /%}
```

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `file` | string | - | Absolute or relative path to the file. |
| `from` | number \| string | - | First line, included. A line number or a string in that line. Not with `after`. |
| `to` | number \| string | - | Last line, included. Not with `before`. |
| `after` | number \| string | - | Like `from`, but excludes the line. |
| `before` | number \| string | - | Like `to`, but excludes the line. |
| `prefix` | string | - | Text added at the start. Start with `//` to style it as a comment, and end with `\n`. |
| `language` | string | - | Syntax highlighting language. |
| `title` | string | - | Header text. |
| `wrap` | boolean | `false` | Wrap long lines. |

### Cards

Link tiles in a responsive grid.

```markdoc
{% cards columns=2 cardMinWidth=200 %}
  {% card title="Quickstart" icon="rocket" to="./quickstart.md" variant="outlined" %}
  Send your first request.
  {% /card %}
  {% card title="Guides" to="./guides/index.md" %}
  Learn the main tasks.
  {% /card %}
{% /cards %}
```

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` (cards) | number | `3` | Number of grid columns. |
| `cardMinWidth` (cards) | number | `240` | Minimum card width in pixels before cards wrap. |
| `title` (card) | string | - | **Required.** Card title. |
| `to` (card) | string | - | Path or URL. The whole card becomes a link. |
| `variant` (card) | string | `filled` | `filled`, `outlined`, `elevated`, or `ghost`. |
| `icon`, `iconVariant` (card) | string | - | Icon (see [Icon](#icon)), and `ghost` (default) or `filled`. |
| `image`, `imagePosition` (card) | string | - | Image path, and `start` (default) or `end`. |
| `layout`, `align`, `lineClamp` (card) | string, number | - | `vertical` (default) or `horizontal`; `start`, `center`, `end`; maximum lines of content. |

### Table

A table with rich content in cells: lists, code blocks, images, or other tags.
For simple data, use a pipe table.
Each list item is a cell, `---` starts a new row, and the first row is the header.
To make a table without a header row, start with `---`.

```markdoc
{% table %}
- Option
- Description {% width="40%" %}
---
- `limit`
- The maximum number of items.
  Default: `20`.
{% /table %}
```

| Cell attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | string | - | Column width. |
| `align` | string | `left` | `left`, `center`, or `right`. |
| `colspan` | number | - | Number of columns that the cell spans. |

To add rows from a partial, use `raw-partial`.

### Image

An image with sizing, color-mode variants, a caption, and a lightbox.
Standard Markdown images also work.

```markdoc
{% img alt="Dashboard" srcSet="./images/dash-light.png light, ./images/dash-dark.png dark" width=600 withLightbox=true /%}
```

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | string | - | Path, URL, or data URL. JPEG, PNG, GIF, WebP, or SVG. Use exactly one of `src`, `srcSet`, `images`. |
| `srcSet` | string | - | One image per color mode: `"a.png light, b.png dark"`. |
| `images` | [string] | - | Up to 3 images in a one-row gallery. |
| `alt` | string | - | Alternative text. Always set it. |
| `caption` | string | - | Caption below the image. |
| `framed`, `withLightbox` | boolean | `false` | Border with rounded corners; open the image in a lightbox on click. |
| `width`, `height` | string \| number | - | A number is pixels. A string takes units: `"100%"`, `"20rem"`. |
| `align`, `border`, `style`, `className`, `lightboxStyle` | string \| object | - | Layout and inline styles, such as `style={"marginTop": "20px"}`. |

### Icon

An inline Font Awesome icon.

```markdoc
Status: {% icon name="solid check-circle" color="green" size="2em" /%} Passed
```

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | string | - | **Required.** Font Awesome icon name. |
| `size` | string | `1em` | Any CSS size. |
| `color` | string | - | Any CSS color. |

Icon packs: Classic Regular (`book` or `regular book`), Classic Solid (`solid book`), Duotone Solid (`duotone book`), and Classic Brands (`brands github`).
Any other prefix, including `fa-`, stops the icon from rendering.
The `icon` attribute of other tags, and of sidebar, navbar, and footer items, uses the same names, and also accepts a relative path to an image.

### Partial and raw partial

`partial` inserts a file from a partials folder (`_partials` at any depth, by default).
Files in a partials folder do not become pages.

```markdoc
{% partial file="/_partials/greeting.md" variables={ person: "Taylor" } /%}
```

In the partial, read the variable with `{% $person %}`.

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `file` | string | - | **Required.** Absolute path from the project root, or relative to the page. The file must be in a partials folder. |
| `variables` | object | - | Key-value pairs that the partial reads as `$key`. |

- `raw-partial` takes the same `file` attribute, but inserts the text before any other processing, as if it were written in the page.
  Use it when the partial supplies rows of a `table`, uses reference-style links, or must resolve in the context of the page.
- Reference-style Markdown links do not resolve in a `partial`. Use inline links.
- A partial needs no front matter and no H1.
- Put images for partials in an `images` folder inside the partials folder.

Full reference: https://redocly.com/docs/realm/content/markdoc-tags/partial.md

### If and else

Renders content only when a condition is true.
`else` is self-closing and sits inside the `if` block.
Chain `else` branches with conditions, and end with a plain `{% else /%}` as the fallback.

```markdoc
{% if includes($rbac.teams, "Partners") %}
Content for partners only.
{% else equals($frontmatter.releaseStage, "beta") /%}
This feature is in beta.
{% else /%}
Log in as a partner to read this section.
{% /if %}
```

The condition is a variable or a function call.
Add a fallback, so that no user sees an empty section.

### Numbered list

A list of steps on a rail, for procedures and timelines.
An item that starts with a heading gets an anchor and an entry in "On this page".

```markdoc
{% numbered-list %}
  {% numbered-item %}
  ### Install the CLI
  Instructions for step one.
  {% /numbered-item %}
  {% numbered-item %}
  ### Run the preview
  Instructions for step two.
  {% /numbered-item %}
{% /numbered-list %}
```

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `type` (numbered-list) | string | `number` | `number` (numbered from 1), `icon` (an icon for each item), or `dot` (compact timeline). |
| `size` (numbered-list) | string | `medium` | `small` or `medium`. No effect with `dot`. |
| `icon` (numbered-item) | string | - | Marker when the list `type` is `icon`. See [Icon](#icon). |

### Inline SVG

Renders an SVG file inline, so that CSS can style it.

```markdoc
{% inline-svg file="./images/logo.svg" .logo-small /%}
```

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `file` | string | - | **Required.** Absolute or relative path to the SVG file. |

### Diagram

Renders a diagram from a separate file.
For a diagram in the page, use a fenced code block with the `mermaid`, `plantuml`, or `excalidraw` language.

```markdoc
{% diagram file="./architecture.mermaid" type="mermaid" align="center" width="60%" /%}
```

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `file` | string | - | **Required.** Path relative to the page, or absolute from the project root. |
| `type` | string | - | **Required.** `mermaid`, `plantuml`, or `excalidraw`. |
| `align` | string | - | `left`, `center`, or `right`. |
| `width` | string | - | Any CSS width. The height scales with it. |

Full reference: https://redocly.com/docs/realm/content/add-diagram.md

### Code walkthrough

An interactive two-panel tutorial.
The left panel has steps, and the right panel has downloadable code files.
When a user selects a step, the code for that step is highlighted.

```markdoc
{% code-walkthrough
  filesets=[{ "files": ["./project/request.js"], "downloadAssociatedFiles": ["./project/package.json"] }]
  filters={ "server": { "label": "Server", "items": [{"value": "Node"}, {"value": "Python"}] } }
%}
  {% step id="add-text" heading="Add text" when={ "server": "Node" } %}
  Add text to your HTML file.
  {% /step %}
  {% toggle id="logs" label="Add logging" %}
    {% step id="add-logs" heading="Add error logs" %}
    Add exception logs.
    {% /step %}
  {% /toggle %}
  {% input id="site-name" label="Site name" placeholder="My site" /%}
  {% slot "preview" %}
    {% img src="./images/result.png" alt="The finished page" /%}
  {% /slot %}
{% /code-walkthrough %}
```

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `filesets` (code-walkthrough) | [object] | - | **Required.** Each entry has `files` (required, [string]), and optional `downloadAssociatedFiles`, `when`, `unless`. |
| `filters` (code-walkthrough) | Map[string, object] | - | Filter ID to `{ label, items: [{ value, when, unless }] }`. Renders a filter bar. |
| `id` (step) | string | - | **Required.** Matches the `steps` of a code chunk. |
| `heading` (step) | string | - | Step header. |
| `id`, `label` (toggle) | string | - | **Required.** Unique ID among all toggles, inputs, and filters, and the toggle header. |
| `id` (input) | string | - | **Required.** Unique ID. Code files use it as `{{id}}`. |
| `label`, `placeholder`, `value` (input) | string | - | Label, text when empty, and default value. |
| `when`, `unless` (step, toggle, input) | object | - | Conditions to show or hide the element: `when={ "server": "Node", "logs": true }`. |

Use `{% slot "description" %}` in a `toggle`, and `{% slot "preview" %}` in `code-walkthrough`, for extra content.
In the code files, wrap code in chunk comments with the comment syntax of the language.
Each chunk needs `steps`, or a `when` or `unless` condition. Chunks can nest.

```javascript
// @chunk {"steps": ["add-logs"], "when": {"logs": true}}
const config = { logErrors: true, site: "{{site-name}}" };
// @chunk-end
```

Full reference: https://redocly.com/docs/realm/content/markdoc-tags/code-walkthrough.md

### Login button

A button that links to the login page.
It shows only to users who are not logged in.

```markdoc
{% login-button variant="secondary" label="Sign in" /%}
```

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | string | `primary` | `primary`, `secondary`, `outlined`, `text`, `link`, or `ghost`. |
| `size` | string | `medium` | `small`, `medium`, or `large`. |
| `label` | string | - | Button text. Overrides the translation. |
| `labelTranslationKey` | string | `userMenu.login` | Translation key for the label. |

### Connect MCP

A button with a dropdown to connect an MCP client to the Docs MCP server of the project.
It needs `mcp` in `redocly.yaml`.

```markdoc
{% connect-mcp placement="top" alignment="end" options=["vscode", "claude-code", "copy"] /%}
```

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `placement` | string | `bottom` | Dropdown position: `top` or `bottom`. |
| `alignment` | string | `start` | Dropdown alignment: `start` or `end`. |
| `options` | [string] | `["cursor", "vscode", "claude-code", "codex", "copy"]` | Connection options to show. |

### Markdoc example

Shows Markdoc source in a code block, and optionally the rendered result.
Use it to document tags, including your custom tags.

````markdoc
{% markdoc-example renderDemo=true %}
```markdown {% process=false %}
{% admonition type="info" name="Note" %}
This is a note.
{% /admonition %}
```
{% /markdoc-example %}
````

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| `renderDemo` | boolean | `false` | Show the rendered output with the source. |
| `withLabels` | boolean | - | Show the labels. |
| `codeLabel` | string | `Code:` | Label before the source. |
| `resultLabel` | string | `Result:` | Label before the rendered output. |

### API content tags

These tags show one operation or schema of an API description in a page.
For their full attributes, load the `redocly-api-reference` skill, if it is installed (or fetch the reference page of the tag).

| Tag | Use it to | Key attributes | Reference |
| --- | --- | --- | --- |
| `openapi-code-sample` | Show the code sample of one API operation. | `descriptionFile` (required), `operationId` or `pointer`, `language` (case-sensitive: `curl`, `JavaScript`, `Python`). | https://redocly.com/docs/realm/content/markdoc-tags/openapi-code-sample.md |
| `openapi-response-sample` | Show the response example of one operation. | `descriptionFile` (required), `operationId` or `pointer`, `exampleKey`. | https://redocly.com/docs/realm/content/markdoc-tags/openapi-response-sample.md |
| `replay-openapi` | Embed the Replay (**Try it**) console for one operation. | Same as `openapi-code-sample`, plus `mimeType`. | https://redocly.com/docs/realm/content/markdoc-tags/replay-openapi.md |
| `json-schema` | Show a schema in the API reference style. | `schema` (required, inline or local `$ref`), `title`, `options`. | https://redocly.com/docs/realm/content/markdoc-tags/json-schema.md |
| `json-example` | Show a JSON example from a value, a `$ref`, or a schema. | `value` or `schema`, `mode` (`read`, `write`). | https://redocly.com/docs/realm/content/markdoc-tags/json-example.md |

In `pointer`, encode `/` in a path as `~1`: `/paths/~1orders/post`.

### Custom tags

To build custom tags and functions, add them in `@theme/markdoc/`:

- `components.tsx` exports the React components.
- `schema.ts` exports `tags` (tag name to `attributes`, `render`, `selfClosing`) and `functions` (function name to `{ transform(parameters) }`).

Full reference: https://redocly.com/docs/realm/customization/build-markdoc-tags.md

## Common mistakes

| Mistake | Correct approach |
| --- | --- |
| `{% admonition title="..." %}`, or `type="note"` | `name="..."`; types are `info`, `warning`, `success`, `danger`, `idea` |
| `{% tab title="..." %}` | `{% tab label="..." %}` |
| `{% code %}` tags inside `code-group` | Fenced code blocks with a `title` fence attribute |
| `card`, `tab`, `accordion`, or `numbered-item` outside its parent | Wrap it in `cards`, `tabs`, `accordion-group`, or `numbered-list` |
| `columns="2"`, `withLightbox="true"` | No quotes for numbers and booleans |
| A block tag and its content on one line | Opening tag, content, and closing tag on separate lines |
| `{% if $count %}` to test for zero or empty | `0`, `""`, and `[]` are true. Compare with `equals` |
| Markdoc tags in a code block render instead of showing as text | Add `{% process=false %}` to the fence |
| `icon="fa-book"` or `icon="fas book"` | `book`, `solid book`, `duotone book`, `brands github` |
| `{% img %}` with both `src` and `srcSet` | Exactly one of `src`, `srcSet`, `images` |
| A partial outside a partials folder | Move it to `_partials`, or add its folder to `markdown.partialsFolders` |
| `partial` for table rows, or with reference-style links | `raw-partial` |
| `pointer="/paths//orders/post"` | Encode the slashes: `/paths/~1orders/post` |
| An attribute name from memory | Fetch the reference page of the tag |
