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

You can create a project with AI, from a template, or from a repository you already have.
See [Create a project](./create-project/index.md) for all three ways.

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

Use the Settings menu in your project workspace to edit your project's domain and environment variables.
You can also set up Git hosting, manage deployment options, or delete the project.

### View and edit project details

On the **General settings** page you can:

- View and copy the **Project ID**.
- Edit the **Project name**.
- Edit the **Project domain**.

### Delete a project

When a project becomes obsolete, or you have a test project you no longer need, you may want to delete that project.

{% admonition type="danger" name="Irreversible action" %}
Deleting a project is permanent - all data on Reunite, including customer feedback, is lost.
Perform this action only if you're certain your organization no longer has use for it.

If you have an external repository connected to Reunite, data on that repository is not affected.
{% /admonition %}

1. In Reunite, switch to the project you want to delete.
1. Select **Settings** > **General** in the menu on the left side of the page.
1. On the **General Settings** page, click **Delete**.
1. Click **Delete** to confirm the action.
1. Enter the project domain; this step ensures that you delete the correct project.
   Then click the **Delete** button to confirm deletion.

Reunite deletes the project and returns you to your organization's dashboard.

### Set up a custom domain

See [Custom domain](./custom-domain.md) to learn how to set up your custom domain and optional proxy or project prefix.
It also covers how to serve your project from a subdomain.

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
You can connect a repository when you [create a project](./create-project/index.md#create-a-project-from-an-existing-repository), or at any time later in the project's **Settings > Git hosting** page.

### Set up deployment strategy

To learn how to change which branches Reunite deploys and how it handles preview deployments, see [Branches and deployments](./branches-and-deployments.md).

## Resources

- **[Create a project](./create-project/index.md)** - Start a project with AI, from a template, or from an existing repository
- **[Configure RBAC](../../config/access/rbac.md)** - Set up role-based access control for granular project and content access permissions
- **[Connect a Git provider](./connect-git/connect-git-provider.md)** - Integrate your projects with Git repositories from various providers for version control and collaboration
- **[Remote content](./remote-content/index.md)** - Integrate and synchronize content from external repositories and sources into your Reunite projects
- **[Roles and permissions](../../access/roles.md)** - Understand user roles and permission levels available for project access control and team collaboration
