# Roles and permissions

Roles and permissions are used to configure [role-based access control (RBAC)](./rbac.md) for your projects.

A permission is a key that grants access to some piece of functionality.
A role is a unique set of permissions.

You can assign the following two types of roles to users:

- **Organization roles:** Manages access to the organization.
- **Project roles:** Manages access to the project and its resources.

A combination of organization and project roles defines a user's access.

## Organization roles

When users are invited to an organization, they are assigned to one of the following organization roles:

- `viewer`: Has read-only permission and restricted access.
- `billing`: Can manage billing of the organization.
- `member`: Can see other members of the organization. Cannot change access controls, invite people, see feedback, or manage organization settings.
- `committer`: Automatically assigned to users who commit content to the project through an integrated Git connection or remote content source.
  You cannot assign the committer role; it can only be automatically assigned.
  Users with the committer role cannot access Reunite.
- `owner`: Has permission to everything, including the ability to invite people, change access controls, and review feedback. Has admin access to all organization projects by default.

{% admonition type="warning" name="Duplicate users" %}
Users who commit content to your project either through an integrated Git connection of remote content source are automatically assigned a committer role and are displayed on your **People** page.
This automatic assignment may cause a single user to display as two different users on the **People** page if the user has an alternative email address for logging into the different systems.
You can [link duplicate users](../how-to/manage-people.md#link-duplicate-users) with the committer role to their Reunite user account so you don't have duplicate entries for a single user.
{% /admonition %}

Users with an `owner` organization role can also do the following from the Admin panel:

- invite users to the organization
- update other users' organization roles
- view and update organization settings
- view and update organization SSO and login details
- view and update organization API keys
- view and create teams
- assign users to teams

Most users in your organization should have the member role, giving them access to the project panel only.
From the project panel members can select projects and their access to those projects is determined by their project roles.
For specific project functionality access, project roles are assigned to teams of users.

## Project roles

Project roles are assigned to teams for each specific project in the `redocly.yaml` configuration file.

The following is a list of available project roles:

- `none`: grants no access permissions
- `read`: grants read-only access to files or pages; Pro and Enterprise only
- `triage`: grants read access to files or pages; also grants the ability to see logs and other information; for contributors who need to proactively manage issues, discussions, and pull requests but do not need write access; Enterprise only
- `write`: grants read and write access to files or pages; also the ability to comment on reviews; for contributors who actively push updates to your project; Enterprise only
- `maintain`: grants all access permissions except the ability to manage users and permissions; for contributors who need to manage the repository but do not need access to sensitive data or destructive actions; Enterprise only
- `admin`: grants all access permissions; for people who need full access to the project, including sensitive data and destructive actions like managing security or deleting a repository

When users become members of a team, they are granted access based on the roles assigned to the team.

## Resources

- To understand more about the different components involved in Redocly's RBAC, read the [Role-based access control (RBAC) concept documentation](./rbac.md).
- [Teams and users](./teams.md) can be configured as needed, including adding users to multiple teams.
- [How to configure RBAC](../how-to/rbac/index.md) with additional information and examples for projects, pages, and navigation.
- See full configuration details in the [`rbac` configuration reference](../../config/rbac.md).
- You can [link duplicate users](../how-to/manage-people.md#link-duplicate-users) with the committer role to their Reunite user account so you don't have duplicate entries for a single user.

