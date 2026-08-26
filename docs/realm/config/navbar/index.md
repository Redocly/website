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
navbar:
  secondary:
    items:
      - page: ./index.md
        label: Main navbar
      - page: ./secondary.md
        label: Secondary navbar
---
# `navbar`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The navbar appears across the top of every page in your project.
Use it for top-level sections and frequently used links.
You can configure the links and groups of links it shows, add a [secondary navbar](./secondary.md) with section links under it, or hide it altogether.

## Options

{% table %}

- Option
- Type
- Description

---

- items
- [[Item](#item-object) | [Group](#group-object)]
- List of links and groups shown in the navbar.

---

- secondary
- [Secondary navbar](./secondary.md)
- Row of section links under the navbar.
  Shown when the active navbar item has no `secondary` of its own.

---

- hide
- boolean
- Hides the navbar.
  Default: `false`.

  {% partial file="../../_partials/config/_supported-config.md" variables={"optionName": "navbar.hide"} /%}

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
- Translation key for the group name, used for [localization](../l10n.md).

---

- items
- [Item](#item-object)
- **REQUIRED.**
  List of items in the group.
  Groups have one level: an item inside a group cannot be another group.

---

- linkedSidebars
- [string]
- List of relative paths to sidebar files.
  This option adds the navbar item to a sidebar's breadcrumbs.
  Only effective for top-level navbar items.

---

{% raw-partial file="../../_partials/nav-item-icon-property-row.md" /%}

---

- external
- boolean
- Open link in new browser tab.
  Default: `false`.

---

- page
- string
- Relative or absolute path to the page file, extension included.
  **Mutually exclusive** with the `href` option.

---

- href
- string
- URL to link to.
  **Mutually exclusive** with the `page` option.

---

- activeFor
- [string]
- Page path globs that keep this group active.
  `*` matches one path segment and `**` matches any depth.
  A trailing `/**` also matches the directory itself, so `apis/**` covers `apis`.

---

- secondary
- [Secondary navbar](./secondary.md)
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
- Link text for the item.

---

- labelTranslationKey
- string
- Translation key for the label, used for [localization](../l10n.md).

---

{% raw-partial file="../../_partials/nav-item-icon-property-row.md" /%}

---

{% raw-partial file="../../_partials/nav-page-href-property-rows.md" /%}

---

- external
- boolean
- Open link in new browser tab.
  Default: `false`.

---

- linkedSidebars
- [string]
- List of relative paths to sidebar files.
  This option adds the navbar item to a sidebar's breadcrumbs.
  Only effective for top-level navbar items.

---

- additionalProps
- object
- Arbitrary data for custom theme components to read.
  To customize theme components, see [Eject components](../../customization/eject-components/index.md).

---

- activeFor
- [string]
- Page path globs that keep this item active.
  `*` matches one path segment and `**` matches any depth.
  A trailing `/**` also matches the directory itself, so `apis/**` covers `apis`.

---

- secondary
- [Secondary navbar](./secondary.md)
- Row of section links shown while this item is active.

{% /table %}

### Icon object

{% partial file="../../_partials/nav-icon-object-table.md" /%}

## Active item

A navbar item is active when its link matches the current page, or when one of its `activeFor` globs matches the page path.
A group is active when one of its items is active.

## Examples

### Simple navigation

A flat navbar with four links:

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

{% img
  src="../images/1-level-navbar.png"
  alt="1 level Navbar"
  withLightbox=true
/%}

### Complete navigation setup

A navbar with groups, translation keys, and an external link:

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

For a site with several products, group them and link each product to its own sidebar:

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

A dropdown with a separator between two sets of links:

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

{% img
  src="../images/dropdown-menu.png"
  alt="Dropdown menu"
  withLightbox=true
/%}

### Hide navbar

Hide the navbar on all pages:

```yaml {% title="redocly.yaml" %}
navbar:
  hide: true
```

Or hide it on one page with front matter:

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

Custom theme components read these properties to show extra information or change behavior.

## Resources

- **[Secondary navbar](./secondary.md)** - Add a row of section links under the navbar, for the whole project or per navbar item
- **[Navigation elements](../../navigation/index.md)** - Overview of all navigation components
- **[Footer configuration](../footer.md)** - Configure the footer links and copyright text
- **[Logo configuration](../logo.md)** - Configure the logo shown in the navbar
- **[Localization](../l10n.md)** - Translate navbar labels
- **[Front matter configuration](../front-matter-config.md)** - Show or hide the navbar on individual pages
- **[Configuration options](../index.md)** - Explore other project configuration options
