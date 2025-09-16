---
products:
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Customize behavior and appearance of pages rendered from Markdown files.
---
# `markdown`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The `markdown` settings are used to customize the behavior and appearance of pages that render from Markdown files.

## Options

{% table %}

- Option
- Type
- Description

---

- frontMatterKeysToResolve
- [string]
- A list where each entry is a front matter key to resolve at build time.
  By default, values for `image` and `links` are resolved.

---

- partialsFolders
- [string]
- A list of directory paths to folders used for storing partials.
  The `_partials` folder works by default, but all other folders must be listed in `partialsFolder` in order to work with partials.

---

- lastUpdatedBlock
- [Last updated object](#last-updated-object)
- Configures the "Last updated..." string that renders at the top of pages.
{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "lastUpdatedBlock"} /%}

---

- toc
- [Table of contents object](#table-of-contents-object)
- Controls the page table of contents.
{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "toc"} /%}

---

- editPage
- [Edit page object](#edit-page-object)
- Toggle the appearance of an **edit page** button.
  When clicked, users are directed to the public GitHub repo for the current page.
{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "editPage"} /%}

{% /table %}

### Last updated object

{% table %}

- Option
- Type
- Description

---

- format
- string
- Specifies the format of the last updated time displayed.
  Possible values: `iso`, `short`, `long`, or `timeago`.
  Default value: `timeago`.

---

- locale
- string
- Locale of the date.
  Works with [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) country codes.
  Default value: `en-US`.

---

- hide
- boolean
- Control the visibility of the last updated time.
  Default value: `false`.

{% /table %}

### Table of contents object

{% table %}

- Option
- Type
- Description

---

- header
- string
- Configure the heading of the table of contents.
  Default value: `On this page`.

---

- depth
- integer
- Set the maximum depth of the heading displayed in the table of contents.
  Default value: `3` Minimum value: `1`.

---

- hide
- boolean
- Control the visibility of the table of contents.
  Default value: `false`.

{% /table %}

### Edit page object

{% table %}

- Option
- Type
- Description

---

- baseUrl
- string
- Set the base URL that the page's path is appended to.
  The link should direct users somewhere to submit an edit, for example a public GitHub repo.

---

- hide
- boolean
- Control the visibility of the edit page button.
  Default value: `true`.

{% /table %}

## Examples

Define project-level defaults using the `redocly.yaml` configuration file in your root directory, as in the following example:

```yaml {% title="redocly.yaml" %}
markdown:
  frontMatterKeysToResolve: ['screen-recordings', 'image', 'links']
  partialsFolders: ['_guide-partials']
  lastUpdatedBlock:
    format: long
    locale: en-US
  toc:
    header: Page sections
    depth: 3
  editPage:
    baseUrl: 'https://github.com/Redocly/redocly-cli/tree/main/docs'
    hide: false
```

When needed, add page-level overrides in the front matter of markdown pages, as in the following example:

```markdown
---
markdown:
  lastUpdatedBlock:
    hide: true
  toc:
    header: Tutorial steps
    depth: 5
  editPage:
    hide: true
---

# Some amazing guide

Amazing markdown content...

```

## Resources

- **[Breadcrumbs configuration](./breadcrumbs.md)** - Configure page breadcrumbs to improve navigation and user orientation within your documentation
- **[Links configuration](./links.md)** - Configure link behavior and styling for consistent navigation and external link handling
- **[Front matter configuration](./front-matter-config.md)** - Use front matter to configure Markdown options on individual pages for granular control
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation customization
