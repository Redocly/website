---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise+
---
# Configure SCIM

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

System for Cross-domain Identity Management (SCIM) 2.0 lets your identity provider provision and deprovision users in your Redocly organization automatically.
SCIM works alongside [single sign-on (SSO)](./sso.md).
Users still sign in through your IdP.
SCIM keeps organization membership in sync with your directory.

Each SCIM integration is tied to a specific [identity provider you added in Reunite](./add-idp.md) (Corporate or Guest, SAML 2 or OpenID Connect).
The SCIM base URL is unique to that identity provider.

{% admonition type="warning" name="Beta feature" %}
The SCIM feature is currently experimental and may be subject to changes.
It is only available to organizations that request access from Redocly and have the feature enabled for their organization.
Until then, **Enable SCIM** and **SCIM endpoint** on the identity provider form are hidden.
{% /admonition %}

## Before you begin

Make sure you have the following:

- a SAML 2 or OpenID Connect identity provider [added in Reunite](./add-idp.md) for the organization you want to provision users into
- `owner` role in your organization
- an [organization API key](../api-keys.md) you can use for SCIM authentication.
  Store it securely and use the key value as the bearer token.
  If you later rotate or revoke that key, update the bearer token in your identity provider’s SCIM provisioning application so provisioning keeps working
- confirmation from Redocly that SCIM has been enabled for your organization

## Enable SCIM in Reunite

1. Log in to Redocly and access your organization's **Overview** page.
1. Select **SSO and login** in the navigation menu on the left side of the page.
1. Under **Identity Provider**, open the Corporate or Guest provider you want to connect to SCIM (for example, click **Edit**).
   If you use SAML 2 or OpenID Connect, you are taken to the corresponding identity provider form.
1. Select **Enable SCIM 2.0**.
1. Copy the **SCIM endpoint** value shown on the form.
   Enter this URL in your identity provider’s SCIM or provisioning settings.

## Authenticate SCIM requests

Your identity provider must send an `Authorization` header that carries your organization API key.
Use the `Bearer` format followed by a space and the full API key string (the same value you copy when you create a key in **API keys**).

Create or rotate keys under **API keys** in your organization settings.
From more information about API keys in your Redocly products, see [Manage API keys](../api-keys.md).

If you rotate or revoke the organization API key used for SCIM, put the new key value into your identity provider’s SCIM provisioning settings (the same place you configured the bearer token).
The IdP's SCIM requests fail and automatic provisioning stops until you provide a valid key.

## Supported SCIM attributes

Redocly follows SCIM 2.0 Core User and Group resources.
Map your identity provider’s attributes to the SCIM fields so the provisioning matches data in Redocly.

### Users

Redocly reads these SCIM User attributes:

- **userName** or **emails** (email address in Redocly): If **userName** is a valid email, it is used.
  Otherwise Redocly uses the **emails** list.
  Prefer the entry marked **primary**, or the first email in the list.
- **externalId** (IdP user id): Required for create and update.
  Links the directory user to SSO for this identity provider.
- **name.givenName** and **name.familyName** (first and last name): Optional.
- **active** (organization membership): **true** provisions the user into your Redocly organization. **false** removes them from the organization (deprovisioning).

Other SCIM User attributes (for example **displayName**, **title**, **locale**, **timezone**, **profileUrl**, **name.middleName**) are not saved to the Redocly user profile.
Your IdP may still send them.

### Groups

Redocly maps SCIM Groups to [organization teams](../teams.md):

- **displayName** (team name): Becomes the team name in Redocly.
- **members** (team membership): Your IdP can add or remove members with SCIM Group updates when it supports those operations.

The exact behavior depends on which SCIM operations your IdP sends.
If you have synchronization issues your environment, review the attribute mapping in your IdP.

## Configure your identity provider

In your identity provider’s admin console, create or edit a SCIM provisioning application (sometimes called automated provisioning or directory sync).
Use the **SCIM endpoint** from Reunite as the provisioning base URL, and configure bearer token authentication with your organization API key.

Exact field names and steps depend on your IdP.
After you save your Reunite settings and your IdP configuration, run your provider’s test or sync flow if available to confirm connectivity.

{% admonition type="warning" name="User account removal" %}
Deprovisioning removes the user from your Redocly organization when your IdP sets **active** to **false** or unassigns them from the provisioned application, depending on how your IdP implements SCIM.
{% /admonition %}

## Resources

- **[Add an identity provider](./add-idp.md)** - Add or edit SAML 2 and OpenID Connect identity providers in Reunite
- **[Manage API keys](../api-keys.md)** - Create and revoke organization API keys used for SCIM authentication
- **[Configure SSO](./configure-sso.md)** - Choose which identity providers apply to each project in `redocly.yaml`
- **[Single sign-on (SSO) concepts](./sso.md)** - Learn how Corporate and Guest identity providers work with Reunite and projects
- **[SSO configuration reference](../../../config/access/sso.md)** - Technical reference for SSO options in your project configuration

