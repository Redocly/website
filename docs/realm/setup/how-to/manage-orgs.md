# Manage organizations

Organizations are the top-level structure in Reunite where users with the [Owner role](../concepts/roles.md#organization-roles) can view and manage global settings for your projects.
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

## Related how-tos

* [Add an identity provider](add-idp.md)
* [Manage organization-wide API keys](api-keys.md)

## Resources

* Learn more about [Teams and users](../concepts/teams.md)
* Reference the [Single sign-on (SSO)](../../config/sso.md) configuration options
