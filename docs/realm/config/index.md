# Configure Redocly

The `redocly.yaml` file is the single place to configure everything Redocly.
This configuration file allows you to customize your API documentation, developer projects, and other Redocly services according to your needs.

This guide provides a comprehensive overview of available configuration options organized by functional areas.

## API management

These options let you define your APIs and control how API descriptions are processed and validated.

- [apis](https://redocly.com/docs/cli/configuration/reference/apis/)
- [openapi](./openapi/index.md)
- [graphql](./graphql/index.md)
- [mockServer](./mock-server.md)
- [decorators](https://redocly.com/docs/cli/configuration/reference/decorators/)
- [preprocessors](https://redocly.com/docs/cli/configuration/reference/preprocessors/)
- [extends](https://redocly.com/docs/cli/configuration/reference/extends/)
- [rules](https://redocly.com/docs/cli/configuration/reference/rules/)
- [scorecard](./scorecard.md)
- [catalogLegacy](./catalog-legacy.md)

## Navigation elements

These settings control how users navigate through your documentation project.

- [navbar](./navbar.md)
- [sidebar](./sidebar.md)
- [footer](./footer.md)
- [navigation](./navigation.md)
- [search](./search.md)

## User interface

Customize the look and feel of your documentation project with these options.

- [codeSnippet](./code-snippet.md)
- [breadcrumbs](./breadcrumbs.md)
- [markdown](./markdown.md)
- [removeAttribution](./remove-attribution.md)
- [logo](./logo.md)
- [colorMode](./color-mode.md)
- [userMenu](./user-menu.md)

## Content management

Organize and control documentation content, versions, and localization.

- [products](./products.md)
- [versionPicker](./version-picker.md)
- [l10n](./l10n.md)
- [metadata](./metadata.md)
- [metadataGlobs](./metadata-globs.md)


## Security and access management

Configure user authentication and access controls for your documentation.

- [rbac](./rbac.md)
- [requiresLogin](./requires-login.md)
- [sso](./sso.md)
- [residency](./residency.md)

## Customization

Extend functionality with custom code and additional features.

- [apiFunctions](./api-functions.md)
- [plugins](https://redocly.com/docs/cli/configuration/reference/plugins/)
- [resolve](https://redocly.com/docs/cli/configuration/reference/resolve/)
- [env](./env.md)
- [responseHeaders](./response-headers.md)
- [links](./links.md)
- [scripts](./scripts.md)

## Analytics and SEO

Improve discoverability and track usage of your documentation.

- [analytics](./analytics/index.md)
- [seo](./seo.md)
- [redirects](./redirects.md)
- [ignore](./ignore.md)

## Developer experience

Enhance the experience for developers using your APIs.

- [developerOnboarding](./developer-onboarding/index.md)
- [feedback](./feedback.md)
- [reunite](./reunite.md)

## Example configuration

The following example demonstrates a typical `redocly.yaml` configuration combining various options:

```yaml
logo:
  srcSet: './images/redocly-logo.svg light, ./images/redocly-logo-inverted.svg dark'
  altText: Redocly logo
  link: '/'
navbar:
  items:
    - page: index.md
      label: '{{ process.env.HOME_LABEL }}' 
    - page: config/index.md
      label: Config
feedback:
  type: sentiment
  settings:
    comment:
      likeLabel: What was most helpful?
      dislikeLabel: What can we improve?

apis:
  redocly-museum:
    root: './openapi-files/redocly-museum.yaml'

extends:
  - recommended

rules:
  info-license: error
  no-ambiguous-paths: error
  no-http-verbs-in-paths:
    severity: error
    splitIntoWords: true
  rule/operationId-casing:
    subject:
      type: Operation
      property: operationId
    assertions:
      casing: camelCase
  rule/no-description-start-with-the-a-an:
    subject:
      type: any
      property: description
    assertions:
      notPattern: /^(The\s|A\s|An\s)/

rbac:
  content:
    '**'
      authenticated: read

redirects:
  '/concepts/categories/':
    to: 'author/concepts/categories/'
  '/concepts/navigation/':
    to: 'author/concepts/navigation/'
```

This example includes logo customization, navigation setup, feedback controls, API descriptions, rule configurations, access controls, and redirects.

## Configuration principles

Redocly has a few important configuration philosophies:

- universal config (all configuration in one place)
- zero config (you don't need to do any configuration because we have sane defaults)
- config-as-code (all configuration should be writable in a simple source-control friendly format)

Some options have multiple levels of nesting.
Pay attention to the indentation and nesting when modifying the file.

## Next steps

After configuring your `redocly.yaml` file, you can validate it using the Redocly CLI with `npx @redocly/cli check-config`.
For more detailed information about specific configuration options, follow the links in each section.
