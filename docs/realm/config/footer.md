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
# `footer`

The footer is a section at the bottom of your documentation that contains copyright information, links, or other elements you want available on every page.

## Options

The default footer included in `@redocly/theme` can be configured using the options below.

### Footer configuration

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
-
  Specifies whether the footer is hidden.
  Defaults to `false`.

    {% partial file="../_partials/config/_supported-config.md" variables={"optionName": "footer.hide"} /%}

---

- items
- [[Group](#group-object) | [Item](#item-object)]
- An array where each entry represents a column in the footer.
  The array elements can be either an item or a group.

---

- copyrightText
- string
- Copyright text appears at the base of the footer.

{% /table %}

#### Group object

{% table %}

- Option
- Type
- Description

---

- group
- string
- **REQUIRED.** Specifies the name of the column.

---

- groupTranslationKey
- string
- Specifies the translation key for the column name used for [localization](../content/localization/localize-labels.md#localize-user-defined-ui-elements).

---

- items
- [Item](#item-object)
- **REQUIRED.** List of items in the footer column.

{% /table %}

#### Item object

{% table %}

- Option
- Type
- Description

---

- page
- string
-
  **CONDITIONALLY REQUIRED.**\* Path to the file (extension included) that represents the page to link to. If no `label` is provided, the link text matches _the page's level 1 heading_.

---

- href
- string
-
  **CONDITIONALLY REQUIRED.**\* URL to link to. Works with absolute and relative URLs. If no `label` is provided, the link text matches _the value used for href_.

---

- label
- string
- Link text displayed for the item.

---

- labelTranslationKey
- string
- Sets the translation key for an item's link text. Used for [localization](../content/localization/localize-labels.md#localize-user-defined-ui-elements).

---

- external
- boolean
-
  Configures the item to open in a new tab and adds an external link symbol next to entry.
  Defaults to `false`.

---

- icon
- string or [srcSet](#icon-object)
- Path to icon image file. Shown on left side of the entry.

{% /table %}

##### Icon object

{% table %}

- Option
- Type
- Description

---

- srcSet
- string
- Comma-separated list of icon file paths and corresponding color modes. When configured, the icon changes when the user switches between color modes.

{% /table %}

\* Footer links must use either the `page` or `href` option ("mutually exclusive").

## Examples

The columns of the footer are configured using the `items` property, where each entry is a [Group](#group-object) or [Item](#item-object) object, as in the following example:

```yaml {% title="redocly.yaml" %}
footer:
  copyrightText: Example Company © 2024
  items:
    # Column 1
    - page: example/privacy-policy.md
      label: Example Privacy Policy
    # Column 2
    - group: About Us
      items:
        - page: company/about-us.md
          label: About Us
        - href: "https://example.com/careers"
          label: Join our team
```

Each entry in the footer's `items` configures a distinct column. Using groups is a common approach.

The following configuration shows a more complex footer example with multiple groups, external links and an icon:

```yaml
footer:
  copyrightText: Copyright © Redocly 2024.
  items:
    - group: Services
      items:
        - page: services/gift-shop.md
          label: Gift Shop
          icon:
            srcSet: "./images/gift-shop-red.svg light, ./images/gift-shop-blue.svg dark"
        - page: services/cafeteria.md
          label: Cafeteria
    - group: Legal
      items:
        - label: Privacy Notice
          href: 'https://example.com/museum-privacy-policy/'
        - label: Exhibit Policy
          href: 'https://example.com/museum-exhibit-policy/'
    - group: Social
      items:
        - label: Facebook
          href: 'https://facebook.com'
        - label: Youtube
          href: 'https://youtube.com'
        - label: Twitter
          href: 'https://twitter.com'
```

By grouping the links, users can quickly locate the section and content they are looking for.

## Related resources

- [Configure navbar](./navbar.md) - Configuration reference for the navigation bar.
- [Sidebar configuration](../navigation/sidebars.md) - Configuration reference for the sidebar.
- [Add custom CSS styles](../branding/customize-styles.md) - Add custom styling that can be applied to your footer.
- Use [front matter](./front-matter-config.md) to show or hide the footer on individual pages.
- Explore other [configuration options](./index.md) for your project.
