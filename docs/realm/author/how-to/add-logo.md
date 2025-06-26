# Add logo to your project

Add a logo to your project to customize the appearance of your documentation or to align with your branding guidelines.
You can add an image from your project's assets or an URL to a remote resource.
You can also add images that change when you switch between the color modes.

## Add a single logo image

1. In `redocly.yaml` at the root of your project, add the `logo` object.
1. Inside `logo`, add an `image` option and provide a path to an image in your project, or a full URL.

    {% tabs %}

    {% tab label="Project file" %}

    ```yaml {% title="redocly.yaml" %}
    logo:
      image: ./images/logos/logo-example.svg
    ```

    {% /tab %}

    {% tab label="URL" %}

    ```yaml {% title="redocly.yaml" %}
    logo:
      image: "https://example.com/logo-example.svg"
    ```

    {% /tab %}

    {% /tabs %}

1. (Optional): Add an `altText` option and enter a description for the image.
1. (Optional): Add a `link` option and provide a full URL to the resource that opens when a user clicks the logo.
   Usually this URL is your project's home page.
1. (Optional): To add a website icon, add a `favicon` option and provide a path to an image in your project, or a full URL to an external image.

The following is an example of `logo` configuration with `image` and `favicon` from project's assets, an alternative text for the logo, and a link to the project's main page.

```yaml {% title="redocly.yaml" %}
logo:
  image: ./images/logos/my-logo.svg
  altText: My project's logo
  link: "https://my-project.com"
  favicon: ./images/logos/project-favicon.svg
```


## Add different logo images for each color mode

1. In `redocly.yaml` at the root of your project, add the `logo` object.
1. Add an `srcSet` option and provide a comma-separated list of logo file paths and corresponding color modes.
   You can use Redocly's built-in color modes: `light` and `dark`, or your [custom color modes](../../extend/how-to/add-color-mode.md).
    ```yaml {% title="redocly.yaml" %}
    logo:
      srcSet: "./images/example-logo-light.svg light, ./images/example-logo-dark.svg dark"
    ```
2. (Optional): Add an `altText` option and enter a description for the image.
3. (Optional): Add a `link` option and provide a full URL to the resource that opens when a user clicks the logo.
   Usually this URL is your project's home page.
4. (Optional): To add a website icon, add a `favicon` option and provide a path to an image in your project, or a full URL to an external image.

The following is an example of `logo` configuration with separate logo images for the light and the dark color mode, an alternative text for the logo, a link to the project's main page, and a website icon image.

```yaml {% title="redocly.yaml" %}
logo:
  srcSet: "./images/logo-light.svg light, ./images/logo-dark.svg dark"
  altText: My project's logo
  link: "https://my-project.com"
  favicon: ./images/logos/favicon.svg
```

## Resources

- Explore the configuration options for [logo](../../config/logo.md).
- Explore the configuration options for [color mode](../../config/color-mode.md)
- Add [custom color modes](../../extend/how-to/add-color-mode.md).