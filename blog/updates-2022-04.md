---
template: ../@theme/templates/BlogPost
title: April 2022 updates
description: Round-up of product features and enhancements from April 2022
seo:
  title: April 2022 updates
  description: Round-up of product features and enhancements from April 2022
author: ivana-devcic
publishedDate: "2022-05-02"
categories:
  - redocly:product-updates
image: blog-7.jpg
---
If we had to describe our April activities in two words, "spring cleaning" would nail it. Sometimes you just have to tackle that technical debt and focus on fixing bugs in order to make progress.

At the same time, Redocly developers are working on several new features behind the scenes. Some of those features are mind-blowing...but you'll have to wait for the next monthly update to read about them.

For now, here's a quick round-up of Redocly product enhancements from April 2022.

***


{% admonition type="success" name="✨ Customer spotlight ✨" %}
Australia Post reduces developer bounce rate from 30% to 1.75% with Redocly Developer portal.

One of the world’s most innovative post services switched to our developer portal, to great liking by developers using APIs to _literally_ connect the world.
[Read their story](https://redocly.com/customers/australia-post/).
{% /admonition %}


***

## Workflows

On the Workflows side, April was dedicated exclusively to internal infrastructure and performance improvements.

This means we don't have much to report in the way of changelog, but you will notice the Workflows interface is smoother and faster to use.

![Workflows features](./images/workflows.png '#width=500px;')

***

## Reference docs

**Extended sidebar customization**

The `sideNavStyle` option in your Redocly configuration file supports a new value - `id-only`.

Previously, your Reference docs sidebar could show either the summary, or the path followed by the summary for every operation in your API definitions.

When you set `sideNavStyle` to the `id-only` value, your sidebar will display only the operation ID for every operation. This feature is supported both in Redoc and in Reference docs.

**Reference docs changelog**
Find more improvements and resolved issues in the [Reference docs changelog](../docs-legacy/api-reference-docs/changelog.md).

![Reference docs features](./images/refdocs.png '#width=500px;')

***

## Developer portal

**Improved search usability**

When using the built-in search feature on integrated API reference pages, the search results list will display operation descriptions (if they are available for an operation). This should help your portal visitors make sense of the search results and find the exact information they need.

**Developer portal changelog**
Read about all the latest fixes and enhancements in the [Developer portal changelog](../docs-legacy/developer-portal/changelog.md).

![Developer portal features](./images/devportal.png '#width=500px;')

***

## OpenAPI CLI

Two of the OpenAPI CLI commands received significant improvements during this month. The `push` command supports a new option called `--skip-decorator`, allowing you to ignore one or more decorators during the bundling process.

We continue to polish the OpenAPI 3.1.x experience in all our products by covering as many use-cases as possible. Thanks to our community member [Alberto Fernandez's contribution](https://github.com/Redocly/openapi-cli/pull/621), we improved the `lint` command so that it allows using `unevaluatedProperties` as boolean in OAS 3.1.x definitions.

**OpenAPI CLI changelog**
The full list of fixes and enhancements is available in the [OpenAPI CLI changelog](../docs/cli/changelog).

## Redoc

We've added two new theming options - `activeBackgroundColor` and `activeTextColor` - that you can use in the `sidebar` section of your Redoc theme.
With these options, you can set the custom background color and the custom text color for active (selected) items in the sidebar. This should make it easier for your API documentation readers to distinguish selected items in the sidebar.

**Redoc changelog**

You can find more fixes and enhancements in the [Redoc changelog](https://github.com/Redocly/redoc/blob/master/CHANGELOG.md).

***

## Write the docs at Redocly!

We were excited for Google Season of Docs 2022, but unfortunately didn't make it to the final selection. Although a bit disappointing, it's not the end of the world. After all, it's good to see Google prioritizes organizations that haven't participated before, as this increases the diversity of topics, projects, and participants.

Having said that, you can still write the docs at Redocly! We're looking for a [full-time Technical Writer](https://redocly.com/careers/#technical-writer) to work on product documentation and training materials (including, but not limited to videos) for our premium and open source products.

If you'd prefer to write different kinds of content (or even code), create product demos, and interact with developers, we have a role for that, too. Take a look at our [Developer Advocate](https://redocly.com/careers/#developer-advocate) position, and get in touch if you're interested.

