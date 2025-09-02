# Front matter configuration options

Add front matter to Markdown pages to configure page-specific options.
Front matter must appear at the beginning of a Markdown file in valid YAML format between triple-dashed lines (`---`).

Front matter options fall into two categories:
- Options available **only** in page front matter
- Options that **override** global configurations from `redocly.yaml`

## Front matter-only options

These options are available exclusively in front matter:

{% table %}

- Option
- Type
- Description

---

- excludeFromSearch
- boolean
- Exclude the page from search results and from `llms.txt` file when set to `true`.
  Default: `false`.

  {% admonition type="info" %}
  Search indexes are only built on the production branch.
  Changes to `excludeFromSearch` may not immediately appear in search results until the next production build.
  {% /admonition %}

  To exclude OpenAPI description files from search, see: [`openapi` configuration](./openapi/index.md).

---

- sidebar
- string
- Path to the `sidebars.yaml` file to display as the sidebar for this page.

---

- slug
- string | [string]
- Custom URL path for this page, instead of the default path based on folder and file names.
  Define multiple slugs to make content available at multiple URLs.
  Slugs can contain multiple segments (e.g., '/custom-pages/page-1').

---

- template
- string
- Path to a custom template for the Markdown page.
  Omit file extensions.
  Use relative paths for local templates and absolute paths for templates from node modules.
  See [Override a page template](../customization/custom-page-templates.md) for details.

---

- navigation
- [`page` and `label` options](./navigation.md#options-that-apply-to-front-matter-only)
- Customize the links and button labels of `nextButton` and `previousButton`.
  These options are available for front matter config only.

{% /table %}

## Options that override global configuration

These options work in both front matter and `redocly.yaml`.
When defined in front matter, they override the global configuration:

{% table %}

- Option
- Type
- Description

---

- [breadcrumbs](./breadcrumbs.md)
- object
- Toggle breadcrumbs display or prefix them with custom links.

---

- [codeSnippet](./code-snippet.md)
- object
- Configure code snippet controls such as `copy`, `report`, `expand`, and `collapse`.

---

- [colorMode](./color-mode.md)
- object
- Toggle color mode switcher display with the `hide` option.

---

- [feedback](./feedback.md)
- object
- Customize or hide the sentiment feedback form at the bottom of pages.

---

- [footer](./footer.md)
- object
- Toggle footer display with the `hide` option (the only footer property available in front matter).

---

- [markdown](./markdown.md)
- object
- Customize element behavior and appearance, including [last updated](./markdown.md#last-updated-object), [table of contents](./markdown.md#table-of-contents-object), and [edit page](./markdown.md#edit-page-object).

---

- [navigation](./navigation.md)
- object
- Customize the behavior and appearance of the **Next page** and **Previous page** navigation buttons.

---

- [navbar](./navbar.md)
- object
- Toggle navbar display with the `hide` option (the only navbar property available in front matter).

---

- rbac
- [Map[string, string]](./rbac.md#team-to-role-map)
- Map of teams to roles.
  Set access permissions for the page.

---

- [search](./search.md)
- object
- Customize the behavior and appearance of the **Search** dialog.

---

- [seo](./seo.md)
- object
- Configure SEO information in the page's `<head>` element.

---

- [versionPicker](./version-picker.md)
- object
- Set the visibility of the version picker.

{% /table %}

## Examples

### Example 1: Custom URL and page template

This configuration:
- Creates two interchangeable URL paths: `/pricing` and `/subscribe`
- Uses a custom blog post template
- Hides the color mode switcher

```yaml
---
slug:
  - /pricing
  - /subscribe
template: '@theme/Templates/BlogPost'
colorMode:
  hide: true
---
```

### Example 2: SEO and component configuration

This configuration:
- Prevents search engine indexing
- Hides the report button on code snippets
- Limits table of contents to h2 headers
- Adds a "Home" link to the page breadcrumbs

```yaml
---
seo:
  meta:
    - name: robots
      content: noindex
codeSnippet:
  report:
    hide: true
markdown:
  toc:
    depth: 2
breadcrumbs:
  prefixItems:
    - page: index.page.tsx
      label: Home
      labelTranslationKey: home.title
---
```

## Best practices

Use `redocly.yaml` for most configuration settings and use front matter only for page-specific overrides.

## Resources

- **[Override a page template](../customization/custom-page-templates.md)** - Create custom page templates to override default layouts and implement unique page designs
- **[Configure Redocly](./index.md)** - Complete configuration reference for the redocly.yaml file and project settings
- **[Block search indexing](./seo.md#control-search-indexing)** - Use the noindex rule in front matter to control search engine indexing on specific pages
