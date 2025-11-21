---
template: ../@theme/templates/BlogPost
title: OpenAPI Operation IDs make good API design
description: Use Operation IDs to write better, more valuable API descriptions and improve developer experience.
seo:
  title: OpenAPI Operation IDs make good API design
  description: Use Operation IDs to write better, more valuable API descriptions and improve developer experience.
author: lorna-mitchell
date: "2023-11-29"
categories:
  - api-lifecycle:design
  - api-specifications:openapi
image: Redocly_blog_6.jpg
---
Writing API descriptions requires thinking about the endpoints in your API, and
how developers interact with them individually and with the API as a whole. Each
endpoint and HTTP verb combination make an `operation`, and contribute to the
overall experience. Beyond the per-operation summaries and descriptions, and the
data payloads, we rarely pay attention to the hidden gem of API design -- the
`operationId`. Today I'll show you how this small field can have a big impact on
developer experience, and how to use it to good effect.

## What is an `operationId`?

From the [OpenAPI specification](https://spec.openapis.org/oas/v3.1.0#operationObject):

> Unique string used to identify the operation. The id _MUST_ be unique among
> all operations described in the API. The operationId value is
> **case-sensitive**. Tools and libraries _MAY_ use the operationId to uniquely
> identify an operation, therefore, it is _RECOMMENDED_ to follow common
> programming naming conventions.

The `operationId` field  is a unique way of referring to a specific operation
in an OpenAPI description. It's easy to overlook, since the
specification does not require the field. Redocly CLI's [recommended
ruleset](https://redocly.com/docs/cli/rules/recommended/) includes checks for
the `operationId` being required, unique and URL-safe - so you can see that we
feel pretty strongly that it's a good feature to include! In fact, it's used by
the majority of the modern tools that consume OpenAPI descriptions and should be
a consideration for API designers everywhere.

Having a good identifier, unique to each operation, can deliver some unexpected
benefits. It's subtle, because in plenty of OpenAPI usage the `operationId`
isn't visible at all, but a unique and descriptive handle for each operation is
useful in many situations.
Get this right, and your users (and your future self) will thank you.

## Make `operationId` work for you

Thoughtful use of `operationId` is an indication of good API design. It shows
consideration for multiple applications of the API, and improves the developer
experience for consumers and producers alike. Before you decide on a naming
convention though, it might help to think about where this identifier is used
in practice:

- In API documentation, the `operationId` is often used as a URL fragment so
  that a user can link to exactly the correct endpoint in a long API
documentation page. When a user bookmarks multiple endpoints to refer back to,
a meaningful name helps them navigate to the right place easily.
- When generating code, both for clients and servers, the `operationId` is
  often used in method or function names. Picking good IDs for your operations
when designing an API, therefore, enables much smoother API integrations,
especially if every `operationId` follows a naming convention and is consistent
across the API surface.
- API Gateways use the `operationId` to configure endpoints for rate limiting,
  authorization, and other similar features. Meaningful names makes life easier
for developers and makes misconfiguration less likely.

Though subtle, the under-appreciated `operationId` has an outsized impact on developer experience and can enhance API design when used thoughtfully.

To begin, try using a pattern of `verb-noun`, for example `getEvents`. Add more
specific words in, as needed, for clarity. For example instead of just
`getAccounts` you might have endpoints `getUserAccounts` and `getAdminAccounts`.
Don't be afraid to break out of the CRUD (Create, Read, Update and Delete) set
of verbs to choose words that more clearly describe  what is happening:
`archiveProduct` would be a good example here.

Test out your naming informally by asking someone "what would you expect an API
endpoint named [your name idea] to do?". Sometimes the names we think are
perfectly obvious are not so obvious to others, and this test is a great way to
identify those situations before they are baked into a public API!

Naming conventions will differ between organizations and use cases, but
whatever you choose, being consistent across your API and making sure that
every `operationId` is unique is the most important thing to aim for.

## Learn more

- Turn on the
  [`operation-operationId-unique`](https://redocly.com/docs/cli/rules/operation-operationId-unique/)
rule in your linting setup and make sure you're writing good `operationId`s in
your APIs.
- Browse our [visual OpenAPI
  reference](https://redocly.com/docs/openapi-visual-reference/operation/) to
learn more about `operation` and its fields.
- Level up your OpenAPI descriptions further by reading our post about
  [Markdown in OpenAPI](./markdown-in-openapi.md).
