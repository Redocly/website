---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# AsyncAPI extensions

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

AsyncAPI supports [extensions to the specification](https://www.asyncapi.com/docs/concepts/asyncapi-document/extending-specification).

Redoc supports these extensions in AsyncAPI descriptions:

- [x-additionalPropertiesName](./x-additional-properties-name.md) - Display a field name for an `additionalProperties` description.
- [x-badges](./x-badges.md) - Add visible badges to API operations.
- [x-enumDescriptions](./x-enum-descriptions.md) - Add readable labels for enum values.
- [x-metadata](./x-metadata.md) - Add custom metadata at the top of the info section.
- [x-rbac](x-rbac.md) - Control access to AsyncAPI objects.
- [x-seo](./x-seo.md) - Set SEO meta tags for an operation or channel page.
- [x-tagGroups](./x-tag-groups.md) - Group tags in the sidebar.

## Resources

- **[Add AsyncAPI description to your project](../add-asyncapi-docs.md)** - How to add AsyncAPI docs to your Redocly project
