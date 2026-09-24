---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise+
---
# Audit logs

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Audit logs record the actions performed in your Redocly organization.
Each event includes details such as who performed the action, what the action was, and when it happened.

Reunite has no audit logs page.
Export the audit logs through the Reunite API as a JSON or CSV file, then load it into your Security Information and Event Management tools, or keep it as evidence for a compliance review.
An export runs as a job: you start the job, check its status, then download the file.

## Before you begin

Make sure you have the following:

- An organization on a plan that includes audit logs.
- An [API key](./api-keys.md) with the `org.auditLogs.read` permission.
  Organization owners have this permission by default.
- Your organization ID, which starts with `org_`.
  To find it, select **General** in the navigation menu on the left side of the page, and copy the value of the **ID** field.
  The organization ID differs from the organization slug that appears in the Reunite URL.

## Export audit logs using Reunite API

To export the audit logs for your organization, use the Replay consoles embedded on this page.

Each request in this guide sends the API key as a bearer token:

```http
Authorization: Bearer <your-api-key>
```

{% admonition type="info" name="Mock server" %}
The consoles on this page open on **Mock server**, which returns example data instead of your audit logs.
{% /admonition %}

### Send requests to your organization

{% numbered-list size="small" %}
  {% numbered-item %}
  In the environment selector, choose **Reunite API**.
  {% /numbered-item %}
  {% numbered-item %}
  Expand the **Authorization** section and paste your API key.
  {% /numbered-item %}
  {% numbered-item %}
  In the **Path** tab, set the **orgId** value to your organization ID.
  {% /numbered-item %}
{% /numbered-list %}

### Start an export job

Send a request to create the export job.

{% numbered-list size="small" %}
  {% numbered-item %}
  Set `start` and `end` to the time range you need, and `format` to `json` or `csv`.
  The range must not exceed 31 days.
  When you omit both dates, the export covers the last month.
  {% /numbered-item %}
  {% numbered-item %}
  To limit the export to specific event types, set `filter` to `type:` followed by one or more event types separated by commas, such as `type:com.redocly.apiKey.created,com.redocly.apiKey.revoked`.
  The [Event types](#event-types) section lists every value the filter accepts.
  Omit the filter to export every type.
  {% /numbered-item %}
  {% numbered-item %}
  Send the request.
  The response returns the job `id`, which starts with `exp_`.
  Copy this value to use it in the next sections.

  {% replay-openapi
    descriptionFile="../../openapi-files/reunite-audit-logs.yaml"
    operationId="createAuditLogExportJob"
    parameters={
      path: {
        orgId: "org_01hh1t9sa6gwfv5naz04gr7ehm"
      },
      query: {
        start: "2026-08-01",
        end: "2026-08-31",
        format: "json"
      }
    }
  /%}
  {% /numbered-item %}
{% /numbered-list %}

### Check the job status

The export runs in the background.

{% numbered-list size="small" %}
  {% numbered-item %}
  Send the job `id` you received [after starting the export job](#start-an-export-job) to check whether the file is ready.

  {% replay-openapi
    descriptionFile="../../openapi-files/reunite-audit-logs.yaml"
    operationId="getAuditLogExportJob"
    parameters={
      path: {
        orgId: "org_01hh1t9sa6gwfv5naz04gr7ehm",
        exportJobId: "exp_01hh1t9sa6gwfv5naz04gr7ehm"
      }
    }
  /%}
  {% /numbered-item %}
  {% numbered-item %}
  Check the `status` field in the response, which returns one of three values:

  - `IN_PROGRESS`: the export is still running.
    Send the request again in a few seconds.
  - `COMPLETED`: the file is ready to download.
  - `FAILED`: the export did not finish.
    Start a new job, and contact support if the failure repeats.
  {% /numbered-item %}
{% /numbered-list %}

### Download the export file

{% numbered-list size="small" %}
  {% numbered-item %}
  After the status is `COMPLETED`, send the request to download the file.

  {% replay-openapi
    descriptionFile="../../openapi-files/reunite-audit-logs.yaml"
    operationId="getAuditLogExportResult"
    parameters={
      path: {
        orgId: "org_01hh1t9sa6gwfv5naz04gr7ehm",
        exportJobId: "exp_01hh1t9sa6gwfv5naz04gr7ehm"
      }
    }
  /%}
  {% /numbered-item %}
  {% numbered-item %}
  The response body holds the events, newest first, in the format you chose in the [Start an export job](#start-an-export-job) section.
  The `Content-Disposition` header suggests a file name.
  Until the job completes, this request returns `404`.
  {% /numbered-item %}
{% /numbered-list %}

## Event reference

Reference for the fields in each exported event and the event types the audit log records.

### Event fields

Every event in an export has the following fields.

{% table %}

- Field
- Type
- Description

---

- id
- string
- The identifier of the event.

---

- object
- string
- The entity name.
  Always `event`.

---

- type
- string
- The type of the recorded action, such as `com.redocly.pullRequest.merged`.
  See [Event types](#event-types).

---

- time
- string
- The time when the action happened, in ISO 8601 format (UTC).

---

- subject
- string
- The identifier of the resource that the action applied to.
  The prefix indicates the resource type, such as `usr_` for a user or `pr_` for a pull request.

---

- actor
- [Actor object](#actor-object) | null
- Who or what triggered the action.
  `null` when no user, webhook, or scheduled job triggered the action.

---

- clientIp
- string
- The IP address of the client that triggered the action.

---

- projectId
- string
- The identifier of the project.
  Empty for organization-level events.

---

- projectSlug
- string
- The slug of the project.
  Empty for organization-level events.

{% /table %}

#### Actor object

{% table %}

- Field
- Type
- Description

---

- id
- string
- The identifier of the actor.

---

- object
- string
- The type of actor.
  Possible values: `user`, `webhook`, `cronJob`.

---

- uri
- string
- The URL of the actor in the Reunite API.

{% /table %}

### Event types

The export includes the following event types.
Use any of them as a value of the `filter` parameter in the [Start an export job](#start-an-export-job) section.

#### API keys

{% table %}

- Event type
- Description

---

- com.redocly.apiKey.created
- An API key was created.

---

- com.redocly.apiKey.updated
- An API key was updated.

---

- com.redocly.apiKey.revoked
- An API key was revoked.

{% /table %}

#### Invites and memberships

{% table %}

- Event type
- Description

---

- com.redocly.invite.created
- A user was invited to the organization.

---

- com.redocly.invite.resent
- An invitation was sent again.

---

- com.redocly.userInvite.accepted
- An invitation was accepted.

---

- com.redocly.membership.created
- A user was added to the organization.

---

- com.redocly.membership.updated
- A membership attribute was updated, such as a role change.

---

- com.redocly.membership.removed
- A user was removed from the organization.

{% /table %}

#### Teams

{% table %}

- Event type
- Description

---

- com.redocly.team.created
- A team was created.

---

- com.redocly.team.deleted
- A team was deleted.

---

- com.redocly.teamMember.added
- A user was added to a team.

---

- com.redocly.teamMember.removed
- A user was removed from a team.

---

- com.redocly.teamManager.added
- A user was made a team manager.

---

- com.redocly.teamManager.removed
- A user's team manager role was removed.

{% /table %}

#### Organizations

{% table %}

- Event type
- Description

---

- com.redocly.organization.created
- The organization was created.

---

- com.redocly.organization.updated
- Organization settings were updated.

---

- com.redocly.organization.slugUpdated
- The organization slug was changed.

---

- com.redocly.organization.removed
- The organization was deleted.

{% /table %}

#### Projects

{% table %}

- Event type
- Description

---

- com.redocly.project.created
- A project was created.

---

- com.redocly.project.updated
- Project settings were updated.

---

- com.redocly.project.slugUpdated
- The project slug was changed.

---

- com.redocly.project.urlUpdated
- The project URL was changed.

---

- com.redocly.project.removed
- A project was deleted.

---

- com.redocly.projectConfig.updated
- The project configuration was updated.

{% /table %}

#### Branches

{% table %}

- Event type
- Description

---

- com.redocly.branch.created
- A branch was created.

---

- com.redocly.branch.updated
- A branch was updated.

---

- com.redocly.branch.removed
- A branch was deleted.

{% /table %}

#### Custom domains

{% table %}

- Event type
- Description

---

- com.redocly.projectCustomDomain.verified
- A custom domain was verified for a project.

---

- com.redocly.projectCustomDomain.removed
- A custom domain was removed from a project.

{% /table %}

#### Remote content

{% table %}

- Event type
- Description

---

- com.redocly.remote.created
- A remote content source was added.

---

- com.redocly.remote.deleted
- A remote content source was deleted.

{% /table %}

#### Notifications

{% table %}

- Event type
- Description

---

- com.redocly.notificationSettings.updated
- Notification settings were updated.

---

- com.redocly.notifications.disabled
- A user's notifications were disabled.

{% /table %}

#### Subscription

{% table %}

- Event type
- Description

---

- com.redocly.subscription.updated
- The subscription was updated.

---

- com.redocly.subscription.churned
- The subscription was canceled.

---

- com.redocly.subscription.reactivated
- The subscription was reactivated.

---

- com.redocly.subscription.trialEnded
- The trial period ended.

{% /table %}

#### Pull requests

{% table %}

- Event type
- Description

---

- com.redocly.pullRequest.created
- A pull request was opened.

---

- com.redocly.pullRequest.closed
- A pull request was closed without merging.

---

- com.redocly.pullRequest.reopened
- A closed pull request was reopened.

---

- com.redocly.pullRequest.merged
- A pull request was merged.

---

- com.redocly.pullRequest.approved
- A reviewer approved a pull request.

---

- com.redocly.pullRequest.requestedChanges
- A reviewer requested changes on a pull request.

---

- com.redocly.pullRequest.reviewRequested
- A review was requested from a user or team.

---

- com.redocly.pullRequest.readyForReview
- A draft pull request was marked as ready for review.

---

- com.redocly.pullRequest.markedAsDraft
- A pull request was converted to a draft.

---

- com.redocly.pullRequest.commented
- A comment was added to a pull request.

---

- com.redocly.pullRequest.commitPushed
- A commit was pushed to a pull request branch.

---

- com.redocly.pullRequest.forcePushed
- A pull request branch was force-pushed.

---

- com.redocly.pullRequest.visualReviewUpdated
- The visual review of a pull request was updated.

{% /table %}

## Resources

- **[Manage API keys](./api-keys.md)** - Create the key that authenticates your audit log exports and set the permissions it grants
- **[Teams and users](./teams.md)** - Organize users into teams with role-based permissions for effective collaboration and access control
- **[Compliance reports](./access-compliance-reports.md)** - Download Redocly's SOC 2, penetration test, and CAIQ reports for your security reviews
- **[Roles and permissions](../../access/roles.md)** - Review which role grants the permission to read audit logs
