---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# `info`

Customize the overview section of your GraphQL API documentation with metadata like title, description, contact information, and license details.

## Usage

Add the `info` object to your GraphQL configuration to display API metadata in the overview page:

```yaml {% title="redocly.yaml" %}
graphql:
  info:
    title: GitHub GraphQL API
    version: v4
    description: |
      Comprehensive **GraphQL API** for GitHub.
      
      ## Features
      - Precise data queries
      - Strongly typed schema
    termsOfService: https://example.com/terms
    contact:
      name: API Support
      url: https://support.example.com
      email: support@example.com
    license:
      name: MIT
      url: https://opensource.org/licenses/MIT
```

## Options

{% table %}

- Option
- Type
- Description

---

- title
- string
- The name of your GraphQL API. Appears in the page header and sidebar.

---

- version
- string
- The version of your API. Displays next to the title as `Title (version)`.

---

- description
- string
- Markdown-formatted description of your API. Supports headings, lists, code blocks, and links.

---

- termsOfService
- string
- URL to your API's terms of service. Displays as a link in the overview panel.

---

- contact
- [Contact object](#contact-object)
- Contact information for API support.

---

- license
- [License object](#license-object)
- License information for your API.

{% /table %}

### Contact object

{% table %}

- Option
- Type
- Description

---

- name
- string
- Name of the contact person or team.

---

- url
- string
- URL to a contact page or support site.

---

- email
- string
- Contact email address for API support.

{% /table %}

### License object

{% table %}

- Option
- Type
- Description

---

- name
- string
- License name (e.g., MIT, Apache 2.0). Used as link text when `identifier` is not provided.

---

- url
- string
- URL to the full license text.

---

- identifier
- string
- SPDX license identifier. When provided, displays instead of the license name.

{% /table %}

## Schema directives (alternative)

You can also define info metadata using GraphQL schema directives.
Config values take precedence over schema directives.

```graphql
directive @redocly_info(title: String, version: String, description: String, termsOfService: String) on SCHEMA
directive @redocly_contact(name: String, url: String, email: String) on SCHEMA
directive @redocly_license(name: String, url: String, identifier: String) on SCHEMA

schema 
  @redocly_info(
    title: "My API"
    version: "1.0"
    description: "API description from schema"
  )
  @redocly_contact(email: "support@example.com")
  @redocly_license(name: "MIT")
{
  query: Query
}
```

## Schema docstring (fallback)

You can also provide title and description using GraphQL's standard docstring syntax.
This has the lowest priority and is used only when values are not provided in config or directives.

```graphql
"""
# My API Title

Description goes here.
Multiline etc etc.
"""
schema {
  query: Query
}
```

If the docstring starts with `#` (followed by a space) on the first line, that line is extracted as the title and the rest as the description.
Otherwise, the entire docstring is used as the description.

## Per-API customization

Use the `apis` configuration to customize info for each GraphQL API separately:

```yaml {% title="redocly.yaml" %}
# Global defaults
graphql:
  info:
    contact:
      email: default@company.com

# Per-API overrides
apis:
  github-api@v1:
    root: ./github.graphql
    graphql:
      info:
        title: GitHub API (Production)
        contact:
          email: github-support@company.com
  
  internal-api@v1:
    root: ./internal.graphql
    graphql:
      info:
        title: Internal API
        contact:
          email: internal-support@company.com
```

## Merge priority

When info is defined in multiple places, they merge with this priority (highest to lowest):

1. Per-API config (`apis.*.graphql.info`) - highest priority
2. Global config (`graphql.info`)
3. Schema directives (`@redocly_info`, `@redocly_contact`, `@redocly_license`)
4. Schema docstring (`"""..."""`) - lowest priority (title and description only)

## Resources

- **[Add GraphQL documentation](../../content/api-docs/add-graphql-docs.md)** - Add GraphQL schemas to your project and configure documentation
- **[GraphQL configuration reference](./index.md)** - Complete reference for all GraphQL configuration options