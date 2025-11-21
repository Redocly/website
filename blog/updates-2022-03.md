---
template: ../@theme/templates/BlogPost
title: March 2022 updates
description: Round up of product features and enhancements, plus documentation news from March 2022
seo:
  title: March 2022 updates
  description: Round up of product features and enhancements, plus documentation news from March 2022
author: swapnil-ogale
date: "2022-04-04"
categories:
  - redocly:product-updates
image: blog-8.jpg
---
March was a super productive month at Redocly. Our developer teams delivered many cool features across the board and I am excited to share all of these with you.

Looking back 12 months, we had a very similar [March in 2021](updates-2021-03.md), so maybe March has a touch of something special going for it.

Let's run through some of the new features, enhancements and documentation-related news from March 2022.

***

🥳

Firstly, we switched over our website and the Redocly app officially to the [redocly.com](https://redocly.com/) domain! Easy to remember and straight-forward to work with.

***

## Workflows

**Mock server feature**

We added the mock server feature to our registry that lets you test your APIs while you design and develop them.

Add your API definitions to the Redocly API registry and enable the mock server for all branches in the API project settings. The API version **Overview** page displays the mock server link that you can copy and use in any API testing tool to send requests.

For more information on how to use this feature, refer to the [mock server quickstart guide](../docs-legacy/api-registry/guides/mock-server-quickstart.md).

{% admonition type="info" %}
The mock server is available only to customers on the Pro and Enterprise plans.
{% /admonition %}

**Simplified configuration file**

The Redocly configuration file is used by multiple Redocly apps (OpenAPI CLI, Workflows, Reference and VS Code extension) to help you control their behavior.

In the latest releases of these apps, we implemented a new format of the configuration file. Our goal was to simplify its usage, improve the integration of Redocly apps, and standardize the way they interpret the configuration file.

To understand what has changed in the configuration file and how to start using the new options, read our [migration guide](../docs-legacy/api-registry/guides/migration-guide-config-file.md).

**Auto detection of labels**

If you're using the new `labels` section in the Redocly configuration file to assign labels to your APIs, the API registry will detect this and automatically apply the labels to your APIs when you set up your API project.

{% admonition type="info" %}
Keep in mind that you can only assign labels that already exist in your Workflows organization. If you add new labels to the `labels` section of the configuration file, it will not create new labels in Workflows, and these labels will be ignored during the API project setup.
{% /admonition %}

**SSO for Pro plans**

The SSO (Single-Sign On) functionality is now available to users on Pro plans (was only available to Enterprise customers before). SSO accounts count towards the user limit for the organization.

**Changelog**
Find out about other fixes and enhancements by visiting the [Workflows changelog](../docs-legacy/workflows/changelog.md).

![Workflow features](./images/workflows.png '#width=500px;')

***
## Reference docs

**Use example values with Try it console**

The _Try it_ console lets you use `example` values with object properties to set initial values in the `Body` form.

**Reference docs changelog**
Here's a link to the entire [Reference docs changelog](../docs-legacy/api-reference-docs/changelog.md).

![Reference docs features](./images/refdocs.png '#width=500px;')

***
## Developer portal

**Introducing the API catalog**

We added the API catalog - a new approach for integrating the developer portal and the API registry. Use the `catalog.yaml` file to import assets and integrate multi-version APIs into your portal.

To find out more, refer to the [manage your APIs with the API catalog](../docs-legacy/developer-portal/guides/api-catalog.md) topic.

**`Edit page` button for your portal pages**

You can add an "Edit page" button to all or some MD(X) pages in your portal. When enabled, the button is displayed at the top of each page, and you can link it to a GitHub or a GitLab repository.

You can enable it globally for all pages in the `siteConfig.yaml` file, or control it per-page in the front matter.

For more information, refer to the [edit page](../docs-legacy/developer-portal/guides/markdown.md#editpage) section.

**Portal version number**

The portal version number is now visible in the developer console to make troubleshooting easier.

**Integrate Reference docs directly into the portal**

You can integrate Reference docs pages directly into the portal without creating `.page.yaml` files.

To achieve this, add your OpenAPI definition file to the portal project and include it into a `sidebars.yaml` file.

{% admonition type="info" %}
This approach doesn't support multi-version APIs, integrating APIs from the Redocly API registry, restricting permissions with RBAC, or excluding specific API reference documentation from portal search results.

To use those features, you will have to integrate Reference docs with `.page.yaml` files as before.
{% /admonition %}
Refer to our [Integrate API reference docs](../docs-legacy/developer-portal/guides/reference-docs-integration.md) guide to find out how to configure this.

**New header for on-page navigation**

All table of contents sections now have an "On this page" header. This improves accessibility of the on-page navigation.

**Configure sidebars per page**

We added support for displaying a sidebar on pages not listed in any `sidebars.yaml` file. To do this:

- Use the new `sidebar` option in the page front matter, and
- Specify which sidebar to display by providing the path to the `sidebars.yaml` file or the sidebar name (if you're using the legacy sidebar configuration with `sidebarName`).

For example,
{% tabs %}
{% tab label="Sidebar name" %}
  ```md
  ---
  title: Adding sidebar to the page
  sidebar: training
  ---
  ```
{% /tab  %}
{% tab label="Path to sidebars file" %}
  ```md
  ---
  title: Adding sidebar to the page
  sidebar: ../sidebars.yaml
  ---
  ```
{% /tab  %}
{% /tabs %}

If you define multiple sidebars in the root `sidebars.yaml` file, the portal displays the first available sidebar from that file when you add its path to the front matter. For this, we recommend you use the sidebar name in the front matter to precisely control which sidebar to show.

{% admonition type="info" %}
Front matter has priority over other configuration. If a page is listed in a `sidebars.yaml` file and has a different sidebar set in the front matter, the one from the front matter will be displayed.
{% /admonition %}

**Linting API definitions from the API registry**

We added support for linting API definitions from the API registry. To use this feature, either:

- Add the `--lint-registry-definitions` option to the portal build command, or
- Set up the `REDOCLY_LINT_REGISTRY_DEFINITIONS` environment variable.

**Developer portal changelog**
Read the entire list of fixes and enhancements on the [Developer portal changelog](../docs-legacy/developer-portal/changelog.md).

![Developer portal features](./images/devportal.png '#width=500px;')

***

## OpenAPI CLI and Redoc

**New separator option for `split` command**

We added a `--separator` option to the `split` command. You can use it to change the separator character instead of whitespace in file names. The default is `_` , which means that after splitting, path file names look like this: "user_login.yaml", "user_logout", etc.

**Renaming the configuration file**

You can now name the Redocly config file either `.redocly.yaml` (deprecated) or `redocly.yaml`.

**OpenAPI CLI changelog**
Read more about OpenAPI CLI fixes and enhancements by visiting the [OpenAPI CLI changelog](../docs/cli/changelog).

**Redoc changelog**

To find out more about Redoc CLI fixes and enhancements, see the [Redoc changelog](https://github.com/Redocly/redoc/blob/master/CHANGELOG.md).

***

## Documentation updates

The technical writing team has been busy adding content for new features and updating existing content to ensure we are filling in the gaps between our product features and docs, and assisting our support team with documenting the frequently asked questions around our products.

Last month, we added:
- [Redocly configuration migration guide](../docs-legacy/api-registry/guides/migration-guide-config-file.md)
- [Mock server quickstart](../docs-legacy/api-registry/guides/mock-server-quickstart.md)
- [Manage your APIs with the API catalog](../docs-legacy/developer-portal/guides/api-catalog.md)
- [Integrate API reference docs guide](../docs-legacy/developer-portal/guides/reference-docs-integration.md)

We also updated a few other topics:
- Updated the [role privileges](../docs-legacy/settings/role-privileges.md) topic with information about the `read` role privilege.
- Added a new `Troubleshooting` section to the sidebar to house migration guides for our products.
- Updated all instances of `.redocly.yaml` (deprecated) to a more generic "Redocly configuration file" for consistency.

**Updates to our open source docs**

Along with our core documentation, our new open source technical writer also made some tremendous progress with the OpenAPI CLI docs.

- Created a new [openapi-starter guide](../docs/cli/openapi-starter).
- Updated the [quickstart](../docs/cli/quickstart) guide with relevant examples.
- Edited the [introduction](../docs/cli) page.
- Simplified the [commands](../docs/cli/commands) page, and
- Simplified the [installation](../docs/cli/installation) page.

***

## Google Season of Docs 2022

The 2022 Google Season of Docs is upon us! Motivated by our last year's [success](../pages/gsod/casestudy.md), we are hoping to participate in this year's program and work with technical writers keen on contributing to our open source projects.

To find out how you can contribute, and discuss ideas, read our [project proposal](../pages/gsod/gsod-2022.md).
