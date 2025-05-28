# Configure role-based access control (RBAC)

With role-based access control (RBAC), you can configure user access to view, create, edit or remove content in your project.

Once configured, RBAC permissions can apply to the following content in your project:

- search results
- navigation elements
- entire Markdown, React, API document pages
- part of Markdown or React pages

RBAC permissions also apply to both organization and project settings.

## Assign organization roles

When you invite users to an organization, you must assign them to one of the [organization roles](../../concepts/roles.md#organization-roles): viewer, billing, member, or owner.
If your users log in using an identity provider you have added in Reunite, they are assigned the default organization role you set when you added the IdP.
Users with an Owner role can access the **Admin** panel and update the organization roles of other users from the **People** page.

{% admonition type="info" %}

The default role assigned when a user logs in with an IdP cannot be permanently updated in Reunite on the **People** page.
If you want to assign users who log in with an IdP a different organization role or RBAC team role, you just set up [team mapping](../add-idp.md#team-mapping) in Reunite.

{% /admonition %}

Only users with an owner role in the organization can assign organization roles to other users.
Most users in your organization should have the member role, giving them access to the **Project** panel only.
From the **Projects** panel on the **Overview** page, members can select only the projects they have access to.
Access to projects is determined by the project roles assigned to the teams users are members of.

## Assign project roles

[Project roles](../../concepts/roles.md#project-roles) determine user access to the individual projects in your organization.
You add users to teams and then assign project roles to the teams.
User access is determined by the project roles assigned to the teams users are members of.
Project roles can be configured by users with a member or owner organization role, if they have been assigned to a team with the `write`, `maintain`, or `admin` project role for that project.

## Before you begin

Make sure you have the following before you begin:

- a `redocly.yaml` file in the root of your project
- [SSO configuration](../../../config/sso.md) in your `redocly.yaml` file
- Owner or member organization role
- `write`, `maintain`, or `admin` project role

## Configure project roles

To configure project roles, assign project roles to teams scoped by resource identifiers.
RBAC configurations are placed in different places in your project, depending on the following levels of granularity:

- [For projects](projects.md): Globally in the `redocly.yaml` file in the `rbac` configuration.
- [For pages](page-permissions.md): In the content or front matter of Markdown documents, API definitions, or Typescript pages in the `rbac` configuration.
- [For navigation](links-and-groups-permissions.md): In the navbar, footer, or sidebar navigation menu `rbac` configurations in the `redocly.yaml` or `sidebars.yaml` configuration files.

## Assign roles to specified teams

To assign a role to specified teams for project access:

In your `redocly.yaml` configuration file, add the team names with the value of the role you want to assign them in the `rbac` configuration under the `reunite` object.
For example, the following example configuration assigns the `write` role to the `Writers` team in the project:

```yaml
rbac:
  reunite:
    Writers: write
```

## Assign roles to unspecified teams

If you want to provide access to one team, and limit access to all other teams for a specific resource identifier, you can use the `*` symbol.

To assign a role to unspecified teams for files access:

1. In your `redocly.yaml` configuration file, add the glob pattern scope option in the `rbac` configuration under the `content` object.
   For example, the following example configuration creates a scope that includes all Markdown files:
   ```yaml
   rbac:
     content:
       '*.md':
   ```
2. Add the team names with the value of the role you want to assign them.
   For example, the following example configuration assigns the `write` role to the `Writers` team in the `*.md` scope:
   ```yaml
   rbac:
     content:
       '*.md':
         Writers: write
   ```
3. Add the `*` symbol with the value of the role you want to assign to all other teams.
   For example, the following example configuration assigns the `read` role to all teams except the `Writers` team for all Markdown pages:
   ```yaml
   rbac:
     content:
       '*.md':
         Writers: write
         '*': read
   ```

## Resources

- [RBAC (role-based access control)](../../concepts/rbac.md) overview.
- See full configuration details in the [`rbac` configuration reference](../../../config/rbac.md).
- Check out the [x-rbac OpenAPI extension documentation](../../../author/reference/openapi-extensions/x-rbac.md) to apply RBAC permissions to specific objects in OpenAPI reference documentation.

