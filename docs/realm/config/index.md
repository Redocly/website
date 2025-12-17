---
keywords:
  includes:
    - redocly.yaml
---
# Configure Redocly

The `redocly.yaml` file is the single place to configure everything Redocly.
This configuration file allows you to customize your API documentation, developer projects, and other Redocly services according to your needs.

This guide provides a comprehensive overview of available configuration options organized by functional areas.

{% configIntroduction /%}

{% configSection title="API Management" description="These options let you define your APIs and control how API descriptions are processed and validated." %}
  {% configProperty file="apis.md" /%}

  {% configProperty file="openapi/index.md" /%}

  {% configProperty file="graphql/index.md" /%}

  {% configProperty file="mock-server.md" /%}

  {% configProperty file="openapi/decorators.md" /%}

  {% configProperty file="openapi/preprocessors.md" /%}

  {% configProperty file="openapi/extends.md" /%}

  {% configProperty file="rules.md" /%}

  {% configProperty file="scorecard-classic.md" /%}

  {% configProperty file="catalog-classic.md" /%}
{% /configSection %}

{% configSection title="Navigation elements" description="These settings control how users navigate through your documentation project." %}
  {% configProperty file="navbar.md" /%}

  {% configProperty file="sidebar.md" /%}

  {% configProperty file="footer.md" /%}

  {% configProperty file="navigation.md" /%}

  {% configProperty file="search.md" /%}

  {% configProperty file="ai-assistant.md" /%}
{% /configSection %}

{% configSection title="User interface" description="Customize the look and feel of your documentation project with these options." %}
  {% configProperty file="banner.md" /%}

  {% configProperty file="code-snippet.md" /%}

  {% configProperty file="breadcrumbs.md" /%}

  {% configProperty file="markdown.md" /%}

  {% configProperty file="remove-attribution.md" /%}

  {% configProperty file="logo.md" /%}

  {% configProperty file="color-mode.md" /%}

  {% configProperty file="user-menu.md" /%}
{% /configSection %}

{% configSection title="Content management" description="Organize and control documentation content, versions, and localization." %}
  {% configProperty file="products.md" /%}

  {% configProperty file="version-picker.md" /%}

  {% configProperty file="l10n.md" /%}

  {% configProperty file="metadata.md" /%}

  {% configProperty file="metadata-globs.md" /%}
{% /configSection %}

{% configSection title="Security and access management" description="Configure user authentication and access controls for your documentation." %}
  {% configProperty file="rbac.md" /%}

  {% configProperty file="requires-login.md" /%}

  {% configProperty file="sso.md" /%}

  {% configProperty file="residency.md" /%}
{% /configSection %}

{% configSection title="Customization" description="Extend functionality with custom code and additional features." %}
  {% configProperty file="api-functions.md" /%}

  {% configProperty file="plugins.md" /%}

  {% configProperty file="openapi/resolve.md" /%}

  {% configProperty file="env.md" /%}

  {% configProperty file="response-headers.md" /%}

  {% configProperty file="links.md" /%}

  {% configProperty file="scripts.md" /%}
{% /configSection %}

{% configSection title="Analytics and SEO" description="Improve discoverability and track usage of your documentation." %}
  {% configProperty file="analytics/index.md" /%}

  {% configProperty file="seo.md" /%}

  {% configProperty file="redirects.md" /%}

  {% configProperty file="ignore.md" /%}
{% /configSection %}

{% configSection title="Developer experience" description="Enhance the experience for developers using your APIs." %}
  {% configProperty file="developer-onboarding/index.md" /%}

  {% configProperty file="feedback.md" /%}

  {% configProperty file="reunite.md" /%}
{% /configSection %}

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
