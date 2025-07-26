# Configure RBAC for pages and content

By default, all pages of your project are public and do not require authorization to be accessed.
However, you can configure RBAC to limit access based on team assignment.
You can also override globally assigned project permission requirements in the `redocly.yaml` file on a per-page basis for the entire page and for only certain sections of content on the page.

The types of pages you can limit access to include the following:

- Markdown pages
- React pages
- API documents

## Markdown pages

Configuring RBAC in front matter only affects the running project and only for the pages that include it in the front matter.
To set permissions for a Markdown page in the front matter, add the `rbac` configuration to its front matter and provide team access settings.

For example, in the following front matter configuration example, only members of the `Admin` team can access the page and all other users are redirected to the 404 page:

```yaml
---
title: My Getting Started Page
rbac:
  Admin: admin
---
```

Pages that are hidden by RBAC configuration do not generate sidebar links.
If all pages in a group are hidden, the sidebar group is also hidden.

## React pages

To set permissions for specific React pages (`*.page.tsx`), you need to export a special constant, `frontmatter`, and add the `rbac` configuration to it, as illustrated in the following example:

```javascript
export const frontmatter = {
  rbac: {
    Admin: 'admin',
  },
  seo: {
    title: 'Custom React page',
  },
};
```

In the example, only members of the `Admin` team can access the page and all other users are redirected to the 404 page.

## API documents

You can set permissions for an entire API definition in the `apis` section of the `redocly.yaml` file.

For example, in the following example, the `openapi/api-definition.yaml` API definition is accessible only to users that are assigned to the Admin group:

```yaml
apis:
  sample@default:
    root: 'openapi/api-definition.yaml'
    rbac:
      Admin: admin
```

## Set permissions for content

By default, when you set RBAC permissions for a page, authorized users are able to see all the content on that page.
However, sometimes you may need to hide a section of content on the page from certain teams.
You can set permissions by teams for specific content on Markdown and React pages.

### Markdown pages

You can use the `if` Markdoc tag to conditionally render content on a Markdown page, based on a user's teams.

For example, in the following example, the project renders the text between the Markdoc tags only if the authenticated user is assigned to the Admin team:

{% markdoc-example %}

```markdoc
{% if includes($rbac.teams, "Admin") %}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
{% /if %}
```

{% /markdoc-example %}

### React pages

You can use a convenient React hook that can be accessed in the React pages of the project to access the current user's teams.
You can then use this hook to conditionally render certain content or perform other actions, as in the following example:

```typescript
export default function ({ pageProps }) {
  const userTeams = pageProps?.variables?.rbac?.teams || [];

  return <div>{userTeams.includes('Admin') ? 'You are an admin' : 'You are not an admin'}</div>;
}
```

In the example, the text the project renders between the div tags depends on if the authenticated user is assigned to the Admin team.

## Resources

- Learn more about [RBAC (role-based access control)](./rbac.md) in the concept documentation.
- Follow step-by-step instructions for [How to configure RBAC](./index.md).
- View full configuration details in the [`rbac` configuration reference](../config/rbac.md).
- Check out the [x-rbac OpenAPI extension documentation](../content/api-docs/openapi-extensions/x-rbac.md) to apply RBAC permissions to specific objects in OpenAPI reference documentation.
