---
template: ../@theme/templates/BlogPost
title: Where to store your OpenAPI definitions
description: Part 1 of our series of posts around managing OpenAPI definitions with Redocly
seo:
  title: Where to store your OpenAPI definitions
  description: Part 1 of our series of posts around managing OpenAPI definitions with Redocly
author: swapnil-ogale
publishedDate: "2021-01-07"
categories:
  - api-specifications:openapi
  - api-governance:review-workflows
  - technical-documentation
image: team.png
---
_This post is the first of a series of posts we plan to publish around how organizations can leverage the best of OpenAPI definitions, source control repositories, documentation contributors, and Redocly products._

Redocly's developer portal gives developers all the information and tools they need to use your API.

Developers build the developer portal by embedding API definitions, and technical writers can add landing pages, how-to guides, tutorials, examples, and contextual information to the developer portal.

# Storing your OpenAPI definitions

While building the developer portal, developers and technical writers work together to document the API definitions, and the context around the OpenAPI definition. In order to do this, they both need access to the OpenAPI definitions and also any subsequent changes made to them, to maintain a single source of truth on the API documentation.

If you are a new customer, one of the questions that often comes up is how technical writers and developers can work together on the same repository to maintain the integrity of the OpenAPI definition.

Let us look at the pros and cons of three separate approaches to do this.

## Approach 1: Code and OpenAPI definitions are co-located in the same source control repository

In this option, all the contributors, including the developers, technical writers, and the Redocly app have access to the source control repository that contains the OpenAPI definitions.

Typically, this source control repository is only available to developers, and may be restricted to outside parties (such as Redocly).

**Pros**
- The OpenAPI definition is synchronized with the code
- It is visible to and accessible by all contributors equally
- It is simple to implement and maintain

**Cons**
- As the code and OpenAPI definitions are stored in the same source control repository, all contributors will gain access to code. You will need to consider if this will work with your organization's security model.

**How does it work for tech writers and Redocly?**

Tech writers can be restricted to commit to only the unprotected branches on the repository. Your organization can set up a process where tech writers can participate via the pull-request workflow, and modify descriptions on **features/fix** branches which are then pulled into the **main** branch.

Once Redocly has undergone security review, it can be granted access to automate the linting, bundling and pushing API definitions to its API registry.

## Approach 2: OpenAPI definitions are stored in a dedicated OpenAPI repository

In this option, the OpenAPI definitions are stored in a dedicated source control repository separate to the core code. This allows technical writers and Redocly to access this separate repository without compromising the integrity of the code respository.

{% admonition type="info" %}
This approach relies on a manual synchronization between the code and dedicated OpenAPI repository. It works well when developers adopt a design-first approach whereby they start create and modify OpenAPI definitions prior to changing any API source code.
{% /admonition %}

**Pros**
- Easy access to repository by non-developers
- It is simple to implement and maintain

**Cons**
- Additional task for developers to ensure the OpenAPI repository is synchronized with the code with each release

**How does it work for tech writers and Redocly?**

Tech writers use the OpenAPI definition repository to build reference docs and the developer portal content independently of the code.

Once Redocly has undergone security review, it can be granted access to this OpenAPI repository to automate the linting, bundling and rendering reference documentation.

## Approach 3: OpenAPI definitions are maintained in both the code and dedicated repositories, and synchronized

In this option, both Redocly and tech writers have no access to the source code OpenAPI definition repository. The only way to manage this is to have a two-way sync between the developer code repository, with the OpenAPI definitions, and the tech writer OpenAPI definition repository.

Minor variations of this approach work with both a mono repo or multiple micro repo code structure too.

**Pros**
- The OpenAPI definitions are in sync with the source code.

**Cons**
- It is complex to set up this workflow (two-way automated sync)
- Hard for tech writers and non-developers to understand how to operate the workflows

**How does it work for tech writers and Redocly?**

When developers commit changes to the main branch of the developer OpenAPI definition repository, an automated process will open a PR with these changes in the technical writers' OpenAPI definition repository. Tech writers review the PR, make changes and merge their changes to the main branch in their OpenAPI definition repository, which will open a corresponding PR in the developer OpenAPI definition repository. This effectively synchronizes the repositories.

Once Redocly has undergone security review, it can be granted access to this tech writer version of the OpenAPI definition repository to automate the linting, bundling and rendering reference documentation.

## Summary and recommendations

Redocly recommends attempting Approach 1 as it is the most straight-forward and easiest to implement.

Appoaches 2 and 3 have their own pros and cons.
- If you have a development team willing to adopt a new process, go with Approach 2.
- If you have a large team where it is more difficult to change user behaviors, go with Approach 3.

_In our next post, we will explore how to implement a two-way sync between Git repositories._
