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
description: This configuration option makes all your content private for non-authenticated users.
---
# `requiresLogin`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}
Only authenticated users, who are verified through either Redocly or an identity provider (IdP) you [added in Reunite](../reunite/organization/sso/add-idp.md) can access your project.

{% admonition type="info" %}
The **requiresLogin** option cannot be used in conjunction with the **rbac**.
These configurations are mutually exclusive.
{% /admonition %}

## Examples

### Use the access object (recommended)

The recommended way to configure `requiresLogin` is within the `access` object:

```yaml {% title="redocly.yaml" %}
access:
  requiresLogin: true
```

### Root-level configuration (deprecated)

{% admonition type="warning" %}
**Deprecated:** Root-level `requiresLogin` is still supported for backward compatibility but will show deprecation warnings when used alongside the `access` object.
Please migrate to the `access` object format.
{% /admonition %}

```yaml {% title="redocly.yaml" %}
requiresLogin: true
```

## Resources

- **[Access configuration](./access.md)** - Group authentication and access settings together using the `access` object
- **[RBAC configuration](./rbac.md)** - Complete options for configuring role-based access control as an alternative to requiresLogin for granular permissions
- **[SSO configuration](./sso.md)** - Discover options for configuring single sign-on to work with requiresLogin for streamlined user authentication
