# Set a custom domain

You can configure a custom domain for your project and optionally serve your documentation from a subdirectory path.
This allows you to host your docs at URLs like `docs.example.com` or `docs.example.com/api/`.

## Set up a custom domain

Configure your custom domain on the **General** tab of the project's **Settings** page:

1. Log in to your Redocly instance.
2. Select your project.
3. Select **Settings > Custom domain**.
4. Click **Add domain**.
5. Enter the **Custom Domain** without the protocol.
   For example, "docs.example.com".
6. (Optional) Disable the default domain by unchecking the **Use proxy to URL** checkbox.
7. Click **Save**.
8. Log in to your DNS management provider and complete the following steps:
   - Add a new TXT record with the **name/host** and **value** listed in the Domain verification admonition on the **Custom domain** section of the **Settings** page in your project.
   - Point the domain CNAME record to `ssl.redocly.app`.
     If you have EU data residency, point the CNAME record to `ssl.eu.redocly.app`.
9.  Click **Verify**.
    A **Pending** badge displays next to the domain, until it is verified.
    Once the domain is verified, a **Verified** badge displays next to the domain.

## Serve from a subdirectory

Set a project's path prefix to serve pages from somewhere other than the root of a domain.
This can help organize URLs or make the separation of content more clear.
For example, a SaaS company serving their developer documentation from `/developers` or `/api/`.

The path prefix is set using the `REDOCLY_PREFIX_PATHS` [environment variable](./env-variables.md).

URL _without_ prefix: `https://docs.example.com/page`
URL _with_ `api-v2` prefix: `https://docs.example.com/api-v2/page`

### Set prefix in Reunite

For projects deployed through Reunite, set the page prefix using environment variables in Reunite:

1. Go to the project _Settings_ page.
2. Select **Environment variables**.
3. Click **Add environment variable** and add `REDOCLY_PREFIX_PATHS` with your desired prefix value (for example, `api-v2`).
4. Click the **Deployments** hyperlink in the banner.
5. Click the **Trigger deployment** button.

{% admonition type="warning" name="Deployment considerations" %}
Setting `REDOCLY_PREFIX_PATHS` only in your project's `.env` file can cause health checks and publish steps to fail during deployment.
Use Reunite's environment variables feature for reliable deployments.
{% /admonition %}

### Set prefix for local development

For local development, you can add `REDOCLY_PREFIX_PATHS` to a `.env` file in the root of your project:

```shell {% title=".env" %}
REDOCLY_PREFIX_PATHS=api-v2
```

This approach is suitable for local testing but should not be used as the primary method for deployed projects.

{% admonition type="info" name="Separate environment files" %}
Use named environment files for more control, such as `.env.development`, `.env.preview`, and `.env.production`.
{% /admonition %}

### Prefixed links in Markdown

After setting a page prefix, links to Markdown pages and related assets are _automatically transformed_ to support the path prefix.
That transformation includes the sidebar, navbar, footer, and links used in content.

You do not need to update any links to Markdown content after setting a page prefix.

### Prefixed links in React

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

- **[Environment variables](./env-variables.md)** - Configure additional project settings using environment variables for dynamic content and customization
- **[Add links](../../content/links.md)** - Understand how link prefixes are automatically handled when adding links to Markdown content
- **[Add OpenAPI description](../../content/api-docs/add-openapi-docs.md)** - Add API documentation that automatically uses your custom domain's page prefix for generated reference pages
