# Verify site ownership

Some third-party tools and services, such as Google Search Console, require you to verify ownership of your website by adding a file.
You can verify ownership of your documentation by adding a verification file to your as a [static asset](../../content/static-assets.md).

This guide shows you how to verify website ownership by adding a verification file to the `/static` folder of your project.

## Before you begin

Make sure you have the following before you begin:

- Access to a Redocly project with a public URL

## Obtain verification file

Log into the third-party tool you want to use and follow their instructions to generate a website verification file.
Sometimes the file has a unique name, such as `google3581abc.html`.

## Add verification file to static folder

After downloading the verification file from the third-party tool, place it in the `/static` folder in the root of your project.

The following example shows a project structure with a verification file:

```treeview
your-awesome-project/
├── static/
│   ├── google1234567890abcde.html
│   └── ...
├── guides/
├── redocly.yaml
└── ...
```

If needed, you can create nested folders inside `/static` folder. Some tools require the verification file to be in a specific location, such as `/.well-known`.

For example, setting up Apple Pay requires a nested folder, as in the following example:

```treeview
your-awesome-project/
├── static/
│   └──.well-known/
│      └── apple-developer-merchantid-domain-association.txt
├── guides/
├── redocly.yaml
└── ...
```

## Check verification file and merge change

After adding the verification file, commit the content to your branch, and then open the project's [preview build](../../reunite/project/use-previews.md).
With the preview build open in a browser, navigate to the verification file URL.
For example `https://your-preview-url.com/google1234567890abcde.html`.

If the check was successful, [open a pull request](../../reunite/project/pull-request/open-pull-request.md) and merge your branch into your production branch to publish your change.
Congratulations! verification file should now be accessible using your public URL. The verification examples used in the [Add verification file](#add-verification-file-to-static-folder) section would resolve to the following URLs:

- `https://docs.example.com/google1234567890abcde.html`
- `https://docs.example.com/.well-known/apple-developer-merchantid-domain-association.txt`

## Verify site ownership

Go back to the third-party tool, provide the URL to the verification file, and complete the verification process. Once website ownership is verified, most tools will provide a confirmation message and unlock the tool's features.

## Resources

- [Add a sitemap](./add-sitemap.md) to your project to improve how search engines crawl your site.
- [Set a custom domain](../custom-domain.md) to personalize your URL to reflect your brand.
- Learn more about hosting [Static assets](../../content/static-assets.md) in Redocly projects.
- Read the [Front matter reference](../../config/front-matter-config.md) to discover more ways to configure your docs using front matter.
