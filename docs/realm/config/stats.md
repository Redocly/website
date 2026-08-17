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
description: Control what the stats page collects about your project's files.
---

# `stats`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Redocly generates a built-in stats page (`redocly/project/stats`) for your project.
The page is available to logged-in users only, whatever your [`rbac`](./access/rbac.md) configuration says.
During CI/CD builds, it writes the same statistics to a `stats.json` file for build reporting.
Use `stats` to control what additional data this collection includes.
File extension counts help you audit the mix of content types in a large project, for example, spotting stray files that don't belong in your published documentation.

By default, API statistics are collected for every OpenAPI definition in the project.
When a definition is also listed in the [root-level `apis`](https://redocly.com/docs/cli/configuration/reference/apis#examples) option, its configured name is used instead of the file path in the statistics output.
Use `stats.apis` to restrict statistics to a specific set of APIs and give each one an explicit name.

## Options

{% table %}

- Option
- Type
- Description

---

- fileExtensions
- boolean
- Include a breakdown of project files by extension on the stats page and in the `stats.json` build output.
  Lockfiles, build artifacts and files excluded by your [`ignore`](./ignore.md) configuration are not counted.
  Default: `false`.

---

- apis
- [object]
- Restrict API statistics to exactly these APIs, each identified by a `name` and a `path` to its OpenAPI definition file.
  When set, only the listed APIs are measured, and each one's `name` is always used in the statistics output instead of its file path or any matching root-level `apis` name.
  A `path` that doesn't match any OpenAPI definition found in the project, or two entries sharing the same `name`, fail the build.
  Optional. Default: all OpenAPI definitions in the project.

{% /table %}

## Examples

### Enable file extension counting

```yaml
stats:
  fileExtensions: true
```

### Restrict statistics to specific APIs

```yaml
stats:
  apis:
    - name: Museum API
      path: openapi/museum.yaml
    - name: Orders API
      path: openapi/orders.yaml
```

## Default configuration

```yaml
stats:
  fileExtensions: false
```

## Resources

- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
