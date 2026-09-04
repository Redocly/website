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
description: Collect statistics about the content and API descriptions in your project.
---

# `stats`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Statistics tell you how much content a project actually holds: how many pages it builds, how many files of each type it contains, and how large each API description is.
Add the `stats` configuration to collect them during every build.

The counts appear in two places:

- On the project statistics page, at `/redocly/project/stats`.
  The page is excluded from the sidebar, and only signed-in users can open it.
- In the build output, so you can read them in the local development server and in the Reunite build logs.

Without the `stats` configuration, nothing is collected and the statistics page is not built.
An empty `stats: {}` is enough to measure every OpenAPI description in the project.

## Options

{% table %}

- Option
- Type
- Description

---

- fileExtensions
- boolean
- Count project files, grouped by file extension.
  Every file in the project directory is counted, including images, translations, and configuration files.
  The version control and dependency folders are skipped, as is the root `public` folder the build writes to.
  Default: `false`.

---

- apis
- [[API object](#api-object)]
- Collect statistics only for the listed API descriptions.
  When omitted, every OpenAPI description in the project is measured.

{% /table %}

### API object

{% table %}

- Option
- Type
- Description

---

- path
- string
- **REQUIRED.** Path to the OpenAPI description file, relative to the configuration file.
  The build fails if no API description matches the path.

---

- name
- string
- Name to show for the API in the statistics.
  Falls back to the name from the [`apis` configuration](./apis.md), then to the file path.
  Every API in the statistics must have a unique name.

{% /table %}

For each API description, the statistics report the number of references, external documents, schemas, parameters, links, path items, operations, and tags.

## Examples

### Collect statistics for the whole project

Measure every OpenAPI description and count the project files:

```yaml {% title="redocly.yaml" %}
stats:
  fileExtensions: true
```

### Limit statistics to specific APIs

A project with many API descriptions can report only the ones the team tracks:

```yaml {% title="redocly.yaml" %}
apis:
  museum@v1:
    root: ./apis/museum/openapi.yaml
stats:
  apis:
    - path: ./apis/museum/openapi.yaml
    - path: ./apis/tickets/openapi.yaml
      name: Ticketing
```

The first API is reported as `museum@v1`, the name it has in `apis`.
The second API has no entry in `apis`, so `name` supplies the label `Ticketing` instead of the file path.

## Default configuration

```yaml
stats:
  fileExtensions: false
```

## Resources

- **[`apis` configuration](./apis.md)** - Register the API descriptions that statistics are collected for, and give them the names the statistics report
- **[`requiresLogin` configuration](./access/requires-login.md)** - Control which users are signed in, and therefore who can open the project statistics page
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
