# Block search indexing

Use the `noindex` rule to block search indexing for your entire project or specific pages.

The `noindex` rule tells search engines that the page or pages shouldn't be indexed, or included in searches.
When a page is not indexed, search engines don't return it in search results.

The `noindex` rule only applies to _external search engines_ that support it. It **does not** provide the following capabilities:

- Block pages from _in-site search_, which is controlled by the [excludeFromSearch](../../config/front-matter-config.md) option.
- Block users from accessing the page, which is controlled by [RBAC](../../setup/how-to/rbac/page-permissions.md).

See the [Block Search indexing with `noindex`](https://developers.google.com/search/docs/crawling-indexing/block-indexing) Google article for more information on the `noindex` rule.

## Before you begin

Make sure you have the following before you begin:

- a `redocly.yaml` configuration file if blocking search indexing for an entire project

## Set noindex meta tag

You can set the `noindex` rule for an entire project or specific pages using the `<meta>` tag.

This approach adds the following meta tag to the `<head>` section of a pages' HTML: `<meta name="robots" content="noindex">`.

### For an entire project

To block indexing for the pages of an entire project using meta tags, you need to configure the `seo.meta` option in the `redocly.yaml` configuration file, as in the following example:

```yaml {% title="redocly.yaml" %}
seo:
  meta:
    - name: robots
      content: noindex
```

### For specific pages

To block indexing for a specific page (or set of pages) using meta tags, you need to configure the `seo.meta` option in the page (or pages') front matter, as in the following example:

```yaml {% title="blog/example-post.md" %}
---
seo:
  meta:
    - name: robots
      content: noindex
---
```

## Set noindex response header

You can set the `noindex` rule for an entire project or specific pages using an HTTP response header.

This approach adds the following header to a pages' HTTP response: `X-Robots-Tag: noindex`.

### For an entire project

To block indexing for the pages of an entire project using a response header, use the `responseHeaders` option in the `redocly.yaml` configuration file to add a custom header for all routes, as in the following example:

```{% title="redocly.yaml" %}
responseHeaders: 
  '**':
    - name: X-Robots-Tag
      value: noindex
```

### For specific pages

To block indexing for specific page(s) of a project, use the `responseHeaders` option in the `redocly.yaml` configuration file to add a custom header for those page routes, as in the following example:

```{% title="redocly.yaml" %}
responseHeaders: 
  /blog/example-draft:
    - name: X-Robots-Tag
      value: noindex
  '/internal-docs/**':
    - name: X-Robots-Tag
      value: noindex
```

## Test noindex with browser tools

To see if the `noindex` rule has been applied properly to your page or site, use your browser's developer tools to inspect the page.

- If `noindex` is set with a meta tag, you'll see it in the **Elements** tab in the `<head>` section.
- If `noindex` is set with HTTP response headers, you'll see it in the **Network** --> **Headers** tab of the HTTP request.

You may need to do a hard refresh of the page to see these results.

## Resources

- Learn how to [Add a sitemap](./add-sitemap.md) to your project, to improve how search engines crawl your site.
- To exclude an API or all APIs from Realm's internal search, see [Exclude API from search](../how-to/exclude-api-from-search.md).
- Check out how to [Add a custom domain](./custom-domain.md) to your project, personalizing your URL to reflect your brand.
- See the [seo](../../config/seo.md) configuration reference for more metadata configuration options.
- Check out the [Front matter configurations options](../../config/front-matter-config.md) reference for configuration options only available in Markdown front matter.
