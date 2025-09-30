# Sidebars configuration options

Specify the order and link text for side navigation items by creating a `sidebars.yaml` file.

## Link options

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
  Examples: `./index.md`, `/docs/tutorial.md`, `../../glossary.md`.

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

- icon
- string
- Either:
  - A [Font Awesome](https://fontawesome.com/icons) icon name.
    Realm has the following icon packs built in: Classic Regular, Classic Solid, Duotone Solid, and Classic Brands.
    The icons automatically adjust their colors when users change the color mode.

    To add an icon from the Classic Regular pack, you can provide the icon name only or prefix the name with `regular`.
    To add an icon from other built-in packs, prefix the icon name with: `solid` (for Classic Solid), `duotone` (for Duotone Solid), or `brands` (for Classic Brands).

    **Examples:** `book`, `duotone book`, `brands github`

    Using other prefixes, including the `fa-` prefix, causes the icon to not render.
  - Relative path to an icon image file.

    **Example:** `./images/config-icon.svg`

---

- rbac
- object
- Page-level access controls for sidebar links.
  See [Configure RBAC in sidebar](../access/links-and-groups-permissions.md#in-the-sidebar) for more information.

{% /table %}

\* Sidebar links must use either the `page` or `href` option ("mutually exclusive").

## Group options

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
  Files in the folder automatically appear in the sidebar and are sorted in the **natural order**.

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

- icon
- string
- Either:
  - A [Font Awesome](https://fontawesome.com/icons) icon name.
    Realm has the following icon packs built in: Classic Regular, Classic Solid, Duotone Solid, and Classic Brands.
    The icons automatically adjust their colors when users change the color mode.

    To add an icon from the Classic Regular pack, you can provide the icon name only or prefix the name with `regular`.
    To add an icon from other built-in packs, prefix the icon name with: `solid` (for Classic Solid), `duotone` (for Duotone Solid), or `brands` (for Classic Brands).

    **Examples:** `book`, `duotone book`, `brands github`

    Using other prefixes, including the `fa-` prefix, causes the icon to not render.
  - Relative path to an icon image file.

    **Example:** `./images/config-icon.svg`

---

- items
-
  object
  ([Link](#link-options))
- **REQUIRED.**
  A list of items, configured using [link options](#link-options).

{% /table %}

## Additional options

{% table %}

- Option
- Type
- Description

---

- separator
- string
- Static text that separates items on the sidebar.

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
- group: Resources
  separatorLine: true
  items:
    - href: https://redocly.com/docs
      label: Documentation
      external: true
    - href: /docs/cli/v1.3
      label: Legacy CLI docs
```

## Resources

- **[Navigation elements](./index.md)** - Overview of all navigation components and patterns for creating comprehensive site navigation structures
- **[Navbar configuration](../config/footer.md)** - Configure the navbar navigation with links
- **[Footer configuration](../config/footer.md)** - Configure the footer navigation with links, copyright information, and organizational elements
- **[Front matter configuration](../config/front-matter-config.md)** - Use front matter add a sidebar on individual pages for custom page layouts
