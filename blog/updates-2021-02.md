---
template: '../@theme/templates/BlogPost'
title: February 2021 updates
description: Quick round up of the features and enhancements Redocly delivered in February 2021
seo:
  title: February 2021 updates
  description: Quick round up of the features and enhancements Redocly delivered in February 2021
author: swapnil-ogale
date: 2021-03-05
categories:
  - dev-portal
  - docs-as-code
  - tech-writers
  - developer-experience
image: features.png
---

February may be a short month in the calendar, but it was certainly busy at Redocly!

This post highlights some of our recent product updates, new features and enhancements from February 2021.

## Workflows

**Configure a custom domain with an optional subdirectory**
Workflows now supports subdirectories for custom domains, allowing you to set up more than one documentation project per custom domain.

Let's say you have a central documentation site, and would like to add a new reference documentation site. You can now set it up as a subdirectory to the root documentation site. For example, if your documentation site is called `docs.yourcompany.com`, you can now add a subdirectory such as `docs.yourcompany.com/developers`.

_**Note:** Custom domains are only supported in the Professional and Enterprise pricing plans._

**Support for extra arguments to the OpenAPI CLI `lint` command**

Workflows now supports an environment variable called `OPENAPI_CLI_LINT_ARGS` for adding extra arguments to the OpenAPI CLI lint command.
To find out how to add environment variables, see [Using environment variables](../docs-legacy/developer-portal/guides/environment-variables.md).
For more information on the `lint` command, see our [lint configuration guide](../docs/cli/configuration).

**New account support and product tour from sign-up**

When you sign up for a new account on Redocly Workflows, you can now provide more information about your API management and documentation needs. This will help us tailor our services to support you from the word go. You can also schedule a product tour directly from the sign-up form.
Find out about other fixes and enhancements by visiting the [Workflows changelog](../docs-legacy/workflows/changelog.md).

![Features](./images/workflows.png)

## Reference docs

**Support for GZIP compressed files**

The Reference docs CLI now supports the `--gzip` flag that outputs GZIP-compressed files directly when bundling your API definitions.

**Support for `.localhost`**

Hostnames ending with `.localhost` are now supported when using Reference docs on-premise (running a local development server).

Here's a link to the entire [Reference docs changelog](../docs-legacy/api-reference-docs/changelog.md).

![Features](./images/refdocs.png)

## Developer portal

**Integration with Apigee**

We were very excited to announce our Apigee integration for your Developer portals built using Redocly. Using the `apigee-developer-portal` repository as an example, you can now integrate your Developer portal with your Apigee API via a special authorization proxy.
For more information on how to set this up for your Developer portal, read our [Apigee integration](../docs-legacy/developer-portal/guides/apigee-integration-portal/overview.md) documentation.

_**Note:** This feature is available upon request only. Contact Redocly to get access and use this feature._

**Support for Role-based access control (RBAC)**

The RBAC feature is now available in the Developer portal to **Enterprise** customers. With RBAC, you can define permissions for accessing specific parts of your Developer portal, such as pages and components (header and footer).

Check out our [RBAC configuration](../docs-legacy/developer-portal/configuration/rbac.md) documentation to find out how to use this for your Developer portal.

**Exclude pages from portal build**

A new front matter option `exclude` is now supported on MD and MDX pages. You can use it to exclude an entire page from the portal build by adding `exclude: true` to the page front matter.

**Support for multiple identity providers for on-premise container**

You can configure multiple identity providers in the `auth` section of the `siteConfig.yaml` file.

Read more on the [Developer portal changelog](../docs-legacy/developer-portal/changelog.md).
