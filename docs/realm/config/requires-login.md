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
Only authenticated users, who are verified through either Redocly or an identity provider (IdP) you [added in Reunite](../setup/how-to/add-idp.md) can access your project.

{% admonition type="info" %}
The **requiresLogin** option cannot be used in conjunction with the **rbac**.
These configurations are mutually exclusive.
{% /admonition %}

## Examples

Below is an example of how to protect your entire project by requiring login:

```yaml {% title="redocly.yaml" %}
requiresLogin: true
```

## Related options

- View all the options available for configuring RBAC in the [rbac reference documentation](../config/rbac.md).
- Discover the options available for configuring SSO in the [sso reference documentation](../config/sso.md).
