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
# `requiresLogin`

This configuration option makes all your content private.
Only authenticated users, who are verified through either Redocly or an identity provider (IdP) you [added in Reunite](../reunite/organization/sso/add-idp.md) can access your project.

{% admonition type="info" %}
The **requiresLogin** option cannot be used in conjunction with the **rbac**.
These configurations are mutually exclusive.
{% /admonition %}

## Examples

Below is an example of how to protect your entire project by requiring login:

```yaml {% title="redocly.yaml" %}
requiresLogin: true
```

## Resources

- **[RBAC configuration](./rbac.md)** - Complete options for configuring role-based access control as an alternative to requiresLogin for granular permissions
- **[SSO configuration](./sso.md)** - Discover options for configuring single sign-on to work with requiresLogin for streamlined user authentication
