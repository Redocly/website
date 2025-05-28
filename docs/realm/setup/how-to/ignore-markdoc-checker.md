# Ignore Markdoc errors

By default, production deploys containing Markdoc errors are not published.
You can override this default behavior by modifying the configuration file.

## Publish deploys with Markdoc errors

To publish production deploys with Markdoc errors, set the `ignoreMarkdocErrors` option to `true` in the `reunite` section of your `redocly.yaml` configuration file:

```yaml
reunite:
  ignoreMarkdocErrors: true
```
