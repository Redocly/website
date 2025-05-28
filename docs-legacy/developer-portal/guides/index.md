---
seo:
  title: Portal guides
  description: Browse how-to guides for working with the portal
content:
  portalGuides:
    cards:
      - header: Organize files
        link: docs-legacy/developer-portal/guides/organizing-files
        text: How to organize your portal content
      - header: Update the portal
        link: docs-legacy/developer-portal/guides/updates
        text: How to upgrade the Developer portal to the latest version
      - header: Integrate Reference docs
        link: docs-legacy/developer-portal/guides/reference-docs-integration
        text: How to integrate API reference docs into your portal
      - header: Use the API catalog
        link: docs-legacy/developer-portal/guides/api-catalog
        text: How to integrate files from Redocly API registry into your portal
      - header: Embed the portal into a website
        link: docs-legacy/developer-portal/guides/embedding-portals
        text: How to use a proxy to embed the Developer portal into a website
      - header: Restart portal builds
        link: docs-legacy/developer-portal/guides/restart-build
        text: How to restart a Developer portal build in Workflows
  portalContent:
    cards:
      - header: Supported Markdown features
        link: docs-legacy/developer-portal/guides/markdown
        text: List of special Markdown features supported in the portal
      - header: Reuse content
        link: docs-legacy/developer-portal/guides/reusing-content
        text: How to reuse and single-source content with Markdown snippets
      - header: Insert Mermaid diagrams
        link: docs-legacy/developer-portal/guides/mermaid
        text: How to add Mermaid diagrams to your pages
      - header: Create step-by-step guides
        link: docs-legacy/developer-portal/guides/step-by-step
        text: How to create interactive API guides
      - header: Set up portal redirects
        link: docs-legacy/developer-portal/guides/redirects
        text: How to set up 301 redirects in your portal
      - header: Customize response headers
        link: docs-legacy/developer-portal/guides/configure-custom-response-headers
        text: How to configure custom response headers for hosted portals
      - header: Document microservices
        link: docs-legacy/developer-portal/guides/document-microservices
        text: How to document microservices APIs with the Developer portal
  customization:
    cards:
      - header: Customize portal navigation
        link: docs-legacy/developer-portal/guides/navbars-footers
        text: How to customize portal navbars and footers
      - header: Configure environment variables
        link: docs-legacy/developer-portal/guides/environment-variables
        text: How to use environment variables in the portal
      - header: Built-in environment variables
        link: docs-legacy/developer-portal/guides/environment-variables-built-in
        text: List of built-in environment variables
      - header: Environment variable files
        link: docs-legacy/developer-portal/guides/environment-files
        text: How to create environment variable files
      - header: Add the table of contents
        link: docs-legacy/developer-portal/guides/page-toc
        text: How to add a table of contents to a page
      - header: Custom 404 page
        link: docs-legacy/developer-portal/guides/custom-404-page
        text: How to create a custom 404 page for your portal
      - header: Reference hooks
        link: docs-legacy/developer-portal/guides/reference-docs-hooks
        text: How to use hooks in Reference docs integrated into the portal
  onPremise:
    cards:
      - header: Portal hosting
        link: docs-legacy/developer-portal/guides/on-premise
        text: How to host the Developer portal on-premise
  integrationGuides:
    cards:
      - header: Integrate with Apigee
        link: docs-legacy/developer-portal/guides/apigee-integration-portal/overview
        text: Overview of the Apigee integration portal
excludeFromSearch: true

---

# Portal guides

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

Learn how to work with the Developer portal.

## Portal management

{% wideTileCards content=$frontmatter.content.portalGuides /%}

## Portal content

{% wideTileCards content=$frontmatter.content.portalContent /%}

## Customization

{% wideTileCards content=$frontmatter.content.customization /%}

## On-premise

{% wideTileCards content=$frontmatter.content.onPremise /%}

## Integration guides

{% wideTileCards content=$frontmatter.content.integrationGuides /%}
