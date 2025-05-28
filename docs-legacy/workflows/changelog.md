---
tocMaxDepth: 3
excludeFromSearch: true

---

# Workflows changelog

{% admonition type="info" %}
Products integrated in Workflows have their own changelogs:

- [Reference docs](../api-reference-docs/changelog.md)
- [Developer portal](../developer-portal/changelog.md)
- [Redocly CLI](/docs/cli/changelog)
{% /admonition %}

## November 2022

### 2022-11-14

**Features**

-  Upgraded Developer portal builder to the node 16.13.0 version.

## September 2022

### 2022-09-27

**Fixes**

- Don't allow the `@` character in API names.
- Fixed an issue that allowed empty API names.
- Fixed an issue with seeing error messages when updating API name or version.

### 2022-09-24

**Fixes**

- Fixed an issue with invitation links.

### 2022-09-21

**Features**

-  Mock server position settings apply to APIs used in portals via the catalog feature.

### 2022-09-20

**Fixes**

- Fixed an issue with parsing build logs.
- Fixed an issue when parsing an invalid OAS file caused builds to crash.
- Fixed an issue with managing Azure connection settings for Professional plan accounts.
- Fixed an issue when simultaneous OAS definitions builds crashed for an organization.
- Fixed wrong behavior with the "no-changes" scenario.
- Fixed the ability to edit file source for API maintainers.



### 2022-09-15

**Features**

- Added the ability to [switch your connected GitHub account](https://redocly.com/docs-legacy/workflows/sources/github/#connected-to-the-wrong-github-account).
- Added information about connected GitHub and Bitbucket accounts to the user profile.
- Improved the online file editor for API registry sources.

## July 2022

### 2022-07-26

**Fixes**

- Fixed an issue with portals not rebuilding automatically when an API is updated but "Build API docs" is turned off.

### 2022-07-25

**Fixes**

- Fixed an issue with `https://app.redocly.com/callbacks/sso` URL not working for new OIDC IDPs.

### 2022-07-19

**Fixes**

- Fixed API registry file upload flow failing when selected root file was inside a folder.

### 2022-07-18

**Features**

- Added [file editing](../api-registry/guides/edit-registry-files.md) to the API registry.

**Fixes**

- Resolved an issue with API docs not building after file upload or CI/CD definitions update.

### 2022-07-14

**Fixes**

- Resolved an issue that [team mapping](https://redocly.com/docs-legacy/teams/manage-team-mapping/) didn't work with SAML2.

### 2022-07-13

**Features**

- Added the ability to turn off API doc builds for the primary branch.

### 2022-07-07

**Features**

- Minor `Files` tab UI updates for consistent view with other tabs.

### 2022-07-04

**Fixes**

- Resolved an issue with broken links to files and folders.

## June 2022

### 2022-06-27

- All project names were converted to lowercase.

**Fixes**

- Resolved an issue with sorting definitions.

### 2022-06-17

**Fixes**

- Resolved an issue with URL-encoded organization IDs.

## May 2022

### 2022-05-30

**Features**

- Added metadata URL for automatic SAML setup.
- Added the ability to turn off doc builds for preview branches.

**Fixes**

- Resolved an issue with Apigee X email encoding. _Requires re-uploading of bundle proxy._

### 2022-05-25

**Fixes**

- Resolved an issue with the `Files` tab being empty if the _Include other files_ option is not selected in the API source configuration. When the option is not selected, the `Files` tab will contain the bundled API definition.
- Implemented some internal security improvements.

### 2022-05-23

**Fixes**

- Resolved an issue with incorrect links to API docs logs from the build status check in git repositories.

### 2022-05-20

**Fixes**

- Resolved an issue with converting Redocly user accounts to SSO users.
- Resolved an issue that prevented access to GitLab resources after the access token has expired.

{% admonition type="warning" %}
**How to re-authorize the GitLab application?**

* Open either **Portal** or **API Registry** connected to **GitLab**:
* Go to the **Settings** -> **Source** page.
* Select **Edit source**.
* You'll be redirected to **GitLab** to approve the **Redocly App**.
* Go back to **Portal** or **API Registry** - the error message should disappear.
{% /admonition %}

### 2022-05-18

**Features**

Redocly Workflows has received major UX changes. Here's a list of the most prominent ones:

- The **Reference** tab is gone. In an effort to optimize your experience and speed up your journey from an API definition to API docs, we integrated the API docs into the API registry. Every API version is directly connected to its own API docs.

- You no longer have to manually click buttons and go through multiple steps to build your API docs - they are automatically built for you as soon as you add or change your APIs in the registry. Instead of navigating to a separate _Reference_ tab and scrolling through the list to find the right docs for your exact API version, you can access them right from the API version _Overview_ page by selecting the new **API docs** button.

- The API _Overview_ page has been redesigned, too. Depending on your API source, it shows helpful instructions on how to push updates to the registry in an expandable section.

- The **Primary branch** section on the _Overview_ page contains practical buttons to help you access your API docs, uploaded files, the mock server link (if enabled), and your OpenAPI files and snapshots. Similarly, every branch in the **Preview branches** section has the _Branch menu_ with options to manage that specific branch.

- The **Usages** section on the _Overview_ page now indicates usages in portals and in multi-version APIs, but not in docs as before.

- The **Assets** tab has been renamed to **Files**, and thoroughly redesigned for easier navigation. You can now jump between (sub)folders with the breadcrumb navigation at the top, and quickly get the **Folder link** for the current folder you're viewing. Select a file to preview it, and you'll get access to additional buttons for downloading the file and copying the file link.

- Another new tab - **Branches** - has been added to help you manage all active branches for your project in one place.

- All settings previously available from the _Reference > Settings_ page have been merged into **API registry > Settings** configuration dialogs. Among other consequences, this means you can't delete API docs separately from the API version. Using the **API registry > Settings > Delete** dialog will remove both from the API registry. Additionally, the **Settings > Notifications** configuration dialog is temporarily inaccessible in the UI.

- From the organization-wide perspective, the **Settings > Role privileges** page applies the settings from the **API registry** section to your APIs and to API docs. The _Reference_ section has been removed from the page.


**Fixes**

- Resolved an issue with API docs build failure on retry.
- Resolved an issue with the "Upload file" API source.
- Implemented some internal security improvements.

----

### 2022-05-16

**Fixes**

- Resolved an issue with adding collaborators to the API registry caused by the user list not being fully retrieved and displayed.

----

### 2022-05-12

**Features**

- Added the [API style guide](https://redocly.com/docs-legacy/settings/api-styleguide/) feature.
- Added the default expiration time of 12 hours for SAML2.

**Fixes**

- Resolved an issue with a missing error message in the API definition change name dialog.

----

### 2022-05-11

**Features**

- Added support for the `--public` option from the `redocly push` command. You can use this option to push your APIs to the registry and make them publicly accessible.

**Fixes**

- Resolved an issue with broken preview build URLs when the Redocly URL was disabled in the Workflows configuration.

----

## April 2022

### 2022-04-20

**Features**

- Implemented support for IdP-initiated SSO flow when using SAML authentication.

----

## March 2022

### 2022-03-31

**Fixes**

- Resolved an issue that prevented users from uploading registry assets when connecting a GitHub monorepo.

### 2022-03-25

**Fixes**

- Resolved an issue with saving GitLab self-managed organization settings.

----
### 2022-03-21

**Features**

- Implemented the mock server feature that lets you test your APIs while you design and develop them. Add your API definitions to the Redocly API registry and enable the mock server for all branches in the API project settings. The API version **Overview** page will then show the mock server link that you can copy and use in any API testing tool to send requests. Learn more about this feature in the [mock server quickstart guide](../api-registry/guides/mock-server-quickstart.md).

The mock server is available only to customers on Pro and Enterprise plans.

----

### 2022-03-18

**Features**

- Implemented support for the new Redocly configuration file across the Workflows interface. Read the [migration guide](/docs-legacy/api-registry/guides/migration-guide-config-file.md) to understand what has changed in the configuration file and how to start using the new options.

- When adding a new API to the registry, you'll notice that the order of steps in the dialog is different. Instead of setting the API name, the first step is selecting a source. If your source contains the new Redocly configuration file, the dialog can automatically pull the name and version of your API from the configuration file.

- If you're using the new `labels` section in the Redocly configuration file to assign labels to your APIs, the API registry can detect that and automatically apply the labels to your APIs when you set up your API project. Keep in mind that you can only assign labels that already exist in your Workflows organization. Adding new labels to the `labels` section of the configuration file does not create new labels in Workflows, and such labels are ignored during the API project setup.

----

### 2022-03-15

**Fixes**

- Resolved a regression issue with Portal builds crashing if the `siteConfig.yaml` file doesn't have the `oasDefinitions` section.

----

### 2022-03-14

Rejoice - the Redocly app has officially switched to the `redocly.com` domain! 🥳

**Fixes**

- Internal performance improvements to prevent timeout errors on API definition build jobs.

----

### 2022-03-11

**Fixes**

- Resolved a regression issue with Portal previews not triggered from registry branches in some cases.

----

### 2022-03-03

**Features**

- Starting with this release, the SSO (Single-Sign On) functionality is available to users on Pro plans. SSO accounts are counted towards the user limit for the organization.

**Fixes**

- Resolved an issue with the SAML name format when using OneLogin as the identity provider.

----

## February 2022

### 2022-02-24

**Features**

- Added the top-level **Copy link** button to the **Assets** page in the API registry. Use this link to copy all assets in the selected branch.

----

### 2022-02-22

**Fixes**

- Improved the UX on the API version **Overview** and **Settings** page. What used to be called "Default branch" is now "Primary branch". Similarly, the "Other active branches" label was renamed to "Preview branches".

----

### 2022-02-17

**Features**

- To simplify usage tracking for your organizations, we removed "Documentation sites" and "API versions" from the **Settings > Billing** page.

----

### 2022-02-09

**Features**

- Added pagination to the **People** tab.

----


## January 2022

### 2022-01-31

**Features**

- Added two links on the **Organization settings > API gateways** page that allow enterprise customers to download Apigee X and Apigee Edge proxy bundles.

----


### 2022-01-27

**Features**

- Added an option to disable the default `redoc.ly` URL in the custom domain settings for Reference and Portal projects.

**Fixes**

- Fixed an issue with fetching the file list from BitBucket Cloud repositories that have a large amount of files.

----

### 2022-01-20

**Features**

- Added new **Security** section to the organization settings. Use it to access Redocly compliance reports and other documents related to the security of our services.

**Fixes**

- Resolved an issue with broken registry links with special symbols.

----

### 2022-01-18

**Features**

- Improved error pages for server-related problems in our services
- Starting with this release, the registry API uses a new format for _bundle_ and _assets_ links. The old format is considered deprecated, and we recommend switching to the new format.

```diff Bundle links
- Old bundle link format
- https://api.test.org/registry/org/api/version/bundle/main/uuid/openapi.yaml
+ New bundle link format
+ https://api.test.org/registry/bundle/org/api/version/openapi.yaml?branch=main&job=uuid
```

```diff Assets links
- Old asset link format
- https://api.test.org/registry/org/api/version/assets/markdown.md?branch_name=branchName
+ New asset link format
+ https://api.test.org/registry/assets/org/api/version/markdown.md?branch=branchName
```

----

### 2022-01-11

**Fixes**

- Resolved an issue with missing initial build status for Bitbucket Cloud.

----

### 2022-01-10

**Fixes**

- Simplified GitHub integration for API registry page.

----

### 2022-01-05

**Fixes**

- Resolved an issue with missing previews for Bitbucket Cloud PRs.

----

### 2022-01-04

**Features**

- The **Assets** page in the API registry shows the _Copy link_ button for folder assets.

- We've made tooltips more informative throughout the Workflows interface. Hovering over text like "Last updated ... ago" shows the exact date and time when the version or project was updated.

----

## December 2021

### 2021-12-30

**Features**

- Customers on the Enterprise plan can [configure organization-level role privileges](../settings/role-privileges.md).

----

### 2021-12-29

**Features**

- Added the ability to edit environment variables for API Registry and Portals.

----

### 2021-12-23

**Features**

- Upgraded the Mermaid diagrams service to the latest version (`v8.13.6`).

**Fixes**

- Resolved an issue with SSO users getting an error when `name` or `updateAt` claim is not provided by IdP.
- Resolved a UI issue with the loading animation offset in the Source tab.

----

### 2021-12-22

**Fixes**

- Resolved an issue with missing name claim in JWT token for SSO.
- Corrected validation for the account name field.

----

### 2021-12-16

**Fixes**

- Resolved an issue where Reference and Portal builds dependent on API definitions were not triggered if any of the build jobs in the batch was skipped.

- Resolved a timeout issue with API calls that caused "failed to fetch" network errors.

----

### 2021-12-14

**Features**

- Implemented support for inline OIDC configuration in the **Settings > Identity providers > OpenID Connect** dialog. Organization owners can provide the configuration manually by selecting the **Insert configuration as JSON** option in the dialog.

**Fixes**

- Resolved an issue where the definition version result was incorrectly ordered.

----

### 2021-12-07

**Features**

- Organization owners now have access to billing history. The _Billing history_ link is visible on the **Settings > Billing** page.

----

### 2021-12-06

**Fixes**

- Resolved an issue with an incorrect warning about job limits.

----

### 2021-12-01

**Fixes**

- Resolved an issue with the portal rebuild button that did not update the builds list.

----

## November 2021

### 2021-11-29

**Features**

- When validating your API definitions, the API registry now shows the exact rule name that generated a warning in the _Results_ output.
- We have improved the "Cancel subscription" form and added the ability for users to provide their cancelation reason as feedback.

**Fixes**

- Resolved an issue with retrieving a large amount of Auth0 users.
- Resolved an issue with unexpected API requests for non-configured source providers.
- Resolved an issue that incorrectly revoked organization access after canceling a subscription.

----

### 2021-11-23

**Fixes**

- Resolved an issue with empty settings displayed in Reference docs live editor (e.g. Live configuration) before user clicks Save.
- Resolved an issue with subscription cancelation which incorrectly used `churnTime` prop value.

----

### 2021-11-18

**Fixes**

- Added `apple-developer-merchantid-domain-association` to the list of file types supported as registry assets.
- Resolved an issue with invalid `/sidebars` route.

----

### 2021-11-16

**Fixes**

- The `redoc.ly` email domain has been renamed to `redocly.com` - you will notice this change in emails sent by the Workflows app.
- Resolved an issue with domain path prefix not working for portal sources other than GitHub.

----

### 2021-11-15

**Fixes**

- Resolved a reintroduced issue with environment variables not properly replaced in `siteConfig.yaml` for portal builds.

----

### 2021-11-11

**Fixes**

- Resolved a trailing slash issue with domain configuration when adding on-premise license keys.

- Resolved an issue that caused the GitHub connection to time out when modifying the portal source.

----

### 2021-11-10

**Fixes**

- Resolved an issue with branch name encoding in GitLab-based projects that caused errors in commit status update calls.

- Resolved an issue with first and last name parsing when creating new Workflows accounts.

----

### 2021-11-09

**Fixes**

- Resolved an issue that prevented organization owners from removing expired on-premise license keys.

- Resolved an issue with environment variables that were not properly replaced in `siteConfig.yaml` for portal builds.

----

### 2021-11-04

**Features**

- Organization owners can now disable the _Log in with Redocly account_ option on the **Settings > Access control** page if they want to use only SSO login for their organization. When SSO-only login is configured, the login flow will indicate that SSO is required for users trying to log in.

----

### 2021-11-03

**Fixes**

- Resolved an issue with RBAC-protected pages showing 403 to unauthenticated users instead of redirecting them to login first.

----
### 2021-11-02

**Features**

- When generating new license keys from the **Workflows > Settings > On-premise license keys** page, you can now use wildcards in domain names. Only one wildcard is allowed in each configured domain.

----

## October 2021

### 2021-10-28

**Fixes**

- Internal improvements to license key generation.

- Resolved a phrasing issue in descriptions on the **Settings > Notifications** page.

----

### 2021-10-26

**Fixes**

- Resolved an RBAC issue with Reference docs pages in the portal that have path parameters in their URL.

- The Reference docs version selection menu on the **Settings > Features** page no longer displays the unsupported `next/unstable` version.

----

### 2021-10-21

**Fixes**

- Improved the UI of the API registry.

----

### 2021-10-20

**Features**

- The API registry now provides an optimized user experience to help you access and manage your API versions more efficiently. The list of APIs is more compact and shows 10 API versions per page. Instead of grouping API versions under each API, every version is now its own item on the API registry page, with the name formatted as `API name @ API version`. You can use the search bar to look up APIs by name or version, and the filter to show only API versions with specific labels. Labels are now associated with the concept of the API version, not the API name, which means they can be added only to specific API versions from their **Overview** pages.

- The flow for adding a new API version to the API registry has changed. To add a new version to an existing API, select **Add API** and choose the name of the API from the dropdown in the **Name** field. To create the first version of a new API, enter a new API name into the **Name** field.

- The **Settings > Version name** page for API versions has been renamed to **Settings > API info**. Now it contains two options: **Name** and **Version**. If there are other API versions in the registry with the same name, modifying the value of the **Name** field here will change it for other API versions, too.

----

### 2021-10-19

**Features**

- The **SAML** configuration dialog in Workflows now supports a new field called **RBAC roles attribute name** that allows you to configure RBAC for SAML providers.

- SAML roles claim names can now be added as a space-separated list.

**Fixes**

- Resolved an incorrect mapping of roles and permissions. **Users with the Participant organization role no longer have the permission to create Reference docs.**

- Improved validation for the email address field on the Workflows SSO login page.

- Resolved an issue with the Redocly `Login` component not working with SAML.

- Resolved an issue with portal logout not working in build previews.

- Resolved an issue with IDP login not working in build previews when using uppercase names.

- The link checker now ignores the special `/idp-login` URL to prevent issues with IDP redirects.

- Resolved an issue with RBAC not working in portal build previews when the link checker was configured.

- Resolved an issue that would crash the portal build if RBAC cache failed to update.

----

### 2021-10-13

**Features**

- The following dependency packages have been added to the allowlist, as they may be useful for external customer plugins: `js-yaml@4.1.0`, `json-pointer@0.6.1`

**Fixes**

- Resolved an issue with the jumping label selection menu on the API version **Overview** page.

----

### 2021-10-09

**Fixes**

- Resolved an issue with Enterprise trial accounts that prevented them from generating on-premise license keys.

----

### 2021-10-07

**Fixes**

- Removed the `valid` value from  GitLab self-managed settings.

----

### 2021-10-06

**Fixes**

- Members can now add APIs with GitLab self-managed as the source (as long as the GitLab integration has been previously configured by an Owner).

- Resolved an issue with portal projects failing to update the internal database if the RBAC configuration contains a role referencing another, non-existing role.

- Hints and error messages that appear in the GitHub and Bitbucket source configuration dialogs are now more informative.

- Implemented further improvements to content security policies.


----

### 2021-10-05

**Fixes**

- Resolved an issue with the Bitbucket source configuration dialog not detecting all files in the repository.


----

### 2021-10-04

**Fixes**

- Improved validation for credentials in the **Source control providers** configuration forms.

- Improved handling of expired access tokens (JWT) now automatically redirects the user to the login page instead of displaying an unusable error message.


----

## September 2021

### 2021-09-30

**Fixes**

- Improved the security of CORS policies.

- When a non-SSO user is removed from a Workflows organization, they will now be automatically removed from all teams they've been added to.

- If a user is already authenticated to Workflows, selecting **Login** on the Redocly website now automatically redirects to the Workflows app instead of opening the login page.

- For improved security, password input fields in Workflows no longer support auto-completing the password. Note that some browsers may override this restriction.


----

### 2021-09-28

**Fixes**

- Security improvement: restricted traffic to TLS 1.2+ with fewer supported algorithms without any known weaknesses.

----

### 2021-09-27

**Fixes**

- Resolved an issue with the Workflows invitation screen which incorrectly displayed the name of the invitation sender for SSO users.

- Internal improvements to subscription handling.

----

### 2021-09-23

**Fixes**

- Resolved an issue with failed webhooks retrieval due to unsupported access level when creating a project from a GitLab source.

- Removed the prompt to create Reference docs that was incorrectly displayed for a role that doesn't support creating new projects.

- Workflows users with the _Maintain_ project role can now view API and Reference docs settings by selecting the **Settings** tab on the project overview page.


----

### 2021-09-22

**Fixes**

- Improved file type validation for the "Upload OpenAPI definition" source to prevent uploading unsupported API definition file types.

----

### 2021-09-20

**Features**

- The **API registry** page in Workflows is now more usable and easier to navigate, which should help you and your organization members discover APIs and other assets much faster. Use the new **Search** feature to look up API versions by name, or show a filtered view of the registry by selecting one or more **Labels**. You can also sort the API registry contents alphabetically or by most recently updated, and use the pagination section at the bottom of the page to quickly skip between pages.

- Implemented a new default role for authenticated users called `authenticated-user`.


----

### 2021-09-16

**Fixes**

- Modifying a custom domain with `pathPrefix` will now trigger a portal rebuild.


----

### 2021-09-15

**Fixes**

- When creating a new API in the registry, an API definition is now required for all Git-based sources. It is not possible to create a new project without selecting at least one API definition.

- Improved the error message for portals with dependencies to private API definitions.

- Resolved an issue caused by disabled Azure repositories.


----

### 2021-09-09

**Features**

- You can now enable auto-generated **Ruby** code samples for your Reference docs directly from Workflows. Find the new option in the **Settings > Features > Code samples** section.

**Fixes**

- Build preview links are now added to pull request comments for projects using Azure repos as the source.


----

### 2021-09-07

**Fixes**

- Resolved an issue with build duplication for projects using Azure repos as the source.


----

### 2021-09-01

**Fixes**

- Resolved an issue where Reference docs 1.x was always used in project builds regardless of the configured version.

- Added the `.ovpn` file format to the list of supported registry assets for developer portals.


----

## August 2021

### 2021-08-31

**Features**

- You can now enable auto-generated **PHP** code samples for your Reference docs directly from Workflows. The option is available in the **Settings > Features > Code samples** section.

- A new checkbox called **Configure additional parameters** is now available in the **Settings > Identity providers > OIDC** configuration dialog. Selecting the checkbox lets you add a custom JSON object to the configuration. The custom properties are added to the `/authorize` and `/token` endpoint calls. This is useful for providing a custom `audience` value.

**Fixes**

- Resolved an issue with an extra `https://` in the OIDC redirect URL helper.

- Fixed a minor layout issue in the Reference docs build log.

- Resolved an issue with portal dependencies not being cleared properly and preventing customers from removing items from the registry.

- Improved the spacing and layout of items in build logs to improve readability.


----

### 2021-08-26

**Features**

- We're starting to roll out major usability improvements to the API registry that will make it more flexible and help you manage your Redocly projects more efficiently. In this phase, you can upload different assets (files) to the API registry together with your API definition, or add them separately after you've already created an API version. Although this feature doesn't have any practical application yet, you will soon be able to reuse your assets across your Reference and Portal projects connected to your API definitions. Keep an eye on this changelog for updates!

**Fixes**

- Optimized our services to improve their responsiveness under heavy load.

- Resolved an issue with missing CORS headers.

- Changed `redirect_to` login URLs for portal projects to absolute URLs.

- Resolved an issue with the `requestLogin` setting not working in portals.


----

### 2021-08-24

**Features**

- Implemented many improvements to UI text throughout the Workflows interface. Help text should now be more helpful, and configuration options should have more sensible names. You'll also notice the **Reference docs** tab on the main page is now called just **Reference**, and the **Developer portals** tab has been simplified to **Portals**.

- Submodules that use `git@github.com` are now supported for Developer portal projects.


----

### 2021-08-23

**Features**

- [Git submodules](https://git-scm.com/docs/gitsubmodules) are now supported when using GitHub as a source for your Developer portal project. With submodules, the repository you're using for your portal project can have other repositories linked into it as "dependencies". Among other use-cases, this allows you to pull content from external repositories, integrate it into your portal, and reuse it more effectively across different documentation projects.

**Before creating your Developer portal project, make sure that all repositories added as submodules are in the same GitHub organization. The Redocly GitHub app must have access to all of the repositories.**


----

### 2021-08-19

**Features**

- The **Live configuration** editor on the **Reference docs > Settings > API reference settings** page has been completely revamped. It now works with all Reference docs projects regardless of their version (2.x or older). You can directly type in the settings you want to use for your Reference docs project into the editor, and select **Preview** to check what it will look like when your settings are applied. All supported settings are [listed in our documentation](https://redocly.com/docs-legacy/api-reference-docs/configuration/).


----

### 2021-08-18

**Fixes**

- Resolved an issue with the SSO login not working for customers in the EU region.

- Resolved an issue with the RBAC feature that displayed inaccessible results.


----

### 2021-08-17

**Features**

- You can now enable auto-generated **Go** code samples for your Reference docs directly from Workflows. The option is available in the **Settings > API reference settings > Code samples** section.


----

### 2021-08-12

**Features**

- Implemented further improvements to search result scoring and ordering for Developer portals. Pages with titles that match the search query will now appear higher in the list of results than the pages that only match the query in the text body. **Note that you must rebuild the portal to update the search index and use the improved search.**


----

### 2021-08-10

**Features**

- Improved the order of search results for Developer portals hosted in Workflows so that more accurate results are displayed first.


----

### 2021-08-06

**Features**

- Improved OIDC-related error messaging for Developer portals hosted in Workflows. Instead of displaying a generic error on a blank page, the portal now displays a styled error page with the exact error as received from the OIDC provider. This allows customers with control over the identity provider to specify their own error messages on the IdP side.


----

### 2021-08-05

**Features**

- Workflows organization owners can now see how many user accounts are available on their current pricing plan, and how many of those available licenses are already in use. Find this information in the **Users** bar on the **Org settings > Billing** page for your organization.

**Fixes**

- Improved SSO JWT validation handling and error messaging for expired tokens.


----

### 2021-08-03

**Fixes**

- Resolved an issue with displaying the link checker status in GitHub.

- Improved the internal approach to retrieving project-level access permissions for users.

- Resolved an issue with monthly usage calculation for registry jobs.


----

### 2021-08-02

**Features**

- For Developer portal projects hosted in Workflows, you can now enable automated link checking. The link checker scans the portal content during build time and displays detected issues in the **Broken link checker** tab on the portal build page. To enable the link checker for your Developer portal, you must add the `linkChecker` section to the `siteConfig.yaml` file and set the `severity` value to either `warning` or `error`. If the link checker is not configured, it is skipped during the build process.

- The **People** page now lets you filter users in your organization by their account source and look them up by name or email address.

**Fixes**

- Resolved a GitHub status issue for API definition builds.

- Improved status text for skipped link checker jobs in the console output.

- Users are no longer allowed to create API definition or Developer portal projects with GitLab as the source without proper GitLab webhooks permissions.

- Resolved an issue with link checker status in GitHub which interfered with required checks.


----

## July 2021

### 2021-07-27

**Fixes**

- Fixed UI text inconsistencies related to team mapping in dialogs for setting up identity providers.

- Improved placeholder text in **Org settings > Source control providers** configuration dialogs.

- Implemented support for the production environment in the EU region.


----

### 2021-07-22

**Fixes**

- Resolved an issue with the **Load more** button in project build logs which caused duplicate entries to appear in the log.

- Improved search performance and search results precision for Developer portals.


----

### 2021-07-21

**Fixes**

- Resolved a string length issue when setting the commit build status for Bitbucket Cloud.

- Resolved issues with subscription plan activation due to a race condition.

- Resolved an issue with invalid URLs when setting the commit build status for Bitbucket Cloud.


----

### 2021-07-20

**Features**

- Workflows now supports content security policy header configuration. You can add custom headers to response header objects for your Reference docs and Developer portals by creating a `customHeaders.yaml` file in the root directory of the project. When building the project, Workflows reads the patterns from the file in top-to-bottom order and starts with the first matched pattern. Because of that, make sure to always place the general glob pattern (`**/*`) at the end of the file.

Here's an example `customHeaders.yaml` file:

```yaml
customHeaders:
  - pattern: '**/*.js'
    headers:
      - key: 'Content-Security-Policy'
        value: >-
          default-src 'none';
          base-uri 'none';
          object-src 'none';
          connect-src 'none';
          font-src 'none';
          frame-src 'none';
          child-src 'none';
          form-action 'none';
          media-src 'none';
          worker-src 'none';
          style-src 'self' 'none';
          script-src 'self' 'none';
          img-src 'self' 'none';
          block-all-mixed-content;
  - pattern: '**/*'
    headers:
      - key: 'Content-Security-Policy'
        value: >-
          default-src 'none';
          script-src 'none';
```

**Fixes**

- Improved caching for Developer portal projects. **To take advantage of this improvement, you must rebuild your portal project in Workflows.**

- Improved help text and labels in dialogs related to access control features.


----

### 2021-07-19

**Features**

- Workflows now supports advanced access controls for all project types (API versions, Reference docs, Developer portals). You can streamline collaboration by controlling access at the project level, invite external collaborators more easily, and create teams to manage different groups of collaborators with different levels of access.

Read all about the new features in our [Managing access guide](manage-access.md), and learn [how to manage teams in Workflows](../teams/index.md).

**Fixes**

- Removed a persistent warning icon with tooltip from the _Manage access_ page.

- Added the step to invalidate access tokens when updating a project.

- Optimized the internal database.


----

### 2021-07-14

**Fixes**

- Improved UI help text in _Access control_ configuration dialogs.


----

### 2021-07-13

**Fixes**

- Server-side encryption for S3 buckets is now enabled by default to improve the security of our services.

- Resolved an issue with invitations sent by regular Redocly user accounts.


----

### 2021-07-12

**Features**

- Implemented HSTS header to enhance the security of our services.

**Fixes**

- Resolved an issue with invitations sent by users logged in via SSO.

- Improved logging for `404` responses.


----

### 2021-07-07

**Fixes**

- TTF and OTF file formats are now in the allowlist.


----

### 2021-07-01

**Fixes**

- Resolved an issue where changes to API definitions used in developer portals were not detected, preventing Workflows from triggering new portal builds.


----


## June 2021

### 2021-06-24

**Features**

- Every API version, Reference docs and Developer portal in Workflows now has options for managing access to the project. This makes it easier to control who can collaborate on a project in what capacity, and allows you to set up direct access to the project for users outside of your Workflows organization. You must have the `Admin` role in a project in order to manage project-level access. Find the new options on the **Settings > Manage workflows access** page of the project you want to manage.

**Fixes**

- The Bitbucket Cloud source integration can now show more than 100 items per resource in the configuration dialog.


----

### 2021-06-23

**Fixes**

- Resolved an internal issue that affected the RBAC functionality.

- Optimized requests sent to the Bitbucket Cloud API when using the Bitbucket source integration.


----

### 2021-06-22

**Features**

- Workflows now supports Bitbucket Cloud as a source when creating new Developer portal projects and APIs in the registry. The integration also displays build status information for commits in the Bitbucket repository, and provides direct links from Bitbucket to build previews.

**Fixes**

- Resolved an issue with the RBAC functionality not working for new builds.

- Resolved an issue that prevented users from working with the **Upload from CI/CD** source.


----

### 2021-06-21

**Fixes**

- Resolved an issue with custom favicon settings for Reference docs (_Settings > API reference settings > Document settings > Favicon URL_) that were not properly applied and the configured favicon was not visible.


----

### 2021-06-15

**Features**

- Workflows organization owners can now convert Redocly user accounts to SSO accounts. On the **People** page, select the **Edit user** action for an existing Redocly user account. In the dialog that opens, select the **Convert to SSO user** checkbox and choose the identity provider to use for their account, then select **Save** to complete the account conversion. Note that this action is irreversible, and you won't be able to convert the user account back from SSO to a Redocly account. At least one identity provider must be configured in the Workflows organization prior to setting this up. SSO is available only to customers on the Enterprise plan.

**Fixes**

- When inviting new members to your Workflows organization, the organization name is now displayed instead of the organization ID in the invitation email and on the Welcome page.

- Resolved an issue with skipped email notifications for Reference docs and Developer portal build status. Email notifications about build success, failure, and recovery will now be sent as configured.


----

### 2021-06-14

**Features**

- You can now invite SSO (single sign-on) users to your Workflows organization. When sending an invitation from the _People_ dialog, select the **Invite SSO user** checkbox and choose the identity provider to use for their account. At least one identity provider must be configured for your Workflows organization prior to setting this up. SSO is available only to customers on the Enterprise plan.


----

### 2021-06-09

**Fixes**

- The **Logs** section on the API version Overview page is now automatically updated in real time and accurately displays the latest build information.


----

### 2021-06-07

**Fixes**

- Resolved an issue with spacing settings in **Reference docs > Settings > API reference settings > Live configuration** that prevented the users from making subsequent changes after modifying the settings for the first time.


----


## May 2021

### 2021-05-31

**Fixes**

- Resolved a build failure issue caused by keeping too many stale preview builds in the database.


----

### 2021-05-25

**Fixes**

- Resolved an issue when one repository is connected to multiple organizations, and exceeding usage limits in one organization prevents builds from running in another organization.


----

### 2021-05-20

**Features**

- Workflows now supports logging in via SSO with one or more identity providers. This feature is available to Enterprise customers. Access via SSO can be configured on the project level (for specific API versions, Reference docs, and Developer portal projects) and on the level of the entire Workflows organization (to allow members to log into Workflows with SSO instead of with their Redocly accounts).

- Multiple identity providers can now be configured and used at the same time. This feature is available to Enterprise customers. The new configuration page at **Workflows > Org settings > Identity providers** lets organization owners set up and manage different IDPs.

**Fixes**

- Resolved an issue with SAML user provisioning for Google Apps SAML.


----

### 2021-05-14

**Fixes**

- Resolved a timeout issue that was crashing portal builds when there were many API definitions in the project.


----

### 2021-05-13

**Fixes**

- Resolved an issue where `oasDefinitions` were not saved correctly in the Developer portal, causing intermittent problems when OpenAPI definition files were updated.


----

### 2021-05-11

**Fixes**

- The checkbox for connecting a monorepo in the GitHub source configuration dialog is no longer displayed if Workflows detects a `redocly.yaml` configuration file in the root of the repository.

- Resolved an issue where selecting the **Rebuild** button on the API version overview page would trigger a new build, but the new build was not visible in the **Logs** section without refreshing the page.

- Resolved an issue with invalid permissions which prevented API version maintainers from updating branch dependencies.

- Skipped builds are no longer displayed in the **Logs** section on the **API version > Overview** page for projects configured as a monorepo. You can still see them if you select **Show skipped** on the **API version > Logs** page.

- Resolved a callback URL mismatch issue when using Auth0 as the OIDC provider in the Developer portal.


----

### 2021-05-07

**Features**

- Workflows now supports the option to automatically expand schemas in your Reference docs. Configure it in **Settings > API reference settings > Live configuration > General > Schema expansion level**. Set this option to `all` to expand all schemas regardless of their level, or set it to a number to expand schemas up to the specified level.

- We're starting to roll out major improvements to the roles and permissions system for Workflows organizations. In this phase, you will notice new tags next to your API definitions and versions, Reference docs, and Developer portals. Those tags indicate your role in each project - **Admin**, **Maintainer**, or **Reader**.


----

### 2021-05-06

**Features**

- We have improved and reintroduced the feature that lets you limit the amount of files Workflows will pull from your GitHub repository. When setting GitHub as your source in Workflows, select the **Connecting a monorepo? Pick a folder** checkbox to enable this feature. Workflows will build and validate files only from the selected folder instead of checking out the entire repository. Any changes made outside of the selected folder will not trigger builds in your API registry or Reference docs project. Note that your `redocly.yaml` configuration file(s) must be in the selected folder for the settings to apply.


----


## April 2021

### 2021-04-23

**Fixes**

- Resolved an issue with RBAC not working when the portal sidebar query exceeded the size limit.


----

### 2021-04-22

**Fixes**

- Resolved an issue where nested claim names (e.g. `test.roles`) were not copied from the IDP access token.

- GitLab `projectId` is no longer included in log messages.

- Resolved an issue with the GitHub webhook querying for too much data and causing occasional timeouts.


----

### 2021-04-16

**Features**

- Implemented support for reading RBAC roles from the access token (if it's a JWT and if it contains a claim).

**Fixes**

- Resolved an issue with RBAC where changing the roles claim name required a portal rebuild to apply the change.

- Resolved issues with uppercase letters in Auth0 emails that prevented users from accepting invites.

- Resolved an issue with IDP access token not working in preview builds.


----

### 2021-04-14

**Fixes**

- Resolved an issue with the `.webmanifest` file that was returning a 404 error for developer portals hosted in Workflows.


----

### 2021-04-13

**Fixes**

- Implemented support for the new Developer portal with the latest Gatsby version (v3.2).

- When you deny authorization to the GitHub/Gitlab app while adding a new API definition, you will now be redirected to the _Choose source_ page instead of exiting the entire flow.

- Resolved an issue with OIDC integration.


----

### 2021-04-12

**Features**

- `Access-Control-Allow-Origin` is now set to `*` for public registry URLs by default, allowing any front-end code to access those URLs.

**Fixes**

- Improved the style of links and labels to make it clear which elements in the Workflows UI are actually links.

- Resolved an issue with Workflows organization info caching which caused issues when you deleted an organization and created a new one with the same name.

- Resolved issues with broken custom 404 pages in developer portals hosted in Workflows.


----

### 2021-04-10

**Fixes**

- Resolved issues with search and RBAC settings caused by an internal change to how we store files in S3.


----

### 2021-04-08

**Features**

- Dot notation is now supported in custom role claims names (e.g. `realm_access.roles`).


----

### 2021-04-02

**Fixes**

- Temporarily reverted the option to provide a folder path to fetch as it conflicts with other functionalities.


----

### 2021-04-01

**Fixes**

- Implemented validation for API definition/version names. From now on, you can only use supported characters (a-z, A-Z, 0-9, -, .) in the names of your API definitions and versions.


----


## March 2021

### 2021-03-31

**Features**

- A new option called **Provide folder path to fetch** is now supported in the setup dialog for all version control sources. With this option, you can limit the amount of files Workflows will pull from your repository. It's especially useful for large repositories, as it helps prevent build timeouts.


----

### 2021-03-29

**Fixes**

- Resolved an issue with an invalid license key generated by Redocly when using Reference docs with a proxy and a path prefix.

- Resolved an issue with the IdP login link that was incorrectly handled client-side and returned a 404.

- Resolved the following issues with RBAC in the Developer portal:

  - Builds were crashing if the `auth` section was omitted from the `siteConfig.yaml` file.

  - RBAC wasn't working when a custom claim name was configured in Workflows.

  - RBAC wasn't working with portal sidebars.


----

### 2021-03-25

**Features**

- Implemented support for HTTP 301 redirects in Developer portals hosted in Workflows.


----

### 2021-03-18

**Fixes**

- Resolved an issue that prevented invited users from logging in when their email address was entered with an uppercase letter in the invitation form.

- Implemented email validation when inviting new members to an organization.


----

### 2021-03-17

**Fixes**

- Single quotation marks are now used for API definition and version names in the `push` command syntax when setting up a CI/CD source.


----

### 2021-03-16

**Fixes**

- In-app instructions for completing the CI/CD source configuration with the `openapi push` command are now clearer.

- Resolved an issue with invalid redirects for specific proxied requests.


----

### 2021-03-15

**Features**

- "Upload from CI/CD" is now supported as a new source for your API definitions. Configure it in Workflows, then use our Redocly CLI `push` command to upload new and updated API definitions from your CI pipeline.

- You can now enable Java (JDK 11) and Java Apache (JDK 8) auto-generated code samples directly from Workflows. Find these options for your Reference docs in the **Settings > API reference settings > Code samples** section.


----

### 2021-03-12

**Features**

- Removed previews when the source branch is deleted.
- Improved large repo (or mono-repo) support by being able to target a path (user-interface to follow).

**Fixes**

- The invitee's email address is now case-insensitive.
- Resolved an issue with deleting an API version when it has dependent builds.

----

### 2021-03-11.1

**Fixes**

- Resolved an issue with invalid batch size that prevented Reference docs builds from triggering when previews were disabled in the settings.


----

### 2021-03-10.2

**Fixes**

- The process of joining a Redocly Workflows organization via an invitation email has been improved. It should now be easier for new organization members to accept the invitation and successfully complete the sign-up process.


----

### 2021-03-10.1

**Fixes**

- Removed a confusing redirect to the Overview page when changing the name of an API version, a Reference docs or a Developer portal project on the Settings > General page.


----

### 2021-03-09.2

**Fixes**

- Resolved an issue with the _Apply_ button behavior for HTTP Basic authentication settings on the Reference docs > Settings > Access control page.


----

### 2021-03-09.1

**Fixes**

- Resolved an issue that prevented the font family and font size units from being correctly saved in Reference docs > Settings > API reference settings > Live configuration. Your custom settings will now be saved instead of being overwritten by default values.

- Resolved a usability issue that allowed users to set an empty username and password for HTTP Basic authentication on the Reference docs > Settings > Access control page.


----

### 2021-03-05.3

**Fixes**

- Resolved an issue with Reference docs preview builds returning 404 on refresh for `section` pagination.


----

### 2021-03-05.2

**Features**

- Simplified pagination settings are now supported for Reference docs hosted in Workflows. You can configure them directly from the **Settings > API reference settings > Live configuration** page of your reference docs. In the **Pagination and layout** section, select the **Pagination type** from the dropdown. Supported options are `none` (all content on a single long page), `section` (each tag with a set of associated operations as a separate page), and `item` (each tag and operation items on separate pages).

**Deprecated**

- Old pagination-related settings for Reference docs are now deprecated and have been removed from the **Live configuration** page in Workflows.

**Fixes**

- Resolved an issue with unstable navigation for tags with nested Markdown headings in the Reference docs sidebar when the layout scope was set to `section`.


----

### 2021-03-05.1

**Fixes**

- Resolved a password recovery issue in Developer portal that affected portals with access control set to "Members only".


----

### 2021-03-02.1

**Fixes**

- Resolved an issue with multiple API versions in the same GitHub repository triggering multiple dependent (cascading) builds when only one of the versions had changes committed in a PR.


----

### 2021-03-01.1

**Fixes**

- Resolved an issue that affected user sessions in the Workflows app. Users who had a page open for more than one day (and their JWT token expired) would get an error when trying to navigate within the page instead of being redirected to the login page.


----


## February 2021

### 2021-02-26.2

**Fixes**

- For projects with a configured custom domain subdirectory (`example.com/docs`), visitors will be redirected by default to the project URL with a trailing slash (`example.com/docs/`).


----

### 2021-02-26.1

**Features**

- Workflows now supports subdirectories for custom domains, allowing you to set up more than one documentation project per custom domain. Previously, if a project had `example.com/docs` as a custom domain, you were not able to use `example.com/testing` for another project in your account. Now it's possible to do that, as well as to set up subdirectories for your projects without using a proxy. Your projects can also have subdirectories at different depths, such as `example.com/docs` in one project and `example.com/docs/internal` in another project. In this case, the longer path takes precedence and will be served when trying to directly access the shorter path.

_Note that custom domains are only supported in Professional and Enterprise pricing plans._

- To simplify the path prefix configuration process, we removed the **Advanced settings** page from Reference docs and Developer portal settings. The **Custom domain** field on the **Settings > General** page of your Reference docs or Developer portal is now the main place to configure a custom domain with an optional subdirectory.


----

### 2021-02-24.2

**Features**

- Workflows now supports an environment variable called `OPENAPI_CLI_LINT_ARGS` for adding extra arguments to the Redocly CLI `lint` command (for example, `OPENAPI_CLI_LINT_ARGS=--skip-rule no-enum-type-mismatch operation-2xx-response`). You can configure environment variables for your API definition builds in API registry > API version > Settings > Environment variables.


----

### 2021-02-24.1

**Fixes**

- The "Upgrade your plan" link on the Reference docs page for suspended projects was incorrectly leading to the Reference docs > Settings page. This issue has been resolved, and the link now leads to the Org settings > Billing page.


----

### 2021-02-23.3

**Features**

- When you sign up for a new account on Redocly Workflows, you can now provide more information about your API management and documentation needs. This will help us tailor our services to support you more adequately. You can also schedule a product tour directly from the sign-up dialog.


----

### 2021-02-23.1

**Fixes**

- Resolved an encoding mismatch issue that prevented the loading of logo and favicon images in Reference docs builds.


----

### 2021-02-16.1

**Fixes**

- Resolved an issue with failing builds reported by our customer.


----

### 2021-02-12.1

**Features**

- Implemented API catalog support for RBAC in Workflows.

**Fixes**

- Resolved an issue with search not working when Developer portal access control was changed to "Members only".


----

### 2021-02-08.1

**Fixes**

- Long names of API definitions and versions will no longer exceed the width of their containing UI element on the API version overview page.

- Resolved an issue with S3 and the Redocly CLI `push` command.


----

### 2021-02-07.2

**Fixes**

- Added missing `s3:PutObject` permission for GraphQL API to fix an issue with the Redocly CLI `push` command.

- Secrets stored in environment variables will no longer be logged when running portal builds. Additionally, any existing logs that contained secret values have been removed.


----


## January 2021

### 2021-01-30

**Features**

- Implemented a new flow for inviting members to an organization.

- The RBAC (Role-based access control) feature is now supported for Developer portals hosted in Workflows. Users can configure some of the RBAC settings from the Workflows interface, and define the rest in the configuration files in the developer portal project.

- Server-side search is now enabled by default for all Developer portals, significantly improving the speed and the overall user experience.

**Fixes**

- Resolved an issue with an inefficient GQL query that caused a timeout in cPanel.

- Improved the text in emails that are sent when usage limits are reached.

- API definitions that fail validation with errors will no longer be successfully bundled, and their log will now accurately reflect their failed status.

- The registry API now supports GZIP for file compression.


----

### 2021-01-13

**Features**

- You can now enable auto-generated Python and C# code samples in your Reference docs from the Workflows interface. Find the new options on the **Reference docs > Settings > API reference settings** page.

**Fixes**

- Resolved an API registry failure caused by insufficient disk space.

- Resolved a timeout issue that would cause the registry build to fail when there were too many dependent jobs.


----


## December 2020

### 2020-12-28

**Features**

- Implemented signing for files uploaded with the `openapi-cli push` command.


----

### 2020-12-21

**Features**

- When you invite new members to your Workflows organization, the invitation email they receive will be more informative and look better from now on.

**Fixes**

- Updated the sender ("from") address for emails sent by Redocly Workflows.

- Resolved a minor issue with the accordion for expanding job results.


----

### 2020-12-16

**Features**

- Integrated the new version of Reference docs with the "Try it" button in a new default location. You can now configure the appearance of this button from **Reference docs > Settings > API reference settings > Live configuration**.


----

### 2020-12-10

**Features**

- When inviting new members to your Workflows organization, you will see more detailed user role descriptions.

**Fixes**

- Resolved an issue with the Mermaid diagram rendering service that affected only newly created diagrams due to caching.


----

### 2020-12-07

**Features**

- Workflows now has a separate tab at the top called **Portals** for faster and more practical access to all developer portals in your organization. No more scrolling through the list of reference docs to get to the portals!


**Fixes**

- If there are any errors after you log in or sign up to Workflows, an informative message is now displayed to help you resolve the issue.

- ESLint cache is now enabled.


----


## November 2020

### 2020-11-25

**Features**

- When entering your password on the Workflows login or signup screen, you can now toggle password visibility.

**Fixes**

- Resolved an issue with setting the status for jobs without commit data.

- Aligned error messages to the center of the screen.

- Resolved an issue with URL polling.

- Added timeout and retry functionalities to GitLab calls.

- Resolved an issue with the filename auto-complete functionality in repositories when switching branches.


----

### 2020-11-17

**Fixes**

- Resolved an API registry issue with insufficient disk space reported by our customers.

- The on-premise license keys page was not available for some customers.


----

### 2020-11-16

**Features**

- Implemented a number of internal improvements to the service, including a unified logger and Sentry reporting.

**Fixes**

- Resolved an issue with some large API definitions causing a “no space” crash and impacting customer builds.


----

### 2020-11-14

**Fixes**

- Enabled Google Tag Manager and disabled Google Analytics for the service.


----

### 2020-11-11

**Features**

- All subscriptions are now anchored to the first day of the month at 00:00 UTC.

- All definition servers information is now saved to the `definition_job` table.


----

### 2020-11-09

**Features**

- When configuring GitHub as your API source, auto-complete is now supported for root API definition filenames.

- The Workflows interface now displays a **Show/Hide value** button for long environment variables in configuration pages.

**Fixes**

- Resolved an issue with setting the definition name from storage.

- After authorizing the GitHub Enterprise app, users will no longer be redirected to the wrong page.

- Links in the "Source" section of the API version overview page are no longer broken for GitHub Enterprise users, and now lead to the appropriate repositories.

- The "Upgrade plan" message will now be correctly shown when selecting the **Upgrade your plan** button on the API registry page.

- Added missing placeholder text for the "Documentation Reader" user role that should be displayed when the organization doesn't have any docs yet.

- When creating an API version and attempting to use an API version name that's already taken, the name validation error will no longer be displayed on the wrong page.

- The **Pay** button will now remain disabled until the "Your transaction is approved" page loads to prevent misclicks and errors during the checkout process.

- The source configuration dialog for portals no longer allows saving settings if the selected source is not a valid portal project.

- Implemented validation for the URL field in the GitHub Enterprise integration settings (on the **Org settings > Source control providers** page).

- Notification emails about usage limits now contain the organization name that the limits refer to. This makes usage management easier for customers with multiple organizations.

- Implemented a solution for handling root file changes in Bitbucket.


----

### 2020-11-02

**Fixes**

- Portal previews were inaccessible for branches with the `/` symbol in the name.

- Added a correct link to GitHub documentation in the GitHub source selection dialog.


----


## October 2020

### 2020-10-29

**Features**

- You can now enable auto-generated code samples for curl, JavaScript and Node.js in your Reference docs from the Workflows interface. Access these options on the **Reference docs > Settings > API reference settings** page.

**Fixes**

- Resolved an issue with lead source tracking.


----

### 2020-10-19

**Features**

- Redocly now supports the CORS proxy feature, which you can configure for your reference docs on the **Reference docs > Settings > API reference settings** page. CORS proxy is enabled by default for all newly created reference docs.

**Fixes**

- Resolved an issue with API crashing on partially refunded invoice status.

- Added the `portal` scope to on-premise license keys.

- Updated the contents of the initial starter email.

- Resolved an issue where invited users were unable to accept the invitation because of extra space in the email.


----

### 2020-10-16

**Fixes**

- Resolved issues with the "Try it" feature that would happen when API definitions contained server-variables or had empty body content.


----

### 2020-10-15

**Fixes**

- Set up a basic GTM dashboard for Workflows.

- Long branch names will no longer be displayed as cut off.


----

### 2020-10-12

**Features**

- An informative message is now displayed if your organization has any outstanding invoices.

- When you select a URL as the source of your API definition, Workflows now shows a helpful message if the provided URL responds with a non-200 status. Additionally, URLs that couldn't be accessed are now recorded in the service logs.

- Implemented support for a special environment variable `OPENAPI_CLI_BUNDLE_ARGS` in API versions. This allows you to pass extra arguments such as `--skip-decorator`.

**Fixes**

- Renamed "Redoc.ly" to "Redocly" on the login page.


----

### 2020-10-09

**Features**

- You can now try Redocly faster than ever! Extra steps have been removed from the start trial process to streamline the experience for you.


----

### 2020-10-08

**Features**

- You can now use environment variables for API version builds. On the Workflows side, environment variables can be configured from the **API registry > Settings > Environment variables** page for each API version in your organization.

- Memory resources for portal builds have been increased.


----

### 2020-10-05

**Features**

- Users can now remove their API key after creating it.

- The old Redocly logo has been replaced by the new one in the Workflows login page. Spot the difference!


----


## September 2020

### 2020-09-28

**Features**

- Workflows now supports Bitbucket Self-Managed (server and datacenter) as a source when adding your APIs to the registry. Additional Bitbucket-related configuration options are available in the **Org settings > Source control providers** page.

----

### 2020-09-24

**Features**

- Implemented support for OIDC implicit flow.

- Improved language and writing style throughout the Workflows interface.

**Fixes**

- Added a timeout for the success message on **Access control** and **API reference settings** pages.

- The **Last updated** timestamp is no longer missing from the list of developer portals.

- After successfully activating a Developer portal trial, users will now be redirected to the page from which they requested the trial.

- When adding or editing a source, it's no longer possible to save the source settings until all required fields are filled in.

- Resolved an issue with HTTP URLs in the GitHub Enterprise integration.

- Changed body background color.


----

### 2020-09-17

**Features**

- Anonymous (public) login with OIDC is now supported and configurable for Developer portals.

 **Fixes**

- Fixed Azure integration to support repository names with spaces.


----

### 2020-09-14

**Features**

- The **Live configuration** page for Reference docs has received many improvements.

- Customers on the Enterprise plan can now generate their own license keys for offline use from the **Org settings > On-premise license keys** page. Note that you must be an organization owner to use this feature.

- Developer portals now build two times faster thanks to a number of internal performance optimizations.

- Integrated the new version of Reference docs with support for OIDC and oAuth implicit.

**Fixes**

- Renamed the “Offline license keys” tab to “On-premise license keys” on the **Org settings** page.

- Fixed an issue with large files in GitHub mistakenly reported as non-existing.


----

### 2020-09-09

**Features**

- Added the "Password" label to the password field on the login page.


----

### 2020-09-08

**Fixes**

- API Registry validation hard errors (bugs in Redocly or general errors) are now saved to the database.

- Implemented a lot of minor UI improvements.


----

### 2020-09-03

**Features**

- Implemented OpenID Connect support for `access_token`.

- Path prefixes can now be configured for developer portals in their **Settings > Advanced** dialog. This allows you to serve documentation from non-root paths.

- Minor UI improvements have been made to the usage details on the **Org settings > Billing** page and the Stats section in **Reference docs > Overview**.

- Implemented the Mermaid diagram renderer microservice with support for remote rendering.


----

### 2020-09-01

**Features**

- OIDC is now supported as an IdP for access to the docs.

- Labels for GitLab sources have been renamed to improve their clarity.


----


## August 2020

### 2020-08-24

**Features**

- Improved Redocly CLI build speed (supported on Redocly CLI >=beta.9 and for API definitions from URLs and file uploads).

- Implemented a new UI for validation problems (supported on Redocly CLI >=beta.9 and for API definitions from URLs and file uploads).

- Multi-version Reference docs are now enabled for all pricing plans.

- Implemented accessibility fixes for Reference docs that have previously been added to Redoc.

- Implemented support for `x-webhooks` in Reference docs.

- Users can now automatically access the portal upon submitting the Typeform request.

----

### 2020-08-31

**Fixes**

- Resolved issues with root file validation caused by forward slashes (`/`).


----

### 2020-08-13

**Features**

- A guided tour is now displayed for new users when they first log into Workflows to improve the onboarding experience.

- Implemented support for API proxies. Workflows organization owners can configure proxies from the **Org settings > API gateways** page.

- The "Try it" feature in Reference docs is now enabled by default for newly created docs.

**Fixes**

- Resolved an issue with bundle uploads.

- Implemented several UI improvements.

- Resolved an issue with case sensitivity in authorization server headers.
