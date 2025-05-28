# How to use `allOf` in OpenAPI

Use of `allOf` comes from the desire for reuse.
When you have a single source of truth, maintenance is easier.

This makes sense.
You might want to reuse a lot of things.
But `allOf` is not appropriate in many cases and can result in illogical schemas.

How do you know when to use `allOf` and when to avoid it?
This article covers:
- how to use `allOf`
- how `allOf` is evaluated
- valid use cases
- common language patterns that warn that `allOf` use is not appropriate

## Usage of `allOf`

Declare `allOf` as an array of schemas.

> All of these keywords must be set to an array, where each item is a schema.

This works in YAML.
```yaml
allOf:
  - title: time
    type: object
    properties:
      time:
        type: string
  - title: date
    type: object
    properties:
      date:
        type: string
```

And it works in JSON.
The remainder of this article uses YAML for schema definitions.
```json
{
  "allOf": [
    {
      "title": "time",
      "type": "object",
      "properties": {
        "time": {
          "type": "string"
        }
      }
    },
    {
      "title": "date",
      "type": "object",
      "properties": {
        "date": {
          "type": "string"
        }
      }
    }
  ]
}
```

## Evaluation of `allOf`

A goal of JSON Schema is to be able to evaluate if JSON is valid or invalid with the defined schema.

From the definition of `allOf`, it is treated like a logical `AND`:
> Must be valid against _all_ of the subschemas

```js
$time && $date
```

Based on our prior `allOf` declaration which requires `time` and `date` schemas, the following JSON would match the schemas:

```json
{
  "time": "08:15:00+06:00",
  "date": "2022-01-22"
}
```

Does the following JSON match the `allOf` too?

```json
{
  "date": "2022-01-22"
}
```

The "time" property is missing, and you may think that it only matches the `date` schema.
However, neither schema, including the `time` schema, has any required properties.
Therefore, it matches all of the schemas.

In the same way, the following JSON matches the `allOf` schemas too.

```json
{
  "temperature": 25,
  "unit": "C"
}
```

That doesn't seem right.
But it is.
The schema declares what some properties types must be if they are present.
It didn't declare them as required.

The following schema is invalid, because `date` is not a `string`.
```json
{
  "temperature": 25,
  "unit": "C",
  "date": 22
}
```

If you declare a media type examples in your OpenAPI definition, and turn on the [no-invalid-media-type-examples rule](/docs/cli/rules/oas/no-invalid-media-type-examples), Redocly evaluates the examples against the schema to help you evaluate them.
You can also do this be evaluating real API responses with API testing. [Contact us](../../pages/contact-us/contact-us.page.tsx) if you're interested in doing that.

## Valid cases

There are times when schemas are a combination of two pre-existing schemas.
If you find yourself wanting to add "with minor exceptions", then do not use the `allOf` keyword, no matter how tempting.

For example, let's say you have a resource for User.

```yaml
title: User
required:
  - id
  - email
type: object
properties:
  id:
    type: string
  name:
    type: string
  email:
    type: string
  avatar:
    type: string
  phone:
    type: string
  dob:
    type: string
  createdAt:
    type: string
  recentLogInAt:
    type: string
```

And then you have other resources that use an excerpt of the `User` schema such as `id`, `name`, `email`, and `avatar`.
(The topic of **API design** is different from the topic of **API description**, and this article doesn't cover if you _should_ design an API this way.)

In order to reuse that excerpt of the User schema, you could rework the schema as follows.

```yaml
title: UserExcerpt
required:
  - id
  - email
type: object
properties:
  id:
    type: string
  name:
    type: string
  email:
    type: string
  avatar:
    type: string
```

Then, you could use that in the User and any other schemas with `allOf`.

```yaml
title: User
allOf:
  - $ref: '#/components/schemas/UserExcerpt'
  - type: object
    properties:
      phone:
        type: string
      dob:
        type: string
      createdAt:
        type: string
      recentLogInAt:
        type: string
```

And another schema could reuse it similarly.

```yaml
title: ParkingSpot
allOf:
  - $ref: '#/components/schemas/UserExcerpt'
  - type: object
    properties:
      licenseExpiration:
        type: string
      spotId:
        type: string
```

### Siblings to `$ref`s

OpenAPI 3.0 has a limitation related to reuse.
Schemas have some properties that are informational and do not impact the validation of JSON.
Two of those properties are `summary` and `description`.

A common use case is the desire to reuse the schema by change the description due to the context.

OpenAPI 3.1 allows for siblings next to the `$ref`.

```yaml
type: object
properties:
  transactionId:
    $ref: '#/components/schemas/ResourceId'
    description: ID of the transaction.
```

OpenAPI 3.0 and prior do not allow for siblings next to the `$ref`, but the `allOf` keyword could be used above it as a "workaround".

```yaml
type: object
properties:
  transactionId:
    description: ID of the transaction.
    allOf:
      - $ref: '#/components/schemas/ResourceId'
```

This behavior confuses people, and some people think of it as a way to override the reference object properties.
This is only for informational properties and not for properties that are used for evaluation.

## Illogical schemas from `allOf` misuse

Word to watch out for that could indicate misuse:
- override
- extend

### Type override is invalid

Overriding a description and summary is allowed.
From an evaluation perspective, it works because the description is going to match any type.

The following example references a `ResourceId` schema and its type is a `string`.
Therefore, the following example is illogical because `transactionId` cannot be an `integer` **and** a `string`.
```yaml
type: object
properties:
  transactionId:
    description: ID of the transaction.
    type: integer
    allOf:
      - $ref: '#/components/schemas/ResourceId'
```

### Different types are invalid

The following example demonstrates illogical schemas where types mismatch within a list of schemas provided to the `allOf` keyword.

```yaml
allOf:
  - $ref: '#/components/schemas/Foo'
  - $ref: '#/components/schemas/Bar'
```

If `Foo` and `Bar` are not of the same type, then the logical `AND` cannot be true.
For example, something cannot be a `string` and an `object` at the same time.
Sometimes, this is more difficult to notice when using reference objects.
However, it's clear when written the following way.

```yaml
allOf:
  - type: string
  - type: object
```

### Closed schemas and `allOf` are invalid

Even when the schemas are of the same type, there can still be illogical conflicts when using the `allOf` keyword.

The following schema demonstrates and illogical conflict.
```yaml
allOf:
  - type: object
    properties:
      date:
        type: string
    additionalProperties: false
  - type: object
    properties:
      time:
        type: string
    additionalProperties: false
```

The `additionalProperties: false` means that the schema cannot have any additional properties.

The following is invalid, because it matches the first schema, but the second schema does not have `date` declared as a property and it declares there cannot be any additional properties.
```json
{
  "date": "2022-01-22"
}
```

## Summary

In Swagger 2.0 or OpenAPI 3.0, use `allOf` to override a `description` or `summary` of a schema.
In OpenAPI 3.1, use a sibling to the `$ref` to override a `description` or `summary`.
Do **NOT** override any other properties including `type`.

Use the `allOf` keyword as a logical `AND`.
Be aware of common illogical combinations:
- mismatched types
- schemas where additional properties are not allowed

The `allOf` keyword may be used with [the discriminator](discriminator.md).
Also, `allOf` is almost always used with at least one [reference object](./ref-guide.md).

Consider cases where the schema is the same with one minor exception as a possible design problem.
Refactoring to use `allOf` may not be a good idea for those scenarios.
