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
description: Configure a URL where users are redirected after they log out.
---
# `logoutReturnUrl`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}
After a user logs out of your project and their session cookies are cleared, they will be redirected to the URL specified in `logoutReturnUrl`.
If not specified, users are redirected to the root path of your project by default.

This is useful when you want users to return to your main website or a specific page after logging out, rather than staying on the documentation site.

## Options

{% table %}

- Option
- Type
- Description

---

- logoutReturnUrl
- string
- URL that users are redirected to after logging out. Must start with `http://` or `https://`.

{% /table %}

## Examples

### Use the access object (recommended)

The recommended way to configure `logoutReturnUrl` is within the `access` object:

```yaml {% title="redocly.yaml" %}
access:
  logoutReturnUrl: https://yourcompany.com
```

### Redirect to a specific page

The following example redirects users to a custom logout page:

```yaml {% title="redocly.yaml" %}
access:
  logoutReturnUrl: https://yourcompany.com/logout-success
```

{% admonition type="info" %}
**Note:** `logoutReturnUrl` is a new feature and is only available within the `access` object.
It cannot be configured at the root level.
{% /admonition %}

## Use cases

Common use cases for `logoutReturnUrl`:

- **Corporate portals:** Redirect users back to your main corporate website after logout
- **Public sites:** Redirect to your public-facing website after logout
- **Landing pages:** Send users to a specific landing page or homepage after logout

## Resources

- **[Access configuration](./access.md)** - Group authentication and access settings together using the `access` object
- **[RequiresLogin configuration](./requires-login.md)** - Require login for your project
- **[SSO configuration](./sso.md)** - Configure single sign-on for your project

