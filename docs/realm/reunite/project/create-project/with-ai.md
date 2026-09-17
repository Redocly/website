---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Describe the documentation you need and let Reunite generate a configured project with content, navigation, and theme.
---
# Create a project with AI

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

To scaffold a project with AI, you describe the documentation you want and select the features it needs.
You can add the material you already have, such as an OpenAPI description, existing docs, a logo, or links.
Reunite generates a complete project: a landing page, theme, `redocly.yaml` configuration, documentation pages, and navigation.
The finished project is committed and deployed like any other project.

Use this flow when you start a new project and want a working, branded starting point instead of a template.
To pick a template or connect an existing repository instead, see [Create a project](./index.md).

## Before you begin

Make sure you have:

- a [role](../../../access/roles.md) in your organization that allows creating projects
- a free project slot in your plan
- (Optional) an OpenAPI description, existing documentation files, a logo, and links to your website or current docs

The more real material you provide, the closer the result is to your product.
Generations are limited for each organization, so prepare your inputs before you start; see [Limits](#limits).
To try generation without your own API, use the sample [`openapi.yaml`](https://raw.githubusercontent.com/Redocly/museum-openapi-example/main/openapi.yaml) from the [Museum API example repository](https://github.com/Redocly/museum-openapi-example).
Without an API description, the generated API content uses clearly labeled placeholders.

## Describe the project

1. In Reunite, open your organization's **Projects** page from the left navigation.
   The page greets you and asks what you want to create.
   When the organization already has projects, the prompt is collapsed.
   Click **Describe a new project to create...** to expand it.

   {% img
     alt="Projects page with the greeting, a collapsed prompt box that reads Describe a new project to create, a disabled Generate button, and three example prompt buttons"
     src="../../images/create-project-with-ai-prompt.png"
     withLightbox=true
   /%}

1. Describe the documentation you need, in up to 2,000 characters.
   To start from a ready-made prompt, click one of the examples under **Try an example prompt**, then edit it.
   Click the shuffle icon to see other examples.

   {% img
     alt="Prompt box with a description of a museum API portal typed in and a suggested OpenAPI Reference feature tag below it"
     src="../../images/create-project-with-ai-description.png"
     withLightbox=true
   /%}

### Write a description that generates a better project

The description is the main input for planning the project.
Include:

- **The product and its readers**: the product name, one sentence on what it does, and the audience, for example "developers integrating our payments API".
- **The pages you expect**: for example "a getting-started guide, how-to guides for common use cases, code examples, and an FAQ".
  Plain prose is enough; page structure and tone are read as directives.
- **A link to your website or current docs**: Reunite crawls the links you provide for copy and images.
  When a link is introduced as your website, Reunite also extracts the logo, favicon, colors, and fonts for the theme.
  Reunite never guesses a domain from a product name, so add the URL explicitly.
- **The tone**: for example "friendly and community-driven" or "concise and formal".

A description that covers these points looks like this:

```text
Create public developer documentation for the Museum API.
Include a getting-started guide, how-to guides for buying tickets and browsing special events,
and code examples for every endpoint.
Write in a friendly, welcoming tone for developers who build visitor apps.
```

You do not need to mention features such as access control or localization in the description.
Select them in the feature picker instead.
If your description explicitly asks for documentation in more than one language, localization is added automatically.

Generation cannot deliver everything you might ask for:

- **Follow-up prompts**: a generated project cannot be refined with further instructions.
  Edit the files in the editor, or use **Back to prompt** to adjust the description and generate again.
- **Settings that need your organization's data**, such as SSO providers, team mappings, or real credentials.
  Access control uses only the built-in `anonymous` and `authenticated` teams; rules for named teams need an identity provider that you configure afterwards.
- **Advanced customizations**, such as versioned content, custom navbar structures, or ejected theme components.
  Requests for them are reported as skipped, and you can set them up manually afterwards.
- **Features outside your plan**: they are removed from the configuration and listed in `HUMAN.md`.

## Select features

As you type, Reunite suggests features that match your description.
Suggested features are marked with a ✦ icon.
Hover over a feature to see why it was suggested.

- To add a feature, click **Add features** and select it.
- To remove a feature, click its **X** icon.
  A suggestion you remove is not suggested again for the same description.

{% img
  alt="Add features dropdown listing OpenAPI Reference with a check mark, Access Control, AI Assistant, Announcement Banner, and Localization"
  src="../../images/create-project-with-ai-add-features.png"
  withLightbox=true
/%}

{% table %}
- Feature
- What Reunite generates
---
- OpenAPI Reference
- An interactive API reference from your OpenAPI description, configured in the [`apis`](../../../config/apis.md) section of `redocly.yaml`.
  Uploading an OpenAPI file selects this feature automatically.
  If you select it without uploading a description, Reunite generates a placeholder API description that is labeled as AI-generated.
---
- AI Assistant
- The [AI assistant](../../../config/ai-assistant.md) chat widget that answers questions from your project content.
---
- Access Control
- [Role-based access control](../../../config/access/rbac.md) that requires login for the whole site or for specific paths, using the built-in `anonymous` and `authenticated` teams.
  Rules for named teams need an [identity provider](../../../access/index.md), which you configure after generation.
---
- Localization
- Multilingual content support configured with the [`l10n`](../../../config/l10n.md) option, with a translated copy of the content.
---
- Announcement Banner
- A dismissible [banner](../../../config/banner.md) for notices and important updates.
{% /table %}

Features that your plan does not include are marked with an **Upgrade** tag.
Remove them or upgrade your plan before you generate the project.

## Add files, a logo, and links

Click **Add resources** to attach the material Reunite should use.

{% img
  alt="Add resources dropdown with Upload a file and Upload a logo under Add attachments, and Add link under Add starting point"
  src="../../images/create-project-with-ai-add-resources.png"
  withLightbox=true
/%}

- **Upload a file**: OpenAPI descriptions, Markdown files, PDF or DOCX documents, images, and other files.
  An uploaded OpenAPI description is treated as the single source of truth: generated pages cover only the operations it contains, and no endpoints are invented.
  Reunite lints and fixes the description, then references it from `redocly.yaml`.
  Other documents provide context for the content.
  Reunite places images that look like a logo, a hero image, or a diagram in the project and uses them on the pages.
- **Upload a logo**: the logo is saved as `images/logo.<extension>` and set as the site logo in `redocly.yaml`.
- **Add link**: Reunite crawls each link for copy, images, and configuration snippets.
  If a link cannot be fetched, the generation progress reports it, and the content is not used.
  Upload the file directly for a more reliable result.

{% table %}
- Resource
- Limits
---
- Files
- Up to 10 files, 5 MB each.
  Supported types: JSON, YAML, Markdown, plain text, PDF, DOCX, CSV, XML, HTML, CSS, ZIP, and images (PNG, JPEG, WebP, SVG).
---
- Logo
- One PNG, JPEG, WebP, or SVG file, up to 5 MB.
---
- Links
- Up to 10 links.
{% /table %}

If an upload fails, retry it or remove the file.
You cannot generate the project while an upload is failed or still in progress.

A completed form shows the description, the selected features, and the attached resources above the **Generate** button.

{% img
  alt="Create project form with a description of a museum API portal, the OpenAPI Reference and AI Assistant feature tags, one attached file and one logo, and the Generate button"
  src="../../images/create-project-with-ai-form.png"
  withLightbox=true
/%}

## Generate the project

Click **Generate**.

Reunite creates the project and opens its **Overview** page, where the progress, the result, and the first deployment appear.
The project name and domain are generated from your description, and you can change both later on the **Settings > General** page.
Generation usually takes 10 to 15 minutes and continues in the background if you leave the page.

Your prompt and the attached resources stay visible at the top of the progress, so you can check what Reunite is working from.

{% img
  alt="Your prompt card shown during generation with the attached OpenAPI file and logo as chips above the description text"
  src="../../images/create-project-with-ai-prompt-card.png"
  withLightbox=true
/%}

See [Track AI generation and review the result](./track-ai-generation.md) for the phases, the first deployment, stopping a generation, and recovering when one fails.

## Limits

AI project creation has limits in addition to the project limit of your plan:

- One generation runs at a time for each organization.
- Each organization can run a limited number of generations.
- Each project allows a limited number of regenerations after a failure.
- Each generation has a time and AI usage budget.
  A run that exceeds it stops, and the generation progress explains what to trim.

When AI creation is not available, the **Projects** page explains why and offers **Create without AI**, which opens the standard **Create project** modal.
You can also click **start with a blank project** under the prompt at any time.

Reunite runs generation in an isolated environment where the AI can read and write only the project files.
Your description, files, and links are used only to generate the project.
Prompts pass through a redaction step that removes credential-like strings before they reach the model provider, and Redocly does not train models on your data.
For details, see the [AI governance and security FAQ](../../../faq/ai-governance.md).

## Resources

- **[Track AI generation and review the result](./track-ai-generation.md)** - Follow the phases on the Overview page, open the site, stop a run, or recover from a failure
- **[Create a project](./index.md)** - Start a project from a template or an existing repository instead
- **[Manage projects](../manage-projects.md)** - Switch between projects, use the project workspace pages, and manage project settings
- **[AI governance and security FAQ](../../../faq/ai-governance.md)** - How Redocly AI features use your data and which controls protect them
