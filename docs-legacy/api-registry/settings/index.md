---
excludeFromSearch: true
seo:
  title: API registry settings
  description: Manage your settings.
content:
  cards:
    - header: API info
      link: docs/api-registry/settings/api-info
      text: How to modify basic information about your API
    - header: Source
      link: docs-legacy/workflows/sources
      text: Manage your API version source
    - header: Manage access
      link: docs/api-registry/settings/manage-access
      text: Manage access to API registry
    - header: Environment variables
      link: docs/api-registry/settings/environment-variables
      text: Set up environment variables in the API registry
    - header: Custom domain
      link: docs/pi-reference-docs-legacy/settings/custom-domain
      text: Change API docs subdomain and set up a custom domain
    - header: Features
      link: docs/api-registry/settings/features
      text: Configure API docs features
    - header: Template
      link: docs/api-registry/settings/template
      text: Customize the API docs template
    - header: Mock servers
      link: docs/api-registry/settings/mock-servers
      text: Enable mock servers for your APIs
    - header: Delete
      link: docs/api-registry/settings/delete-version
      text: Delete an API version and its docs
---

# API registry settings

What would you like to do?

{% wideTileCards content=$frontmatter.content /%}
