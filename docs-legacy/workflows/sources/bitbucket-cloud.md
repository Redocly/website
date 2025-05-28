---
excludeFromSearch: true
---

# Bitbucket Cloud

Use Bitbucket Cloud as a source for your API definitions and developer portal projects.

{% partial file="../../_snippets/source-bitbucket-connection.md" /%}

For API definitions, you can select the optional **Validate and bundle from PRs** checkbox.

For developer portals, you can select the optional **Build PR as previews** checkbox.

These options instruct Workflows to trigger a build when:

- a new pull request is opened to your production branch
- a new commit is pushed to any open pull request

If your API version is used in other projects, it will also trigger subsequent cascading preview builds of other APIs, reference docs, and developer portals.

Leaving these options unselected does not interfere with builds from your production branch.

## Complete the source configuration

After setting up the Bitbucket source, select **Next** to provide a name for your API version or developer portal. Select **Finish** to complete the configuration.

When you have successfully connected Bitbucket Cloud as a Workflows source and completed your first build, you'll be able to see the build status directly in your Bitbucket repository, and access build previews on Workflows from there.
