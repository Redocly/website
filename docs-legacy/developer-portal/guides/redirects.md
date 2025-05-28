---
excludeFromSearch: true
---

# Set up redirects in Developer portal

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

Redocly supports redirects in Developer portal projects hosted in Workflows. You can set up portal redirects in any of the following ways:
- on a page-by-page basis by using a list of `redirectFrom` absolute paths in Markdown [front matter](./markdown.md#front-matter),
- in a global redirects configuration file by mapping the source URL to the target URL.

## Use `redirectFrom` in Markdown front matter

This approach creates 301 redirects from one or more URLs (sources) to the URL of a Markdown page (target).
To add source URLs to a Markdown page, list the absolute paths under the `redirectFrom` key in the page front matter.

The absolute paths must be provided as items in an array. Each must end with a trailing slash or a wilcard `*`.

In the following example, accessing any of the three listed URLs opens the `example.md` page.

**example.md file**

```md
---
seo:
  title: Example title
redirectFrom:
  - /docs/api-reference/on-premise/license-key/
  - /another-example-page/
  - /2020/12/example-blog-post/
---

# Example heading H1

Example text
```

## Use the `redirects.json` or `redirects.yaml` file

With this approach, you define the redirect source and target URLs in a special file in your portal root.
The file must be named `redirects.yaml` or `redirects.json`.

The file should contain key-value mapping of your source URLs to target URLs in the following format:

```yaml
'source-url':
  to: 'target-url'
  type: optional-redirect-HTTP-code
```

- `source-url` - required; specifies the absolute path that should be redirected (must start with `/`)
- `to` - required; specifies the absolute path or full URL of the target to which the source is redirected
- `type` - optional; specifies the HTTP code to use with the redirect (defaults to `301`)

```yaml Example redirects.yaml
'/some-old-url/':
  to: '/new-url/'
  type: 301
'/some-other-old-url':
  to: '/new-url/'
```

```json Example redirects.json
{
  "/some-old-url/":
    {
      "to": "/new-url/",
      "type": "301"
    },
  "/some-other-old-url":
    {
      "to": "/new-url/"
    }
}
```

## Wildcard (*) redirects

With wildcard redirects you may specify a path prefix that users are redirected from.
Wildcard redirects may be specified in frontmatter as well as in `redirects.json` or `redirects.yaml`.
The wildcard symbol (`*`) must be at the end of the absolute path (it isn't supported in the beginning or middle of an absolute path).

```yaml
'/old-docs/*':
  to: '/docs/'
  type: 301
```

{% admonition type="info" name="Read more" %}
Learn how to [set up redirects in API docs](../../api-reference-docs/guides/set-up-redirects.md).
{% /admonition %}
