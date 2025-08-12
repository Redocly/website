# Configure RBAC for navigation

If you have a page in your project that you only want certain teams to be able to access, you can also limit access to any links to that page in navigation menus.
Navigation menus include links as items that can be part of groups.
Group RBAC configurations apply to all items listed in the group, whereas individual link RBAC configurations only apply to that specific item.
To set permissions for links or groups in navigation menus, you must add the `rbac` configuration option for them to either:

- your `redocly.yaml` file for links or groups in the navbar or footer menus
- your `sidebars.yaml` file for links or groups in the sidebar menu

## In the navbar and footer

To specify permissions for a link or group in the navbar or footer, add the item's RBAC configuration in the `redocly.yaml` file.

In the following `redocly.yaml` RBAC configuration examples, the link to `visible-link.md` is visible to all users:

**navbar example**

```yaml
navbar:
  items:
    - label: Protected page
      page: visible-link.md
      rbac:
        '*': read
```

**footer example**

```yaml
footer:
  copyrightText: Copyright © Redocly 2019-2020. All right reserved.
  items:
    - group: Support
      items:
        - label: Protected page
          page: visible-link.md
          rbac:
            '*': read
```

You can also control `group` visibility by adding the `rbac` configuration to the `group`.

In the following `redocly.yaml` RBAC configuration examples, the link to `invisible-link.md` is not visible to all users:

**navbar example**

```yaml
navbar:
  items:
    - group: Protected group
      rbac:
        '*': none
      items:
        - label: Visible page
          page: invisible-link.md
```

**footer example**

```yaml
footer:
  copyrightText: Copyright © Redocly 2019-2020. All right reserved.
  items:
    - group: Hidden Support Group
      rbac:
        '*': none
      items:
        - label: Visible page
          page: invisible-link.md
```

{% admonition type="warning" name="Invisible is not private" %}
Making the navigation links not visible does not protect the content if the user has a direct link to it.
{% /admonition %}

## In the sidebar

To specify permissions for a link or group in the sidebar, add the item's `rbac` configuration to the `sidebars.yaml` file.

In the following `sidebars.yaml` RBAC configuration example, the link to `visible-link.md` is visible in the sidebar to all users:

```yaml
- page: ../visible-link.md
  label: Protected page
  rbac:
    '*': read
```

In the following `sidebars.yaml` RBAC configuration example, the link to `invisible-link.md` is not visible in the sidebar to all users:

```yaml
- group: Hidden group
  rbac:
    '*': none
  items:
    - page: ../invisible-link.md
      label: Protected page
```

{% admonition type="warning" name="Invisible is not private" %}
Making the navigation links not visible does not protect the content if the user has a direct link to it.

Pages that are hidden by RBAC configuration do not generate sidebar links.
If all pages in a group are hidden, the sidebar group is also hidden.

{% /admonition %}

## Resources

- **[RBAC concepts](./rbac.md)** - Understand how role-based access control works and the relationship between roles, teams, and navigation permissions
- **[RBAC configuration guide](./index.md)** - Complete step-by-step instructions for implementing RBAC across your documentation project, including navigation setup
- **[RBAC configuration reference](../config/rbac.md)** - Detailed configuration options and syntax for setting up role-based access control in navigation files
- **[OpenAPI RBAC extension](../content/api-docs/openapi-extensions/x-rbac.md)** - Apply RBAC permissions to specific objects and sections within your OpenAPI reference documentation
