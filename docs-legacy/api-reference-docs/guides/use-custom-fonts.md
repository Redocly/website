---
seo:
  title: Use custom fonts in your API docs
---

# Import custom fonts in API docs

You can change the default font in your API documentation to customize its appearance. To prevent the default font settings from overriding your changes, you must import the custom font into your API docs HTML template.

Custom fonts are supported in API docs regardless of how you're hosting them (on-premise or in Workflows).

## Prerequisites

- [On-premise configuration](#configure-custom-fonts-in-api-docs): Access to Redocly configuration files

- [Workflows configuration](#configure-custom-fonts-in-workflows): Redocly Workflows user account with access to the API version **Settings > Features** page and/or access to Redocly configuration files

## Configure custom fonts in API docs

1. **Change the font in the configuration file.**

In your Redocly configuration file, find or create the `theme` object in `openapi` section.

To use the same font family for all text in your docs, change the value of the `typography.fontFamily` key in the `theme` section.

**Example Redocly configuration file**

```yaml
apis:
  default:
    root: openapi/example.yaml
theme:
  openapi:
    htmlTemplate: ./web/index.html
    theme:
      sidebar:
        backgroundColor: '#333333'
      typography:
        fontFamily: 'Roboto, sans-serif'
```

For further customization, you can change the font family used in specific textual elements (like heading levels and inline code).
Consult the [full API docs theming schema](../configuration/theming.md) for details on which typography-related options are supported.

The following example sets a custom font for inline code, and another custom font for headings.

```yaml
apis:
  default:
    root: openapi/example.yaml
theme:
  openapi:
    htmlTemplate: ./web/index.html
    theme:
      sidebar:
        backgroundColor: '#333333'
      typography:
        code:
          fontFamily: 'Ubuntu Mono, monospace'
          fontSize: '10px'
        headings:
          fontFamily: 'Roboto, sans-serif'
          fontWeight: '800'
```

Save your changes to the configuration file.

2. **Import the font into the HTML template.**

After specifying one or more custom fonts in the Redocly configuration file, you must import all those fonts into your API docs HTML template.

Import the custom font CSS in the `<style>` element of the HTML template `<head>`. Note that you can't import font files (local or remote) - you can only link to web fonts in your HTML template.

**Example HTML template**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ACME API Reference Documentation</title>
    <!-- needed for adaptive design -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--
    ReDoc uses font options from the parent element
    So override default browser styles
    -->
    <style>
      @import url('https://fonts.googleapis.com/css?family=Roboto:400,800');
      @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap');

      body {
        margin: 0;
        padding: 0;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 14px;
        color: #333;
      }
    </style>
    {{{redocHead}}}
  </head>
  <body>
    {{{redocBody}}}
  </body>
</html>
```

Save your changes to the HTML template file.

3. **Confirm that the custom font is loaded and used.**

After building your API documentation, check if the custom font is used in all textual elements for which you configured it.

## Configure custom fonts in Workflows

If your API docs are hosted in Redocly Workflows, you can use the **Live configuration** editor to change the font family used in specific textual elements.

The procedure is similar to setting up custom fonts in on-premise API docs. You must first add your custom typography settings to the configuration file, then import the font into the HTML template.

1. Log into your Workflows organization. On the **API registry** page, select the API version for which you want to configure a custom font.

2. On the **Settings** page, select **Features** in the sidebar. Then, select the **Configuration** button to access the Live configuration editor.

3. In the **Adjust API reference theme and settings** window that opens, find or add the `theme` object. Create or modify typography values in this object according to the [full API docs theming schema](../configuration/theming.md).

The following example sets a custom font family and size for code:

```yaml
theme:
  openapi:
    theme:
      typography:
        code:
          fontFamily: 'Ubuntu Mono, monospace'
          fontSize: '10px'
```

4. After adding your custom typography settings in the editor window, select **Save** to return to the **Features** page. From there, navigate to the **Template** page.

5. On the **Template** page, select **Customize page template** (if it's not already selected). This lets you change the contents of the **HTML template** editor.

6. In the **HTML template** editor, import the custom font CSS in the `<style>` element of the HTML template `<head>`. Note that you can't import font files (local or remote) - you can only link to web fonts in your HTML template.

The following example imports two custom fonts:

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      @import url('https://fonts.googleapis.com/css?family=Roboto:400,800');
      @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap');
    </style>
  </head>
  <body></body>
</html>
```

7. Select **Save** at the bottom of the **Features** page to confirm your changes. This triggers a new build.

8. When the build is successfully completed and your API documentation published, check the relevant textual elements to confirm that your font changes have been applied.
