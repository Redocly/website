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
  Use an absolute or relative path. For external links, use `href` instead.
  Examples: `./index.md`, `/docs/tutorial.md`, `../../glossary.md`.

---

- href
- string
-
  **CONDITIONALLY REQUIRED.***  
  URL to link to. Works with absolute and relative URLs.  
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
- Sets the translation key for an item's link text. Used for [localization](../content/localization/localize-labels.md#localize-base-ui-components).

---

- external
- boolean
- Opens item in a new tab and adds an external link symbol. Defaults to `false`.
  Does not apply to paths to version subfolders.

---

- disconnect
- boolean
- Includes links in the sidebar without assigning the sidebar to that page. Defaults to `false`.

---

- icon
- string
- Path to icon image file. Appears on left side of sidebar entry.

---

- rbac
- object
- Page-level access controls for sidebar links. See [Configure RBAC in sidebar](../access/links-and-groups-permissions.md#in-the-sidebar) for more information.

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
- Path to a folder. Files in the folder automatically appear in the sidebar.

---

- groupTranslationKey
- string
- Sets the translation key for a group. Used for [localization](../content/localization/localize-labels.md#localize-base-ui-components).

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
  `true` -- Items are expanded when page loads. Users can collapse the group.  
  `false` -- **Default**. Items are collapsed when page loads. Users can expand.  
  `always` -- Items are expanded when page loads and cannot be collapsed.

---

- selectFirstItemOnExpand
- boolean
- Opens the first item in a group when the group is expanded. Defaults to `false`.

---

- icon
- string
- Path to icon image file. Appears on left side of group.

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
- Horizontal bar that breaks the sidebar into sections. Works in sidebar root or inside a group.

---

- $ref
- string
- Path to another sidebar file. Entries from the referenced sidebar expand into this sidebar. See [Compose a single sidebar from multiple `sidebars.yaml` files](./sidebar.md#compose-a-single-sidebar-from-multiple-sidebarsyaml-files) for more details.

{% /table %}

## Example

The following example shows a `sidebars.yaml` file:

```yaml {% title="sidebars.yaml" %}
- page: overview.md
- page: installation.md
  label: Installation
- group: Config
  selectFirstItemOnExpand: true
  items:
    - page: config/index.md
    - page: config/developer-onboarding.md
      label: Developer Onboarding
    - group: Reference
      page: config/reference/index.md
      items:
        page: config/reference/config-files.md
        label: Config Files
- group: Content
  menuStyle: drilldown
  icon: ./images/custom-icon.png
  items:
    - directory: content
- $ref: ./templates/sidebars.yaml
- group: Plugins
  items:
    - directory: plugins
- group: Resources
  items:
    - href: https://redocly.com/docs
      label: Great docs
    - href: /docs/cli/v1.3
      label: Legacy CLI docs
```