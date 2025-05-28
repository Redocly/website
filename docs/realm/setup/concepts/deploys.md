# Deploys

Reunite enables you to deploy your project as a website and make it available to its intended audience.

A deploy process builds the website, performs automatic tests, and publishes the content to your project's URL, or to a preview URL for preview deploys.
Each time a deploy starts, the process creates an entry on the Deploys page where you can monitor its status.

The Deploys page has two toggle buttons: **Production** and **Preview** which you can use to switch between lists of deploys.
Deploys are ordered such that the latest deploy is displayed at the top of the list.

## Production deploys

Production deploys publish the API website to your project's URL.
Each production deploy is a self-contained snapshot of your project's content and configuration.
This enables you to publish any past deploy without having to make changes to the project's files.

Production deploys trigger automatically upon merging a pull request.

The top-right corner of the production deploys page has two buttons:

* **View Project**: displays the API website's published to to the project's URL.
* **Trigger deploy**: manually starts the deploy process from the default branch. \
For more information, see: [Manually trigger a production deploy](../how-to/manually-trigger-deploy.md).

## Preview deploys

When you select this toggle, the page lists all preview deploys.
Preview deploys trigger each time you commit content to a branch.
Website previews are available until you merge the branch they were built from.

For more information on previews, see: [Use previews: From the Deploys page](../../author/how-to/use-previews.md#from-the-deploys-page).

## Deploy status page

When you click a deploy, Reunite displays that deploy's status page.
You can use the status page to monitor the status of the deploy and the progress of the CI/CD jobs.

On a production deploy status page you can use the buttons to:

* **View**: opens the project's URL in a new window.
Appears only for the current published deploy.
* **Publish**: starts the publishing process without restarting the deploy process.
You can publish any past deploys.
* **Restart**: restarts the production deploy process.

On a preview deploy status page you can use the buttons to:

* **Preview**: launches a preview of your API website.
The URL of the preview contains the name of the branch from which the deploy was triggered.
* **Restart**: restarts the preview deploy process.

### CI/CD jobs

The deploy status page has a **Summary** pane that displays the status of the CI/CD jobs.
You can click on each of the jobs for details.
To return to the overall status view, click the **Summary** field.

The CI/CD jobs run by the deploy process:

* **Checkout**: performs a Git checkout of your repository.
* **Build**: displays the complete build log
* **Link checker**: verifies the internal links of your website.
* **Lint**: checks the API description files against the rules defined in the scorecard.
* **Health checks**: verifies the built website. Applies to production builds.
* **Publish**: publishes the website to the project's URL. Applies to production builds.

## Related links

* [Projects](./projects.md)
* [Connect a Git provider](../how-to/git-providers/connect-git-provider.md)
* [Set a custom domain](../how-to/custom-domain.md)
