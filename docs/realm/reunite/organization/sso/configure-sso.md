# Configure SSO

After you have [added an identity provider (IdP)](add-idp.md) in Reunite, the IdP can then be configured in the `redocly.yaml` configuration file for individual projects.
Adding an IdP to the configuration file for a project is not required for users to be able to use it to log in.
If you do not configure `sso` in the `redocly.yaml` file for a project, users can log in to the project using IdPs you have added in Reunite in the default priority order.
You can configure `sso` in the `redocly.yaml` file of a project, to specify identity providers for that project.
See the [Single sign-on (SSO) concept doc](./sso.md#default-priority-order) for more information on the default priority order.

{% admonition type="info" name="attention" %}
Configuring `sso` does not require users to log in to your project. To require login to a project, [`rbac`](../../../config/rbac.md) or [`requiresLogin`](../../../config/requires-login.md) must also be configured.
{% /admonition %}

## Before you begin

Make sure you have the following before you begin:

- a `redocly.yaml` configuration file with one of the following configured:
  -  `rbac` defined for the [`authenticated` default team](../teams.md#default-teams)
  -  [`requiresLogin`](../../../config/requires-login.md)
- [identity provider (IdP) information added in Reunite](./add-idp.md)

## Specify IdPs for a project

If you want to specify which identity providers (IdPs) users can log in to your project with, you can configure `sso` in the `redocly.yaml` configuration file.

For example, the following `sso` configuration limits users to the CORPORATE IdP, if it has been added in Reunite:

```yaml {% title="redocly.yaml" %}
sso: 
  - CORPORATE
```

The following example allows users to use both the GUEST IdP (if it has been added in Reunite) and REDOCLY credentials:

```yaml {% title="redocly.yaml" %}
sso:
  - GUEST
  - REDOCLY
```

Redocly credentials are credentials created and saved in Reunite.

## Disable SSO

If you have configured `rbac`, but want to disable SSO, use the following `sso` configuration:

```yaml {% title="redocly.yaml" %}
sso: []
```

Disabling SSO is only necessary if you have `rbac` configured, but you don't want to require login to your project.
Disabling SSO removes the login page, but does not disable `rbac`.

## Resources

* Learn how to [Add an identity provider](./add-idp.md) in Reunite that you can use for projects and Reunite login.
* Discover how to [Configure RBAC](../../../access/index.md) to limit what users can see in your project.
* View all the options available for configuring SSO in the [sso reference documentation](../../../config/sso.md).
* Learn more about the different IdPs and ways they can be used in your projects in the [Single sign-on (SSO) concept documentation](./sso.md).
* Discover how RBAC works in projects and Reunite in the [Role-based access control (RBAC) concept documentation](../../../access/rbac.md).
* View all the options available for configuring RBAC in the [rbac reference documentation](../../../config/rbac.md).
