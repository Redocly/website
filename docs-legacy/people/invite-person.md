---
excludeFromSearch: true
---

# Invite a person to an organization

In [Workflows](https://app.redocly.com/), people with an `Owner` role can invite new people to an organization using their email address and assign specific roles to them.

This section describes how to invite a person to allow team collaboration. You can also set the organization level role the invited person will be assigned during this process.

1. Log in to [Workflows](https://app.redocly.com/), and select the **People** tab to view people and associated roles.
2. Select **Invite** to view the _People_ invitation page.
   ![Invite member](./images/invite-member.png#width=100px;height:50px;)
3. In the _Email_ field, enter the email address for the person you want to invite to your organization.

{% admonition type="info" %}
If you have set up [access control via SSO](../settings/access-control.md), you can invite an SSO user to your organization.

Select **Invite SSO user** and the Identity provider from the displayed dropdown.

{% /admonition %}
4. Under **Choose a role**, select the role you want to associate with the invited person. If you are unsure what these roles mean, refer to the [Roles and permissions](./roles-permissions.md) topic. 5. Select **Send Invite** to send the invitation.
![Invite member](./images/send-invite.png#width=100px;height:50px;)

The invited person will receive an email notification to join the Redocly organization, and the invitation is saved under **Pending invites** on the People page.

- The invitation link is valid only for 7 days. If the invited person does not accept the invitation within the 7 days, organization owners will need to create a new invitation.
- Organization owners can **delete** an invitation before it has been accepted by the invited person.
- Once the invited person accepts the invitation and sets up a password, they can access Workflows with the role assigned to them at the invitation stage.
  ![Accept invitation](./images/accept-invitation.png#width=100px;height:50px;)

## Invite SSO users

If you have set up access control via Single Sign-On (SSO) using identity providers (IdPs) for your Workflows organization, you can also use this page to:

- Invite SSO users for an IdP that has already been set up, and
- Select a member role that will apply for the SSO user once they log in using SSO.

{% admonition type="info" %}
Access control with SSO is only available for our Pro and Enterprise customers.
{% /admonition %}
