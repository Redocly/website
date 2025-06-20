# Catalog entity

Use entities to define structured data about resources in your organization, including APIs, services, teams, and domains. This document provides a reference for the properties you can use to define entities.

## Entity structure

Define entities in files with `*.entity.yaml` or `*.entities.yaml` extensions.

{% table %}

- Property
- Type
- Description

---

- type
- string
- **REQUIRED.**
  Entity type.
  Possible values: `service`, `domain`, `team`, `user`, `api-description`

---

- key
- string
- **REQUIRED.**
  Globally unique identifier for the entity.
  Use kebab-case (e.g., `payments-api`, `platform-team`)

---

- title
- string
- **REQUIRED.**
  Human-readable name for the entity.

---

- summary
- string
- Brief, plain-text summary of the entity.

---

- version
- string
- Version of the entity.
  Example: `"2.1.0"`, `"v1.2"`

---

- tags
- [string]
- Array of strings for categorization and filtering.
  Example: `[payments, microservice, critical]`

---

- relations
- [[Relation object](#relation-object)]
- List of relationships to other entities.

---

- metadata
- object
- Custom key-value data. For specific requirements, see [Metadata objects](#metadata-objects).

---

- git
- [string]
- List of source control repository URLs.

---

- contact
- [Contact object](#contact-object)
- Contact information.

---

- links
- [[Link](#link-object)]
- List of external links related to the entity.

{% /table %}

## Relation object

{% table %}

- Property
- Type
- Description

---

- type
- string
- **REQUIRED.**
  Relationship type.
  Common values: `ownedBy`, `partOf`, `dependsOn`, `consumesApi`, `implements`, `hasMember`, `owns`, `memberOf`

---

- key
- string
- **REQUIRED.**
  Key of the target entity in the relationship.

{% /table %}

## Contact object

{% table %}

- Property
- Type
- Description

---

- slack
- [Slack object](#slack-object)
- Slack contact information.

{% /table %}

### Slack object

{% table %}

- Property
- Type
- Description

---

- channels
- [[Channel](#channel-object)]
- List of Slack channels.

{% /table %}

#### Channel object

{% table %}

- Property
- Type
- Description

---

- name
- string
- **REQUIRED.**
  Name of the Slack channel (without #).

{% /table %}

## Link object

{% table %}

- Property
- Type
- Description

---

- label
- string
- **REQUIRED.**
  Display name for the link.

---

- url
- string
- **REQUIRED.**
  URL destination for the link.

{% /table %}

## Metadata objects

Metadata requirements vary by entity type.

### User metadata

{% table %}

- Property
- Type
- Description

---

- email
- string
- **REQUIRED.**
  Email address of the user.

{% /table %}

### API description metadata

{% table %}

- Property
- Type
- Description

---

- specType
- string
- **REQUIRED.**
  API specification type.
  Possible values: `jsonschema`, `openapi`, `asyncapi`, `avro`, `zod`, `graphql`, `protobuf`, `arazzo`

---

- schema
- string
- **REQUIRED.**
  Inline schema of the API description as a JSON string.

---

- descriptionFile
- string
- **REQUIRED.**
  Path to the API description file.

{% /table %}

### Service, domain, and team metadata

The `service`, `domain`, and `team` entities can have optional metadata with any custom key-value pairs.

```yaml {% title="payments-api.entity.yaml" %}
metadata:
  owner: platform-team
  environment: production
  repository: https://github.com/acme/payments-api
  customField: customValue
```

This example shows custom metadata properties for a service entity.

## Entity types

### Service entity

Represents a deployable resource, like an API, application, or library.

**Optional metadata**: Can include any custom key-value pairs.

```yaml {% title="payments-api.entity.yaml" %}
type: service
key: payments-api
title: Payments API
summary: Core payment processing service
version: "2.1.0"
tags: [payments, microservice, critical]
relations:
  - type: ownedBy
    key: platform-team
  - type: partOf
    key: payments
```

This example shows a service entity with team ownership and domain association.

### Domain entity

Represents a logical group of related entities.

**Optional metadata**: Can include any custom key-value pairs.

```yaml {% title="payments.entity.yaml" %}
type: domain
key: payments
title: Payments Domain
summary: All payment-related services and APIs
tags: [payments, business-domain]
```

This example creates a domain for organizing payment-related entities.

### Team entity

Represents a collection of users.

**Optional metadata**: Can include any custom key-value pairs.

```yaml {% title="platform-team.entity.yaml" %}
type: team
key: platform-team
title: Platform Team
summary: Maintains core infrastructure and developer tools
contact:
  slack:
    channels:
      - name: "platform-team"
relations:
  - type: hasMember
    key: john-doe
  - type: owns
    key: payments-api
```

This example shows a team with member relationships and service ownership.

### User entity

Represents an individual user in your organization.

**Required metadata**: Must include the `email` field.

**Optional metadata**: Can include the `role` field.

```yaml {% title="john-doe.entity.yaml" %}
type: user
key: john-doe
title: John Doe
metadata:
  email: john.doe@acme.com
  role: developer
relations:
  - type: memberOf
    key: platform-team
```

This example shows a user entity with email and team membership.

### API description entity

Represents an API specification, typically auto-generated from an OpenAPI file.

**Required metadata**: Must include `specType`, `schema`, and `descriptionFile`.

```yaml {% title="payments-api.entity.yaml" %}
type: api-description
key: payments-api
title: Payments API
summary: Handles all payment operations
tags: [payments, billing]
metadata:
  specType: openapi
  schema: '{"openapi":"3.0.0"...}'
  descriptionFile: apis/payments.yaml
```

This example shows an `api-description` entity with OpenAPI specification metadata.

## Multiple entities in one file

Define multiple entities in a single file by using a `.entities.yaml` extension and a YAML array.

```yaml {% title="backend-services.entities.yaml" %}
- type: service
  key: payments-api
  title: Payments API
  
- type: service
  key: users-api
  title: Users API
```

This example defines two service entities in one file.

## Resources

- [Configure catalog](../how-to/configure-catalog.md) to organize and display entities.
- See the [catalog configuration reference](../../config/catalog.md) for display and filtering options.
