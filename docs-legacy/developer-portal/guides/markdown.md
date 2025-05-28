---
seo:
  title: Supported Markdown features
  description: Using Markdown in your developer portal
toc:
  enable: true
  maxDepth: 3
excludeFromSearch: true

---

# Supported Markdown features

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

When creating pages in your developer portal, use [GitHub-flavored Markdown](https://github.github.com/gfm/). All standard text formatting options (emphasis, inline code...), multimedia (inserting images and videos), and page elements (links, tables, code and quote blocks, lists, headings...) are supported.

This page highlights some of the special Markdown features you can use in your portal pages.

## Front matter

By adding front matter to a Markdown page, you can set per-page options and override some of the site-wide portal settings. Front matter must be at the beginning of a Markdown file, in valid YAML format between triple-dashed lines (`---`).

**Example**

```md
---
seo:
  title: Markdown example
  description: GitHub-flavored markdown example
toc:
  enable: true
  maxDepth:
---
```

### Supported front matter options

<!--- Approval to document needed for these: `author`, `excerpt`, `slug`, `categories`, `tags`, `headerImage`, `hidden`, `matchPath` and other options that are currently undocumented--->

#### disableLastModified

When set to `true`, hides the "Last updated {time} ago" label at the top of the page.

```md
---
seo:
  title: Markdown example
disableLastModified: true
---
```

#### editPage

Configures the appearance of the edit page button when it's enabled in `siteConfig.yaml`.

| Option    | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `disable` | When set to `true`, hides the button on the page.            |
| `baseUrl` | URL of the root folder of your GitHub or GitLab project.     |
| `text`    | Text to display on the edit button.                          |
| `icon`    | Path to the image file (svg or png) used as the button icon. |

```md
---
seo:
  title: Markdown example
editPage:
  disable: true
---
```

#### exclude

When set to `true`, excludes the page from the portal build. To prevent broken links or potential build failures, make sure to remove any entries for the excluded page from your `sidebars.yaml` file. If other MD or MDX pages have links pointing to the excluded page, you should remove or modify them prior to building the portal.

```md
---
seo:
  title: Markdown example
exclude: true
---
```

#### excludeFromSearch

When set to `true`, the page is excluded from the search index and is not accessible from the search results.

```md
---
seo:
  title: Markdown example
excludeFromSearch: true
---
```

#### permission

Used with the [RBAC feature](../configuration/rbac.md) to set per-page access permissions.

#### redirectFrom

Defines one or more URLs that are redirected to the URL of the Markdown page. Each URL must be provided as an item in an array with a trailing slash at the end. Read more about [using redirects](./redirects.md).

```md
---
seo:
  title: Markdown example
redirectFrom:
  - /docs/example-portal/markdown/
  - /docs/example-portal/test/
---
```

#### requestLogin

When using a custom login component in the portal, setting this to `true` redirects to the portal login page if the user is not already logged in.

#### seo

Controls the contents of your portal's HTML `<head>` element.

| Option      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| description | Sets the contents of the `<meta name="description">` tag for the page. The description should be up to 150 characters long. This text may be used for the page in search engine results pages.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| image       | Sets the rich metadata image that is used when sharing the link to the page on social media. You must provide the path to an existing image in your portal project.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| jsonLd      | Configures [JSON-LD](https://json-ld.org/) parameters for the page. Individual per-page configuration in the front matter has priority over general configuration in `siteConfig.yaml`. The JSON-LD script is rendered within `<head>` only when you configure JSON-LD - it is not rendered by default.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| keywords    | Sets the contents of the `<meta name="keywords">` tag for the page. Provide the keywords as a comma-separated list, e.g. `keywords: documentation, api, openapi`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| lang        | Sets the language attribute for the page to indicate the language in which the content is written. Provide the `lang` value as a language tag with optional subtags (for example, `en-US` for United States English, `es` for Spanish). Consult the [W3.org guide](https://www.w3.org/International/questions/qa-choosing-language-tags) and the [language subtag registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) for more information about language tags and subtags.                                                                                                                                                                                                                                                                        |
| sitemap     | When `siteUrl` is configured in [the meta section](../configuration/siteconfig/meta.md) of the `siteConfig.yaml` file, a sitemap is automatically generated for the portal. The `sitemap` object can then be added to the front matter of individual pages to control their sitemap tags. The following tags are supported: `changefreq`, `priority`, `lastmod`. Use `changefreq` to indicate how often the page is updated (never, yearly, monthly, weekly, daily, hourly, always). Use `priority` to indicate page importance (a number in range from 0 to 1), which may result in the page being indexed more often or ranking higher in search results. Use `lastmod` to indicate when the page was last updated (a timestamp in the [W3C format](https://www.w3.org/TR/NOTE-datetime)). |
| title       | Sets the page title; equivalent of the HTML `<title>` tag. It's displayed in the browser's title bar and/or tab. If `label` is not defined for the page in `sidebars.yaml`, the value of `title` is automatically used as the page name in the sidebar.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

```md
---
seo:
  title: Example Markdown page
  description: GitHub-flavored Markdown example
  image: .images/example-page.png
  keywords: 'markdown, github'
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
  sitemap:
    changefreq: 'daily'
    priority: 0.3
    lastmod: 1997-07-16T19:20:30.45+01:00
---
```

#### showNextButton

When set to `false`, hides the "Back to" navigation button at the bottom of each MD(X) page.

```md
---
seo:
  title: Markdown example
showNextButton: false
---
```

#### showPrevButton

When set to `false`, hides the "Next to" navigation button at the bottom of each MD(X) page.

```md
---
seo:
  title: Markdown example
showPrevButton: false
---
```

#### toc

Configures the behavior of page table of contents. Use it to override global portal settings and hide/show a table of contents (ToC) on the right side of the page. When the TOC is enabled, you can set its maximum depth (amount of heading levels) as an integer value. Read more about [ToC configuration](./page-toc.md)

| Option     | Description                                                                                                                                                                                                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enable`   | When set to `true`, displays a table of contents (ToC) on the right side of the page.                                                                                                                                                                                                         |
| `maxDepth` | This option is dependent on and related to `enable: true`. Use it to set the maximum depth (amount of heading levels) displayed in the table of contents. The value must be provided as an integer. The default value is 4, which means that headings from H1 to H4 are displayed in the TOC. |

```md
---
seo:
  title: Markdown example
toc:
  enable: true
  maxDepth: 2
---
```

### Deprecated front matter options

**Deprecated as a top-level option - use in [seo](#seo) instead**

- `description`
- `image`
- `keywords`
- `title`
- `lang`
- `sitemap`

**Deprecated - use [toc](#toc) instead**

- `enableToc`
- `tocMaxDepth`

## Unordered lists

**Examples**

```md
- API Reference
- Portal
- Workflows
```

Using a different character for list items:

```md
- API Reference
- Portal
- Workflows
```

Both examples render like this:

- API Reference
- Portal
- Workflows

To create a nested list, indent items:

```md
- API Reference
  - Hosted
  - On-premise
- Developer portal
  - Hosted
  - On-premise
- Workflows
```

The example above renders like this:

- API Reference
  - Hosted
  - On-premise
- Developer portal
  - Hosted
  - On-premise
- Workflows

## Numbered lists

**Example**

```md
1. Wake up
2. Brush teeth
3. Exercise
```

The example above renders like this:

1. Wake up
1. Brush teeth
1. Exercise

### Numbered list with code snippets

**Example**

<pre>
1. Code snippets in a list.
1. ```javascript
   javascript;
   ```

   ```python
   python
   ```

   ```cpp
   c++
   ```
</pre>

The example above renders like this:

1. Code snippets in a list.

{% tabs %}
{% tab label="javascript" %}
```javascript
   javascript;
   ```
{% /tab  %}
{% tab label="python" %}
   ```python
   python
   ```
{% /tab  %}
{% tab label="cpp" %}
   ```cpp
   c++
   ```
{% /tab  %}
{% /tabs %}

## Free-form code samples

Code samples support syntax highlighting, as long as you specify the language at the beginning of your code block.

**Example: Python code highlighting**

<pre>
```python
prices = {'apple': 0.40, 'banana': 0.50}
my_purchase = {
    'apple': 1,
    'banana': 6}
grocery_bill = sum(prices[fruit] * my_purchase[fruit]
                   for fruit in my_purchase)
print ('I owe the grocer $%.2f' % grocery_bill)
```
</pre>

The example above renders like this:

```python
prices = {'apple': 0.40, 'banana': 0.50}
my_purchase = {
    'apple': 1,
    'banana': 6}
grocery_bill = sum(prices[fruit] * my_purchase[fruit]
                   for fruit in my_purchase)
print ('I owe the grocer $%.2f' % grocery_bill)
```

All Markdown code blocks support the copy button, regardless of the language of the code sample. When enabled, the copy button is displayed in the upper right corner of the code block. You can change the default copy button text, the tooltip text, and customize the success message in the [copyCodeSnippet section](../configuration/siteconfig/copy-codesnippet.md) of the `siteConfig.yaml` file.

### Tabbed code samples

To make your code samples display in tabs, write them sequentially (one immediately after the other, without any text between) and specify the language at the beginning of each code block.

The language name is used as the default tab title. You can set a custom tab title by adding it after the language, or by replacing the language altogether with a custom string. Note that syntax highlighting does not work for tabs without a specified language.

<pre>
```javascript
javascript;
```

```python
python
```

```java title
example text
```

```custom tab name
example text
```
</pre>

The example above renders like this:
{% tabs %}
{% tab label="javascript" %}
```javascript
javascript;
```
{% /tab  %}
{% tab label="python" %}
```python
python
```
{% /tab  %}
{% tab label="java title" %}
```java
example text
```
{% /tab  %}
{% tab label="custom tab name" %}
```sh
example text
```
{% /tab  %}
{% /tabs  %}
### Built with

- [markdown-it](https://github.com/markdown-it/markdown-it) for Markdown parsing
- [CodeMirror](http://codemirror.net/) for the awesome syntax-highlighted editor
- [highlight.js](http://softwaremaniacs.org/soft/highlight/en/) for syntax highlighting in output code blocks
- [js-deflate](https://github.com/dankogai/js-deflate) for gzipping of data to make it fit in URLs

## Customizable images

{% admonition type="warning" name="Important" %}
Markdown image resizing and styling is supported from version 1.0.0-beta.151.
{% /admonition %}

When inserting images into your Markdown pages, you can specify their size and optionally style them with CSS properties.

Supported image size parameters are `width` and `height`, and you can set both or just one for each image. For image styling, you can use any of the CSS properties supported by the [gatsby-remark-image-attributes plugin](https://www.gatsbyjs.com/plugins/gatsby-remark-image-attributes/).

To customize an image, add a space, then a string with a leading `#` symbol after the image file name, followed by the size parameters and/or CSS properties you want to use. The following examples illustrate different ways to customize images in your Markdown files.
{% tabs %}
{% tab label="Example with custom width" %}
```md
Let's insert an image.

![Alt text for the image](./path/to/image.png '#width=500px;')
```
{% /tab  %}
{% tab label="Example with custom width and height" %}
```md
Let's insert an image.

![Alt text for the image](./path/to/image.png '#width=200px;height=200px;')
```
{% /tab  %}
{% tab label="Example with custom CSS styling" %}
```md
Let's insert an image.

![Alt text for the image](./path/to/image.png '#width=500px;height:250px;box-shadow: 2px 2px 6px 0px;float: right;')
```
{% /tab  %}
{% /tabs  %}
## Admonitions

Admonitions are text blocks with special formatting. Use them to highlight important information, warn users, or provide hints and tips. The icon to the left of the text is generated automatically according to the admonition type.

The following admonition types are supported: `info`, `success`, `warning`, `danger`, `attention`.

Here is how to insert each type of admonition, followed by an example of what it looks like when rendered in the portal.

**Info**

```md
:::info Optional title

Just FYI

:::
```

{% admonition type="info" name="Optional title" %}

Just FYI

{% /admonition %}

**Success**

```md
:::success Success message

Hooyah!

:::
```

{% admonition type="success" name="Success message" %}
Hooyah!
{% /admonition %}

**Warning**

```md
:::warning Warning

I told you so!

:::
```

{% admonition type="warning" name="Warning" %}
I told you so!
{% /admonition %}

**Danger**

```md
:::danger Danger

I really told you so!

:::
```

{% admonition type="danger" name="Danger" %}
I really told you so!
{% /admonition %}

**Attention**

```md
:::attention Attention

Now that I have your attention...

:::
```

{% admonition type="info" name="Attention" %}
Now that I have your attention...
{% /admonition %}

### Legacy admonitions syntax

From version 1.0.0-beta.118 of the Developer portal, the HTML-based syntax for inserting admonitions is deprecated. We strongly recommend replacing it with the new syntax in your portal project.

**Example legacy syntax for warnings**

```html
<div class="warning">Warning: I told you so!</div>
```
