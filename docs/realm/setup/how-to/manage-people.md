# Manage people

The **People** page is where you can manage users.
If you are logged in to Reunite and have an [Owner organization role](../concepts/roles.md#organization-roles), you can view and manage users from the **People** page in the following ways:

- Invite users to your organization.
- Assign or change their organization roles.
- Add them to teams.
- Remove them from the organization.
- Link duplicate users.

Only users with an Owner organization role can access the **People** page.

The **People** page does not include options for determining who has access to projects.
Project access is determined by the permissions of the [teams](../concepts/teams.md) users are members of.
See [Configure RBAC](./rbac/index.md) for more information.
By default, users with the Owner or Member organization role can access all projects from the organization **Overview** page, unless restricted by RBAC.

## Invite people

Invite other users to your Reunite organization.

To directly invite people to your organization:

1. Click **Send Invite**.
1. Enter the **Email** address of the user you are inviting.
1. (Optional) Select **Teams** you want the user to be a member of.
1. Select the organization **Role** you want to assign to the user.
1. Click **Send invite**.

You can also give users single sign-on (SSO) access to your Reunite organization by [adding an identity provider](add-idp.md).

### Manage pending invites

Cancel or resend invitations to your Reunite organization. You can also view invitation details such as:
- When the invite was created
- When the invite expires
- Copy the invitation link for active (non-expired) invites

To cancel an invitation to people to your organization:

1. Select the **Invites** tab.
1. Click the more options menu icon for the invite.
1. Select **Cancel**.
1. Click **Yes**.

To resend an invitation to people to your organization:

1. Select the **Invites** tab.
1. Click the more options menu icon for the invite.
1. Select **Resend**.

{% admonition type="info" name="Invite expiration" %}
Invite links automatically expire after **7 days**. You can see when an invite link expires by hovering over the creation time column to display a tooltip with the exact expiration date and time. Expired invites are marked with a warning icon (⚠️) next to the creation time, and their invite links can no longer be copied or shared. You can resend expired invites to generate a new invite link.
{% /admonition %}

## Change organization role

Change the organization roles of other users in your Reunite organization.
You may need to update another user's organization role to Owner, for instance, if you need to leave the organization and you are the only Owner.
For more information on the organization roles see [Roles and permissions](../concepts/roles.md).

To change the organization role of a person in your organization:

1. Click the current organization role listed in the **Role** column for the person.
1. Select the new role from the list.

{% admonition type="warning" name="SSO overrides roles assigned on People page" %}
Organization roles assigned when [adding an identity provider](add-idp.md) override roles assigned in Reunite on the **People** page.
So if you change a user's role on the **People** page in Reunite, this role is only applied for the current session.
As soon as the user logs out and logs back in to Reunite, their role assigned by SSO is reassigned, overriding the role assigned on the **People** page.
{% /admonition %}

## Add people to teams

Add other users to teams in your Reunite organization.
Teams is a way to organize users and if you are using [RBAC](../concepts/rbac.md), you can grant permissions to the team that applies to all users included in the team.

{% admonition type="warning" name="Add team first" %}
You must add your team **before** you can complete these steps. See [Manage teams](manage-teams.md#create-a-new-team) for more information.
{% /admonition %}

To add a person to a team:

1. Select **People** in the navigation menu on the left side of the page.
2. Click the more options menu icon in the **Actions** column for the person and select **Add to team**.
3. Click into **Teams** text field and select team from list.
4. Click **Add**.

## Delete people from organization

Delete other users from your Reunite organization if they leave the company or no longer need access to the organization.

To delete a person from your organization:

1. Select **People** in the navigation menu on the left side of the page.
1. Click the more options menu icon in the **Actions** column for the person and select **Delete from organization**.
1. Click **Delete**.

## Link duplicate users

Users who commit content to your project either through an integrated Git connection or remote content source are automatically assigned a committer role and are displayed on your **People** page.
This automatic assignment may cause a single user to display as two different users on the **People** page if the user has an alternative email address for logging into the different systems.
You can link duplicate users with the committer role to member or owner user account so you don't have duplicate entries for a single user.

{% admonition type="warning" name="Viewer role cannot be linked" %}
You can't link users with the committer role to users with the viewer role, because the committer role is a paid seat and the viewer role is not.
{% /admonition %}

To link duplicate users:

1. Click the **Actions** menu icon for the user account with the committer role.
2. Select **Link to another member**.
3. Select the member you want to connect this user account to from the dropdown menu.
   You can also enter the user's name or email in the search box to find the user.
4. Click **Link**.

## Related how-tos

- [Add an identity provider](add-idp.md) to import users in bulk.

## Resources

- Learn more about assigning users to teams in the [Teams and users](../concepts/teams.md) conceptual documentation.
- Reference the [Single sign-on (SSO)](../../config/sso.md) configuration options to see example SSO configurations.
