---
seo:
  title: Redocly Developer portal 1.1.0-beta.78 migration guide
excludeFromSearch: true

---

# Migration guide: Developer portal 1.1.0-beta.78

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}


> Developer portal 1.1.0-beta.78 introduces changes
> to sidebar configuration in the portal.
> This migration guide provides instructions for adjusting
> configuration files after upgrading your portal.


## Sidebar configuration

Starting from the `1.1.0-beta.78` version, the portal supports a new approach to sidebar configuration.
We encourage all portal users to switch to this new configuration.
Although still supported, the old configuration is deprecated, which means it does not receive updates or bug fixes anymore.

The main differences between old and new sidebar configuration are:


- New configuration supports multiple `sidebars.yaml` files in the portal project. Previously, only one such file was allowed per project.
- Each sidebar must be configured in its own `sidebars.yaml` file. Before, you had to configure all sidebars in one file.
- The `sidebars.yaml` file no longer requires the `sidebarName` top-level key before listing groups and pages. Previously, this key was required for every configured sidebar.


After upgrading your portal to `1.1.0-beta.78`, you can start using [the new configuration](#use-the-new-sidebar-configuration) **(recommended)**, or keep [the legacy configuration](#use-the-legacy-sidebar-configuration).
Note that you may receive warning messages in portal build logs if you decide to keep the legacy configuration.


### Use the new sidebar configuration

To start using the new sidebar configuration, you must change your existing `sidebars.yaml` file to conform to the new configuration syntax.

The following changes are required for single sidebar configuration:


- Remove the top-level `sidebarName` key from the configuration file.
- Adjust the indentation of all sidebar elements one level up.


Compare these examples to understand the changes:

{% tabs %}
{% tab label="Old sidebar" %}
```yaml Old sidebar
firstSidebar:
  - group: Main group with drilldown style
    menuStyle: drilldown
    icon: ./images/custom-icon.png
    sublabel: Page group with drilldown style
    pages:
      - page: developer-portal/commands.md
        external: true
      - group: Group level 1
        menuStyle: drilldown
        pages:
          - page: developer-portal/old/component-guide.md
          - page: developer-portal/advanced/components.md
            separatorLine: true
          - page: developer-portal/custom/guides/create-components.md
```
{% /tab  %}
{% tab label="New sidebar" %}
```yaml New sidebar
- group: Main group with drilldown style
  menuStyle: drilldown
  icon: ./images/custom-icon.png
  sublabel: Page group with drilldown style
  pages:
    - page: developer-portal/commands.md
      external: true
    - group: Group level 1
      menuStyle: drilldown
      pages:
        - page: developer-portal/old/component-guide.md
        - page: developer-portal/advanced/components.md
          separatorLine: true
        - page: developer-portal/custom/guides/create-components.md
```
{% /tab  %}
{% /tabs %}

If your existing `sidebars.yaml` file has multiple sidebars defined, you must create a separate `sidebars.yaml` file for each of those sidebars.
Treat one of those files as the main configuration file and keep it in the root of your portal project.
You must place the other `sidebars.yaml` files into different folders.

It's recommended to place each `sidebars.yaml` file into the folder that contains pages listed in the file.
File paths for the pages must be relative to where the `sidebars.yaml` file is placed.
If a page is already included in one file, don't include it in any other `sidebars.yaml` files.

The following example shows how to split the legacy `sidebars.yaml` file into two separate files to configure two sidebars for the portal.

The main `sidebars.yaml` file is placed into the root of the project, and the second `sidebars.yaml` file into the `developer-portal/demo` folder.

{% tabs %}
{% tab label="Old sidebar" %}
```yaml
firstSidebar:
  - group: Main group with drilldown style
    menuStyle: drilldown
    icon: ./images/custom-icon.png
    sublabel: Page group with drilldown style
    pages:
      - page: developer-portal/commands.md
        external: true
      - group: Group level 1
        menuStyle: drilldown
        pages:
          - page: developer-portal/old/component-guide.md
          - page: developer-portal/advanced/components.md
            separatorLine: true
          - page: developer-portal/custom/guides/create-components.md
secondSidebar:
  - label: Example page
    page: developer-portal/demo/example-page.md
    group: Simple group with default style
    expanded: false
    pages:
      - page: developer-portal/demo/quickstart.md
        label: Get started with the portal
      - page: developer-portal/demo/setup.md
      - page: developer-portal/demo/examples/readme.md
```
{% /tab  %}
{% tab label="New sidebar - main file" %}
```yaml
- group: Main group with drilldown style
  menuStyle: drilldown
  icon: ./images/custom-icon.png
  sublabel: Page group with drilldown style
  pages:
    - page: commands.md
      external: true
    - group: Group level 1
      menuStyle: drilldown
      pages:
        - page: old/component-guide.md
        - page: advanced/components.md
          separatorLine: true
        - page: custom/guides/create-components.md
```
{% /tab  %}
{% tab label=" New sidebar - second file" %}
```yaml
- label: Example page
  page: example-page.md
  group: Simple group with default style
  expanded: false
  pages:
    - page: quickstart.md
      label: Get started with the portal
    - page: setup.md
    - page: examples/readme.md
```
{% /tab  %}
{% /tabs  %}
Your developer portal displays one of the configured sidebars contextually, based on the page that's requested.
If a page is not included in any of the sidebars, the portal displays it without the sidebar.


### Use the legacy sidebar configuration

To configure a sidebar for your portal using the legacy configuration, you must define a custom `sidebarName` for it in the `sidebars.yaml` configuration file.
You must place the configuration file into the root of your portal project.
The sidebar name is not displayed in the portal, and is only used as the unique identifier for the sidebar.

Under the `sidebarName` key in the `sidebars.yaml` file, add one or more elements (groups, pages, separators) in the order in which you want to show them in your portal.
The order of options (such as `label,` `external,` `expanded`) assigned to sidebar elements in the file doesn't affect their display order in the portal.

**Example `sidebars.yaml` file with a single configured sidebar**


```yaml
sidebarName:
  - group: Expanded group
    expanded: true
    pages:
      - label: Overview ✅
        page: developer-portal/overview.md
      - separator: Navigation
      - label: Top Nav
        page: developer-portal/top-navigation.md
        external: true
      - page: developer-portal/footer-navigation.md
        label: Footer Nav
      - label: Sidebar Nav
        page: developer-portal/sidebar-nav.md
  - group: Closed group
    expanded: false
    pages:
      - group: Nested Group with duplicate page
        expanded: false
        pages:
          - page: reference.page.yaml
            label: API docs example
          - label: Sidebar Nav - Duplicate
            page: developer-portal/sidebar-nav.md
      - label: Quickstart
        page: developer-portal/quickstart.md
        separatorLine: true
      - label: Using Arguments
        page: developer-portal/arguments.md
```


To configure multiple sidebars for your portal using the legacy configuration, define them in the `sidebars.yaml` configuration file.
Each sidebar must have its own, unique top-level `sidebarName` key in the configuration file.
If a page is already included in one sidebar, don't include it in any other sidebars at the same time.

**Example `sidebars.yaml` file with two configured sidebars**


```yaml
firstSidebar:
  - group: Main group with drilldown style
    menuStyle: drilldown
    icon: ./images/custom-icon.png
    sublabel: Page group with drilldown style
    pages:
      - page: developer-portal/commands.md
        external: true
      - group: Group level 1
        menuStyle: drilldown
        pages:
          - page: developer-portal/old/component-guide.md
          - page: developer-portal/advanced/components.md
            separatorLine: true
          - page: developer-portal/custom/guides/create-components.md
secondSidebar:
  - label: Example page
    page: developer-portal/example-page.md
    group: Simple group with default style
    expanded: false
    pages:
      - page: developer-portal/quickstart.md
        label: Get started with the portal
      - page: developer-portal/setup.md
      - page: developer-portal/examples/readme.md
```


In the preceding example, the first sidebar is identified by the `firstSidebar` key, and the second by `secondSidebar`.
Your developer portal displays one of the configured sidebars contextually, based on the page that's requested.
If a page is not included in any of the sidebars, the portal displays it without the sidebar.
