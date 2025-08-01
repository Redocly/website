# Set path prefix

Set a project's path prefix to serve pages from somewhere other than the root of a domain.
This can help organize urls or make the separation of content more clear. For example, a SaaS company serving their developer documentation from `/developers`.

The path prefix is set using the `REDOCLY_PREFIX_PATHS` [environment variable](../reunite/project/env-variables.md).

URL _without_ prefix: `https://example.com/page`  
URL _with_ `api-v2` prefix: `https://example.com/api-v2/page`

## Before you begin

Make sure you have the following before you begin:
- A Realm, Reef, or Revel project with pages being served

## Set prefix with .env file

Add `REDOCLY_PREFIX_PATHS` to a `.env` file in the root of your project and assign a value. Create the file if one does not exist already.

The following example adds a "/api-v2/" page prefix to the URL when a page renders:

```shell {% title=".env" %}
REDOCLY_PREFIX_PATHS=api-v2
```

This example adds a `/api-v2` prefix to all pages served from your project.
Users trying to access the root URL, `/`, are automatically redirected to `/api-v2`.

{% admonition type="info" name="Separate environment files" %}
    Use named environment files for more control, such as `.env.development`, `.env.preview`, and `.env.production`.
{% /admonition %}

## Set prefix in Reunite

Set the page prefix using Reunite with the following steps:

1. Go to the project _Settings_ page.
2. Select **Environment variables**.
3. Click **Add environment variable** and add `REDOCLY_PREFIX_PATHS`.
4. Click the **Deploys** hyperlink in the banner.
5. Click the **Trigger deploy** button.

## Prefixed links in Markdown

After setting a page prefix, links to Markdown pages and related assets are _automatically transformed_ to support the path prefix.
That transformation includes the sidebar, navbar, footer, and links used in content.

You do not need to update any links to Markdown content after setting a page prefix.

## Prefixed links in React

In React, you can automatically apply the path prefix to the URL by using the `Link` component, as in the following example:

```javascript {% title="ExampleComponent.tsx" %}
import { Link } from '@redocly/theme/components/Link/Link';

export default function ExampleComponent() {
    return (
        <Link to="/guide/another-page">Another page</Link>
    )
}
```

The `withPathPrefix` helper function provides an alternative way of adding the prefix to links, as in the following example:

```javascript {% title="ExampleComponent.tsx" %}
import { withPathPrefix } from '@redocly/theme/core/utils';

export default function ExampleComponent() {
    return (
        <a href={withPathPrefix("/guide/another-page")}>Another page</a>
    )
}
```

## Resources

- When you [add links](../content/links.md) to Markdown content, the page prefix is added automatically.
- If you [add an OpenAPI description](../content/api-docs/add-openapi-docs.md), the url for the generated API reference pages will use the page prefix.
