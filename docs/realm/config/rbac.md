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
# `rbac`

Access control is done using [RBAC (role-based access control)](../access/rbac.md).
Use team-based access controls to assign permissions required to files and project access.
By default, all authenticated users are assigned to the `authenticated` team, and unauthenticated users are automatically assigned to the `anonymous` team.
All other configuration is done through team-role mapping.

## Options

### Configuration map

{% table %}

- Option
- Type
- Description

---

- reunite
- [[Team to role map](#team-to-role-map)]
- Describes project role for the given team. Use this option when needs to manage project access to a specific team, like allowing the team to manage branches or builds.

---

- content
- [[Content configuration](#content-configuration)]
- Describes file access for the given team. Use this option when needs to manage file access to a specific team. This option is used for page access as well.

---

- features
- [[Features configuration](#features-configuration)]
- Describes feature access by team. Use this option when you need to manage access for specific features.

---

- teamFolders
- [[Team folder](#team-folder)]
- Use with pattern-based access to describe the folders that can be accessed in this way.
  Only folders listed here can have access granted through pattern-based access.
  This option is used in combination with the `teamNamePatterns` option.

---

- teamFoldersBaseRoles
- [[Team to role map](#team-to-role-map)]
- Default access for named teams to the folders defined in the `teamFolders` list.

---

- teamNamePatterns
- [[Team name pattern](#team-name-pattern)]
- Team name pattern for giving pattern-based access to the folders in `teamFolders`.
  This option is used in combination with the `teamFolders` option.

{% /table %}

### Team to role map

{% table %}

- Option
- Type
- Description

---

- _team name_
- `none`, `read`, `write`, `triage`, `maintain`, or `admin`
- Map of teams to project roles.
  The team names come from a possible list of `anonymous` (meaning all users who are not logged in), `authenticated` (meaning any user who is logged in), and team names that come from the identity provider through the [single-sign-on (SSO) configuration](./sso.md). In addition, the team name `*` represents the rest of the teams not defined in sibling properties including `anonymous` and `authenticated`.
  Possible values for project roles are: `none`, `read`, `write`, `triage`, `maintain`, or `admin`.
  {% partial file="../_partials/config/_supported-config.md" variables={"optionName": "rbac"} /%}

{% /table %}

### Content configuration

{% table %}

- Option
- Type
- Description

---

- _{glob pattern}\*_
- [[Team to role map](#team-to-role-map)]
- Use the glob pattern to define the team and role for specific page access, or using the unique key `**` to describe all pages.

{% /table %}

{% admonition type="info" %}

When describing team to project role relations, a special key `*` may be used. A project role assigned to that key will be applied to the rest of the teams that are not described for the given glob pattern.

In the following example, only users assigned to the Admin team can view the content on the `secrets.md` file:

```yaml
rbac:
  content:
    secrets.md:
      'Admin': read
```

{% /admonition %}


### Features configuration

{% table %}

- Option
- Type
- Description

---

- aiSearch
- [[Team to role map](#team-to-role-map)]
- Use a glob pattern to define the team and role for specific feature access.

{% /table %}

### Team folder

{% table %}

- Option
- Type
- Description

---

- /some/path/_{teamPathSegment}_
- `string`
- Team folder pattern. The `{teamPathSegment}` segment is used as the path segment.

{% /table %}

### Team name pattern

{% table %}

- Option
- Type
- Description

---

- PREFIX-_{teamPathSegment}-{projectRole}_
- `string`
- The format that the team name follows.
  The prefix is optional but can be useful if you have many teams.
  The `{teamPathSegment}` is used as the path segment where the role access is applied,
  and the `{projectRole}` part sets the access level. The `{teamPathSegment}` segments are transformed to lower case.

{% /table %}

## Examples

### File access

In the following example, default team permissions are assigned
to all pages that do not match any other glob patterns.
Different permissions are assigned to the `developer-keys.md` page,
the pages in the `/secret/chapter` folder, and any TypeScript (`.tsx`) pages:

```yaml
rbac:
  content:
    '**':
      Admin: admin
      Developer: maintain
      Employee: read
      anonymous: none
      authenticated: read
    developer-keys.md:
      Developer: read
    '/secret/chapter':
      Admin: write
      Developer: read
      Employee: read
      authenticated: none
    '**/*.tsx':
      Developer: write
```

### Project access

In the following example, only the Developer team can create a branch, create a pull request, or create a deploy.

```yaml
rbac:
  reunite:
    Developer: write
```

### Pattern-based access

Define the folders and the patterns that the team names match.
The following is an example configuration; the curly braces `{` and `}` and the placeholder names are shown as they should be used in a configuration file.

```yaml
  teamFolders:
    - /docs/{teamPathSegment}
    - /apis/{teamPathSegment}
  teamNamePatterns:
    - REDOCLY-{teamPathSegment}-{projectRole}
    - BUSINESS-{teamPathSegment}-{projectRole}
```

Given the above configuration and the following list of team names:

- REDOCLY-PEARL-triage
- REDOCLY-PEARL-admin
- BUSINESS-AMETHYST-maintain

The effective access control settings would be like the following example configuration:

```yaml
rbac:
  reunite:
    REDOCLY-PEARL-triage: triage
    REDOCLY-PEARL-admin: admin
    BUSINESS-AMETHYST-maintain: maintain
  content:
    '/docs/pearl/**':
      REDOCLY-PEARL-triage: triage
      REDOCLY-PEARL-admin: admin
      authenticated: read
    '/apis/pearl/**':
      REDOCLY-PEARL-triage: triage
      REDOCLY-PEARL-admin: admin
      authenticated: read
    '/docs/amethyst/**':
      BUSINESS-AMETHYST-maintain: maintain
      authenticated: read
    '/apis/amethyst/**':
      BUSINESS-AMETHYST-maintain: maintain
      authenticated: read
```

### Feature access

In the following example, anonymous users have no access to the AI search feature,
while authenticated users can access the AI search feature.

```yaml
rbac:
  features:
    aiSearch:
      anonymous: none
      authenticated: read
```

## Related options

- [sso](./sso.md) is used to identify users.
- [ssoDirect](./ssoDirect.md)
- [requiresLogin](./requires-login.md) reference

## Resources

- [Role-based access control (RBAC)](../access/rbac.md) concept
- [How to configure RBAC](../access/index.md) with additional information and examples for projects, pages, and navigation.
- [Pattern-based team access](../access/pattern-access.md) guide and usage examples.
- Use [front matter](./front-matter-config.md) to configure role-based access on individual pages.
- Explore other [configuration options](./index.md) for your project.
