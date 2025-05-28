# Teams and users

Teams and users are an important part of configuring [role-based access control (RBAC)](./rbac.md) for your projects.

Teams are groups of users; you can assign users to more than one team.
Add users to teams in one of the following ways:

- [Import teams with your SSO identity provider](../how-to/add-idp.md#team-mapping).
- [Assign users to teams with an invitation](../how-to/manage-people.md#invite-people).
- [Add users to teams in Reunite](../how-to/manage-teams.md#add-members-to-a-team).

{% admonition type="info" %}

Team names used in the [team mapping single sign-on settings](../how-to/add-idp.md#team-mapping) or added in Reunite **must** match the names listed in the `rbac` configuration in your `redocly.yaml` file for the permissions to be granted.
Teams assigned in the SSO settings override teams assigned in Reunite.

{% /admonition %}

Redocly also provides default teams.

## Default teams

Redocly provides a few built-in teams that are applied to users automatically:

- `authenticated`: This team is assigned to all authenticated users in addition to the teams assigned from the IdP (identity provider).
- `anonymous`: This team is assigned to all unauthenticated users.

Without a `rbac` configuration, `authenticated` and `anonymous` teams do not influence resource access.
These default teams can be useful when you do not need to set up granular permissions and only want to restrict access to unauthenticated users.

For example, the following `rbac` configuration allows users in the `authenticated` team `read` access to all files in a project:

```yaml
rbac:
  content:
    '**':
       authenticated: read
```

{% admonition type="warning" %}
The `authenticated` and `anonymous` names are reserved team names. If you define a team with the same name in the `redocly.yaml` file, it won't work as expected.
{% /admonition %}

### Team mapping

Redocly also includes the following built-in teams based on organization roles in Reunite:

- `redocly.owners`: This team is assigned to all users with the owner organization role.
- `redocly.members`: This team is assigned to all users with the member organization role.
- `redocly.viewers`: This team is assigned to all users with the viewer organization role.
- `redocly.billing`: This team is assigned to all users with the billing organization role.

These teams are useful when adding an identity provider (IdP) in Reunite.
You have the option when adding an IdP to configure team mapping.
Team mapping is a way to connect groups in your IdP to RBAC teams in Reunite.
Otherwise, when users log in with an IdP, the groups assigned in the IdP override the RBAC teams assigned in Reunite.
See the SSO concept documentation for more information on [team mapping](sso.md#team-mapping).

## Multiple teams

If users belong to multiple teams, they have the combination of the roles assigned to their teams.

For example, the following configuration defines the `Developers` team with the `write` role and the `authenticated` team with the `read` role for the `**` scope.

```yaml
rbac:
  reunite:
    anonymous: read
    authenticated: read
    Developers: write
  content:
    '**':
      anonymous: read
      authenticated: read
      Developers: write
    docs/**/*.md:
      Developers: read
      authenticated: read
```

As a result, users in both the `Developers` and `authenticated` teams have `write` role permissions for the other resources, but only `read` role permissions for the `docs/**/*.md` resources.

## Resources

- To understand more about the different components involved in Redocly's RBAC, read the [Role-based access control (RBAC) concept documentation](./rbac.md).
- [Roles and permissions](./roles.md) describe the access that can be granted.
- [How to configure RBAC](../how-to/rbac/index.md) with additional information and examples for projects, pages, and navigation.
- See full configuration details in the [`rbac` configuration reference](../../config/rbac.md).
