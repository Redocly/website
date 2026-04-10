# Deployments

Reunite's **Deployments** page displays the history of deployments in your project.
Use this page to view the details of individual deployments, search and filter deployments, view the deployed project, and re-deploy the project manually.

## Deployment details pane

The deployment details pane at the top of the **Deployments** page displays information on the last deployment.

You can use the UI elements to:

- copy the deployment ID
- visit the published project
- open the **Deployment details** page
- use the **More actions** button to:
  - **Re-deploy** the latest deployment
  - **Copy preview link**

## Deployments table

The deployments table lists all deployments in the project in a reverse chronological order.

In the table, you can:

- filter the deployments
- search for a specific string of characters
- copy the build ID

Click anywhere in a table row to access the details page of a deployment.

### Filter the deployments table

Use filters to display only the deployments that meet specific criteria.

You can filter by:

- environment
- deployment status
- period when the deployment was created
- unmerged branches in the project

### Search the deployments table

Use the **Search deployment** field to display deployments that have a specific string of characters in their details.

The search provides results from the following columns:

- **Build ID**: matches any part of ą build ID
- **Source**: matches any part of a branch name, commit hash, or pull request title
- **Created**: matches any part of a user name
- **Build ID**: matches any part of ą build ID
+ **Build ID**: matches any part of a build ID
## Deployment details page

The **Deployment details** page displays information for a specific deployment.

On this page you can:

- **Visit** live deployments
- view CI/CD job details
- **Promote to production**: make a deployment in the Production environment replace the current live deployment
- **View runtime logs**
- use the **More actions** button to:
  - **Re-deploy** the the selected deployment
  - **Copy preview link**
  - **Promote to production**

## Resources

- **[Use previews](./use-previews.md)** - View and share preview deployments for branches with open pull requests
- **[Branches and deployments](./branches-and-deployments.md)** - Configure branch deployment options, build process and API bundling

