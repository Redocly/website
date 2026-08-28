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

Use team-based access controls to assign permissions required to files and project access.
[RBAC (role-based access control)](../access/rbac.md) controls access.
By default, Redocly puts all authenticated users in the `authenticated` team and all unauthenticated users in the `anonymous` team.
You configure everything else through team-role mapping.

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
  This option also controls page access.

---

- features
- [[Features configuration](#features-configuration)]
- Describes feature access by team.
  Use this option when you need to manage access for specific features.

---

- teamFolders
- [[Team folder](#team-folder)]
- Use with pattern-based access to list the folders that pattern-based access can open.
  Only folders listed here can have access granted through pattern-based access.
  Use this option together with the `teamNamePatterns` option.

---

- teamFoldersBaseRoles
- [[Team to role map](#team-to-role-map)]
- Default access for named teams to the folders defined in the `teamFolders` list.

---

- teamNamePatterns
- [[Team name pattern](#team-name-pattern)]
- Team name pattern for giving pattern-based access to the folders in `teamFolders`.
  Use this option together with the `teamFolders` option.

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
  The team names include `anonymous` (all users without a login) and `authenticated` (all users with a login).
  Team names can also come from the identity provider through the [single-sign-on (SSO) configuration](./sso.md).
  In addition, the team name `*` represents the rest of the teams not defined in sibling properties including `anonymous` and `authenticated`.
  Possible values for project roles are: `none`, `read`, `write`, `triage`, `maintain`, or `admin`.
  {% partial file="../../_partials/config/_supported-config.md" variables={"optionName": "rbac"} /%}

{% /table %}

### Content configuration

{% table %}

- Option
- Type
- Description

---

- _{glob pattern}\*_
- [Map[string, string]](#team-to-role-map)
- Use a glob pattern linked to a map of teams and roles to define specific page access.
  Use the unique key `**` to describe all pages.

{% /table %}

{% admonition type="info" name="Wildcard key" %}

When describing team to project role relations, you can use a special key `*`.
The project role of that key applies to all teams that the glob pattern does not list.

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

---

- mcp
- Map[string, string](#team-to-role-map)
- Map of teams to roles to define the team and role for MCP server access.

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
  The `{teamPathSegment}` placeholder becomes the path segment.
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
  The `{teamPathSegment}` part names the path segment that receives the role, and the `{projectRole}` part sets the access level.
  Redocly converts the `{teamPathSegment}` segments to lower case.

{% /table %}

## Examples

### Use the access object (recommended)

The recommended way to configure `rbac` is within the `access` object:

```yaml {% title="redocly.yaml" %}
access:
  rbac:
    content:
      '**':
        authenticated: read
```

### Root-level configuration (deprecated)

{% admonition type="warning" name="Deprecated configuration" %}
Root-level `rbac` configuration displays warnings when the `access` object is present.
Migrate to the `access` object format.
{% /admonition %}

### File access

The following example gives default team permissions to all pages that do not match another glob pattern.
It gives different permissions to the `developer-keys.md` page, the pages in the `/secret/chapter` folder, and all TypeScript (`.tsx`) pages:

```yaml {% title="redocly.yaml" %}
access:
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
access:
  rbac:
    reunite:
      Developer: write
```

### Complete RBAC setup

The following example shows a comprehensive RBAC configuration with project access, content access, environment variables, and authentication requirements:

```yaml {% title="redocly.yaml" %}
access:
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

You can use environment variables for role assignments, which helps with different deployment environments:

```yaml {% title="redocly.yaml" %}
access:
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
access:
  rbac:
    content:
      '**':
        authenticated: read
```

This configuration directs users to a login page where they can authenticate using configured identity providers.

### Pattern-based access

Define the folders and the patterns that the team names match.
The following example shows the curly braces `{` and `}` and the placeholder names exactly as you write them in a configuration file.

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
access:
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

```yaml {% title="redocly.yaml" %}
access:
  rbac:
    features:
      aiSearch:
        authenticated: read
```

The `mcp` feature controls access to the MCP server in the same way.
In the following example, only members of the Developers team can access the MCP server, and all other users cannot.

```yaml {% title="redocly.yaml" %}
access:
  rbac:
    features:
      mcp:
        Developers: read
```

When you set a team-based role for the `mcp` feature, only teams with a role other than `none` can access the MCP server.
Users must sign in unless the `anonymous` team has such a role, either directly or through the `*` wildcard.
The wildcard covers all teams that are not listed explicitly, including `anonymous`.

### Disallow access to one specific page

In the following example, members of the Developers team can access Markdown files in the `/security` folder, except `top-secret.md`.
That file has the `none` value for Developers in its front matter.

```yaml {% title="redocly.yaml" %}
access:
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

- **[Role-based access control (RBAC) concepts](../../access/rbac.md)** - Understand the fundamentals and components of RBAC systems for comprehensive access management
- **[RBAC configuration guide](../../access/index.md)** - Complete implementation guide with examples for projects, pages, and navigation access control
- **[Front matter configuration](../front-matter-config.md)** - Configure role-based access on individual pages using front matter for granular permission control
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
- **[SSO configuration](./sso.md)** - Configure single sign-on to identify users and integrate with RBAC for comprehensive authentication and authorization
- **[SSO Direct configuration](../ssoDirect.md)** - Configure direct SSO integration for streamlined user identification and RBAC implementation
- **[Requires login configuration](./requires-login.md)** - Set up login requirements to enforce authentication before accessing RBAC-protected content
- **[MCP server](../../customization/mcp-server/index.md#restrict-access-to-the-mcp-server)** - Restrict MCP server access to specific teams with the `mcp` feature role
