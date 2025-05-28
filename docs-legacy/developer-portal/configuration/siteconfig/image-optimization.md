---
excludeFromSearch: true
---

# `disableImagesOptimization`

## Usage

When set to `true`, this option disables the [Sharp-based image optimization](https://github.com/lovell/sharp) during the portal build.

Add it to the top level of the `siteConfig.yaml` file.

By default, this option is set to `false` and image optimization is applied during the portal build.

In portal development mode, image optimization is disabled by default. To enable it in your local development server, you must:

- either add the `--with-images-optimization` flag to the `start` command in `package.json`,

- or run the server with `yarn start --with-images-optimization`.


## Examples

```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
disableImagesOptimization: true
```
