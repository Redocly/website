---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Add OpenAPI descriptions

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Transform an OpenAPI description in YAML or JSON into interactive reference documentation by adding it to your project.
You can add one or more descriptions.

## Before you begin

Make sure you have an OpenAPI description file in YAML or JSON format.
All versions of OpenAPI are supported.

## Add an OpenAPI description to your project

Place the OpenAPI description file anywhere in your project, either at the root or in a folder.
When you run your project, the file is detected automatically and served as reference documentation with its own sidebar.
The sidebar is generated from the tags and operations in the description.
No extra configuration is required.

For example, add `apis/sample-api.yaml`, then open `/apis/sample-api` to see the generated reference.

{% admonition type="info" name="The file path sets the reference URL" %}
The API reference's URL path matches the location of its OpenAPI description file in your project, with the file extension removed.
For example, `apis/museum.yaml` is served at `/apis/museum`.

To change the URL, rename or move the OpenAPI description file to the path you want it served from.
For more information, see [file-based routing](../project-structure.md#file-based-routing).
{% /admonition %}

## Add API reference to your site navigation

The reference is served at its own URL and has its own automatically generated sidebar.
It's reachable as soon as you add it, with no navigation configuration required.

To help people find it, link to it from wherever you want.
For example, add it to the [navbar](../../config/navbar.md) with a `page` that points at the OpenAPI file:

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - page: apis/sample-api.yaml
      label: Sample API
```

You can also link to it from an in-page text link, a card, or an [API catalog](../../config/catalog-classic.md).

To place the reference inside a custom sidebar alongside your other content, with control over its order and grouping, add it to a [`sidebars.yaml`](../../navigation/sidebars.md) file:

```yaml {% title="sidebars.yaml" %}
- group: Sample product 1 API
  items:
    - page: apis/sample-product-1.yaml
      label: Sample product 1 API
- group: Sample product 2 API
  items:
    - page: apis/sample-product-2.yaml
      label: Sample product 2 API
```

For all available options, see [Sidebar configuration](../../navigation/sidebars.md).

## Resources

- **[Sidebar configuration](../../navigation/sidebars.md)** - Organize and customize the sidebar navigation for your API references and other content
- **[Navbar configuration](../../config/navbar.md)** - Add top-level links to your API references and other pages
- **[API catalog configuration](../../config/catalog-classic.md)** - Showcase multiple REST, GraphQL, and AsyncAPI descriptions together in a catalog
- **[Replay API explorer](https://redocly.com/docs/end-user/test-apis-replay)** - Learn about the interactive API testing features used in reference documentation
- **[OpenAPI extensions](./openapi-extensions/index.md)** - Use custom extensions to create richer, more detailed reference documentation
- **[OpenAPI configuration reference](../../config/openapi/index.md)** - Customize how OpenAPI descriptions are rendered, styled, and behave
