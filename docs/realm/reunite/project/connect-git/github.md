# Connect a GitHub repo

If your project files are stored in a repository on GitHub, you can connect that repository, so you can access, edit, and publish those files in Reunite.
To connect a GitHub repository, you must first install the Redocly app in GitHub, then enter the connection details in Reunite.

## Install the Redocly app in GitHub

{% partial file="../../../_partials/install-redocly-app-gh.md" /%}

## Enter the connection details in Reunite

After you install the Redocly GitHub App on your organization in GitHub, you must enter the repository connection details in Reunite to complete the process of adding a GitHub repository to your project.

To enter the connection details:

1. From your project, select **Settings > Git hosting > GitHub > Next**.
2. Authorize your Redocly organization to verify your GitHub identity.
3. Select your GitHub **Organization > Repository > Branch**.
4. (Optional) Select the **Monorepo folder**, if your project files are part of a monorepo, and you want to include only a specific folder from the repository.
   {% admonition type="info" name="Monorepo folder" %}
   If you select to only include a specific folder from a monorepo:

   - Only files listed in file tree are cloned, no other files are included
   - Project builds are started only when branch contains changes to connected folder
   - Remote content is allowed to add to connected folder only

   {% /admonition %}

5. Select **Next > Connect**.
   {% admonition type="warning" name="Warning" %}
   **This step deletes the files currently in the Redocly project and replaces them with the files in GitHub.**
   {% /admonition %}

## Resources

- **[Include remote content](../remote-content/index.md)** - Integrate content from external GitHub repositories into your Reunite projects for unified documentation management
- **[Use the Editor](../use-editor.md)** - Explore Reunite's collaborative editing environment for creating and managing content with GitHub integration
- **[Projects overview](../projects.md)** - Access feedback, deployment details, and project settings for comprehensive GitHub-connected project management
- **[Configuration reference](../../../config/index.md)** - Complete redocly.yaml configuration options for GitHub integration, deployment, and project customization
