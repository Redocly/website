---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Manage API keys

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

An API key is a unique identifier used to authenticate a user, developer, or an application to an API.
You can add API keys to your organization and revoke them when you are finished using them.

If you don't set an expiration date when you create a key, the key does not automatically expire and stays valid until manually revoked.

Redocly stores API keys as one-way cryptographic hashes in the backend.
The plaintext value of the key can't be retrieved.

## Add API keys

You can add API keys to your organization if you need to access the Redocly API or the Scout tool.

To add an API key:

1. Log in to your Redocly instance.
1. Select **API keys** in the navigation menu on the left side of the page.
1. Click **New key**.
1. Enter a **Name** for your key.
1. Choose a **Permission model** for the key and set the permissions it grants.
   For details on each model and the available permissions, see [API key permissions](#api-key-permissions).
1. (Optional) Set an **Expiration date**.
   After this date (UTC), the key stops working.
   Leave it empty to create a key that stays valid until you revoke it.
1. (Optional) Restrict the key to one or more allowed IP addresses.
   This option is available on plans that include IP restrictions.
1. Click **Create**.
1. Click the copy icon next to the newly created API key to save it to your clipboard.
   Save the key somewhere safe, as you can't access it again later.

## API key permissions

Every API key has a **permission model** that determines what the key is allowed to do.
You select the permission model when you create a key, and you can change it later by editing the key.

The API keys list shows the permission model for each key in the **Permission model** column.

### Permission models

{% table %}

- Permission model
- Description

---

- Granular permissions
- Grant the key a specific set of organization and project permissions that you select individually. Use this model when you want to scope a key to only the operations it needs.

---

- RBAC
- Assign the key to one or more [teams](./teams.md). The key inherits the roles and permissions of those teams, following the same [role-based access control](../../access/rbac.md) logic that applies to users.

---

- Legacy full access
- A read-only model shown for older keys that were created with unrestricted access. You can't create new keys with this model. To save changes to a legacy key, convert it to **Granular permissions** or **RBAC**.

{% /table %}

### Granular permissions

When you select the **Granular permissions** model, you choose from a list of organization permissions and a list of project permissions.
You must select at least one permission.

Each permission has a type that describes the kind of access it grants:

- **Read** permissions allow viewing or listing resources.
- **Write** permissions allow creating or updating resources.
- **Delete** permissions allow removing resources.

Use the **Quick select** buttons above each list to set permissions in bulk:

- **Full access** selects every permission in the list.
- **Read only** selects only the read-type permissions in the list.
- **None** clears the selection.

#### Organization permissions

{% table %}

- Permission
- Type
- Grants

---

- `org.organizations.read`
- Read
- View organization details and settings.

---

- `org.organizations.update`
- Write
- Update organization details and settings.

---

- `org.project.read`
- Read
- List and view projects in the organization.

{% /table %}

#### Project permissions

{% table %}

- Permission
- Type
- Grants

---

- `project.git.branch.delete`
- Delete
- Delete branches in a project.

---

- `project.git.branches.read`
- Read
- List and view branches in a project.

---

- `project.remotes.create`
- Write
- Create project remotes.

---

- `project.remotes.delete`
- Delete
- Delete project remotes.

---

- `project.remotes.read`
- Read
- List and view project remotes.

---

- `project.remotes.update`
- Write
- Update project remotes.

{% /table %}

### RBAC permission model

When you select the **RBAC** model, you assign the key to one or more [teams](./teams.md) instead of selecting individual permissions.
The key is granted the same access as a member of those teams, following the roles assigned to them.

The access logic follows the same principles as standard [RBAC configuration](../../access/rbac.md).
API keys assigned to a team have access to the resources that the team's roles allow.

## Revoke API keys

When you are finished using an API key, you can revoke the key, making it an invalid authentication method.

1. Log in to your Redocly instance.
1. Select **API keys** in the navigation menu on the left side of the page.
1. Click **More options** next to the API key you want to revoke, then click **Revoke**.
1. Confirm that you want to revoke the key.

## Resources

- **[Manage organizations](manage-orgs.md)** - Set up the details and manage your Redocly organization
- **[Role-based access control (RBAC)](../../access/rbac.md)** - Control authorization based on roles and team membership
- **[Roles and permissions](../../access/roles.md)** - Explore the user roles and permissions available for controlling access to your organization and projects
- **[Single sign-on (SSO) configuration](../../config/access/sso.md)** - Complete SSO configuration reference with examples for various identity providers
- **[Teams and users](./teams.md)** - Organize users into teams with role-based permissions for effective collaboration and access control
