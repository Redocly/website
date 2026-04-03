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
# Configure SSO with Auth0 OIDC

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Follow this guide to configure an SSO integration between Auth0 OpenID Connect protocol and Reunite.

{% admonition type="warning" %}
**Important:** Before completing the Reunite setup, configure Owner mapping in Auth0 (see "Preserve the Owner organization role" section) so owner accounts receive the correct claims, especially for new users and promotions.
{% /admonition %}

## Add Auth0 as a corporate identity provider in Reunite

1. In Reunite, navigate to your organization's **Overview** page.
1. Select **SSO and login** in the navigation menu on the left side of the page.
1. Click **Add** in the Guest or Corporate Identity Provider section.
1. Select **OpenID Connect**.
1. Enter a name for your identity provider.
1. Select the default **Organization Role** for users who log in with the identity provider.
1. (Optional) Enter the name of the **Default Team**.
1. Copy the **Callback URL**.
   Keep this tab open and continue with the Auth0 configuration in a new tab.

## Create an application in Auth0

1. Log in to Auth0 and select **Applications** from the menu on the left side of the page.
1. Click **Create Application**.
1. Choose **Regular Web Applications**, and click **Create**.

## Copy settings between Auth0 and Reunite

1. In Auth0's **Application Settings** tab, scroll to **Application URIs** and paste the previously copied callback URL into the **Allowed Callback URLs** field.
1. Click the **Save Changes** button.
1. Scroll to **Advanced Settings** > **Endpoints**, copy the **OpenID Configuration**, and paste it in Reunite into the **Configuration (.well-known)** field.
1. In Auth0, scroll to **Basic Information**, copy the **Client ID** and **Client Secret**, and paste them into Reunite.
1. In Reunite's **RBAC Teams Claim Name** field, enter `https://redocly.com/sso/teams`.

## Preserve the Owner organization role

{% admonition type="info" %}
Reunite does not **lower** an existing stored organization role when someone signs in with SSO and Auth0 sends a lower role than Reunite already has for that user.
You should still map owners correctly in Auth0 so **new** users and **promotions** match your intended access.
{% /admonition %}

{% admonition type="warning" %}
**Recommended before broad rollout:** Ensure owner accounts receive the `redocly.owners` role in Auth0 (below) so claims match administrative access in Reunite.
{% /admonition %}

To map organization owners in Auth0 to the Owner role in Reunite:

1. In Auth0, navigate to **User Management** > **Roles**.
1. Create a role named `redocly.owners`.
1. Navigate to **Users** > **Roles** and assign the `redocly.owners` role to users with an Owner role in your organization.
1. Return to Reunite and click **Save** to complete the identity provider setup.

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

- **[Single sign-on (SSO) concepts](./sso.md)** - Understand different identity provider types in Reunite and how they integrate with your project authentication
- **[Add an identity provider](./add-idp.md)** - Step-by-step guide for adding identity providers in Reunite for centralized authentication management
- **[Configure SSO](./configure-sso.md)** - Enable multiple identity provider types to give users flexible authentication options for your projects
