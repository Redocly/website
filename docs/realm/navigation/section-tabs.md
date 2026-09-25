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
    - section tabs
---

# Section tabs

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Section tabs split a large site into sections, such as guides, API reference, and changelog.
Each tab appears in a row under the navbar and has its own sidebar.
Readers switch sections with one click, and the sidebar lists only the pages of the current section.

## Add section tabs

Define section tabs as the top-level entries of a `sidebars.yaml` file.
Each tab either opens a landing `page` and shows a sidebar from its `items`, or opens a dropdown `menu` of pages.

The following example organizes product documentation into three tabs:

```yaml {% title="sidebars.yaml" %}
- tab: Guides
  page: guides/index.md
  icon: book
  items:
    - page: guides/quickstart.md
    - group: Integrate
      items:
        - page: guides/authentication.md
        - page: guides/webhooks.md
    - group: Tutorials
      directory: guides/tutorials

- tab: API reference
  icon: code
  menu:
    - page: apis/payments.yaml
      label: Payments API
    - page: apis/accounts.yaml
      label: Accounts API
      items:
        - page: apis/accounts/migrate-to-v2.md
    - page: apis/events/index.md
      label: Webhook events
      items:
        - page: apis/events/retries.md

- tab: Changelog
  page: changelog.md
```

In this example:

- **Guides** opens `guides/index.md`, and the sidebar displays the quickstart and the **Integrate** and **Tutorials** groups.
- **API reference** opens a dropdown with three entries.
  The two API entries display the generated API navigation in the sidebar, and **Accounts API** adds a migration guide after it.
  **Webhook events** is a Markdown page with its own sidebar.
- **Changelog** opens a single page and has no sidebar items.

## Section tabs configuration options

### Tab options

{% table %}

- Option
- Type
- Description

---

- tab
- string
- **REQUIRED.**
  Label displayed in the tab row.

---

- page
- string
- Path to the tab's landing page.
  The page can be a Markdown file or an OpenAPI, AsyncAPI, or GraphQL description.
  **Mutually exclusive** with `menu`.

---

- items
- [[Sidebar item](./sidebars.md#sidebars-configuration-options)]
- Sidebar displayed while the tab is active.
  Accepts links, groups, separators, directories, and `$ref` to other sidebar files.
  Use together with `page`.

---

- menu
- [[Menu entry](#menu-entry-options)]
- Dropdown of pages for the tab.
  Each entry opens its own page and displays its own sidebar.
  **Mutually exclusive** with `page` and `items`.

---

- icon
- string or [srcSet](./sidebars.md#icon-object)
- Icon displayed next to the tab label.
  Accepts a [Font Awesome](https://fontawesome.com/icons) icon name or a relative path to an icon image file.

---

- tabTranslationKey
- string
- Sets the translation key for the tab label.
  Used for [localization](../content/localization/localize-labels.md#localize-base-ui-components).

---

- rbac
- object
- Access controls for the tab.
  See [Configure RBAC in sidebar](../access/links-and-groups-permissions.md#in-the-sidebar) for more information.

{% /table %}

### Menu entry options

A menu entry accepts the same options as a [sidebar link](./sidebars.md#link-options), plus `items`.
The most common options are:

{% table %}

- Option
- Type
- Description

---

- page
- string
- **REQUIRED.**
  Path to the page the entry opens.
  The page can be a Markdown file or an OpenAPI, AsyncAPI, or GraphQL description.

---

- label
- string
- Link text displayed in the dropdown.
  Default: the title of the page.

---

- items
- [[Sidebar item](./sidebars.md#sidebars-configuration-options)]
- Sidebar displayed while the entry is active.
  Accepts links, groups, separators, directories, and `$ref` to other sidebar files.

---

- icon
- string or [srcSet](./sidebars.md#icon-object)
- Icon displayed next to the entry label.
  Accepts a [Font Awesome](https://fontawesome.com/icons) icon name or a relative path to an icon image file.

---

- labelTranslationKey
- string
- Sets the translation key for the entry label.
  Used for [localization](../content/localization/localize-labels.md#localize-base-ui-components).

---

- rbac
- object
- Access controls for the entry.
  See [Configure RBAC in sidebar](../access/links-and-groups-permissions.md#in-the-sidebar) for more information.

{% /table %}

## How readers navigate section tabs

The tab row appears under the navbar on screens 960px and wider.
A tab with a `menu` opens a dropdown of its entries.

{% img
src="./images/section-tabs-wide.png"
alt="Screenshot of section tabs"
withLightbox=true
framed=true
/%}

On mobile devices, the mobile menu shows the tabs in a dropdown above the sidebar of the current tab.

{% img
src="./images/section-tabs-mobile.png"
alt="Screenshot of section tabs on a mobile device"
withLightbox=true
framed=true
/%}

The tab that contains the current page stays highlighted while readers move between its pages.
The sidebar displays only the items listed in that tab, or the `items` of the active menu entry.

When a tab or menu entry opens an API description, the page displays the API reference.
The sidebar lists the navigation generated from the description, followed by any `items` you add.

## Limitations

The build fails if a `sidebars.yaml` file breaks one of these rules:

- **All top-level entries are tabs, or none are.**
  To display a plain link or group, put it in a tab's `items`.
  Every versioned copy of a sidebar also uses tabs, or none of them do.
- **A page belongs to one tab only.**
  If two tabs or two menu entries list the same page, the error message names both.
- **Tabs don't nest.**
  A tab can't contain another tab, and `menu` works only directly on a tab.
  This rule also applies to sidebar files included with `$ref`.
- **A tab has `page` or `menu`, not both.**
  A tab with `menu` can't have `items`, and every menu entry needs a `page`.
  Put `directory`, `group`, `href`, and `$ref` entries in `items`, not on the tab itself.
- **Tab and menu entry pages don't accept anchors.**
  Set `page` to a file path such as `guides/index.md`, not `guides/index.md#setup`.
  Links in a tab's `items` can still use anchors.

## Resources

- **[Sidebars](./sidebars.md)** - Configure the links, groups, and referenced sidebar files that go into a tab's `items`
- **[Navigation elements](./index.md)** - Overview of navigation areas and how they work together
- **[Component CSS variables](../branding/css-variables/component.md#section-tabs)** - Full list of variables that style the section tabs row
- **[Add versioned content](../content/versions.md)** - Organize versioned folders and their sidebars
