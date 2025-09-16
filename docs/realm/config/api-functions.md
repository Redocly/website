---
products:
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Control where Redocly detects and hosts API functions.
---
# `apiFunctions`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Use the `apiFunctions` option to set paths where Redocly detects and hosts API functions.

By default, API functions are hosted at the `@api` folder and the path is served at `/api`.

## Options

{% table %}

- Option
- Type
- Description

---

- folders
- [string]
- List of paths where the API functions are stored.\
  Default value: `/@api`


{% /table %}


## Example

```yaml {% title="redocly.yaml" %}
apiFunctions:
  folders:
    - /my/api/folder/path/
    - /my/second/api/folder/path/
```

When you add this configuration to your project, the API functions are located in the `/my/api/folder/path/` and `/my/second/api/folder/path/` folders as well as the `/@api` folder.
All the endpoints in these folders are available at `/my/api/folder/path/...` and `/my/second/api/folder/path/...`, respectively.

This configuration describes the following folder structure:

```treeview
/
├── my/api/folder/path/
│   ├── hello.ts
│   └── communities/
│       └── [id].get.ts
├── my/second/api/folder/path/
│   ├── world.ts
│   └── books/
│       └── [id].get.ts
```

The corresponding API endpoints are:
- `/my/api/folder/path/hello`
- `/my/api/folder/path/communities/[id]`
- `/my/second/api/folder/path/world`
- `/my/second/api/folder/path/books/[id]`

## Resources

- **[API functions reference](../customization/api-functions/api-functions-reference.md)** - Complete reference for available API functions and their implementation in your documentation projects
