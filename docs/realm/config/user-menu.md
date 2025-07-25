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
# `userMenu`

The user menu is a navigation menu that displays in the far right side of the navbar.
Users can click the user avatar and a dropdown menu displays with the avatar, the user's email address, links to pages you can configure, and a log out option.

![Screenshot of the user menu with the dropdown displayed](./images/user-menu.png)

{% admonition type="info" %}

You must also have `sso` and either `rbac` or `requiresLogin` configured for the userMenu to display.

{% /admonition %}

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the User menu should be hidden.
  Only required if you do not add any other options to the configuration.
  Default: `false`.

---

- hideLoginButton
- boolean
- Specifies if the login button that displays in the far right side of the navbar should be hidden.
  Default: `false`.

---

- items
- [Item](#item-object)
- List of links in the User menu dropdown.

---

{% /table %}


### Item object

{% table %}

- Option
- Type
- Description

---

- page
- string
- **CONDITIONALLY REQUIRED.** Path to the file which represents the page to link to.
  Mutually exclusive with the `href` option.
  If you use the `page` option, and do not include the `label` option, the text for the link on the sidebar will match the level 1 heading of the page.

---

- href
- string
- **CONDITIONALLY REQUIRED.** URL to link to.
  Mutually exclusive with the `page` option.
  If you use the `href` option, and do not include the `label` option, the text for the link on the sidebar will match the `href` option's value.

---

- label
- string
- Link text displayed for the item.

---

- labelTranslationKey
- string
- Link text key for the item used for [localization](./l10n.md).

---

- external
- boolean
- Open link in new browser tab.
  Default is `false`.

{% /table %}

## Examples

```yaml
userMenu:
  hide: false
  hideLoginButton: true
  items:
    - href: /my-settings/
      label: Settings
```

## Related options

- View options for adding more links to the navbar in the [`navbar`](./navbar.md) configuration reference.
- Configure [`sso`](./sso.md) and either [`rbac`](./rbac.md) or [`requiresLogin`](./requires-login.md) to display the user menu in your navbar.

## Resources

- Learn more about how to [configure RBAC](../access/index.md) in the how-to documentation.
- Follow steps for [configuring SSO](../reunite/organization/sso/configure-sso.md) in the how-to documentation.
- Discover how RBAC works in Redocly products in the [RBAC](../access/rbac.md) conceptual documentation.