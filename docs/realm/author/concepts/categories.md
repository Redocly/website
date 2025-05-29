# Categorize content

A catalog is an important tool to make APIs more discoverable.
At full potential, a catalog should include all of your APIs, and be filterable across a variety of categories that users would find useful.

Redocly [catalog legacy component](../../config/catalog-legacy.md) can be configured to render a catalog of content based on metadata configurations.

While composing catalogs manually may be a viable approach for small and definitive catalogs, a larger catalog requires some automation to list and classify APIs.

## Page types

Redocly automates listing and categorizing by targeting "types" of pages, such as OpenAPI or GraphQL pages.
Any type of page can be targeted.
Redocly has a flexible system of type definition, so a user can define a type by adding front matter to a Markdown file.
Redocly automatically inspects files during a build process and determines its type based on the structure of the contents, the front matter, or an accompanying configuration file.

```yaml
catalog:
  catalogId:
    items:
      - directory: ./apis
        includeByMetadata:
          type:
            - openapi
            - graphql
            - soap
            - tutorials
```

To give catalogs more utility, they can be filtered based on a variety of user-defined metadata.

## Metadata

While metadata can specify the type of file, it can also specify additional attributes and values used to categorize and classify the data further.

### Importance of categorization

Despite its predominance in library systems, Amazon does not use the Dewey Decimal System to organize books.
The Dewey Decimal System is a library classification system that assigns a numerical code to each book based on its subject matter.
This system is primarily used in physical libraries to help users locate books on shelves.

Amazon, as an online retailer, has a different approach to organizing books.
They use a hierarchical categorization system, which sorts books into various categories and subcategories based on genre, subject matter, and other criteria.
This system allows users to easily browse and discover books by filtering through categories of interest or using the search function.

While the Dewey Decimal System may serve as a useful framework for organizing physical books in libraries, Amazon's categorization system is better suited for the digital environment, where users can easily search and navigate through vast collections of books.

In a similar way, Redocly has a flexible categorization system which allows definition of metadata on APIs (in `x-metadata`), or in Markdown front matter, or in the `metadata` object of the Redocly configuration file.

### Priority

In terms of priority, Redocly considers the following list as the order of importance (from most important first):

- `x-metadata`
- Front matter
- Configuration file

In case of a conflict, the higher priority metadata prevails.

### Category governance

Distributed category creation can lead to overlapping categories, or near identical categories which results in confusing results.
Instead, categories should be created sparingly.
Similarly, values of the categories should be created sparingly too.

Self-categorization of data is important for scalability.
Therefore, it must happen in a distributed way across a broader suite of teams.
You need a mechanism to enforce a limited number of categories and accepted values in a distributed fashion.

Redocly lint rules can enforce `x-metadata` usage in APIs and `metadata` in configuration files with the `metadata-schema` rule definition.

Define `metadata-schema` similarly to other lint rules.

The following is an example of metadata-schema defined in `redocly.yaml` configuration file.

```yaml
rules:
  metadata-schema:
    type: object
    properties:
      team:
        type: string
        enum:
          - Finance
          - Operations
          - Marketing
          - Product
          - Engineering
        description: Team responsible for the API.
```

**openapi.yaml**

```yaml
info:
  x-metadata:
    team: Finance
    department: Business & Money
    category: Accounting
    subcategory: Managerial Accounting
```

**example.md**

```md
---
metadata:
  team: Finance
  department: Business & Money
  category: Accounting
  subcategory: Managerial Accounting
---

# A sample Markdown page
```

**redocly.yaml**

```yaml
metadata:
  team: Finance
  department: Business & Money
  category: Accounting
  subcategory: Management Accounting
```

Notice in the last file the subcategory was "Management Accounting" instead of "Managerial Accounting" which was a typo on behalf of the distributed team member.

To solve this issue, centralized project setting can restrict the possible set of keys and corresponding values.
Additionally, a project should publish these rules to the team of publishers who can adhere to the categories defined by the governing committee.

In some cases, the list of possible values may be limited, such as in the categorization above.
In other cases, the list of possible values may be open ended, such as for "author" shown in the next example.

```yaml
x-metadata:
  team: Finance
  department: Business & Money
  category: Accounting
  subcategory: Managerial Accounting
  author: Karen Berman
```

## Summary

Redocly supports flexible content categorization needs that can:

- create a catalog
- filter content in a catalog

At the same time, Redocly supports rigid enforcement of specific category keys and values.
