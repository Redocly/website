---
excludeFromSearch: true
---

# Remove a person from an organization

Using [Workflows](https://app.redocly.com/), people with an `Owner` role can remove people from an organization.

1. Log in to [Workflows](https://app.redocly.com/), and select the **People** tab to view list of people in the organization.
2. For the person you want to remove from the organization, select the **Delete** icon. The _Remove person_ dialog displays.
   ![Remove person](./images/remove-person.png#width=100px;height:50px;)
3. Select **Delete** to confirm removal. The selected person is removed from your organization.

{% admonition type="warning" %}
When you remove a person from an organization:

- They will instantly lose access to Workflows and any projects they are assigned to.
- If the person had the `Admin` role on a project, the project will not be deleted. People with the `Owner` role at the organization level are assigned the `Admin` role on all projects within the organization by default, so the project will still be visible in the organization.
- Any organization invitations that the person would have sent, that have not been accepted, are canceled and will not be accessible.
{% /admonition %}
