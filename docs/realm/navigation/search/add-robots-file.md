# Add robots.txt file

The `robots.txt` file is used to manage and control how search engines index your website.
Redocly supports adding a `robots.txt` to your project as a [static asset](../../content/static-assets.md).

This guide shows you how to configure search engine indexing behavior by adding a `robots.txt` file to the `/static` folder of your project.

## Before you begin

Make sure you have the following before you begin:

- Access to a Redocly project with a public URL

## Add robots.txt to static folder

Add or create a `robots.txt` file in a `/static` folder located in the root of your project.
The file **must** be in the `/static` folder to work, as in the following example project structure:

```treeview {% title="Project with robots.txt" %}
your-awesome-project/
├── static/
│   ├── robots.txt
│   └── ...
├── guides/
├── redocly.yaml
└── ...
```

If you created a new `/static/robots.txt` file, you'll need to add [rules](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt) that control search engine behavior.

<details>
  <summary>See example robots.txt rules</summary>

  The following example shows a `robot.txt` file that adds basic rules for all search engines:

  ```text {% title="Example robots.txt file" %}
  User-agent: *

  Allow: /
  Disallow: /internal-docs/

  sitemap: https://docs.example.com/sitemap.xml
  ```

  For more information about configuring `robots.txt` files, see [Robots.txt Files](https://search.gov/indexing/robotstxt.html) from Search.gov.
</details>

## Check file in preview build

Push the changes from your branch that includes the `/static/robots.txt` file.
If you haven't already, [open a new pull request](../../reunite/project/pull-request/open-pull-request.md).
From the pull request, open the [preview build](../../reunite/project/use-previews.md) of your project.

The `robots.txt` file should now be accessible at `https://your-preview-url.com/robots.txt`. Navigate to that url in the preview and verify the file renders in the browser.

## Test configuration in production

Publish to production by merging your branch into the main branch.
Open the the file hosted at your public URL, `https://your-production-url.com/robots.txt`.
Congratulations 🎉! You added a `robots.txt` file to your documentation.

Online tools can help test your hosted `robots.txt` to verify it's configuring search engine indexing behavior as expected.
Google's [Robots Testing Tool](https://www.google.com/webmasters/tools/robots-testing-tool) requires you to sign in, but other free tools, such as [Robots.txt Testing & Validator Tool from Tame the Bots](https://tamethebots.com/tools/robotstxt-checker) don't require sign in.

## Resources

- [Add a sitemap](./add-sitemap.md) to your project to improve how search engines crawl your site.
- [Block search indexing](./block-search-index.md) for specific pages or the entire documentation.
- Learn more about hosting [Static assets](../../content/static-assets.md) in Redocly projects.
- See the [seo](../../config/seo.md) configuration reference for metadata configuration options.
