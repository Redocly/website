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
description: Add a secondary navbar, a row of section links under the main navbar.
navbar:
  secondary:
    items:
      - page: ./index.md
        label: Main navbar
      - page: ./secondary.md
        label: Secondary navbar
---
# `secondary`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The secondary navbar is a row of section links under the main navbar.
Set one row for the whole project with `navbar.secondary`.
To make the row follow the active section, give a navbar item its own row with `secondary` on that item.

## Options

{% table %}

- Option
- Type
- Description

---

- items
- [[Item](#item-object)]
- List of links and groups shown in the row.

---

- hide
- boolean
- Hides the row.
  On a navbar item, `hide: true` removes the row for that section and skips the project-level `navbar.secondary`.
  Default: `false`.

  {% partial file="../../_partials/config/_supported-config.md" variables={"optionName": "navbar.secondary.hide"} /%}

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

- activeFor
- [string]
- Page path globs that keep this item active.
  `*` matches one path segment and `**` matches any depth.
  A trailing `/**` also matches the directory itself, so `apis/**` covers `apis`.

---

- rbac
- object
- Team-to-role map that controls who sees the item.
  The server removes items the reader cannot access before it sends the page.

---

- group
- string
- Name of the group.
  Renders the item as a dropdown of its `items` instead of a link.

---

- groupTranslationKey
- string
- Translation key for the group name, used for [localization](../l10n.md).

---

- items
- [[Item](#item-object)]
- Links shown in the group's dropdown.
  Groups have one level: an item inside a group cannot be another group.

{% /table %}

## Which row renders

The active navbar item supplies the row, so the row changes as the reader moves between sections.
A navbar group counts as active when any of its items matches the current page.
When the active navbar item has no `secondary`, the row falls back to the project-level `navbar.secondary`.
Without a fallback, or when no item resolves to a page or URL, no row renders.

Items render as a single row of links, and an item with `group` renders as a dropdown of its `items`.
The row has no separators.

## Active item

An item is active when its link matches the current page exactly.
Failing that, an item whose `activeFor` glob matches the page path is active.
Otherwise, the item whose link is the longest prefix of the current path is active, so an `apis` item stays active on `apis/reference`.
When nothing matches, no item is active.

## Examples

### Row per navbar item

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

On `guides/auth.md` the row shows **Overview** and **Authentication**, and on `apis/rest.md` it shows **REST** and **GraphQL**.
Anywhere outside both sections it falls back to **Home**.

### Row for the whole project

Add a single row of section links under the navbar:

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

### Group in a row

An item with `group` opens a dropdown of links:

```yaml {% title="redocly.yaml" %}
navbar:
  secondary:
    items:
      - page: showcase/index.md
        label: Showcase
      - group: Resources
        items:
          - page: showcase/roadmap.md
            label: Roadmap
          - href: https://redocly.com/docs/realm
            label: Realm docs
            external: true
```

### Hide the row on one page

Hide the project-level row on a single page with front matter.
A row that comes from a navbar item's `secondary` stays visible:

```yaml
---
navbar:
  secondary:
    hide: true
---
```

### Row per product

Product configuration replaces the whole `navbar` section, so re-declare `secondary` in a product's `redocly.yaml` to give that product its own row:

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

## Resources

- **[Navbar configuration](./index.md)** - Configure the main navbar that the secondary navbar sits under
- **[Front matter configuration](../front-matter-config.md)** - Show or hide the secondary navbar on individual pages
- **[Products](../products.md)** - Give each product its own navbar and secondary navbar
- **[Localization](../l10n.md)** - Translate secondary navbar labels with translation keys
