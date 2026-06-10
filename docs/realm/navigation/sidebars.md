---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
keywords:
  includes:
    - sidebar
    - sidebars
---

# Sidebars

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The sidebar is generated automatically based on your project's file structure if no `sidebars.yaml` file exists.
By default, items in the sidebar menu are sorted using natural ordering: letter characters follow the alphabetical order and multi-digit numbers are treated as a single character.
`index.md` files by default appear as the first item in any sidebar.

For example, the following files: `index.md`, `concept-1.md`, `concept-11.md`, and `concept-2.md`, result in the following sidebar:

```treeview {% title="Example sidebar order" %}
├── index.md
├── concept-1.md
├── concept-2.md
└── concept-11.md
```

API description files automatically add items to the sidebars.
These items are generated according to the internal structure of the tags and endpoints described in the file and preserve the order of this structure.

You can customize the sidebar by adding a `sidebars.yaml` file to the root of your project.
A `sidebars.yaml` file must include all files or directories you want to have in a sidebar: new files and directories aren't added automatically.

Link titles in the sidebar are by default the first heading title on the page.
You can use the [`label`](#link-options) option in a `sidebars.yaml` file to change the link title.

Projects that have [multiple products](./multi-product.md) or the [catalog](../config/catalog-classic.md), generate separate sidebars for each of item.

In complex projects, you can add separate `sidebars.yaml` files for each section of your project.
Either add the files in project folders, or in the root folder with prefixes (for example: `installation.sidebars.yaml`. `config.sidebars.yaml`), then reference these files in the `sidebars.yaml` at the root of your project.

To hide the sidebar for your entire project, use the [`sidebar` option](../config/sidebar.md) in `redocly.yaml`.

## Sidebars configuration options

Specify the order and link text for side navigation items by creating a `sidebars.yaml` file.

### Link options

{% table %}

- Option
- Type
- Description

---

- page
- string
-
  **CONDITIONALLY REQUIRED.***
  Path to the file (extension included) that links to a page.
  If no `label` is provided, the link text matches _the page's level 1 heading_.
  Use an absolute or relative path.
  For external links, use `href` instead.
  Examples: `./index.md`, `/docs/tutorial.md`, `../../glossary.md`, `/info#admonition`, `./test.md#rename`.

---

- href
- string
-
  **CONDITIONALLY REQUIRED.***
  URL to link to.
  Works with absolute and relative URLs.
  If no `label` is provided, the link text matches _the href value_.
  The link checker does not follow `href` links.
  Use a URL, not a page path (✅ `https://redocly.com`; ❌ `./index.md`).

---

- label
- string
- Link text displayed for the item.

---

- labelTranslationKey
- string
- Sets the translation key for an item's link text.
  Used for [localization](../content/localization/localize-labels.md#localize-base-ui-components).

---

- external
- boolean
- Opens item in a new tab and adds an external link symbol.
  Defaults to `false`.
  Does not apply to paths to version subfolders.

---

- disconnect
- boolean
- Includes links in the sidebar without assigning the sidebar to that page.
  Defaults to `false`.

---

{% raw-partial file="../_partials/nav-item-icon-property-row.md" /%}

---

- rbac
- object
- Page-level access controls for sidebar links.
  See [Configure RBAC in sidebar](../access/links-and-groups-permissions.md#in-the-sidebar) for more information.

---

- additionalProps
- object
- Additional properties for the sidebar item.
  Pass arbitrary data that can be accessed in custom theme components.
  To learn how to customize theme components, see: [Eject components](../customization/eject-components/index.md).

---

- badges
- [[Badge object](#badge-object)]
- List of badges to display next to the sidebar item label.
  Each badge has a `name` (required) and optional `color`.

{% /table %}

\* Sidebar links must use either the `page` or `href` option ("mutually exclusive").

### Group options

{% table %}

- Option
- Type
- Description

---

- group
- string
-
  **REQUIRED.**
  Name of the group.

---

- page
- string
- Path to the file that loads when the group is clicked.

---

- directory
- string
- Path to a folder.
  Files in the folder automatically appear in the sidebar and are sorted in the natural order.

---

- groupTranslationKey
- string
- Sets the translation key for a group.
  Used for [localization](../content/localization/localize-labels.md#localize-base-ui-components).

---

- menuStyle
- string
-
  Values:
  `drilldown` -- Shows only the selected group's items and hides other sidebar elements.

---

- expanded
- string
-
  Values:
  `true` -- Items are expanded when page loads.
  Users can collapse the group.
  `false` -- **Default**.
  Items are collapsed when page loads.
  Users can expand.
  `always` -- Items are expanded when page loads and cannot be collapsed.

---

- selectFirstItemOnExpand
- boolean
- Opens the first item in a group when the group is expanded.
  Defaults to `false`.

---

{% raw-partial file="../_partials/nav-item-icon-property-row.md" /%}

---

- items
-
  object
  ([Link](#link-options))
- **REQUIRED.**
  A list of items, configured using [link options](#link-options).

{% /table %}

### Separator options

{% table %}

- Option
- Type
- Description

---

- separator
- string
- Static text that separates items on the sidebar.

---

{% raw-partial file="../_partials/nav-item-icon-property-row.md" /%}

---

- separatorLine
- boolean
- Horizontal bar that breaks the sidebar into sections.
  Works in sidebar root or inside a group.

---

- $ref
- string
- Path to another sidebar file.
  Entries from the referenced sidebar expand into this sidebar.

{% /table %}

### Badge object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED**.
  The text that displays in the badge.

---

- color
- string
- The color of the badge.
  Supports predefined color names for consistent styling or direct color values for custom backgrounds.

  **Supported color names:**
  `red`, `green`, `blue`, `grey`, `turquoise`, `magenta`, `purple`, `carrot`, `raspberry`, `orange`, `grass`, `persian-green`, `sky`, `blueberry`.

  **Supported status colors:**
  `success`, `processing`, `error`, `warning`, `default`, `approved`, `declined`, `pending`, `active`, `draft`, `deprecated`, `product`.

  Defaults to `grey`.
---

- position
- string
- The position of the badge relative to the label text.
  Possible values: `before`, `after`.
  Defaults to `after`.

---

- icon
- string
- Icon to display inside the badge.
  Accepts a [Font Awesome](https://fontawesome.com/icons) icon name or a relative path to an icon image file.

{% /table %}

### Icon object

{% partial file="../_partials/nav-icon-object-table.md" /%}

## Examples

### Basic sidebar structure

The following example shows a simple `sidebars.yaml` file with pages and basic groups:

```yaml {% title="sidebars.yaml" %}
- page: overview.md
- page: installation.md
  label: Installation
- group: Getting started
  items:
    - page: quickstart.md
    - page: tutorials/first-steps.md
      label: First steps
- group: API reference
  items:
    - page: users-api.yaml
      label: Users API
    - page: orders-api.yaml
      label: Orders API
```

### Groups with landing pages

Groups can navigate to a landing page when clicked by adding a `page` property:

```yaml {% title="sidebars.yaml" %}
- page: overview.md
- group: User guides
  page: guides/index.md
  selectFirstItemOnExpand: true
  items:
    - page: guides/getting-started.md
      label: Getting started
    - page: guides/advanced.md
      label: Advanced usage
- group: API reference
  page: api/index.md
  items:
    - page: api/users.yaml
      label: Users API
    - page: api/orders.yaml
      label: Orders API
```

### Nested groups and expand behavior

Groups can contain other groups and have customizable expand behavior:

```yaml {% title="sidebars.yaml" %}
- page: overview.md
- group: Documentation
  expanded: true
  items:
    - page: docs/getting-started.md
    - group: Guides
      expanded: false
      items:
        - page: guides/authentication.md
        - page: guides/rate-limiting.md
    - group: Advanced topics
      expanded: always
      items:
        - page: advanced/webhooks.md
        - page: advanced/custom-domains.md
```

### Separators and organization

Use separators to organize sidebar content into distinct sections:

```yaml {% title="sidebars.yaml" %}
- group: User documentation
  items:
    - separator: Getting started
      icon: book
    - page: quickstart.md
    - page: installation.md
    - separator: Advanced features
    - page: advanced/webhooks.md
    - page: advanced/integrations.md
    - separatorLine: true
    - separator: API reference
    - page: api/users.yaml
    - page: api/orders.yaml
```

### Complete sidebar configuration

The following example shows a comprehensive `sidebars.yaml` file with various options:

```yaml {% title="sidebars.yaml" %}
- page: overview.md
- page: installation.md
  label: Installation
- group: Configuration
  icon: duotone cog
  selectFirstItemOnExpand: true
  expanded: true
  items:
    - page: config/index.md
    - page: config/developer-onboarding.md
      label: Developer onboarding
    - group: Reference
      page: config/reference/index.md
      separatorLine: true
      items:
        - page: config/reference/config-files.md
          label: Config files
- group: Content
  menuStyle: drilldown
  icon: ./images/content-icon.png
  items:
    - directory: content
- $ref: ./templates/sidebars.yaml
- group: Plugins
  items:
    - directory: plugins
- page: /setup-links#config
- group: Resources
  separatorLine: true
  items:
    - href: https://redocly.com/docs
      label: Documentation
      external: true
    - href: /docs/cli/v1.3
      label: Legacy CLI docs
```

### Additional properties

Use `additionalProps` to add custom data to sidebar items:

```yaml {% title="sidebars.yaml" %}
- page: overview.md
  label: Overview
  additionalProps:
    difficulty: beginner
- group: Getting started
  items:
    - page: quickstart.md
      label: Quick Start
      additionalProps:
        estimatedTime: 5 minutes
    - page: installation.md
      label: Installation
      additionalProps:
        difficulty: beginner
```

Custom theme components can access these properties to display additional information or implement custom behavior.

### Badges

Use `badges` to add visual indicators to sidebar items:

```yaml {% title="sidebars.yaml" %}
- page: overview.md
  label: Overview
- page: new-feature.md
  label: New Feature
  badges:
    - name: New
      color: green
      icon: solid star
- page: experimental-api.md
  label: Experimental API
  badges:
    - name: Beta
      color: '#ff9800'
      position: before
    - name: Unstable
      color: var(--color-danger-base)
- group: Deprecated APIs
  items:
    - page: legacy-api.md
      label: Legacy API
      badges:
        - name: Deprecated
          color: var(--color-warning-base)
```

## Resources

- **[Navigation elements](./index.md)** - Overview of all navigation components and patterns for creating comprehensive site navigation structures
- **[Navbar configuration](../config/navbar.md)** - Configure the navbar navigation with links
- **[Footer configuration](../config/footer.md)** - Configure the footer navigation with links, copyright information, and organizational elements
- **[Front matter configuration](../config/front-matter-config.md)** - Use front matter add a sidebar on individual pages for custom page layouts
