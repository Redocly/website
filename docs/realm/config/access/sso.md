---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
description: Restrict project login to specific identity provider categories defined in Reunite.
---
# `sso`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Restrict project login to specific identity provider categories defined in Reunite.
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
- [string]
- List of identity provider categories from Reunite.
  Possible values: `REDOCLY`, `CORPORATE`, `GUEST`, or `[]`.
  A category corresponds to the **Login type** assigned to an identity provider in Reunite.

  To target a specific identity provider by its unique ID, use [`access.idps`](./idps.md) instead of `sso`.
  `access.sso` and `access.idps` are mutually exclusive and cannot be configured together.

  Default value: `AUTO` - used when neither `sso` nor `idps` is defined.
  It offers `GUEST` IdPs, if any are defined in Reunite.
  Otherwise, it offers `CORPORATE` IdPs, if defined in Reunite.
  When a category contains a single IdP, users are redirected to this IdP.
  With multiple IdPs, users choose one on the login screen.
  If no IdPs are defined it falls back to the `REDOCLY` IdP, giving users the option to log in using their Redocly credentials or Social Login providers (like `Google`).

{% /table %}

## Examples

### Use the access object (recommended)

The recommended way to configure `sso` is within the `access` object:

```yaml {% title="redocly.yaml" %}
access:
  sso:
    - GUEST
    - REDOCLY
```

### Disable SSO

The following example disables SSO using the `access` object:

```yaml {% title="redocly.yaml" %}
access:
  sso: []
```

After applying this configuration, if you have `rbac` configured for the same project, and there are pages assigned to the `authenticated` default team, those pages are not accessible to anyone.
Otherwise, if you do not have `rbac` configured, or you have all pages assigned to the `anonymous` default team, all pages are accessible.

### Root-level configuration (deprecated)

{% admonition type="warning" name="Deprecated configuration" %}
Root-level `sso` configuration displays warnings when the `access` object is present.
Migrate to the `access` object format.
{% /admonition %}

```yaml {% title="redocly.yaml" %}
sso:
  - GUEST
  - REDOCLY
```

## Resources

- **[Access configuration](./index.md)** - Group authentication and access settings together using the `access` object
- **[RBAC configuration](./rbac.md)** - Complete options for configuring role-based access control for granular project permissions and user management
- **[RequiresLogin configuration](./requires-login.md)** - Require login for all users to your project without implementing complex role-based access control
- **[Google Workspace SAML 2 SSO](../../reunite/organization/sso/configure-google-sso.md)** - Integrate Google Workspace SAML 2 SSO with Reunite for enterprise authentication workflows
- **[Single Sign-on concepts](../../reunite/organization/sso/sso.md)** - Understand different identity provider categories in Reunite and how they apply to project authentication
- **[Add an identity provider](../../reunite/organization/sso/add-idp.md)** - Follow steps to add identity providers in Reunite for centralized authentication management
- **[Configure SSO](../../reunite/organization/sso/configure-sso.md)** - Enable multiple identity provider categories to give users flexible authentication options for your projects
- **[Role-based access control (RBAC)](./rbac.md)** - Implement advanced access control scenarios to grant specific users access to specific content and features
