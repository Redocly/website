---
seo:
  title: Portal configuration files
excludeFromSearch: true

---

# Configuration files

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

After you [install](../installation.md) the developer portal template, you have a variety of files and folders in your portal project. Some of those files are used to configure and customize your portal.

{% admonition type="danger" name="Warning" %}
Do not remove or modify the contents of the **node_modules** folder. It contains the software library dependencies.
{% /admonition %}

The following files must be kept at the top level of the project structure. You must not remove them, but you may change their contents to configure the appearance, content, and the navigation of your portal.


| File  | Description |
| ------------- | ------------- |
| `index.mdx` or `index.md`  | The home page of your developer portal. You'll need to replace the default content with your own. <div class="attention">To display a navigation sidebar on the home page, you must include the `index.md(x)` page in the `sidebars.yaml` file.</div>  |
| `siteConfig.yaml`  | Contains the [main configuration options](./siteconfig/index.md) for navbars, footers, stylesheets, custom scripts, analytics, and more. |
| `theme.ts` | Controls the [fonts, colors and styles](./theme.md) used throughout your developer portal. |
| `sidebars.yaml` | Controls the [portal sidebar](./sidebar-nav.md) content. |
| `favicon.png` | Displays the favicon. Replace it with your favicon. |


## Access controls

Unless you are self-hosting, access controls are managed within our app as part of our CI/CD Workflows product.

Redocly developer portal is a static site generator, and access controls must be implemented on the server-side.
