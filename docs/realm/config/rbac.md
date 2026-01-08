---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
description: Use team-based access controls to assign permissions required to files and project access.
---
# `rbac`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Access control is done using [RBAC (role-based access control)](../access/rbac.md).
{% $frontmatter.description %}
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
- [Map[string, string]](#team-to-role-map)]
- Map of teams to roles.
  Use this option when needs to manage project access to a specific team, like allowing the team to manage branches or builds.

---

- content
- [[Content configuration](#content-configuration)]
- Describes file access for the given team.
  Use this option when needs to manage file access to a specific team.
  This option is used for page access as well.

---

- features
- [[Features configuration](#features-configuration)]
- Describes feature access by team.
  Use this option when you need to manage access for specific features.

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
  The team names come from a possible list of `anonymous` (meaning all users who are not logged in), `authenticated` (meaning any user who is logged in), and team names that come from the identity provider through the [single-sign-on (SSO) configuration](./sso.md).
  In addition, the team name `*` represents the rest of the teams not defined in sibling properties including `anonymous` and `authenticated`.
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
- [Map[string, string]](#team-to-role-map)
- Use the glob pattern to define linked to a map of teams and role for specific page access, or using the unique key `**` to describe all pages.

{% /table %}

{% admonition type="info" %}

When describing team to project role relations, a special key `*` may be used.
A project role assigned to that key will be applied to the rest of the teams that are not described for the given glob pattern.

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
- Map[string, string](#team-to-role-map)
- Map of teams to roles to define the team and role for AI search feature access.

{% /table %}

### Team folder

{% table %}

- Option
- Type
- Description

---

- teamPathSegment
- string
- Team folder pattern.
  The `{teamPathSegment}` segment is used as the path segment.
  Example: `/some/path/_{teamPathSegment}_`

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
  and the `{projectRole}` part sets the access level.
  The `{teamPathSegment}` segments are transformed to lower case.

{% /table %}

## Examples

### File access

In the following example, default team permissions are assigned
to all pages that do not match any other glob patterns.
Different permissions are assigned to the `developer-keys.md` page,
the pages in the `/secret/chapter` folder, and any TypeScript (`.tsx`) pages:

```yaml {% title="redocly.yaml" %}
rbac:
  content:
    '**':
      Admin: admin
      Developer: maintain
      Employee: read
      authenticated: read
    developer-keys.md:
      Developer: read
    '/secret/chapter':
      Admin: write
      Developer: read
      Employee: read
    '**/*.tsx':
      Developer: write
```

### Project access

In the following example, only the Developer team can create a branch, create a pull request, or create a deployment.

```yaml {% title="redocly.yaml" %}
rbac:
  reunite:
    Developer: write
```

### Complete RBAC setup

The following example shows a comprehensive RBAC configuration with project access, content access, environment variables, and authentication requirements:

```yaml {% title="redocly.yaml" %}
rbac:
  # Project administration access
  reunite:
    Developers: write
    Writers: read
    Admin: admin
  
  # File and content access
  content:
    # Default permissions for all files
    '**':
      Developers: maintain
      Writers: write
      authenticated: read
    
    # Specific permissions for sensitive files
    'security/*.md':
      Admin: admin
      Developers: read
    
    # API documentation access
    'apis/**':
      Developers: write
      Writers: read

  # Feature access
  features:
    aiSearch:
      authenticated: read
```

### Use environment variables

Environment variables can be used for role assignments, useful for different deployment environments:

```yaml {% title="redocly.yaml" %}
rbac:
  reunite:
    Writers: '{{process.env.RBAC_WRITERS_ROLE}}'
    Developers: '{{process.env.RBAC_DEVELOPERS_ROLE}}'
  content:
    '**':
      Developers: '{{process.env.RBAC_DEFAULT_ROLE}}'
      authenticated: read
```

### Require authentication

To require users to log in before viewing any content:

```yaml {% title="redocly.yaml" %}
rbac:
  content:
    '**':
      authenticated: read
```

This configuration creates a login page where users authenticate using configured identity providers.

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

```yaml {% title="redocly.yaml" %}
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
      authenticated: read
```

### Disallow access to one specific page

In the following example, members of the Developers team can access Markdown files in the `/security` folder, with the exception of `top-secret.md` that has the `none` value for Developers in the front matter of the file.

```yaml {% title="redocly.yaml" %}
rbac:
  content:
    'security/*.md':
        Admin: admin
        Developers: read
```

```md {% title="security/top-secret.md" %}
---
rbac:
  Admin: admin
  Developers: none
---
```

## Resources

- **[Role-based access control (RBAC) concepts](../access/rbac.md)** - Understand the fundamentals and components of RBAC systems for comprehensive access management
- **[RBAC configuration guide](../access/index.md)** - Complete implementation guide with examples for projects, pages, and navigation access control
- **[Front matter configuration](./front-matter-config.md)** - Configure role-based access on individual pages using front matter for granular permission control
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
- **[SSO configuration](./sso.md)** - Configure single sign-on to identify users and integrate with RBAC for comprehensive authentication and authorization
- **[SSO Direct configuration](./ssoDirect.md)** - Configure direct SSO integration for streamlined user identification and RBAC implementation
- **[Requires login configuration](./requires-login.md)** - Set up login requirements to enforce authentication before accessing RBAC-protected content
