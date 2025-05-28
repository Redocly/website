---
excludeFromSearch: true
---

# Teams

Teams are groups of [people](../people/index.md) with common permissions and access to projects in Workflows.

If you have multiple projects and people in your organization, you can create **teams** to assign the same project-level permissions to a group of people, without having to manually assign permissions to everyone individually.

{% admonition type="warning" %}
Roles assigned to people at project level will supersede the roles assigned to them as part of a team.

For example, if a person has been directly assigned a `Maintain` role individually on a project, but is part of a team which only has been assigned a `Read` role, that person will effectively have a `Maintain` role on that project, even if they are part of the team.
{% /admonition %}

Using the **Teams** page, people with the `Owner` role can:

- [Add new teams](add-new-team.md)
- [Edit team name](add-new-team.md#edit-team-name)
- [Add (and remove) people users to/from teams](add-new-team.md)
- [Delete teams](delete-team.md)

{% admonition type="info" name="Attention" %}
Your plan/role may not allow you to create teams in [Workflows](https://app.redocly.com). Teams is only available for `Professional` and `Enterprise` customers.
{% /admonition %}
