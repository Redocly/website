---
content:
  heroImg: portal-hero
  guides:
    link: docs-legacy/developer-portal/guides
    items:
      - title: Installation
        description: Install the developer portal to get started.
        link: docs-legacy/developer-portal/installation
      - title: Using Markdown
        description: Explore supported Markdown features.
        link: docs-legacy/developer-portal/guides/markdown
      - title: OpenAPI integration
        description: Integrate reference docs into your developer portal.
        link: docs-legacy/developer-portal/guides/reference-docs-integration
  configuration:
    link: docs-legacy/developer-portal/configuration
    items:
      - title: Sidebar nav
        description: Configure your sidebar.
        link: docs-legacy/developer-portal/configuration/sidebar-nav
      - title: Site config
        description: Configure dozens of features from a site config yaml file.
        link: docs-legacy/developer-portal/configuration/siteconfig
      - title: Theme
        description: Theme and style various components.
        link: docs-legacy/developer-portal/configuration/theme
  resources:
    link: docs-legacy/developer-portal/settings
    items:
      - title: SEO the API docs
        description: Documentation is becoming a critical asset in selling and marketing API-based products.
        link: /blog/seo-api-docs
      - title: Organizing content
        description: Learn how to organize your files to build a portal.
        link: docs-legacy/developer-portal/guides/organizing-files
      - title: Settings
        description: Control portal build settings in Workflows.
        link: docs-legacy/developer-portal/settings
  changelog:
    link: docs-legacy/developer-portal/changelog
    items:
      - title: 1.1.0-beta.79 (2022-01-27)
        link: docs-legacy/developer-portal/changelog
        hash: '#110-beta79-2022-01-27'
      - title: 1.1.0-beta.78 (2022-01-20)
        link: docs-legacy/developer-portal/changelog
        hash: '#110-beta78-2022-01-20'
      - title: 1.0.0-beta.77 (2022-01-13)
        link: docs-legacy/developer-portal/changelog
        hash: '#110-beta77-2022-01-13'
excludeFromSearch: true

---

# Developer portal

{% partial file="../_snippets/banner-legacy-developer-portal.md" /%}

Build a modern, responsive website for your documentation from plain Markdown files.

- **Enrich your text with multimedia**, visuals, and interactive React components
- **Integrate your API reference documentation** with contextual content, and **extend** it with guides, step-by-step tutorials and help articles
- Use **docs-as-code** workflow and single-sourcing capabilities
- **Set up navigation** to help your readers discover content faster
- Change colors, fonts, and upload your logo to **customize your portal** and truly make it your own

[Get started with the Developer portal](./installation.md) in less than 5 minutes with our CI/CD service. You can also host your Developer portal independently.

[Visit the product page](../../pages/realm/realm.page.tsx) to learn how our clients use the Developer portal and how it can benefit your organization.

{% docsOverview info=$frontmatter.content /%}
{% heroImage src=$frontmatter.content.heroImg /%}
