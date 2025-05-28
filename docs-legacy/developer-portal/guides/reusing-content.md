---
excludeFromSearch: true
---

# Reuse content with Markdown snippets

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

{% admonition type="warning" name="Important" %}
Content reuse with Markdown snippets is supported from version 1.0.0-beta.103.

Snippets in MDX pages and extended support for admonitions, images, and code blocks are available from version 1.0.0-beta.152.
{% /admonition %}

As you expand your developer portal, sometimes you need to repeat the same content in multiple places. Redocly helps you manage such content more efficiently by supporting content reuse in Markdown and MDX files.

Create "chunks" of text, save them as Markdown files, and embed them across the portal. We call these "chunks" snippets, and the pages in which they're embedded are target pages. You can embed a snippet in as many target pages as you want. Target pages can be either in Markdown or in MDX format.

This single-source authoring approach lets you control the content from a central place. Instead of repeating or manually copying the content, you include a reference to it wherever you need it to appear. Redocly embeds the referenced content automatically when building the developer portal. This approach is similar to [using $refs in OpenAPI definitions](/learn/openapi/ref-guide.md).

If you want to change the content in a snippet, you only need to do it once. The changes propagate automatically to all target pages. With this approach, your content is more consistent and easier to update.

## Prerequisites

- One or more snippets saved as Markdown (`.md`) files in your developer portal project. Snippets can't be saved as MDX, YAML or any other file type.

- The names of your snippet files must start with an underscore (for example, `_snippet.md`).

## Limitations

- "Nested" snippets and cyclical file references are not supported. A Markdown snippet cannot contain a reference to another snippet.

- If a snippet contains headings, they are included as-is, regardless of any existing heading order in the target page. This means that an H1 heading in a snippet is not transformed into an H2 if the target page already has an H1 preceding it.

## Configuration steps

### Step 1: Create a directory for Markdown snippets

You can store your snippets in any directory as long as it's in the developer portal project. We recommend keeping snippets separate from the rest of the content for cleaner organization. A separate directory also indicates to other portal contributors that the files in it serve a specific purpose.

For example, you can create a directory for snippets in the root of the portal project:

```shell
├── ./README.md
├── ./favicon.png
├── ./images
├── ./index.md
├── ./openapi
│   └── ./openapi/petstore.yaml
├── ./package.json
├── ./reference.page.yaml
├── ./sidebars.yaml
├── ./siteConfig.yaml
├── ./theme.ts
├── ./developer-portal
│   ├── ./developer-portal/homepage.md
├── ./snippets
│   ├── ./_snippets/copyright-note.md
│   ├── ./_snippets/supported-product-versions.md
│   ├── ./_snippets/product-description.md
└── ./yarn.lock
```

In complex portal projects, we recommend organizing snippets into subdirectories by topic, product, or any other criteria:

```shell
├── ./README.md
├── ./favicon.png
├── ./images
├── ./index.md
├── ./openapi
│   └── ./openapi/petstore.yaml
├── ./package.json
├── ./reference.page.yaml
├── ./sidebars.yaml
├── ./siteConfig.yaml
├── ./theme.ts
├── ./developer-portal
│   ├── ./developer-portal/homepage.md
├── ./reusables
│   ├── ./reusables/playbooks
│       ├── ./reusables/playbooks/_version-snippet.md
│   ├── ./reusables/apis
│       ├── ./reusables/apis/_intro-snippet.md
        ├── ./reusables/apis/_auth-snippet.md
│   ├── ./reusables/tutorials
        ├── ./reusables/tutorials/_product-description.md
        ├── ./reusables/tutorials/_skill-level.md
└── ./yarn.lock
```

### Step 2: Create a Markdown snippet file

Save the content you want to reuse as a Markdown file in the previously created directory. The file name must start with an underscore.

Snippets support standard Markdown formatting (emphasis, inline code, ordered and unordered lists, headings, blockquotes, tables), admonitions, code blocks, links, and images.

**Example: \_version-snippet.md file**

```md
TThis text lists supported versions of **Product Name** that these instructions apply to.

- Version X
- Version Y
- Version Z

![Product screenshot](./images/example-image.png)

:::attention

Example admonition

:::
```

### Step 3: Reference your snippet file in target pages

To ensure the content from your snippet is included when building the portal, reference the snippet in one or more MD(X) pages where you want the content to appear.

Use the HTML `<embed>` tag followed by the path to the snippet file. You must provide the full path of the snippet file, either as:

- relative to the project root (`<embed src="../_snippets/example.md" />`), or
- absolute to the project root (`<embed src="/_snippets/example.md" />`).

You can use both types of links interchangeably.

{% admonition type="info" name="Tip" %}
Make sure you use blank lines before and after the line referencing the snippet.
{% /admonition %}

**Example: including \_version-snippet.md into target.md**

```md
# Target page

This is the page where we want to include the snippet.
The snippet should be included right after this sentence.

<embed src="/reusables/playbooks/_version-snippet.md" />

Now we continue with the rest of the page.
```

To include multiple snippets one after the other, reference each snippet in its own line.

**Example: including multiple snippets consecutively**

```md
# Target page

This is the page where we want to include a bunch of snippets in a row.

<embed src="../reusables/apis/_intro-snippet.md" />

<embed src="../reusables/tutorials/_product-description.md" />

<embed src="../reusables/playbooks/_version-snippet.md" />

Now we're done including snippets.
```

### Step 4: Confirm that the snippet content is visible

After building the portal, access the page(s) where you have referenced the snippet. The content from the snippet file should be displayed with appropriate Markdown formatting.

## Troubleshoot

The portal build fails if:

- the snippet file doesn't exist in your developer portal project, or
- the snippet file cannot be found because the provided path is incorrect, or
- if you have not used valid Markdown.

Check the portal build log for error messages with information about the file(s) that prevented the build from completing successfully.
