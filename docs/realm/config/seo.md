---
products:
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Setup Search Engine Optimization(SEO) for your project.
---
# `seo`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Use the `seo` options to control the contents of your project's HTML `<head>` element, `llms.txt` file generation, and search engine optimization features like sitemaps and indexing control.
You can override `seo` options, except `llmstxt`, in the [front matter](./front-matter-config.md) of Markdown and React pages.

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "seo"} /%}

## Options

{% table %}

- Option
- Type
- Description

---

- description
- string
- Sets the contents of the `<meta name="description">` tag.
  The description can be up to 150 characters long.
  This text may be used in search engine results pages.
  Adds the same value to `og:description` and `twitter:description` parameters.
  To change the description in the social media preview, you can override the parameters using `og:description` or
  `twitter:description` specified in `meta` option.

---

- image
- string
- Sets the image with extended metadata (`og:image`, `twitter:image`) used when sharing links to your project on social
  networks.
  You must specify the path to an existing image in your project project.
  In addition, you can replace the
  image for Twitter or other social networks separately with `og:image` or `twitter:image` at is specified in the `meta` option.

---

- jsonLd
- object
- JSON to configure [JSON-LD](https://json-ld.org/) parameters.
  Example front matter:
  ```yaml {% title="example-page.md" %}
  ---
  seo:
    jsonLd:
      '@context': 'https://schema.org'
      '@type': 'Organization'
      url: 'http://www.example.com'
      name: My website
      contactPoint:
        '@type': 'ContactPoint'
        telephone: '+1111111111111'
        contactType: 'Customer service'
  ---
  ```

---

- keywords
- string | [string]
- Sets the contents of the `<meta name="keywords">` tag.

---

- lang
- string
- Sets the language attribute to indicate the language in which the content is written.
  Provide the `lang` value as a language tag with optional subtags (for example, `en-US` for United States English, `es` for Spanish).
  Consult the [W3.org guide](https://www.w3.org/International/questions/qa-choosing-language-tags) and the [language subtag registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) for more information about language tags and subtags.

---

- meta
- [[Meta object](#meta-object)]
- Array of additional meta tags.

---

- siteUrl
- string
- Sets the base URL for canonical links.
  When this option is configured, it automatically adds `rel="canonical"` to the head of all HTML pages.
  This option is required to generate a sitemap, see more information in the [Sitemaps](#sitemaps) section below.

  This option should not be used in front matter.

---

- title
- string
- Sets the default contents of the `<title>` HTML tag for all pages in your project.
  Heading tags like `<h1>`, or a `seo.title` in front matter of a Markdown file, take priority over this default value.
  Priority order: this global `seo.title` (lowest) < page headings < `seo.title` in front matter (highest).
  This title is used in search engine results pages, and when sharing links to your project on social media.
  To change the preview of social networks, you can override using `og:description` or `twitter:description` in the specified `meta` option.

---

- projectTitle
- string
- Adds a site-wide suffix appended to the page's `<title>`.
  The final browser title is formatted as `<title> | <projectTitle>`.

---

- llmstxt
- [llmstxt object](#llmstxt-object)
- `llms.txt` file generation options.

{% /table %}

### Meta object

{% table %}

- Option
- Type
- Description

---

- name
- string
- Meta tag name property

---

- content
- string
- Meta tag content property

{% /table %}

### llmstxt object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if an `llms.txt` file and clean Markdown versions of pages included in the `llms.txt` file are generated.
  Defaults to `false`.

---

- title
- string
- Name of the project.
  If this option is not specified, the value of the `seo.title` option is used.

---

- description
- string
- Short summary of the project.
  If this option is not specified, the value of the `seo.description` option is used.

---

- details
- [llmstxt details object](#llmstxt-details-object)
- Defines sources for detailed information about the project.

---

- excludeFiles
- [string]
- List of files or glob patterns to exclude from the `llms.txt` file.
  The list can contain relative paths to files, glob patterns (like `*.md` or `docs/**/*.md`), or negated glob patterns (for example, `!docs/**/*.md`).

---

- sections
- [[llmstxt section object](#llmstxt-section-object)]
- List of sections to include in the `llms.txt` file.
  See [llms.txt format documentation](https://llmstxt.org/#format) for details.


{% /table %}

Default values for the `llmstxt` object are:

```yaml
  llmstxt:
    sections:
      - title: Optional
        includeFiles:
          - '**/*'
        excludeFiles: []
  ```

#### llmstxt details object

{% table %}

- Option
- Type
- Description

---

- path
- string
- Path to the `.md` file with detailed information about the project.
Must be a relative path to the `redocly.yaml` config.
Mutually exclusive with `content`.

---

- content
- string
- Detailed information about the project.
Must be a string.
Mutually exclusive with `path`.


{% /table %}

#### llmstxt section object

{% table %}

- Option
- Type
- Description

---

- title
- string
- **REQUIRED.** Section title.
  See [llms.txt format documentation](https://llmstxt.org/#format) for details.

---

- description
- string
- Short summary of the section.

---

- includeFiles
- [string]
- List of files or glob patterns to include in the section.
  The list can contain relative paths to files, glob patterns (like `*.md` or `docs/**/*.md`), or negated glob patterns (for example, `!docs/**/*.md`).

---

- excludeFiles
- [string]
- List of files or glob patterns to exclude from the section.
  The list can contain relative paths to files, glob patterns (like `*.md` or `docs/**/*.md`), or negated glob patterns (for example, `!docs/**/*.md`).


{% /table %}

## Sitemaps

A [sitemap](https://en.wikipedia.org/wiki/Site_map) is a resource that lists all the pages in your website to help search engines and other automation tools identify all the pages available.

### Generate a sitemap

When the `siteUrl` is set, Redocly automatically generates and hosts a sitemap file for your project at build time.
The sitemap is accessible at `https://your-domain.com/sitemap.xml`.

```yaml
seo:
  siteUrl: https://docs.example.com
```

{% admonition type="info" name="What's excluded from sitemap" %}
The generated sitemap **does not** include:
- pages protected by [role-based access controls](../access/index.md) (non-public pages)
- pages listed in the [ignore configuration](./ignore.md)

The sitemap **does include** pages with [`excludeFromSearch: true`](./front-matter-config.md#front-matter-only-options) in their front matter.
The `excludeFromSearch` option only affects search indexing, not sitemap generation.
{% /admonition %}

The sitemap data is formatted to standard search engine expectations, using the `<loc>` tag:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://docs.example.com/</loc>
  </url>
  <url>
    <loc>https://docs.example.com/reference/</loc>
  </url>
</urlset>
```

### Page priority

Redocly sets the optional `priority` property for pages in the generated `sitemap.xml` file to `0.5`, unless the pages are non-default versioned content (set to `0.3`).
This distinction tells search engines the default version of content is more important than non-default versions.

You can override the priority for specific pages:

**Markdown files:**
```yaml
---
seo:
  priority: 0.9
---
```

**React/TSX files:**
```tsx
export const frontmatter = {
  seo: {
    priority: 0.9
  }
};
```

### Custom sitemap

Add a custom sitemap by placing a `sitemap.xml` file into the `/static` folder in the root of your project:

```treeview
your-awesome-project/
├── static/
│   └── sitemap.xml
├── guides/
├── redocly.yaml
└── ...
```

{% admonition type="warning" name="Validate your sitemap" %}
Redocly serves the sitemap but doesn't validate the structure, so you should validate your sitemap before adding the file.
{% /admonition %}

## Control search indexing

Use the `noindex` rule to block search indexing for your entire project or specific pages.
The `noindex` rule tells search engines that pages shouldn't be indexed or included in searches.

{% admonition type="info" %}
The `noindex` rule only applies to external search engines.
It does not block pages from in-site search (controlled by [excludeFromSearch](./front-matter-config.md)) or user access (controlled by [RBAC](../access/page-permissions.md)).
{% /admonition %}

### Block indexing with meta tags

Add `<meta name="robots" content="noindex">` to page HTML headers.

**For an entire project:**
```yaml
seo:
  meta:
    - name: robots
      content: noindex
```

**For specific pages using front matter:**
```yaml
---
seo:
  meta:
    - name: robots
      content: noindex
---
```

### Block indexing with response headers

Add the `X-Robots-Tag: noindex` HTTP response header.

**For an entire project:**
```yaml
responseHeaders: 
  '**':
    - name: X-Robots-Tag
      value: noindex
```

**For specific pages:**
```yaml
responseHeaders: 
  /blog/example-draft:
    - name: X-Robots-Tag
      value: noindex
  '/internal-docs/**':
    - name: X-Robots-Tag
      value: noindex
```

## Static SEO files

### Robots.txt file

Add a `robots.txt` file to manage how search engines index your website by placing it in the `/static` folder:

```treeview
your-awesome-project/
├── static/
│   ├── robots.txt
│   └── ...
├── guides/
├── redocly.yaml
└── ...
```

Example `robots.txt` content:
```text
User-agent: *

Allow: /
Disallow: /internal-docs/

sitemap: https://docs.example.com/sitemap.xml
```

### Site ownership verification

Verify ownership of your website with third-party tools (like Google Search Console) by adding verification files to the `/static` folder:

```treeview
your-awesome-project/
├── static/
│   ├── google1234567890abcde.html
│   └── .well-known/
│       └── apple-developer-merchantid-domain-association.txt
├── guides/
├── redocly.yaml
└── ...
```

The verification files will be accessible at:
- `https://docs.example.com/google1234567890abcde.html`
- `https://docs.example.com/.well-known/apple-developer-merchantid-domain-association.txt`

## Examples

The following is an example of setting default values for all pages in the configuration file.

```yaml
seo:
  title: Example Project
  description: Learn how to work with Example APIs
  siteUrl: https://www.example.com
  image: ./images/example-project-home.png
  keywords: 'documentation, api'
  lang: en-US
  jsonLd:
    '@context': 'https://schema.org'
    '@type': 'Organization'
    url: 'http://www.example.com'
    name: My website
    contactPoint:
      '@type': 'ContactPoint'
      telephone: '+1111111111111'
      contactType: 'Customer service'
  meta:
    - name: twitter:image
      content: ./images/twitter-image.png
    - name: twitter:description
      content: 'Overridden description for Twitter'
  llmstxt:
    hide: false
    title: Example Project title for llms.txt
    description: Example Project description for llms.txt 
    details:
      content: Details of the Example Project
    sections: 
      - title: Docs
        description: This is a description of the Docs section
        includeFiles:
          - docs/**/*.md
      - title: API Catalog
        description: This is a description of the API Catalog section
        includeFiles:
          - '**/openapi.yaml'
        excludeFiles:
          - '**/openapi-legacy.yaml'
      - title: 'Optional'
        includeFiles:
          - '**/*.md'
        excludeFiles:
          - '**/wrong.md'
```

The following example shows how to override the title and description in the front matter of a specific Markdown page.

```md
---
seo:
  title: Apricot Trees
  description: Harvest apricots in the summer.
---

# Apricots

This page is about apricots.
```

The following example shows how to override the title and description in the front matter of a specific React page.

```tsx
export const frontmatter = {
  seo: {
    title: 'Example Project',
    description: 'Learn how to work with Example APIs',
  },
};
```

## Resources

- **[Static assets](../customization/theme-static-assets.md)** - Host and manage static assets in Redocly projects for enhanced SEO performance and content delivery
- **[Custom domain setup](../reunite/project/custom-domain.md)** - Personalize your URL to reflect your brand and improve SEO ranking with custom domain configuration
- **[Front matter configuration](./front-matter-config.md)** - Configure SEO settings on individual pages using front matter for granular search optimization control
- **[Response headers](./response-headers.md)** - Configure response headers for advanced search engine indexing control and optimization strategies
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
