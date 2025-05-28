---
seo:
  title: Configuring multiple identity providers (IdPs)
excludeFromSearch: true

---

# Identity providers

Organizations can set up multiple identity providers (IdPs) for storing and authenticating the identities that their users use to log in to their systems and applications.

{% admonition type="info" %}
Redocly currently only supports the OpenID Connect (OIDC) identity provider for advanced functionality including RBAC and API gateway proxy integrations.
{% /admonition %}

## Add a new identity provider (IdP)

This section describes how organization owners can add a new identity provider in Redocly [Workflows](https://app.redocly.com).

1. Log in to your organization in [Workflows](https://app.redocly.com/) and select **Settings**.
2. From the left, select **Identity providers**. The **Identity providers** page displays.
3. Select **New Provider** to add a new identity provider. You can choose from [OpenID Connect](#configure-openid-connect) or [SAML2](#configure-saml2).

### Configure OpenID Connect

1. On the OpenID Connect dialog, enter the following information:

   - **Name**: Enter a name to identify the identity provider in Workflows. This name is displayed in the Access control settings for Reference docs and Developer portal.
   - **Default organization role**: From the dropdown, select the default role that will be automatically assigned to people using this identity provider. This is essential for just-in-time provisioning.
     For more information on roles and permissions associated with roles, refer to the [Roles and permissions](../people/roles-permissions.md) topic.
   - **Team assigned by default**: While adding an IdP, you can assign people to an existing team by default, based on some of the people's attributes (claims). See the [Map teams to identity providers](#map-teams-to-identity-providers) section.
   - **Configuration URL (.well-known)**: The OpenID configuration URL for your identity provider. This is typically in the format `https://{identity-provider-hostname}/.well-known/openid-configuration`. When you enter the Configuration URL, the supported OIDC scopes display.
     Select the appropriate scopes to set your user attributes during authentication to authorize access. Alternatively you can copy-paste the content of the configuration endpoint if your OpenID configuration URL is protected by some header-based authorization.
   - **Scopes**: Select the scopes you want to associate with the IdP. Scopes are used during authentication to authorize access to a person's details, like name and picture.
   - **Client ID**: Unique ID to identify Redocly with your IdP authorization server.
   - **Client Secret**: Secret password that only Redocly and your IdP authorization server know.
   - **RBAC roles claim name**: If you are using Role Based Access Control (RBAC), enter the roles claim name to reuse the identity provider across multiple roles.
     ![Add OIDC details](./images/add-oidc-details.png '#display=block;margin=auto;width=500px;')

   {% admonition type="info" %}
   Organization owners can find out these details from their identity provider. For more information, see the Identity providers and OIDC configuration section.
   {% /admonition %}

   <details>
   <summary>Identity providers and OIDC configuration</summary>

   This list shows the configuration URLs and associated documentation for a few popular identity providers.

   **Google Cloud Platform (GCP)**

   Config URL: `https://accounts.google.com/.well-known/openid-configuration`

   Docs: [Google OIDC docs](https://developers.google.com/identity/protocols/oauth2/openid-connect#discovery)

   **Okta**

   Config URL: `https://${yourOktaDomain}/oauth2/default/.well-known/openid-configuration`

   Docs: [Okta Developer docs](https://developer.okta.com/docs/concepts/auth-servers/)

   **Auth0**

   Config URL: `https://YOUR_AUTH0_DOMAIN/.well-known/openid-configuration`

   Docs: [Auth0 documentation](https://auth0.com/docs/connections/enterprise/oidc)

   **AWS Cognito**

   Config URL: `https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/openid-configuration`

   Docs: [AWS Cognito docs](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-oidc-idp.html)

   **Microsoft Active Directory**

   Config URL: `https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration`

   Docs: [Microsoft OIDC docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)

   </details>

2. Select **Save** to save your changes.

### Configure SAML2

1. On the SAML2 dialog, enter the following information:
   - **Name**: Enter a name to identify the identity provider. This name is displayed in the Access control settings for Reference docs and Developer portal.
   - **Default organization role**: From the dropdown, select the default role that will be automatically assigned to people using this identity provider. This is essential for just-in-time provisioning.
     For more information on roles and permissions associated with roles, refer to the [Roles and permissions](../people/roles-permissions.md) topic.
   - **Team assigned by default**: While adding an IdP, you can assign people to an existing team by default, based on some of the people's attributes (claims). See the [Map teams to identity providers](#map-teams-to-identity-providers) section.
   - **Single Sign On URL** - Enter the URL required for redirecting users for logging in.
   - **Issuer ID** - Enter the unique identifier of the identity provider.
   - **x509 public certificate**: Paste the x.509 public certificate for the IdP.
     ![Add SAML2 details](./images/add-saml2-details.png '#display=block;margin=auto;width=500px;')
2. Use values provided in the dialog to configure a new SAML application in your IdP:
   - Use the value provided in the "Single Sign Url (ACS)" field to configure "Single Sign On URL", (can be called "ACS URL", "Assertion consumer service URL", depending on your IdP)
   - Use the value provided in "Entity ID" to configure "Audience URI" (can also be called "SP Entity ID", depending on your IdP)
   - Ensure that "Name ID Format" is set to "EmailAddress".
3. Select **Save** to apply your changes.

{% admonition type="info" name="About RBAC claim names" %}
Redocly only supports limited claim mapping. For both OIDC and SAML, customers can configure their IdP access token or ID token to contain a `https://redocly.com/sso/organization-role` claim or attribute with an organization role value (OWNER, MEMBER, PARTICIPANT). This value will override the **Default organization role** configured above.
{% /admonition %}

## Map teams to identity providers

If you have set up [teams](../teams/index.md) in your organization, you can map teams to the relevant IdPs so that organization administrators (people with `Owner` role) can automatically map the people in their organization to different teams based on some of their attributes (claims).

For example, you can set up mapping rules for everyone who has an organization unit claim to automatically join an `Admins` team. The `Admins` team can be set to access every project, so effectively, people who log in with the organization unit claim can access every project in Workflows.

## Manage access control

Once you have set up your identity providers, you can manage access control to your:

- [API versions and docs](../api-registry/settings/manage-access.md)
- [Portals](../developer-portal/settings/manage-access.md)
