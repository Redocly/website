---
template: ../@theme/templates/BlogPost
title: Upward and onward at Redocly
description: Highlighting the most interesting and useful features Redocly delivered in 2021
seo:
  title: Upward and onward at Redocly
  description: Highlighting the most interesting and useful features Redocly delivered in 2021
author: swapnil-ogale
date: "2021-12-25"
categories:
  - redocly:product-updates
image: team.png
---
2021 seemed like a natural extension of the previous year, but there were a lot more positives and forward movement.

At Redocly, we have had a superb year. This year, our mission was to not only further improve the consumer experience, but also make steady progress on the producer experience by offering the right tools and knowledge to build outstanding products.

In this post, we highlight some of the most useful features we delivered this year across our products.

## Hot off the press!

In our continued dedication to security, we are happy to announce that Redocly Inc. is now SOC 2 compliant. If it wasn't already the case, current and future customers can now be doubly-assured that we manage their data with the highest standard of security and compliance.

## Redocly OpenAPI VS Code extension

In 2021, we announced a major release of the Redocly OpenAPI extension for VS Code. Redocly OpenAPI is a Visual Studio Code extension that helps you write, validate, and maintain your OpenAPI documents.

Amongst other things, the VS Code extension provides a superb guided approach to writing API definitions for first-time OpenAPI authors.

Here are [five reasons](new-release-redocly-openapi-vscode-extension.md) to try it out today.

## Workflows

We enhanced our web-based application _Workflows_ in 2021. _Workflows_ brings a powerful set of DocOps to your docs-like-code practice, helping teams throughout the API lifecycle.

**Redesigned flow for people and introducing Teams**

One of many usability upgrades we made in Workflows is the improved process flow when you invite new members to your organization. The new invitation email they receive is now more informative and has been given a facelift.

We added **Teams** to our _Workflows_ product. If you have multiple projects and people in your organization, you can create teams to assign the same project-level permissions to a group of people, without having to manually assign permissions to everyone individually.

For more information, read the [Teams](../docs-legacy/teams/index.md) documentation.

**Custom domains**

Workflows supports subdirectories for custom domains, allowing you to set up more than one documentation project per custom domain.

_**Note:** Custom domains are only supported in the Professional and Enterprise pricing plans._

**Support for Single Sign-On (SSO) and multiple identity providers**

You can configure access via SSO:

- on a project level (specific API versions, Reference docs, and Developer portals), or
- across the entire Workflows organization, effectively allowing your users to log into Workflows with SSO instead of Redocly accounts.

To find out how to set this up, refer to our [Setting up access control](../docs-legacy/settings/access-control.md) guide.

You can also configure multiple identity providers and use them simultaneously across different projects. Refer to our [Configuring multiple identity providers](../docs-legacy/settings/identity-providers.md) guide for more information.

{% admonition type="info" %}
This feature is only available to Enterprise customers.

{% /admonition %}

**Advanced access controls for all projects**

Workflows supports advanced access controls for all project types (API versions, Reference docs, Developer portals).

You can:

- streamline collaboration by controlling people access at the project level,
- invite external collaborators more easily, and
- create teams to manage different groups of collaborators with different levels of access.

To read more, refer to our [Managing access](../docs-legacy/workflows/manage-access.md) guide.

**Improved user experience**

The API registry page is more efficient, usable and easier to navigate, which allows you to discover your APIs and other assets faster.

- Use the **Search** feature to look up API versions by name.
- If you have labels assigned to your API versions, you can now **filter by labels** quickly.
- We've added two options for **sorting** your API versions: Sort _alphabetically_ or by _newest first_.
- The API registry page is also now properly **paginated** to neatly organize your APIs and unclutter the interface.

![Features](./images/workflows.png)

***

## Developer portal

Redocly's developer portal is a one-stop shop for all your API documentation, how-to guides, tutorials, examples and code samples.

This year, we continued to add some solid features and improvements to our portal product across content, customization, design, and integration.

In August, we released Developer portal v1.1 which included support for Reference docs 2.0 and brought a complete visual overhaul to your integrated API reference docs.

**Single sourcing and content reuse with snippets**

You can reuse Markdown snippets across your content, effectively eliminating content copy and paste, and redundancy of content. Make your changes in one place and these will propagate through all other places where you have embedded them.

To start using this, read our [Reusing content with Markdown snippets](../docs-legacy/developer-portal/guides/reusing-content.md) guide.

**Support for Role-based access control (RBAC)**

Enterprise customers can use the RBAC feature in the Developer portal. With RBAC, you can define permissions for accessing specific parts of your Developer portal, such as pages and components (header and footer).

Check out our [RBAC configuration](../docs-legacy/developer-portal/configuration/rbac.md) documentation to find out how to use this for your Developer portal.

**Customization and styling**

We added tons of customization and styling features to our Developer portal.

- Simpler, convenient admonitions syntax
- Icon and logo customization
- Support for absolute and relative links
- Built-in link checker
- Sitemap

**Advanced theming options**

You can personalize your Developer portal with custom fonts, colors, spacing, and styles.
For more information, read our [customizing the theme](../docs-legacy/developer-portal/configuration/theme.md) guide.

**Integration with gateways and analytics tools**

The Developer portal supports integration with API gateways such as Apigee and a number of analytics tools such as Google, Heap, Amplitude and Segment.

To configure your site for analytics, refer to the [analytics](../docs-legacy/developer-portal/configuration/siteconfig/analytics.md) topic.

**Interactive step-by-step guides**

We added a number of new properties to the `OpenApiTryIt` component that will allow you to create interactive step-by-step guides. Additionally, you can use the new component `ExplainStep` to add tips and instructions for each step.

![Features](./images/devportal.png)

***

## Reference docs

We unveiled the biggest update to our Reference docs product since its launch with Reference docs 2.0!

For more information on what v2.0 included, read our [Announcing Reference docs 2.0](reference-docs-redesign.md) post.

**Version switcher**

Do you have customized documentation across different API versions? Redocly includes a version switcher element for quick navigation between multiple API documentation versions in the Developer portal.

**Improved user experience**

We introduced a range of improvements across the user experience:

- Improved path parameter handling in auto-generated code samples
- Simplified pagination settings
- Support for sending requests even if the payload is invalid
- Ability to automatically expand schemas
- Revamped Live configuration editor
- Auto synchronization of examples and content type selection

**Visual improvements**

Your API documentation has been transformed into a more modern, more readable, and a generally more pleasant experience, and with the new version we also added tons of new features and enhancements:

- Refreshed `Try it` console
- Improved search experience
- Support for docs personalization
- Better navigation
- Customizable code sample tabs

**Multiple language code samples**

Reference docs can now automatically generate code samples in:

- Go
- PHP
- Ruby
- Java and Java 8 + Apache
- Python
- C#
- JavaScript
- curl
- Node.js

![Features](./images/refdocs.png)

***

## Documentation and community updates

It wasn't all about product and features in 2021. Our team of technical writers have also been busy documenting new features, keeping the documentation updated, and adding lots of new content and guides for our products.

In case you haven't noticed already, there have also been a few changes to our documentation site, particularly navigation, information architecture, and design.

**Google Season of Docs 2021**

As part of the Google Season of Docs, Redocly hired 2 technical writers to work on its open-source tools, Redoc and Redocly CLI. They contributed to our open source documentation and made it a lot better for our customers.
We published a [case study](../pages/gsod/casestudy.md) to highlight our experience with the program.

**Conferences and meetups**

Our Technical Writer Advocate presented at 3 conferences this year:

- Write the Docs Portland
- Evolution of TC 2021
- APIdays Australia

Our in-house Technical Writer also published a paper on `docs-as-code` in the STC Journal and presented at the _live@manning conferences: APIs_ talking about _5 choices that transform API documentation from average to amazing_.

***

## OpenAPI CLI and Redoc

We made some nifty changes and added some really cool features to our popular open-source tools `OpenAPI CLI` and `Redoc`.
Read more about OpenAPI CLI fixes and enhancements by visiting the [OpenAPI CLI changelog](../docs/cli/changelog).

To find out more about Redoc CLI fixes and enhancements, see the [Redoc changelog](https://github.com/Redocly/redoc/blob/master/CHANGELOG.md).

**OpenAPI CLI and Redoc documentation is now open-source!**

Our [official OpenAPI CLI documentation](https://redocly.com/docs/cli/) and [official Redoc documentation](https://redocly.com/docs/redoc/quickstart/intro/) is now open-source!

You can find the source of all pages published on our website in the `docs` folder of the:

- [OpenAPI-cli repository](https://github.com/Redocly/openapi-cli/tree/master/docs).
- [Redoc repository](https://github.com/Redocly/redoc/tree/master/docs).

## What would you like to see in 2022?

APIs have become the backbone of modern, interconnected systems, and documentation is the driving force behind the uptake of APIs across applications.

What API documentation features are you most excited about? Let us know on [Twitter](https://twitter.com/redocly).
