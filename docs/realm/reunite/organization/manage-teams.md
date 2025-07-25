# Manage teams

The **Teams** page is where you can manage teams.
If you are logged in to Reunite and have an [Owner organization role](../../access/roles.md#organization-roles), you can view and manage teams from the **Teams** page in the following ways:

- create a new team
- add members to a team
- assign team managers
- demote team managers
- remove members from a team
- rename a team
- delete a team from your organization

Only users with an Owner organization role and members assigned as team managers can access the **Teams** page.
Team managers can only view and manage their assigned teams.

The **Team** page does not include options for determining who has access to projects.
Project access is determined by the permissions of the [teams](./teams.md) users are members of.
Team permissions are configured in the `redocly.yaml` file for each individual project.
See [Configure RBAC](../../access/index.md) for more information.

## Create a new team

You can create a new team to organize users or in preparation for setting up RBAC.
You have the option to add members to your new team.
Members are users that have already been added to Reunite.

To create a new team:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click **New team**.
3. Enter a name for the team.
4. (Optional) Select members from the organization to add to the team.
5. (Optional) Select managers from the organization to add to the team.
6. Click **Create**.

## Add members to a team

You can add members to a team to give them specific permissions assigned in the `redocly.yaml` file for a project.

To add members to a team:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click **+ Add members & managers** or **+ Add members** (depending on role) in team's more options menu or button on the team's page.
3. Select members from the organization to add to the team.
4. Click **Add**.

## Assign team managers

You can assign team managers to a team to give them control over team composition and team name.
**Only users with the Member and Owner organization roles can become team managers.**

To add a manager to a team:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click **+ Add members & managers** in team's more options menu or button on the team's page.
3. Select members from the organization to add to the team as managers.
4. Click **Add**.

You can also assign team managers from among existing team members using the team member's more options menu:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click a team you want to edit.
3. Click a team manager's more options menu and select **Make team manager**.

## Demote team managers

You can demote team managers that no longer need their privileges.

To demote a team manager:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click a team you want to edit.
3. Click a team manager's more options menu and select **Demote from manager**.

## Remove members from a team

If a user no long needs permissions granted to a team, you can remove them from the team.

To remove members from a team:

1. Select **Teams** in the navigation menu on the left side of the page.
2. Click the team.
3. Click a user's more options menu and select **Remove from team**.
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

## Resources

- [Configure RBAC](../../access/index.md)
- [Manage people](manage-people.md)
- Learn more about [Teams and users](./teams.md)
- Reference the [RBAC](../../config/rbac.md) configuration options
