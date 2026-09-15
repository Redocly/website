---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
game:
  title: SSO quest
  cta: Play the SSO quest
  intro: Let our guide walk you through this page, with quick questions and a round of golf.
  labels:
    matchDone: Every IdP group now lands on the right Redocly team.
    matchMissed: >-
      Re-read the mapping rules above: default teams give organization roles,
      RBAC teams give project roles.
---
# Add an identity provider (IdP)

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Add SSO identity providers in Reunite, so users can use them for logging into Reunite as well as individual projects.
After you have added an IdP in Reunite, the identity provider can then be configured in the `redocly.yaml` configuration file for individual projects.

{% gameStep id="intro" title="Welcome" mood="point" %}
  {% gameSay %}
  Hi! I'm your SSO guide. This page can feel dense, so let's walk through it together.
  I'll stop at each section, point out what matters, and ask a quick question now and then.
  {% /gameSay %}
{% /gameStep %}

## Before you begin

Make sure you have the following:

- a SAML 2 or OpenID Connect-based identity provider
- the following information about your identity provider:
  - SAML 2
    - Single sign on URL
    - Issuer ID
    - x509 public certificate
    - NameID format set to email address
    - the following standard SAML attributes (claims) are supported:
      - `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname`
      - `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname`
      - `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`
  - OpenID Connect
    - either a configuration JSON or URL
    - Client ID
    - Client Secret
- `owner` role in your organization

{% gameStep id="before-you-begin" title="Gather what you need" %}
  {% gameSay %}
  Before touching Reunite, collect the details from your identity provider. The list differs for SAML 2 and OpenID Connect.
  {% /gameSay %}
  {% gameQuestion %}
  Your IdP team sent you a **Client ID** and a **Client Secret**. Which protocol are you setting up?
  {% gameOption correct=true feedback="Client ID and Client Secret are OpenID Connect credentials. For SAML 2 you would get an SSO URL, an Issuer ID, and an x509 certificate instead." %}
  OpenID Connect
  {% /gameOption %}
  {% gameOption feedback="SAML 2 uses a single sign-on URL, an Issuer ID, and an x509 public certificate — not a client secret." %}
  SAML 2
  {% /gameOption %}
  {% gameOption feedback="Nope — the two protocols use different sets of values, so the credentials tell you which one you have." %}
  Either, they use the same values
  {% /gameOption %}
  {% /gameQuestion %}
{% /gameStep %}

## Add a Corporate identity provider (IdP)

Corporate identity providers authenticate internal users into Reunite and projects.
You can add multiple Corporate identity providers for your organization and target a specific one at project login by configuring [`access.idps`](../../../config/access/idps.md).

1. In your Organization's workspace, in the navigation menu, select **Access** > **SSO and login**.
1. Click the **Add** button and from the dropdown list select either **SAML 2** or **OpenID Connect**.
1. Complete the form based on the information you have gathered about your SSO identity provider.
   In the **Login type** dropdown, select **Corporate**.
1. Click **Save**.

{% gameStep id="corporate-vs-guest" title="Corporate or Guest?" %}
  {% gameSay %}
  Reunite has two kinds of identity providers. The only difference in the form is the **Login type** dropdown, but the audience is very different.
  {% /gameSay %}
  {% gameQuestion %}
  A partner company needs to read your deployed API docs, but they must never get into Reunite itself. Which login type do you pick for their IdP?
  {% gameOption correct=true feedback="Guest IdPs authenticate external users into projects only." %}
  Guest
  {% /gameOption %}
  {% gameOption feedback="Corporate IdPs authenticate internal users into Reunite *and* projects — too much access for a partner." %}
  Corporate
  {% /gameOption %}
  {% /gameQuestion %}
{% /gameStep %}

## Add a Guest identity provider (IdP)

Guest identity providers authenticate external users into projects.
You can add multiple Guest identity providers for your organization and target a specific one at project login by configuring [`access.idps`](../../../config/access/idps.md).

1. In your Organization's workspace, in the navigation menu, select **Access** > **SSO and login**.
1. Click the **Add** button and from the dropdown list select either **SAML 2** or **OpenID Connect**.
1. Complete the form based on the information you have gathered about your SSO identity provider.
   In the **Login type** dropdown, select **Guest**.
1. Click **Save**.


## Team mapping

{% partial file="../../../_partials/team-mapping.md" /%}

To map IdP groups to Redocly default teams or project RBAC teams:

1. Select the **Configure team attribute mapping** or **Configure team claim mapping** checkbox.
1. Enter the IdP group name in the Value text box on the left side.
1. Enter the [Redocly default team tied to an organization role](../../../access/roles.md#reserved-organization-role-names) or [project's RBAC team name](../../../config/access/rbac.md#team-to-role-map) into the **Team** text box on the right side.
1. Click the **Add mapping** button to add additional mappings as needed.
1. Click **Save**.

When users assigned to those groups in your IdP log in to Reunite, they have the project or organization role access assigned to those teams.

{% gameStep id="team-mapping" title="The step everyone skips" type="match" highlight=true badge="Most skipped step" sign="Everyone skips this. Don't." leftLabel="IdP groups" rightLabel="Redocly teams" allowedMistakes=1 %}
  {% gameSay %}
  Plot twist: adding an IdP only proves *who* someone is. Without **team mapping** every SSO user lands in Reunite with… nothing.
  Then the tickets start: "I logged in but can't see the project." This is the part people scroll past — let's not.
  {% /gameSay %}
  {% gameQuestion %}
  Connect each IdP group to the Redocly team it should map to:
  {% /gameQuestion %}
  {% gamePair left="idp: platform-owners" right="Owner (default team)" /%}
  {% gamePair left="idp: api-writers" right="Writer (default team)" /%}
  {% gamePair left="idp: partner-readers" right="partners-readonly (project RBAC team)" /%}
  {% gamePair left="idp: billing" right="Billing (default team)" /%}
{% /gameStep %}

## Verified domains

{% partial file="../../../_partials/verified-domains.md" /%}

## Require SSO authentication

You can require all members of your Redocly organization to log in to Reunite with SSO credentials.
Before you proceed, verify that users are able to log in using your IdPs.

{% admonition type="danger" name="Risk of admin lockout" %}
If you select **Require SSO authentication for all members** and save without validating your IdP connection, you risk getting locked out of Reunite.
To prevent losing access to Reunite, click the **Test connection** button and make sure you are able to authenticate before saving.
{% /admonition %}

This setting doesn't affect how users access your deployed project.
To require login to your project, you must configure `rbac` or `requiresLogin`.
See [Configure RBAC](../../../access/index.md) or [requiresLogin](../../../config/access/requires-login.md) for configuration instructions.

To require SSO authentication:

1. Select the **Require SSO authentication for all members** checkbox.
1. Click the **Test connection** button.
1. In the window that opens, authenticate in your IdP.
1. If you were able to authenticate successfully, click **Save**.

After you save, organization members must authenticate with an IdP to access Reunite.
If they do not have SSO credentials, they lose access to the organization.

{% gameStep id="require-sso" title="Don't lock yourself out" type="golf" mood="point" %}
  {% gameSay %}
  This is the one setting on the page that can hurt. Once **Require SSO authentication for all members** is saved, password logins stop working for everyone — including you.
  {% /gameSay %}
  {% gameQuestion %}
  You have just added an IdP and want to require SSO for everybody. What do you do *before* clicking **Save**?
  {% gameOption correct=true feedback="Test connection opens your IdP login; only save once you have authenticated successfully." %}
  Click **Test connection** and make sure you can log in through the IdP
  {% /gameOption %}
  {% gameOption feedback="If the IdP is misconfigured you will be locked out along with everyone else." %}
  Just save — members can always fall back to their password
  {% /gameOption %}
  {% gameOption feedback="Deployed projects are controlled separately by `rbac` or `requiresLogin`; this checkbox only affects Reunite." %}
  Enable it on the project first, because it protects deployed docs too
  {% /gameOption %}
  {% /gameQuestion %}
{% /gameStep %}

## Resources

- **[Configure SCIM](./configure-scim.md)** - Enable SCIM 2.0 provisioning and deprovisioning for an identity provider (early access on request)
- **[Configure SSO](./configure-sso.md)** - Specify which identity providers users can access or disable SSO entirely for your project authentication settings
- **[Configure RBAC](../../../access/index.md)** - Limit user access to specific pages and features in your project and Reunite using role-based access control
- **[SSO configuration reference](../../../config/access/sso.md)** - Complete technical reference for all available SSO configuration options and implementation details
- **[Single sign-on (SSO) concepts](./sso.md)** - Understand different identity provider categories and their configuration options for both Reunite and redocly.yaml file setup
- **[Role-based access control (RBAC) concepts](../../../access/rbac.md)** - Understand the components and architecture of Redocly's role-based access control system
- **[RBAC configuration reference](../../../config/access/rbac.md)** - Examples and configuration options for implementing RBAC in your redocly.yaml file with detailed setup instructions
