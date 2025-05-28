---
excludeFromSearch: true
---

# Built-in environment variables

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

The portal uses built-in environment variables during the build process.
Control behavior of the build by adjusting these variable values.

These values must be adjusted in the shell (for on-premise or local development) or Workflows (for hosted portal builds) rather than in an environment file.

|Variable name|Default|Description|
|---|---|---|
|REDOCLY\_ACTIVE\_ENV|production or development|Controls which [`.env.*` files](./environment-files.md) are loaded; for example, a value of `production` loads the `.env.production` file. Defaults to `production` in Workflows and `development` in your local development server.|
|REDOCLY\_DISABLE\_IMAGES_OPTIMIZATION|0|Disables the [Sharp-based image optimization](https://github.com/lovell/sharp)  in the portal build. Same as omitting the `--with-images-optimization` build option.|
|REDOCLY\_LICENSE\_KEY||Use the on-premise license key for local development or CI builds. Handled automatically in our Workflows environment. Same as setting the [license key in the site config](../configuration/siteconfig/license-key.md).|
|REDOCLY\_LINT\_OUTPUT_FORMAT|stylish|Changes the lint output format for APIs used in the portal. Supported values are: `stylish` (used by default) and `codeframe`. Same as the `--openapi-problems-format` build command argument.|
|REDOCLY\_OPENAPI\_IGNORE_ERRORS|0|Ignores lint problems during the build. Same as the `--ignore-openapi-errors` build command argument.|
|REDOCLY\_LINT\_REGISTRY_DEFINITIONS|0|Lint the API definitions integrated by using the Redocly API registry snapshot URL. Same as the `--lint-registry-definitions` build command argument.|
|REDOCLY\_PREFIX\_PATHS|`/`|Sets a prefix that is added to all paths in the portal. Useful for hosting the content at a different directory than the root (/) of your domain. It should start with a leading slash. Same as the `--prefix-paths` build command argument.|
|REDOCLY\_PREFIX\_ASSETS|`/`|**Experimental. Use only if you understand what you do.** Sets a prefix that is added to all static assets in the portal. Useful for hosting the assets at a separate domain. It should start with a leading slash. Same as the `--prefix-assets` build command argument.|
|REDOCLY_*|n/a|Environment variables starting with `REDOCLY_` are reserved for future or internal use.|
|REDOCLY_HIDE_PORTAL_VERSION_LOG|`""`|Hides the portal version log in browser developer tools. Set to `true` to hide the version log.|

{% admonition type="info" name="Note" %}
Additional [environment variables](on-premise.md#use-environment-variables) related to configuring identity providers are available for on-premise portals only.
{% /admonition %}

## Related links

- [Environment files](./environment-files.md)
- [Environment variables](./environment-variables.md)
- [Environment variables settings in Workflows](../settings/environment-variables.md)
