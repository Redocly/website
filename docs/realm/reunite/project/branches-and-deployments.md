---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Branches and deployments

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

In the **Branches and deployments** configuration, you can control which branches Reunite deploys and how it handles preview deployments for your project.
This configuration gives you precise control over your deployment strategy, allowing you to balance development workflow needs with resource management.

## Production branch

The **Production branch** setting defines your main branch (typically `main`) that triggers production deployments when changes are merged.
This is the branch that represents your live, published content.

## Branch deployment options

For **Branch deployments**, you have three options to control which branches are deployed:

- **All**: deploys every branch pushed to your repository
- **None**: deploys only the production branch
- **Individual branches**: lets you specify additional branches alongside production for deployment

## Preview deployments

The **Deployments preview** setting determines whether Reunite generates preview deployments for pull requests:

- **Any pull request**: enables previews for pull requests against your selected branches, allowing you to review changes before merging
- **None**: disables preview builds entirely to conserve resources

{% admonition type="info" %}
Draft projects handle production deployments differently than standard live projects.
While a project is in draft mode, its production deployment uses draft scaling and enforced login.
To learn more, see [draft projects](./draft-projects.md).
{% /admonition %}

### Preview deployments from forked repositories

By default, Reunite does not generate preview deployments for pull requests from forked repositories.
This security measure prevents external contributors from running potentially malicious code during the build process.

To enable preview deployments for forked PRs:

1. Navigate to **Settings > Branches and deployments** in your project.
1. Select the **Enable previews for external pull requests (forks)** checkbox.
1. Save your changes.

{% admonition type="warning" name="Security consideration" %}
Be cautious when enabling this setting.
External pull requests can contain malicious code that runs during the build process.
This code could compromise your environment and expose sensitive data and secrets from your pipeline.
Only enable this setting if you trust the contributors to your repository or have additional security measures in place.
{% /admonition %}

## Build process and API bundling

When Reunite processes your project during a build, it performs several steps in a specific order to ensure your APIs are properly validated, transformed, and optimized:

1. **Configuration discovery**: Reunite reads your `redocly.yaml` configuration file to understand your project settings, including linting rules, decorators, and output parameters.
1. **API discovery**: Reunite scans your repository to find all API description files (OpenAPI, AsyncAPI, etc.) that need to be processed.
1. **Linting and validation**: Each API is validated against the configured rules in your `redocly.yaml`. This includes:
   - built-in rules from rulesets like `minimal`, `recommended`, or `recommended-strict`
   - custom rules you've defined
   - scorecard rules, if configured
1. **Decorator application**: Reunite applies any configured [decorators](https://redocly.com/docs/cli/decorators) to transform your API descriptions.
   Decorators can modify content, add information, or restructure your APIs before bundling.
1. **Bundle generation**: Reunite runs bundle commands on all discovered APIs, creating optimized, self-contained API description files. The bundling process:
   - resolves all `$ref` references
   - applies the `output` parameter settings from your configuration
   - generates the final API descriptions used for documentation and other downstream processes

This systematic approach ensures that all your APIs are consistently processed according to your project's standards and requirements, regardless of which branch or deployment environment they're being built for.

## Resources

- **[Deployments](./deployments.md)** - Use Reunite's Deployments page to manage, monitor, and troubleshoot project deployments
- **[Use previews](./use-previews.md)** - View and share preview deployments for branches with open pull requests
- **[Redocly CLI rules documentation](https://redocly.com/docs/cli/rules)** - Configure linting rules in your redocly.yaml file to maintain API description quality and consistency
- **[Decorators configuration](https://redocly.com/docs/cli/decorators)** - Transform and enhance your API descriptions with custom decorators during the build process
- **[Bundle command reference](https://redocly.com/docs/cli/commands/bundle)** - Understand the API description bundling process for optimized deployment and distribution
- **[Redocly CLI cookbook](https://github.com/Redocly/redocly-cli-cookbook)** - Practical examples of rules, decorators, and advanced CLI configurations for your projects
