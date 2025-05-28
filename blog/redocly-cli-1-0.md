---
template: '../@theme/templates/BlogPost'
title: Announcing Redocly CLI 1.0
description: The OpenAPI CLI utility reaches a milestone stable release
seo:
  title: Announcing Redocly CLI 1.0
  description: The OpenAPI CLI utility reaches a milestone stable release
author: lorna-mitchell
date: 2023-08-16
categories:
  - openapi
  - tech-writers
image: cli.png
---

Redocly CLI is now available in a 1.0 stable version. This open source command-line tool with OpenAPI superpowers is an essential addition to any API project.

In today's fast-paced digital landscape, robust API management is crucial for developers seeking to build scalable and efficient applications.
That's where Redocly CLI comes in.
Redocly CLI is a cutting-edge developer tool designed to simplify and optimize API management, providing developers with a comprehensive set of features to streamline their workflow. Built on the foundation of OpenAPI, the industry-standard specification for designing and documenting APIs, Redocly CLI empowers developers to ensure API design standards, produce excellent documentation, and expedite development cycles. With Redocly CLI, developers can build high-quality APIs, and deliver exceptional user experiences with ease and efficiency.
Get ready to take your API management to new heights and unlock a world of possibilities with Redocly CLI!

## Features to change your API life

📖 [Generate brilliant docs](https://redocly.com/docs/cli/api-docs/), a key ingredient to every successful API project. Use `redocly preview-docs` to work on your API and documentation locally, then use `redocly build-docs` to produce HTML (rendered by [Redoc](https://github.com/Redocly/Redoc)) to publish.

🎯 Get your API right every time with [API standards](https://redocly.com/docs/cli/api-standards/) and `redocly lint`. Consistent API standards, compliance and governance make for delightful developer experiences.

🧩 Break long OpenAPI files into smaller pieces with `redocly split`, so you can focus on what matters. Afterwards, the `redocly bundle` command quickly recombines the pieces into a single file for output.

📊 Glance at the shape and size of an API with `redocly stats`.

🔀 Combine separate APIs into a single OpenAPI description with `redocly join`.

## Empower your API lifecycle

**Effortless design and development:** With Redocly CLI on your local machine, enjoy a responsive experience while designing and developing APIs. Implement your ideas quickly and effortlessly, thanks to the tool's proximity to your work.

**Continuous integration, continuous improvement:** Integrate Redocly CLI into your CI workflows for consistent quality and stakeholder involvement. Automatically check commits against standards, generate documentation previews, and enhance collaboration for faster iterations.

**Streamlined continuous deployment:** Redocly CLI automates critical tasks for smooth deployment. Generate publication-ready HTML documentation, bundle OpenAPI files, and transform existing descriptions seamlessly. Optimize efficiency, reduce errors, and enhance business agility.

## Your API tooling, your way

If JavaScript is your thing, then use NodeJS and install [Redocly CLI](https://www.npmjs.com/package/@redocly/cli) using [`npm`](https://www.npmjs.com/), or run it with [`npx`](https://www.npmjs.com/package/npx). If not, then you can [use Redocly CLI from Docker](https://redocly.com/docs/cli/installation/#a-iddockerarun-commands-inside-docker) instead.

With a common configuration file, `redocly.yaml`, for all Redocly tools, using our [VSCode extension](https://marketplace.visualstudio.com/items?itemName=Redocly.openapi-vs-code) or [hosted documentation platform](https://redocly.com/reference/) is an easy move at any time. Or use the Redocly CLI as it is, in the context of your GitHub Actions, existing scripts, or other platforms.

## API future is here

Time to get started!

- [Install Redocly CLI](https://redocly.com/docs/cli/installation/) and take the tool for a spin.
- [Visit the documentation](https://redocly.com/docs/cli) to dig deeper into any of the features or to learn more.
- If you already used `redoc-cli` then the [migration guide](https://redocly.com/docs/cli/guides/migrate-from-redoc-cli/) leads you through a painless upgrade experience.
- Star [Redocly CLI on GitHub](https://github.com/Redocly/redocly-cli) and join the community there.
- [Sign up for newsletter updates!](https://redocly.com/product-updates/) We have a few more tricks up our sleeve and we'd love to share them with you.
