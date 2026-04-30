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
# Projects

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

In Reunite, projects are spaces within an organization where the members of the organization create and manage the content of your API documentation website.
There is one project for each published site.

You can think of a project as a collection of source content with configuration for how to manage and deploy the website.
Depending on the number of your API products and their complexity, you may choose to have a single project, or several projects.

## Navigation bar

{% img
  src="../images/reunite-editor-navbar.png"
  alt="A partial view of the navigation bar as it appears on the Editor page."
  withLightbox=true
/%}

The navigation bar is displayed on all project pages.
You can use it to switch between projects, and access the help dropdown.
It can also have other interface controls, depending on which of the project pages you are on.

For example, on the **Editor** page, you can switch between branches, open new pull requests, view pull requests and commit changes.
It also contains the avatars of logged-in users, and the **View** drop-down and the help drop-down.

## Project pages

Projects have their features grouped into pages you can access in the left panel.
You can do many things in projects depending on which of the following project pages you are on.

### Editor

On the [Editor](./use-editor.md) page you create, manage, and commit content.
The editor contains the following sections:

- A file tree where you add and manage your website's files, use the search and replace function, and commit changes to the repository.
- An editor pane where files open as tabs that you can split and rearrange.
- An editing toolbar for formatting text in open files.
- A [Webview](./use-webview.md) tab that opens in the editor and displays a live preview of the opened file.

### Pull requests

The [Pull requests](./pull-request/manage-pull-requests.md) page displays the history of open and closed pull requests in the project.
You can view the details of each request, search for pull request by title, and filter the results.

### Deployments

The [Deployments](./deployments.md) page contains a history of deployments for Production and Preview environments.
You can view the details of individual deployments, filter the results, view the deployed project, and re-deploy the project manually.

### Remote content

The [Remote content](./remote-content/index.md) page lists files and folders that are pulled into your project from external sources and published alongside the project content.

### Reports

Reports group together pages that provide insights about your project's performance: feedback from your users, and the statistics for page views and user search queries.

#### Feedback

The Feedback page lists [customer feedback](./feedback.md) and code reports.
You can filter the feedback by date and status, and export it to CSV files.

#### Analytics

The [Analytics](./analytics.md) page displays data on the page views and search queries for your deployed project.
You can filter the page views and queries by date and export it to CSV files.

### Settings

Your project settings are split into the following pages:

- **General**: use this page to [manage your project](./manage-projects.md) name, domain, or delete the project.
- [Custom domain](./custom-domain.md): host your project at your chosen URL.
- [Environment variables](./env-variables.md): add and manage environment variables in your project.
- [Git hosting](./connect-git/connect-git-provider.md): configure where your project files are hosted.
    If you're using Redocly-hosted Git, you can also download your project files.
- [Branches & deployments](./branches-and-deployments.md): select which branches to deploy nad how Reunite generates previews.

The **Settings** page is available only to users with the Owner role in your organization.

## Resources

- **[Draft projects](./draft-projects.md)** - Learn how draft mode changes deployment access, scaling, and the Go live flow
- **[Manage projects](./manage-projects.md)** - Create, configure, and organize projects in Reunite for effective documentation workflow management
- **[Manage people](../organization/manage-people.md)** - Add and manage users within your organization for collaborative project development
- **[Remote content](./remote-content/index.md)** - Integrate and synchronize content from external repositories and sources into your Reunite projects
- **[Connect a Git provider](./connect-git/connect-git-provider.md)** - Link your projects to Git repositories from GitHub, GitLab, Azure DevOps, and other providers
