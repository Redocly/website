---
name: redocly-authoring
description: >-
  Use when writing or editing pages in a Redocly documentation project (Realm, Revel, Reef, or Redoc) -
  any project with a redocly.yaml, a @redocly dependency in package.json, or Markdown pages with
  {% ... %} Markdoc tags. Use when creating a page, choosing its file name and URL, adding links,
  images, or code blocks, setting the page title, description, and one or more URLs (slug) in front
  matter, or starting the full docs site locally (npx @redocly/cli preview).
  Not for Markdoc tags (use redocly-markdoc-tags), sidebars, navbar, or footer (use redocly-navigation),
  the look of the site (use redocly-styling), redocly.yaml site settings (use redocly-configuration),
  or API reference docs (use redocly-api-reference).
---

# Redocly authoring reference

Reference for writing pages in Redocly documentation projects: files and URLs, links, images, front matter, code blocks, and the local preview.

If a detail is not in this file, fetch the `Full reference` link of the section (see [Live documentation](#live-documentation)). Do not guess option names.

## Live documentation

Two sources are always current:

- **Markdown pages.** Every page of `https://redocly.com/docs/realm/` is available as Markdown: add `.md` to the page URL.
  For example, `https://redocly.com/docs/realm/navigation/sidebars.md`.
  Sections below ends with the link to its live page.
- **Redocly Docs MCP server** at `https://redocly.com/mcp`.
  It gives read-only access to the Redocly documentation.
  Use its `search` tool to find a page, and `submitFeedback` to report a page that is wrong or incomplete.
  To connect it in Claude Code: `claude mcp add --transport http redocly https://redocly.com/mcp`.

Prefer these sources over your training data.

## Related skills

This skill covers pages and their content.
For the tasks below, load the skill, if it is installed (or fetch the live page).

| Task | Skill | Live page |
| --- | --- | --- |
| Markdoc tags: admonitions, tabs, code groups, cards, partials, conditional content | `redocly-markdoc-tags` | https://redocly.com/docs/realm/content/markdoc-tags/tag-library.md |
| Sidebars, navbar, footer, breadcrumbs, versions, locales, product picker | `redocly-navigation` | https://redocly.com/docs/realm/navigation.md |
| Colors, fonts, CSS, logo, color modes, ejected components, React pages | `redocly-styling` | https://redocly.com/docs/realm/branding.md |
| `redocly.yaml` site settings (SEO, search, redirects, access), and the full list of front matter fields | `redocly-configuration` | https://redocly.com/docs/realm/config.md |
| OpenAPI, AsyncAPI, or GraphQL reference docs, and API content in pages | `redocly-api-reference` | https://redocly.com/docs/realm/content/api-docs/add-openapi-docs.md |
| Lint, bundle, or split API descriptions | `redocly-cli` | https://redocly.com/docs/cli/commands.md |

## Before you start

Read the project's `redocly.yaml` first, when it exists.
It defines the navbar, footer, theme settings, and API configuration.
Then look for `sidebars.yaml` files, and read `package.json` to find the product and the start script.

Search for existing content before you create a page.
You may need to update an existing page, add a section, or link to existing content, rather than duplicate it.

Read 2-3 similar pages to match the voice, structure, and formatting of the site.

## Run the project

1. Check `package.json`.
   If `scripts` has an entry that starts the project, use it with the package manager of the lock file:
   `npm run start` (`package-lock.json`), `pnpm start` (`pnpm-lock.yaml`), or `yarn start` (`yarn.lock`).
   Use npm when there is no lock file.
2. Without a start script, run `npx @redocly/cli preview`.

The preview serves the project on `http://localhost:4000`, unless a script or the `-p` option sets another port.
It reloads when you save a file.
It never exits, so start it as a background process and read its output.
The output reports wrong tag names, broken links, and pages that no sidebar lists.

### Preview options

| Option | Description |
|--------|-------------|
| `--port`, `-p` | Port. Default: `4000`. |
| `--project-dir`, `-d` | Project directory. Default: `.`. |
| `--product` | `redoc`, `revel`, `reef`, `realm`, `redoc-revel`, `redoc-reef`, `revel-reef`. Default: from `package.json`, else `realm`. |
| `--plan` | `pro` or `enterprise`. Default: `enterprise`, so all features work in the preview. Production uses the real plan of the project. |

To see how the site looks with the product and plan of the project, set both options: `npx @redocly/cli preview --product=reef --plan=pro`.

### Check your work

Read the output of the preview first.
To validate `redocly.yaml`, run `npx @redocly/cli check-config`. 
It names unknown keys.

Full reference: https://redocly.com/docs/cli/commands/preview.md

## File format

Redocly pages are Markdown files (`.md`) with [Markdoc](https://markdoc.io/) tags and optional YAML front matter, or React pages with extension `.page.tsx`.

```treeview
project/
├── redocly.yaml        # Site configuration (optional, needed for most customization)
├── sidebars.yaml       # Left navigation (optional)
├── package.json        # Product version and dependencies (optional)
├── index.md            # Page at /
├── guides/
│   ├── index.md        # Page at /guides
│   └── example.md      # Page at /guides/example
├── apis/
│   └── openapi.yaml    # API reference at /apis/openapi
├── images/
├── _partials/          # Reusable content, not published as pages
├── static/             # Copied to the output root as is
└── @theme/             # Custom CSS, component overrides, custom Markdoc tags
```

### Routing

| File | URL |
| --- | --- |
| `guides/example.md` | `/guides/example` |
| `guides/index.md` | `/guides` |
| `changelog.page.tsx` | `/changelog` |
| `apis/cafe-api.yaml` | `/apis/cafe-api` |
| `config/@v2/guide.md`, `v2` is the default version | `/config/guide` |
| `config/@v1/guide.md`, `v1` is not the default version | `/config/v1/guide` |
| `static/robots.txt` | `/robots.txt` |
| `_partials/rate-limits.md` | No page |

- The file path sets the URL. To change a URL, move or rename the file. This is also true for API description files.
- A file named `index` is the page of its folder. Examples: `index.md`, `index.page.tsx`, `index.yaml`.
- To add a URL without moving the file, set `slug` in the front matter.
- A Redocly project reserves the `@theme`, `@l10n`, `@api`, and `@skills` folders.
  Any other folder that starts with `@` is a content version, for example `@v2`.
  A misspelled reserved folder, such as `@themes`, becomes a version folder and causes no error.
- An underscore prefix does not hide a file.
  Only partials folders, `ignore` paths, and the reserved `@` folders stay out of the routes.
- Files that resolve to the same route get a suffix: `payments/index.md`, `payments.md`, and `payments.yaml` become `/payments`, `/payments-1`, and `/payments-2`.

Full reference: https://redocly.com/docs/realm/content/project-structure.md

### File naming

- Match the existing patterns in the folder.
- If there are no existing files, or the patterns are mixed, use kebab-case: `getting-started.md`.
- When a `sidebars.yaml` file exists, add each new page to it, or the page has no sidebar.

### Internal links

- Link to the file, relative to the page, with the extension: `[Quickstart](./quickstart.md)`, `[Setup](../setup/index.md#install)`, `[API](../apis/cafe-api.yaml)`.
- A path that starts with `/` resolves from the project root: `[Quickstart](/guides/quickstart.md)`.
- Link to files, not to built URLs (`/guides/quickstart`) or absolute URLs of the same site.
  A Redocly project adjusts file links for locales and version folders.
- In a React page, use `Link` from `@redocly/theme/components/Link/Link`, so that the path prefix and the locale stay correct.

Navbar, sidebar, and footer entries also link to files.
The base of a relative path depends on the file that contains it:

| Where you write the path | Base of a relative path |
| --- | --- |
| A Markdown page | The folder of that page |
| A `sidebars.yaml` file | The folder of that sidebar file |
| `redocly.yaml` (`navbar`, `footer`, `breadcrumbs`) | The project root |

Full reference: https://redocly.com/docs/realm/content/links.md

### Images and static files

Store images in an `images/` folder near the pages that use them.
Reference them with relative paths.
All images need descriptive alt text.

```markdown
![Dashboard with the analytics overview](./images/dashboard.png)
```

Files in `static/` in the project root are copied to the output root without processing: `static/robots.txt` is served at `/robots.txt`.
Use `static/` for `robots.txt`, verification files, and assets that need a fixed path, and link to them with absolute paths.
Keep other images next to the content, because only those are optimized.

Full reference: https://redocly.com/docs/realm/customization/static-assets.md

## Page front matter

Front matter is not required, but it is useful.
Use it to set the title and SEO data of a page, and give it a custom URL.

```yaml
---
seo:
  title: Clear, descriptive title
  description: Concise summary for search results and link previews.
slug: /custom-url
---
```

**The page title comes from `seo.title`, or else from the first H1 in the file.**
A `title:` key does not set it.
Use one H1 per page, and start sections at H2.
React pages set front matter with `export const frontmatter = { ... }`.

| Field | Description |
|-------|-------------|
| `seo.title`, `seo.description` | Page title in the browser tab and the navigation label, and the description for search results. |
| `slug` | Custom URL. A list serves the page at more than one URL. |
| `excludeFromSearch` | Remove the page from site search, AI search, `llms.txt`, and the sitemap. It does not stop Google. |
| `sidebar.path` | The sidebar file for this page. No other sub-option: no `label`, no `hide`. |

For all other front matter fields, and for page-level overrides of `redocly.yaml` settings (such as `feedback`, `toc`, `navbar.hide`, or `rbac`), load the `redocly-configuration` skill, if it is installed (or fetch https://redocly.com/docs/realm/config/front-matter-config.md).

## Markdoc basics

Pages use [Markdoc](https://markdoc.io/): standard Markdown plus tags.
A tag with content has an opening and a closing tag, and a self-closing tag ends with `/%}`.

```markdoc
{% admonition type="info" name="Note" %}
Markdown works inside tags.
{% /admonition %}
```

For all built-in tags, their attributes, examples, variables, and functions, load the `redocly-markdoc-tags` skill, if it is installed (or fetch https://redocly.com/docs/realm/content/markdoc-tags/tag-library.md).

### Code blocks

Simple code block example:

````markdown
```javascript {% title="app.js" %}
function processData() {
  const data = fetchData();
  return data;
}
```
````

| Fence attribute | Description |
| --- | --- |
| `title` | Header text, usually a file name. In `code-group`, the tab name. |
| `process=false` | Show Markdoc tags in the block as text. By default, Markdoc processes tags inside the fence. |

Use the `treeview` language for folder structures.
Use `mermaid`, `plantuml`, or `excalidraw` for diagrams, with optional `align` (`left`, `center`, `right`) and `width` fence attributes.
To keep a diagram in its own file, use `{% diagram file="./architecture.mermaid" type="mermaid" /%}`.

Full reference: https://redocly.com/docs/realm/content/markdown.md

## Common mistakes

| Mistake | Correct approach |
| --- | --- |
| `title:` in the front matter to set the page title | `seo.title`, or the first H1 |
| A link without the extension (`./quickstart`), or to the built URL | Link to the file: `./quickstart.md` |
| `.mdx` files | `.md` |
| An underscore prefix to hide a file | A partials folder, or `ignore` |
| `excludeFromSearch` to hide a page from Google | A `robots` `noindex` meta tag with `seo.meta` |
| `seo.noindex: true` | `seo.meta: [{name: robots, content: noindex}]` |
| Building or hosting the production site locally | Production builds happen in Reunite |
| Guessing an option name | Get the live page |
