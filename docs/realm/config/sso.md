---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
---
# `sso`

The single sign-on (SSO) configuration option is for allowing the usage of specific identity providers (IdPs) defined in Reunite.
This configuration determines which IdPs are available for logging in to a project.
Configuring SSO by itself does not require users to log in to access a project.
To require login to a project, [`rbac`](./rbac.md) or [`requiresLogin`](./requires-login.md) must also be configured.

## Options

{% table %}

- Option
- Type
- Description

---

- sso
- array
- List of identity provider types from Reunite.
  Values can include: REDOCLY, CORPORATE, or GUEST or `[]`

  Default value: `AUTO` - when no `sso` is defined, this special value is used.
  It redirects users to `GUEST` IdP if it's defined in Reunite.
  Otherwise, it redirects to `CORPORATE` IdP, if defined in Reunite.
  If no IdPs are defined it falls back to the `REDOCLY` IdP, giving users the option to log in using their Redocly credentials or Social Login providers (like `Google`).

{% /table %}

## Examples

### Disable SSO

The following example is a `sso` configuration that disables SSO:

```yaml {% title="redocly.yaml" %}
sso: []
```

After applying this configuration, if you have `rbac` configured for the same project, and there are pages assigned to the `authenticated` default team, those pages are not accessible to anyone.
Otherwise, if you do not have `rbac` configured, or you have all pages assigned to the `anonymous` default team, all pages are accessible.

### Allow Guest and Redocly IdP

The following example allows users to use the `GUEST` and `REDOCLY` identity providers (IdPs):

```yaml {% title="redocly.yaml" %}
sso:
  - GUEST
  - REDOCLY
```

## Resources

* View all options for configuring RBAC for a project in the [rbac](../config/rbac.md) reference documentation.
* If you do not want to use RBAC, you can use the [requiresLogin](./requires-login.md) reference documentation to require login for all users to your project.
* Follow the steps to [integrate Google Workspace SAML 2 SSO with Reunite](../reunite/organization/sso/configure-google-sso.md).
* Learn more about the different IdP types in Reunite and how they apply to projects in the [Single Sign-on](../reunite/organization/sso/sso.md) concept.
* Follow steps for how to [Add an identity provider](../reunite/organization/sso/add-idp.md) in Reunite.
* If you have already added multiple IdP types in Reunite, you can [Configure SSO](../reunite/organization/sso/configure-sso.md) to allow your users to use multiple IdP types for a project.
* For more complex scenarios where you need to grant access to specific content for specific users, you need [Role-based access control (RBAC)](../access/rbac.md).
