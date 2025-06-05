# Use the Webview

The Webview preview pane in the Editor displays a preview for each branch.
Any time you make a change in the Editor, the change is reflected in the Webview.
You can disable auto-sync, view different screen sizes, reload the page or restart, navigate the pages, and close the Webview to expand the Editor.

![Webview buttons](./images/webview-buttons.png)

## Before you begin

Make sure you have the following before you begin:

- at least a member role in your organization in Reunite
- If you have RBAC configured, you need to log in to the interface.
  You do not need to use actual credentials.

## View different screen sizes

If you want to see how a page renders on different screen sizes, click the **Toggle device view** icon.

![Toggle device view icon](./images/webview-mobile.png)

You can select from the following preset sizes:
- Mobile (320x675)
- Tablet (1024x765)
- Desktop (1400x800)
- Desktop HD (1920x1080)

You can also enter specific length and width pixel sizes and click and drag the sides of the preview to expand or contract the sides.

To see a full screen version in a new tab, click the **Open in a new window** icon.

![Open in a new window icon](./images/webview-open-in-new-window.png)

## More actions

Click the **More actions** icon to either do a full restart or disable auto-sync.

![More actions icon](./images/webview-more-actions.png)

### Full restart

To completely restart the server, click the **More actions** icon and select **Full Restart**.

When you update the `package.json` file in the Editor, the Webview re-installs dependencies and restarts the preview automatically.

### Disable auto-sync

When you disable auto-sync, the Webview does not update based on the page you are on in the Editor.
To disable auto-sync, you can click the **More actions** icon and select **Disable auto-sync**.

To turn auto-sync back on, click the **More actions** icon and select **Enable auto-sync**.

## Reload

To reload the page you are on in the Editor, click the **Reload** icon.

![Reload icon](./images/webview-reload.png)

## Navigate pages

You can use the back and forward arrow icons to navigate pages in the Editor.

![Back and forward icons](./images/webview-back-and-forward.png)

The back and forward arrow icons consider page view history, which starts over when the Webview is reloaded or restarted.

## Close or open

You can close the Webview by clicking the panel toggle, which changes direction after you click it.

![Panel toggle icon](./images/webview-panel-toggle.png)

To open it, click the toggle again.

## Access build logs in the Webview tab

You can monitor and manage Webview logs using the **Logs** panel at the bottom of the screen.
Logs automatically appear when changes are made to the project or when the preview generates new output.
The **Logs** panel automatically scrolls to show the most recent logs.
![Logs Panel](./images/webview-logs-panel.png)

In the **Logs** panel you can:

- Expand and collapse the panel
![Logs expand button](./images/webview-logs-expand-panel.png)

- **Clear logs**: remove all current logs
![Logs Clear button](./images/webview-logs-clear-button.png)

- **Copy logs**: copy all logs to clipboard
![Copy logs button](./images/webview-logs-copy-button.png)
