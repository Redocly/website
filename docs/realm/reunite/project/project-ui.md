# Reunite project interface

Use this document as a reference for the user interface (UI) of pages in Reunite's project workspace.
Learn about the various ways you can utilize the interface controls.

## General interface

{% img
  alt="Screenshot of a project workspace page in Reunite"
  src="../images/reunite-project-workspace.png"
  withLightbox=true
/%}

All project workspace pages have:
- (1) navigation pane
- (2) top bar

### Reunite navigation pane

{% img
  alt="Screenshot of the navigation pane in Reunite"
  src="../images/reunite-navigation-pane.png"
  withLightbox=true
/%}

Use the navigation pane to:
- (1) access the [organizations and projects menu](#organization-and-projects-menu)
- (2) collapse the navigation pane
- (3) switch between [Reunite workspace pages](../reunite.md)
- (4) [access the user profile menu](../user-profile-menu.md)

#### Organization and projects menu

{% img
  alt="Screenshot of Reunite's organization and projects menu"
  src="../images/reunite-organization-projects-menu.png"
  withLightbox=true
/%}reunite=-

Use the organization and projects menu to:

- (1) create a new organization
- (2) switch between organizations
- (3) return to the organization's **Overview** page
- (4) switch between projects
- (5) [create a new project](./manage-projects.md#create-a-project)

## Editor

The **Editor** page is the part of Reunite's project workspace where you add, edit, and manage the content of your project.
The page has three parts:

- the file tree pane
- the editing pane
- the webview pane

To best suit your experience, you can adjust the size of the panes or collapse the file tree or the webview pane.

### File tree pane

The file tree pane has three tabs:

- files tab with **Theme components** pane
- search tab
- commit tab with **History** pane

#### Files tab

The files tab displays the file tree of your project, including remote files.
Use this tab to add, modify, or delete files, as well as eject your project's theme components.

{% img
  alt="Screenshot of the Files tab in Reunite editor"
  src="../images/editor-files-tab.png"
  withLightbox=true
/%}

In this tab you can:

- (1) add new content:
  - [add new files and folders](./use-editor.md#add-files)
  - [add folders from a remote source](./remote-content/index.md)
- (2) manage files and folders
- (3) browse, [eject, and customize theme components](../../customization/eject-components/eject-components-in-reunite.md)

#### Search tab

Use the search tab to [lookup text or files in your project](./use-editor.md#search-in-files).

{% img
  alt="Screenshot of the Search tab in Reunite editor"
  src="../images/editor-search-tab.png"
  withLightbox=true
/%}

In this tab you can:

- (1) expand or collapse the **Replace with** field
- (2) search file content
- (3) find files by name
- (4) filter search results by folder
- (5) toggle case matching
- (6) toggle whole word search
- (7) toggle regex search
- (8) replace all results

#### Commit tab

The commit tab lists all changes to files since the last commit.
Use this tab to commit changes, open pull requests, revert uncommitted changes to files, and view the commit history.

{% img
  alt="Screenshot of the Commit tab in Reunite editor"
  src="../images/editor-commit-tab.png"
  withLightbox=true
/%}

In this tab you can:

- (1) [commit latest changes to the current branch](./use-editor.md#commit-updates)
- (2) [create a pull request](./pull-request/open-pull-request.md)
- (3) [revert changes to selected files](./use-editor.md#revert-changes)
- (4) [view commit history relative to the main branch of the project](./use-editor.md#view-commit-history)

## Webview pane

Reunite editor's webview pane contains two tabs.
The **Webview** live preview tab displays the changes to your project in real time.
The **Docs** tab displays Realm documentation.

If you close a tab, you can reopen it by clicking the plus icon on the right side of the tabs.

### Webview live preview tab

The **Webview** live preview tab renders the currently open Markdown or API description file as it would appear in a published project.

{% img
  alt="Screenshot of the Webview tab in Reunite editor"
  src="../images/editor-webview-tab.png"
  withLightbox=true
/%}

- (1) [navigate to previously opened pages](./use-webview.md#navigate-pages)
- (2) [reload webview](./use-webview.md#reload)
- (3) view the slug to the file displayed in the webview
- (4) [switch the view between screen sizes](./use-webview.md#view-different-screen-sizes)
- (5) [open webview in a new browser window or tab](./use-webview.md#view-different-screen-sizes)
- (6) use the **More actions** menu to:
  - [fully restart webview](./use-webview.md#full-restart)
  - [disable automatic syncing of changes to files with webview live preview](./use-webview.md#disable-auto-sync)
- (7) display webview build validation errors
- (8) display the number of pages in the project
- (9) [view webview build logs](./use-webview.md#access-build-logs-in-the-webview-tab)

### Docs tab

The docs tab displays Realm documentation with full capabilities of a Redocly project.

{% img
  alt="Screenshot of the Docs tab in Reunite editor"
  src="../images/editor-docs-tab.png"
  withLightbox=true
/%}

In this tab you can:

- (1) [search the content](https://redocly.com/docs/end-user/use-search)
- (2) [navigate the pages](https://redocly.com/docs/end-user/navigate-project)
- (3) [change the color mode](https://redocly.com/docs/end-user/adjust-project#change-the-color-mode)
- (4) open the displayed page in a new window or tab
- (5) [interact with pages](https://redocly.com/docs/end-user/interact-with-pages)

## Resources

- **[Reunite](../reunite.md)** - Learn about Reunite's features
- **[Reunite user profile menu](../user-profile-menu.md)** - Step-by-step instructions setting up notifications, color mode, and a Git provider account
- **[Use the Webview](./use-webview.md)** - View live previews of your content changes while editing for immediate visual feedback
- **[Use the editor](./use-editor.md)** - Learn to edit content in Reunite's integrated editor with syntax highlighting and collaborative features
