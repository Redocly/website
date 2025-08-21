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
---
# `navigation`

Control the **Previous** and **Next** navigation buttons on project pages.

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "navigation"} /%}

## Options

{% table %}

- Option
- Type
- Description

---

- nextButton
- [PageLink object](#pagelink-object)
- Controls the next page button.

---

- previousButton
- [PageLink object](#pagelink-object)
- Controls the previous page button.

---

- actions
- [PageAction object](#pageaction-object)
- Controls the actions that appear on the page.
  Requires the [`seo.llmstxt` option](./seo.md#llmstxt-object) to be enabled.

---

{% /table %}

### PageLink object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the navigation link button is hidden. Default `false`.

---

- text
- string
- Text that appears above the navigation buttons. Default value: `Next page` or `Previous page` respectively.

{% /table %}

#### Options that apply to front matter only

{% table %}

- Option
- Type
- Description

---

- label
- string
- Text that appears on the button. The default value is the text of the first heading of the target page.

---

- page
- string
- Path to a Markdown page in the project, or an URL.

{% /table %}

### PageAction object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the page actions are hidden. Default `false`.

---

- items
- [string]
- A list of items that appear on the page and their order.
  Allowed values:
  - `copy`: copy the page content as Markdown to the clipboard.
  - `view`: view the page content as Markdown in a new tab.
  - `chatgpt`: ask ChatGPT about this page. Only available on public pages.
  - `claude`: ask Claude about this page. Only available on public pages.

  The first item in the list is the default action.
  By default, all items are shown in the following order: `copy`, `view`, `chatgpt`, `claude`.

---

{% /table %}

## Examples

### Change navigation buttons text globally

The following example changes text labels of the navigation buttons to **Next chapter** and **Previous chapter** respectively.
This configuration applies to all pages in the project.

```yaml {% title="redocly.yaml" %}
navigation:
  nextButton:
    text: "Next chapter"
  previousButton:
    text: "Previous chapter"
```

### Hide navigation links globally

The following example hides the navigation buttons on all pages of the project.

```yaml {% title="redocly.yaml" %}
navigation:
  nextButton:
    hide: true
  previousButton:
    hide: true
```

### Customize navigation buttons in the front matter

The following example creates a custom reading flow.
Instead of following the order of pages in the sidebar, navigation buttons direct the user to a page in a different section of the project.

```yaml
---
navigation:
  nextButton:
    page: ../advanced-topics.md
    text: "Next chapter"
    label: Advanced concepts
  previousButton:
    page: ./docs/basics.md
    text: "Previous chapter"
    label: About basics
---
```


### Disable page actions

The following example disables the page actions on all pages of the project.

```yaml
navigation:
  actions:
    hide: true
```

### Customize page actions

The following example changes the default order of page actions and disables the `claude` action.

```yaml
navigation:
  actions:
    items:
      - chatgpt
      - copy
      - view
```

## Resources

- **[Front matter configuration](./front-matter-config.md)** - Configure navigation button options on individual pages using front matter for granular control
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
