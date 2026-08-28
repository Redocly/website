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

Define preprocessor steps that transform your API description files.
Preprocessors are like decorators, but they run before linting instead of after.
Both sections of the configuration file take the same options.
For details, see the [`decorators` configuration options](./decorators.md).

## Resources

- **[Decorators](./decorators.md)** - Built-in transformations that run after linting
- **[Plugins configuration](../plugins.md)** - Add code extensions with custom behavior
- **[Custom plugins](https://redocly.com/docs/cli/custom-plugins)** - Write your own rules, decorators, and preprocessors
- **[Configuration options](../index.md)** - All the other options for your project
