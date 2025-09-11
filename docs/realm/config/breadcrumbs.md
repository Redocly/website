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
# `breadcrumbs`

Use the `breadcrumbs` option to control the links displayed at the top of the page to indicate a page's location in the navigation structure.

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "breadcrumbs"} /%}

![Screenshot of page in project with breadcrumbs](./images/breadcrumbs.png)

Breadcrumbs are enabled by default, but can be disabled to remove them from your published project.
You can also add links that you want to always appear on every page at the start of the breadcrumbs links.

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Disables breadcrumb links in the project when set to `true`.\
  Default value: `false`

---

- prefixItems
- [[Breadcrumb object](#breadcrumb-object)]
- A list of breadcrumb links to always be displayed first.

{% /table %}

### Breadcrumb object

{% table %}

- Option
- Type
- Description

---

- page
- string
- **REQUIRED.** Path to the file which represents the page to link to.
  If you do not include the `label` property, the text for the link will match the level 1 heading of the page.

---

- label
- string
- Link text displayed for the item.

---

- labelTranslationKey
- string
- Translation key used for [localization](./l10n.md).

{% /table %}

## Example

```yaml
breadcrumbs:
  hide: false
  prefixItems:
    - page: index.page.tsx
      label: Home
      labelTranslationKey: home.title
```

## Related options

- Customize other default items on Markdown pages, such as the last updated time stamp and the page headings table of contents on the left side of the page, using the [`markdown` configuration options](markdown.md).
- Remove or update the label text for the previous and next navigation buttons using the [`navigation` configuration options](navigation.md).

## Resources

- **[Navigation concepts](../navigation/navigation.md)** - Understand different navigation elements in your project including breadcrumbs and their role in user experience
- **[Configure navigation elements](../navigation/index.md)** - Customize navigation elements including sidebar, navbar, footer, and breadcrumbs for optimal site organization
- **[Front matter configuration](./front-matter-config.md)** - Configure breadcrumb behavior and appearance on individual pages using front matter for granular control
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
