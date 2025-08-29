# Reunite project interface

Use this information as a reference for the user interface (UI) of pages in Reunite's project workspace.
Learn about the various ways you can utilize the features in the interface.

## Editor

The **Editor** page is the part of Reunite's project workspace where you add, edit, and manage the content of your project.
The page has three parts:

- the file tree pane
- the editing pane
- the webview pane

### Reunite file tree pane

File tree pane

The file tree pane has three tabs:

- Files tab with Theme components pane
- Search tab
- Commit tab with History pane

### Files

{% img
  alt="Screenshot of the Files tab in Reunite editor"
  src="../images/editor-files-tab.png"
  withLightbox=true
/%}

In this tab you can:

- browse and move files and folders
- create, rename, and delete files and folders
- upload files
- create remote folders
- browse, eject, and customize theme components

### Search

{% img
  alt="Screenshot of the Search tab in Reunite editor"
  src="../images/editor-search-tab.png"
  withLightbox=true
/%}

In this tab you can:

- filter search results by folder
- find files by name
- search file content
- replace content in files

### Commit

{% img
  alt="Screenshot of the Commit tab in Reunite editor"
  src="../images/editor-commit-tab.png"
  withLightbox=true
/%}

In this tab you can:

- [commit latest changes to the current branch](./use-editor.md#commit-updates)
- [revert changes to files](./use-editor.md#revert-changes)
- [open a pull request](./pull-request/open-pull-request.md)
- [browse commit history relative to the main branch of the project](./use-editor.md#view-commit-history)

## Reunite webview pane

Reunite editor's webview pane contains two tabs.
The **Webview** live preview tab displays the changes to your project in real time.
The **Docs** tab displays Realm documentation.

If you close a tab, you can reopen it by clicking the plus icon on the right side of the tabs.

### Webview live preview tab

The **Webview** live preview tab renders the currently open Markdown or API description file as it would appear in a built project.

{% img
  alt="Screenshot of the Webview tab in Reunite editor"
  src="../images/editor-webview-tab.png"
  withLightbox=true
/%}

In this tab you can:

- [1] navigate to previously opened pages
- [2] reload webview live preview
- [3] view the slug to the file
- [4] toggle view between desktop and mobile devices
- [5] open webview live preview in a new browser window or tab
- [6] use the more options menu to:
  - fully restart the webview live preview
  - disable automatic syncing of changes to files with webview live preview
- [7] display webview build validation errors
- [8] display the number of pages in the project
- [8] view webview build logs

### Docs tab

The docs tab displays Realm documentation with full capabilities of a Redocly project.

{% img
  alt="Screenshot of the Docs tab in Reunite editor"
  src="../images/editor-docs-tab.png"
  withLightbox=true
/%}

In this tab you can:

- open the displayed page in a new window or tab
- make use of documentation pages:
  - [navigate the pages](https://redocly.com/docs/end-user/navigate-project)
  - [search the content](https://redocly.com/docs/end-user/use-search)
  - [interact with pages](https://redocly.com/docs/end-user/interact-with-pages)

## Resources
