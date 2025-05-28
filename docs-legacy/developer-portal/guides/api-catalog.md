---
excludeFromSearch: true
---

# Manage your APIs with the API catalog

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

The API catalog feature helps you integrate your APIs and files from Redocly API registry into your portal.
It also makes it easier to manage multiple versions of APIs in the portal.

The integration flow works as follows:

1. Upload files to an API in the registry.
2. Enable your portal to use those files by linking them to the portal configuration.
3. The portal automatically pulls the files into the project. You can then link to the files from other pages in your portal; for example, insert images into Markdown files or use OpenAPI definitions in portal components.


## Prerequisites

To use the API catalog in your portal, you need the following:

- A Redocly Workflows account, with permissions to add new APIs to the registry. Read more about [roles and permissions](/docs-legacy/people/roles-permissions.md).

- A Redocly Developer portal project set up and [connected to Workflows](/docs-legacy/developer-portal/connect-developer-portal.md), with full access to configuration files.


## Step 1: Add APIs and files to the registry

In this step, add one or more APIs and any files you want to integrate into the portal to the API registry.
Files can be anything: from Markdown pages and images to Redocly-specific configuration files like `redocly.yaml` or `permissions.rbac.yaml`.

You can use any API source except *URL* to add your APIs to the registry. Read more about [API version sources](/docs-legacy/workflows/sources/index.md).

In this guide, we're referring to GitHub as the recommended source.

Follow the [file upload guide](/docs-legacy/api-registry/guides/add-registry-assets.md) to upload files to the registry.


## Step 2: Configure the API catalog in the portal

In the previous step, you added APIs to the registry and uploaded some files to one or more API versions.

In this step, collect file links for each version you want to integrate into the portal, and add them to the API catalog.

### Copy files links

1. In the API registry, find and select the API you want to integrate. APIs in the registry are distinguished by their name and version.

2. On the selected API *Overview* page, find the branch that contains the files you want to use in the portal. This is either your production (**primary**) branch, or one of the preview branches.

3. Select **Files link** for the branch and save the copied link for later use.
The link is in the format `https://api.redoc.ly/registry/assets/your-organization-ID/api-name/api-version/`.
If you select a non-primary branch, the link includes the selected branch: `https://api.redoc.ly/registry/assets/your-organization-ID/api-name/api-version/?branch=branch-name`

Repeat the procedure for every API version you want to integrate.


### Add links to API catalog file

1. In the root of your portal project, create a file called `catalog.yaml`.

The structure of the `catalog.yaml` file should be as follows:

```yaml
# List of APIs from the registry to integrate into the portal.

apiCatalog:
  - title: # Optional custom title to use for the API. If omitted, the API name from the registry is used by default.
    defaultVersion: # Optional indicator specifying which of the listed 'versions' to treat as the default. If omitted, the last listed version is treated as the default.
    disableAutoSidebar: # Optional parameter that prevents automatically creating the default 'sidebars.yaml' file. When set, users must manually add files to their existing 'sidebars.yaml' file or include a 'sidebars.yaml' file alongside their registry files.
    pathPrefix: # Optional parameter to specify where to download files. When set, it replaces the automatically created 'api-name' folder. The 'api-version' subfolder(s) will still be created for non-default versions in the specified path prefix.
    versions: # One or more versions of the API to integrate.
      - link: # Must be a 'Files link' for a specific API version in the registry.
```

2. Add the file links you've copied to the `catalog.yaml` file.

**Example catalog.yaml**
{% tabs %}
{% tab label="Single version" %}
```yaml
apiCatalog:
  - title: ACME
    disableAutoSidebar: true
    versions:
      - link: https://api.redoc.ly/registry/assets/org/acme/v1/
```
{% /tab  %}
{% tab label="Multiple versions" %}
```yaml
apiCatalog:
  - title: Redocly API
    defaultVersion: v1
    pathPrefix: /apis/starter
    versions:
      - link: https://api.redoc.ly/registry/assets/org/redocly/v1/
      - link: https://api.redoc.ly/registry/assets/org/redocly/v2/
```
{% /tab  %}
{% /tabs  %}
3. Save the changes to the `catalog.yaml` file and start the portal build.

### Import files into the portal

During the portal build, files are automatically downloaded to your portal project.
A `.gitignore` file containing the files is automatically created.
To update your files, **do not commit or push them directly** from the portal project.
Instead, upload new versions of files through the registry.
When a file is modified in the registry, the portal detects it and automatically triggers a new build.

For the default version, files are downloaded into the `api-name` folder.
For all other versions, files are downloaded into their respective `api-name/api-version` subfolders.
Use the optional `pathPrefix` parameter in `catalog.yaml` to set any other path to replace the `api-name`.

In our examples above:

- files for ACME would be downloaded into `acme`, because there's only one version, which is the default, and because we didn't set a custom path prefix.
- files for Redocly API v1 (default) would be downloaded into `/apis/starter/redocly`, but files for v2 would be downloaded into `/apis/starter/redocly/v2`.

For the default version, all files are downloaded, including Markdown files, images, `sidebars.yaml` (if it exists), and any other configuration files.
For non-default versions, only the API definition file is downloaded.

Markdown and MDX files are automatically turned into pages in the portal, and you can link to them from any other page.
Similarly, you can include other files (like images) in your existing portal pages.


### Use the Redocly configuration file

If a [Redocly configuration file](/docs/cli/configuration) exists among the files for the default version and has settings in the `theme.openapi` section, the portal uses those settings for all versions of an API (default and non-default).

The `theme.openapi` section supports all [Reference configuration options](/docs-legacy/api-reference-docs/configuration/functionality.md) plus two special options for controlling access to content:

- `excludeFromSearch` - If set to true, the API documentation is excluded from search results and the sitemap. Default value is false.
- `permission` - Defines the permissions using [role-based access controls](../configuration/rbac.md).

**Example Redocly configuration file**

```yaml
apis:
  acme@v1:
    root: ./openapi/acme-v1.yaml
    theme:
      openapi:
        pagination: section
        showConsole: true
        permission: 'read:internal-docs'
        excludeFromSearch: true
```


### Add files to portal sidebar

If a `sidebars.yaml` file doesn't exist for the default version, it is automatically generated.
This default `sidebars.yaml` contains all files from your registry link.
The following example shows the contents of the automatically generated `sidebars.yaml` file.

```yaml
- page: ./*
```

To skip creating the default `sidebars.yaml` file for an API, set `disableAutoSidebar: true` on the API level in your `catalog.yaml`.
In this case, you must add the files to a `sidebars.yaml` file manually, or include a `sidebars.yaml` file in the registry.


## Step 3: Create API catalog page

By default, the portal does not automatically create any catalog page to display your integrated APIs.
Redocly provides a few built-in catalog pages in the future.
For now, you can use helpers to build it.

{% admonition type="warning" %}
The `useCatalog` helper is experimental, so it may change. We are extending it to support filtering.
{% /admonition %}

Here is an example catalog page called `apis.mdx`:
{% tabs %}
{% tab label="apis.mdx" %}
```mdx
---
title: API Catalog
---

import { Catalog } from './_components/Catalog';

<Catalog />
```
{% /tab  %}
{% tab label="_components/Catalog.tsx" %}
```tsx
import * as React from 'react';

import {
  useCatalog,
  FlexSection,
  Flex,
  WideTile,
  SectionHeader,
  LoadingAnimation,
} from '@redocly/developer-portal/ui';

export function Catalog() {
  const { apis, loadingRbac } = useCatalog({ offset: 0, limit: 10 });

  if (!apis.length) {
    return "You don't have access to any API";
  }

  return (
    <>
      <Flex flexDirection="row" alignItems="baseline">
        <SectionHeader> API Catalog</SectionHeader>
        {loadingRbac ? <LoadingAnimation size={20} /> : null}
      </Flex>
      <FlexSection justifyContent="space-around" flexWrap="wrap">
        {apis.map(api => (
          <WideTile to={api.link} header={api.title || api.link}>
            Tags: {api.defaultVersion.metadata?.tags.map(tag => <span> {tag} </span>)}
          </WideTile>
        ))}
      </FlexSection>
    </>
  );
}
```
{% /tab  %}
{% /tabs  %}
Notice that `metadata` from `features.catalog` is available in the metadata returned from catalog.
