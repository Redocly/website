---
products:
  - Realm
  - Revel
  - Reef
plans:
  - Enterprise
  - Enterprise+
keywords:
  includes:
    - AsciiDoc
    - plugin
    - experimental
---

# Use AsciiDoc content (experimental)

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Use the AsciiDoc plugin to render `.adoc` files as regular content pages in Realm.

{% admonition type="warning" name="Experimental feature" %}
AsciiDoc support is experimental.
Behavior, supported syntax, and API surface may change in future releases.
{% /admonition %}

## About the plugin

The AsciiDoc plugin package is `@redocly/realm-plugin-asciidoc`.
When enabled, it scans content files with the `.adoc` extension, creates pages, and includes content in:

- page search index
- AI search documents
- `llm.txt` generation

## Install the plugin

Install the package in your Realm project:

```sh
pnpm add @redocly/realm-plugin-asciidoc
```

## Enable in redocly.yaml

Add the plugin to the `plugins` list in your `redocly.yaml`:

```yaml {% title="redocly.yaml" %}
plugins:
  - '@redocly/realm-plugin-asciidoc/plugin.js'
```

## Add .adoc files

Create AsciiDoc files in your content directory, for example:

```adoc {% title="content/getting-started.adoc" %}
= Getting started with AsciiDoc
:description: A short AsciiDoc example page.
:keywords: asciidoc, docs

AsciiDoc pages are rendered in Realm with search support.

== Features

- Lists
- Tables
- Code blocks
- Admonitions

[source,typescript]
----
console.log('Hello from AsciiDoc');
----

== Links

- xref:./another-page.adoc[Cross-file link]
- link:https://redocly.com/docs/realm[External link]
```


## Limitations

Because this feature is experimental, expect gaps with advanced AsciiDoc syntax and extensions.
If an unsupported pattern appears, simplify the markup or use Markdown/Markdoc for that section.
