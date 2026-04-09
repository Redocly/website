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

Draft projects let you validate a Reunite project before you make it behave like a standard live project.
While a project is in draft mode, Reunite marks it as a draft project, protects deployment URLs behind login, and keeps the production deployment in a lower-scale setup.

Draft mode changes deployment access and production deployment behavior.
While a project stays in draft mode:

- Deployment URLs require users to log in before they can open them.
- The production deployment runs as a single instance instead of standard high-availability production scaling.

{% admonition type="info" %}
Draft mode protects deployment access while the project remains in draft mode.
If you still need restricted access after you go live, configure access controls before you remove draft protection.
{% /admonition %}

## Draft deployments

Draft mode changes both access behavior and production deployment behavior.

### Access protection

Draft deployment URLs require authentication.
This protection applies while the project remains in draft mode, so people must sign in before they can open draft deployment URLs.

{% admonition type="warning" name="RBAC settings take priority" %}
If you configure your own [RBAC](../../config/access/rbac.md) settings in `redocly.yaml`, they take priority over the default draft mode protection.
For example, if you explicitly grant `read` access to the `anonymous` team in your RBAC configuration, your draft deployments will be publicly accessible even while the project is in draft mode.
{% /admonition %}

### Production deployment behavior

The production deployment for a draft project runs as a single instance instead of using standard high-availability production scaling.
This makes draft mode useful for controlled review and internal validation before you switch the project to normal live deployment behavior.

## Go live with a draft project

{% admonition type="warning" name="Review access before going live" %}
When draft protection is removed, Reunite stops applying draft-mode login protection to new deployments.
If the project should stay limited to specific users after you go live, configure [RBAC](../../config/access/rbac.md) and review your project access settings before you continue.
{% /admonition %}

To publish a draft project:

1. Open the draft project in Reunite.
1. In the editor banner, click **Go Live**.
1. Confirm the action in the modal.

If you do not see the **Go Live** action, check your organization's project permissions.

When the **Go Live** request succeeds, Reunite starts a new production build for the project and removes draft mode as part of that flow.
You can then track that build on the [Deployments](./deployments.md) page.

## What happens after you go live

After you go live:

- New deployments are no longer treated as draft deployments.
- Reunite no longer applies login protection because of draft mode.
- The production deployment returns to the standard live deployment behavior for the project.

## Before you go live

Before you click **Go Live**, review the following:

- Who is able to view the project after you remove draft protection.
- Whether you need to configure [RBAC](../../config/access/rbac.md) or other access controls.
- If your production branch and deployment settings' are ready for a live deployment.
- If your content, API descriptions, and custom domain settings are ready to reach external users.

## Resources

- **[Deployments](./deployments.md)** - Track the new build after you click **Go Live**
- **[Manage projects](./manage-projects.md)** - Create, configure, and organize projects in Reunite
- **[Branches and deployments](./branches-and-deployments.md)** - Configure production branches, branch deployments, and preview behavior
- **[RBAC](../../config/access/rbac.md)** - Set up role-based access control for project and content access
- **[Roles and permissions](../../access/roles.md)** - Learn how organization and project permissions affect access to project actions
- **[Projects](./projects.md)** - Learn how project pages and settings work in Reunite
