# Projects

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

On this page you create, manage, and commit content. The Editor contains the following sections:

- A file tree where you add and manage your website's files, use the search and replace function, and commit changes to the repository.
- An editing pane where you can make changes to file content.
- An editing toolbar for formatting text in files.
- A [Webview pane](./use-webview.md) that displays a live preview of the opened file.

### Pull requests

This page displays the history of open and closed pull requests in the project.
You can view the details of each request, search for pull request by title, and filter the results.

### Deploys

This page contains a history of deploys for Production and Preview environments.
You can view the details of individual deploys, filter the results, view the deployed project, and re-deploy the project manually.

### Remote content

[Remote content](./remote-content/index.md) sources bring content from external sources into your project to be published alongside the project content.

### Feedback

On this page you can view [customer feedback](../../config/feedback.md) and code reports.
You can filter the feedback by date and export it to CSV files.

### API registry

This page lists the APIs descriptions from the [catalog you configured](../../config/catalog-classic.md) in your project.
You can view the details, like the scorecard status, the linter report, or the metadata of each API description and filter API descriptions by the assigned team.

### Settings

This page contains your project's settings, like the project ID, [custom domain](./custom-domain.md) for your project, [environment variables](./env-variables.md), and [Git provider](./connect-git/connect-git-provider.md) setup.
You can also download project files stored in Redocly-hosted Git from this page.
The **Settings** page is available only to users with the Owner role in your organization.

## Resources

- **[Manage projects](./manage-projects.md)** - Create, configure, and organize projects in Reunite for effective documentation workflow management
- **[Manage people](../organization/manage-people.md)** - Add and manage users within your organization for collaborative project development
- **[Remote content](./remote-content/index.md)** - Integrate and synchronize content from external repositories and sources into your Reunite projects
- **[Connect a Git provider](./connect-git/connect-git-provider.md)** - Link your projects to Git repositories from GitHub, GitLab, Azure DevOps, and other providers
