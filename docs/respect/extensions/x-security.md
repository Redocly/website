# x-security extension

Use the `x-security` extension to define authorization flows based on OpenAPI security schemes.
[Respect](https://redocly.com/respect) automatically constructs appropriate authorization headers, queries, or cookies based on your parameters.

## Configuration options

{% table %}

- Field name {% width="20%" %}
- Type {% width="25%" %}
- Description

---

- schemeName
- `string`
- **REQUIRED.** Name of the security scheme from your OpenAPI specification.
  Use with `operationId` or `operationPath` at the step level.

---

- values
- `object`
- **REQUIRED.** Key-value pairs for security scheme parameters (e.g., `username`, `password` for Basic Authentication).

{% /table %}

**OR**

{% table %}

- Field name {% width="20%" %}
- Type {% width="25%" %}
- Description

---

- scheme
- [`securitySchemes`](/learn/openapi/openapi-visual-reference/security-schemes.md)
- **REQUIRED.** Inline security scheme definition.

---

- values
- `object`
- **REQUIRED.** Key-value pairs for security scheme parameters.

{% /table %}

## Supported authentication types

{% table %}

- Authentication type
- Security scheme
- Required values

---

- Basic Authentication
- type: http<br />scheme: basic
- `username`, `password`

---

- Digest Authentication
- type: http<br />scheme: digest
- `username`, `password`

---

- Bearer Authentication
- type: http<br />scheme: bearer<br />bearerFormat?: JWT
- `token`

---

- API Keys
- type: apiKey<br />in: header | query | cookie<br />name: `string`
- `apiKey`

{% /table %}

## Configure security schemes

{% tabs %}
{% tab label="Reference existing scheme" %}

Reference a security scheme from your OpenAPI document's `components.securitySchemes`:

```yaml
workflows:
  - workflowId: fetchProducts
    steps:
      - stepId: getItemsStep
        operationId: getItems
        x-security:
          - schemeName: ApiKeyAuth
            values:
              apiKey: $inputs.API_KEY
```

This example uses an API key from your workflow inputs to authenticate requests.

{% /tab %}
{% tab label="Define inline scheme" %}

Define a security scheme directly in your workflow:

```yaml
workflows:
  - workflowId: fetchProducts
    steps:
      - stepId: getItemsStep
        x-security:
          - scheme:
              type: http
              scheme: basic
            values:
              username: admin
              password: $inputs.PASSWORD
```

This example sets up Basic Authentication using credentials from your workflow inputs.

{% /tab %}
{% tab label="Combine multiple schemes" %}

Apply multiple security schemes to a single request:

```yaml
workflows:
  - workflowId: fetchProducts
    steps:
      - stepId: getItemsStep
        operationId: getItems
        x-security:
          - schemeName: ApiKeyAuth
            values:
              apiKey: $inputs.API_KEY
          - scheme:
              type: http
              scheme: basic
            values:
              username: admin
              password: $inputs.PASSWORD
```

This example combines API Key authentication with Basic Authentication.

{% /tab %}
{% /tabs %}

## Apply security at different levels

Apply security configuration at either the step or workflow level:

### Step-level security

```yaml
workflows:
  - workflowId: fetchProducts
    steps:
      - stepId: getItemsStep
        x-security:
          # Security configuration
```

### Workflow-level security

```yaml
workflows:
  - workflowId: fetchProducts
    x-security:
      # Security configuration
    steps:
      - stepId: getItemsStep
```

**Note:** Step-level security takes precedence over workflow-level security when conflicts occur.

## Choose between schemeName and scheme

- `schemeName`: Reference an existing OpenAPI security scheme.
  Use at the step level with `operationId` or `operationPath`.
  `schemeName` cannot be used with `x-operation`.
- `scheme`: Define a security scheme inline.
  Use at any level without OpenAPI specification binding.

## Compare parameters and x-security

Use `x-security` instead of `parameters` for authentication to:
- Automatically handle security scheme transformations.
- Place values in the correct location.
- Simplify configuration.

{% tabs %}
{% tab label="Using parameters" %}

```yaml
parameters:
  - name: Authorization
    in: header
    value: 'Bearer {$inputs.TOKEN}'
```

{% /tab %}
{% tab label="Using x-security with schemeName" %}

```yaml
x-security:
  - schemeName: BearerAuth
    values:
      token: $inputs.TOKEN
```

{% /tab %}
{% tab label="Using x-security with scheme" %}

```yaml
x-security:
  - scheme:
      type: http
      scheme: bearer
    values:
      token: $inputs.TOKEN
```

{% /tab %}
{% /tabs %}

## Handle multiple security schemes

Process multiple security schemes in top-to-bottom order.
Merge schemes without conflicts.
For conflicting headers (e.g., `Authorization`), the last processed scheme takes precedence.

## Secure secret management

Store secrets in workflow inputs and reference them using `$inputs.<NAME>`:

1. Define the secret input:

```yaml
workflows:
  - workflowId: fetchProducts
    inputs:
      type: object
      properties:
        TOKEN:
          type: string
          format: password
    steps:
      stepId: getItemsStep
      x-security:
        - scheme:
            type: http
            scheme: bearer
          values:
            token: $inputs.TOKEN
```

2. Pass the secret when running the workflow:

```bash
npx @redocly/cli respect arazzo-workflow.yaml --input TOKEN=<your-secret-value>
```

## Authentication scheme examples

{% tabs %}
{% tab label="Basic Auth" %}

```yaml
x-security:
  - scheme:
      type: http
      scheme: basic
    values:
      username: user@example.com
      password: $inputs.PASSWORD
```

Generates: `Authorization: Basic dXNlckBleGFtcGxlLmNvbTpzZWNyZXQ=`

{% /tab %}
{% tab label="Digest Auth" %}

```yaml
x-security:
  - scheme:
      type: http
      scheme: digest
    values:
      username: user@example.com
      password: $inputs.PASSWORD
```

Handles the Digest Authentication flow automatically:
1. Receives `401` with `WWW-Authenticate` header.
2. Computes required hashes.
3. Sends authenticated request.

{% /tab %}
{% tab label="Bearer Auth" %}

```yaml
x-security:
  - scheme:
      type: http
      scheme: bearer
    values:
      token: $inputs.TOKEN
```

Generates: `Authorization: Bearer <your-secret-value>`

{% /tab %}
{% tab label="API Key" %}

```yaml
x-security:
  - scheme:
      type: apiKey
      in: query
      name: key
    values:
      apiKey: $inputs.API_KEY
```

Generates: `?key=<your-secret-value>`

{% /tab %}
{% /tabs %}

## Resources

- [Arazzo overview](../../../learn/arazzo/what-is-arazzo.md)
- [Respect commands](../commands/index.md)
- [Security schemes](/learn/openapi/openapi-visual-reference/security-schemes.md)
