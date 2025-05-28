## Connect to GitHub

{% admonition type="info" name="Note" %}
Complete this process once for your organization.
{% /admonition %}

### Select install link

Select the link to install the Redocly GitHub app.

![Install the Redocly Workflows GitHub app](images/github-app-install-1-link.png)

#### Connected to the wrong GitHub account?

1. Go to GitHub and log in with the correct account.
1. Go back to the **Source Settings** page and select "Switch account" to authorize the Redocly GitHub app.
    ![Switch account link](images/github-app-install-8-account-switch.png)
1. After you've authorized with the correct account, you need to install the Redocly GitHub app.

### Select organization in GitHub

{% admonition type="info" name="Note" %}
It requires GitHub admin privileges to install an app.
{% /admonition %}

Select the organization.
If you notice "Configure" in the link, it means the Redocly Workflows app is already installed, and you may adjust repositories granted access.

![Select organization screen](images/github-app-install-2-select-org.png)

### Select repositories to grant access

We recommend you grant access to specific repositories (the repositories with your API definitions and developer portals).

![Select organization screen](images/github-app-install-3-grant-access.png)

Redocly Workflows app does not create repositories (and if it did access would also be given to those).

![Select organization screen](images/github-app-install-4-install.png)

<details>
<summary>Not an admin? You will see a "Request" button</summary>

If you are not an admin, you will see a "Request" button.

![Select organization screen](images/github-app-install-5-request.png)

Your admin will need to approve the app by navigating to the "Installed GitHub Apps" within your organization's GitHub settings.

![Select organization screen](images/github-app-install-6-admin-approval.png)

Then, your admin will scroll down the page to find the section with "Pending GitHub Apps installation requests" and select "Review request".

![Select organization screen](images/github-app-install-7-admin-approval.png)

Once the app is installed and authorized by an admin of your GitHub account, you can use it.
</details>
