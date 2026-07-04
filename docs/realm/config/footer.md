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
description: Customize the footer for the pages in your project.
---
# `footer`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Customize the footer for the pages in your project.
The footer is a section at the bottom of your documentation that contains copyright information, links, or other elements you want available on every page.

## Options

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

### Group object

{% table %}

- Option
- Type
- Description

---

- group
- string
- **REQUIRED.**
  Specifies the name of the column.

---

- groupTranslationKey
- string
- Specifies the translation key for the column name used for [localization](../content/localization/localize-labels.md#localize-user-defined-ui-elements).

---

- items
- [Item](#item-object)
- **REQUIRED.**
  List of items in the footer column.

{% /table %}

### Item object

{% table %}

- Option
- Type
- Description

---

{% raw-partial file="../_partials/nav-page-href-property-rows.md" /%}

---

- label
- string
- Link text displayed for the item.

---

- labelTranslationKey
- string
- Sets the translation key for an item's link text.
  Used for [localization](../content/localization/localize-labels.md#localize-user-defined-ui-elements).

---

- external
- boolean
-
  Configures the item to open in a new tab and adds an external link symbol next to entry.
  Defaults to `false`.
---

{% raw-partial file="../_partials/nav-item-icon-property-row.md" /%}

---

- additionalProps
- object
- Additional properties for the footer item.
  Pass arbitrary data that can be accessed in custom theme components.
  To learn how to customize theme components, see: [Eject components](../customization/eject-components/index.md).

{% /table %}

### Icon object

{% partial file="../_partials/nav-icon-object-table.md" /%}

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

The columns of the footer are configured using the `items` property, where each entry is a [Group](#group-object) or [Item](#item-object) object.
The following example shows a comprehensive footer with multiple sections, localization support, and various link types:

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
          icon: brands github
        - label: Twitter
          href: 'https://twitter.com/example'
          external: true
          icon: brands twitter
        - label: LinkedIn
          href: 'https://linkedin.com/company/example'
          external: true
          icon: brands linkedin
```

Each entry in the footer's `items` configures a distinct column.
Using groups is a common approach for organizing related links.

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

### Center footer content

You can center the footer content using custom CSS or CSS variables.

To center the copyright text, use the `--footer-copyright-text-align` CSS variable in your `@theme/styles.css` file:

```css
:root {
  --footer-copyright-text-align: center;
}
```

To center the footer columns (items), apply `justify-content: center` to the footer container in your `@theme/styles.css` file:

```css
[data-component-name="Footer/Footer"] .container {
  justify-content: center;
}
```

For more information on adding custom styles, see [Customize styles](../branding/customize-styles.md).

### Additional properties

Use `additionalProps` to add custom data to footer items:

```yaml {% title="redocly.yaml" %}
footer:
  copyrightText: "© 2024 Example Company. All rights reserved."
  items:
    - group: Documentation
      items:
        - page: docs/getting-started.md
          label: Getting Started
          additionalProps:
            category: tutorial
```

Custom theme components can access these properties to display additional information or implement custom behavior.

## Resources

- **[Navigation elements](../navigation/index.md)** - Overview of all navigation components and patterns for comprehensive site navigation design
- **[Navbar configuration](./navbar.md)** - Configure the top navigation bar to complement your footer design and provide consistent site navigation
- **[Sidebar configuration](../navigation/sidebars.md)** - Configure the left navigation panel for comprehensive documentation navigation structure
- **[Custom CSS styles](../branding/customize-styles.md)** - Add custom styling that can be applied to your footer for brand consistency and visual appeal
- **[Front matter configuration](./front-matter-config.md)** - Use front matter to show or hide the footer on individual pages for flexible content presentation
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation customization
