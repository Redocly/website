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
1. Enter a name for your key.
1. (Optional) Enter allowed IP addresses.
1. (Optional) Set an expiration date.
1. Click **Save**.
1. Click the copy icon to the right of the newly created API key to save it to your clipboard.
   Save the key somewhere safe, as you can't access it later.

## Revoke API keys

When you are finished using an API key, you can revoke the key, making it an invalid authentication method.

1. Log in to your Redocly instance.
1. Select **API keys** in the navigation menu on the left side of the page.
1. Click **Revoke** next to the API key you want to revoke.
1. Click **OK**.

## API keys with RBAC restrictions (beta feature)

{% partial file="../../_partials/experimental.md" /%}

You can restrict API key access to specific teams using RBAC. When enabled, this feature limits API key access to the following endpoints:

- List projects
- Push API
- Session

To configure RBAC restrictions for an API key:

To add RBAC to API keys:

1. In your organization dashboard's left panel, click the **API keys** option.
1. In the row with the chosen API key, click **More options**  and then click **RBAC**.

    {% img
      src="../images/api-key-rbac-menu.png"
      alt="API key RBAC menu"
      withLightbox=true
    /%}

1. In the **Manage API Key RBAC settings** modal, select the **RBAC enabled** toggle button.
1. In the **Teams** input field, specify which teams have access to this API key.

    {% img
      src="../images/api-key-rbac-settings.png"
      alt="API key RBAC settings"
      withLightbox=true
    /%}

1. Click **Save**.

The access logic follows the same principles as standard [RBAC configuration](../../access/rbac.md).
API keys assigned to the [Teams](./teams.md) have access to the restricted resources.

## Resources

- **[Manage organizations](manage-orgs.md)** - Set up the details and manage your Redocly organization
- **[Single sign-on (SSO) configuration](../../config/access/sso.md)** - Complete SSO configuration reference with examples for various identity providers
- **[Teams and users](./teams.md)** - Organize users into teams with role-based permissions for effective collaboration and access control