---
products:
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Test API functions

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% admonition type="warning" name="Early access" %}
This is an experimental, early-access capability.
It may not be available for your organization yet, and its behavior may change before general availability.
{% /admonition %}

You can use Replay in Reunite to send requests to your API functions while you work in the editor.
This helps you verify routing, request data, and responses without leaving your project workspace.

## Open Replay

The **Replay** tab opens in the [editor pane](./project-ui.md#editor-dock) alongside your file tabs.
If the tab is already open, click it to select it.
If it is closed, open it in any of the following ways:

- Click the **More actions** icon on the right side of the tabs header and select **Open Replay**.
- Use the keyboard shortcut:
  - macOS: <kbd>`⌃ Ctrl`</kbd> + <kbd>`⌥ Opt`</kbd> + <kbd>`Y`</kbd>
  - Windows: <kbd>`Ctrl`</kbd> + <kbd>`Alt`</kbd> + <kbd>`Y`</kbd>
- When a tab group is empty, click the **Replay** shortcut shown under **Dev tools**.

## Test an API function

To test an API function in Reunite:

1. Open an API function file in the editor.
1. Open the **Replay** tab.
1. Confirm that Replay loaded the request that matches the file you opened.
1. Add any path, query, header, or body values you want to test.
1. Send the request and review the response.

If the active file is not an API function, Replay prompts you to open one first.

{% admonition type="info" %}
Replay automatically opens the request that matches the API function file you selected in the editor.
{% /admonition %}

## Before you test

If you do not have an API function yet, see [Create API functions](../../customization/api-functions/create-api-functions.md).

If Replay does not open the request you expect, check that your file is set up as an API function and follows your project routing rules.

To learn more about file naming, routing rules, custom API function folders, and request handling, see the [API functions reference](../../customization/api-functions/api-functions-reference.md).

## View logs while testing

Replay includes a **Logs** panel at the bottom of the tab.
Use it to review output generated while testing your API functions.

In the **Logs** panel you can:

- expand or collapse the panel
- clear the current logs
- copy the current logs

If your API function writes to `console`, the **Logs** pane helps you inspect that output while you test requests.
To learn more about debugging API functions, see [API functions reference](../../customization/api-functions/api-functions-reference.md#debug-code-with-console).

## Resources

- **[API functions](../../customization/api-functions/index.md)** - Learn when to use API functions in your project
- **[API functions reference](../../customization/api-functions/api-functions-reference.md)** - Review routing rules, context helpers, authorization, and limitations
- **[Create API functions](../../customization/api-functions/create-api-functions.md)** - Follow a step-by-step tutorial for building API functions
- **[Environment variables](./env-variables.md)** - Store secrets and other configuration values used by your API functions
- **[Use the editor](./use-editor.md)** - Work with files, branches, and commits in Reunite
- **[Keyboard shortcuts](./keyboard-shortcuts.md)** - Navigate the editor faster with built-in shortcuts
