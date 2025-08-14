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

- **[RBAC configuration](./rbac.md)** - Complete options for configuring role-based access control for granular project permissions and user management
- **[RequiresLogin configuration](./requires-login.md)** - Require login for all users to your project without implementing complex role-based access control
- **[Google Workspace SAML 2 SSO](../reunite/organization/sso/configure-google-sso.md)** - Integrate Google Workspace SAML 2 SSO with Reunite for enterprise authentication workflows
- **[Single Sign-on concepts](../reunite/organization/sso/sso.md)** - Understand different identity provider types in Reunite and how they apply to project authentication
- **[Add an identity provider](../reunite/organization/sso/add-idp.md)** - Follow steps to add identity providers in Reunite for centralized authentication management
- **[Configure SSO](../reunite/organization/sso/configure-sso.md)** - Enable multiple identity provider types to give users flexible authentication options for your projects
- **[Role-based access control (RBAC)](../access/rbac.md)** - Implement advanced access control scenarios to grant specific users access to specific content and features
