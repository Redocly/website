# Push remote content from an external source

Using [remote content](./remote-content.md), you can use content from an external source in your Redocly project.
Typically, users fetch content from a public URL, or integrate their Git repository with Redocly.

However in the situation where Redocly cannot be configured to access the remote content source, you can push content updates to your Redocly project when another content source changes.

## Before you begin

Make sure you have the following before you begin:

- [latest version of Realm](../../../get-started/upgrade-realm-version.md)
- an existing Redocly project to add remote content to

## Add a remote to push content to

To set up a remote content folder for pushing:

1. In the file tree, select the folder (or click on the empty space to select the root directory) to which you want to add the remote content folder.
1. Select **+ > New remote folder > Add from CI/CD**.
1. Enter name for the new remote content folder and press Enter or Return key.
1. Pick the platform that you will be pushing from to get the relevant fields displayed.
1. Add a list of files to be included when pushing.
1. Complete the other fields for the platform you are using.
1. Copy the provided code snippet.
   For users of our GitHub application, a GitHub Actions workflow is provided; for other platforms or GitHub users not using the application, a CLI command is presented that you can run in your CI/CD process.
   In both cases, all the variables you need are pre-filled.

## Get your API key

Authentication is required to push from another platform to Redocly, and this is done using an API key.
To get the value and set it up for use in the CI/CD platform:

1. Get your personal or organization API key by visiting your organization dashboard and selecting **API keys** from the **Security** section of the left hand menu.
1. Add an environment variable named `REDOCLY_AUTHORIZATION` with the value of your API key to your CI/CD platform.
1. Use this variable with the command or workflow you copied in the previous step.

## Push changes

To push changes to Redocly:

1. Make a change to the remote content source.
1. Check that the CI/CD steps you set up earlier in this guide ran as expected.
1. Visit Redocly to review the new deploy.

## Resources

- **[Adding remote content types](./index.md)** - Explore different methods for integrating various external content sources into your Reunite projects
- **[Remote content concepts](./remote-content.md)** - Understand remote content fundamentals including sync mechanisms, folder paths, and auto-merge capabilities
- **[GitHub Action configuration](./reunite-push-action.md)** - Configure the Reunite push GitHub Action for automated content synchronization and deployment workflows
- **[CLI push command](https://redocly.com/docs/cli/commands/push)** - Complete reference for the Redocly CLI push command with usage examples and configuration options
