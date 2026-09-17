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
description: Start a Reunite project with AI, from a template, or from a Git repository you already have.
---
# Create a project

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

You can start a project in three ways:

- **With AI**: describe the documentation you need, and Reunite generates a configured project with content, navigation, and theme.
  See [Create a project with AI](./with-ai.md).
- **From a template**: Reunite hosts the repository and adds starter content.
  See [Create a project from a template](#create-a-project-from-a-template).
- **From an existing repository**: Reunite builds the project from your own Git repository.
  See [Create a project from an existing repository](#create-a-project-from-an-existing-repository).

The rest of this page covers the two manual ways.

## Create a project manually

1. In Reunite's top-left corner, click your organization's icon, then on the bottom of the list of projects, click **Create new project**.
   The **Projects** page opens with the AI prompt.
   Click **start with a blank project** under the prompt.
1. In the **Create project** modal, enter the name for your project.
    Reunite automatically fills the **Project domain** field and checks if the domain name is already in use.
1. (Optional) Edit the project domain to your preferences.
    The **Project domain** must be unique within your organization.
1. Under **Git repository**, select where your project content lives:
    - **Redocly-hosted repository**: Reunite sets up and hosts the repository for you.
    - **Connect existing repository**: Reunite builds the project from a repository you already have on GitHub, GitLab, Bitbucket, or Azure DevOps.
1. Click **Next** and complete the steps for the option you selected.

You can change the connected Git repository later in the project's **Settings > Git hosting** page.

### Create a project from a template

If you selected **Redocly-hosted repository**, Reunite offers a set of templates as the starting content:

1. Select a template.
1. Click **Create project**.

Reunite creates your project and takes you to the project's **Editor** page and you can start working on your documentation.

### Create a project from an existing repository

If you selected **Connect existing repository**, Reunite builds the project from the content that is already in your repository.
Nothing is pushed to the repository, and no template is used.

1. Select your Git provider and authorize Reunite to access it.
1. Select the organization, the repository, and the branch.
    For a monorepo, you can also select a folder.
1. Click **Create project**.

Reunite creates your project, builds it from your repository, and takes you to the project's **Editor** page.

## Resources

- **[Create a project with AI](./with-ai.md)** - Describe the project, select features, and add files, a logo, and links, then let Reunite generate it
- **[Manage projects](../manage-projects.md)** - Switch between projects, use the project workspace pages, and manage project settings
- **[Connect a Git provider](../connect-git/connect-git-provider.md)** - Integrate your projects with Git repositories from various providers for version control and collaboration
