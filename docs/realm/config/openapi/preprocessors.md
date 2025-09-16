---
products:
  - Realm
  - Redoc
  - Revel
  - Reef
  - Redocly CLI
plans:
  - Community
  - Pro
  - Enterprise
  - Enterprise+
description: Define preprocessor transformation steps for your API description files.
---
# `preprocessors`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

## Introduction

{% $frontmatter.description %}
Preprocessors are similar to decorators, but they run before linting rather than after.
Refer to the [`decorator` configuration options](./decorators.md) documentation for details; the options available are the same in both the `decorators` and `preprocessor` sections of the configuration file.

## Resources

- **[Decorators](./decorators.md)** - Built-in transformations for your OpenAPI documents to modify structure and content during processing
- **[Plugins configuration](../plugins.md)** - Configure code extensions to extend existing functionality with custom behaviors and transformations
- **[Custom plugins](https://redocly.com/docs/cli/custom-plugins)** - Create custom plugins to extend Redocly functionality with your own processing logic and transformations
- Explore other [configuration options](../index.md) for your project.
