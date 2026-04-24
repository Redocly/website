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
---
# Reunite project interface

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Reference the user interface (UI) of pages in Reunite's project workspace.
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
- (4) view the latest product announcements
- (5) [access the user profile menu](../user-profile-menu.md)

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
The page has two main areas:

- the file tree pane
- the editor pane, which contains both file tabs and utility tabs (Webview, Documentation)

To best suit your experience, you can resize the file tree pane, collapse it, and reorganize the editor pane by [splitting and rearranging tabs](#manage-editor-tabs).

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

## Editor pane

The editor contains the tabs that display the content you are working with.
Every open file opens as a tab, and utility views such as the Webview live preview or Redocly documentation open as tabs in the same pane.
You can rearrange, split, and close any of these tabs to build the layout that best fits your workflow.

### File tabs

File tabs display the content of files from your project.
When you single-click a file in the file tree, the file opens in a preview tab with its name shown in italics.
If you single-click another file, the new file replaces the preview tab.
To keep a file open, double-click its tab or start editing the file.
This converts the preview tab into a regular tab.

### Utility tabs

You can open two utility tabs in the editor dock:

- **Webview** - displays a live preview of the opened Markdown or API description file.
  See [Use the Webview](./use-webview.md) for details.
- **Documentation** - displays Realm documentation with full capabilities of a Redocly project.

To open a utility tab, either:

- Click the **More actions** icon on the right side of the tabs header and select **Open Webview** or **Open Documentation**.
- Use the keyboard shortcut for the tab you want.
  See the [keyboard shortcuts reference](./keyboard-shortcuts.md) for the full list.
- When a tab group is empty, click one of the **Dev tools** shortcuts shown in the empty pane.

If a utility tab is already open, triggering the open action activates the existing tab instead of creating a duplicate.

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
- (7) [display webview build validation errors](./use-webview.md#view-errors)
- (8) [display the number of pages in the project](./use-webview.md#view-project-page-count)
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

### Manage editor tabs

Right-click any tab to open the tab context menu and choose one of the following actions:

- **Close** - close the tab.
- **Close others** - close every other tab in the same group.
- **Close to the right** - close the tabs to the right of the current tab in the same group.
- **Close unchanged** - close every file tab in the group that has no uncommitted changes.
- **Close all** - close every tab in the group.
- **Copy path** - copy the file path of the tab to the clipboard (available for file tabs only).
- **Split right**, **Split left**, **Split up**, **Split down** - move the tab into a new group positioned relative to the current group.

You can also drag a tab by its header and drop it on the edges or center of another group to move it, or onto the middle to create a new group.

The **More actions** icon on the right side of each tabs header provides group-level shortcuts to:

- Close all or close unchanged tabs in that group.
- Set default 2-pane editor layout.
- Open the Webview or Documentation utility tab.
- Toggle word wrap for the active editor tab (when a text file is active).

## Resources

- **[Reunite](../reunite.md)** - Learn about Reunite's features
- **[Reunite user profile menu](../user-profile-menu.md)** - Step-by-step instructions setting up notifications, color mode, and a Git provider account
- **[Use the Webview](./use-webview.md)** - View live previews of your content changes while editing for immediate visual feedback
- **[Use the editor](./use-editor.md)** - Learn to edit content in Reunite's integrated editor with syntax highlighting and collaborative features
