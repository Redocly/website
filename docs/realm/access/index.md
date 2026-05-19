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
# Access control

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Realm offers two ways to secure your documentation: through a login requirement, or with role-based access control (RBAC).

## Make your project private with a login

Users with the Pro plan can restrict access to their published project by configuring `requiresLogin` in `redocly.yaml`.
This configuration option hides your content behind a login screen.
Only the users who were invited to your organization in Reunite, or added through an external identity provider, can log in and access your content.

To configure access to your project, see [`requiresLogin`](../config/access/requires-login.md).

## Role-based Access Control

Enterprise and Enterprise+ users can configure Redocly's RBAC system to protect sensitive documentation, restrict access to specific user groups, and manage permissions at the page and navigation level.
RBAC is perfect for internal documentation, API keys, or content that should only be visible to specific teams.

### Authentication vs Authorization

Understanding the difference between authentication and authorization is crucial for setting up access control:

**Authentication** identifies **who you are** - handled by your identity provider (SSO) when users log in.

**Authorization** determines **what you can access** - controlled by your roles, which come from:
- **Identity provider claims/attributes** for organization-wide roles (when using SSO)
- **Manual role assignment** for organization-wide roles (when using Redocly's login system)
- **Team assignments** for project-specific access (teams can be managed through identity provider or Redocly)

The source of your role and team information depends on whether you're using SSO with an identity provider or Redocly's built-in authentication and team management systems.

### Core access control concepts

Access control in Redocly operates on a role-based system where:

1. **Users are assigned roles** in your organization or project
1. **Content is tagged with access requirements** using configuration or front matter
1. **The system automatically filters** what each user can see based on their roles
1. **Navigation adapts dynamically** to show only accessible content

{% cards columns=2 %}

{% card title="Roles" icon="users" to="./roles.md" %}
Define user roles and permissions to control access levels across your documentation project.
{% /card %}

{% card title="RBAC concepts" icon="shield" to="./rbac.md" %}
Understand how role-based access control works and how to implement security for your content.
{% /card %}

{% /cards %}

### Access control types

{% cards columns=2 %}

{% card title="Page permissions" icon="file-lock" to="./page-permissions.md" %}
Control access to individual pages and content sections based on user roles and permissions.
{% /card %}

{% card title="Navigation permissions" icon="chart-tree-map" to="./links-and-groups-permissions.md" %}
Manage visibility of navigation links and groups to create role-specific navigation experiences.
{% /card %}

{% /cards %}

### Get started with RBAC

1. **Set up roles** - Define the [user roles](./roles.md) needed for your organization and understand the difference between organization and project roles
1. **Understand RBAC** - Learn the [RBAC concepts](./rbac.md) and security model including how teams, roles, and resources work together
1. **Protect pages** - Apply [page permissions](./page-permissions.md) to sensitive content using front matter or configuration-based access control
1. **Control navigation** - Configure [navigation permissions](./links-and-groups-permissions.md) for role-specific menus in navbar, footer, and sidebar

### Access control use cases

**Internal documentation**

Separate public and internal content, hiding sensitive information from external users while keeping it accessible to employees.

**API documentation tiers**

Show different API endpoints and features based on subscription levels or user permissions.

**Team-specific content**

Create content visible only to specific teams (engineering, sales, support) while maintaining a unified documentation site.

**Progressive disclosure**

Show basic content to all users while revealing advanced features and configurations to authorized personnel.

## Resources

- **[Roles and permissions](./roles.md)** - Configure user roles and permissions to control access levels across your documentation project
- **[RBAC implementation](./rbac.md)** - Understand how role-based access control works and implement security best practices for your content
- **[Page-level access control](./page-permissions.md)** - Control access to individual pages and content sections based on user roles and permissions
- **[Navigation permissions](./links-and-groups-permissions.md)** - Manage visibility of navigation links and groups to create role-specific navigation experiences
- **[`access` configuration](../config/access/index.md)** - Explore access configuration options