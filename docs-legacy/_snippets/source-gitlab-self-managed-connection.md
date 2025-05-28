## Connect GitLab self-managed to Redocly

GitLab self-managed operates similarly to the GitLab.com integration, though it requires some additional setup.

### Create a GitLab application

1. Navigate to your GitLab user settings and create a GitLab Application.

    *A regular user account is acceptable, but we recommend you create a service account for managing applications. Service accounts typically have administrative privileges, and are not used by human users, but by the system for administration and interacting with external services.*

    ![GitLab user dropdown](./images/gitlab-managed-app-01-user-dropdown.png '#width=500px;')

2. Go to the **Applications** tab and:
   - Enter "Redocly Workflows" for the new application name.
   - Set the **Redirect URI** to `https://app.redocly.com/callbacks/gitlab-auth`.
   - Activate the **api** scope from the **Scopes** list in order to allow Redocly to read your repositories and write commit statuses.
    ![GitLab Applications tab 1](./images/gitlab-managed-app-02-new-application.png '#width=500px;')

3. Select **Save application** to create a new application.

    ![GitLab Applications tab 2](./images/gitlab-managed-app-03-save-application.png '#width=500px;')

    You will be redirected to the page with credentials for the new application.

    ![GitLab application credentials](./images/gitlab-managed-app-04-creds.png '#width=500px;')

4. Keep this tab open as this data is required for the following steps.

### Connect application to your organization in Redocly's web app

1. Using Workflows, navigate to **Settings > Source control providers** page.

2. Scroll down to **GitLab self-managed** section and copy/paste **Application ID** and **Secret** values from the GitLab application to the corresponding form fields.
Also provide the URL to your self-managed instance.
    ![Organization source control gitlab self-managed settings](./images/gitlab-managed-org-settings-02.png '#width=500px;')

3. Select **Save self-managed Gitlab settings** to complete the configuration.
4. Finish the authorization flow in a separate tab in your GitLab self-managed instance.
    ![Authorize GitLab app](./images/gitlab-managed-authorize-app.png '#width=500px;')

{% admonition type="success" %}
You're all set! You can now use the GitLab self-managed source similarly to the GitLab.com integration source.
{% /admonition %}
