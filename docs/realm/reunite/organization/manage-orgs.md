# Manage organizations

Organizations are the top-level structure in Reunite where users with the [Owner role](../../access/roles.md#organization-roles) can view and manage global settings for your projects.
Users are added to organizations either through an identity provider or by invitation.
If you are using RBAC, access to projects is determined by the permissions of the teams users are members of.
Otherwise, users can access all projects from the organization **Overview** page.

## Change organization name

Users with the Owner role can update the organization name any time.

To update your organization name:

1. After logging in, select **General** in the navigation menu on the left side of the page.
2. Delete the existing name and enter a new name in the **Organization name** field.
3. Click **Update profile**.

## Upload organization profile picture

You can add an image to represent your organization that is displayed next to its name in the organization switcher and navigation menu.
The image must be uploaded from your local device.
We recommend an image of at least 512px x 512px to display as your organization icon.
The minimum size allowed is 128px x 128px.

To upload an organization profile picture:

1. After logging in, select **General** in the navigation menu on the left side of the page.
2. Click **Upload image**.
3. Select an image from your computer's file system.

## Configure custom branding

You can replace the default Redocly branding in Reunite's interface with your own brand assets.
Use these options to create a white-labeled experience for your users.

### Enable custom branding

You can display your organization's logo across authentication screens and emails, and add custom legal messaging throughout the user registration process.

To enable custom branding:

1. After logging in, select **General** in the navigation menu on the left side of the page.
2. In the **Branding** section, select the **Enable custom branding** checkbox.

Your organization's logo (uploaded in the **Logo** section) is also displayed on emails and login pages.

### Hide Redocly branding

You can hide the platform attribution to Redocly in the login forms and in your project's footer area.

{% admonition type="info" name="Enterprise feature" %}
Hiding Redocly branding is available for Enterprise+ plans only.
{% /admonition %}

To hide Redocly branding:

1. After logging in, select **General** in the navigation menu on the left side of the page.
2. In the **Branding** section, check **Hide Redocly branding**.

Redocly branding is no longer displayed on the login screen and in the footer area.

### Add custom legal notices

You can add custom terms of service or other legal notices that users must accept to access your organization's projects.

To add custom legal notices:

1. After logging in, select **General** in the navigation menu on the left side of the page.
2. In the **Custom Terms of Service** section, click the **Write** tab.
3. Enter your custom terms text in the text area.
   You can use Markdown to format your text or include links.
4. Click **Preview** to see how your terms appear to users.

The terms are displayed to users on the registration page.

{% admonition type="info" name="Terms acceptance" %}
Users are required to accept your custom terms before they can access the project.
If you do not specify custom terms, the default message "Acceptance of the terms of service is required to use the service" is displayed.
{% /admonition %}

## Delete organization

When you delete an organization, the action is permanent, so be sure to back up any pertinent data.

{% admonition type="danger" %}
Deleting an organization is permanent - all associated projects, including API descriptions, documentation, and customer feedback, is lost.
Be sure to back up any pertinent data.

If you have an external repository connected to Reunite, data in that repository is not affected.
{% /admonition %}

1. After logging in, select **General** in the navigation menu on the left side of the page.
2. Click the **Delete** button for **Delete organization**.
3. Click **Remove** in the confirmation dialog.

## Leave organization

You can leave an organization if, for instance, you created it for someone else and no longer need access or you need to create another organization and have reached the limit on how many you can create.
When you leave an organization, the action is permanent, so be sure to back up any pertinent data.
If you are the sole user with the Owner in an organization, you must assign another user the Owner role before you can leave the organization.

1. After logging in, select **General** in the navigation menu on the left side of the page.
2. Click the **Leave** button for **Leave organization**.
3. Click **Remove** in the confirmation dialog.

## Resources

- **[Add an identity provider](./sso/add-idp.md)** - Configure identity providers for automated user management and authentication across your organization
- **[Manage organization-wide API keys](api-keys.md)** - Create and manage API keys that provide programmatic access to your organization's resources
- **[Teams and users](./teams.md)** - Organize users into teams with role-based permissions for effective collaboration and access control
- **[Single sign-on (SSO) configuration](../../config/sso.md)** - Complete SSO configuration reference with examples for various identity providers
