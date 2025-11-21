---
template: ../@theme/templates/BlogPost
title: September 2021 updates
description: Round up of product features and enhancements, plus documentation news from September 2021
seo:
  title: September 2021 updates
  description: Round up of product features and enhancements, plus documentation news from September 2021
author: swapnil-ogale
date: "2021-10-01"
categories:
  - redocly:product-updates
image: blog-4.jpg
---
September was a super busy month at Redocly, given the exciting amount of features we have been baking into our products. We are talking about API discovery, file uploads, portal customizations, and more.

_There are also some really cool things we are working on in the background, and we can't wait to share them, but that will have to wait until end of October._

For now though, let's have a quick look at our product updates, enhancements and documentation-related news from September 2021.

***

## Workflows

**Improvements to the API registry page**

The API registry page is now more efficient, usable and easier to navigate, which allows you to discover your APIs and other assets faster.

- Use the **Search** feature to look up API versions by name.
- If you have labels assigned to your API versions, you can now **filter by labels** quickly.
- We've added two options for **sorting** your API versions: Sort _alphabetically_ or by _newest first_.
- The API registry page is also now properly **paginated** to neatly organize your APIs and unclutter the interface.

For more information, read our [Discovering APIs](../docs-legacy/api-registry/resources/discovering-apis.md) topic.

**New default role for authenticated users**

We added a new default role called `authenticated-user` for authenticated users. If you use RBAC (role-based access control) and do not have any roles associated with your identity provider (IdP), you can now add this default role to the frontmatter to protect your API documentation.

**Workflows changelog**
Find out about other fixes and enhancements by visiting the [Workflows changelog](../docs-legacy/workflows/changelog.md).

![Workflow features](./images/workflows.png '#width=400px;')

***
## Reference docs

**Upload files using the `Try it` console**

The _Try It_ console now lets you upload files to send in your requests. If the `requestBody` schema has valid `type` and `format` properties, the _Choose file_ button is visible in the request body section of the _Try It_ console. This is applicable to:

- OpenAPI 3.1 definitions that use the `contentEncoding` keyword [according to the specification](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#considerations-for-file-uploads).
- OpenAPI 3.0.x definition and specific media types [according to the specification](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#considerations-for-file-uploads).

**Support for `Ruby` code samples**
Reference docs can now automatically generate **Ruby** code samples. To configure this, refer to the [configure auto-generated code samples](../docs-legacy/api-reference-docs/guides/generate-code-samples.md) topic.

**Auto synchronization of examples and content type selection**

- If you use custom names for `examples` to map request and response examples in your API definitions, these examples now automatically synchronize with each other when selected in Reference pages.
- Content type selection in Reference docs now automatically synchronizes between request and response schemas in the middle panel and the response and request examples in the right panel.

**Reference docs changelog**
Here's a link to the entire [Reference docs changelog](../docs-legacy/api-reference-docs/changelog.md).

![Reference docs features](./images/refdocs.png)

***
## Developer portal

**Reminder**: In August 2021, we released Developer portal (v1.1) which included support for [Reference docs 2.0](https://redocly.com/blog/reference-docs-redesign/) and brought a complete visual overhaul to your integrated API reference docs.

{% admonition type="info" %}
This version (v1.1) of the Developer portal is now synchronized with all the changes described in the [Reference docs changelog](../docs-legacy/api-reference-docs/changelog.md).
{% /admonition %}

For the full list of changes and upgrade instructions, refer to the [migration guide](https://redocly.com/docs-legacy/developer-portal/guides/migration-guide-1-1-0/).

**Copy code blocks with one click**

Markdown code blocks now have a handy **Copy** button, so you can copy the entire code block with one click! This feature is global (affects all pages in the portal) and it's enabled by default in the `1.1.0-beta.55` version.

To find out more, refer to the [Code snippets configuration](../docs-legacy/developer-portal/configuration/siteconfig/copy-codesnippet.md) topic.

**Set the default expansion behavior for schemas**

You can now use the `schemaExpansionLevel` property in Portal components to set the default expansion behavior for schemas.

- To expand the whole schema contents, set it to `all`.
- If you set it to a specific number, schemas will be expanded only up to that level. For example, `schemaExpansionLevel: 3` will automatically expand schema contents up to three levels.

**Support for customized sitemap**

We implemented support for customizing the sitemap record for specific pages in the portal. This functionality is provided by the [gatsby-plugin-sitemap](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/) plugin.

**Support for two new React components**

You can now use two new React components in your portals: `OpenApiCodeSample` and `OpenApiTryIt`.

**Simpler TOC configuration options**

We have now simplified and consolidated the table of contents (ToC) configuration options. Instead of adding multiple separate top-level items to your `siteConfig.yaml` file, you can now control all ToC-related options in one place.

**Reorganized logo configuration**

Similar to the ToC configuration, we have simplified the logo configuration.
Your portal logo image can now open any custom URL when clicked, so it's no longer just decorative, but useful too!

For more information, refer to the [logo configuration](../docs-legacy/developer-portal/configuration/siteconfig/logo.md) topic.

**Added API key status information**

Customers who use our Apigee integration will notice the App page has been fully redesigned, and now includes more detailed information on the API key status.

**Developer portal changelog**
Read the entire list of fixes and enhancements on the [Developer portal changelog](../docs-legacy/developer-portal/changelog.md).

![Developer portal features](./images/devportal.png '#width=400px;')

***

## OpenAPI CLI and Redoc

**OpenAPI CLI changelog**
Read more about OpenAPI CLI fixes and enhancements by visiting the [OpenAPI CLI changelog](../docs/cli/changelog).

![OpenAPI CLI features](./images/cli.png '#width=400px;')

***

## Documentation updates

The technical writing team has been busy adding new content and updating existing content to ensure we are constantly adding new content, and filling in the gaps between our product features and docs.


- Added new topics for:
  - [Discovering APIs](../docs-legacy/api-registry/resources/discovering-apis.md)
  - [Page table of contents configuration](../docs-legacy/developer-portal/configuration/siteconfig/toc.md)
  - Code snippets
  - File uploads
  - Sitemap configuration
  - Portal components
- We tweaked our [docs](../docs/index.md) site navigation and information architecture to closely mirror our product interface, making it easier to search for relevant topics.
  - Docs are now grouped by **API registry**, **Reference**, **Portals**, **People**, **Teams**, **Settings**, **Open source** products, and an **Education** section for learning about OpenAPI.
  - Within these groups, we have used sub-grouping (where possible) `Guides`, `Configuration`, `Settings`, and `Resources` to keep the content experience consistent.
  - Added landing pages for sub-group headings to give a quick overview of what each section contains. For example, here's the [API registry guides](../docs-legacy/api-registry/guides/index.md) page.

***

## Google Season of Docs - Update

Along with our core technical writing team, our Google Season of Docs technical writers have also been contributing to our open source product documentation actively.

In the last month, we:
- Updated the [Redoc README](https://github.com/Redocly/redoc#readme) with links to the quick start guides.
- Published the [OpenAPI CLI quick start guide](../docs/cli/quickstart) to get you up and running with using the open source product.
- Updated the following `commands` topics for OpenAPI CLI:
  - [join](../docs/cli/commands/join)
  - [login](../docs/cli/commands/login) and [logout](../docs/cli/commands/logout)
  - [bundle](../docs/cli/commands/bundle)
  - [stats](../docs/cli/commands/stats)
  - [split](../docs/cli/commands/split)

***

## Redocly at apidays Australia

Our Technical Writer Advocate presented a talk on **The secret sauce to successful APIs** at the apidays Australia on Sept 15th.

[Video from the talk](https://www.youtube.com/embed/m6eOIXhQp0k) is now available on the apidays Youtube channel.
