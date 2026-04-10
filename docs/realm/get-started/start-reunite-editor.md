# Get started with the Reunite editor

Use the Reunite editor to create, edit, and manage content in your Redocly project directly from your browser.
This guide shows you how to create your first project, add content, customize navigation, and publish changes.

## Before you begin

Make sure you have the following:

- a [Redocly account with an organization](https://auth.cloud.redocly.com/registration)
- a project that uses the **Starter** template in your Reunite organization

  See: [Create a project](../reunite/project/manage-projects.md#create-a-project) for instructions on creating a project.

## Create a branch

<details>
  <summary>Learn more about branches</summary>

  Reunite uses Git for version control, which means changes are made on development branches and are introduced to the main branch of the project through pull requests.

  _Branches_ are copies where you can make changes to the project without affecting the production project until you are ready.
  If you want changes from a branch to be added to the production project, you merge a pull request.

</details>

{% partial file="../_partials/create-branch.md" /%}

## Add content to the landing page

By default, the landing page for each directory in your project is either an `index.md` or `index.page.tsx` file.
New projects in Reunite come with a landing page file.

Replace the content in the current landing page file.
Add your own content or use the following sample Markdown:

<details>
  <summary>Example content</summary>

{% partial file="../_partials/get-started/index-sample-content.md" /%}

</details>

The content can be a Markdown file with all the supported features of Markdoc, a React file, or an API description (such as an OpenAPI, GraphQL, or AsyncAPI description).

Learn more about [Markdown in Redocly](../content/markdown.md) for all formatting options, or see [Use the editor](../reunite/project/use-editor.md) for details about the editor toolbar and features.

Now that you have added some content to your landing page, you can preview your project.

{% admonition type="info" name="Autosave" %}
The Reunite editor automatically saves your changes as you make edits to your files.
{% /admonition %}

## Preview your changes

Reunite includes a webview pane where you can view your changes as you make them in the editor.

Preview how your changes look in a sample build before publishing to production.

### In the live webview pane

The Webview pane shows formatting updates to ensure they render correctly before you publish.

{% img
  src="./images/webview-preview.png"
  alt="Screenshot of Webview preview pane"
  withLightbox=true
/%}

Change the view to meet your needs, such as seeing how the landing page renders on mobile screens.
See [Use the Webview](../reunite/project/use-webview.md) to learn more about the options you have when using this webview pane.

### In the deployment preview

Reunite creates deployment previews for all branches that have an open pull request.
The deployment preview includes all changes you have committed to your branch.

<details>
  <summary>Learn more about pull requests</summary>

  Reunite uses _Git_ for _version control_, which means changes are made on _development branches_ and are introduced to the _main branch_ of the project through _pull requests_.

  Before you can open a pull request, you must make a commit to your development branch.
  A _commit_ is a way of storing your changes to the branch in Git.
  You can continue to make updates to your branch and make additional commits.

  After you have committed, you can [open a pull request](../reunite/project/pull-request/open-pull-request.md) with your commits.
  _Pull requests_ show the differences between your branch and the main branch.
  They run checks for broken links, create deployment preview builds, and allow team members to review changes before merging.
</details>

To see a preview build of your project:<a id="commit-steps"></a>

1. Commit your updates.
   <details>
     <summary>Steps to commit</summary>

      {% partial file="../_partials/commit.md" /%}

   </details>
2. After you commit changes to the branch, open a pull request.
   <details>
     <summary>Steps to open a pull request</summary>

      {% partial file="../_partials/create-pr.md" /%}

   </details>
3. Click the **Preview** button in the top right corner of the page.
   You might need to wait until the deployment completes before you can access the preview deployment,
   otherwise you will be redirected to the deployment details page.
   {% img
    src="./images/view-preview-branch.png"
    alt="Screenshot of preview drop-down with Preview branch selected"
    withLightbox=true
   /%}

A deployment preview of the project with your changes opens in a separate browser window.

## Add more pages

Now that you have updated the `index.md` page and seen a deployment preview, let's return to the editor to make some more changes to your project.
To return to the editor, click **Editor** in the navigation pane on the left side of the page.
If you only see icons, you may need to click the "greater than" symbol to expand the navigation pane.

Since a single Markdown page isn't very exciting, we should add a few more.
Using the following steps, create the following two new files:

- `style-guide.md`
- `about.md`

To create a new Markdown file:

1. Click the **+** icon in the top right corner of the file tree in your editor.

   {% img
    src="./images/add-new-file.png"
    alt="Screenshot of the plus icon selected and displaying the dropdown menu"
    withLightbox=true
   /%}

2. Select **New file**.
3. Enter the file name into the text field and press `return` or `enter` on your keyboard.

Add your own content to the Markdown files or use the following example content:

<details>
  <summary>Example content</summary>

  {% partial file="../_partials/get-started/style-guide-sample-content.md" /%}

  {% partial file="../_partials/get-started/about-sample-content.md" /%}

</details>


{% admonition type="success" name="Tip" %}
You can turn on word wrap in the editor by selecting the **More actions** menu in the top right corner of the editing pane and selecting **Word wrap**.
{% img
  src="./images/word-wrap.png"
  alt="Screenshot showing word wrap option in the editor in Reunite"
  withLightbox=true
/%}
{% /admonition %}

## Customize the sidebar navigation

When you add more files to your project, a link to those files is automatically added to the generated sidebar navigation menu.
This generated sidebar is based on the file structure of your project and requires an `index.md` file at the root of your project, in other words, not in a folder.

{% admonition type="info" name="Where is the sidebar?" %}
The sidebar navigation menu usually displays on the left side of the page in the Webview; however, when the Webview pane is a small width, it is hidden under a slide drawer menu icon that displays in the top right of the Webview pane.

{% img
  src="./images/slide-drawer-icon.png"
  alt="Screenshot that shows the slide drawer icon in the top right corner of the Webview panel"
  withLightbox=true
/%}
{% /admonition %}

To customize the sidebar navigation for your project, you need to add and configure a new file named `sidebars.yaml` to the root of your project.

### Add a `sidebars.yaml` file

The `sidebars.yaml` file gives you control over the sidebar navigation menu.
You add it as you would any new file.
It must be named `sidebars.yaml`.

To add a `sidebars.yaml` file to your project:

1. Click the **+** icon in the top right corner of the file tree in your editor.\
   {% img
    src="./images/add-new-file.png"
    alt="Screenshot of the plus icon selected and displaying the dropdown menu"
    withLightbox=true
   /%}
2. Select **New file**.
3. Enter the `sidebars.yaml` as the file name into the text field and press `return` or `enter` on your keyboard.

Now that you have added a `sidebars.yaml` file to your project, you can configure it.

### Configure the `sidebars.yaml` file

After you have added a `sidebars.yaml` file to your project, you need to add to it the pages and links you want included in your sidebar navigation using YAML syntax.

Add the following sample configuration to your `sidebars.yaml` file:

```yaml {% title="sidebars.yaml" %}
- page: index.md
  label: Home
- page: style-guide.md
- page: about.md
- group: Museum API
  items:
    - page: ./openapi.yaml
```

The sample configuration adds the index page, with the link text "Home", your new Markdown pages, using the first heading as the link text, and the Museum API reference documentation, generated from the OpenAPI file.

{% admonition type="info" %}

After adding a `sidebars.yaml` file to a project, any pages you want listed in your sidebar navigation, must be included in the `sidebars.yaml` file.

{% /admonition %}

Now that you have more pages and a sidebar to customize the navigation for those pages, let's update the look and feel of your project to better reflect your brand.

## Add a logo

One way to customize your project to better reflect your brand is by updating the logo.
To update the logo, you need to add a logo image file to your project, and add a `logo` configuration to the `redocly.yaml` file.

### Add an image file

Images should be stored in `images` folders close to the content where they are referenced.
Use multiple `images` folders throughout your project.
For this task, we need an `images` folder at the root of the project.

For the following steps, you can use your own image or download the following sample logo image:

<details>
<summary>Download a sample logo image</summary>

  To use the Redocly logo:

    1. Right-click on the image.
    2. Select **Save Image As...**.
    3. Enter `logo.png` as the name for the image.
    4. Select where you want to save the image.
    5. Click **Save**.

  {% img
    src="./images/logo.png"
    alt="Redocly logo"
    withLightbox=true
  /%}
</details>

To add an image file to your project, drag the logo image file from where it is located on your computer and drop it into your `index.md` file.
Afterward, a correctly formatted image Markdown tag is added to your `index.md` file.
Also, the image is automatically saved to an automatically generated `images` folder at the root of your project.

### Add a `logo` configuration

Now that you have your logo added to the `images` folder in your project, you can configure the `logo` option in the `redocly.yaml` configuration file.

To add a `logo` configuration:

1. Select the `redocly.yaml` configuration file in the file tree.
2. Copy and paste the following configuration into the file using the editor:
   ```yaml {% title="redocly.yaml" %}
   logo:
     image: ./images/logo.png
     link: /
   ```

   {% admonition type="info" %}
    If you used a different image or updated the logo name - update the file path in the configuration to reflect your changes.
   {% /admonition %}
The logo updates immediately in the webview pane.
If you don't see your changes, try refreshing the webview pane by clicking the [Reload](../reunite/project/use-webview.md#reload) button.
You can also commit your update to view it [in the preview build](#in-the-deployment-preview).

## Update styles

Customize your project's appearance using [CSS variables](../branding/customize-styles.md).
Create a `@theme/styles.css` file to override the default styling.

### Create a `@theme` folder

1. Click the **+** icon in the top right corner of the file tree.

   {% img
    src="./images/add-new-folder.png"
    alt="Screenshot of the plus icon selected and displaying the dropdown menu"
    withLightbox=true
   /%}
2. Select **New folder**.
3. Enter `@theme` and press `return`.

### Create a `styles.css` file

1. Right-click on the `@theme` folder.
2. Select **New file**.
3. Enter `styles.css`.

### Add CSS variables

Add the following to your `styles.css` file to change the heading color:

```css {% title="@theme/styles.css" %}
:root {
   --heading-text-color: red;
}
```

Use hexadecimal codes, rgba values, or HTML color names.
The editor includes a color picker when you hover over color values.

{% img
  src="./images/color-picker.png"
  alt="Screenshot of the color picker tool in the Reunite editor"
  withLightbox=true
/%}

The headings' color updates immediately in the live webview pane.
If you don't see your changes, try restarting Webview by clicking the [Reload](../reunite/project/use-webview.md#reload) button.
You can also commit your update to view it [in the preview build](#in-the-deployment-preview).

## Resources

- **[Sidebars configuration](../navigation/sidebars.md)** - Configure `sidebars.yaml` with nested items and groups for custom navigation structure
- **[CSS variables dictionary](../branding/css-variables/index.md)** - Complete reference for customizing colors, fonts, spacing, and visual styling
- **[Configure Redocly](../config/index.md)** - All configuration options available in the `redocly.yaml` file for project customization
- **[User profile menu](../reunite/user-profile-menu.md)** - Manage notification settings, Git provider connections, and Reunite appearance preferences
- **[Markdown overview for technical writers](https://redocly.com/learn/markdoc)** - Learn Markdoc syntax for adding interactive elements to your documentation
