---
seo:
  title: Set up redirects in API docs
markdown:
  toc:
    hide: true
excludeFromSearch: true
---

# Set up redirects in API docs

Redocly supports redirects in API docs generated from your API definitions in the registry. You can define a list of source URLs and map them to targets to which they should be redirected.

The prerequisite for this is access to the API version source files.

1. Create a directory named `.redocly-config` in your API project source. It must be in the same directory as the `htmlTemplate` file.

2. In the `.redocly-config` folder, create a file called `redirects.json`.

3. In the `redirects.json` file, define all redirects for your API docs.

Redirects must be defined in the following format:

```json
"source-url": {
  "to": "absolute-path-to-target-url",
  "type": 301 | 302
}
```

Supported redirect types are `301` and `302`.

| Type | HTTP meaning      | When to use                                                                           |
| ---- | ----------------- | ------------------------------------------------------------------------------------- |
| 301  | Moved Permanently | This type should be used if the page has been permanently moved.                      |
| 302  | Moved Temporarily | This type should be used if the page has been temporarily moved.                      |

The paths for both the source and target must be absolute. Every source must be mapped to one target only. Source URLs and target URLs may be direct file links (for example, links to PDF files). Target URLs may link to specific sections (operations, tags) in your API reference docs.

**Example redirects.json file**

```json
{
  "/reference-docs/about": {
    "to": "/#section/introduction",
    "type": 301
  },
  "/partners.pdf": {
    "to": "/partners/",
    "type": 302
  }
}
```

4. Save the changes to the `redirects.json` file. Commit and push the changes to the registry to trigger a build of your API docs.

5. Access your API docs in the browser and confirm that the configured redirects are functioning. Make sure the browser is not using a cached version of your docs, as that may cause issues with redirects.

{% admonition type="info" name="Read more" %}
Learn how to [set up redirects in the Developer portal](../../developer-portal/guides/redirects.md)
{% /admonition %}
