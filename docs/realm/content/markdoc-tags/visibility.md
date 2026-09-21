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
# Visibility tag

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The `visibility` tag targets content at people or at AI agents.
`for="humans"` content renders on the page but is left out of the page's Markdown version.
`for="agents"` content is the mirror image: it's absent from the rendered page and the site's keyword search index, but present in the Markdown version.
Because `llms.txt`, AI search, and the Docs MCP server all read that same Markdown version, humans-only content is hidden from all three, not only from the page's `.md` file.

Use this tag to write instructions for one audience — a click path for people, an API call for agents — without duplicating the content or leaving stale instructions for the other audience.

## Syntax and usage

Wrap content with a `visibility` tag and set the `for` attribute to `humans` or `agents`.
Content that renders on the page is unwrapped: the tag adds no container element around it.

**Example syntax:**

```markdoc {% process=false %}
{% visibility for="humans" %}
Click **Create order** in the dashboard.
{% /visibility %}

{% visibility for="agents" %}
POST /v1/orders with a JSON body.
{% /visibility %}
```

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- for
- string
- **REQUIRED.**
  The audience the content targets.
  Accepts: `humans`, `agents`.
  A missing or unrecognized value causes a build error.

{% /table %}

## Limitations

- **Block-level only.** The tag can't be used inside a paragraph; inline use is a validation error.
- **Headings don't get their own chunk.** A heading inside a `visibility` block doesn't appear in the page's table of contents and doesn't start its own search chunk.
- **Conditionals suppress agent content.** Content inside an `{% if %}` conditional never reaches the Markdown version, because conditional content depends on who's viewing.
  Wrapping `{% visibility for="agents" %}` in an `{% if %}` tag is a natural way to gate agent instructions by role, but it silently produces nothing for agents.

## Resources

- **[Make docs AI ready](../../ai-ready/index.md)** - See how the Markdown version of a page feeds `llms.txt`, AI search, and the Docs MCP server
- **[Markdoc tags](./index.md)** - See the full list of supported Markdoc tags
