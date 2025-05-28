---
template: '../@theme/templates/BlogPost'
title: February 2022 updates
description: Round up of product features and enhancements, plus documentation news from February 2022
seo:
  title: February 2022 updates
  description: Round up of product features and enhancements, plus documentation news from February 2022
author: swapnil-ogale
date: 2022-03-01
categories:
  - tech-writers
  - developer-experience
  - api
image: blog-6.png
---

February hasn't been the most of inspiring of months at Redocly. We have some really wonderful teammates currently in Ukraine who are right now going through a range of emotions.

Our CEO, Adam Altman, penned this [Ukraine war update](ukraine-war.md) with some news, and what you can do to help.

In spite of all this, our developers have been shipping new features and working on our products to make them better for our customers.

Let's highlight some of the new features, enhancements and documentation-related news from February 2022.

***

We've updated our [pricing](../pages/pricing/pricing.page.tsx) page with changes to usages across some of our plans:

- You can now have 2 users on the `Starter` plan (previously 1).
- You can now have 3 users on the `Basic` plan (previously 2).
- Changes to the _API registry validations and bundles per month_ across all our plans.
- Clarified _doc builds per month_ usage across all our plans.

If you need more information, feel free to reach out to us using the [Contact us](../pages/contact-us/contact-us.page.tsx) page.

***

## Workflows

**Pagination on the People tab**

We added the **pagination** feature to the People tab, which is helpful when you have a lot people in your organization.

**Download Apigee X and Apigee proxy bundles**

Added **Download** links on the **Organization settings > API gateways** page that allow enterprise customers to download Apigee X and Apigee Edge proxy bundles.

You can use the proxy bundle to set up your Apigee integration. To find out more, refer to our [Set up the Apigee proxy](../docs-legacy/developer-portal/guides/apigee-integration-portal/setup-apigee-proxy.md) topic.

**Changelog**
Find out about other fixes and enhancements by visiting the [Workflows changelog](../docs-legacy/workflows/changelog.md).

![Workflow features](./images/workflows.png '#width=500px;')

***
## Reference docs

**Automatically generate `R` code samples**

The list of supported languages for auto-generated code samples has grown! You can now configure Reference docs to automatically generate R code samples.

For information on how to do this, refer to the [Generate code samples automatically](../docs-legacy/api-reference-docs/guides/generate-code-samples.md) topic.

**Reference docs changelog**
Here's a link to the entire [Reference docs changelog](../docs-legacy/api-reference-docs/changelog.md).

![Reference docs features](./images/refdocs.png '#width=500px;')

***
## Developer portal

**Use Google Optimize with your portal**

Added support for [Google Optimize](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-marketing-platform/).

To configure it for your portal, read more on the [Analytics page](../docs-legacy/developer-portal/configuration/siteconfig/analytics.md).

**Developer portal changelog**
Read the entire list of fixes and enhancements on the [Developer portal changelog](../docs-legacy/developer-portal/changelog.md).

![Developer portal features](./images/devportal.png '#width=500px;')

***

## OpenAPI CLI and Redoc

**Webhooks support for `split` command**

Added `webhooks` and `x-webhooks` support to the `split` command.

**OpenAPI CLI changelog**
Read more about OpenAPI CLI fixes and enhancements by visiting the [OpenAPI CLI changelog](../docs/cli/changelog).

**Redoc changelog**

To find out more about Redoc CLI fixes and enhancements, see the [Redoc changelog](https://github.com/Redocly/redoc/blob/master/CHANGELOG.md).

***

## Documentation updates

Over the last few months, the technical writing team's focus has been helping our support teams resolve frequent issues and provide support deflection where possible, in addition to documenting our new features and enhancements.

**New topics**

Over the month of February, we added new topics for:
- [Add custom fonts](../docs-legacy/developer-portal/guides/custom-fonts.md)
- [Create step-by-step guides](../docs-legacy/developer-portal/guides/step-by-step.md)
- [Create a custom 404 page in the Developer portal](../docs-legacy/developer-portal/guides/custom-404-page.md)

**Updates to our docs site**
We added our [VS Code extension docs to our main documentation site](../docs/vscode/index.md), so that you can access all our technical content from one place.

Additionally, you will also notice that all page titles and sidebar labels in the docs have changed. They no longer contain words in the _-ing_ form (with a few tiny exceptions).

The goal is to make all these instances consistent and phase out the gerund usage.

***

## Google Season of Docs 2022

The Google Season of Docs is upon us! Motivated by our last year's success, we are hoping to participate in this year's program and work with technical writers keen on contributing to our open source projects.

You can read more about the program's timeline at [Google Season of Docs 2022 timeline](https://developers.google.com/season-of-docs/docs/timeline).
