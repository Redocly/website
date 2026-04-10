# Create page in React

Markdown is the primary format for creating content in Redocly projects, but React pages offer additional flexibility.
Use React pages for dynamic content, complex layouts, or advanced interactivity.

This guide shows you how to create a React page in your Redocly project (Realm or Revel).

## Before you begin

Make sure you have the following:

- a Revel or Realm project running locally
- basic knowledge of React

## Create a new React page

Render React code as an independent page by adding the `.page.tsx` suffix on the filename.
Similar to Markdown pages, React pages use file-based routing and can be located anywhere in a project.

<details>
  <summary>See how React pages are used in a project</summary>

  It's common for projects to have both Markdown and React pages, as in the following example project structure:

  ```treeview {% title="Project with multiple page types" %}
  your-awesome-project/
  ├── @theme/
  ├── static/
  ├── guides/
  │   ├── example-guide.md
  │   └── pricing.page.tsx
  ├── about/
  │   ├── index.page.tsx
  │   └── ContactForm.tsx
  ├── index.md
  ├── redocly.yaml
  └── ...
  ```

  In this example, the `ContactForm.tsx` file defines a component imported by other pages.
  It _doesn't render as a page_ because the file doesn't have a `.page.tsx` suffix.
</details>

To create a React page, add a new file to the root of your project named `example.page.tsx`.

## Add content to React page

Add content to the new page by creating a React component.
View the page in your local preview.

The following example content is for `example.page.tsx`, which can be viewed at `<your-local-host>/example`:

```javascript {% title="example.page.tsx" %}
import React from 'react';
import styled from 'styled-components';

export default function () {
  return (
    <Wrapper>
      <h1>Example React page</h1>
      <p>Hello world!</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 40px;
`;
```

Your IDE may show a `Cannot find module...` linting error for `react` and `styled-components`. You have two options:

- Ignore them; the modules resolve when `npx @redocly/cli preview` runs.
- Remove the errors by installing a local version of your Redocly product -- `@redocly/realm` or `@redocly/revel`.

## Set front matter for a React page

Set the React page's [front matter](../config/front-matter-config.md) by exporting a `frontmatter` object.

Front matter is used to set page metadata or configure page behavior, as in the following list of examples:

- Hide [navbar](../config/navbar.md) and [footer](../config/footer.md) elements:

    ```javascript
    export const frontmatter = {
      navbar: {
        hide: true,
      },
      footer: {
        hide: true,
      }
    };
    ```

- Set [page permissions using RBAC](../access/page-permissions.md#react-pages):

    ```javascript
    export const frontmatter = {
      rbac: {
        Admin: 'admin',
        Employee: 'read',
      },
    };
    ```

- Add SEO titles and descriptions:

    ```javascript
    export const frontmatter = {
      seo: {
        title: 'Some Amazing Guide',
        description: 'Wow this guide is amazing!',
      },
    };
    ```

- [Block indexing](../config/seo.md#control-search-indexing) by search engines:

    ```javascript
    export const frontmatter = {
      seo: {
        meta: [
          {
            name: "robots",
            content: "noindex"
          }
        ]
      },
    };
    ```

## Add React page to navigation

Add the page to your site's navigation elements, such as the [sidebar](../navigation/sidebars.md), [navbar](../config/navbar.md), or [footer](../config/footer.md), using the page's relative filepath.

The following example shows a sidebar configuration that includes React pages:

```yaml {% title="sidebars.yaml" %}
- separator: Demo sidebar
- page: about/index.page.tsx
  label: About us
- group: Guides
    items:
      - page: guides/pricing.page.tsx
      - page: guides/example-guide.md
```

If needed, you can use `frontmatter` to [add the sidebar to a single page](../config/front-matter-config.md#front-matter-only-options) without listing it in the sidebars configuration file.

## Landing page examples

Redocly provides a [gallery of example landing pages](https://github.com/Redocly/landing-page-gallery) built with React.
These examples can help you get started creating your own custom React pages.

The following example pages are available in the gallery:

{% table %}

- Screenshot {% width="35%" %}
- Description

---

- {% img
    src="./images/example-saas-thumbnail.png"
    alt="Screenshot of the Example SaaS landing page."
    withLightbox=true
  /%}
- This example shows a sleek, modern landing page for a SaaS product.

  **Tools:** React, styled-components

  [View source code](https://github.com/Redocly/landing-page-gallery/blob/main/example-saas/index.page.tsx)
---

- {% img
    src="./images/training-portal-thumbnail.png"
    alt="Screenshot of the training project example landing page."
    withLightbox=true
  /%}
- This example demonstrates a landing page built for training and onboarding purposes.

  **Tools:** React, styled-components

  [View source code](https://github.com/Redocly/landing-page-gallery/blob/main/legacy-portal/training.page.tsx)

{% /table %}

## Resources

- **[React landing page gallery](https://github.com/Redocly/landing-page-gallery)** - Explore real-world examples and design patterns for creating compelling React-based documentation pages
- **[Custom page templates](./custom-page-templates.md)** - Use React pages as reusable templates for Markdown content with consistent layouts and functionality
- **[Custom styling guide](../branding/index.md)** - Customize the appearance of React pages using CSS variables, custom stylesheets, and component-specific styling
- **[Page permissions](../access/page-permissions.md)** - Implement role-based access control to restrict React page visibility based on user roles and team membership
