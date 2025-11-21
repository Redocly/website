---
template: ../@theme/templates/BlogPost
title: Combine OpenAPI Files
description: Make one coherent API from split definitions or multiple API descriptions using Redocly CLI.
seo:
  title: Combine OpenAPI Files
  description: Make one coherent API from split definitions or multiple API descriptions using Redocly CLI.
author: lorna-mitchell
date: "2024-02-02"
categories:
  - api-specifications:openapi
image: Redocly_blog_1.jpg
---
Moving beyond single-file OpenAPI descriptions and into more complex pipelines is becoming more common, but often teams run into difficulty in turning their architectural ideals into reality. In this post, we'll look at two common use cases for combining OpenAPI files, and how to successfully achieve the task.

## Single OpenAPI file: split for development, bundle to publish

For organizations with a single API, maintained in a single file, it's common to find that the file quickly grows to tens (or hundreds) of thousands of lines of YAML or JSON. OpenAPI is a descriptive format and when you've added descriptions, examples, default values, error responses, and all the other good stuff to help developers get the best from your API, the result is often large.

To make the file more manageable, use the Redocly CLI [split](https://redocly.com/docs/cli/commands/split/) command. This command takes a long file and splits it up into separate files for each path, component, and so on. The original OpenAPI file remains as the main entry point, but with use of `$ref` reference links, pointing to the various sections of your API that have been moved into to separate files.

 Working with the files in this format is more efficient for the following reasons:

* No single file is too large to be opened in any editor.
* Multiple files can be opened and compared, rather than needing to jump around the OpenAPI file while working.
* API change reviewers can easily see which files were changed (and which were not), making it easier to spot if something was missed.

For example, using the [Museum API](https://github.com/Redocly/museum-openapi-example) example, a command can be created to split the API reference up and put the new structure into a `museum-api/` directory, leaving the original file intact. That command looks like this:

```bash
redocly split openapi.yaml --outDir museum-api
```

In the new `museum-api/` directory, there is an `openapi.yaml` file, and subdirectories for `paths/` and `components/`, each containing the entries from those sections of the API description.

While the many-files structure is ideal for humans working on changes at development time, it's very common to bundle everything into a single file for publishing. Some tools like SDK generators may only support a single file as their input, and most documentation tools offer a single file download for users too. The [`bundle`](https://redocly.com/docs/cli/commands/bundle/) command takes the split files and reassembles them into a single OpenAPI file; the following command shows an example:

```bash
redocly bundle museum-api/openapi.yaml -o museum.yaml
```

The combined `museum.yaml` file is the full OpenAPI file that can be used with other tools that prefer the single-file format.

## Multiple OpenAPI files: join to create one API

While the API produced by a company should always follow consistent guidelines, there are no rules that say that every team has to share a single file or even a single process to get to this desired outcome. A good example is in microservices architectures, or similar situations where individual teams own small parts of the overall API structure, and collaborating on a single artifact. Many teams will produce an API description for each microservice or module of their application, and then combine them.

The [`join`](https://redocly.com/docs/cli/commands/join/) command is a great way to bring the output of diverse development processes together to create a complete output.
It is OpenAPI-aware and makes it easy to combine multiple API descriptions into a single API surface that can be presented to a user.
To make a consistent and delightful API, the teams need to have common API guidelines in place so that the APIs feel consistent even before they are joined.

For example, the command to merge two API descriptions for different microservices and output the full result into an API description file called `combined.yaml` would be like this:

```bash
redocly join orders/openapi.yaml accounts/openapi.yaml -o combined.yaml
```

With this approach, if one team maintains the product catalog, and another handles the API endpoints for the orders, each team can work independently, and then put their work together to make a single API experience for users. Not many tools support this workflow yet, but it's common in larger organizations and with more complex API applications, so it's a tool worth knowing and having in your API toolbox.

## API file management

As API projects become more advanced, they need a little more tooling to support their evolution. Giving consideration to the developer experience, not just of the end user, but also of the teams who work on the API during its lifecycle, can have a big impact. Good file structure and the tooling to go with it gives teams more options for finding an API workflow that works for them.

Here are some more resources to help you on your API journey:

* Check the list of [Redocly CLI commands](https://redocly.com/docs/cli/commands/) and visit any of the pages to see more information. This post showed `split`, `bundle` and `join` - but there are more.
* The opposite of combining APIs, split your OpenAPI description up with our guide to [removing internal API endpoints](https://redocly.com/docs/cli/guides/hide-apis).
* Get to know some of the other [Redocly tools for better API development](https://redocly.com/blog/redocly-tools-better-openapi-development/).

