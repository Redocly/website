# Configure RBAC for projects

Configure RBAC globally inside the `redocly.yaml` file in the root of your project.
Team role assignments in the `redocly.yaml` file are applied to all pages in your project, unless there are `rbac` configurations in the front matter or content of a page.
RBAC configuration has two different scopes to manage access: files and project access. Files access is specified under `content` object and project administration access under `reunite`.

## Specify roles in the defaults scope

The defaults scope sets team permissions for otherwise non-specified files.
If you do not set the defaults scope, teams are assigned the `write` role as the public scope for any unspecified files in the project.

To specify roles in the defaults scope:

1. In your `redocly.yaml` configuration file, add the `**` scope option in the `rbac` configuration under the `content` object. For example:
   ```yaml
   rbac:
     content:
       '**':
   ```
2. Add the team names with the value of the role you want to assign them.
   For example, the following example configuration assigns the `maintain` role to the `Developers` team in the `**` scope:
   ```yaml
   rbac:
     content:
       '**':
         Developers: maintain
   ```

Team names must match the team names imported from your identity provider, configured in your SSO configuration, or added in the Admin panel.

## Specify roles in specific scopes

If you want to limit access for specific files in your project you can create specific scopes using a glob pattern and assign teams roles within those scopes.

To specify roles in scopes:

1. In your `redocly.yaml` configuration file, add the glob pattern scope option inside the `rbac` configuration under the `content` object.
   For example, the following example configuration creates a scope that includes all Markdown files:
   ```yaml
   rbac:
     content:
       '*.md':
   ```
2. Add the team names with the value of the role you want to assign them.
   For example, the following example configuration assigns the `write` role to the `Writers` team in the '\*.md' scope:
   ```yaml
   rbac:
     content:
       '*.md':
         Writers: write
   ```

## Specify roles for project access

If you need to manage access to the project, like allowing users to create branches or deploy, you can assign teams roles inside the `rbac` configuration under the `reunite` object.

To specify roles for project:

1. In your `redocly.yaml` configuration file, add the `reunite` object under the `rbac` object. For example:
   ```yaml
   rbac:
     reunite:
   ```
2. Add the team names with the value of the role you want to assign them.
   For example, the following example configuration assigns the `write` role to the `Writers` team in the project:
   ```yaml
   rbac:
     reunite:
       Writers: write
   ```

## Use environment variables for roles

You can use environment variables to specify roles in the rbac configuration of `redocly.yaml` file. This is useful if you want to use different roles for different environments.
To use environment variables, you can use the following syntax:

```yaml
rbac:
  reunite:
    Writers: '{{process.env.RBAC_WRITERS_ROLE}}'
  content:
    '**':
      Developers: '{{process.env.RBAC_DEVELOPERS_ROLE}}'
      Writers: write
```

## Require login to view project content

To require users to log in to your project to view content, you must add the following `rbac` configuration to your `redocly.yaml` file:

```yaml
rbac:
  content:
    '**':
      authenticated: read
```

This configuration adds a login page where users can log in using the identity providers you have added in Reunite.
For more information on adding IdPs in Reunite, see [Add an identity provider](../add-idp.md).
If you want to limit users to a particular IdP, see [Configure SSO](../configure-sso.md).

## Resources

- Learn more about [RBAC (role-based access control)](../../concepts/rbac.md) in the concept documentation.
- Follow step-by-step instructions for [How to configure RBAC](./index.md).
- See full configuration details in the [`rbac` configuration reference](../../../config/rbac.md).
- Check out the [x-rbac OpenAPI extension documentation](../../../author/reference/openapi-extensions/x-rbac.md) to apply RBAC permissions to specific objects in OpenAPI reference documentation.
