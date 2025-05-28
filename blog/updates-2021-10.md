---
template: '../@theme/templates/BlogPost'
title: October 2021 updates
description: Round up of product features and enhancements, plus documentation news from October 2021
seo:
  title: October 2021 updates
  description: Round up of product features and enhancements, plus documentation news from October 2021
author: swapnil-ogale
date: 2021-11-01
categories:
  - dev-portal
  - tech-writers
  - developer-experience
  - api
image: blog-5.png
---

Throughout the month of October, our focus has been troubleshooting and fortifying our products, but we didn't forget about new features and enhancements, either.

Building on some great customer feedback and our own internal research on delivering a great user experience, we added some really good updates to our products.

Let's have a quick look at our new features, enhancements and documentation-related news from October 2021.

***

## API registry

**Optimized user experience**

The API registry now provides an optimized user experience to help you access and manage your API versions more efficiently.

- The list of APIs has been compacted, and each page only shows 10 API versions.
- Every API version is now its own item on the API registry page, using the format `API name @ API version`.
- You can search for APIs by name or version, and filter to show only API versions with specific labels.

**Simplified process of adding new API versions**

We've made a small, but significant, change to the flow of adding a new API version to the API registry.

- To create the first version of a new API, enter a new API name into the **Name** field (at the same time when creating your first API version).
- To add a new version to an existing API, select **Add API** and choose the name of the API from the dropdown in the **Name** field to be associated with your API version.

**Renamed API registry settings**

We renamed the `Settings > Version` page as `Settings > API info` to accommodate both **Name** and **Version** for the API. If you change the **Name** for an API from this page, it will automatically change for all API versions associated with that name.

**Updated SAML configuration options**

- The **SAML** configuration dialog in Workflows now supports a new field called **RBAC roles attribute name** that allows you to configure RBAC for SAML providers.
- You can now add SAML roles claim names as a space-separated list.

**Allowed dependency packages**

The following dependency packages have been added to the allowlist, so they can be used for custom plugins:
- `js-yaml@4.1.0`
- `json-pointer@0.6.1`

**Changelog**
Find out about other fixes and enhancements by visiting the [Workflows changelog](../docs-legacy/workflows/changelog.md).

![Workflow features](./images/workflows.png '#width=500px;')

***
## Reference docs

**New theming option**

We added support for a new theming option called `middlePanelMaxWidth`.

Add it to the `layout > three-panel` section of the Reference theme to control the width of the content in the middle panel. The content in the middle panel is automatically centered to fit the total middle panel area specified by your `maxWidth` option.

**Configurable search indexing**

You can now configure search indexing depth for your Reference docs with the `searchMaxDepth` option.

Set it to a number from 1 to 10 to control the maximum level of nested references to be included in the search index. The default value is 8.

_You can also use this for Developer portals with integrated Reference docs_.

**Upgraded `js-yaml` package**

Upgraded the `js-yaml` package from v.3 to v.4 with YAML 1.2 support. This upgrade resolves issues with parsing timestamps and example strings with leading zeros in YAML.

**Reference docs changelog**
Here's a link to the entire [Reference docs changelog](../docs-legacy/api-reference-docs/changelog.md).

![Reference docs features](./images/refdocs.png '#width=500px;')

***
## Developer portal

**Default MIME type in `OpenApiCodeSample` component**

You can now set the default MIME type for code samples in the `OpenApiCodeSample` component.

Use the `defaultMimeType` configuration option to set the default MIME type, and the `onlyDefaultMimeType` option to show only the preset MIME type in code samples.

**New options in `OpenApiTryIt` component**

The `OpenApiTryIt` component now supports:

- The `onResponse` callback option that can be used to work with the response data after a successful request. It also supports the `request` argument that allows it to inspect request data after performing a request.
- The `securityDefaults` property that allows users to specify default values for security schemes in their example requests.

**Resizable table columns**

Portal visitors can now interactively resize the columns in any table by dragging the separators between column names in the table header. This improves readability of the content in tables, and helps your portal readers adjust the content to their screen size.

**Support for custom redirects**

The portal now supports a global configuration file for custom redirects.

The file must be named `redirects.yaml` or `redirects.json` and stored in the root directory of the portal project.

**Improved `Link` component for custom login pages**

When using the `Link` component for custom login pages, `previousPath` will now be present in `location.state`.

This is useful to get the referrer page and redirect back to it after the login.

**Developer portal changelog**
Read the entire list of fixes and enhancements on the [Developer portal changelog](../docs-legacy/developer-portal/changelog.md).

![Developer portal features](./images/devportal.png '#width=500px;')

***

## OpenAPI CLI and Redoc

**OpenAPI CLI changelog**
Read more about OpenAPI CLI fixes and enhancements by visiting the [OpenAPI CLI changelog](../docs/cli/changelog).

**Redoc changelog**
To find out more about Redoc CLI fixes and enhancements, see the [Redoc changelog](https://github.com/Redocly/redoc/blob/master/CHANGELOG.md).

***

## Documentation updates

In addition to swiftly filling in the gaps between our product features and docs, our technical writing team spent a good chunk of time attending to customer feedback around documentation.

Our customers and their users can easily submit feedback on various things that are unclear or missing in our documentation, and we continuously monitor and work on these to make sure the documentation experience is as good as our developer experience.

In October, we added new topics for:

- API registry settings: [API info](../docs-legacy/api-registry/settings/api-info.md), [Branches](../docs-legacy/api-registry/settings/branches.md), [Delete version](../docs-legacy/api-registry/settings/delete-version.md) and [Environment variables](../docs-legacy/api-registry/settings/environment-variables.md)
- Registry assets: [Add assets](../docs-legacy/api-registry/guides/add-registry-assets.md) and [View and download assets](../docs-legacy/api-registry/guides/view-download-assets.md)
- Portal configuration: [Copy code snippets](../docs-legacy/developer-portal/configuration/siteconfig/copy-codesnippet.md), [Logo](../docs-legacy/developer-portal/configuration/siteconfig/logo.md), and [Page table of contents](../docs-legacy/developer-portal/configuration/siteconfig/table-of-contents.md)

***

## Google Season of Docs - Update

Along with the core technical writing team, our Google Season of Docs technical writers have been actively contributing and adding value to our open source documentation.

In the last month, we:

- Updated the following `commands` topics for OpenAPI CLI:
  - [stats](../docs/cli/commands/stats)
  - [split](../docs/cli/commands/split)
  - [lint](../docs/cli/commands/lint)

- Split the Redoc quickstart guide into:
  - Deployment guide
  - Quickstart guide

## Redocly now hiring documentarians!

While the developer team is growing quite rapidly, we are still on the lookout for a couple of documentation and developer experience professionals right now.

The technical writing team at Redocly has been pretty busy with some cool docs stuff, and are a great bunch of folks to work with.

If you are keen, or know someone who would be a good fit in the Redocly docs team, have a look at these roles and get in touch:

- [Technical Writer](https://redocly.com/careers/#technical-writer)
- [Developer Advocate](https://redocly.com/careers/#developer-advocate)
