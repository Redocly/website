# OpenAPI extension: `x-rbac`

The `x-rbac` option allows you to control access to various OpenAPI objects based on the [teams](../../../setup/concepts/teams.md) in your organization.

## Location

Add `x-rbac` to any OpenAPI object, such as an `Operation`, `Parameter`, or `Schema`.
If the current user is not in a team with access, the object is not rendered in the documentation.
Objects restricted by `x-rbac` are excluded from the downloadable OpenAPI file, ensuring consistent access control across all representations of the API documentation.

{% admonition name="Search considerations" type="warning" %}
When `x-rbac` is applied to a Parameter object or Schema object property, it removes the object from the search functionality.
This includes users who have access to this object.
{% /admonition %}

## Options

{% table %}

- Option
- Type
- Description

---

- x-rbac
- Map[string, string]
- Map of team names to [project roles](../../../setup/concepts/roles.md#project-roles).
  Team names come from the identity provider or teams associated with the Redocly login.
  Additionally, there are automated team names `anonymous` (meaning all users who are not logged in), `authenticated` (meaning any user who is logged in).
  Learn more about mapping group names that come from the identity provider through the [single-sign-on (SSO) configuration to either Redocly default teams or project RBAC teams](../../../setup/how-to/add-idp.md#team-mapping).
  In addition, the team name `*` represents the rest of the teams not defined in sibling properties including `anonymous` and `authenticated`.
  Possible values of roles: `none`, `read`, `write`, `triage`, `maintain`, or `admin`.

{% /table %}

## Example

The following example shows how to enable access to the `GetMuseumHours` operation to only those users who are authenticated.

```yaml
---
paths:
  /museum-hours:
    get:
      summary: Get museum hours
      description: Get upcoming museum operating hours.
      operationId: getMuseumHours
      x-rbac:
        authenticated: read
      tags:
        - Operations
      # ...
---
```

## Resources

- Learn more about [role-based access control](../../../setup/concepts/rbac.md).
- Add a [role-based access control configuration](../../../setup/how-to/rbac/index.md) to your project.
- Control which extensions are included in your API reference documentation with the [showExtensions configuration setting](../../../config/openapi/show-extensions.md).
- See all [openapi configuration settings](../../../config/openapi/index.md).
- See a full [list of supported OpenAPI extensions](./index.md).
