# Single sign-on (SSO)

Single sign-on (SSO) is an authentication method that allows users to log in with a single identity to several related, but independent, software systems.
You can add SSO identity providers (IdPs) to Reunite to allow users to use them for logging into Reunite as well as individual projects.
After you [add an IdP to Reunite](./add-idp.md), the IdP can then be [configured in the `redocly.yaml` configuration file for individual projects](./configure-sso.md).

When users log in with an IdP, the default team and organization role assigned in the IdP override the organization role assigned on the **People** page in Reunite.

## Identity provider types in Reunite

You can add an instance of one or both of the two types of identity providers in Reunite:

- **Corporate:** used to authenticate internal users into Reunite and projects.
- **Guest:** used to authenticate external users into projects.

For each Reunite type, you can connect to your identity provider using either the SAML 2 or OpenID Connect protocol.

## Identity provider types in `redocly.yaml`

When configuring the `redocly.yaml` configuration file for individual projects, you can add one or all of the three possible identity provider types:

- `REDOCLY`: This value represents credentials managed by Redocly and allows users to log in with their Redocly password or social login providers, like Google.
- `CORPORATE`: This value represents credentials for the IdP you added as a Corporate identity provider in Reunite.
- `GUEST`: This value represents credentials for the IdP you added as a Guest identity provider in Reunite.

The values listed are the identity providers (IdPs), if added in Reunite, users can use to log in to the project.
To use or combine specific identity providers, configure `sso` in the `redocly.yaml` file of the project.

## Default priority order

Adding an identity provider to the configuration file for a project is not required for users to be able to use it to log in.
If you do **NOT** configure `sso` in the `redocly.yaml` file for a project, users can log in to the project using IdPs you have added in Reunite with the following default priority order:

- `GUEST`: If you have added a GUEST IdP in Reunite, users must log in to projects using it.
- `CORPORATE`: If you have added a CORPORATE IdP in Reunite and have not entered a GUEST IdP, users must log in to projects using the CORPORATE IdP.
- `REDOCLY`: If you have not added either a GUEST or CORPORATE IdP in Reunite, users must log in to projects using their Redocly credentials or social login providers, like Google.

## Verified domains

{% partial file="../../../_partials/verified-domains.md" /%}

## Team mapping

{% partial file="../../../_partials/team-mapping.md" /%}

## Disable SSO

You can disable SSO for individual projects.
When you disable SSO for a project, there is no log in page for that project.
Disabling SSO is only necessary if you have `rbac` configured, but you don't want to require login to your project.
Disabling SSO removes the login page, but does not disable `rbac`.

## Resources

- **[Add an identity provider](./add-idp.md)** - Step-by-step guide to add identity providers in Reunite for seamless user authentication across projects
- **[Configure SSO](./configure-sso.md)** - Set up single sign-on to allow users to authenticate using multiple identity providers for flexible access control
- **[Okta SAML integration video](https://youtu.be/NMayl8FTZ7c)** - Watch a step-by-step tutorial for integrating Okta with Redocly using SAML for single sign-on
- **[SSO configuration reference](../../../config/sso.md)** - Complete technical reference for all SSO configuration options and settings in your redocly.yaml file
- **[Multi-tenant SSO: Federated identity management](./sso-multi-tenant.md)** - Implement federated identity management for organizations with multiple tenants and complex authentication requirements