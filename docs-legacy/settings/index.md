---
seo:
  title: Settings
  description: Configure and manage organization-level settings
content:
  organization:
    cards:
      - header: Organization
        link: docs-legacy/settings/organization
        text: Change your organization or delete organization
      - header: Billing
        link: docs-legacy/settings/billing
        text: Manage current subscription details and view usage data across your projects
      - header: Labels
        link: docs-legacy/settings/labels
        text: Categorize and tag your API versions
      - header: API styleguide
        link: docs-legacy/settings/api-styleguide
        text: Ensure consistent API design across your organization
      - header: Security
        link: docs-legacy/settings/security
        text: Access compliance reports for Redocly services
  apiAndLicenseKeys:
    cards:
      - header: API keys
        link: docs-legacy/settings/api-keys
        text: Manage your organization's API keys
      - header: On premise license keys
        link: docs-legacy/settings/on-premise-license-keys
        text: Information on managing a license key in order to use Redocly on-premise
      - header: Personal API keys
        link: docs-legacy/settings/personal-api-keys
        text: Generate a personal API key to use our products
  providers:
    cards:
      - header: Identity providers
        link: docs-legacy/settings/identity-providers
        text: Set up and manage identity providers (IdPs) for storing and authenticating user identities
      - header: Access control
        link: docs-legacy/settings/access-control
        text: Manage access control at both the organization and project level
      - header: Role privileges
        link: docs-legacy/settings/role-privileges
        text: Configure role privileges across Workflows
  sourceControl:
    cards:
      - header: Source control providers
        link: docs-legacy/settings/source-control-providers
        text: Configure settings across different source control providers
excludeFromSearch: true

---

# Settings

Use these resources to manage your organizational settings.

## Organization

{% wideTileCards content=$frontmatter.content.organization /%}

## API and license keys

{% wideTileCards content=$frontmatter.content.apiAndLicenseKeys /%}

## Identity providers, access control and role privileges

{% wideTileCards content=$frontmatter.content.providers /%}

## Source control

{% wideTileCards content=$frontmatter.content.sourceControl /%}
