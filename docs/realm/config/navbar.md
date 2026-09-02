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
description: Configure a navbar for your project.
---
# `navbar`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Configure a navbar for your project.
The navbar appears across the top of the published project.
You can configure the links and groups of links that appear on the navbar of your site, or hide the navbar altogether.
The navbar is a good location for top-level category or frequently-used links.

## Options

{% table %}

- Option
- Type
- Description

---

- items
- [Item](#item-object) | [Group](#group-object)
- List of items in the Navbar.

---

- secondary
- [Secondary navbar](#secondary-navbar-object)
- Row of section links below the navbar.
  Shown when the active navbar item has no `secondary` items of its own.

---

- hide
- boolean
- Hides the navbar.
  Default: `false`.

  {% partial file="../_partials/config/_supported-config.md" variables={"optionName": "navbar.hide"} /%}

{% /table %}

### Group object

{% table %}

- Option
- Type
- Description

---

- group
- string
- **REQUIRED.**
  Name of the group.

---

- groupTranslationKey
- string
- Specifies the group name key used for [localization](./l10n.md).

---

- items
- [Item](#item-object)
- **REQUIRED.**
  List of items.
  The navbar for the default theme may only have one level of depth to groups.

---

- linkedSidebars
- [string]
- List of relative paths to sidebar files.
  This option adds the navbar item to a sidebar's breadcrumbs.
  Only effective for top-level navbar items.

---

{% raw-partial file="../_partials/nav-item-icon-property-row.md" /%}

---

- external
- boolean
- Open link in new browser tab.
  Default: `false`.

---

- page
- string
- Relative or absolute path to the file (extension included) which represents the page to link to.
  **Mutually exclusive** with the `href` option.

---

- href
- string
- URL to link to.
  **Mutually exclusive** with the `page` option.

---

- activeFor
- [string]
- Globs of published page paths that keep this group active.
  Paths are relative to the site root and exclude the file extension, the locale prefix, and any deployment path prefix, so use `apis/reference`, not `apis/reference.md`.
  Product configuration does not change this: paths stay relative to the site root.
  `*` matches within one path segment and `**` matches any depth.
  A trailing `/**` also matches the directory itself, so `apis/**` covers `apis`.

---

- secondary
- [Secondary navbar](#secondary-navbar-object)
- Row of section links shown while this group is active.

{% /table %}

### Item object

{% table %}

- Option
- Type
- Description

---

- label
- string
- Link text displayed for the item.

---

- labelTranslationKey
- string
- Link text key for the item used for internationalization.

---

{% raw-partial file="../_partials/nav-item-icon-property-row.md" /%}

---

{% raw-partial file="../_partials/nav-page-href-property-rows.md" /%}

---

- external
- boolean
- Open link in new browser tab.
  Default: `false`.

---

- linkedSidebars
- [string]
- List of relative paths to sidebar files.
  This option adds navbar item to sidebar's breadcrumbs.
  Only effective for top-level navbar items.

---

- additionalProps
- object
- Additional properties for the navbar item.
  Pass arbitrary data for custom theme components to read.
  To learn how to customize theme components, see: [Eject components](../customization/eject-components/index.md).

---

- activeFor
- [string]
- Globs of published page paths that keep this item active.
  Paths are relative to the site root and exclude the file extension, the locale prefix, and any deployment path prefix, so use `apis/reference`, not `apis/reference.md`.
  Product configuration does not change this: paths stay relative to the site root.
  `*` matches within one path segment and `**` matches any depth.
  A trailing `/**` also matches the directory itself, so `apis/**` covers `apis`.

---

- secondary
- [Secondary navbar](#secondary-navbar-object)
- Row of section links shown while this item is active.
  Only effective for top-level navbar items.

{% /table %}


### Icon object

{% partial file="../_partials/nav-icon-object-table.md" /%}

### Secondary navbar object

{% table %}

- Option
- Type
- Description

---

- items
- [[Secondary item](#secondary-item-object)]
- List of items in the secondary navbar.

---

- hide
- boolean
- Hides the secondary navbar.
  On a navbar item, `hide: true` removes the row for that section and skips the top-level `navbar.secondary`.
  Default: `false`.

{% /table %}

The secondary navbar is a second row inside the navbar, below the primary row.
It renders only when `items` has at least one item that resolves to a page or URL, so existing projects look the same.

Items render as one row of links.
An item with `group` renders as a dropdown of its `items`.
Groups have one level and no separators.

Declare `secondary` on a navbar item to give that section its own row.
The active navbar item supplies the row, so the row changes as the reader moves between sections.
A navbar group counts as active when any of its items matches the current page.
When the active navbar item declares no `secondary` items, the row falls back to the top-level `navbar.secondary`.
Without a fallback, no row renders.
The same applies when [`rbac`](#secondary-item-object) removes every item the reader could have seen.

### Secondary item object

{% table %}

- Option
- Type
- Description

---

- label
- string
- Link text displayed for the item.

---

- labelTranslationKey
- string
- Link text key for the item used for internationalization.

---

{% raw-partial file="../_partials/nav-item-icon-property-row.md" /%}

---

{% raw-partial file="../_partials/nav-page-href-property-rows.md" /%}

---

- external
- boolean
- Open link in new browser tab.
  Default: `false`.

---

- activeFor
- [string]
- Globs of published page paths that keep this item active.
  Paths are relative to the site root and exclude the file extension, the locale prefix, and any deployment path prefix, so use `apis/reference`, not `apis/reference.md`.
  Product configuration does not change this: paths stay relative to the site root.
  `*` matches within one path segment and `**` matches any depth.
  A trailing `/**` also matches the directory itself, so `apis/**` covers `apis`.

---

- rbac
- object
- Team-to-role map that controls who sees the item.
  The server removes items the reader cannot access before it sends the page, so restricted labels and links never reach the browser.
  A row left with no items behaves like a row that declares none.

---

- group
- string
- Name of the group.
  Renders the item as a dropdown of its `items` instead of a link.

---

- groupTranslationKey
- string
- Specifies the group name key used for [localization](./l10n.md).

---

- items
- [[Secondary item](#secondary-item-object)]
- Items shown in the group's dropdown.
  Groups have one level and cannot nest.

{% /table %}

## Active item

An item becomes active when its link matches the current page exactly.
Otherwise, the item whose link is the longest prefix of the current path becomes active, so an `apis` item stays active on `apis/reference`.
An `activeFor` match wins over a prefix match, and an exact match wins over both.

An item that links to the site root stays active only on the root page; it never matches by prefix.
An item whose link includes a hash matches only when the current page and the hash both match; it never matches by prefix.
A group is active when the group itself, or any of its items, matches by link or by `activeFor`.
When nothing matches, no item is active.

## Examples

### Simple navigation

The following is an example configuration for a simple flat navbar.

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - page: index.md
      label: Home
    - page: docs/getting-started.md
      label: Getting Started
    - page: api-reference.yaml
      label: API Reference
    - label: Support
      href: https://support.example.com
      external: true
```

The following is a screenshot of that navbar.

{% img
  src="./images/1-level-navbar.png"
  alt="1 level Navbar"
  withLightbox=true
/%}

### Complete navigation setup

The following example shows a comprehensive navbar configuration for a documentation site with multiple sections, localization support, and external links:

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - page: index.md
      label: Home
      labelTranslationKey: nav.home
    - group: Documentation
      groupTranslationKey: nav.docs
      items:
        - page: docs/getting-started.md
          label: Getting Started
          labelTranslationKey: nav.getting-started
        - page: docs/guides/index.md
          label: Guides
          labelTranslationKey: nav.guides
        - page: docs/tutorials/index.md
          label: Tutorials
    - group: API Reference
      items:
        - page: users-api.yaml
          label: Users API
        - page: orders-api.yaml
          label: Orders API
        - page: webhooks-api.yaml
          label: Webhooks API
    - page: changelog.md
      label: Changelog
    - label: Support
      href: https://support.example.com
      external: true
      icon: ./images/support-icon.svg
```

### Multi-product navigation

For sites with multiple products, organize content using groups and linked sidebars:

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - page: index.md
      label: Home
    - group: Products
      items:
        - page: product-a/index.md
          label: Product A
          linkedSidebars:
            - product-a/sidebars.yaml
        - page: product-b/index.md
          label: Product B
          linkedSidebars:
            - product-b/sidebars.yaml
    - page: support.md
      label: Support
```

### Dropdown menu with separators

The following is an example of a dropdown menu with visual separators for better organization:

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - group: Products
      items:
        - page: platform/index.md
          label: Platform
        - page: api-gateway/index.md
          label: API Gateway
        - separator: Developer Tools
        - page: cli/index.md
          label: CLI
        - page: sdk/index.md
          label: SDK
    - label: Pricing
      page: pricing.md
    - label: Enterprise
      page: enterprise.md
```

The following is the screenshot of the navbar.

{% img
  src="./images/dropdown-menu.png"
  alt="Dropdown menu"
  withLightbox=true
/%}

### Secondary navbar per navbar item

Give each navbar item its own row, so the row changes as readers move between sections:

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - page: guides/index.md
      label: Guides
      secondary:
        items:
          - page: guides/index.md
            label: Overview
          - page: guides/auth.md
            label: Authentication
    - page: apis/index.md
      label: APIs
      secondary:
        items:
          - page: apis/rest.md
            label: REST
          - page: apis/graphql.md
            label: GraphQL
  secondary:
    items:
      - page: index.md
        label: Home
```

On `guides/auth.md` the row displays **Overview** and **Authentication**.
On `apis/rest.md` it displays **REST** and **GraphQL**.
Anywhere outside both sections it falls back to **Home**.

### Secondary navbar for the whole project

Add a single row of section links below the navbar:

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - page: index.md
      label: Home
  secondary:
    items:
      - page: getting-started/index.md
        label: Get started
        activeFor:
          - getting-started/**
      - page: apis/index.md
        label: APIs
        icon: ./images/api.svg
        activeFor:
          - apis/**
      - href: https://apps.example.com
        label: Apps
        external: true
```

Hide the project-level row on a single page with front matter.
A row that comes from a navbar item's `secondary` stays visible:

```yaml
---
navbar:
  secondary:
    hide: true
---
```

Product configuration replaces the whole `navbar` section.
Re-declare `secondary` in a product's `redocly.yaml` to give that product its own row:

```yaml {% title="apis/redocly.yaml" %}
navbar:
  items:
    - page: index.md
      label: Home
  secondary:
    items:
      - page: reference.md
        label: Reference
      - page: guides/index.md
        label: Guides
```

### Hide navbar

To hide the navbar globally or on specific pages:

```yaml {% title="redocly.yaml" %}
# Hide navbar on all pages
navbar:
  hide: true
```

Or in page front matter:
```yaml
---
navbar:
  hide: true
---
```

### Additional properties

Use `additionalProps` to add custom data to navbar items:

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - page: index.md
      label: Home
      additionalProps:
        description: Main landing page
```

Custom theme components can access these properties to display additional information or implement custom behavior.

## Resources

- **[Navigation elements](../navigation/index.md)** - Overview of all navigation components and patterns for creating comprehensive site navigation structures
- **[Footer configuration](./footer.md)** - Configure the footer navigation with links, copyright information, and organizational elements
- **[Logo configuration](./logo.md)** - Configure the logo that appears in the navbar with brand customization and display options
- **[Localization](./l10n.md)** - Configure navbar labels and text for multiple languages to support international audiences
- **[Front matter configuration](./front-matter-config.md)** - Use front matter to show or hide the navbar on individual pages for custom page layouts
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
