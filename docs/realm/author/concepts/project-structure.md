---
title: Project structure
description: An introduction to the file structure of a Redocly project.
---

# Project structure

Redocly follows a **zero-config** philosophy.
While it provides an opinionated structure for clarity, the only hard requirement is **at least one content file** to generate a documentation site.

Knowing the common conventions helps you navigate, contribute to, and customize your project more effectively.

## Common directories and files

A typical Redocly project includes the following folders and files. Only one content file is strictly required — the rest are optional but help organize and extend your project:

* **content files and folders**: Files that generate pages (see [Content Files](#content-files) below).
  This is the only *required* element - you need at least one file of content.
* `redocly.yaml`: The primary configuration file used to customize features, navigation, theming, and more.
  While optional for a basic start, it's essential for most customizations.
* `package.json`: This is the project manifest for managing Node.js dependencies.
  It is not required unless you want to specify a particular version of Redocly packages or install any third-party dependencies.
* `_partials/`: A directory for reusable Markdoc partials.
* `@l10n/`: A directory for locale folders.
* `@theme/`: A directory for customizing the look, feel, and components of your portal.
* `static/`: Optional directory for assets that should be copied directly to the build output without processing.
* `sidebars.yaml`: Optional file(s) that can define the structure of one or multiple navigation sidebars.

### Example project tree

A common Redocly project directory might look like this:

{% tabs %}
{% tab label="Multiple Sidebars" %}

```treeview
.
├── @theme/                 # Theme customizations and custom components
│   ├── layouts/
│   ├── markdoc/            # Markdoc configuration
│   │   ├── components.tsx  # Markdoc custom components
│   │   └── schema.ts       # Markdoc custom schema
│   └── styles.css          # Custom global CSS
├── _partials/              # Reusable Markdoc partials
├── apis/                   # API description files (e.g., OpenAPI, AsyncAPI, GraphQL)
│   └── museum.yaml
├── guides/                 # Guides
│   ├── guide-1.md
│   ├── guide-2.md
│   ├── images/             # Images for the specific content
│   │   └── guide-1-screenshot.png
│   ├── index.md
│   └── sidebars.yaml       # Sidebar specific to the 'guides' section
├── images/                 # Various shared images
│   ├── favicon.png
│   └── header-image.png
├── tutorials/              # Tutorials
│   ├── tutorial-1.md
│   ├── tutorial-2.md
│   ├── index.md
│   └── sidebars.yaml       # Sidebar specific to the 'tutorials' section
├── static/                 # Static assets copied directly to build output
│   └── robots.txt
├── index.page.tsx          # Custom React component for the landing page
├── package.json            # Node.js project manifest
└── redocly.yaml            # Main Redocly configuration file
```

{% /tab %}

{% tab label="Single Sidebar" %}

```treeview
.
├── @theme/                 # Theme customizations and custom components
│   ├── layouts/
│   ├── markdoc/            # Markdoc configuration
│   │   ├── components.tsx  # Markdoc custom components
│   │   └── schema.ts       # Markdoc custom schema
│   └── styles.css          # Custom global CSS
├── _partials/              # Reusable Markdoc partials
├── apis/                   # API description files (e.g., OpenAPI, AsyncAPI, GraphQL)
│   └── museum.yaml
├── guides/                 # Guides
│   ├── guide-1.md
│   ├── guide-2.md
│   ├── images/             # Images for the specific content
│   │   └── guide-1-screenshot.png
│   └── index.md            # Landing page for guides
├── images/                 # Various shared images
│   ├── favicon.png
│   └── header-image.png
├── tutorials/              # Tutorials
│   ├── tutorial-1.md
│   ├── tutorial-2.md
│   └── index.md            # Landing page for tutorials
├── static/                 # Static assets copied directly to build output
│   └── robots.txt
├── index.md                # Landing page as markdown file
├── package.json            # Node.js project manifest
├── redocly.yaml            # Main Redocly configuration file
└── sidebars.yaml           # Single sidebar definition for the entire site
```

{% /tab %}

{% tab label="Multiple locales" %}

The following example file structure is for a Redocly project that includes three locales - Spanish-Spain, French and English (default):

```treeview
.
├── @l10n/
│   ├── es-ES/
|   |   ├── tutorials/
|   |   │   ├── getting-started.md
|   |   │   └── index.md
|   |   ├── how-tos/
|   |   │   ├── install.md
|   |   │   └── index.md
|   |   ├── concepts/
|   |   │   ├── terms.md
|   |   │   └── index.md
|   |   └── translations.yaml
│   ├── fr/
|   |   ├── tutorials/
|   |   │   ├── getting-started.md
|   |   │   └── index.md
|   |   ├── how-tos/
|   |   │   ├── install.md
|   |   │   └── index.md
|   |   ├── notions/
|   |   │   ├── terms.md
|   |   │   └── index.md
|   |   └── translations.yaml
├── tutorials/
│   ├── getting-started.md
│   └── index.md
├── how-tos/
│   ├── install.md
│   └── index.md
├── concepts/
│   ├── terms.md
│   └── index.md
├── sidebars.yaml
├── index.md
└── redocly.yaml
```
{% /tab %}

{% tab label="Multiple products" %}

```treeview
.
├── @theme/                 # Theme customizations and custom components
│   ├── layouts/
│   ├── markdoc/            # Markdoc configuration
│   │   ├── components.tsx  # Markdoc custom components
│   │   └── schema.ts       # Markdoc custom schema
│   └── styles.css          # Custom global CSS
├── _partials/              # Reusable Markdoc partials
├── products/               # Guides
│   ├── product-1/          # Product 1
|   |   ├── apis/           # The nested project structure can use any content structure
|   |   ├── concepts/
|   |   ├── how-tos/
|   |   ├── tutorials/
|   |   ├── index.md
|   |   └── sidebars.yaml
│   ├── product-2/          # Product 2
|   |   ├── apis/
│   │   ├── concepts/
│   │   ├── how-tos/
│   │   ├── tutorials/
│   │   ├── index.md
│   │   └── sidebars.yaml
├── images/                 # Various shared images
│   ├── favicon.png
│   └── header-image.png
├── static/                 # Static assets copied directly to build output
│   └── robots.txt
├── index.page.tsx          # Custom React component for the landing page
├── package.json            # Node.js project manifest
└── redocly.yaml            # Main Redocly configuration file
```
{% /tab %}

{% tab label="Minimal" %}

```treeview
.
└── index.md                # Landing page as markdown file
```
{% /tab %}

{% /tabs %}

*(Note: This is an illustrative example. Your specific structure might vary based on configuration and content organization.)*

## Core configuration

### `redocly.yaml`

This is the central configuration file for your Redocly project.

Refer to the [Redocly configuration documentation](../../config/index.md) for a complete overview.

### `package.json`

Standard Node.js project file used by package managers (like `pnpm`, `npm`, `yarn` or `bun`) to manage project dependencies.

It is optional but when it exists it must list your Redocly package as a dependency (e.g. `@redocly/realm`).
It may also include other packages for custom React-based pages or specific features.

### `sidebars.yaml`

You can create one or more `sidebars.yaml` files to define custom navigation structures.
Each file declares a hierarchy of items (pages, groups, links, separators).

A sidebar appears only if the current page is explicitly listed in a `sidebars.yaml`.
If `sidebars.yaml` file doesn't exist, Redocly falls back to generating a basic sidebar from the folder structure.

For complex projects, using multiple `sidebars.yaml` files (e.g., one per major section) provides fine-grained navigation control.

Refer to the [Sidebars configuration options](../reference/sidebars.md) for detailed syntax and options.

## Content files

Redocly treats several file types as primary content sources, automatically generating documentation pages from them based on their location in the filesystem.

Supported content file types include:

* **Markdown (`.md`)**: The most common format for documentation pages.
  Redocly uses [**Markdoc**](https://markdoc.io/), an extensible Markdown format, allowing for custom components, partials, and advanced content features.
* **React pages (`.page.tsx`)**: React components used for pages requiring complex layouts, dynamic data fetching, or custom interactive elements.
  These allow full control over layout, interactivity, and data fetching.
* **API descriptions (`.yaml`, `.json`, `.graphql`)**: API specification files (OpenAPI, AsyncAPI, GraphQL schemas).

## File-based routing

Realm uses a file-based routing system.
The path and name of a content file within your project root directly determine the URL path for the generated page.
The file extension is automatically removed.

* `get-started/installation.md` becomes `/get-started/installation`
* `concepts/markdoc.md` becomes `/concepts/markdoc`
* `changelog.page.tsx` becomes `/changelog`
* `api/reference/petstore.yaml` becomes `/api/reference/petstore`

Content files named `index` (e.g., `index.md`, `index.page.tsx`, or even `index.yaml`) serve as the default page for their directory.

* `/index.md` or `/index.page.tsx` at the root becomes the site's home page (`/`).
* `concepts/index.md` becomes the page accessed at the `/concepts` URL path.
* `api/reference/index.yaml` becomes `/api/reference`.

## Content reuse

You can reuse content across your project by using the [partial markdoc tag](../reference/tags/partial.md).
Reusable content should be stored in the `_partials` directory.

## @l10n

The `@l10n` directory is used to store locale files.
Each locale has its own folder, and within each locale folder, you can create subfolders for different sections of your documentation.

There is also an optional `translations.yaml` file that contains the list of UI labels for the locale.

For more information, see [Localization](../../setup/concepts/concept-l10n.md).

## Versioned content

Redocly supports versioned content by using a special folder structure.

Folders prefixed with `@` (e.g., `@v1`, `@v2`) are treated as separate content versions.
For more information, see [Add versioned content](../how-to/versions.md) how-to.

## Multi-product

You can include multiple products in your project that users can switch between using a product picker in the navbar.
A product can be any set of content you want to separate from other documentation.

For more information, see [Multiple products](../how-to/multiple-products.md).

## Customization

### `@theme`

This special directory allows you to customize the default Redocly theme.
You can override or add various elements:

* **Components (Ejected/Overridden)**: Replace or extend default theme components (like headers, buttons, code blocks, layouts) by placing your custom React components in corresponding paths within `@theme/*`.
  This process is often referred to as **"ejecting"**.
  Refer to the [Eject components](../../extend/how-to/eject-components/index.md) for more information.
* **Styles**: Add global custom CSS rules or modify [theme variables](../../style/reference/css-variables/index.md) in the `@theme/styles.css` file.
  This file serves as the main entry point for your custom global styles.
* **Custom markdoc components**: Create completely [new Markdoc tags and functions](../../extend/tutorials/build-custom-function.md), within the `@theme/markdoc` directory to enhance your Markdoc.

### Static files (`static/`)

While assets referenced directly within your content files (like images in Markdown using relative paths `./images/diagram.png`) are typically processed and bundled by Realm, there's often a need for files that should be copied directly to the root of the final build output without any changes.

The `static/` directory serves this purpose.
Any files placed inside the `static/` folder will be copied verbatim to the root of your built site.

Use `static/` for things like:
* `robots.txt`
* `favicon.ico` and other site icons/manifest files
* Verification files for search engines or other services
* Other assets that must exist at specific paths and shouldn't be processed (e.g., fonts referenced by external CSS, specific JS libraries).

**Important**: Files in `static/` are *not* processed or optimized by Realm's build system.
Avoid placing regular images, CSS, or JavaScript that you author yourself here if you expect them to be bundled or optimized; those usually belong alongside your content files or within the `@theme` directory.

## Resources

* Follow step-by-step instructions for configuring your project to include [multiple projects](../how-to/multiple-products.md) or [multiple languages](../how-to/config-l10n/index.md).
* Learn more about configuring your project to use the same content in multiple places using the [partial markdoc tag](https://redocly.com/docs/learn-markdoc/tags/partial).
* See the configuration options available for your `sidebars.yaml` file in the [sidebars reference documentation](../reference/sidebars.md).