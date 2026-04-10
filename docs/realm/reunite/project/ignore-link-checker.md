# Ignore link checker

In the deployment process of every project, there is a link checker step to detect internal broken links.
By default, production deployments containing broken links are not published.
You have the option to override this default behavior by modifying the configuration file.

## Publish deployments with broken links

To publish production deployments with broken links, set the `ignoreLinkChecker` option to `true` in the `reunite` section of your `redocly.yaml` configuration file:

```yaml {% title="redocly.yaml" %}
reunite:
  ignoreLinkChecker: true
```
