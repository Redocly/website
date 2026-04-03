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
# Roles and permissions

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Roles and permissions are used to configure [role-based access control (RBAC)](./rbac.md) for your projects.

A permission is a key that grants access to some piece of functionality.
A role is a unique set of permissions.

You can assign the following two types of roles to users:

- **Organization roles:** Manages access to the organization.
- **Project roles:** Manages access to the project and its resources.

A combination of organization and project roles defines a user's access.

## Organization roles

Organization roles control access to your Redocly organization.
With SSO, role information usually comes from your identity provider through claims or attributes, similar to how teams are configured.

### Reserved organization role names

Redocly recognizes these special role names from your identity provider:

- **`redocly.owners`** (`owner`): Has permission to everything, including the ability to invite people, change access controls, and review feedback.
  Has admin access to all organization projects by default.
- **`redocly.members`** (`member`): Can see other members of the organization.
  Cannot change access controls, invite people, see feedback, or manage organization settings.
- **`redocly.billing`** (`billing`): Can manage billing of the organization.
- **`redocly.viewers`** (`viewer`): Has read-only permission and restricted access.

### Organization role priority with SSO

For **corporate** identity providers in Reunite, each SSO sign-in compares:

- The **IdP-derived role** from the teams claim (reserved `redocly.*` groups), or the **default organization role** on the IdP when no reserved group matches.
- The **stored role** Reunite already saves for that member.

Reunite keeps the **stronger** of the two.
A stronger IdP-derived role **promotes** the member.
A weaker IdP-derived role does **not** lower the stored role on that sign-in.

**Guest** identity providers do not use this merge. They follow IdP mapping only.

**Strength** from highest to lowest:

1. Owner (`redocly.owners`)
2. Member (`redocly.members`)
3. Committer (see [Special roles](#special-roles))
4. Billing (`redocly.billing`)
5. Viewer (`redocly.viewers`, `redocly.participants`)

When the teams claim includes **more than one** reserved group for a user, Reunite evaluates them in this **order** and uses the **first** match: `redocly.owners`, `redocly.members`, `redocly.billing`, `redocly.viewers`, `redocly.participants`.
For example, a user in both `redocly.owners` and `redocly.members` receives an IdP-derived role of **Owner**.

To reduce access, update the identity provider so claims no longer map to a stronger role than you intend, then use the **People** page if you still need to change the stored role.
If claims still map to a stronger role, the next corporate SSO sign-in can **promote** the member again.

### How organization roles are assigned

Organization roles are assigned differently depending on your authentication method:

**With SSO/Identity Provider:**
- Configure your identity provider to send the correct groups and default organization role for each user.
- For **corporate** IdP, Reunite merges IdP data with the stored role as described in [Organization role priority with SSO](#organization-role-priority-with-sso).

**With Redocly's login system:**
- Organization owners can **manually assign roles** from the [People page](../reunite/organization/manage-people.md#change-organization-role)
- Roles are set and managed directly within Redocly's interface

### Special roles

- **`committer`**: Automatically assigned to users who commit content to the project through an integrated Git connection or remote content source.
  You cannot assign the committer role; it can only be automatically assigned.
  Users with the committer role cannot access Reunite.

{% admonition type="warning" name="Duplicate users" %}
Users who commit content to your project either through an integrated Git connection of remote content source are automatically assigned a committer role and are displayed on your **People** page.
This automatic assignment may cause a single user to display as two different users on the **People** page if the user has an alternative email address for logging into the different systems.
You can [link duplicate users](../reunite/organization/manage-people.md#link-duplicate-users) with the committer role to their Reunite user account so you don't have duplicate entries for a single user.
{% /admonition %}

Users with an `owner` organization role can also do the following from the Admin panel:

- invite users to the organization
- update other users' organization roles
- view and update organization settings
- view and update organization SSO and login details
- view and update organization API keys
- view and create teams
- assign users to teams
- assign managers to teams

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

- **[Single sign-on (SSO)](../reunite/organization/sso/sso.md)** - Add corporate and guest IdPs, team mapping, and how SSO relates to organization roles
- **[RBAC concepts](./rbac.md)** - Understand the different components involved in Redocly's role-based access control system and how they work together
- **[Teams and users management](../reunite/organization/teams.md)** - Configure teams and manage user assignments, including adding users to multiple teams for flexible access control
- **[RBAC configuration guide](./index.md)** - Step-by-step instructions for implementing RBAC with examples for projects, pages, and navigation
- **[RBAC configuration reference](../config/access/rbac.md)** - Complete configuration details and options for role-based access control implementation
- **[Link duplicate users](../reunite/organization/manage-people.md#link-duplicate-users)** - Resolve duplicate user entries by linking committer accounts to their Reunite user accounts
