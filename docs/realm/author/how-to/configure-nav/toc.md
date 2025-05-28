# Configure navigation on the TOC (table of contents)

Every markdown page includes a table of contents (TOC) that is automatically generated based on the headings.
You can configure navigation on the TOC by updating the title for the TOC and setting the depth.

## Update depth

You can update the title and set the depth for the TOC for all or select pages of your portal.

To set the depth of the TOC:

1. If you don't already have a `redocly.yaml` file, create one and add it to the root of your project.
2. Add the `toc` object, under the `markdown` object. For example:
   ```yaml
   markdown:
     toc:
   ```
3. Add the `depth` option with the value for how many levels you want included in the TOC.
   For example, the following configuration sets the depth to include only level 2 headings:
   ```yaml
   markdown:
     toc:
       depth: 2
   ```

## Update title

The TOC header text can be customized using translation keys for localization. The translation key for the TOC header is `toc.header` (default value: "On this page").

For more information about translation keys, refer to the [Translation Keys Reference](../../reference/translation-keys.md).
