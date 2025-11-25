---
template: ../@theme/templates/BlogPost
title: April 2021 updates
description: Round up of the features and enhancements, plus some documentation news from April 2021
seo:
  title: April 2021 updates
  description: Round up of the features and enhancements, plus some documentation news from April 2021
author: swapnil-ogale
publishedDate: "2021-05-04"
categories:
  - redocly:product-updates
image: blog-1.png
---
At Redocly, in April, we have been akin the proverbial duck - calm on the surface, but paddling furiously underneath with our API suite of products.

While our developers are working on some exciting new features and tweaking our products to perform optimally, our documentation team has been kicking a few goals too.

This post is a round up of our product updates, enhancements and documentation-related news from April 2021.

## Workflows

**RBAC roles and access tokens**
Implemented support for reading RBAC roles from the access token (if it's a JWT and if it contains a claim). To find out how to configure RBAC, read the [RBAC Configuration steps](../docs-legacy/developer-portal/configuration/rbac.md#configuration-steps).

**`Access-Control-Allow-Origin` value**

`Access-Control-Allow-Origin` is now set to *for public registry URLs by default, allowing any front-end code to access those URLs. The* value tells browsers to allow requesting code from any origin to access the resource without the need for credentials.

{% admonition type="warning" %}
If you use the * wildcard with credentials, it will result in an error.
{% /admonition %}

**Support for dot notation in custom role claims names**

Redocly now supports the dot notation in custom role claims names. For example, `realm_access.roles`.

This feature allows customers to reuse their Identity Providers (IDPs) standard role claims names.

**Workflows changelog**
Find out about other fixes and enhancements by visiting the [Workflows changelog](../docs-legacy/workflows/changelog.md).

![Workflow features](./images/workflows.png)

***
## Reference docs

**Improved user experience (UX) with auto-generated code samples**

We have improved path parameter handling in auto-generated code samples. The pathname is now a variable, so you can define it once and it will be automatically generated into the relevant code sample.

**Reference docs changelog**
Here's a link to the entire [Reference docs changelog](../docs-legacy/api-reference-docs/changelog.md).

![Reference docs features](./images/refdocs.png)

***
## Developer portal

**Improved Developer portal navigation and front matter**

You can now enable the **Back to** button on MD(X) pages.

- To enable the button site-wide for all pages at once, add `showPrevButton: true` to the `siteConfig.yaml` file.
- To enable it only on specific pages, add `showPrevButton: true` to the page front matter.

If you reference any files (such as images or Markdown pages) in the front matter of your MD(X) files, those files will now be copied to the `static` folder in the portal. Any references to these files are automatically replaced by their destination links.

**Passing current API definition down to components**

The portal now uses top-level context to pass the current API definition down to components. This allows users to import the context (as `import {usePageData} from '@redocly/developer-portal/ui'`) and use it in their own custom components (as `const {rawApiDefinition} = usePageData();`).

**Updated theming options**

- Support for `rightPanel > width` theming option media query values, allowing you to customize it depending on the screen size. For example, `rightPanel: { width: { medium: '40%', large: '800px'}}`.
- The `typography > links` section of the Developer portal theme now lets you customize the textDecoration value.
- `pageId` is now passed to custom Markdown template properties.
- The `rightPanel > width` theming option now accepts the CSS `calc` function as a value.

**Developer portal migration**

We have migrated the Developer portal to [Gatsby v3](https://www.gatsbyjs.com/blog/gatsby-v3/), updated all outdated dependencies, and resolved security warnings. This translates to a better and efficient user experience for your Developer portals.

**Developer portal changelog**
Read the entire list of features and fixes on the [Developer portal changelog](../docs-legacy/developer-portal/changelog.md).

![Developer portal features](./images/devportal.png)

***

## Product videos

We added some new product videos that explain Redocly's most popular features and key concepts.

- [API registry tour](https://www.youtube.com/watch?v=nj7v2oOnTj0)
- [Pagination in Reference docs](https://www.youtube.com/watch?v=7dMPPFVJx7A)
- [OpenAPI custom rule](https://www.youtube.com/watch?v=hLjzV-RmSno)
- [Getting ready to start your OpenAPI definition](https://www.youtube.com/watch?v=0ccz2lX4SpU)
- [OpenAPI help with path parameters](https://www.youtube.com/watch?v=AuJMFx_v6dY)
- [Set up Cognito and access controls for a Developer portal](https://www.youtube.com/watch?v=3LCeZsc-Z6o)

***

## Google Season of Docs 2021

This year, Redocly submitted a proposal for hiring technical writers to work on our open-source projects (Redoc and OpenAPI-CLI), as part of Google's Season of Docs.

Our proposal was accepted and we are eagerly looking forward to work with our community and experienced tecnical writers to build some solid documentation for our open-source products.

Read more about our proposal at [Contribute to documenting Redocly's open-source tools](https://redocly.com/gsod/).

***

**Redocly at Write the Docs Portland 2021**

Our Technical Writer Advocate presented a talk on *Putting the "tech" in technical writer* at the Write the Docs Portland 2021, which was held online on Apr 25-27.

The event was attended by over 600 attendees from across the globe. Talk videos will be published to the [Write the Docs Youtube](https://www.youtube.com/channel/UCr019846MitZUEhc6apDdcQ) channel in a few days.
