---
template: '../@theme/templates/BlogPost'
title: June 2021 updates
description: Round up of the features and enhancements, plus some documentation news from June 2021
seo:
  title: June 2021 updates
  description: Round up of the features and enhancements, plus some documentation news from June 2021
author: swapnil-ogale
date: 2021-07-02
categories:
  - dev-portal
  - tech-writers
  - developer-experience
image: blog-6.png
---

June is the month of solstices, both of the northern and southern variety for Redocly employees who are dispersed globally. The duality of celebrating both the longest day and the shortest day helped us push through some important updates to our products, along with adding enhancements and working on some bug fixes.

This post is a round up of our product updates, enhancements and documentation-related news from June 2021.

***

## Workflows

**Managing member access for individual projects**

You can now manage member access to every API version, Reference docs and Developer portal in Workflows. This makes it easier to control who can collaborate on a project in what capacity, and allows you to set up direct access to the project for users outside of your Workflows organization.
For instructions on how to set this up, refer to our [Managing access](../docs-legacy/workflows/manage-access.md) guide.

**Using Bitbucket Cloud as a source**

Workflows now supports Bitbucket Cloud as a source when creating new Developer portal projects and APIs in the registry.

The integration also:
- Displays build status information for commits in the Bitbucket repository, and
- Provides direct links from Bitbucket to build previews.

**Support for SSO user accounts**

Organization administrators can now:

- Invite SSO (single sign-on) users to the Workflows organization.
- Convert Redocly user accounts to SSO accounts. This will also allow members to log in with the email address associated with the organization's identity provider (IdP), removing the need to have multiple logins to log into Workflows.

**Workflows changelog**
Find out about other fixes and enhancements by visiting the [Workflows changelog](../docs-legacy/workflows/changelog.md).

![Workflow features](./images/workflows.png)

***
## Reference docs

**Added new specification extension `x-defaultClientId`**

Reference docs now support a new specification extension `x-defaultClientId`. You can use it in your OpenAPI documents to preset the default `clientId` value in relevant security definitions. For example:

```yaml
type: oauth2
flows:
  implicit:
    x-defaultClientId: example123
    authorizationUrl: https://example.com/api/oauth/dialog
    scopes:
      write:pets: modify pets in your account
      read:pets: read your pets
```

**Add individual description for `enum` values**

When documenting `enum` values in your OpenAPI definition, you can now add an individual description for each of the values by using the `x-enumDescriptions` object.

Reference docs will display the `enum` values and their descriptions as a table in the schema, in the same order as they are listed in the API definition.

**Reference docs changelog**
Here's a link to the entire [Reference docs changelog](../docs-legacy/api-reference-docs/changelog.md).

![Reference docs features](./images/refdocs.png)

***
## Developer portal

**Improvements to Markdown snippets**

Improved support for Markdown snippets makes it possible to use admonitions, links, images and code blocks in your reusable snippet files.

Snippets are no longer limited only to Markdown target pages, you can also use them in MDX pages.

For more information, refer to our [Reusing content with Markdown snippets](../docs-legacy/developer-portal/guides/reusing-content.md) guide.

**Specify image sizes in Markdown pages**

When inserting images into your Markdown pages, you can now specify their size. Supported image size parameters are `width` and `height`, and you can set both or just one for each image. The following example illustrates how to insert a resized image:

`![Resized image description](./path/to/image.png#width=500px;height:350px;)`

**Printer-friendly Developer portal pages**

Developer portal pages are now more printer-friendly thanks to improvements to the print CSS stylesheet around the search box, sidebars, Markdown layouts, and headers and footers.

**Custom URL redirection on logging out**
The login component in the portal header now supports redirecting to a custom URL after users log out of the portal. You can set the custom URL in the `login.menu` section of the `siteConfig.yaml` file. Refer to the [login component documentation](../docs-legacy/developer-portal/configuration/siteconfig/login.md) for more details.

**Developer portal changelog**
Read the entire list of features and fixes on the [Developer portal changelog](../docs-legacy/developer-portal/changelog.md).

![Developer portal features](./images/devportal.png)

***

## Redoc and OpenAPI CLI

**Basic support for OpenAPI 3.1 in Redoc**

We have now added basic support for OpenAPI 3.1. To read more about what features are supported, refer to the [Redoc support for OAS 3.1](https://github.com/Redocly/redoc/pull/1622) page.

**Redoc changelog**

Read the entire list of fixes and enhancements on the [Redoc changelog](https://github.com/Redocly/redoc/blob/master/CHANGELOG.md) page.

**OpenAPI CLI changelog**
Read more about other fixes and enhancements by visiting the [OpenAPI CLI changelog](../docs-legacy/workflows/changelog.md).

![OpenAPI CLI features](./images/cli.png)

***

## Documentation enhancements

In case you haven't already, you should start noticing a few changes to our [documentation site](https://redocly.com/docs/), including navigation, information architecture, and design.

Our sidebar navigation has been modified to include common groupings that should make it easier for our readers to find information. We have started grouping our doc topics into Quickstarts, Changelog, Guides, Configuration and Resources. What do these mean?

- **Quickstart**: Contains any quick start guides that will help you get started on selected products, for example API registry or Reference docs.
- **Changelog**: An up-to-date reverse chronological reference of features, fixes, and enhancements across our products.
- **Guides**: Topics that will help you perform or complete a specific task. For example, `Generating code samples automatically`.
- **Configuration**: Information that will assist you with customizing or configuring parts of our products. For example, `Theming your docs`.
- **Resources**: Topics that provide technical reference around our products. For example, `Built-in lint rules`.

Our technical writers are also working on something really interesting (hint: _visual aids_) at the moment and can't wait to bring this into our docs.
