---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `redirects`

Redirects allow you to change which resource a URL points to, enabling you to maintain working links when you move, rename, or restructure content.

Redocly supports two ways of configuring redirects:

- **In the `redocly.yaml` config file** - Useful for maintaining lists of redirects after site or section migrations
- **In a separate YAML file** - Place redirects in a separate file (for example, `redirects.yaml`) to make long lists more manageable

When redirects are configured in both locations, the `redocly.yaml` configuration takes priority.

## Options

### Sources map

{% table %}

- Option
- Type
- Description

---

- _/{source}_
- [Destination object](#destination-object)
- **REQUIRED**.
  Source is an absolute path that must start with a forward slash.
  It may be an exact path; for example: `/sample/content/`.
  Alternatively it may use a wildcard at the end of the absolute path; for example: `/sample/*`.
  The wildcard symbol (`*`) is only supported as the last path segment.

  If you are redirecting from files named `index.*`, omit `index/` from the path.

{% /table %}

### Destination object

{% table %}

- Option
- Type
- Description

---

- to
- string
- **REQUIRED**.
  Absolute path to the destination. It may be an exact path; for example: `/new-url/`.
  Alternatively, it may be a URL to an external resource; for example: `https://redocly.com`.
  If the source uses a wildcard, the destination may also use a wildcard at the end of the path to indicate that the matched part of the path should be used; for example `/new-url/*`, `https://redocly.com/*`.
  This option is not available for redirects defined in front matter.

  If you are redirecting to pages named `index.*`, omit `index/` from the path.

---

- type
- integer
- HTTP status code for the redirect.
  Default value: `301`.

{% /table %}

## Examples

### Basic redirect configuration

Configure redirects in `redocly.yaml` by adding a `redirects` section:

```yaml
redirects:
  '/some-old-url/':
    to: '/new-url/'
  '/some-other-old-url':
    to: '/new-url/'
    type: 307
  '/external-redirect/':
    to: 'https://redocly.com'
  '/url-with-wildcard-redirect/*':
    to: '/new-url/*'
```

### Redirect one page to another

Use paths to redirect individual pages, perhaps after restructuring site content:

```yaml
redirects:
  '/concepts/static-assets/':
    to: '/content/static-assets/'
  '/howto/add-openapi-docs/':
    to: '/content/api-docs/add-openapi-docs/'
```

Adding redirects means that anyone with the old URLs still reaches the expected content.

If you want to redirect to or from an index page, omit `index/` from paths:

Previous location: `/config/openapi/index.md`

New location: `/config/api/index.md`

```yaml
redirects:
  '/config/openapi/':
    to: '/config/api/'
```

### Redirect to an external URL

When a page has moved to a separate site or domain, use a redirect to point to its new location:

```yaml
redirects:
  '/roadmap':
    to: 'https://example.com/awesome-roadmap'
```

### Redirect many paths to one page

Redirects support use of wildcards to match the last parts of a path. For example, if you restructured content from many pages in a directory into a single page:

```yaml
redirects:
  '/pages/*':
    to: '/book-on-one-page/'
```

Use this approach when you consolidate content, or want to redirect many URLs to the same resource.

### Redirect a group of paths to the same structure

If you move a whole directory of content from one place to another, describe the first part of the path for the source and destination, and end both with a wildcard:

```yaml
redirects:
  '/guides/*':
    to: '/tutorials/*'
```

All pages, including nested pages, will be redirected. For example `/guides/add-linting/` redirects to `/tutorials/add-linting/` and `/guides/cli/previews/` redirects to `/tutorials/cli/previews/`.

If there's a specific redirect for a page that also matches a wildcard, then the specific redirect wins.

### Use a separate redirects file

If you have many redirects, maintain them in a separate file using the `$ref` syntax. Create a `redirects.yaml` file:

```yaml {% title="redirects.yaml" %}
'/products/original-product/':
  to: '/products/new-shiny'
'/products/slightly-improved-product/':
  to: '/products/new-shiny'
```

Then reference it in your main `redocly.yaml` configuration:

```yaml {% title="redocly.yaml" %}
redirects:
  $ref: './redirects.yaml'
```

## Resources

- **[Manage links](../content/links.md)** - Manage and configure links on project pages for optimal navigation and redirect handling
