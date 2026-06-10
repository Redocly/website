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

# Migrating from Workflows/Portal to Realm

This guide helps you transition your existing Redocly Workflows or Portal projects to Realm. Realm offers improved performance, a more robust configuration system, and enhanced content features.

## Configuration mapping

In legacy Portal projects, the primary configuration file was `portal.json`. In Realm, configuration is split between `redocly.yaml` (global settings) and `sidebars.yaml` (navigation).

### From `portal.json` to `redocly.yaml`

Many properties from `portal.json` have direct counterparts in `redocly.yaml`.

| Legacy `portal.json` | Realm `redocly.yaml` | Notes |
| :--- | :--- | :--- |
| `title` | `seo.title` | Moved to SEO section. |
| `logo` | `logo` | Similar structure, but uses `srcSet` for multiple modes. |
| `favicon` | `favicon` | Defined at the root or under `seo`. |
| `theme` | `theme` (removed) | Customization is now handled via CSS variables and `@theme/styles.css`. |
| `nav` | `navbar` | Defines the top navigation bar. |

### From `portal.json` to `sidebars.yaml`

The `nav` property in `portal.json` often defined both the top navbar and the side navigation. In Realm, the side navigation is typically managed in one or more `sidebars.yaml` files.

- **Automatic generation:** If you don't create a `sidebars.yaml`, Realm automatically generates a sidebar based on your folder structure.
- **Manual control:** Use `sidebars.yaml` for precise control over the order, labels, and grouping of your documentation pages.

Refer to the [Sidebars documentation](../navigation/sidebars.md) for detailed configuration options.

## Content migration

### Markdown and Markdoc

Realm uses Markdoc for enhanced Markdown support. While standard Markdown remains compatible, there are significant changes for interactive components.

- **MDX/JSX is not supported:** If you were using `.mdx` files or embedding JSX in your Markdown, you must convert these to Markdoc tags.
- **Asciidoc:** Asciidoc support in Realm may differ from legacy Portal. We recommend transitioning to Markdown/Markdoc for the best experience.

### Migrating MDX components

Instead of importing and using React components, use Realm's built-in Markdoc tags.

**Legacy MDX:**
```jsx
<Admonition type="info">Content</Admonition>
```

**Realm Markdoc:**
```markdoc {% process=false %}
{% admonition type="info" %}
Content
{% /admonition %}
```

See the [Markdoc tags library](../content/markdoc-tags/tag-library.md) for all available components.

## Deployment changes

Realm projects are managed through Reunite. Instead of the legacy Workflows interface, you will use the Reunite dashboard to manage deployments, environment variables, and custom domains.

- **Environment variables:** Use the Reunite project settings to define variables like `REDOCLY_PREFIX_PATHS`.
- **Custom domains:** Custom domains must be unique per project and are configured in the project settings.

## Next steps

1. [Get started locally](./start-local-dev.md) to test your migration.
2. Review the [Configuration reference](../config/index.md) for all available options.
3. Check the [Project structure guide](../content/project-structure.md) to organize your files for Realm.
