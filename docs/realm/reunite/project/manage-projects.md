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
# Manage projects

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

In Reunite, projects are the place where you create, test, and deploy documentation websites.

## Create a project

1. In Reunite's top-left corner, click your organization's icon, then on the bottom of the list of projects, click **Create new project**.
1. In the **Create project** modal, select **Choose template** for a template option.
    You can preview a template by clicking the eye icon on a template card.
1. Enter the name for your project.
    Reunite automatically fills the **Project domain** field and checks if the domain name is already in use.
1. (Optional) Edit the project domain to your preferences.
    The **Project domain** must be unique across Reunite.
1. Click **Create project**.

Reunite creates your project and takes you to the project's **Editor** page and you can start working on your documentation.
If you have a third-party-hosted Git, [connect your repository](#connect-your-project-repository) first.

## Switch between projects

Reunite enables you to work on multiple projects.
Access to specific projects depends on the [role](../../access/roles.md) you have in your organization and your [team membership](../organization/teams.md).

You can switch between projects in a few different contexts:

- **Organizations and projects menu:**

  1. In the top-left corner of Reunite, click your organizations's icon.
  1. From the menu, click one of the project names.

- **Organization Overview page:**

  1. In your organization's **Overview** page find the tile with your project's name.
  1. Click the arrow button.

- **Navigation bar:**

  1. In a project's navigation bar, click the project name.
  1. From the menu, select one of the project names.

## Project workspace pages

Projects have their features grouped into pages you can access in the left panel:

- [Editor](./use-editor.md): create, manage, and commit content.
- [Pull requests](./pull-request/manage-pull-requests.md): manage pull requests and view pull request history in the project.
- [Deployments](./deployments.md) view the history of project deployments and re-deploy the project manually.
- [Remote content](./remote-content/index.md) manage files and folders that are pulled into your project from external sources.
- Reports:
  - [Feedback](./feedback.md): view customer feedback and code reports.
  - [Analytics](./analytics.md): view data on the page views and search queries for your deployed project.

## Project Settings menu

Use the Settings menu in your project workspace to edit your projects domain, environment variables, set up Git hosting, manage deployment options, or delete the project.

### View and edit project details

On the **General settings** page you can:

- View and copy the **Project ID**.
- Edit the **Project name**.
- Edit the **Project domain**.

### Delete a project

When a project becomes obsolete, or you have a test project you no longer need, you may want to delete that project.

Deleting a project moves it to **Deleted projects** for 30 days instead of destroying it immediately.
While a project is in **Deleted projects**, its site is offline and its builds and automations are disabled.
Its project domain stays reserved until the project is restored or permanently deleted.
Another organization cannot create a project with the same domain while yours is in **Deleted projects**.
Organization owners receive an email notification whenever a project is deleted.
From **Deleted projects**, an organization owner can [restore the project](#restore-a-deleted-project) or delete it permanently.

{% admonition type="danger" name="Permanent deletion after 30 days" %}
After 30 days in **Deleted projects**, Reunite deletes the project permanently, including all data on Reunite, such as customer feedback.
This action can't be undone.

If you have an external repository connected to Reunite, data on that repository is not affected.
{% /admonition %}

1. In Reunite, switch to the project you want to delete.
1. Select **Settings** > **General** in the menu on the left side of the page.
1. On the **General Settings** page, click **Delete**.
1. Click **Delete** to confirm the action.
1. Enter the project domain; this step ensures that you delete the correct project.
   Then click the **Delete** button to confirm deletion.

Reunite moves the project to **Deleted projects** and returns you to your organization's dashboard.

### Restore a deleted project

Organization owners can restore a deleted project at any point during its 30-day retention period.

1. In Reunite, switch to the organization that owns the deleted project.
1. On the organization's **Overview** page, next to the **Projects** heading, click **Deleted projects**.
1. Find the project you want to restore, then click **Restore**.

Reunite restores the project with its original slug.

To delete a project permanently before its 30-day retention period ends, click **Delete forever** next to the project on the **Deleted projects** page, then confirm the action.

### Set up a custom domain

To learn how to set up your custom domain and optional proxy, project prefix, or how to serve your project from a subdomain, see [Custom domain](./custom-domain.md).

### Manage environment variables

To learn how to add and utilize environment variables in your project, see [Environment variables](./env-variables.md).

### Download your project files

If you use Redocly-hosted Git, you can download your project files at any time.

To download your project files:

1. In your project's workspace, select **Settings** > **Git hosting**.
2. (Optional) Select a branch in the branch selector next to the **Download ZIP** button.
   The default branch is selected initially; type a branch name to filter the list.
3. Click the **Download ZIP** button.

The `.zip` file with all files from the selected branch downloads to your machine.

### Connect your project repository

Redocly-hosted Git is available by default for your project.

However, if you already have an existing Git repository, [connect your Git provider](./connect-git/connect-git-provider.md).
This way you can maintain your files in your own infrastructure and publish your project using Reunite.

### Set up deployment strategy

To learn how to change which branches Reunite deploys and how it handles preview deployments, see [Branches and deployments](./branches-and-deployments.md).

## Resources

- **[Configure RBAC](../../config/access/rbac.md)** - Set up role-based access control for granular project and content access permissions
- **[Connect a Git provider](./connect-git/connect-git-provider.md)** - Integrate your projects with Git repositories from various providers for version control and collaboration
- **[Remote content](./remote-content/index.md)** - Integrate and synchronize content from external repositories and sources into your Reunite projects
- **[Roles and permissions](../../access/roles.md)** - Understand user roles and permission levels available for project access control and team collaboration
