## Connect your Bitbucket self-managed account to Redocly

1. Navigate to **Settings** > **Source control providers**.

2. Scroll down to the **Bitbucket self-managed** section and:
   - Enter the **Username** and **Password** of your Bitbucket user account into the corresponding fields.
   - Provide the URL of your self-managed Bitbucket instance. The URL must start with the protocol (either `http` or `https`).
    ![Organization source control bitbucket self-managed settings](./images/org-settings-02-bitbucket.png '#width=500px;')

    {% admonition type="info" name="Bitbucket service accounts" %}
    A regular user account is acceptable, but we recommend you create a service account on Bitbucket with access to desired repositories. Service accounts typically have administrative privileges, and are not used by human users, but by the system for administration and interacting with external services.
    {% /admonition %}

3. Select **Save self-managed Bitbucket settings** to complete the configuration.
