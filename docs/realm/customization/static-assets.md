# Static assets

You may want to host file types other than Markdown, YAML or `.tsx` in your project.
For example, images, PDF documents, or scripts - and reference them as additional resources in your project pages.

For this purpose, a special folder called `static` is supported.
This folder must be in the root of the project, and its name must be `static` without any additional characters.

The `static` folder can contain any number of sub-folders, so you can organize assets by type or any other desired criteria.

## Link to static assets

All files placed into the `static` folder are served directly from the project root.
This allows you to dynamically reference them with absolute links.
For example, if you had a file `./static/image.png`, you would link to it with `https://your-project.example.com/image.png`.

Another example use case related to SEO is if you would like to store `robots.txt` in site root to make it available for different site crawlers, like `https://your-project.example.com/robots.txt`.

## Protect static assets

If your project uses Role-Based Access Control (RBAC), you can also protect files in the `static` folder from unauthorized access.

To apply RBAC to static assets, use the `rbac` configuration in your `redocly.yaml` file.
Static assets can be protected by specifying access rules for their paths that start with `static`.
For example, to make all content publicly available, except static assets, use the following configuration:

```yaml
rbac:
  content:
    '**':
      anonymous: read
      authenticated: read
    'static/**':
      authenticated: read
```

## Ignore static folders and files

In some cases, you may want to exclude specific pages from project builds without removing the source files from your project.
You can exclude specific pages from project builds by adding the relative path or glob pattern of the file or entire folder to the `ignore` configuration option in your `redocly.yaml` file.

To prevent broken links or potential build failures, make sure to remove any entries for the ignored page from your `sidebars.yaml` file.
If other Markdown or TypeScript pages have links pointing to the excluded page, those links should be modified or removed prior to building the project.

{% admonition type="info" %}
The `README.md` file is automatically ignored when located in the project's root directory.
{% /admonition %}
