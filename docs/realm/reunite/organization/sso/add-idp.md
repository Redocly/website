# Add an identity provider (IdP)

Add SSO identity providers in Reunite, so users can use them for logging into Reunite as well as individual projects.
After you have added an IdP in Reunite, the identity provider can then be configured in the `redocly.yaml` configuration file for individual projects.

## Before you begin

Make sure you have the following before you begin:

- A SAML 2 or OpenID Connect-based identity provider
- The following information about your identity provider:
  - SAML 2
    - Single sign on URL
    - Issuer ID
    - x509 public certificate
    - NameID format set to email address
    - The following standard SAML attributes (claims) are supported:
      - `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname`
      - `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname`
      - `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`
  - OpenID Connect
    - Either a configuration JSON or URL
    - Client ID
    - Client Secret
- `owner` role in your organization

## Add a Corporate identity provider (IdP)

A Corporate identity provider is used to authenticate internal users into Reunite and projects.
You can only add one Corporate identity provider for your organization.

1. Log in to your Redocly instance.
2. Select **SSO and login** in the navigation menu on the left side of the page.
3. In the **Corporate** row under **Identity Provider**, click **+ Add** and select the type of identity provider you want to add - either SAML 2 or OpenID Connect.
4. Complete the form based on the information you have gathered about your SSO identity provider.
5. Click **Save**.

## Add a Guest identity provider (IdP)

A Guest identity provider is used to authenticate external users into projects.
You can only add one Guest identity provider for your organization.

1. Log in to your Redocly instance.
2. Select **SSO and login** in the navigation menu on the left side of the page.
3. In the **Guest** row under **Identity Provider**, click **+ Add** and select the type of identity provider you want to add - either SAML 2 or OpenID Connect.
4. Complete the form based on the information you have gathered about your SSO identity provider.
5. Click **Save**.


## Team mapping

{% partial file="../../../_partials/team-mapping.md" /%}

To map IdP groups to Redocly default teams or project RBAC teams:

1. Select the **Configure team attribute mapping** or **Configure team claim mapping** checkbox.
1. Enter the IdP group name in the Value text box on the left side.
2. Enter the [Redocly default team tied to an organization role](../teams.md#team-mapping) or [project RBAC team name](../../../access/index.md#assign-roles-to-specified-teams) into the **Team** text box on the right side.
3. Click the **Add mapping** button to add additional mappings as needed.
4. Click **Save**.

When users assigned to those groups in your IdP log in to Reunite, they have the project or organization role access assigned to those teams.

## Verified domains

{% partial file="../../../_partials/verified-domains.md" /%}

## Require SSO authentication

You can require SSO authentication for all members of your organization by selecting the **Require SSO authentication for all members of the Redocly organization** checkbox on the **SSO and Login** page.
Selecting this checkbox means that if you have `rbac` configured, users must log in with SSO credentials and if they do not have SSO credentials, they will lose access to the organization.

{% admonition type="info" name="attention" %}
Requiring SSO authentication does not require users to log in to your project. To require login to your project, you must configure `rbac` or `requiresLogin`. See [Configure RBAC](../../../access/index.md) or [requiresLogin](../../../config/requires-login.md) for more information.
{% /admonition %}

## Resources

* If you want to specify which identity providers users can use to log in to your project with or if you want to disable SSO, follow the instructions in the [Configure SSO](./configure-sso.md) how-to documentation.
* If you want to limit access to certain pages in your project or in Reunite, follow the instructions in the [Configure RBAC](../../../access/index.md) how-to documentation.
* Discover all the options available for configuring SSO in the [`sso` reference documentation](../../../config/sso.md)
* Learn more about the different identity provider types you can add in Reunite or configure in your `redocly.yaml` file in the [Single sign-on (SSO) concept doc](./sso.md).
* To understand more about the different components involved in Redocly's RBAC, read the [Role-based access control (RBAC) concept documentation](../../../access/rbac.md).
* View examples and options for configuring RBAC in your `redocly.yaml` file in the [RBAC reference documentation](../../../config/rbac.md).
