# Enable source maps

Enable source maps to improve the in-browser debugging experience for your Redocly project, especially for custom React pages and Markdoc tags.

This guide shows you how to enable source maps in your Redocly project.

## Understand source maps

[Source maps](https://web.dev/articles/source-maps) are debugging tools that create a bridge between source code and the processed code that runs in production, which is often minified or bundled.
This allows you to inspect and debug the _original_ source code using browser developer tools, even when working with transformed files.

In Redocly projects, source maps are particularly useful when developing custom React pages, Markdoc tags, or Markdoc functions.
They allow you to see the exact location and context of issues in your original code instead of the compiled output.

### Consider tradeoffs

By default, **source maps are disabled in Redocly projects for performance reasons**.
Generating and loading source maps can increase build times and impact runtime performance.
You should only use source maps during development or while debugging.

Consider the following tradeoffs when deciding whether to use source maps:

- **Project complexity** - In projects with extensive Markdoc usage or complex custom components, the debugging benefits are often worth the performance cost.

- **Build and load times** - Be mindful that enabling source maps may increase your project's build time and initial load time, especially for larger projects.

- **Production vs development** - Source maps are most useful during development and debugging, but should be disabled in production to optimize performance.

## Enable source maps in your project

To enable source maps in your Redocly project:

1. Create a `.env.development` file in the root of your project.

1. Set `ENABLE_SOURCE_MAPS=true`, as in the following example:

    ```bash {% title=".env.development" %}
    ENABLE_SOURCE_MAPS=true
    ```

Naming the file `.env.development` eliminates the risk of enabling source maps in production.

## Verify source maps are working

After enabling source maps, it's a good idea to check and make sure they're working correctly.

To verify that source maps are working:

1. Start your Redocly project and open the **Preview URL** in a browser.

1. Open the browser's developer tools (press F12 or right-click and select **Inspect**).

1. Click the **Sources** tab in the developer tools.

1. Open the section named after your preview URL (default is `127.0.0.1:4000`). This is where your source files should appear.

1. Open the `index.page.tsx` file and set a breakpoint by clicking the line with `return <Home />`.

1. Reload the page to trigger the breakpoint.

1. If the debugger stops at the breakpoint and shows the source code, then _source maps are working correctly_ 🎉.

## Use source maps for debugging

The following list provides some examples of how you can use source maps for more effective debugging:

- **Breakpoints** - Set breakpoints in the source code to pause executions at specific points.

- **Inspect variables** - Hover over variables to see their current values, or monitor specific variables using the watch panel.

- **Step through code** - Use debugger controls to step through the code line-by-line and follow the flow of execution.

- **Follow console logs** - When using `console.log()`, the console output links back to the source code location.

- **Edit and continue execution** - Some browsers support editing the source code inside hte developer tools. The changes are temporary, but can be useful for quick tests.

Remember to disable source maps when you're done debugging to restore performance.

## Resources

- **[Build custom Markdoc functions](./build-custom-function.md)** - Create individual pieces of logic for dynamic content control with source map support for easier debugging
- **[Create React pages](./create-react-page.md)** - Build custom pages with full control over rendered elements and enhanced debugging capabilities through source maps
- **[Build custom Markdoc tags](./build-markdoc-tags.md)** - Create custom authoring tools for Markdown content with source map support for streamlined development
