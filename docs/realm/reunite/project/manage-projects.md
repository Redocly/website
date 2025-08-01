# Manage projects

In Reunite, [projects](./projects.md) are the place where you create, test, and deploy API documentation websites.

If you are logged in to Reunite and have an [Owner organization role](../../access/roles.md#organization-roles) you can manage projects in the following ways:

- create projects
- delete projects

## Create a project

1. In Reunite's top-left corner, click your organization's icon, then on the bottom of the list of projects, click **Create new project**.
2. In the **Create project** modal, select **Choose template** for a template option.\
    You can preview a template by clicking the eye icon on a template card.
3. Enter the name for your project. Reunite automatically fills the **Project domain** field and checks if the domain name is already in use.
4. (Optional) Edit the project domain to your preferences. The **Project domain** must be unique within your organization.
5. Click **Create project**.

Reunite creates your project and takes you to the project's **Editor** page.

### Connect your project repository

To start working on your project, [connect your Git provider](./connect-git/connect-git-provider.md) with your existing remote repository.
This way you can maintain your files in your own infrastructure and publish your website using Redocly.
Alternatively, you can use Redocly-hosted Git.

### Download your project files

If you use Redocly-hosted Git, you can download your project files at any time using the **Download ZIP** button on the **Git hosting** tab on the project's **Settings** page.

## Delete a project

When a project becomes obsolete, or you have a test project you no longer need, you may want to delete that project.

{% admonition type="danger" %}
Deleting a project is permanent - all data on Reunite, including customer feedback, is lost.
Perform this action only if you're certain your organization no longer has use for it.

If you have an external repository connected to Reunite, data on that repository is not affected.
{% /admonition %}

1. In Reunite, switch to the project you want to delete.
2. Select **Settings** > **General** in the navigation menu on the left side of the page.
3. On the **General Settings** page, click **Delete**.
4. Click **Delete** to confirm the action.
5. Enter the project domain; this step ensures that you delete the correct project.
   Then click the **Delete** button to confirm deletion.

Reunite deletes the project and returns you to your organization's dashboard.

## Resources

- [Switch between projects](./switch-between-projects.md)
- [Configure RBAC](../../config/rbac.md) for project and content access
- [Connect a Git provider](./connect-git/connect-git-provider.md)
- [Roles and permissions](../../access/roles.md)
