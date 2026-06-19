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
Only authenticated users, who are verified through either Reunite or an identity provider (IdP) you [added in Reunite](../../reunite/organization/sso/add-idp.md) can access your project.

{% admonition type="info" %}
The `requiresLogin` option cannot be used in conjunction with `rbac`.
These options are mutually exclusive.
{% /admonition %}

## Examples

### Through the `access` object

The recommended way to configure `requiresLogin` is within the `access` object:

```yaml {% title="redocly.yaml" %}
access:
  requiresLogin: true
```

### Root-level configuration (deprecated)

{% admonition type="warning" name="Deprecated configuration" %}
Root-level `requiresLogin` configuration displays warnings when the `access` object is present.
Migrate to the `access` object format.
{% /admonition %}

```yaml {% title="redocly.yaml" %}
requiresLogin: true
```

## Resources

- **[Access configuration](./index.md)** - Group authentication and access settings together using the `access` object
- **[RBAC configuration](./rbac.md)** - Complete options for configuring role-based access control as an alternative to requiresLogin for granular permissions
- **[SSO configuration](./sso.md)** - Discover options for configuring single sign-on to work with requiresLogin for streamlined user authentication
