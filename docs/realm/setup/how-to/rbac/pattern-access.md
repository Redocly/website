# Grant pattern-based access to teams

To streamline onboarding teams to access specific content sections, pattern-based access can help.
This feature allows you to define templates for content structure that can be accessed through pattern-based access controls.
You can either grant access to named teams to these folders, or use pattern-based team names to give each team access to the appropriate content.

## List the folders for pattern-based access

Only the folders that match the patterns list in `teamFolders` can be accessed by pattern-based access.
The following example shows how to include per-directory access within both the `docs/` and the `apis/` folders:

```yaml
  teamFolders:
    - /docs/{teamPathSegment}
    - /apis/{teamPathSegment}
```

The part of the path that matches `{teamPathSegment}` can be used to grant access to members of teams with names that match a pattern including the path segment.

## Add base roles

To grant access to named teams to all the pattern-based folders, use the `teamFoldersBaseRoles` RBAC configuration.
To grant write access to "Developer" team members and admin access to "Admin" team members, use a configuration like the following example:

```yaml
  teamFoldersBaseRoles:
    Admins: admin
    Developers: write
```

These teams have access to all the paths that match the `teamFolders` entry in your configuration file.

## Define team name patterns

Choose a pattern that works for your organization's team naming convention.
In this example, we are using a prefix as well as the `{teamPathSegment}` and `{projectRole}` segments in the pattern.
The configuration looks like the following snippet:

```yaml
  teamNamePatterns:
    - INTERNAL-{teamPathSegment}-{projectRole}
    - INTERNAL-BUSINESS-{teamPathSegment}-{projectRole}
```

With this configuration, some examples of granted access would be:

- Team `INTERNAL-accounts-write` gets write access to `/docs/accounts/**` and `/apis/accounts/**`.
- Team `INTERNAL-BUSINESS--metrics-maintain` gets maintain access to `/docs/metrics/**` and `/apis/metrics/**`.
- TEAM `PARTNER-important-admin` gets no access since they don't match the team name pattern.

You can also have `teamPathSegment` and `projectRole` in separate patterns.

```yaml
  teamNamePatterns:
    - INTERNAL_TEAM-{teamPathSegment}
    - INTERNAL_ROLE-{projectRole}
```

## Resources

- Learn more about [RBAC (role-based access control)](../../concepts/rbac.md) in the concept documentation.
- Follow step-by-step instructions for [How to configure RBAC](./index.md).
- See full configuration details in the [`rbac` configuration reference](../../../config/rbac.md).
- [How to configure RBAC](index.md) with additional information and examples for projects, pages, and navigation.
- Check out the [x-rbac OpenAPI extension documentation](../../../author/reference/openapi-extensions/x-rbac.md) to apply RBAC permissions to specific objects in OpenAPI reference documentation.
