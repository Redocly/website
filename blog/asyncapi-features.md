---
template: '../@theme/templates/BlogPost'
title: Redocly CLI for AsyncAPI descriptions
description: Embrace multiple specification standards with one tool, Redocly CLI.
seo:
  title: Redocly CLI for AsyncAPI descriptions
  description: Embrace multiple specification standards with one tool, Redocly CLI.
author: lorna-mitchell
date: 2024-09-05
categories:
  - openapi
  - asyncapi
image: Redocly_blog_8.jpg
---

OpenAPI is firmly in place as the best-practice way to describe HTTP APIs, but not all data requirements can be served by a request/response pattern.
Those organizations looking to raise their data transfer game are increasingly turning to [AsyncAPI](https://www.asyncapi.com/) to expand beyond HTTP and into event-driven data technologies.

Just like OpenAPI, AsyncAPI is a human- and machine-readable description of data payloads and where that data can flow from and to.
The two specifications build on one another, so if you already know OpenAPI then AsyncAPI will be pretty similar.
At Redocly, we use both description types in our own systems, so it's no surprise that we added support for AsyncAPI to Redocly CLI alongside the existing and much-loved OpenAPI support.

## Why companies adopt AsyncAPI

Just like OpenAPI, AsyncAPI is an open source, community-owned standard for describing event-driven systems.
It's used with data streams, queues, and brokers to describe the flow of data payloads between systems.

Data streaming between applications, or components of an application, has become increasingly more common, and AsyncAPI provides a way to describe the data and the movement.
While this type of data flow is mostly found in IoT (Internet of Things) applications, it is also present in other types of software where data flows to other parts of the system.
Popular technology choices for these applications include Apache Kafka, RabbitMQ, and MQTT - and all of these choices are growing in adoption.

Our own usage is with RabbitMQ.
As we scaled our platform, we moved to decouple the different sections, and pass data between them in a way that we could easily integrate with, reason about, and that could grow with us.
Adopting existing standards such as AsyncAPI and [CloudEvents](https://cloudevents.io/) made our jobs easier by providing a solid foundation to build on.

## What Redocly brings to an AsyncAPI project

Redocly CLI has had AsyncAPI support for about a year, so it's not super new, but it's recently had some upgrades.
Current features include:

- Support for AsyncAPI 3.0 and AsyncAPI 2.6 (earlier versions of AsyncAPI 2.x may also work for some use cases).
- Linting for valid descriptions, and a selection of rules you can selectively enable for more common checks.
- Configurable linting rules like we have for OpenAPI, so you can build whatever you need.
- Bundle support, to resolve references and generate a single output file.

### Hands on: Lint AsyncAPI

With so many different approaches to AsyncAPI, we didn't publish a default or recommended ruleset for AsyncAPI.
So to get started linting your definition with Redocly CLI, configure the rules you'd like to use in `redocly.yaml`.
The following example is a starting point:

```yaml
rules:
  spec: error
  channels-kebab-case: error
  info-contact: warn

```

With [Redocly CLI installed](../docs/cli/installation), run the lint command as follows:

```bash
redocly lint asyncapi.yaml
```

The configuration file is automatically detected.
If anything in the AsyncAPI description doesn't match the required rules, the `lint` command displays information about the problem in the output.
You can also get the output in other formats, such as JSON, Markdown, or GitHub Actions annotations format if you use the command in your CI setup.

## Hands on: Bundle AsyncAPI

Bundling API descriptions helps to bridge the gap between what makes them easy to create and maintain, and the format that the downstream tools expect to receive.
Just like OpenAPI, AsyncAPI supports a reference syntax, `$ref`, that encourages re-use of content, including across files.

The AsyncAPI project has excellent example files, and to try out bundling we used their [social media](https://github.com/asyncapi/spec/tree/master/examples/social-media) example which has some common content referenced from the different files.
To bundle the `comment-service/asyncapi.yaml` file into a single file without external dependencies, use a command like the following:

```bash
redocly bundle comment-service/asyncapi.yaml --output comments-bundled.yaml
```

The bundle command picks up all the elements referenced in the AsyncAPI description, and puts them all in the output file.

It replaces:

- `$ref: '../common/parameters.yaml#/commentId'`

With this instead:

- `$ref: '#/components/parameters/commentId'` - and copies the contents of the reference into the output file components section.

This approach makes it easier to compose and maintain the API descriptions, while still producing output for tools that only support a single input file.

## Next steps

- Learn more about [linting AsyncAPI with Redocly CLI](../docs/cli/guides/lint-asyncapi).
- Visit the [AsyncAPI project](https://www.asyncapi.com/).
- Check out [Redocly CLI](../docs/cli) and learn what else you can do with this tool.


