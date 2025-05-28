---
seo:
  title: Organize files in your portal project
enableToc: false
excludeFromSearch: true

---

# Organize your portal content

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

You may create different types of files depending on your needs.

Every developer portal project must have these files, which you edit for [customization and configuration](../configuration/configuration-files.md) purposes:

- index.md or index.md
- siteConfig.yaml
- sidebars.yaml
- theme.ts
- favicon.png

To create content for your developer portal, you can use:

- [Markdown files](markdown.md)
- images and other multimedia assets (to embed into Markdown or MDX files)
- [OpenAPI definitions (or references to it)](reference-docs-integration.md)

## URL routes

The folder and filename determine the URL route, so be deliberate with your naming.

The `public` folder name is reserved at the top-level of the portal project structure. You should not use it in the root directory of your portal, but it can be used in subdirectories.

The special `index.md` or `index.md` name is not included in the URL route. For example, if your base URL is `docs.example.com`, and you place `index.md` in your project root, the contents would be accessed at `https://docs.example.com`.

If you place `index.md` inside of a `guides` folder, you would access that content at `https://docs.example.com/guides`.

On the other hand, if you name the file anything else, such as `home.md`, and place it in the `guides` folder, it would be accessed at `https://docs.example.com/guides/home`.

Note that the `.md` and `.md` file extensions are never included in the URL route.

## Developer portal structure

Here is an example structure of a developer portal project.

```shell
├── ./README.md
├── ./contact.md
├── ./faq.md
├── ./favicon.png
├── ./images
│   ├── ./images/book-management.svg
│   ├── ./images/external-link-dark.svg
│   ├── ./images/found-or-private.svg
│   ├── ./images/icon1.png
│   ├── ./images/icon3.png
│   ├── ./images/launch-fast.svg
│   ├── ./images/logo.png
│   └── ./images/logo.svg
├── ./index.md
├── ./openapi
│   └── ./openapi/petstore.yaml
├── ./package.json
├── ./reference.page.yaml
├── ./sidebars.yaml
├── ./siteConfig.yaml
├── ./theme.ts
├── ./developer-portal
│   ├── ./developer-portal/creating-files.md
│   ├── ./developer-portal/development-tips.md
│   ├── ./developer-portal/footer-navigation.md
│   ├── ./developer-portal/installation.md
│   ├── ./developer-portal/introduction.md
│   ├── ./developer-portal/mdx.md
│   ├── ./developer-portal/markdown.md
│   ├── ./developer-portal/reference-docs-integration.md
│   ├── ./developer-portal/sidebar-nav.md
│   └── ./developer-portal/top-navigation.md
└── ./yarn.lock
```

In this example, most of our content is organized into the `developer-portal` folder.

The more content you create, the more you may want to organize it into sub-folders. It's a good practice to separate content by type (e.g. images in one folder, text in another). You can also categorize your content by topic into sub-folders, and [create reusable Markdown snippets](./reusing-content.md) for single-source authoring.

To help your readers access and find the content faster, [set up a sidebar](../configuration/sidebar-nav.md) for your portal.

### Use the `static` folder to add assets

In some cases, you may want to host file types other than Markdown in your portal - for example, images, PDF documents, or scripts - and reference them as additional resources in your portal pages.

For this purpose, Redocly Developer portal supports a special folder called `static`. This folder must be in the root of the developer portal project, and its name must be `static` without any additional characters.

If it doesn't already exist in your portal project, create it manually before adding any assets into it. The `static` folder can contain any number of sub-folders, so you can organize assets by type or any other desired criteria.

All files placed into the `static` folder are served directly from the project root. This allows you to dynamically reference them with absolute links. For example, if you had a file `./static/image.png`, you would link to it with `https://your-portal.example.com/image.png`.

{% admonition type="info" name="Note" %}
Any files (images, Markdown pages...) that you reference in the front matter of MD(X) pages are automatically copied to the `static` folder during the portal build. This happens even if you haven't manually created the `static` folder, and doesn't affect any of the manually added assets (if they exist).
{% /admonition %}

## Link pages

Any MD(X) page in your Developer portal can contain links to other pages. When linking pages, make sure to use the correct path to the MD(X) file you want to link to.

Starting with the version 1.0.0-beta.115, the Developer portal supports absolute links from the root of the project (relative links have been supported since the first release).
{% tabs %}
{% tab label="Absolute link" %}
```shell
[Example absolute link](/guides/example.md)
```
{% /tab  %}
{% tab label="Relative link" %}
```shell
[Example relative link](../guides/example.md)
```
{% /tab  %}
{% /tabs  %}
If your MD(X) pages contain headings, you can link directly to a specific heading by its name instead of linking to the whole page. This is done by appending a fragment identifier (named anchor) to the file name. Heading names are case-insensitive, but you must replace spaces and any other special symbols in them with hyphens.
{% tabs %}
{% tab label="Named anchor in MD" %}
```shell
[Example named anchor](/guides/example.md#heading-name)
```
{% /tab  %}
{% tab label="Named anchor in MDX" %}
```shell
[Example named anchor](../guides/example.md#heading-name)
```
{% /tab  %}
{% /tabs  %}
## Exclude pages from portal builds

{% admonition type="warning" name="Important" %}
Page exclusion is supported starting with version 1.0.0-beta.110 of the Developer portal.
{% /admonition %}

In some cases, you may want to exclude specific pages from portal builds without removing the source files from your project. You can achieve this in either of the following two ways:

- Add `exclude: true` to the front matter of the page you want to exclude. This front matter option is supported in MD and in MDX files.

- Rename the page source file so that its file name starts with an underscore (`_`). For example, to exclude the `introduction.md` file from the build, you would rename it to `_introduction.md`.

To prevent broken links or potential build failures, make sure to remove any entries for the excluded page from your `sidebars.yaml` file. If other MD or MDX pages have links pointing to the excluded page, those links should be modified or removed prior to building the portal.

### Exclude the README.md file

If your developer portal project has a `README.md` file in the top-level (root) folder, this file is automatically excluded from builds. File name matching is case-insensitive (`readme.md` is treated the same as `README.md`).

If you have `README.md` files in other folders and want to exclude them from builds, you must either change their file name to start with an underscore, or add the `exclude: true` front matter option. Automatic exclusion applies only when the file is in the root folder of the project.

## Exclude folders from portal builds

{% admonition type="warning" name="Important" %}
Folder exclusion is supported starting with version `1.1.0-beta.114` of the Developer portal.
{% /admonition %}

In case you want to exclude entire folder from portal builds you can rename the folder so that its name starts with an underscore (`_`). For example, to exclude the `legacy` folder from the build, you would rename it to `_legacy`.
