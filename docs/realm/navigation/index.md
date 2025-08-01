---
toc: hide
---

# Navigation elements

Redocly offers comprehensive navigation customization to help users easily discover and navigate through your documentation. From simple link organization to advanced multi-product sites, you can configure navigation elements to match your project's structure and branding needs.

## Available navigation elements

### Core navigation
- **[Navbar](../config/navbar.md)** - Top navigation bar with links, groups, and dropdowns
- **[Sidebar](../config/sidebar.md)** - Left navigation panel (configure content with [sidebars.yaml](./sidebars.md))
- **[Footer](../config/footer.md)** - Bottom page footer with links and copyright information
- **[Search](../config/search.md)** - Site-wide search functionality with faceting capabilities

### Page navigation
- **[Navigation buttons](../config/navigation.md)** - Previous/Next page navigation
- **[Table of Contents (TOC)](./toc.md)** - Page-level heading navigation
- **[Breadcrumbs](../config/breadcrumbs.md)** - Page hierarchy trail

### Advanced navigation
- **[Multi-product picker](../config/products.md)** - Switch between different product documentation
- **[Version picker](../config/version-picker.md)** - Navigate between documentation versions
- **[Locale picker](../config/l10n.md#locale-picker)** - Switch between localized content

## Quick start examples

### Basic site navigation
For a simple documentation site with standard navigation:

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - page: index.md
      label: Home
    - page: docs/getting-started.md
      label: Getting Started
    - page: api-reference.md
      label: API Reference

footer:
  copyrightText: "© 2024 Your Company. All rights reserved."
  items:
    - group: Documentation
      items:
        - page: docs/guides.md
          label: Guides
        - href: https://support.example.com
          label: Support
          external: true

search:
  engine: flexsearch
```

### Multi-product site
For documentation covering multiple products or services:

```yaml {% title="redocly.yaml" %}
products:
  - id: product-a
    name: Product A
    slug: /product-a/
  - id: product-b
    name: Product B
    slug: /product-b/

navbar:
  items:
    - group: Products
      items:
        - page: product-a/index.md
          label: Product A
        - page: product-b/index.md
          label: Product B
    - page: support.md
      label: Support

# Hide sidebar on landing pages
sidebar:
  hide: true
```

### Enterprise search setup
For advanced search with faceting (Enterprise+ plans):

```yaml {% title="redocly.yaml" %}
search:
  engine: typesense
  facets:
    - name: Category
      field: redocly_category
      type: multi-select
    - name: Product
      field: product
      type: multi-select
    - name: Version
      field: version
      type: tags
```

## Navigation patterns

### Landing page pattern
For sites with a dedicated landing page, typically hide the sidebar:

```yaml {% title="redocly.yaml" %}
# Global config
sidebar:
  hide: true

# Or in front matter of specific pages
---
sidebar:
  hide: true
---
```

### Documentation section pattern
For traditional documentation with hierarchical navigation:

```treeview
docs/
├── index.md              # Landing page
├── getting-started/
│   ├── index.md
│   ├── installation.md
│   └── sidebars.yaml     # Section-specific navigation
├── guides/
│   ├── index.md
│   ├── advanced.md
│   └── sidebars.yaml
└── sidebars.yaml         # Main navigation
```

### API documentation pattern
For API-focused sites with reference and guides:

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - page: index.md
      label: Overview
    - page: guides/index.md
      label: Guides
    - group: API Reference
      items:
        - page: users-api.yaml
          label: Users API
        - page: orders-api.yaml
          label: Orders API

catalogClassic:
  enabled: true
  title: API Catalog
  slug: /apis/
```

## Configuration tips

### Responsive navigation
All navigation elements are responsive by default. For mobile-optimized experiences:
- Keep navbar items concise (5-7 top-level items max)
- Use groups sparingly in navbar dropdowns
- Consider shorter labels for mobile: `label: API Ref` instead of `label: API Reference`

### Performance considerations
- **Search facets**: More facets mean more processing - use only necessary facets
- **Sidebar depth**: Deep nesting can impact performance and UX
- **External links**: Use `external: true` for links opening in new tabs

### Accessibility
- Always provide meaningful `label` values for screen readers
- Use descriptive link text instead of "click here" or "read more"
- Maintain logical navigation hierarchy

## Localization support

All navigation elements support localization through translation keys:

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - page: index.md
      label: Home
      labelTranslationKey: nav.home

footer:
  items:
    - group: Legal
      groupTranslationKey: footer.legal
```

See the [localization configuration](../config/l10n.md) for complete setup details.

## Related configuration

- **[Front matter options](../config/front-matter-config.md)** - Page-specific navigation overrides
- **[Sidebar file reference](./sidebars.md)** - Complete sidebars.yaml syntax
- **[Branding and styling](../branding/index.md)** - Visual customization of navigation elements

## Need help

- **Getting Started**: Begin with the [navbar configuration](../config/navbar.md) and [sidebar setup](./sidebars.md)
- **Advanced Features**: Explore [multi-product setup](../config/products.md) and [search configuration](../config/search.md)
- **Custom Styling**: See [branding options](../branding/index.md) for visual customization