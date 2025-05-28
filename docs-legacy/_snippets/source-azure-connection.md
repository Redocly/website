{% admonition type="info" %}
You will need the [Professional or Enterprise plan](../../pages/pricing/pricing.page.tsx) to connect to Azure Repos connection.
{% /admonition %}

## Connect Azure Repos to Redocly

Redocly integrates by using a personal access token to authenticate to Azure Repos.

We recommend using a service user account. A service user is a user created in Azure Repos intended for use by a machine. You would log in to the service user account to generate a personal access token for use by a 3rd party service (like Redocly). We recommend naming your service user "Redocly" or similar.

1. Log into your Azure Repos account, and under User Settings, create a personal access token. For more information, read the [Azure docs to learn how to create a personal access token](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=preview-page#create-personal-access-tokens-to-authenticate-access). Azure DevOps has a current and preview features environment which have different locations for finding where to generate your personal access token.

2. Set permissions for the personal access token.

- Select `custom defined` scopes.
  {% admonition type="info" %}
  You must define the scopes correctly.
  {% /admonition %}
- Set `read & write` code access.
- Set Web/Service hooks permissions.
    ![azure pat scopes](./images/azure-pat-scopes.png '#width=700px;')

{% admonition type="warning" %}
If you set an expiration on the personal access token, set yourself a reminder to generate a new token.
{% /admonition %}

3. In Redocly, navigate to **Settings** > **Source control providers** page.

4. Scroll down to the **Azure** section of the page, and complete the details.
   - Enter the **Organization name** as it appears in your Azure account.
   - Enter your personal access token you created in Azure Repos.
   - Select **Save Azure Settings** to save your changes.
    ![Org Settings Azure](./images/org-settings-azure-settings.png '#width=600px;')

{% admonition type="success" %}
You've now connected Azure Repos to Redocly.
{% /admonition %}

### Update access token

To update your token:

1. On the Source control provider page, under Azure, select **Change**.
2. Add in your new token, and select **Update Azure Settings**.

    ![Org Settings Azure Settings](./images/org-settings-azure-settings-update.png '#width=500px;')

### Disconnect Azure

To disconnect the integration between Azure Repos and Redocly, on the Source control provider page, under Azure, select **Disconnect Azure**.
