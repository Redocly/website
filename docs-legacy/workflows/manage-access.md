---
excludeFromSearch: true
---

# Overview

Using Workflows, you can control access at both the organization and the project level.

## Access at the organization level

At the organization level, people with the `Owner` role can manage what people (in their organization) can access in the Workflows app.

- For more information on how to manage organization level access, refer to the [Manage access to Workflows](../settings/access-control.md) topic.
- To find out how the various roles and permissions work, refer to the [Roles and permissions](../people/roles-permissions.md) topic.

## Access at a project level

A project refers to any API definitions, Reference or Portals you create using the [Workflows](https://app.redocly.com) app.

{% admonition type="info" %}
- People with the `Owner` role at the organization level are automatically assigned the `Admin` role at project level.
- Any other person with the `Member` role at the organization level has a `Maintain` role at a project level. If an organization `Member` creates a new project, they are assigned the `Admin` role for that project.

For more information on the organization to project level mapping, refer to the [Roles and permissions](../people/roles-permissions.md#mapping-organization-to-project-levels) topic.
{% /admonition %}

People with an `Admin` role at a project level can manage access for other users on that project.

- [Manage access to API versions](../api-registry/settings/manage-access.md)
- [Manage access to Reference](../api-reference-docs/settings/manage-access.md)
- [Manage access to Portals](../developer-portal/settings/manage-access.md)
