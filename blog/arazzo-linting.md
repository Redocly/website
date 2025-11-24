---
template: ../@theme/templates/BlogPost
title: Lint Arazzo workflow files with Redocly CLI
description: Adopting new standards requires great tools. Use Redocly CLI to lint your OpenAPI, AsyncAPI and Arazzo format descriptions.
seo:
  title: Lint Arazzo workflow files with Redocly CLI
  description: Adopting new standards requires great tools. Use Redocly CLI to lint your OpenAPI, AsyncAPI and Arazzo format descriptions.
author: lorna-mitchell
publishedDate: "2024-07-24"
categories:
  - api-specifications:arazzo
  - api-governance:linting-rulesets
  - redocly:redocly-cli
image: Redocly_blog_1.jpg
---
When we started adopting the OpenAPI Workflows Specification before its [official release as Arazzo](https://www.openapis.org/announcement/2024/05/29/a-new-specification-from-openapi-arazzo), we saw great potential for building on the established OpenAPI standards already creating value for many organizations.

## About the Arazzo specification

{% admonition type="success" %}
Join the OpenAPI Initiative's [webinar introducing the Arazzo specification](https://www.linkedin.com/events/introducingthearazzospecificati7220085969037705218/theater/) on July 30th to hear more from Lorna and other OpenAPI experts.
{% /admonition %}

Arazzo describes a sequence of API requests and can define success criteria for each response, and use the response data of one request as an input to another.
The Arazzo specification takes API descriptions beyond the single request-and-response model and gives us a way to describe API-related tasks that require multiple API calls to achieve.

The ability to describe related API calls as parts of a broader task opens up the possibility for a number of different use cases.
Documenting complex API sequences, generating clients that can perform multi-request tasks and present them as a single function, or testing API workflows all become simpler.

Redocly's resident Arazzo specialist, Dmytro Ananskyi, also points out that the scope is much more than two calls from a single API, saying "I think the best feature is the ability to make requests to different APIs while describing the flow."
With the ability to build on multiple OpenAPI descriptions, we can describe workflows that cross API boundaries within an organization's API landscape and even include third-party APIs.

## Using Arazzo at Redocly

Redocly's immediate use case was to replace our existing custom syntax for internal API testing workflows with the Arazzo standard.
As early adopters, one big challenge is operating in an ecosystem that doesn't have many other developer tools yet.
Since Redocly CLI already has linting support for multiple formats (OpenAPI 3.x and 2.0, AsyncAPI 2.6 and 3.0), we quickly added Arazzo [linting support](../docs/cli/commands/lint) as well - mostly so we could use it ourselves!

To make things even more fun, Redocly were super early to the party.
Dmytro says "the biggest challenge was that the work on Arazzo wasn’t finalized when we began our implementation. This meant that some ideas were going back and forth, requiring rework and revision.".
Contributing to the development of industry standards is something we actively support at Redocly, and as OpenAPI members we were happy to be able to be part of the conversation and support the Arazzo standard coming to its first release.

One of the big benefits of using standard formats like OpenAPI or Arazzo is the ability to mix-and-match the tools in your toolbox.
Whichever other tools you use, you can add Redocly CLI to the process to lint your descriptions.

## Lint your Arazzo descriptions

Redocly CLI is an open source tool, making it easily available to run at every stage of the lifecycle.
Add Arazzo linting to your project using these steps:

1.  Install [Redocly CLI](../docs/cli) version 1.18 or later.

    ```bash
    npm install -g @redocly/cli@latest
    ```

    {% admonition type="info" name="Sample Museum Arazzo description" %}
    If you don't already have an Arazzo description, you can use a [sample file from the Museum API project](https://github.com/Redocly/museum-openapi-example).
    Clone the repository and find the Arazzo samples in the `arazzo/` directory.
    {% /admonition %}

1.  Introduce some errors or incorrect property spellings into your Arazzo file (otherwise the lint output isn't very interesting!).

1.  With your Arazzo description in a file named `api-flow.arazzo.yaml`, lint it with a command like the following:

    ```bash
    redocly lint api-flow.arazzo.yaml
    ```

    The command comes with a default ruleset that will give you immediate feedback on whether the supplied Arazzo description is valid.

1.  Check the output for any errors or warnings found in your Arazzo description.

## Next steps

Arazzo is a new specification release, so you'll hear more about it over time.
Here are some resources to get you started:

- Guide to [linting Arazzo in Redocly CLI](../docs/cli/guides/lint-arazzo), including details of changing the output format or getting annotations of problems into GitHub pull requests.
- The [latest Arazzo specification](https://spec.openapis.org/arazzo/latest.html).
- The [Arazzo examples from the Museum API](https://github.com/Redocly/museum-openapi-example/tree/main/arazzo).
- Detailed documentation for the [Redocly CLI `lint` command](../docs/cli/commands/lint).
- [Arazzo learning center](../learn/arazzo/what-is-arazzo.md).
