---
template: '../@theme/templates/BlogPost'
title: January 2022 updates
description: Round up of product features and enhancements, plus documentation news from January 2022
seo:
  title: January 2022 updates
  description: Round up of product features and enhancements, plus documentation news from January 2022
author: swapnil-ogale
date: 2022-02-02
categories:
  - dev-portal
  - tech-writers
  - developer-experience
  - api
image: blog-5.png
---

In the blink of an eye, January is over!

The holiday season didn't dampen the pace of enhancing our consumers' experience with our products. While we all enjoyed a well earned year-end break, there was still a lot of activity amongst the Redocly product teams.

Let's have a quick look at our new features, enhancements and documentation-related news from January 2022, and also some you may have missed from December 2021 (it was the holiday season, so we won't hold that against you!)

***

**Hot off the press!**

You're in for a treat: we revamped and published our brand new website yesterday. This new site has been fully redesigned to enhance your experience with our products, know more about our mission, read our technical docs, and of course get started on creating superior API docs.

Head over to [Redocly](https://redocly.com/) to check it out.

***

## Workflows

**Download proxy bundles for Apigee integration**

Enterprise customers can use the **Settings > API gateways** page to download Apigee X and Apigee Edge proxy bundles.

**Disable default URL setting**

Added an option to disable the default `redoc.ly` URL in the custom domain settings for Reference and Portal projects.

**Access Redocly compliance reports**

Using the newly added **Security** section under settings, you can access Redocly compliance reports and other documents related to the security of our services.

**Informative tooltips**

We've made tooltips more informative throughout the Workflows interface. Hovering over text like _Last updated ... ago_ shows the exact date and time when the version or project was updated.

**Configure organization-level role privileges**

Customers on the Enterprise plan can configure organization-level role privileges. For more information, read the [role privileges](../docs-legacy/settings/role-privileges.md) topic.

**Edit environment variables**

You can now edit environment variables for API registry and portals. To find out how to do this, read our [environment variables settings](../docs-legacy/api-registry/settings/environment-variables.md) topic.

**Support for inline OIDC configuration**

Implemented support for inline OIDC configuration in the **Settings > Identity providers > OpenID Connect** dialog.

Organization owners can provide the configuration manually by selecting the _Insert configuration as JSON_ option in the dialog.

**Access your billing history**

Organization owners now have access to the billing history. Use the **Settings > Billing** page to view details about your subscription and usage limits.

## API registry

**New format for API registry links**

The registry API uses a new format for _bundle_ and _assets_ links. The old format is deprecated, and we recommend switching to the new format.
{% tabs %}
{% tab label="Bundle links" %}
```diff
- Old bundle link format
- https://api.test.org/registry/org/api/version/bundle/main/uuid/openapi.yaml
+ New bundle link format
+ https://api.test.org/registry/bundle/org/api/version/openapi.yaml?branch=main&job=uuid
```
{% /tab  %}
{% tab label="Assets links" %}
```diff
- Old asset link format
- https://api.test.org/registry/org/api/version/assets/markdown.md?branch_name=branchName
+ New asset link format
+ https://api.test.org/registry/assets/org/api/version/markdown.md?branch=branchName
```
{% /tab  %}
{% /tabs  %}
**Link for copying folder assets**

The _Assets_ page in the API registry shows the **Copy link** button for folder assets.

**Changelog**

Find out about other fixes and enhancements by visiting the [Workflows changelog](../docs-legacy/workflows/changelog.md).

![Workflow features](./images/workflows.png '#width=500px;')

***
## Reference docs

**Download button for `Try it`**

We added a nifty `Download` button to allow you to download any file that is returned as a response in the "Try it" console. If the response is not a file, but just plain text, you can always use the `Copy` button to copy the text.

**New theming option**

Our new theming option `backgroundColor` allows you to theme your request and response schema panels.

**New object description and configuration option**

We implemented object description for `oneOf/anyOf`, and added support for markdown syntax for the `oneOf/anyOf` objects.

If you want to hide this feature, you can also use the new config option `hideOneOfDescription`.

**Reference docs changelog**
Here's a link to the entire [Reference docs changelog](../docs-legacy/api-reference-docs/changelog.md).

![Reference docs features](./images/refdocs.png '#width=500px;')

***
## Developer portal

**Use Google Optimize with your portal**
Added support for [Google Optimize](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-marketing-platform/). To configure it for your portal, read more on the [Analytics page](../docs-legacy/developer-portal/configuration/siteconfig/analytics.md).

**Support for multiple sidebars**
We added support for multiple `sidebars.yaml` files and introduced a few changes to sidebar configuration in the portal. For more information, read the [migration guide](../docs-legacy/developer-portal/guides/migration-guide-sidebars.md).

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

## Google Season of Docs 2021 - successfully completed!
As first-time participants, we had a really good experience with the Google Season of Docs for 2021. We published a [case study](../pages/gsod/casestudy.md) to highlight our experience with the program.

Google announced a [list of successful projects](https://developers.google.com/season-of-docs/docs/participants) as part of the 2021 program.

***

## Documentation updates

It's never a dull moment with the documentation team at Redocly. While our product team is growing rapidly and adding some amazing new features, the tech writing team has been busy working with them to document and improve our developer experience.

Across December and January, we added new topics for:

- [Role privileges settings](/docs-legacy/settings/role-privileges.md)
- [Apigee instructions for mdx files](/docs-legacy/developer-portal/guides/apigee-integration-portal/overview.md)
- [Custom registry assets](/docs-legacy/api-registry/guides/view-download-assets.md)
- [Portal redirect guide](/docs-legacy/developer-portal/guides/redirects.md)
- [Environment variables settings](/docs-legacy/api-registry/settings/environment-variables.md)
- [Disable redoc.ly URL setting](/docs-legacy/api-reference-docs/settings/custom-domain.md)
- [Security reports](/docs-legacy/settings/security.md)

***

## Redocly now hiring documentarians!

While the developer team is growing quite rapidly, we are still on the lookout for a couple of documentation and developer experience professionals right now.

The technical writing team at Redocly has been pretty busy with some cool docs stuff, and are a great bunch of folks to work with.

If you are keen, or know someone who would be a good fit in the Redocly docs team, have a look at these roles and get in touch:

- [Technical Writer](https://redocly.com/careers/#technical-writer)
- [Developer Advocate](https://redocly.com/careers/#developer-advocate)
