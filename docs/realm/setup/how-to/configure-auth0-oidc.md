# Configure SSO with Auth0 OIDC

Follow this guide to configure an SSO integration between Auth0 OpenID Connect protocol and Reunite.

## Add Auth0 as a corporate identity provider in Reunite

1. In Reunite, navigate to your organization's **Overview** page.
1. Select **SSO and login** in the navigation menu on the left side of the page.
1. In the **Corporate** row under **Identity Provider**, click **+ Add** and select **OpenID Connect**.
1. Enter a name for your identity provider.
1. Select the default **Organization Role** for users who log in with the identity provider.
1. (Optional) Enter the name of the **Default Team**.
1. Copy the **Callback URL**.
1. Click **Save**.

## Create an application in Auth0

1. Log in to Auth0 and select **Applications** from the menu on the left side of the page.
1. Click **Create Application**.
1. Choose **Single Page Web Applications**, and click **Create**.

## Copy settings between Auth0 and Reunite

1. In Auth0's **Settings** tab, scroll to **Application URIs** and paste the previously copied callback URL into the **Allowed Callback URLs** field.
1. Click the **Save Changes** button.
1. Scroll to **Advanced Settings** > **Endpoints**, copy the **OpenID Configuration**, and paste it in Reunite into the **Configuration (.well-known)** field.
1. In Auth0, scroll to **Basic Information**, copy the **Client ID** and **Client Secret**, and paste them into Reunite.
1. In Reunite's **RBAC Teams Claim Name** field, enter `https://redocly.com/sso/teams`.
1. Click **Save**.

### Preserve the Owner organization role

To prevent Auth0 from downgrading users with the Owner role to the Member role:

1. In Auth0, navigate to **User Management** > **Roles**.
1. Create a role named `redocly.owners`.
1. Navigate to **Users** > **Roles** and assign the `redocly.owners` role to users with an Owner role in your organization.

## Setup an Action for your application

1.  In Auth0, navigate to **Actions** > **Library**, then click **Create Action** and select **Build from Scratch**.
1.  Add a name for your action.
1.  In the **Trigger** drop-down, select **Login/Post Login**.
1.  Click **Create**.
1.  Add the following code to the action and click **Deploy**:
    ```js
    exports.onExecutePostLogin = async (event, api) => {
    const namespace = 'https://redocly.com/sso';
    if (event.authorization && event.authorization.roles) {
      api.idToken.setCustomClaim(`${namespace}/teams`, event.authorization.roles);
    }
    };
    ```
1. Navigate to **Actions** > **Triggers**, and select **post-login**.
1. Click **Add Action**, select the **Custom** tab, and drag and drop your action between **Start** and **Complete**.
1. Click **Apply**.

## Resources

- Learn more about the different IdP types in Reunite and how they apply to projects in the [Single Sign-on](../concepts/sso.md) concept.
- Follow steps for how to [Add an identity provider](./add-idp.md) in Reunite.
- If you have already added multiple IdP types in Reunite, you can [Configure SSO](./configure-sso.md) to allow your users to use multiple IdP types for a project.