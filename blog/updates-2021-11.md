---
template: ../@theme/templates/BlogPost
title: November 2021 updates
description: Round up of product features and enhancements, plus documentation news from November 2021
seo:
  title: November 2021 updates
  description: Round up of product features and enhancements, plus documentation news from November 2021
author: swapnil-ogale
publishedDate: "2021-12-01"
categories:
  - redocly:product-updates
image: blog-6.png
---
November felt like a wrap-up month at Redocly, in the sense that we wrapped up some really big projects and made some nifty UX improvements to our products such as the OpenAPI VS Code extension, Redoc and the Developer portal.

Let's have a quick look at our new features, enhancements and documentation-related news from November 2021.

We are also on a lookout for developers and documentarians at Redocly, so if you are interested in joining a leader in the API design and documentation space, keep reading for more details.

***

## Redocly OpenAPI VS Code extension

After several months of incremental improvements, we're happy to announce a **new major release** of the _Redocly OpenAPI extension for VS Code_. For this new version, we focused on improving the usability of the extension, paying special attention to first-time OpenAPI authors and those who prefer a guided approach to writing API definitions.

Here are [five reasons](./new-release-redocly-openapi-vscode-extension.md) to try it today.

## API registry

**Clearer warnings with API validation**

When validating your API definitions, the API registry now shows the exact rule name that generated a warning in the **Results** output.

**Improved cancel subscription form**

We value your feedback on all things Redocly, so we improved the **Cancel subscription** form and added the ability for users to provide cancellation reason as feedback. This will help us better understand the user experience and improve our products.

**Configurable access control**

Organization owners can now disable the _Log in with Redocly account_ option on the **Settings > Access control** page if they want to use only SSO login for their organization.

When you configure the access to SSO-only, the login flow will indicate that SSO is required for users trying to log in.

**Using wildcards in domain names**

When generating new license keys from the **Workflows > Settings > On-premise license keys** page, you can now use wildcards in domain names.

You can only use one wildcard in each configured domain.

{% admonition type="info" %}
This also applies to Reference docs.
{% /admonition %}

**Changelog**
Find out about other fixes and enhancements by visiting the [Workflows changelog](../docs-legacy/workflows/changelog.md).

![Workflow features](./images/workflows.png '#width=500px;')

***
## Reference docs

**Support for separators in sidebar**

Reference docs now supports two new configuration options - `separator` and `separatorLine` for items configured in `sidebarLinks`.

We've also added support for the corresponding theming option called `sidebar > separatorLineColor`.

**Sending header information with every request**

We implemented a new configuration option called `sendXUserAgentInTryIt` to enable sending the `X-User-Agent: Redocly Try it API console` header with every request made from the _Try it_ console.

**NOTE:** Before you can use this, make sure you add `X-User-Agent` to your [`Access-Control-Allow-Headers`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers) CORS header.

**Automatic wrapping of long server URLs**

- Long server URLs in the _Try it_ console now automatically wrap and adjust to the width of their containing element, giving you a clearer look at the full server URL values.
- The **Copy** button for server URLs has also been removed to declutter the space.

**Support for PKCE for OAuth2**

The _Try it_ console now supports PKCE for OAuth2 authorization code flow. To enable it for a specific security definition, add the [`x-usePkce: true`](../docs-legacy/api-reference-docs/specification-extensions/x-use-pkce.md) specification extension.

```yaml
components:
  securitySchemes:
    oauth2_auth:
      type: "oauth2"
      flows:
        authorizationCode:
          x-usePkce: true,
          authorizationUrl: "https://example.com/authorize",
          tokenUrl: "https://example.com/token",
          scopes: {
            api: "Grants complete read/write access to the API"
```

**Reference docs changelog**
Here's a link to the entire [Reference docs changelog](../docs-legacy/api-reference-docs/changelog.md).

![Reference docs features](./images/refdocs.png '#width=500px;')

***
## Developer portal

**Support for Amplitude analytics**
You can now use [Amplitude analytics](https://amplitude.com/) with the portal product. For more information on how to configure this, check the [Amplitude analytics](../docs-legacy/developer-portal/configuration/siteconfig/analytics.md#amplitude) topic.

**Exclude page URLs from sitemap**

There may be instances where you don't want certain page links included in your sitemap. You can now use the `excludeFromSearch` option in the front matter of a page to exclude its URL from _sitemap.xml_.

**Create interactive step-by-step guides**

We've added a number of new properties to the `OpenApiTryIt` component to help you create interactive step-by-step guides.

The new properties are:
- `id` _(optional)_
- `needs` _(optional)_
- `placeholder` _(optional)_
- `serverVariables` _(optional)_

For more information, see the [Developer portal changelog](../docs-legacy/developer-portal/changelog.md).

**New home for configuration options**

We've reorganized configuration options for modifying the `<head>` contents in your portal. Instead of adding these options to the `meta` section in `siteConfig.yaml` or to the top level of page front matter, you should now define them in a new section called [seo](../docs-legacy/developer-portal/configuration/siteconfig/seo.md).

This means you can now use the same configuration syntax in front matter and in `siteConfig.yaml` - a big win for consistency!

Specifically, this affects the following configuration options:

- `description`
- `image`
- `keywords`
- `title`
- `lang`
- `sitemap` in front matter
- `siteUrl` in the `siteConfig.yaml` file, and
- `x-meta` [specification extension](../docs-legacy/api-reference-docs/specification-extensions/x-meta.md) supported in integrated Reference docs pages.

{% admonition type="warning" name="Important" %}
We recommend migrating to this new configuration approach as soon as possible. Although we currently support this, the old approach is now considered deprecated and will display warnings in the portal build log.
{% /admonition %}

**Set up JSON-LD parameters**

You can now set up [JSON-LD](https://json-ld.org/) parameters for your portal in the `siteConfig.yaml` file or in the front matter for individual MD(X) pages in the portal.

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

In the last month, our technical writing team spent a good chunk of time attending to customer feedback around documentation.

We added new topics for:
- Portal settings:
  - [Custom domain](../docs-legacy/developer-portal/settings/custom-domain.md),
  - [Notifications](../docs-legacy/developer-portal/settings/notifications.md) and
  - [Delete portal](../docs-legacy/developer-portal/settings/delete-portal.md)
- [SEO configuration with JSON-LD options](../docs-legacy/developer-portal/configuration/siteconfig/seo.md)
- [Self-hosted routing](../docs-legacy/api-reference-docs/guides/on-premise.md)

***

## Google Season of Docs 2021 - Completed
The Google Season of Docs for 2021 is now over and we published a [case study](../pages/gsod/casestudy.md) to highlight our experience with the program.

## Redocly hiring documentarians and developers!

We have some rather ambitious plans for 2022, and to help us with that, we are on the lookout for a couple of documentation and developer experience professionals right now.

The technical writing team at Redocly has been pretty busy with some cool docs stuff, and are a great bunch of folks to work with.

If you are keen, or know someone who would be a good fit in the Redocly docs team, have a look at these roles and get in touch:

- [Technical Writer](https://redocly.com/careers/#technical-writer)
- [Developer Advocate](https://redocly.com/careers/#developer-advocate)

If you are a developer, we have a total of **33** (yes, you read that right!) developer roles going at the moment.

For a taste of what's involved, check out our [Full Stack Developer](https://redocly.com/careers#full-stack-developer) posting and get in touch with us pronto!
