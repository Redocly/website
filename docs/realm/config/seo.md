---
products:
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `seo`

Use the `seo` options to control the contents of your project's HTML `<head>` element and `llms.txt` file generation.
You can override `seo` options, except `llmstxt`, in the [front matter](./front-matter-config) of Markdown and React pages.

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
  networks. You must specify the path to an existing image in your project project. In addition, you can replace the
  image for Twitter or other social networks separately with `og:image` or `twitter:image` at is specified in the `meta` option.

---

- jsonLd
- JSON
- Configures [JSON-LD](https://json-ld.org/) parameters.

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
  This option is required to generate a sitemap, see more information about [how to add a sitemap](../setup/how-to/add-sitemap.md).

  This option should not be used in front matter.

---

- title
- string
- Sets the default contents of the `<title>` tag.
  This title is used in search engine results pages, and when sharing links to your project on social media.
  To change the preview of social networks, you can override using`og:description` or `twitter:description` in the specified `meta` option.

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
- Specifies if an `llms.txt` file and clean Markdown versions of pages included in the `llms.txt` file are generated. Defaults to `false`.

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
- List of sections to include in the `llms.txt` file. See [llms.txt format documentation](https://llmstxt.org/#format) for details.


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
- **REQUIRED.** Section title. See [llms.txt format documentation](https://llmstxt.org/#format) for details.

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

- Use [front matter](./front-matter-config.md) to configure seo on individual pages.
