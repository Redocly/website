# Configure navigation on the sidebar

The sidebar is automatically generated based on your project's file structure, with `index.md` file as the first item, and the rest following the folder and file names in the [natural sort order](../../concepts/navigation.md#sidebar-menu).
However, you can customize your project's navigation by configuring the order and titles of items in your sidebar using the `sidebars.yaml` file.
You can also hide the sidebar, add multiple sidebars, and add the sidebar for pages not listed in a `sidebars.yaml` file.

## Customize link titles and the order of links in the sidebar

To customize the link titles and order of links in your sidebar:

1. Create a `sidebars.yaml` file and add it to the root of your project.\
    You can add prefixes to sidebar file names to make them more distinct, for example: `installation.sidebars.yaml`.
    Sidebar files are valid as long as they end in "sidebars.yaml".
2. Add the `page` option with the value of the file path or the `href` option with the value for the URL for the item you are including.
   For example, the following configuration adds a sidebar with a link to the Markdown page `index.md` with the first heading on that page as link text and a link to `http://example.com` with the URL as the link text:
   ```yaml {% title="sidebars.yaml" %}
   - page: index.md
   - href: http://example.com
   ```
3. (Optional): Add the following options:
   - `label`: This option is the link text that appears on the sidebar for the page.
     If you don't include it, the first heading of the Markdown page will be used for the `page` option, or the value for the `href` option will be used.
   - `labelTranslationKey`: This option is used if you are translating the link text into a different language.
     See [Localize labels using translation keys](../../how-to/config-l10n/localize-labels.md#sidebars) for more information.
   - `external`: This option causes a new tab to open when the user clicks the item in the sidebar.
     This option is `false` by default.
     For example, the following configuration adds a sidebar with a link to the Markdown page `index.md` with "Introduction" link text and `sidebar.intro` translation key, and a link to the Markdown page `quickstart.md` with "Quickstart" link text that opens in a separate tab when selected:
     ```yaml {% title="sidebars.yaml" %}
     - page: index.md
       label: Introduction
       labelTranslationKey: sidebar.intro
     - page: quickstart.md
       label: Quickstart
       external: true
     ```

## Compose a single sidebar from multiple `sidebars.yaml` files

Another way to manage the sidebar in your project is to have a single main sidebar composed of multiple `sidebars.yaml` files.
This method is useful when you want to manage navigation by sections, or when some content comes from a remote content source.

To compose a sidebar from multiple `sidebars.yaml` files:

1. In your project's documentation folders, create one `sidebars.yaml` file per folder, as in the following example:
    ```treeview {% title="Sample file structure with sidebars.yaml files in each product folder" %}
    ├── get-started/
    │   ├── index.md
    │   ├── install.md
    │   └── sidebars.yaml
    ├── configuration/
    │   ├── index.md
    │   ├── interface.md
    │   ├── connectivity.md
    │   └── sidebars.yaml
    ├── museum-API/
    │   ├── index.md
    │   ├── museum.yaml
    │   └── museum.sidebars.yaml
    ├── payments-API/
    │   ├── index.md
    │   ├── payments.yaml
    │   └── payments.sidebars.yaml
    ├── index.md
    ├── redocly.yaml
    └── sidebars.yaml
    ```
2. In each `sidebars.yaml` file in your content folders, add page entries to documentation and API description files, as in the following example:
   ```yaml {% title="museum.sidebars.yaml" %}
   - page: index.md
     label: Get started
   - page: museum.yaml
     label: Museum API
   ```
3. In the `sidebars.yaml` file at the root of your project, for each component `sidebars.yaml` file, add a `$ref:` key with the value of the file path to that `sidebars.yaml` file, as in the following example:
    ```yaml {% title="sidebars.yaml" %}
    - page: index.md
      label: Main page
    - $ref: get-started/sidebars.yaml
    - $ref: configuration/sidebars.yaml
    - $ref: museum-api/museum.sidebars.yaml
    - $ref: payments-api/payments.sidebars.yaml
    ```
After you build your project, the root `sidebars.yaml` file combines all referenced pages and sidebar files into a single sidebar menu.
This sidebar appears on all the pages it links to.

## Add multiple sidebars

In larger projects, having a single sidebar with links to every content page can reduce the usability of your project.
To prevent having an overly long sidebar, you can have a sidebar for each collection of content in your project, and the sidebar on the home page of your project with links to each landing page for the different sections.
When users select an item on the home page sidebar, the page opens and updates the sidebar to reflect the sidebar for that collection.

To add multiple sidebars to your project:

1. Create a folder for each collection of content, as in the following example:
   ```treeview {% title="Sample file structure with multiple content collections" %}
    ├── get-started/
    │   ├── index.md
    │   └── install.md
    ├── configuration/
    │   ├── index.md
    │   ├── interface.md
    │   └── connectivity.md
    ├── museum-API/
    │   ├── index.md
    │   └── museum.yaml
    ├── payments-API/
    │   ├── index.md
    │   └── payments.yaml
    ├── index.md
    ├── redocly.yaml
    └── sidebars.yaml
   ```
2. In each content folder, add a `sidebars.yaml` file, as in the following example:
   ```treeview {% title="Sample file structure with sidebars.yaml files in each product folder" %}
    ├── get-started/
    │   ├── index.md
    │   ├── install.md
    │   └── sidebars.yaml
    ├── configuration/
    │   ├── index.md
    │   ├── interface.md
    │   ├── connectivity.md
    │   └── sidebars.yaml
    ├── museum-API/
    │   ├── index.md
    │   ├── museum.yaml
    │   └── museum.sidebars.yaml
    ├── payments-API/
    │   ├── index.md
    │   ├── payments.yaml
    │   └── payments.sidebars.yaml
    ├── index.md
    ├── redocly.yaml
    └── sidebars.yaml
   ```
3. In each `sidebars.yaml` file in your content folders, add page entries to documentation and API description files, as in the following example:
   ```yaml {% title="museum.sidebars.yaml" %}
   - page: index.md
     label: Get started
   - page: museum.yaml
     label: Museum API
   ```
4. In the `sidebars.yaml` file at the root of your project, add page entries for the landing pages in each content folder, as in the following example:
   ```yaml {% title="sidebars.yaml" %}
   - page: index.md
     label: Home
   - page: about.md
     label: About us
   - page: ./get-started/index.md
     label: Get started
   - page: ./configuration/index.md
     label: Configuration
   - page: ./museum-API/index.md
     label: Museum
   - page: ./payments-API/index.md
     label: Payments
   ```

This configuration adds a sidebar navigation menu for pages in the root folder and items that link to landing pages inside each content folder.

## Add a sidebar to a single page

Add a sidebar to a Markdown or React page by adding a **relative path** to a `sidebars.yaml` file in the page's front matter.
This configuration sets a page's sidebar even if that page isn't listed in the `sidebars.yaml` file.

The following example uses the front matter to add a sidebar to a **Markdown page** using front matter:

```yaml {% title="sidebar-example.md" %}
---
sidebar: ./sidebars.yaml
---

# Example page
```

The following example uses the front matter to add a sidebar to a **React page** using front matter:

```tsx {% title="sidebar-example.page.tsx" %}
import React from 'react';

export const frontmatter = {
  sidebar: '../sidebars.yaml',
};
```

## Related how-tos

* Hide the sidebar using the [sidebar configuration](../../../config/sidebar.md).
* Check the [sidebar reference](../../reference/sidebars.md) for all configuration options and more examples.
* Control group-level permissions using [RBAC in the sidebar](../../..//setup/how-to/rbac/links-and-groups-permissions.md#in-the-sidebar).
