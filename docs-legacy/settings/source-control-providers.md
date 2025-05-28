---
excludeFromSearch: true
---

# Source control providers

If you are on an Enterprise plan, you can connect your source control to offer continuous validation and delivery of your APIs, reference docs, and developer portals.

From the Source control providers page, you can configure settings for:

- [Source control providers](#source-control-providers)
  - [GitHub Enterprise](#github-enterprise)
  - [Azure](#azure)
  - [Self-managed GitLab](#self-managed-gitlab)
  - [Self-managed Bitbucket](#self-managed-bitbucket)

{% admonition type="info" %}

- You will need an Enterprise-level Redocly plan to connect to GitHub Enterprise, Azure or Bitbucket self-managed.
- You will need a Pro Redocly plan to use GitLab self-managed.
{% /admonition %}

## GitHub Enterprise

1. Using Workflows, navigate to **Settings > Source control providers**.

2. On the Source control providers page, under GitHub Enterprise, complete the details to connect to your GitHub Enterprise account.

3. Select **Save Github Enterprise Settings** to save your changes and connect your account.

Once you have connected your account, it works similar to the [GitHub integration source](../workflows/sources/github.md).

## Azure

{% partial file="../_snippets/source-azure-connection.md" /%}

## Self-managed GitLab

{% partial file="../_snippets/source-gitlab-self-managed-connection.md" /%}

## Self-managed Bitbucket

You can use **Bitbucket Server** or **Bitbucket Data center** as a source for your API versions, reference docs and developer portal projects.

{% partial file="../_snippets/source-bitbucket-self-managed-connection.md" /%}
