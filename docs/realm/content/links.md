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
# Manage links

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

When adding links in the project, use paths relative to the page with the link.
This rule applies to links in menus like the navbar, sidebar, and footer.
It also applies to React pages and pages in `@l10n` and version folders.

Below are some best practices and things to consider when linking in the project.

## Add links to localized content

Files from the default language that are not in other languages are copied into those languages when the project is built.
You can include a link in a file for the default language.
When the file is copied to other languages, the link is automatically modified to reference content from that language.
You can include a link in a file for a non-default language that references a file existing only in the default language.
In that case, reference the file as if it is in that language.

To illustrate how to reference localized content, the following examples use a project with the following file structure:

```treeview
your-project/
├── @l10n/
│   ├── es-ES/
│   │   ├── install-guide.md
│   │   ├── deploy-guide.md
│   │   └── index.md
│   └── fr/
│       ├── install-guide.md
│       ├── deploy-guide.md
│       └── index.md
├── common-doc.md
├── install-guide.md
├── deploy-guide.md
├── index.md
├── sidebars.yaml
└── redocly.yaml
```

### From default language

**Link to `@l10n/es-ES/install-guide.md` from `common-doc.md`**

```md
[Install](./install-guide.md)
```

### From non-default language

**Link to `common-doc.md` from `@l10n/fr/index.md`**

```md
[Common](common-doc.md)
```

## Add links to versioned content

You can add links to versioned content from other files, including `sidebars.yaml` or `redocly.yaml`.
The path to these files depends on the structure of your project.

To illustrate how to add links to versioned content, the following examples use a project with the following file structure:

```treeview
your-project/
├── @latest/
│   ├── api-info.md
│   ├── new-guide.md
│   ├── sidebars.yaml
│   └── index.md
├── @legacy/
│   ├── api-info.md
│   ├── old-guide.md
│   ├── index.md
│   └── sidebars.yaml
├── common-doc.md
└── redocly.yaml
```

### From Markdown pages

**Link to `@latest/api-info.md` from `common-doc.md`**

```md
[API Info](./@latest/api-info.md)
```

**Link to `@latest/new-guide.md` from `@latest/api-info.md`**

```md
[New guide is here](new-guide.md)
```

### From Redocly config

To add links to the navbar or footer, specify the relative path to the file.

**`redocly.yaml` example**

```yaml
navbar:
  items:
    - label: Latest API docs
      page: '@latest/new-guide.md'
    - label: Legacy API docs
      page: '@legacy/old-guide.md'
```

### From sidebars.yaml file

To reference pages in `sidebars.yaml`, specify relative path to the file.

**`@latest/sidebars.yaml` example**

```yaml
- page: api-info.md
  title: General API information
- page: new-guide.md
  title: New API guide
- page: index.md
```

## Add links in a React component

If you are including a link in a custom React component, use the Link component.
The Link component automatically updates the path prefix and [localization](./localization/localize-labels.md#localize-react-pages).
Users can import the link component in their React components using the following syntax:

```javascript
import { Link } from '@redocly/theme/components/Link/Link';
```

## Resources

- **[Redirects configuration](../config/redirects.md)** - Manage URL redirects to maintain links when restructuring your content and preserve SEO rankings
- **[Project structure](./project-structure.md#file-based-routing)** - Learn how your project structure is converted into URL paths
