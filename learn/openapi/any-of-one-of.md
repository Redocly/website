# How to use `oneOf` and `anyOf` in OpenAPI

Use of `oneOf` and `anyOf` comes from the need to describe data that can take multiple different forms.
When you need to validate against alternative schemas, **`oneOf` should be your preferred approach**.

This makes sense.
You might want to handle different payload structures, alternative response formats, or polymorphic data.
`oneOf` provides clear, predictable validation where data must conform to exactly one well-defined schema.

`anyOf`, while available, creates parsing ambiguity and unpredictable outcomes when multiple schemas match.
**Before reaching for `anyOf`, consider refining your schema design to use `oneOf` with proper discriminators.**

How do you know when to use `oneOf` and when schema redesign is needed?
This article covers:
- how to use `oneOf` and `anyOf` 
- why `oneOf` provides better predictability
- valid use cases and schema design patterns
- when `anyOf` might be unavoidable (and its trade-offs)

## Usage of `oneOf` and `anyOf`

Both `oneOf` and `anyOf` are declared as arrays of schemas, similar to `allOf`.

> All of these keywords must be set to an array, where each item is a schema.

### `oneOf` example

This works in YAML.
```yaml
oneOf:
  - title: CreditCard
    type: object
    properties:
      type:
        type: string
        enum: [credit]
      cardNumber:
        type: string
      cvv:
        type: string
    required:
      - type
      - cardNumber
      - cvv
  - title: BankAccount
    type: object
    properties:
      type:
        type: string
        enum: [bank]
      accountNumber:
        type: string
      routingNumber:
        type: string
    required:
      - type
      - accountNumber
      - routingNumber
```

And it works in JSON.
The remainder of this article uses YAML for schema definitions.
```json
{
  "oneOf": [
    {
      "title": "CreditCard",
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["credit"]
        },
        "cardNumber": {
          "type": "string"
        },
        "cvv": {
          "type": "string"
        }
      },
      "required": ["type", "cardNumber", "cvv"]
    },
    {
      "title": "BankAccount",
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["bank"]
        },
        "accountNumber": {
          "type": "string"
        },
        "routingNumber": {
          "type": "string"
        }
      },
      "required": ["type", "accountNumber", "routingNumber"]
    }
  ]
}
```

### `anyOf` example

```yaml
anyOf:
  - title: HasEmail
    type: object
    properties:
      email:
        type: string
        format: email
    required:
      - email
  - title: HasPhone
    type: object
    properties:
      phone:
        type: string
    required:
      - phone
```

## Evaluation of `oneOf` and `anyOf`

A goal of JSON Schema is to be able to evaluate if JSON is valid or invalid with the defined schema.
**More importantly, the validation outcome should be predictable and unambiguous for API consumers.**

### `oneOf` evaluation - Clear and Predictable

From the definition of `oneOf`, it is treated like an exclusive OR (XOR):
> Must be valid against _exactly one_ of the subschemas

```js
($creditCard && !$bankAccount) || (!$creditCard && $bankAccount)
```

Based on our prior `oneOf` declaration for payment methods, the following JSON would match exactly one schema (CreditCard):

```json
{
  "type": "credit",
  "cardNumber": "4111111111111111",
  "cvv": "123"
}
```

The discriminator field (`type`) makes it crystal clear which schema applies.
Code generators, documentation tools, and API consumers can reliably determine the data structure.

**Note on terminology:** We use "discriminator property" to mean any property that helps distinguish between schemas (like our `type` field with enum values). This is different from OpenAPI's formal `discriminator` object, which is optional tooling enhancement. You don't need the specification's `discriminator` feature - just well-designed properties that clearly differentiate your schemas.

**Important:** JSON schemas default to `additionalProperties: true`, meaning extra properties are allowed.
Without proper discriminating properties or `additionalProperties: false`, seemingly different schemas can both match the same data, breaking `oneOf` validation.

What about this JSON that could theoretically match both schemas?

```json
{
  "type": "credit",
  "cardNumber": "4111111111111111",
  "cvv": "123",
  "accountNumber": "123456789",
  "routingNumber": "987654321"
}
```

With the discriminator enum values (`[credit]` vs `[bank]`), this clearly matches only the CreditCard schema because `type: "credit"`.
The extra bank properties (`accountNumber`, `routingNumber`) would be allowed as additional properties but don't cause schema collision.

However, **without discriminators**, this becomes problematic:

```json
{
  "cardNumber": "4111111111111111", 
  "cvv": "123",
  "accountNumber": "123456789"
}
```

If the schemas lacked discriminator enums, this JSON could match both schemas due to `additionalProperties: true` (the OpenAPI default), making the `oneOf` invalid.
**This is why discriminators and explicit `additionalProperties` control are essential.**

### `anyOf` evaluation - Ambiguous and Unpredictable

From the definition of `anyOf`, it is treated like an inclusive OR:
> Must be valid against _at least one_ of the subschemas

```js
$hasEmail || $hasPhone
```

**The problem:** When multiple schemas match, which one does the parser use? The behavior is undefined.

Based on an `anyOf` declaration for contact methods, all of these JSON examples would be valid:

```json
{
  "email": "user@example.com"
}
```

```json
{
  "phone": "+1-555-0123"
}
```

```json
{
  "email": "user@example.com",
  "phone": "+1-555-0123"
}
```

The last example is problematic: it matches both schemas, but different tools might:
- Use the first matching schema
- Use the last matching schema  
- Merge properties from all matching schemas
- Fail to generate code predictably

**This unpredictability makes `anyOf` unsuitable for most API design scenarios.**

## Valid cases

### Preferred approach: `oneOf` with discriminators

**Always start with `oneOf`.** It provides clear, predictable validation where data must conform to exactly one well-defined schema.

**Polymorphic types with discriminators:**
```yaml
oneOf:
  - title: Painting
    type: object
    properties:
      artworkType:
        type: string
        enum: [painting]
      artist:
        type: string
      medium:
        type: string
      dimensions:
        type: string
    required:
      - artworkType
      - artist
  - title: Sculpture
    type: object
    properties:
      artworkType:
        type: string
        enum: [sculpture]
      artist:
        type: string
      material:
        type: string
      weight:
        type: number
    required:
      - artworkType
      - artist
```

**Different response formats:**
```yaml
oneOf:
  - title: SuccessResponse
    type: object
    properties:
      status:
        type: string
        enum: [success]
      data:
        type: object
    required:
      - status
      - data
  - title: ErrorResponse
    type: object
    properties:
      status:
        type: string
        enum: [error]
      message:
        type: string
    required:
      - status
      - message
```

### Rare exception: `anyOf` (with trade-offs)

**Avoid `anyOf` when possible.** Only consider it when schema redesign with `oneOf` is truly impossible.

The few legitimate cases are typically constraint validation rather than structural alternatives:

**Password strength validation (acceptable use):**
```yaml
title: Password
type: string
anyOf:
  - minLength: 8
  - pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])"
  - pattern: "^(?=.*[!@#$%^&*])"
```

**❌ Avoid this pattern:**
```yaml
# DON'T: Unpredictable structure validation
title: Contact
type: object
properties:
  name:
    type: string
anyOf:
  - properties:
      email:
        type: string
        format: email
    required:
      - email
  - properties:
      phone:
        type: string
    required:
      - phone
```

**✅ Better: Redesign with explicit structure:**
```yaml  
# DO: Clear, predictable structure
title: Contact
type: object
properties:
  name:
    type: string
  email:
    type: string
    format: email
  phone:
    type: string
anyOf:
  - required: [email]
  - required: [phone]
```

Even better, use `oneOf` with contact method types:
```yaml
title: Contact
type: object
properties:
  name:
    type: string
  contactMethod:
    oneOf:
      - title: EmailContact
        type: object
        properties:
          type:
            type: string
            enum: [email]
          value:
            type: string
            format: email
        required: [type, value]
      - title: PhoneContact  
        type: object
        properties:
          type:
            type: string
            enum: [phone]
          value:
            type: string
        required: [type, value]
```

## Schema design problems that seem to need `anyOf`

Words that indicate you might be reaching for `anyOf` when better schema design is needed:
- flexible
- optional alternatives  
- multiple valid forms
- extensible

### Problem: Poorly designed `oneOf` structures

The following example demonstrates a schema design problem that makes developers think they need `anyOf`:

```yaml
# ❌ Poor design - creates false restriction
oneOf:
  - type: object
    properties:
      email:
        type: string
        format: email
    required:
      - email
  - type: object
    properties:
      phone:
        type: string
    required:
      - phone
```

This schema rejects users who have both email and phone, which seems wrong.

**❌ Don't default to `anyOf`:**
```yaml
# AVOID: Unpredictable parsing behavior
anyOf:
  - type: object
    properties:
      email:
        type: string
        format: email
    required:
      - email
  - type: object
    properties:
      phone:
        type: string
    required:
      - phone
```

**✅ Better: Redesign the schema structure:**
```yaml
# DO: Explicit, predictable structure
type: object
properties:
  email:
    type: string
    format: email
  phone:
    type: string
anyOf:
  - required: [email]
  - required: [phone]
```

**✅ Best: Use discriminated union:**
```yaml
# BEST: Clear, unambiguous structure
type: object
properties:
  preferredContact:
    oneOf:
      - title: EmailPreference
        type: object  
        properties:
          method:
            type: string
            enum: [email]
          email:
            type: string
            format: email
        required: [method, email]
      - title: PhonePreference
        type: object
        properties:
          method:
            type: string
            enum: [phone] 
          phone:
            type: string
        required: [method, phone]
  # Optional additional contact methods
  alternateEmail:
    type: string
    format: email
  alternatePhone:
    type: string
```

### Conflicting property definitions (applies to `allOf`, not `oneOf`)

Note that having the same property with different types is **perfectly valid** for `oneOf`:

```yaml
# ✅ Valid oneOf - value can be string OR number
oneOf:
  - type: object
    properties:
      value:
        type: string
  - type: object  
    properties:
      value:
        type: number
```

This works because `oneOf` requires exactly one match:
- If `value` is a string, it matches the first schema only
- If `value` is a number, it matches the second schema only

**This would be illogical for `allOf`:**
```yaml
# ❌ Illogical for allOf - nothing can be both string AND number
allOf:
  - type: object
    properties:
      value:
        type: string
  - type: object  
    properties:
      value:
        type: number
```

The `oneOf` version above is valid but could benefit from discriminating properties for better clarity:
```yaml
# ✅ Even clearer with discriminating properties
oneOf:
  - type: object
    properties:
      type:
        type: string
        enum: [text]
      value:
        type: string
    required:
      - type
      - value
  - type: object
    properties:
      type:
        type: string
        enum: [numeric]  
      value:
        type: number
    required:
      - type
      - value
```

### JSON Schemas `additionalProperties` creates unexpected collisions

**Critical OpenAPI gotcha:** By default, JSON Schema (and OpenAPI) schemas allow additional properties (`additionalProperties: true`).
This means seemingly different schemas can both validate the same JSON, breaking `oneOf`.

```yaml
# ❌ These schemas will collide due to additionalProperties: true (default)
oneOf:
  - title: User
    type: object
    properties:
      name:
        type: string
      email:
        type: string
  - title: Product  
    type: object
    properties:
      name:
        type: string
      price:
        type: number
```

This JSON would invalidate the `oneOf` because it matches **both** schemas:
```json
{
  "name": "Widget",
  "email": "contact@example.com",
  "price": 29.99
}
```

The User schema matches because it has `name` and `email`, and `price` is allowed as an additional property.
The Product schema matches because it has `name` and `price`, and `email` is allowed as an additional property.

**✅ Solution 1: Use `additionalProperties: false`**
```yaml
oneOf:
  - title: User
    type: object
    properties:
      name:
        type: string
      email:
        type: string
    additionalProperties: false
  - title: Product
    type: object  
    properties:
      name:
        type: string
      price:
        type: number
    additionalProperties: false
```

**✅ Solution 2: Use discriminator properties**
```yaml
oneOf:
  - title: User
    type: object
    properties:
      type:
        type: string
        enum: [user]
      name:
        type: string
      email:
        type: string
    required: [type]
    additionalProperties: false
  - title: Product
    type: object
    properties:
      type:
        type: string  
        enum: [product]
      name:
        type: string
      price:
        type: number
    required: [type]
    additionalProperties: false
```

**Always be explicit about `additionalProperties` when using `oneOf`.**

### Overlapping schemas that break `oneOf`

The following example shows a truly illogical `oneOf` where two schemas can both match the same data:

```yaml
# ❌ Illogical - both schemas could match the same object
oneOf:
  - type: object
    properties:
      name:
        type: string
      age:
        type: number
    required: [name]
  - type: object
    properties:
      name:
        type: string
      email:
        type: string  
    required: [name]
```

This JSON would be **invalid** because it matches both schemas:
```json
{
  "name": "John Smith",
  "age": 30,
  "email": "john@example.com"
}
```

Both schemas match because:
- First schema: has required `name` (✓) and `age` is allowed as additional property
- Second schema: has required `name` (✓) and `email` is allowed as additional property

**Even this simpler case is invalid (often missed by developers):**
```json
{
  "name": "John Smith",
  "email": "john@example.com"
}
```

Developers often think "this clearly matches only the second schema because it has `email`", but it actually matches **both**:
- First schema: has required `name` (✓) and `email` is allowed as additional property
- Second schema: has required `name` (✓) and `email` property (✓)

Both cases violate `oneOf`'s requirement of matching exactly one schema.

### Missing discriminators in `oneOf`

When using `oneOf` with similar schemas, always include discriminating properties:

```yaml
# ❌ Ambiguous - both schemas could match the same data
oneOf:
  - type: object
    properties:
      title:
        type: string
      yearCreated:
        type: number
  - type: object
    properties:
      title:
        type: string
      acquisitionPrice:
        type: number
```

```yaml
# ✅ Clear discrimination
oneOf:
  - type: object
    properties:
      recordType:
        type: string
        enum: [artwork]
      title:
        type: string
      yearCreated:
        type: number
    required:
      - recordType
  - type: object
    properties:
      recordType:
        type: string
        enum: [acquisition]
      title:
        type: string
      acquisitionPrice:
        type: number
    required:
      - recordType
```

## Summary

**Prefer `oneOf` for predictable, unambiguous API schemas.**
Always include discriminating properties (like `type` fields with enum values) to ensure clear validation outcomes.

**Avoid `anyOf` for structural validation.** It creates parsing ambiguity and unpredictable tool behavior.
Instead, redesign your schemas to use `oneOf` with proper discriminating properties.

The rare valid uses of `anyOf` are for constraint validation (like password rules), not structural alternatives.

Be aware of schema design anti-patterns:
- Reaching for `anyOf` when the real problem is poor schema structure
- Missing discriminating properties that create ambiguous `oneOf` schemas
- Forgetting that OpenAPI's default `additionalProperties: true` causes schema collisions
- Conflicting property definitions that make validation impossible

**When you think you need `anyOf`, step back and redesign your schema structure.**
Clear, discriminated unions with `oneOf` provide better developer experience and tool support.

The `oneOf` keyword may optionally use [OpenAPI's discriminator object](discriminator.md) for enhanced tooling support, but simple discriminating properties with enum values work perfectly well.
Both `oneOf` and discriminated unions work best with [reference objects](./ref-guide.md).

Remember: **Predictable schemas lead to better APIs.** Choose clarity over perceived flexibility.

