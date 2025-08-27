# Access control

Secure your documentation with role-based access control (RBAC) to manage who can view and access different parts of your project.

## Overview

Redocly's access control system lets you protect sensitive documentation, restrict access to specific user groups, and manage permissions at the page and navigation level. Perfect for internal documentation, API keys, or content that should only be visible to specific teams.

## Authentication vs Authorization

Understanding the difference between authentication and authorization is crucial for setting up access control:

**Authentication** identifies **who you are** - handled by your identity provider (SSO) when users log in.

**Authorization** determines **what you can access** - controlled by your roles, which come from:
- **Identity provider claims/attributes** for organization-wide roles (when using SSO)
- **Manual role assignment** for organization-wide roles (when using Redocly's login system)
- **Team assignments** for project-specific access (teams can be managed through identity provider or Redocly)

The source of your role and team information depends on whether you're using SSO with an identity provider or Redocly's built-in authentication and team management systems.

## Core concepts

{% cards columns=2 %}

{% card title="Roles" icon="users" to="./roles.md" %}
Define user roles and permissions to control access levels across your documentation project.
{% /card %}

{% card title="RBAC concepts" icon="shield" to="./rbac.md" %}
Understand how role-based access control works and how to implement security for your content.
{% /card %}

{% /cards %}

## Access control types

{% cards columns=2 %}

{% card title="Page permissions" icon="file-lock" to="./page-permissions.md" %}
Control access to individual pages and content sections based on user roles and permissions.
{% /card %}

{% card title="Navigation permissions" icon="chart-tree-map" to="./links-and-groups-permissions.md" %}
Manage visibility of navigation links and groups to create role-specific navigation experiences.
{% /card %}

{% /cards %}

## How access control works

Access control in Redocly operates on a role-based system where:

1. **Users are assigned roles** in your organization or project
2. **Content is tagged with access requirements** using configuration or front matter
3. **The system automatically filters** what each user can see based on their roles
4. **Navigation adapts dynamically** to show only accessible content

## Getting started

1. **Set up roles** - Define the [user roles](./roles.md) needed for your organization and understand the difference between organization and project roles
2. **Understand RBAC** - Learn the [RBAC concepts](./rbac.md) and security model including how teams, roles, and resources work together
3. **Protect pages** - Apply [page permissions](./page-permissions.md) to sensitive content using front matter or configuration-based access control
4. **Control navigation** - Configure [navigation permissions](./links-and-groups-permissions.md) for role-specific menus in navbar, footer, and sidebar

## Use cases

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