# Add redirects

Redocly supports two ways of configuring redirects:

- In the `redocly.yaml` [config file](#configure-redirects-in-global-config-file), specifying source and destination.
  This approach is useful for maintaining lists of redirects after site or section migrations.
- In [a separate file](#manage-the-redirects-list-in-a-separate-file) of an individual page.
  Place the redirects in a separate YAML file (for example, `redirects.yaml`) file to make long lists of redirects more manageable.

Where redirects are configured in both locations, the front matter configuration takes priority.

## Configure redirects in global config file

In `redocly.yaml`, add a `redirects` section and add entries within it for the pages that should be redirected.
The following example shows two existing product pages being redirected to a new one:

```yaml
redirects:
  '/products/original-product/':
    to: '/products/new-shiny'
  '/products/slightly-improved-product/':
    to: '/products/new-shiny'
```

The keys are the source absolute paths. Each one should begin with a `/`.
Specify a `to` value for where to redirect to; you can optionally include a `type` field to set a custom status code.

## Redirect strategies

There are a few different types of redirects, the sections below describe what you can do.
These examples use `redocly.yaml` to configure the redirects.

### Redirect one page to another

Use paths to redirect individual pages, perhaps after restructuring site content. Here's an example taken from these docs:

```yaml
redirects:
  '/concepts/static-assets/':
    to: 'author/concepts/static-assets/'
  '/howto/add-openapi-docs/':
    to: 'author/howto/add-openapi-docs/'
```

In this case, the pages have been moved to new directories.
Adding the redirects means that anyone with the old URLs still reach the expected content.

### Redirect to an external URL

When a page has moved to a separate site or domain, use a redirect to point to its new location.
For example for a roadmap document hosted on an external service:

```yaml
redirects:
  '/roadmap':
    to: 'https://example.com/awesome-roadmap'
```

### Redirect many paths to one page

Redirects support use of wildcards to match the last parts of a path.
For example, if you restructured content from many pages in a directory into a single page called `book-on-one-page.md`, you could create a redirect using a wildcard like the example below:

```yaml
redirects:
  '/pages/*':
    to: '/book-on-one-page/'
```

Use this approach when you consolidate content, or want to redirect many URLs to the same resource.

### Redirect a group of paths to the same structure at a new location

If you move a whole directory of content from one place to another, describe the first part of the path for the source and destination, and end both with a wildcard. For example, there are multiple pages in a folder named `guides`, but we renamed the folder to `tutorials`, the redirect rule would be as follows:

```yaml
redirects:
  `/guides/*':
    to: '/tutorials/*'
```

All the pages, including nested pages, will be redirected.
For example `/guides/add-linting/` redirects to `/tutorials/add-linting/` and `guides/cli/previews/` redirects to `/tutorials/cli/previews/`.

If there's a specific redirect for a page that also matches a wildcard, then the specific redirect wins. For example if `/guides/usernames` has a redirect to `/getting-started-with-users` then that redirect will be used rather than the wildcard.

### Manage the redirects list in a separate file

Redirects are managed in `redocly.yaml`, but if you have a lot of redirects or would find it easier to maintain the redirects data in a separate file, this can be achieved using the `$ref` syntax.
For example, if you have a file named `redirects.yaml` with the following content:

```yaml
'/products/original-product/':
  to: '/products/new-shiny'
'/products/slightly-improved-product/':
  to: '/products/new-shiny'
```

Then those redirects can be included into the main `redocly.yaml` configuration file by adding the `redirects` key and a reference:

```yaml
redirects:
  $ref: './redirects.yaml'
```

The redirects are now included in the project configuration.

## Resources

- [Add links](./links.md) on project pages.