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
# Manage OAuth2 clients

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

OAuth2 clients are used to authenticate applications to Reunite API.
You can add OAuth2 clients to your organization and revoke them when you are finished using them.

## Add OAuth2 clients

To add an OAuth2 client to your organization:

1. Log in to your Redocly instance.
2. Select **Access** > **OAuth2 clients** in the navigation menu on the left side of the page.
3. Click **New key**.
4. Enter a name for your key.
6. Click **Save**.
7. Click the copy icon to the right of the newly created OAuth2 client secret to save it to your clipboard.
   Save the secret somewhere safe, as you can't access it later.

## Revoke OAuth2 clients

When you are finished using an OAuth2 client, you can revoke the client, making it an invalid authentication method.

1. Log in to your Redocly instance.
2. Select **Access** > **OAuth2 clients** in the navigation menu on the left side of the page.
3. Click **Revoke** next to the OAuth2 client you want to revoke.
4. Click **OK**.