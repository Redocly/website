---
excludeFromSearch: true
exclude: true
content:
  heroImg: ref-docs-hero
  guides:
    link: docs/api-registry/guides
    items:
      - title: Try it console
        description: Send requests from the browser.
        link: docs-legacy/api-reference-docs/guides/try-it-console
      - title: Embedded Markdown
        description: Embed external Markdown files into OpenAPI descriptions.
        link: docs-legacy/api-reference-docs/guides/embedded-markdown
      - title: Generate code samples
        description: Automatically generate code samples in many languages.
        link: docs-legacy/api-reference-docs/guides/generate-code-samples
  configuration:
    link: docs-legacy/api-reference-docs/configuration
    items:
      - title: Theming
        description: Style the reference docs.
        link: docs-legacy/api-reference-docs/configuration/theming
      - title: Features
        description: Toggle features to create your best experience.
        link: docs-legacy/api-reference-docs/configuration/functionality
      - title: Specification extensions
        description: Use specifications to extend OpenAPI.
        link: docs-legacy/api-reference-docs/spec-extensions
  resources:
    link: docs/api-registry/settings
    items:
      - title: Custom domain
        description: Set up a custom domain for your docs.
        link: docs-legacy/api-reference-docs-legacy/settings/custom-domain
      - title: Source
        description: Source definitions.
        link: docs-legacy/api-reference-docs-legacy/settings/source
  changelog:
    link: docs-legacy/api-reference-docs/changelog
    items:
      - title: 2.42.2 (2023-10-24)
        link: docs-legacy/api-reference-docs/changelog
        hash: '#2110-2022-01-27'
      - title: 2.10.0 (2022-01-24)
        link: docs-legacy/api-reference-docs/changelog
        hash: '#2100-2022-01-24'
      - title: 2.9.5 (2022-01-20)
        link: docs-legacy/api-reference-docs/changelog
        hash: '#295-2022-01-20'
---

# Reference docs

Generate modern, responsive, and interactive API documentation from your API definitions with Reference docs.

- **Enable the Try-it console** to help your readers test the API directly from the docs
- Create documentation for multiple API versions and compile **multiple API definitions** into one page
- **Automatically generate code samples** in a number of popular languages
- **Embed Markdown files, images and videos** to extend your documentation
- Customize the navigation sidebar, **organize tags and operations**, and use advanced pagination options
- **Transform the look of your API documentation** with theming options or a custom HTML template

Build your first Reference docs project from an API definition in less than 5 minutes with our CI/CD service. You can also deploy Reference docs on-premise.

{% docsOverview info=$frontmatter.content /%}
{% heroImage src=$frontmatter.content.heroImg /%}
