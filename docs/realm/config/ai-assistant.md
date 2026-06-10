---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
description: Customize the AI assistant functionality in your project.
---
# `aiAssistant`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

By default, users can access the AI assistant by using the floating **Ask AI** button in the bottom-right corner or through the **Search** modal in the top navigation bar.

Use the `aiAssistant` configuration to:

- hide the AI search function
- add suggested pages to the search modal
- set the built-in prompt text
- add an **Ask AI** button

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "aiAssistant"} /%}

## Supported content

AI Search indexes and searches across all content in your project:

- **API descriptions** - OpenAPI, GraphQL, AsyncAPI, and SOAP description files
- **Documentation pages** - Markdown files
- **API versions** - All versions of APIs are indexed and filtered based on the active version

When you have multiple versions of an API, AI Search shows results from the active version by default.
Results also include default versions from other APIs and non-versioned content.

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hides the AI search button when set to `true`.
  Default: `true`.

---

- prompt
- string
- Built-in instructions for AI search.
  Applied to all AI searches in the project and not visible to users.
  Use to set greeting, tone, or other answer conditions.

---

- suggestions
- [string]
- List of suggestions displayed in the AI search interface.

---

- trigger
- [Trigger button](#trigger-button-object)
- Configures the **Ask AI** floating button.

{% /table %}

### Trigger button object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hides the trigger button when set to `true`.
  Default: `false`.

---

- inputType
- string
- Type of UI component used to render trigger button.
  Possible values: `button`, `icon`.
  Default: `button`.

---

- inputIcon
- string
- Icon of the trigger button component.
  Possible values: `redocly`, `sparkles`, `chat`.
  Default: `sparkles`.

{% /table %}

## Product-level configuration

In projects with [products](./products.md), each product folder can include its own `redocly.yaml` file that overrides the root `aiAssistant` configuration for that product.
For example, you can hide AI search for the whole project and enable it only for selected products, or customize suggestions per product.

A product-level `aiAssistant` configuration replaces the root configuration entirely for that product, so include all the options you need in the product file.

AI search embeddings are generated only for the content of products where AI search is enabled, so content of products with AI search hidden is not sent for embedding (unless [Docs MCP](./mcp.md) is enabled, which requires the full index).

{% admonition type="info" %}
Hiding search entirely with `search.hide: true` in the root configuration disables AI search for the whole project, and it cannot be re-enabled per product.
{% /admonition %}

## Usage limits

AI Search is available on Enterprise and Enterprise Plus plans with a monthly limit of 3500 searches per organization.
The limit resets at the beginning of each month.

**Data usage and privacy:** Curious how AI Search uses your data?
Redocly AI Search runs in **inference-only mode** and does not train or fine-tune AI models on your content.
For details, see the [AI Search data usage FAQ](../faq/ai-search-privacy.md).

{% admonition type="info" %}
AI search and Typesense search indexes are only built on the production branch.
Changes to search configuration or content exclusions, like the `excludeFromSearch` front matter option, may not immediately appear in search results until the next production build.
{% /admonition %}

## Examples

Display the AI search button with a custom prompt:

```yaml
aiAssistant:
  hide: false
  prompt: Speak only in rhymes
```

Set AI search suggestions:

```yaml {% title="redocly.yaml" %}
aiAssistant:
  hide: false
  suggestions:
    - How to create a new API?
    - What is Redocly?
    - How to manage an organization?
aiAssistant:
  trigger:
    hide: false
    inputType: button
    inputIcon: redocly
```

Hide AI search for the project and enable it only for one product:

```yaml {% title="redocly.yaml" %}
aiAssistant:
  hide: true
```

```yaml {% title="products/platform/redocly.yaml" %}
aiAssistant:
  hide: false
```

## Resources

- **[`search`](./search.md)** - Learn how to customize search in your project, curate search results, and exclude pages from search
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization