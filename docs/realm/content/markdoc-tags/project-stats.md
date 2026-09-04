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
# Project stats tag

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The `project-stats` tag renders your project's statistics on any content page.
It shows the same data as the built-in stats page at `redocly/project/stats`: a table of the OpenAPI descriptions in your project, and a table of how many files of each extension the project contains.

{% admonition type="warning" name="Stats are visible to everyone who can see the page" %}
Unlike the built-in stats page, which is only available to logged-in users, this tag renders for every visitor of the page it is on, including anonymous ones.
If your project is public and the statistics should not be, restrict the page with [`rbac`](../../config/access/rbac.md).
{% /admonition %}

## Syntax and usage

Add the `project-stats` tag where you want the statistics to appear.

{% markdoc-example %}
```markdoc {% process=false %}
{% project-stats /%}
```
{% /markdoc-example %}

Which data is collected is controlled by the [`stats`](../../config/stats.md) configuration option.
When `stats.fileExtensions` is disabled, the tag renders the API statistics only.

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- section
- string
- Selects which statistics to render.
  Accepts `apis`, `files`, or `all`.
  With `all`, the two tables are rendered as tabs.
  **Default:** `all`.

{% /table %}

## Examples

### API statistics only

Render the table of OpenAPI descriptions without the file extension counts:

{% markdoc-example %}
```markdoc {% process=false %}
{% project-stats section="apis" /%}
```
{% /markdoc-example %}

### File extension counts only

Render the file extension counts without the API statistics:

{% markdoc-example %}
```markdoc {% process=false %}
{% project-stats section="files" /%}
```
{% /markdoc-example %}

This renders nothing when `stats.fileExtensions` is disabled.

## Resources

- **[`stats` configuration](../../config/stats.md)** - Control what the stats page and this tag collect about your project's files
- **[`rbac` configuration](../../config/access/rbac.md)** - Restrict who can see a page
- **[Markdoc tags](./index.md)** - See the full list of supported Markdoc tags
