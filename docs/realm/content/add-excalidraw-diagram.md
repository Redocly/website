---
products:
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
keywords:
  includes:
    - diagram
---
# Add diagrams using Excalidraw

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Use the Excalidraw plugin to add hand-drawn style diagrams to your pages.
Diagrams are rendered as SVG and automatically adapt to dark mode.

## About the plugin

The Excalidraw plugin package is `@redocly/realm-plugin-excalidraw`.
It adds both the `excalidraw` fenced code block renderer and the `{% excalidraw /%}` Markdoc tag.

## Install the plugin

Install the package in your project:

```sh
pnpm add @redocly/realm-plugin-excalidraw
```

## Enable in redocly.yaml

Add the plugin to the `plugins` list in your `redocly.yaml`:

```yaml {% title="redocly.yaml" %}
plugins:
  - '@redocly/realm-plugin-excalidraw/plugin.js'
```

## Add an inline diagram

Paste Excalidraw JSON directly into a fenced code block with the `excalidraw` language identifier.
Copy the JSON from the Excalidraw editor using **Export > Copy to clipboard**.

````text {% process=false %}
```excalidraw
{"type":"excalidraw","version":2,"elements":[...],"appState":{...},"files":{}}
```
````

The inline approach works best for small diagrams.
For larger diagrams, use a file reference instead.

## Add a diagram from a file

Save your diagram as an `.excalidraw` file and reference it using the `excalidraw` Markdoc tag:

```text {% process=false %}
{% excalidraw src="./path/to/diagram.excalidraw" /%}
```

This method keeps your Markdown files clean and makes it easy to update diagrams separately.
You can export `.excalidraw` files directly from the [Excalidraw editor](https://excalidraw.com/).

## Dark mode support

Excalidraw diagrams automatically adapt to the active color mode.
When users switch between light and dark mode, diagrams re-render with the appropriate color scheme.

## Fullscreen viewer

Click any Excalidraw diagram to open it in a fullscreen viewer.
The viewer supports:

- Zoom in and out with mouse wheel or buttons
- Pan by clicking and dragging
- Pinch-to-zoom on touch devices
- Keyboard shortcuts: <kbd>`+`</kbd>/<kbd>`-`</kbd> to zoom, <kbd>`0`</kbd> to reset, <kbd>`Esc`</kbd> to close

## Resources

- **[Excalidraw editor](https://excalidraw.com/)** - Create and export hand-drawn style diagrams
- **[Excalidraw documentation](https://docs.excalidraw.com/)** - Full reference for the Excalidraw format and features
- **[Add diagrams using Mermaid](./add-diagram.md)** - Use Mermaid for text-based diagrams like flowcharts and sequence diagrams
