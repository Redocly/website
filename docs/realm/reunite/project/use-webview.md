# Use the Webview

The Webview pane in the Editor displays a preview for each branch.
Any time you make a change in the Editor, the change is reflected in the Webview.
You can disable auto-sync, view different screen sizes, reload the page or restart, navigate the pages, and close the Webview to expand the Editor.

{% img
  src="../images/webview-buttons.png"
  alt="Webview buttons"
  withLightbox=true
/%}

  {% admonition type="info" %}
    There is a difference between the **Webview** and the **[preview deployment](./use-previews.md)**.
    The Webview displays uncommitted changes while the preview deployment triggers when you make a commit to a branch with an open pull request.
  {% /admonition %}

## View different screen sizes

If you want to see how a page renders on different screen sizes, click the **Toggle device view** icon.

{% img
  src="../images/webview-mobile.png"
  alt="Toggle device view icon"
  withLightbox=true
/%}

You can select from the following preset sizes:
- Mobile (320x675)
- Tablet (1024x765)
- Desktop (1400x800)
- Desktop HD (1920x1080)

You can also enter specific length and width pixel sizes and click and drag the sides of the Webview to expand or contract the sides.

To see a full screen version in a new tab, click the **Open in a new window** icon.

{% img
  src="../images/webview-open-in-new-window.png"
  alt="Open in a new window icon"
  withLightbox=true
/%}

## More actions

Click the **More actions** icon to either do a full restart or disable auto-sync.

{% img
  src="../images/webview-more-actions.png"
  alt="More actions icon"
  withLightbox=true
/%}

### Full restart

To completely restart the server, click the **More actions** icon and select **Full Restart**.

When you update the `package.json` file in the Editor, the Webview re-installs dependencies and restarts automatically.

### Disable auto-sync

When you disable auto-sync, the Webview does not update based on the page you are on in the Editor.
To disable auto-sync, you can click the **More actions** icon and select **Disable auto-sync**.

To turn auto-sync back on, click the **More actions** icon and select **Enable auto-sync**.

## Reload

To reload the page you are on in the Editor, click the **Reload** icon.

{% img
  src="../images/webview-reload.png"
  alt="Reload icon"
  withLightbox=true
/%}

## Navigate pages

You can use the back and forward arrow icons to navigate pages in the Editor.

{% img
  src="../images/webview-back-and-forward.png"
  alt="Back and forward icons"
  withLightbox=true
/%}

The back and forward arrow icons consider page view history, which starts over when the Webview is reloaded or restarted.

## Close or open

You can close the Webview by clicking the panel toggle, which changes direction after you click it.

{% img
  src="../images/webview-panel-toggle.png"
  alt="Panel toggle icon"
  withLightbox=true
/%}

To open it, click the toggle again.

## Access build logs in the Webview tab

You can monitor and manage Webview logs using the **Logs** panel at the bottom of the screen.
Logs automatically appear when changes are made to the project or when the Webview generates new output.
The **Logs** panel automatically scrolls to show the most recent logs.
{% img
  src="../images/webview-logs-panel.png"
  alt="Logs Panel"
  withLightbox=true
/%}

In the **Logs** panel you can:

- Expand and collapse the panel
{% img
  src="../images/webview-logs-expand-panel.png"
  alt="Logs expand button"
  withLightbox=true
/%}

- **Clear logs**: remove all current logs
{% img
  src="../images/webview-logs-clear-button.png"
  alt="Logs Clear button"
  withLightbox=true
/%}

- **Copy logs**: copy all logs to clipboard
{% img
  src="../images/webview-logs-copy-button.png"
  alt="Copy logs button"
  withLightbox=true
/%}

## Resources

- **[Use the editor](./use-editor.md)** - Learn to edit content in Reunite's integrated editor with syntax highlighting and collaborative features
- **[Use previews](./use-previews.md)** - Access deployment previews to review changes before publishing to your live documentation site