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
# Draft projects

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Draft projects let you validate a Reunite project in a production environment before you make it behave like a standard live project.
While a project is in draft mode, Reunite marks it as a draft project, protects deployment URLs behind login, and keeps the production deployment in a lower-scale setup.

Draft mode changes deployment access and production deployment behavior.
While a project stays in draft mode:

- Deployment URLs require users to log in before they can open them.
- The production deployment runs as a single instance instead of standard high-availability production scaling.

Draft mode protects deployment access while the project remains in draft mode.
If you still need restricted access after you go live, configure access controls before you remove draft protection.

## Draft deployments

Draft mode changes both access behavior and production deployment behavior.
You can see which builds are in draft mode on the **Deployments** page.

{% img
  alt="Draft mode banner above a deployments table listing production and preview builds marked as Draft"
  src="../images/draft-deployments-list.png"
  withLightbox=true
/%}

Each deployment created while the project is in draft mode is labeled with a **Draft** badge.
Because draft mode protections are embedded into the deployment artifact, these deployments maintain their draft status and access protection even after the project goes live.

### Access protection

Draft deployment URLs require authentication.
This protection applies while the project remains in draft mode, so users must sign in before they can open draft deployment URLs.

After your project goes live, earlier draft deployments existing in Reunite still retain access protection.

{% admonition type="warning" name="RBAC settings take priority" %}
If you configure your own [RBAC](../../config/access/rbac.md) settings in `redocly.yaml`, they take priority over the default draft mode login protection.
For example, if you explicitly grant `read` access to the `anonymous` team in your RBAC configuration, your draft deployments can be publicly accessible even while the project is in draft mode.
{% /admonition %}

### Production deployment behavior

The production deployment for a draft project runs as a single instance instead of using standard high-availability production scaling.
This makes draft mode useful for controlled review and internal validation before you switch the project to normal live deployment behavior.

## Before you go live

Before you click **Go live**, review the following:

- Who is able to view the project after you remove draft protection.
- Whether you need to review or configure [access control](../../access/index.md) for the project.
- If your production branch and deployment settings are ready for a live deployment.
- If your content, API descriptions, and custom domain settings are ready to reach external users.

## Go live with a draft project

{% admonition type="warning" name="Going live is irreversible" %}
The **Go live** action cannot be undone.
Once you publish the project, it cannot be returned to draft mode.
{% /admonition %}

When draft protection is removed, Reunite stops applying draft-mode login protection to new deployments.
If the project should stay limited to specific users after you go live, configure [RBAC](../../config/access/rbac.md) and review your project access settings before you continue.

To publish a draft project:

1. Open the draft project in Reunite.
  {% img
    alt="Projects list with live and draft project cards; the draft project shows a Draft badge"
    src="../images/draft-projects-list.png"
    withLightbox=true
  /%}

1. In the editor banner, click **Go live**.
  {% img
    alt="Project Editor with a draft mode banner across the top and a Go live button on the right"
    src="../images/draft-project-inline-status.png"
    withLightbox=true
  /%}

1. Confirm the action in the modal.
  {% img
    alt="Go live confirmation dialog with project information, branch and commit to publish, and Cancel and Go live actions"
    src="../images/draft-project-go-live-confirmation.png"
    withLightbox=true
  /%}

If you do not see the **Go live** button, check your organization's project permissions.

When the **Go live** request succeeds, Reunite starts a new production build for the project and removes draft mode as part of that flow.
You can then track that build on the [Deployments](./deployments.md) page.

## What happens after you go live

After you go live:

- New deployments are no longer treated as draft deployments.
- Reunite no longer applies draft mode login protection.
- The production deployment returns to the standard live deployment behavior for the project.

## Resources

- **[Deployments](./deployments.md)** - Track the new build after you click **Go live**
- **[Manage projects](./manage-projects.md)** - Create, configure, and organize projects in Reunite
- **[Branches and deployments](./branches-and-deployments.md)** - Configure production branches, branch deployments, and preview behavior
- **[Access control](../../access/index.md)** - Understand authentication, authorization, roles, teams, and how they affect who can view your project and content
- **[Roles and permissions](../../access/roles.md)** - Learn how organization and project permissions affect access to project actions
- **[Projects](./projects.md)** - Learn how project pages and settings work in Reunite
