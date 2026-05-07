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
# Ignore link checker

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

In the deployment process of every project, there is a link checker step to detect internal broken links.
By default, production deployments containing broken links are not published.
You have the option to override this default behavior by modifying the configuration file.

## Publish deployments with broken links

To publish production deployments with broken links, set the `ignoreLinkChecker` option to `true` in the `reunite` section of your `redocly.yaml` configuration file:

```yaml {% title="redocly.yaml" %}
reunite:
  ignoreLinkChecker: true
```

## Resources

- **[Reunite configuration reference](../../config/reunite.md)** - Configure deployment options to publish builds even when they contain broken links or validation issues
- **[Deployments](./deployments.md)** - Use Reunite's Deployments page to manage, monitor, and troubleshoot project deployments
- **[Lint](./lint.md)** - Understand the Lint deployment step, what the scorecard displays, how to access reports, and the scorecard's role in API quality management
