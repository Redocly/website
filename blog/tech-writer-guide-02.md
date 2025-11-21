---
template: ../@theme/templates/BlogPost
title: A tech writer's guide to the Redocly galaxy (part 2)
description: What exactly are 'API Docs'?
seo:
  title: A tech writer's guide to the Redocly galaxy (part 2)
  description: What exactly are 'API Docs'?
author: jody-winter
date: "2022-11-29"
categories:
  - technical-documentation:conceptual-documentation
image: blog-6.png
---
# A tech writer's guide to the Redocly galaxy: What exactly are 'API Docs'?

Do you find yourself staring blankly into space when API docs are mentioned?
Want to be part of the conversation but have no idea what everyone is on about?
In part two of our three-part series we explore the mysterious world of API docs and discover that they're not so scary.

## What's an API?

If you're completely new to APIs, start by reading [Adam's excellent article](https://redocly.com/blog/whats-an-api/).
It's an easy read, and will start you off on the right foot, I promise.

## The need for well-documented APIs

The growth of the internet has led to more organizations developing their own APIs to share data and utilize functionality developed by others.
When it comes to documenting APIs, traditional approaches fall short.
There are several reasons for this, but the main reason is that docs are kept apart from the code.

Because APIs have no front end, the docs *are* the UI.
Developers rely on up-to-date documentation published in an easy-to-read format so they understand how an API works, and how to implement it into their code.
Simply put, without docs, developers can't use an API.

### Types of API documentation

API docs fall into two categories: *reference docs* and *contextual docs*.

#### Reference docs

API reference docs (also known as 'API descriptions' and 'API definitions') describe an API's schema.
For example, how to structure requests sent to the API and how responses returned by the API are formatted.
This tells developers what information is available, in what format requests should be sent, and what data to expect in response.

#### Contexual docs

Contextual docs cover things like:

* Getting-started tutorials that help developers complete a few simple tasks and build their confidence using the API.
* How calls to the API are authenticated.
* A list of possible status and error codes that might be returned by the API.
* Rate-limits that determine how many times endpoints can be called, and any associated pricing.

### Best practices for documenting APIs

It doesn't make sense to maintain documentation manually, making changes in some dusty old Word document each time the development team adds a new endpoint or deprecates an operation.
The best way is to 'treat the docs like code'.

## Docs-as-code (aka Docs-like-code)

[Write the Docs](https://www.writethedocs.org/guide/docs-as-code/), the global technical writers' community, describes docs-as-code like this:

> Documentation as Code (Docs as Code) refers to a philosophy that you should be writing documentation with the same tools as code. This means following the same workflows as development teams, and being integrated in the product team. It enables a culture where writers and developers both feel ownership of documentation, and work together to make it as good as possible.

### How docs-as-code relates to APIs

The docs-as-code approach makes it easier for developers and technical writers to create and maintain technical documentation such as API docs.
What's not to [love](https://redocly.com/blog/docs-as-code/)?

Reference docs (API definitions) are authored in YAML or JSON using a predefined format called the OpenAPI Specification (more about this [soon](#the-openapi-specification-oas)).
Contextual docs are written in [Markdown](https://www.markdownguide.org/), a simple formatting markup language that can be learned in 10 minutes.

All files are managed in any source control system, such as GitHub.
Traditional authoring systems and workflows are not needed.
Writers get devs, and devs get writers.
Everyone is happy!

### How docs-as-code relates to Redocly

Redocly makes tools that utilize docs-as-code to transform API definitions into stylish docs, automating as much of the process as possible. Acting as a 'doc toolchain', these tools help you to organize your API source files for easy storage and maintenance, then allow you to validate and publish them using simple commands.

Not familiar with commands?
Don't worry!
I'm going to tell you all about them in the next post.

## The OpenAPI Specification (OAS)

An important part of docs-as-code — and documenting API reference docs — is the OpenAPI Specification (OAS).
The OAS acts like a blueprint to describe REST APIs. Most APIs fall into the REST category.
Other types include GraphQL, gRPC and SOAP.

Usually written in the YAML language (sometimes in JSON), the OAS lets you define each part of an API in a standardized format so that it can be linted (validated) and published into gorgeous, interactive documentation by tools like Redocly CLI and Redoc.

For more information about the OAS,
take a look at our [introduction to OpenAPI](/learn/openapi/learning-openapi.md).

## Coming up next

In the final part of this series, I'm going to teach you about Redocly CLI and Redoc.
I'm also throwing in some extra goodies so you will slay those API docs!
