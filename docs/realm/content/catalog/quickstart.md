# Quickstart

Get started with the catalog by defining your first entities using YAML files.
This guide walks you through creating entity definition files and understanding the key properties.

{% code-walkthrough
  filesets=[
    {
      "files": [
        "./code-walkthrough-files/order-service.entity.yaml",
        "./code-walkthrough-files/commerce-team.entity.yaml",
        "./code-walkthrough-files/catalog-entries.entities.yaml"
      ]
    }
  ]
%}

## Create your first entity

Entity definition files are YAML files that describe items in your catalog.
Create a file with the `.entity.yaml` extension anywhere in your project.

{% step id="basic-info" heading="Define basic information" %}

Every entity requires three fields:

- **type** - The entity type (for example, `service`, `domain`, `team`)
- **key** - A unique identifier in kebab-case
- **title** - A human-readable name

```yaml
type: service
key: order-service
title: Order Service
```

{% /step %}

{% step id="summary-tags" heading="Add summary and tags" %}

Make your entity discoverable with a summary and tags:

- **summary** - A brief description (max 500 characters)
- **tags** - An array of labels for categorization

Tags help users filter and find related entities in the catalog.

{% /step %}

{% step id="version" heading="Specify a version" %}

Track entity versions using semantic versioning:

```yaml
version: '1.0.0'
```

Versions let you maintain multiple releases of the same entity.
The catalog automatically shows the highest semantic version as the current version.

You can also version entities using folder structure with `@v1/`, `@v2/` naming.

{% /step %}

{% step id="metadata" heading="Add custom metadata" %}

Store additional information in the `metadata` object:

```yaml
metadata:
  repository: https://github.com/example/order-service
  language: Go
  status: production
```

Metadata is flexible - add any key-value pairs relevant to your organization.
Custom entity types can define metadata schemas for validation.

{% /step %}

{% step id="contact" heading="Configure contact information" %}

Help teams reach the right people by adding contact details:

```yaml
contact:
  slack:
    channels:
      - name: order-support
        url: https://slack.com/channels/order-support
```

Contact information appears on the entity detail page.

{% /step %}

{% step id="links" heading="Add related links" %}

Connect entities to relevant resources:

```yaml
links:
  - label: API Reference
    url: /api-docs/orders.yaml
  - label: Documentation
    url: /docs/order-service/
```

Each link requires a `label` and `url`.
Links appear in the entity sidebar.

{% /step %}

{% step id="relations" heading="Define relationships" %}

Connect entities to show dependencies and ownership:

```yaml
relations:
  - type: dependsOn
    key: payment-service
  - type: ownedBy
    key: commerce-team
```

Common relation types include:
- `dependsOn` / `dependencyOf` - Service dependencies
- `ownedBy` / `owns` - Team ownership
- `partOf` / `hasParts` - Composition

{% /step %}

## Define teams and domains

{% step id="team-entity" heading="Create a team entity" %}

Teams represent groups of people responsible for entities.
Switch to `commerce-team.entity.yaml` to see a team definition.

Team entities use the `team` type and typically include department metadata.

{% /step %}

## Define multiple entities in one file

{% step id="multiple-entities" heading="Use .entities.yaml for multiple entities" %}

Files ending with `.entities.yaml` can contain multiple entities as a YAML array.
Switch to `catalog-entries.entities.yaml` to see this pattern.

This is useful for:
- Grouping related entities
- Bulk entity definitions
- Reducing file count

{% /step %}

{% /code-walkthrough %}

## Next steps

After creating your entity files, the catalog automatically discovers and indexes them during build.

- **[Entity types](./entity-types.md)** - Learn about built-in and custom entity types
- **[Entity relations](./entity-relations.md)** - Model dependencies and ownership
- **[Versions and revisions](./versions-and-revisions.md)** - Track entity changes over time
- **[Manage via API](./api-management.md)** - Create entities programmatically
