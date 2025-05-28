---
excludeFromSearch: true
---

# Manage roles

Using [Workflows](https://app.redocly.com/), people with an `Owner` role can update existing roles to change the level of access.

## Update roles

This section describes how to update or edit an organization level role.

1. Log in to [Workflows](https://app.redocly.com/), and select **People** tab to view the list of people in the organization.

2. In the _Actions_ column, select the **Edit** icon for the person whose role you want to update. The **Edit person** dialog displays.
   ![Edit user](./images/edit-person.png#width=100px;height:50px;)

3. Select the role you want to update to, and select **Save** to update the role for the selected person.

## Convert Redocly accounts to SSO users

If you have set up access control via Single Sign-On (SSO) using Identity providers (IdPs) for your Workflows, you can also use this page to convert existing Redocly user accounts to SSO accounts.

Before you use these instructions, ensure that you have verified the domain set up for SSO identity provider discovery. For more information, refer to the [About verified domains](../settings/access-control.md) topic.

{% admonition type="info" %}
This action is irreversible, and you won't be able to convert the user account back from SSO to a Redocly account.
{% /admonition %}

To convert existing Redocly user accounts to SSO accounts:

1. Select **Convert to SSO user** and the Identity provider from the displayed dropdown.
   ![Edit user](./images/edit-user-sso.png#width=100px;height:50px;)
2. Select **Save** to save your changes.

Choosing this option will:

- Convert your Redocly user accounts to SSO users, allowing your members to use roles associated with their SSO logins by default.
- Allow members to log in with the email address associated with the organization's identity provider (IdP), removing the need to have multiple logins.
