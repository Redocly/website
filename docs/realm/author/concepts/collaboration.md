# Collaboration in Reunite

You can collaborate with your colleagues on your Redocly project in multiple ways, depending on where you store your files and how you and your colleagues prefer to work.

## Redocly-hosted Git only

If you use Redocly-hosted Git, you can work directly in the Reunite editor.
You can create branches and even work on the same branch with another colleague.
When you want to merge your changes with the main branch, you can open a pull request and add reviewers.
Adding your colleagues as reviewers gives them an opportunity to leave comments if they think something should be updated or approve if they think your changes are ready.
Once your pull request is approved and you merge it, your project is rebuilt and the new live site contains your changes.

## Other provider-hosted Git and Reunite

If you prefer to use an alternative Git provider such as GitHub or GitLab, you can connect your repository to Redocly, giving you and your colleagues the ability to make edits either in the Reunite editor, in the Git provider's online editor, or in a local text editor.
Once connected when you create branches in either Reunite or in the Git provider, the sync ensures the branches are available in both places.
You can also open and review pull requests in either Reunite or the Git provider and they are accessible in both places.
The only thing you must do in the Git provider in this scenario is merge pull requests.
Once merged though, like with Redocly-hosted Git scenarios, your project is rebuilt and the new live site contains your changes.

## Other provider-hosted Git only

If you prefer to work only in your Git provider's online editor or local text editor, you do not need to use Reunite for updating content.
You can use Reunite only for deployment and complete all other tasks such as writing, editing, and reviewing your changes in other tools.
To deploy your project, you still need to connect your Git provider account, but you do not need to use the Reunite editor at all.

## Related how-tos

- Follow step-by-step instructions for [connecting a Git provider](../../setup/how-to/git-providers/connect-git-provider.md) in Reunite.
- Learn more about how to [use the Reunite editor](../how-to/use-editor.md).

## Resources

- Find out more about how [source control](../../setup/concepts/git.md), or version control, works in Reunite.
- If you have a single folder in a different repository you want to integrate into your project, learn more about [remote content](../../setup/concepts/remote-content.md).