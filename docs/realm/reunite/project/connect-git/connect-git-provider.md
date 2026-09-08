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
# Connect a Git provider

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Connect your Redocly project to a Git provider to keep the two in sync.
Changes you save in Redocly appear in your repository, and changes you push to your repository appear in your published project.
You can connect a whole repository or one folder in it.

The connection also drives builds.
When you open a pull request, or commit and push, your Git provider notifies Redocly.
Redocly then acts on the change, such as building a preview or deploying to production.

You can connect these Git providers:

- [GitHub](github.md)
- [GitLab and GitLab self-managed](gitlab.md)
- [Azure DevOps](azure-devops.md)
- [Bitbucket Cloud](bitbucket-cloud.md)

{% admonition type="info" name="Self-hosted Git providers" %}
If you use self-managed GitLab or GitHub Enterprise, allow these IP addresses.
Redocly connects from them to deploy previews and production updates:

**US region:**
```sh
3.211.34.228
44.206.14.241
54.156.60.142
```

**EU region:**
```sh
3.78.112.49
52.58.255.31
3.66.111.193
```
{% /admonition %}

## Resources

- **[Manage self-hosted Git providers](./manage-self-hosted.md)** - Register a self-managed GitLab or GitHub Enterprise instance so Redocly can reach it
- **[Include remote content](../remote-content/index.md)** - Pull files from other repositories into your project
- **[Use the Editor](../use-editor.md)** - Edit and review project content in Reunite
- **[Manage projects](../manage-projects.md)** - Find feedback, deployment details, and project settings
- **[Configuration reference](../../../config/index.md)** - All the options you can set in redocly.yaml
