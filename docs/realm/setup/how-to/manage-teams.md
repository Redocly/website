# Manage teams

The **Teams** page is where you can manage teams.
If you are logged in to Reunite and have an [Owner organization role](../concepts/roles.md#organization-roles), you can view and manage teams from the **Teams** page in the following ways:

- Create a new team.
- Add members to a team.
- Remove members from a team.
- Rename a team.
- Delete a team from your organization.

Only users with an Owner organization role can access the **Teams** page.

The **Team** page does not include options for determining who has access to projects.
Project access is determined by the permissions of the [teams](../concepts/teams.md) users are members of.
Team permissions are configured in the `redocly.yaml` file for each individual project.
See [Configure RBAC](./rbac/index.md) for more information.

## Create a new team

You can create a new team to organize users or in preparation for setting up RBAC.
You have the option to add members to your new team.
Members are users that have already been added to Reunite.

To create a new team:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click **New team**.
3. Enter a name for the team.
4. (Optional) Select members from the organization to add to the team.
5. Click **Create**.

## Add members to a team

You can add members to a team to give them specific permissions assigned in the `redocly.yaml` file for a project.

To add members to a team:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click **+ Add members**.
3. Select members from the organization to add to the team.
4. Click **Add members**.

## Remove members from a team

If a user no long needs permissions granted to a team, you can remove them from the team.

To remove members from a team:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click the team.
3. Select **Remove** for the user.
4. Click **Remove**.

## Rename a team

Rename a team from the **Teams** page using the following steps:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click the more options menu icon and select **Rename**.
3. Enter a new name.
4. Click **Save**.

## Delete a team

Delete a team from the **Teams** page using the following steps:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click the more options menu icon and select **Delete**.
3. Click **Delete**.

## Related how-tos

- [Configure RBAC](./rbac/index.md)
- [Manage people](manage-people.md)

## Resources

- Learn more about [Teams and users](../concepts/teams.md)
- Reference the [RBAC](../../config/rbac.md) configuration options
