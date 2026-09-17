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
description: Track an AI project generation on the project Overview page, open the published site, stop a run, and recover from a failed one.
---
# Track AI generation and review the result

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

After you click **Generate**, Reunite opens the project's **Overview** page and shows the generation progress there.
This page describes what the **Overview** page shows, how to stop a generation, and how to open the result.
It also covers how to recover when a generation fails.

## Track the progress

While generation runs, the **Overview** page shows:

- The project name, the number of completed phases, the elapsed time, and the typical duration.
  Generation usually takes 10 to 15 minutes.
  You can leave the page; generation continues in the background.
- A **Process** section with your prompt, the attached files and links, and one row for each phase.
  Expand a completed phase to see the steps the AI took and the files it wrote.
  Click a file to open it in the editor.
- An **Open Editor** button.
  Files appear in the editor's file tree as soon as they are written, so you can review them while generation continues.

{% img
  alt="Project Overview page during generation with the prompt card and the list of phases, most marked as completed and the last one running"
  src="../../images/create-project-with-ai-overview-process.png"
  withLightbox=true
/%}

Generation runs the following phases.
The **Overview** page lists them by name; the editor's **AI Generation** panel shows a status line for the running one.

{% table %}
- Phase
- Status in the AI Generation panel
- What happens
---
- Analyzing your input
- Building context from uploaded files
- Reunite reads the uploaded files and summarizes them.
  Runs only when you attached files.
---
- Reviewing source links
- Checking source links
- Reunite crawls the links you provided.
  Runs only when you added links.
---
- Preparing the API specification
- Generating API specification stub
- Reunite writes a labeled placeholder API description.
  Runs only when **OpenAPI Reference** is selected without an uploaded description.
---
- Planning site structure
- Planning the project
- Reunite plans the file structure, content, branding, and configuration.
---
- Applying branding & theme
- Designing theme and landing page
- Reunite writes the landing page (`index.page.tsx`) and the theme styles.
---
- Configuring the project
- Setting up project configuration
- Reunite writes `redocly.yaml`.
---
- Writing content pages
- Writing documentation pages
- Reunite writes the Markdown pages under `docs/`.
---
- Building navigation & search
- Building navigation structure
- Reunite writes `sidebars.yaml` and the navbar and footer configuration.
---
- Checking API quality
- Linting API specifications
- Reunite lints the API descriptions and fixes issues.
  Runs only when API descriptions exist.
---
- Verifying the build
- Verifying build and fixing errors
- Reunite builds the project and fixes build errors.
{% /table %}

The editor has an **AI Generation** panel with the same progress, the **Stop generating** button, and the recovery actions.
To open or close it, click **AI Generation** in the editor's top bar, or press `Ctrl + I` (`⌘I` on macOS).

{% img
  alt="Reunite editor during generation with generated files in the file tree and the AI Generation panel listing phase summaries and a Stop generating button"
  src="../../images/create-project-with-ai-editor-generating.png"
  withLightbox=true
/%}

An organization runs one generation at a time.
While it runs, other members see **View progress** on the **Projects** page instead of the prompt.

## Stop a generation

Click **Open Editor**, then click **Stop generating** at the bottom of the **AI Generation** panel.
Files that were already written stay in the project.
The **Overview** page then shows **Generation stopped** as the last row of the process.
Click **Continue in editor** to choose one of the [recovery actions](#recover-from-a-failed-generation).

## Open the result

When all phases finish, Reunite commits the files to the project's default branch with the message `Scaffold project with AI`.
The first production deployment starts, and the **Overview** page shows **Publishing your site** until it succeeds.
Then it switches to the regular project overview with a live preview of your site, its URL, and the latest deployment.
Click the preview or the URL to open the site.
If the deployment fails, the failed deployment appears in the **Overview** activity feed, and you can open it on the [Deployments](../deployments.md) page.

{% img
  alt="Project Overview page after generation with a Live badge, the site URL, a thumbnail of the generated landing page, and the first production deployment in the activity feed"
  src="../../images/create-project-with-ai-overview-live.png"
  withLightbox=true
/%}

If an optional phase failed, for example **Reviewing source links**, the row is marked as failed, and the project is still complete without that input.

### Generated files

A generated project contains:

{% table %}
- File or folder
- Purpose
---
- `index.page.tsx`
- The landing page, built as a [React page](../../../customization/create-react-page.md).
---
- `@theme/styles.css`
- Theme colors and fonts, extracted from your website when you provided one.
  See [Branding](../../../branding/index.md).
---
- `redocly.yaml`
- The project [configuration](../../../config/index.md), including the selected features.
---
- `sidebars.yaml`
- The [sidebar navigation](../../../navigation/sidebars.md).
---
- `docs/`
- The generated [Markdown](../../../content/markdown.md) pages.
---
- `apis/`
- Your uploaded API descriptions, or the generated placeholder description.
---
- `images/`
- Your logo, uploaded images, and brand assets extracted from your website.
---
- `HUMAN.md`
- Manual steps that need your attention, for example features removed because your plan does not include them.
  This file exists only when there is something to do.
{% /table %}

The landing page below was generated from a short description, an uploaded OpenAPI description, and a logo.

{% img
  alt="Generated landing page with the headline Craft delightful museum visits with one API, a ticket illustration, and buttons to get API keys and explore endpoints"
  src="../../images/create-project-with-ai-generated-site.png"
  withLightbox=true
/%}

### Review the project

Check the following:

1. Review the generated project name and domain, and change them on the **Settings > General** page if needed.
1. Read `HUMAN.md` if it exists, and complete the listed steps.
1. If you did not upload an API description, replace the placeholder API description and the example URLs, such as `https://api.example.com`, with your own.
1. Review the generated content for accuracy, especially details about your product that come from your description rather than from uploaded files.
1. Continue in the [editor](../use-editor.md).

From the **Overview** page you can also [add a custom domain](../custom-domain.md) and [connect your Git provider](../connect-git/connect-git-provider.md) to maintain the files in your own repository.

## Recover from a failed generation

If generation fails or you stop it, the **Overview** page shows **Project generation failed** or **Generation stopped** as the last row of the process.
Click **Continue in editor** to open the editor with the **AI Generation** panel.
The panel names the phase that failed and suggests a next step.
Files written before the failure stay in the project.

{% img
  alt="AI Generation panel with a Generation stopped card offering the actions Edit files manually, Back to prompt, and Start blank"
  src="../../images/create-project-with-ai-generation-stopped.png"
  withLightbox=true
/%}

Choose one of the actions on the card:

{% table %}
- Action
- Result
---
- Edit files manually
- Keeps the generated files.
  You continue in the editor without the AI panel.
---
- Regenerate
- Discards the partial files and runs generation again with the same prompt and resources.
  Available for failures that are usually temporary, such as a model or build error.
---
- Back to prompt
- Returns to the **Projects** page with your description, features, files, and links prefilled, so you can adjust them and generate again.
---
- Start blank
- Discards all generated files and resets the project to the blank starter template.
{% /table %}

{% admonition type="danger" name="Start blank is irreversible" %}
**Start blank** deletes every generated file in the project.
Download or copy any files you want to keep before you confirm.
{% /admonition %}

Each project allows a limited number of regenerations.
When you have used them up, or when a run stops because it reached its AI usage budget, **Regenerate** is not offered.
Use **Back to prompt** with a shorter description or fewer attachments, or continue with **Edit files manually**.

## Resources

- **[Create a project with AI](./with-ai.md)** - Describe the project, select features, and add files, a logo, and links
- **[Use the editor](../use-editor.md)** - Edit the generated files, commit changes, and open pull requests
- **[Deployments](../deployments.md)** - Track the production deployment that follows generation
