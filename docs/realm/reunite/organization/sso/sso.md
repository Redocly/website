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

# Single sign-on (SSO)

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Single sign-on (SSO) is an authentication method that allows users to log in with a single identity to several related, but independent, software systems.
You can add SSO identity providers (IdPs) to Reunite to allow users to use them for logging into Reunite as well as individual projects.
After you [add an IdP to Reunite](./add-idp.md), the IdP can then be [configured in the `redocly.yaml` configuration file for individual projects](./configure-sso.md).

When users log in with an IdP, the default team and organization role assigned in the IdP override the organization role assigned on the **People** page in Reunite.

## Identity provider categories in Reunite

You can add one or more identity providers in each of the two categories in Reunite:

- **Corporate:** used to authenticate internal users into Reunite and projects.
- **Guest:** used to authenticate external users into projects.

For each Reunite category, you can connect to your identity provider using either the SAML 2 or OpenID Connect protocol.

## Identity provider categories in `redocly.yaml`

When configuring the `redocly.yaml` configuration file for individual projects, you can add one or all of the three possible identity provider categories:

- `REDOCLY`: This value represents credentials managed by Redocly and allows users to log in with their Redocly password or social login providers, like Google.
- `CORPORATE`: This value represents credentials for IdPs you added as Corporate identity providers in Reunite.
- `GUEST`: This value represents credentials for IdPs you added as Guest identity providers in Reunite.

The values listed are the identity providers (IdPs), if added in Reunite, users can use to log in to the project.
To combine identity provider categories, configure `sso` in the `redocly.yaml` file of the project.
To target specific identity providers by their unique ID, configure [`idps`](../../../config/access/idps.md) instead. `sso` and `idps` are mutually exclusive.

## Default priority order

Identity provider configuration in `redocly.yaml` is not required for users to be able to use IdPs to log in.
If you did **NOT** configure `sso` or `idps` in your project, users can log in to the project using IdPs you have added in Reunite with the following default priority order:

- `GUEST`: If you added GUEST IdPs in Reunite, users must log in to the project using GUEST IdPs.
- `CORPORATE`: If you added CORPORATE IdPs in Reunite and no GUEST IdPs, users must log in to the project using CORPORATE IdPs.
- `REDOCLY`: If you didn't add either GUEST or CORPORATE IdPs in Reunite, users must use their Redocly credentials or social login providers like Google.

## Verified domains

{% partial file="../../../_partials/verified-domains.md" /%}

## Team mapping

{% partial file="../../../_partials/team-mapping.md" /%}

## Disable SSO

You can disable SSO for individual projects.
When you disable SSO for a project, there is no log in page for that project.
Disabling SSO is only necessary if you have `rbac` configured, but you don't want to require login to your project.
Disabling SSO removes the login page, but does not disable `rbac`.

## Advanced SSO configuration

For complex scenarios, such as when you need to configure multiple identity providers for a single project or need more control over the SSO configuration, you can use the `ssoDirect` option.
`ssoDirect` allows you to define multiple IdPs directly in your project configuration.
Refer to the [`ssoDirect` configuration reference](../../../config/ssoDirect.md) for more details.

## Resources

- **[Add an identity provider](./add-idp.md)** - Step-by-step guide to add identity providers in Reunite for seamless user authentication across projects
- **[Configure SSO](./configure-sso.md)** - Set up single sign-on to allow users to authenticate using multiple identity providers for flexible access control
- **[Okta SAML integration video](https://youtu.be/NMayl8FTZ7c)** - Watch a step-by-step tutorial for integrating Okta with Redocly using SAML for single sign-on
- **[SSO configuration reference](../../../config/access/sso.md)** - Complete technical reference for all SSO configuration options and settings in your redocly.yaml file
- **[Direct SSO configuration reference](../../../config/ssoDirect.md)** - Advanced configuration options for multiple identity providers and direct SSO setup
- **[Multi-tenant SSO: Federated identity management](./sso-multi-tenant.md)** - Implement federated identity management for organizations with multiple tenants and complex authentication requirements
- **[Configure SCIM](./configure-scim.md)** - Enable SCIM 2.0 directory provisioning for an identity provider (early access on request)