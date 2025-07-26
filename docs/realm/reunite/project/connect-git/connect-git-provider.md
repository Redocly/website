# Connect a Git provider

Connecting a Git provider establishes a connection between your Redocly project and a Git repository hosting provider.
Git is a widely used distributed version control system that allows multiple developers to collaborate on a project by managing changes to source code and other files.
Git providers offer online Git hosting services, so teams can collaborate from around the world.
If you already have your project files stored in a repository hosted by a Git provider, you can connect either the entire repository or a folder in that repository.

Redocly integrates with popular Git providers such as GitHub and GitLab.
When you open a pull request, or commit and push to these services, Redocly is notified automatically and can be configured to perform an action, like rebuild the project for a preview or production build.
The files in your remote Git repository and Redocly are synced, so any changes saved in Redocly or your remote repository are reflected in the published project.

You can connect your Redocly project to the following Git repository hosting providers:

- [GitHub](github.md)
- [GitLab and GitLab self-managed](gitlab.md)
- [Azure DevOps](azure-devops.md)
- [Bitbucket Cloud](bitbucket-cloud.md)

{% admonition type="info" %}
If you have a self-hosted instance of GitLab, or are on GitHub Enterprise you may need to allow certain IP addresses to connect to Redocly. See [allow IP addresses](../../../how-to/allow-ip-addresses.md) for more information.
{% /admonition %}

## Resources

- Follow the steps to [manage the self-hosted Git providers](./manage-self-hosted.md) in Reunite.
- Follow the steps to [include remote content](../remote-content/index.md) from a different repository in your project.
- Check out all the ways you can [use the Editor](../use-editor.md) in Reunite to create content.
- Learn more about where you can view feedback and deployment details for [projects](../projects.md) in Reunite.
- View the different options for configuring your project in the `redocly.yaml` file in the [Configuration reference documentation](../../../config/index.md).
