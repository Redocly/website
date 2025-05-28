---
toc: hide
---

# Configure navigation elements

{% $env.PUBLIC_PORTAL_NAME %} offers multiple ways to adapt your project's navigation to fit your needs.

You can customize your project's navigation by configuring the following navigation elements:

- [Sidebar](sidebar.md): You can configure the order and titles of items in your sidebar and add multiple sidebars.
- [Navbar](navbar.md): You can add links, icons and, drop-down lists to the navbar.
  You can also link to sidebars.
- [TOC (table of contents)](toc.md): You can set the depth and alter the title text for the TOC.
- [Footer](footer.md): You can add icons, copyright info, and links to the footer.
- [Navigation buttons](navigation-buttons.md): You can customize the button text.

{% admonition type="info" name="Navigation elements" %}
See the [overview of navigation elements](../../concepts/navigation.md) to learn more about each element.
{% /admonition %}


## Before you begin

Make sure you have the following before you begin:

- [latest version of {% $env.PUBLIC_PORTAL_NAME %}](../../../get-started/index.md)

- a `redocly.yaml` file in the root of your project

## Include entire directory

If you don't want to list all the content in a directory in the `sidebars.yaml` or `redocly.yaml` file,
but you want it all to be included in the sidebar, navbar, or footer,
you can use a specific syntax to include it.

The following is an example of a `sidebars.yaml` file that uses special syntax to include all the files in the current directory:

```yaml
- group: Build themes
  items:
    - directory: ./
```

This syntax is easier to configure, but offers less control over the order of pages which are ordered alphabetically by filename.

## Configure by page

You can configure the following navigation elements for individual pages in the front matter of Markdown files:

- Navigation buttons
  Sample configuration in front matter:
  ```yaml
  ---
  navigation:
    nextButton:
      text: Go to
    previousButton:
      text: Go back to
  ---
  ```
- TOC (table of contents)
  Sample configuration in front matter:
  ```yaml
  ---
  markdown:
    toc:
      header: Page headings
      depth: 2
  ---
  ```

## Hide nav elements

You can hide the footer, navbar, TOC (table of contents), sidebar, and navigation buttons for all or select pages of your project.
To hide these navigation elements, add the configuration to either:

- your `redocly.yaml` file to hide the element for all pages
- the front matter of select pages to hide the element for those pages

Use the following configurations to hide navigation elements:

- Add the following configuration to hide the footer:
  ```yaml
  footer:
    hide: true
  ```
- Add the following configuration to hide the navbar:
  ```yaml
  navbar:
    hide: true
  ```
- Add the following configuration to hide the TOC (table of contents):
  ```yaml
  markdown:
    toc:
      header: Page headings
      depth: 2
  ```
- Add the following configuration to hide the sidebar:
  ```yaml
  sidebar:
    hide: true
  ```
- Add the following configuration to hide the navigation buttons:
  ```yaml
  navigation:
    nextButton:
      hide: true
    previousButton:
      hide: true
  ```

## Resources

- The [Overview of navigation elements](../../concepts/navigation.md) has more information about each element.
- Visit the [sidebar configuration reference](../../reference/sidebars.md) for details and examples on configuring sidebars.

