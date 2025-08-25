---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `menu`

Controls the menu of the GraphQL docs, allowing grouping of queries, mutation, objects, and other elements in the sidebar.
Use this option to make a large or complex GraphQL description easier for users to navigate and use.

## Menu object

{% table %}

- Option
- Type
- Description

---

- groups
- [[Menu groups object](#menu-groups-object)]
- Add top-level groups for different areas of your GraphQL API.
  Useful for larger GraphQL APIs to add structure to the documentation.

---

- otherItemsGroupName
- string
- Any items that don't match another group will be added under this group.

---

- requireExactGroups
- boolean
- Requires every group to be defined.
  If not, it results in an error.
  Default: `false`.

{% /table %}

## Menu groups object

{% table %}

- Option
- Type
- Description

---

- name
- string
- Group name.

---

- items
- [Type group config object](#type-group-config-object)
- Configuration for a group of Items.

---

- queries
- [Type group config object](#type-group-config-object)
- Configuration for a group of Queries.

---

- mutations
- [Type group config object](#type-group-config-object)
- Configuration for a group of Mutations.

---

- subscriptions
- [Type group config object](#type-group-config-object)
- Configuration for a group of Subscriptions.

---

- types
- [Type group config object](#type-group-config-object)
- Configuration for a group of Types.

---

- directives
- [Type group config object](#type-group-config-object)
- Configuration for a group of Directives.

{% /table %}

### Type group config object

{% table %}

- Option
- Type
- Description

---

- includeByName
- string
- JavaScript [ECMA-262](https://262.ecma-international.org/13.0/#sec-regular-expressions) regular expression pattern to include in the group by name.

---

- excludeByName
- string
- JavaScript [ECMA-262](https://262.ecma-international.org/13.0/#sec-regular-expressions) regular expression pattern to include in the group by name.

{% /table %}

## Examples

The following example defines groups for the GraphQL items, and puts everything else under an "Other" entry:

```yaml
graphql:
  menu:
    requireExactGroups: false
    groups:
      - name: 'Cart'
        items:
          includeByName: ['/cart/i']
      - name: 'Products'
        items:
          includeByName: ['/product/i']
      - name: 'Customer'
        items:
          includeByName: ['/customer/i']
      - name: 'Company'
        items:
          includeByName: ['/company/i']
      - name: 'Gift'
        items:
          includeByName: ['/gift/i']
    otherItemsGroupName: 'Other'
```

With this configuration in place, the sidebar shows the cart, product, customer, company and gift items under their own sections.

## Resources

- **[GraphQL](https://graphql.org/)** - Official GraphQL specification and documentation for understanding query language fundamentals
- **[GraphQL configuration](./index.md)** - Complete guide to GraphQL configuration options for customizing API reference documentation
