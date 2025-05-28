# Reuse content

If you have content you want to reuse in other parts of your project, otherwise known as single sourcing, you can store the content in a `_partials` folder and use the Markdoc partials tag to render it anywhere you like.
You can use a custom name for the folder, but it must be configured in your `redocly.yaml` file.

## Before you begin

Make sure you have the following before you begin:

- A Realm project - either locally or in Reunite
- (Optional) a `redocly.yaml` file in the root of your project

## Create partial content folder

The first step in setting up content reuse in your project is to place the content you want to reuse in a `_partials` folder.
Partial files do not need any particular front matter nor do they require special naming conventions.
If you have images in your file, add an `images` folder to the `_partials` folder to store the images.

To reuse content it must be placed in a folder named `_partials`, unless you configure a different name in the `redocly.yaml` file.

### Configure custom folder name

If you want to use a different name for your reused content other than the default value, `_partials`, add the following configuration with the preferred folder name to your `redocly.yaml` file:

```yaml
markdown:
  partialsFolders:
    - snippets
```

In the example, partials can now be added to folders named `snippets`.
You can add multiple names to the entry, if you have multiple folders you want to use for storing partials.
After adding the `partialsFolders` configuration to your `redocly.yaml` file, the default `_partials` folder name will no long work unless added to the configuration.

## Reference partial content

After you have added the content you want to reuse to a `_partials` folder, you can then reference the content in any Markdown files you have in your project to insert it.

Use the following Markdoc tag syntax to pull partial content into your Markdown documents:

```markdoc {% process=false %}

{% partial file="_partials/my-partial.md" /%}

```

The `file` attribute should include the file path to the file in the `_partials` folder from the file where you are inserting the content.

## Related how-tos

- Checkout [Add links](./links.md) for information on how to configure links in your Realm project.
- To learn more about adding redirects to your project, see [Add redirects](./add-redirects.md).

## Resources

- Learn more about Markdoc and how you can use it to add interactive elements to your Markdown documents in the [Markdoc overview for technical writers](https://redocly.com/learn/markdoc).
- Explore the different configuration options available in the `redocly.yaml` file in the [Configure Redocly](../../config/index.md) reference documentation.
