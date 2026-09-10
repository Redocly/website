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

The audit log is the record of who did what in your Redocly organization.
Redocly records an event every time someone signs in, changes access, or changes content.
Each event names the actor, the action, the affected resource, the time, and the client IP address.

Use the audit log to answer questions your security and compliance teams ask, such as:

- Who added this person to the organization, and when?
- Who created or revoked API keys last month?
- Who approved and merged the change that went live on Tuesday?
- Which accounts had failed sign-in attempts?

Export the audit log through the Reunite API.
An export runs as a job: you start the job, check its status, then download the file as JSON or CSV.
Feed the file into your SIEM, your data warehouse, or an evidence folder for an audit.

## Recorded events

The audit log covers the actions that change access or content in your organization.

{% table %}

- Category
- Event types

---

- Users and sign-ins
- `com.redocly.user.created`, `com.redocly.user.updated`, `com.redocly.user.firstLoggedIn`, `com.redocly.user.loggedIn`, `com.redocly.user.loginFailed`

---

- API keys
- `com.redocly.apiKey.created`, `com.redocly.apiKey.updated`, `com.redocly.apiKey.revoked`

---

- Invites and memberships
- `com.redocly.invite.created`, `com.redocly.invite.resent`, `com.redocly.userInvite.accepted`, `com.redocly.membership.created`, `com.redocly.membership.updated`, `com.redocly.membership.removed`

---

- Teams
- `com.redocly.team.created`, `com.redocly.team.deleted`, `com.redocly.teamMember.added`, `com.redocly.teamMember.removed`, `com.redocly.teamManager.added`, `com.redocly.teamManager.removed`

---

- Organizations
- `com.redocly.organization.created`, `com.redocly.organization.updated`, `com.redocly.organization.slugUpdated`, `com.redocly.organization.removed`

---

- Projects
- `com.redocly.project.created`, `com.redocly.project.updated`, `com.redocly.project.slugUpdated`, `com.redocly.project.urlUpdated`, `com.redocly.project.removed`, `com.redocly.projectConfig.updated`

---

- Branches
- `com.redocly.branch.created`, `com.redocly.branch.updated`, `com.redocly.branch.removed`

---

- Custom domains
- `com.redocly.projectCustomDomain.verified`, `com.redocly.projectCustomDomain.removed`

---

- Remote content
- `com.redocly.remote.created`, `com.redocly.remote.deleted`

---

- Notifications
- `com.redocly.notificationSettings.updated`, `com.redocly.notifications.disabled`

---

- Subscription
- `com.redocly.subscription.updated`, `com.redocly.subscription.churned`, `com.redocly.subscription.reactivated`, `com.redocly.subscription.trial-ended`

---

- Pull requests
- `com.redocly.pullRequest.created`, `com.redocly.pullRequest.closed`, `com.redocly.pullRequest.reopened`, `com.redocly.pullRequest.merged`,
  `com.redocly.pullRequest.approved`, `com.redocly.pullRequest.requestedChanges`, `com.redocly.pullRequest.reviewRequested`, `com.redocly.pullRequest.readyForReview`,
  `com.redocly.pullRequest.markedAsDraft`, `com.redocly.pullRequest.commented`, `com.redocly.pullRequest.commitPushed`, `com.redocly.pullRequest.forcePushed`,
  `com.redocly.pullRequest.visualReviewUpdated`

{% /table %}

### Event record fields

Every record in an export has the following fields.

{% table %}

- Field
- Type
- Description

---

- id
- string
- Identifier of the event.

---

- object
- string
- Entity name.
  Always `event`.

---

- type
- string
- Type of the recorded action, such as `com.redocly.pullRequest.merged`.

---

- time
- string
- Time when the action happened, in ISO 8601 format.

---

- subject
- string
- Identifier of the resource that the action applied to.

---

- actor
- [Actor object](#actor-object) | null
- Who or what triggered the action.
  Empty for events without an actor.

---

- clientIp
- string
- IP address of the client that triggered the action.

---

- projectId
- string
- Identifier of the project, for project-scoped actions.

---

- projectSlug
- string
- Slug of the project, for project-scoped actions.

{% /table %}

#### Actor object

{% table %}

- Field
- Type
- Description

---

- id
- string
- Identifier of the actor.

---

- object
- string
- Kind of actor.
  Possible values: `user`, `webhook`, `cronJob`.

---

- uri
- string
- API address of the actor.

{% /table %}

## Before you begin

Make sure you have the following before you begin:

- An organization on a plan that includes audit logs.
- An [API key](./api-keys.md) with the `org.auditLogs.read` permission.
  Organization owners have this permission by default.
- Your organization ID, which starts with `org_`.
  To find it, select **General** in the navigation menu on the left side of the page, and copy the value of the **ID** field.
  The organization ID differs from the organization slug that appears in the Reunite URL.

Each request in this guide sends the API key as a bearer token:

```http
Authorization: Bearer <your-api-key>
```

To send the requests from this page, expand the **Authorization** section of the console and paste your API key.
Replace `org_01hh1t9sa6gwfv5naz04gr7ehm` with your organization ID.

## Step 1: Start an export job

Send a request to create the export job.
Set `start` and `end` to the time range you need, and `format` to `json` or `csv`.
The range must not exceed 31 days, and the export covers the last month when you omit both dates.
Add a `filter` such as `type:com.redocly.apiKey.revoked` to limit the export to one event type.
Separate several event types with commas, or omit the filter to export every type.
The [Recorded events](#recorded-events) table lists every value the `type` filter accepts.

The response returns the job `id`, which starts with `exp_`.
Copy that value: the next two steps need it.

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

## Step 2: Check the job status

The export runs in the background.
Send the job `id` from step 1 to check whether the file is ready.

The `status` field returns one of three values:

- `IN_PROGRESS`: the export is still running.
  Send the request again in a few seconds.
- `COMPLETED`: the file is ready to download.
- `FAILED`: the export did not finish.
  Start a new job, and contact support if the failure repeats.

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

## Step 3: Download the export file

After the status is `COMPLETED`, download the file.
The response body holds the events in the format you asked for, and the `Content-Disposition` header suggests a file name.
Until the job completes, this request returns `404`.

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

## Resources

- **[Manage API keys](./api-keys.md)** - Create the key that authenticates your audit log exports and set the permissions it grants
- **[Teams and users](./teams.md)** - Organize users into teams with role-based permissions for effective collaboration and access control
- **[Compliance reports](./access-compliance-reports.md)** - Download Redocly's SOC 2, penetration test, and CAIQ reports for your security reviews
- **[Roles and permissions](../../access/roles.md)** - Review which role grants the permission to read audit logs
