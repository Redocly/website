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

### Simple footer

A basic footer with copyright text and a few links:

```yaml {% title="redocly.yaml" %}
footer:
  copyrightText: "© 2024 Example Company. All rights reserved."
  items:
    - page: privacy-policy.md
      label: Privacy Policy
    - page: terms-of-service.md
      label: Terms of Service
    - href: "https://support.example.com"
      label: Support
      external: true
```

### Complete footer setup

The columns of the footer are configured using the `items` property, where each entry is a [Group](#group-object) or [Item](#item-object) object. The following example shows a comprehensive footer with multiple sections, localization support, and various link types:

```yaml {% title="redocly.yaml" %}
footer:
  copyrightText: "© 2024 Example Company. All rights reserved."
  items:
    # Column 1: Documentation
    - group: Documentation
      groupTranslationKey: footer.docs
      items:
        - page: docs/getting-started.md
          label: Getting Started
          labelTranslationKey: footer.getting-started
        - page: docs/guides/index.md
          label: Guides
        - page: api-reference.yaml
          label: API Reference
    # Column 2: Company
    - group: Company
      groupTranslationKey: footer.company
      items:
        - page: company/about-us.md
          label: About Us
        - href: "https://example.com/careers"
          label: Careers
          external: true
        - href: "https://blog.example.com"
          label: Blog
          external: true
    # Column 3: Legal & Support
    - group: Legal
      items:
        - page: legal/privacy-policy.md
          label: Privacy Policy
        - page: legal/terms-of-service.md
          label: Terms of Service
        - href: "https://support.example.com"
          label: Support Center
          external: true
    # Column 4: Social Media
    - group: Connect
      items:
        - label: GitHub
          href: 'https://github.com/example'
          external: true
          icon: ./images/github-icon.svg
        - label: Twitter
          href: 'https://twitter.com/example'
          external: true
          icon: ./images/twitter-icon.svg
        - label: LinkedIn
          href: 'https://linkedin.com/company/example'
          external: true
          icon: ./images/linkedin-icon.svg
```

Each entry in the footer's `items` configures a distinct column. Using groups is a common approach for organizing related links.

### Footer with icons and color modes

The following configuration shows a footer with icons that change based on the current color mode:

```yaml {% title="redocly.yaml" %}
footer:
  copyrightText: "© 2024 Redocly. All rights reserved."
  items:
    - group: Products
      items:
        - page: products/platform.md
          label: Platform
          icon:
            srcSet: "./images/platform-red.svg light, ./images/platform-blue.svg dark"
        - page: products/cli.md
          label: CLI
          icon:
            srcSet: "./images/cli-red.svg light, ./images/cli-blue.svg dark"
    - group: Resources
      items:
        - label: Documentation
          href: 'https://redocly.com/docs'
          external: true
        - label: Community
          href: 'https://community.redocly.com'
          external: true
    - group: Social
      items:
        - label: GitHub
          href: 'https://github.com/redocly'
          external: true
        - label: Twitter
          href: 'https://twitter.com/redocly'
          external: true
```

### Hide footer

To hide the footer globally or on specific pages:

```yaml {% title="redocly.yaml" %}
# Hide footer on all pages
footer:
  hide: true
```

Or in page front matter:
```yaml
---
footer:
  hide: true
---
```

By grouping the links, users can quickly locate the section and content they are looking for.

## Related resources

- [Navigation elements](../navigation/index.md) - Overview of all navigation components and patterns.
- [Navbar configuration](./navbar.md) - Configure the top navigation bar.
- [Sidebar configuration](../navigation/sidebars.md) - Configure the left navigation panel.
- [Custom CSS styles](../branding/customize-styles.md) - Add custom styling that can be applied to your footer.
- Use [front matter](./front-matter-config.md) to show or hide the footer on individual pages.
- Explore other [configuration options](./index.md) for your project.
