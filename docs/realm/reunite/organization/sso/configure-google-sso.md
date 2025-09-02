# Configure Google Workspace as a SAML SSO

Follow the steps to configure Google Workspace SAML SSO integration with Reunite.

## Create an app in Google Workspace

1. In the Google Workspace Admin panel, navigate to **Apps** > **Web and mobile apps**.
1. Select **Add app** and choose **Custom SAML app**.
1. Fill in the form:
    - **App name**: `Redocly Reunite`
    - (Optional) **Description**: provide a description for your app.
    - (Optional) **Icon**: upload an image as your app's icon.
1. Click **Continue**.

## Add a SAML 2 identity provider in Reunite

1. In Reunite, navigate to your organization's **Overview** page.
1. Select **SSO and login** in the navigation menu on the left side of the page.
1. Click **Add** in the Guest or Corporate Identity Provider section.
1. Select **SAML2**.
1. Enter a name for your identity provider.
1. Select the default **Organization Role** for users who log in with the identity provider.
1. (Optional) Enter the name of the **Default Team**.
1. In **Single sign on URL**, enter: `https://auth.cloud.redocly.com/org/`*{your-organization-slug}*`/`.
1. In **Issuer ID**, enter the unique identifier of the identity provider.
1. In **x509 public certificate**, paste the certificate from the identity provider.
1.  Click **Save**.

## Configure attributes in Google Workspace to send to Reunite

1. In the Google Workspace, in your app's configuration, in **App attribute**, enter: `https://redocly.com/sso/teams`.
1. (Optional) Select groups to transmit to Reunite.
1. (Optional) To preserve the Owner organization role for assigned users, create a group named `redocly.owners` and add users that have this organization role.

## Resources

- **[Single sign-on (SSO) concepts](./sso.md)** - Understand different identity provider types in Reunite and their implementation for project authentication
- **[Add an identity provider](./add-idp.md)** - Complete guide for adding identity providers in Reunite for streamlined authentication management
- **[Configure SSO](./configure-sso.md)** - Set up multiple identity provider types to provide users with flexible authentication options for your projects
- **[Role-based access control (RBAC)](../../../access/rbac.md)** - Implement advanced access control scenarios to grant specific users access to specific content and features
