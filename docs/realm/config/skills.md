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
description: Control how agent skills are published from your project.
---

# `skills`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

By default, Realm publishes every [agent skill](../customization/agent-skills/index.md) in your project for agents to discover.
Use the `skills` configuration to hide skills or exclude specific files from discovery.

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Stop publishing agent skills.
  When set to `true`, the skills index, the per-skill files, and the agent card return `404`, and skills are omitted from the MCP resources.
  Default: `false`.

---

- excludeFiles
- [string]
- Glob patterns matched against each skill's project-relative path.
  A skill whose path matches any pattern is excluded from discovery — the skills index, the agent card, and the MCP resources.
  A direct request for its `SKILL.md` returns `404`.
  Default: `[]`

{% /table %}

## Examples

### Exclude specific skills

Exclude staff-only runbooks from discovery while publishing the rest:

```yaml
skills:
  excludeFiles:
    - '@skills/internal/**'
```

### Hide all skills

Stop publishing every skill without removing the `@skills` folder:

```yaml
skills:
  hide: true
```

## Default configuration

```yaml
skills:
  hide: false
  excludeFiles: []
```

## Resources

- **[Agent skills](../customization/agent-skills/index.md)** - Author `SKILL.md` files and understand the discovery endpoints that publish them
- **[`mcp` configuration](./mcp.md)** - Configure the Docs MCP server that exposes skills as resources
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
