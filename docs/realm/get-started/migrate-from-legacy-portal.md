---
markdown:
  toc:
    depth: 4
---
# Migrate from legacy portal

This guide was created for users of Redocly's developer portal product. It contains steps, information, and resources to help you migrate an existing developer portal project to use Realm.

Realm is a flexible, powerful platform for building documentation that empowers authors and delights users. Realm combines all the features of Redoc, Revel, and Reef into a single offering, from API reference documentation to custom writing elements.

## Migration overview

This section provides a high-level overview of the migration process from the legacy portal to Realm.

### Connect services to Reunite

At the start of your migration, you'll need to create a project in Reunite and connect remote services to Reunite.

1. Sign up or log in to your Reunite account.

2. (Optional) [Add an identity provider](../reunite/organization/sso/add-idp.md) and [configure SSO](../reunite/organization/sso/configure-sso.md).

3. Go to your [Reunite dashboard](https://app.cloud.redocly.com) and [create a new project](../reunite/project/manage-projects.md#create-a-project).

4. Go to **Settings** --> **Git hosting** and [connect your existing repository](../reunite/project/connect-git/connect-git-provider.md).

5. Go to **Editor** to verify that your project files are synced with Reunite.

Don't worry about errors at this stage. They'll resolve as you work through the content in this guide.

### Prepare for migration

Prepare your project for migration before making changes to content or configuration.

1. Create a new branch in your remote repository to contain migration changes; for example, your new branch name could be `portal-upgrade`.

2. On the new branch, create a `migration-test.md` file and open a pull request against your repository's `main` branch.

3. In Reunite, go to your project's **Settings** --> **Git hosting** and update the connection to use the new migration branch, `portal-upgrade`.

4. Check the Reunite Editor to verify your new file is present.

5. (Optional) Depending on your timeline, you may consider [locking your repository](https://docs.github.com/en/migrations/overview/about-locked-repositories) during migration.

Use the migration branch to preview and test your changes while working through migration.

### Execute migration

Migrate your developer portal project to Realm using the content in this guide.

1. From your migration branch (`portal-upgrade`), create a new branch to work from; for example, your new branch could be named `migrate-sidebar`.

2. Use this guide to migrate each part of your project. In this example, that's the [Update sidebar](#update-sidebar) section.

3. Run the [local Realm preview](#run-local-realm-preview) to see the changes while you work.

4. Open a pull request in your repository to merge the `migrate-sidebar` branch into `portal-upgrade`.

5. Review the code and the [branch preview build](../reunite/project/use-previews.md).

6. (Optional) Explore the other tools in Reunite, such as [visual review](../reunite/project/pull-request/review-pull-request.md#review-visual-and-code-diff).

7. Merge the pull request into the `portal-upgrade` branch to deploy it to the Reunite "production" build.

Using the migration to mimic a workflow similar to the one you'll use in production will help build familiarity with the new tools.

### Publish migrated project

Once the content is migrated and you're ready to "go live" with the new project

1. Go to your Git provider and [suspend](https://docs.github.com/en/apps/maintaining-github-apps/suspending-a-github-app-installation) the Redocly Workflows app.

2. In Reunite, go to the project's **Settings** --> **Git hosting** and update the connection to use the `main`, or production, branch of your repository.

3. Merge your migration branch, `portal-upgrade`, into your production branch, `main`.

4. Review the production deployment of the site to ensure it's ready for release.

5. In Reunite, [set a custom domain](../navigation/custom-domain.md) for your project.

6. Update your CNAME record to point to `ssl.cloud.redocly.com`.
   This change can take up to 8 hours to propagate depending on your provider.

7. (Optional) [Delete](https://docs.github.com/en/apps/maintaining-github-apps/deleting-a-github-app) or deactivate the Redocly Workflows app in your Git provider.

Congratulations! Your documentation is migrated and deployed on Redocly's latest and greatest product.

## Migration helper script

To help with the migration process, we created a [migration helper script](https://github.com/redocly-demo/migrate-portal) that can automate many of the syntax changes required during migration.
This script can save you time and reduce the likelihood of manual errors.

{% admonition type="warning" name="Work in progress" %}
  The migration script is _experimental_ and may crash or produce unexpected results.
  Please contact us or open an issue if that occurs.
{% /admonition %}

### Use migration script

1. Open your project to the migration branch (i.e. `portal-upgrade`).

2. Remove the `node_modules` folder.

3. Run the following command to install and execute the script: `npm exec github:redocly-demo/migrate-portal`.

4. Navigate the script prompts.
The script analyzes your project files and automatically make the necessary syntax changes.

5. Review the `_MIGRATION.md` file and make additional changes as needed.

6. Test your project to ensure everything works as expected.

### Limitations of script

The migration script is a useful tool, but it's important to note:

- It may not catch _all_ necessary changes, especially for highly customized projects.
- It doesn't handle MDX to Markdoc conversions or custom components.
- Manual review and testing is _still required_ after running the script.

The script is a great starting point, but it's **not a complete replacement for manual migration work**.
Always review the changes made by the script and refer to the rest of this migration guide for a more comprehensive update to your project.

## Migrate portal project

This section covers the specific steps and changes needed for your project during migration.

### Run local Realm preview

During migration, use the local development preview of Realm to experience the documentation as an end user would.
This helps build familiarity with Realm and learn about error behaviors.

Follow the steps below to configure your project to run local Realm previews:

1. Remove "developer-portal" from your npm modules: `npm uninstall --save @redocly/developer-portal`

2. Add the Realm library: `npm install --save @redocly/realm`

3. Clear your project's cache: `rm -rf node_modules && rm -rf package-lock.json && npm install`

4. In your `package.json` file, add a script that runs the Redocly CLI preview command:

    ```{% title="package.json" %}
      ...
      "scripts": {
        "start": "npx @redocly/cli preview",
      },
      ...
    ```

Now you can use the following command to run a local Realm preview: `npm run start`.
Use this preview to review the changes you make during migration.

### Migrate content

Realm contains a major change to content creation: MDX is replaced with [Markdoc](https://redocly.com/learn/markdoc).
That means authors continue writing in Markdown, but, when they need to add a custom element or component, they use Markdoc syntax _instead of MDX_.

With the exception of MDX, Realm supports the same types of content as the developer portal while adding support for new content, such as AsyncAPI, GraphQL, and React pages.

#### Update API reference

Realm includes the redesigned version of Redoc, which powers the API reference documentation. There are changes to how API descriptions are integrated and configured in your project.

##### API descriptions as remote content

In Realm, the way _externally-managed_ API descriptions are used in your project has changed.

- The `oasDefinitions` property is replaced by `apis`.
- API descriptions (or copies of them) must be **stored in the project files**.
  - Using a remote URL or snapshot URL in the configuration file is no longer supported.

During migration, set up [remote content](../reunite/project/remote-content/remote-content.md) connections for any externally-maintained API descriptions.

The following example shows the old and new syntax for using remote API descriptions:

{% tabs %}
  {% tab label="Old remote descriptions"%}

    In this example, the `siteConfig.yaml` file uses direct pointers to the remote API definitions.

    ```yaml  {% title="siteConfig.yaml" %}
    oasDefinitions:
      art-museum: https://api.redoc.ly/registry/bundle/art-museum/1.2.1/art-museum-openapi.yaml?branch=main
      flight-museum: https://example.com/flight-museum/main/flight-museum-openapi.yaml
    ```

  {% /tab %}
  {% tab label="New remote descriptions"%}
  
    In this example, both API definitions are set up as remote content sources and the `redocly.yaml` file uses relative file paths.

    - The art-museum uses [remote content from GitHub](../reunite/project/remote-content/from-github.md).
    - The flight-museum uses [remote content from a URL](../reunite/project/remote-content/url.md). 

    ```yaml  {% title="redocly.yaml" %}
    apis:
      art-museum@main:
        root: art/art-museum-openapi.yaml
      flight-museum@v1:
        root: flight/flight-museum-openapi.yaml
    ```

  {% /tab %}
{% /tabs %}

##### Centralized API reference configuration

In Realm, configuring the default API reference settings remains the same (using `openapi`), but configuring the API reference for multiple API definitions has changed.

Creating multiple per-definition configurations now happens in the `redocly.yaml` configuration file.
Using `*.page.yaml` files to manage configuration is no longer supported.

During migration, move all API definition configuration into the Redocly configuration file.

The following example shows the old and new syntax for configuring multiple API definitions:

{% tabs %}
  {% tab label="Old multi config"%}

    ```yaml  {% title="art/art-museum.page.yaml" %}
    type: reference-docs
    definitionId: art-museum
    settings:
      hideDownloadButtons: true
      codeSamples:
        skipOptionalParameters: true
        languages:
          - lang: 'curl'
            label: 'cURL'
    ```

    ```yaml  {% title="flight/flight-museum.page.yaml" %}
    type: reference-docs
    definitionId: flight-museum
    settings:
      hideDownloadButtons: false
      hideSchemaTitles: true
      codeSamples:
        skipOptionalParameters: false
        languages:
          - lang: 'JavaScript'
            label: 'JS'
    ```

  {% /tab %}
  {% tab label="New multi config"%}

    ```yaml  {% title="redocly.yaml" %}
    apis:
      art-museum@main:
        root: art/art-museum-openapi.yaml
        openapi:
          hideDownloadButtons: true
          codeSamples:
            skipOptionalParameters: true
            languages:
              - lang: 'curl'
                label: 'cURL'
      flight-museum@v1:
        root: flight/flight-museum-openapi.yaml
        openapi:
          hideDownloadButtons: false
          hideSchemaTitles: true
          codeSamples:
            skipOptionalParameters: false
            languages:
              - lang: 'JavaScript'
                label: 'JS'
    ```
  
  {% /tab %}
{% /tabs %}

When multiple APIs are configured, Realm and Reef users can also use the API catalog feature.

##### Migrate the API catalog

Realm and Reef users have access to the built-in API catalog feature, which is used to organize and display multiple API definitions, making them more discoverable for users.

- In the developer portal, the API catalog had to be _added as a custom component_ in an MDX page.
- In Realm, the classic catalog feature is already _built into the product_ and is enabled through configuration.

Use the following guide to enable the classic catalog during your migration: [configure a classic catalog in your project](../config/catalog-classic.md).

#### Update Markdown files

Markdown is fully supported in Realm.
That means Markdown files used in the developer portal will render the same elements on a page in Realm.
However, some specific features may require adjustments during migration.

##### Change admonition syntax

Realm adds Markdoc tags for [admonitions](https://redocly.com/docs/learn-markdoc/tags/admonition). The Markdown syntax for admonitions, `:::`, is no longer supported.

During migration, replace all Markdown admonitions with Markdoc tags. Use this [gist for converting admonition syntax](https://gist.github.com/adamaltman/7eb066430369135ef2b96605fd0c7d85) if you'd like to update them all at once.

The following example shows the old and new admonition syntax:

{% tabs %}
  {% tab label="Old admonition syntax" %}
    ```markdown
    :::info Optional title

    Just FYI

    :::
    ```
  {% /tab %}
  {% tab label="New admonition syntax" %}
    ```markdown {% process=false %}
    {% admonition type="info" name="Optional title" %}
      Just FYI
    {% /admonition %}
    ```
  {% /tab %}
{% /tabs %}

##### Change reusable snippets

Realm adds a Markdoc tag for [partials](https://redocly.com/docs/learn-markdoc/tags/partial), which is a big upgrade for working with [reusable content](../content/reuse-content.md).
The developer portal's approach to reusable content, which used Markdown snippets in an HTML `<embed>` tag, is no longer supported.

During migration, replace any embedded Markdown snippets with the new partials tag, as in the following example:

{% tabs %}
  {% tab label="Old reusable content" %}
    ```markdown {% process=false %}
    # Example page

    Follow the steps below before starting this tutorial:

    <embed src="/shared/tutorial/_common-setup-snippet.md" />
    ```
  {% /tab %}
  {% tab label="New reusable content" %}
    ```markdown {% process=false %}
    # Example page

    Follow the steps below before starting this tutorial:

    {% partial file="_snippets/tutorial/common-setup-snippet.md" /%}
    ```
  {% /tab %}
{% /tabs %}

##### Change code fence titles

In Realm, titles are added to code fences using Markdoc tag syntax, replacing the title syntax used in the developer portal.

During migration, update all code fences with a title to use Markdown tag syntax, as in the following example:

{% tabs %}
  {% tab label="Old fence title"%}

    ~~~markdown
    ```python example.py
    def hello_world():
      print("Hello, World!")

    hello_world()
    ```
    ~~~

  {% /tab %}
  {% tab label="New fence title"%}

    {% markdoc-example %}
      ~~~markdown {% process=false %}
      ```python {% title="example.py" %}
      def hello_world():
        print("Hello, World!")

      hello_world()
      ```
      ~~~
    {% /markdoc-example %}

  {% /tab %}
{% /tabs %}


##### Change tabbed code samples

Realm adds a Markdoc tag for [tabs](https://redocly.com/docs/learn-markdoc/tags/tabs) that supports all content types.
Tabbed code sample syntax from the developer portal needs to be updated.

During migration, update all tabbed code samples to use the `tabs` tag. If custom tab names are required, use the nested `tag` element.

The following example shows the old syntax, new syntax, and new syntax with custom labels:

{% tabs %}

  {% tab label="Old code tabs" %}

    ~~~
      ```javascript
      javascript;
      ```

      ```python
      python
      ```

      ```java title
      example text
      ```

      ```custom tab name
      example text
      ```
    ~~~
  {% /tab %}

  {% tab label="New code tabs" %}

    Note that 'custom tab name' will break because of the spaces. Use named tabs instead.

    {% markdoc-example %}

      ~~~ {% process=false %}
        {% tabs %}
          ```javascript
          javascript;
          ```

          ```python
          python
          ```

          ```java title
          example text
          ```

          ```custom tab name
          example text
          ```
        {% /tabs %}
      ~~~
    {% /markdoc-example %}
  {% /tab %}

  {% tab label="New named tabs"%}
    {% markdoc-example %}
      ~~~ {% process=false %}
        {% tabs %}
          {% tab label="javascript tab" %}
            ```javascript
            javascript;
            ```
          {% /tab %}
          {% tab label="python tab" %}
            ```python
            python
            ```
          {% /tab %}
          {% tab label="java tab" %}
            ```java title
            example text
            ```
          {% /tab %}
          {% tab label="example tab name" %}
            ```custom tab name
            example text
            ```
          {% /tab %}
        {% /tabs %}
      ~~~
    {% /markdoc-example %}
  {% /tab %}
{% /tabs %}

##### Change page-level redirects

Realm uses a different format for the redirects defined in a page's front matter.

During migration, update front matter redirects to use the new format, as in the following example:

{% tabs %}
  {% tab label="Old front matter redirect" %}
  ```markdown {% process=false %}
  ---
  redirectFrom:
    - /docs/api-reference/on-premise/license-key/
    - /another-example-page/
    - /2020/12/example-blog-post/
  ---

  # Example H1 under front matter
  ```
  {% /tab %}
  {% tab label="New front matter redirect"%}
  ```markdown {% process=false %}
  ---
  redirects:
    '/docs/api-reference/on-premise/license-key/': {}
    '/another-example-page/': {}
    '/2020/12/example-blog-post/': {}
  ---

  # Example H1 under front matter
  ```
  {% /tab %}
{% /tabs %}

#### Update MDX files

MDX files _do not render in Realm_ because support for MDX was removed in favor of [Markdoc](https://markdoc.dev/), which offers the same code-in-content capabilities of MDX, but is optimized for _authoring experience_.

During migration, you need to update your MDX files for their content to render.

For **MDX files without Markdown**, change their file extension to `.page.tsx` to [create a React page](../customization/create-react-page.md).
As long as the imports are correct, those files can serve as pages in Realm.

For **MDX files that combine Markdown and JSX**, use the following steps to update the file and make it compatible with Realm:

1. Change the filetype from `.mdx` to `.md`.

2. Remove the JSX syntax from the file. Alternatively, you can comment it out and use it to [create a tag](#create-markdoc-tags-from-jsx) later.

    ```markdown {% title="product-guide.mdx" %}
    import { ProductGallery } from './components/ProductGallery.tsx'

    # Product overview 

    Click a product from the gallery below to open a modal with more information.

    <!-- <ProductGallery /> -->
    ```

3. (Optional) Remove or comment out the import statements.

Converting the filetype to Markdown and removing the JSX will allows Realm to render the _Markdown_ content from the migrated MDX files.
However, rendering the JSX element requires additional work.

You can [use the legacy UI components](../author/how-to/use-legacy-ui-components.md) to help with migration, but we recommend replacing them.

##### Change OpenApiTryIt component

Realm contains an upgraded replacement to the "Try it console" called Replay, which allows users to send API requests from your documentation.

Realm adds a [Markdoc tag for Replay](https://redocly.com/docs/learn-markdoc/tags/replay-openapi) that can embed the Replay console in a Markdown file. The `OpenApiTryIt` component is no longer supported.

During migration, change all implementations of OpenApiTryIt to use the `replay-openapi` Markdoc tag. Use the same OpenAPI description as the source.

The following example shows the same operation and configuration implemented in the Try it (old) and Replay (new) syntax:

{% tabs %}
  {% tab label="Old Try it syntax"%}
  
    ```javascript
    <OpenApiTryIt
      definitionId="museumApi"
      operationId="listSpecialEvents"
      parameters={{
        query: {
          limit: 10
        },
        header: {
          exampleKey: "exampleValue"
        }
      }}
    />
    ```

  {% /tab %}

  {% tab label="New Replay syntax"%}
    {% markdoc-example %}
      ``` {% process=false %}
      {% replay-openapi
        descriptionFile="../../openapi/museum-api.yaml"
        operationId="listSpecialEvents"
        parameters={
          query: {
            limit: 10
          },
          header: {
            exampleKey: "exampleValue"
          }
        }
      /%}
      ```
    {% /markdoc-example %}
  {% /tab %}
{% /tabs %}

Note that the Try it component used a `definitionId` property to reference a description, but the Replay tag uses a `descriptionFile` property with a path.

##### Create Markdoc tags from JSX

<details>
  <summary>Learn how MDX and Markdoc are different</summary>

  Markdoc enforces a strict separation of code and content.
  Although MDX and Markdoc both enable authors to use custom components with Markdown, there's a fundamental difference in structure:

- With MDX, authors use JSX syntax to add custom components directly.
- With Markdoc, authors use Markdoc tags, which have a defined schema and control the rendering of the custom component.

  See [Write with Markdoc](https://redocly.com/docs/learn-markdoc/write-with-markdoc) for a deeper explanation of using Markdoc as a technical writer.
</details>

You can create Markdoc tags using the JSX from the MDX files to make them available to authors.
Authors can use those custom elements in their writing using the Markdoc tag syntax.

During migration, you can create Markdoc tags from JSX using the following steps:

1. Copy the JSX from the migrated file.

2. Add it as a custom component. For example, `@theme/markdoc/components/YourComponent.tsx`.

3. Export the component from `@theme/markdoc/components.tsx`.

4. Define the Markdoc tag schema, `@theme/markdoc/components/YourComponent-Schema.ts`.

5. Export the tag from `@theme/markdoc/schema.ts`.

Now authors can use the Markdoc tag to render the same element from the migrated JSX.

{% admonition type="info" %}
  This section explains the process for migrating custom elements.
  For more detailed guidance on creating tags, see See [Build a Markdoc tag](../customization/build-markdoc-tags.md).
{% /admonition %}

### Migrate navigation

Realm has made improvements and changes to the tools that help users navigate your website.
Use the sections below to migrate your navigation configuration and its compatible with Realm.

#### Update navbar

Settings for the [navigation bar](../config/navbar.md) have changed.

During migration, update your navbar configuration to reflect the following changes:

- The `nav` property was renamed and moved to `navbar`.
- Navbar entries must be listed in an `items` property.
- The `search` property was removed from navbar config and added as a [search option](../config/search.md).
- A new option called `linkedSidebar` can add a navbar item to the breadcrumbs of top-level sidebar entries.

The following example shows a navbar configuration updated to work with Realm:

{% tabs %}
  {% tab label="Old navbar syntax"%}
    ```yaml {% title="siteConfig.yaml" %}
    nav:
      - label: Home
        page: index.md
      - label: Link with icon
        page: example-page.md
        icon: images/page-icon.png
      - label: Redocly docs
        href: 'https://redocly.com/docs'
      - search: false
    ```
  {% /tab %}
  {% tab label="New navbar syntax"%}
    ```yaml {% title="redocly.yaml" %}
    navbar:
      items:
        - label: Home
          page: index.md
        - label: Link with icon
          page: example-page.md
          icon: images/page-icon.png
        - label: Redocly docs
          href: 'https://redocly.com/docs'
    search:
      hide: true
    ```
  {% /tab %}
{% /tabs %}

#### Update footer

Settings for the [footer](../config/footer.md) have some small but structural changes.

During migration, update your footer configuration to reflect the following changes:

- The `footer` property was moved to `footer`.
- The `columns` property was renamed to `items`.

The following example the same footer settings using the old and new syntax:

{% tabs %}
  {% tab label="Old footer syntax"%}
    ```yaml {% title="siteConfig.yaml" %}
    footer:
      copyrightText: Copyright © Example page
      columns:
        - group: Legal
          items:
            - label: Terms of Use
              href: 'https://example.com/terms'
            - label: Privacy Notice
              href: 'https://example.com/privacy'
              external: true
        - group: Support
          items:
            - label: FAQ
              page: developer-portal/faq.md
              permission: read-docs
            - label: Contact us
              page: developer-portal/contact.mdx
              external: true
    ```
  {% /tab %}
  {% tab label="New footer syntax"%}
    ```yaml {% title="redocly.yaml" %}
    footer:
      copyrightText: Copyright © Example page
      items:
        - group: Legal
          items:
            - label: Terms of Use
              href: 'https://example.com/terms'
            - label: Privacy Notice
              href: 'https://example.com/privacy'
              external: true
        - group: Support
          items:
            - label: FAQ
              page: developer-portal/faq.md
              permission: read-docs
            - label: Contact us
              page: developer-portal/contact.mdx
              external: true
    ```
  {% /tab %}
{% /tabs %}

#### Update sidebar

New settings and features were added to the [sidebar](../navigation/sidebar.md).

During migration, update your sidebar configuration to reflect the following changes:

- Links to MDX pages are no longer supported.
- The `pages` property is replaced by `items` in sidebar groups.

The following example shows the same sidebar configuration using old and new syntax:

    {% tabs %}
      {% tab label="Old sidebar syntax"%}
      ```yaml {% title="sidebars.yaml" %}
      - group: Awesome sidebar group
        icon: ./images/custom-icon.png
        pages:
          - page: index.md
            label: Home page
          - page: pricing-page.mdx
            label: Pricing page
          - href: https://redocly.com/docs/
            label: Redocly docs
      ```
      {% /tab %}
      {% tab label="New sidebar syntax"%}
      ```yaml {% title="sidebars.yaml" %}
      - group: Awesome sidebar group
        icon: ./images/custom-icon.png
        items:
          - page: index.md
            label: Home page
          - page: pricing-page.md
            label: Pricing page
          - href: https://redocly.com/docs/
            label: Redocly docs
      ```
      {% /tab %}
    {% /tabs %}

After your sidebar config works with Realm, explore the following new sidebar features:

- Build sidebars using configuration from [multiple files](../navigation/sidebar.md#add-multiple-sidebars) using fragments.
- [Add a sidebar to a single page](../navigation/sidebar.md#add-a-sidebar-to-a-single-page) to show the sidebar on a page without listing it on `sidebars.yaml`.
- Control the visibility of [sidebar entries with RBAC](../access/links-and-groups-permissions.md#in-the-sidebar).

### Migrate configuration

The configuration options have changed in Realm.
New options were added for Realm, but many of the existing options for the developer portal have moved, changed, or been deprecated.

During migration, follow the steps below to migrate your project configuration:

1. Rename the `siteConfig.yaml` file to `redocly.yaml`.
2. Update your configuration to reflect the changes in the table below.
3. Test the configuration in Realm and work through any errors.
4. After migration, explore and add [new configuration options](../config/index.md).

The following table summarizes the changes to the configuration options for the developer portal:

{% table %}

- Legacy config option
- Change in Realm

---

- `analytics`
- Moved to `analytics`.

---

- `copyCodeSnippet`
- Replaced by `codeSnippet`. New features added, see [codeSnippet](../config/code-snippet.md).

---

- `disableLastModified`
- Replaced by `markdown.lastUpdatedBlock`. New features added, see [last updated object](../config/markdown.md#last-updated-object).

---

- `editPage`
- Moved to `markdown.editPage`.

---

- `footer`
- Moved to `footer`. New syntax and features, see [footer](../config/footer.md).

---

- `logo`
- Moved to `logo`. Now supports light mode / dark mode versions.

---

- `nav`
- Replaced by `navbar`. New syntax and features, see [navbar options](../config/navbar.md) or [update navbar](#update-navbar).

---

- `oasDefinitions`
- Replaced by `apis`. Syntax changes, see [apis](https://redocly.com/docs/cli/configuration/reference/apis).

---

- `scripts`
- Must specify script tag location, `scripts.head` or `scripts.body`.

---

- `seo`
- Added support for `meta` object.

---

- `showNextButton`
- Moved to `navigation.nextButton`.

---

- `showPrevButton`
- Moved to `navigation.previousButton`.

---

- `stylesheets`
- Replaced by `links`. See [links](../config/links.md).

---

- `toc`
- Moved to `markdown.toc`.

{% /table %}

#### Example configuration

The following example shows a `siteConfig.yaml` file updated for the new product:

{% tabs %}
  {% tab label="Old project config"%}
    ```yaml {% title="siteConfig.yaml" %}
    seo:
      title: Redocly Portal Example
      siteUrl: https://portal-demo.redoc.ly
    logo:
      image: ./images/logo.png
      altText: Portal logo
    toc:
      depth: 3
    disableLastModified: true
    oasDefinitions:
      museum-api: ./docs/openapi/museum.yaml
    stylesheets:
      - 'https://fonts.googleapis.com/css?family=Roboto:300,400,600,700'
    scripts:
      - ./static/intercom.js
    nav:
      - label: Training exercises
        page: developer-portal/index.md
        external: true
      - label: External docs
        icon: ./images/redocly-icon-white.png
        href: 'https://redocly.com/docs/developer-portal/introduction/'
      - search: true
    footer:
      copyrightText: Copyright © Redocly Portal Example
      columns:
        - group: Legal
          items:
            - label: Terms of Use
              href: 'https://redocly.com/subscription-agreement/'
              external: true
            - label: Privacy Notice
              href: 'https://redocly.com/privacy-policy/'
        - group: Support
          items:
            - label: FAQ
              page: faq.md
            - label: Contact us
              page: contact.mdx
    ```
  {% /tab %}
  {% tab label="New project config"%}
    ```yaml {% title="redocly.yaml" %}
    seo:
      title: Redocly Portal Example
      siteUrl: https://portal-demo.redoc.ly
    apis:
      museum-api:
        root: ./docs/openapi/museum.yaml
    logo:
      image: ./images/logo.png
      altText: Portal logo
    markdown:
      toc:
        depth: 3
      lastUpdatedBlock:
        hide: true
    links:
      - href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,600,700'
    scripts:
      head:
        - src: './static/intercom/js'
    navbar:
      items:
        - label: Training exercises
          page: developer-portal/index.md
          external: true
        - label: External docs
          icon: ./images/redocly-icon-white.png
          href: 'https://redocly.com/docs/developer-portal/introduction/'
        - search: true
    footer:
      copyrightText: Copyright © Redocly Portal Example
      items:
        - group: Legal
          items:
            - label: Terms of Use
              href: 'https://redocly.com/subscription-agreement/'
              external: true
            - label: Privacy Notice
              href: 'https://redocly.com/privacy-policy/'
        - group: Support
          items:
            - label: FAQ
              page: faq.md
            - label: Contact us
              page: contact.mdx
    ```
  {% /tab %}
{% /tabs %}

### Migrate theme

Realm contains major improvements and changes to project customization and building themes.
The new theming tools iterate on past capabilities, providing a better developer experience with more control.

During migration, any theme customizations from your developer portal will need to be updated to work with Realm.

#### Update project styles

Realm adds support for [CSS variables](../branding/styling.md#css-variable-concepts), which are used to [customize the styles](../branding/customize-styles.md) of your project and create a theme.

During migration, follow the steps below to update your custom styling to work with Realm:

1. Create a `@theme/styles.css` file with a root selector, as in the following example:

    ```css {% title="@theme/styles.css" %}
    :root {
      /* styles go here */
    }
    ```

2. Open your `theme.ts` file.

3. Recreate each styling rule using CSS variables. See [CSS variables in Realm](../branding/styling.md#css-variables-in-realm) if you need help identifying them.

The following example shows a set of style customizations from the developer portal updated to work with Realm:

{% tabs %}
  {% tab label="Old project styling"%}
    ```javascript {% title="theme.ts" %}
    export const theme = {
      colors: {
        primary: {
          main: '#227a88',
        },
        success: {
          main: '#005e0a',
          dark: '#00f71e',
        },
        text: {
          primary: '#424242',
          secondary: '#4e566d',
        },
        navbar: {
          main: '#1A5761',
          contrastText: 'white'
        },
      },
      sidebar: {
        backgroundColor: '#fafafa',
        width: '260px',
      },
      tocPanel: {
        width: '240px',
      },
      typography: {
        fontSize: '14px',
        lineHeight: '1.5em',
        fontWeightRegular: '400',
        fontWeightBold: '600',
        fontFamily: '"Source Sans Pro", sans-serif',
        headings: {
          fontWeight: '600',
        },
        heading2: {
          fontSize: '18px',
          fontWeight: '600',
          color: '#2a2b2e',
        },
        code: {
          fontFamily: '"Source Code Pro", sans-serif',
          color: '#e53935',
          backgroundColor: '#ededf2',
        },
      },
      codeBlock: {
        backgroundColor: '#fbfbfc',
      },
    };
    ```
  {% /tab %}
  {% tab label="New project styling"%}
    ```css {% title="@theme/styles.css" %}
    :root {
      --color-primary-main: #227a88;

      --admonition-success-bg-color: #00f71e;

      --text-color-primary: #424242;
      --text-color-secondary: #4e566d;

      --navbar-bg-color: #1A5761;
      --navbar-text-color: white;

      --sidebar-bg-color: #fafafa;
      --sidebar-width: 260px;

      --toc-width: 240px;

      --font-size-base: 14px;
      --line-height-base: 1.5em;
      --font-weight-regular: 400;
      --font-weight-bold: 600;
      --font-family-base: 'Source Sans Pro', sans-serif;
      --heading-font-weight: 600;

      --h2-font-size: 18px;
      --h2-font-weight: 500;
      --h2-text-color: #2a2b2e;

      --font-family-monospaced: 'Source Code Pro', sans-serif;
      --inline-code-text-color: #e53935;
      --inline-code-bg-color: #ededf2;

      --code-block-bg-color:
    }

    :root.dark {
      --color-primary-main: #227a88;

      --admonition-success-bg-color: #005e0a;
    }
    ```
  {% /tab %}
{% /tabs %}

#### Update custom components

Realm improves upon the concept of "component overrides" from the developer portal, but there are differences in implementation.
The core idea remains the same: replace the components used to build pages with custom React components that modify their behavior or appearance.

During migration, update your custom components to reflect the following changes:

- Custom components must be defined in the `@theme/components` folder, for example `@theme/components/Navbar/Navbar`.
- Realm is a complete rebuild. The components in the core theme may have been removed or changed names.

Realm adds support for an exciting new feature that allows you to [eject a component](../customization/eject-components) used in the core theme.
That means you get a complete, working implementation of that component; ready to be customized.

## Resources

- [Create a React page](../customization/create-react-page.md) for full control over  all page elements.
- Learn more about the [navigation elements](../navigation/navigation.md) in Realm.
- Configure light and dark mode in your project using [color mode](../branding/color-mode.md).
- See which [front matter options](../config/front-matter-config.md) are available for page-level configuration.