---
template: ../@theme/templates/BlogPost
title: Improve OpenAPI security with defensive linting rules
description: Some simple rules to add to your OpenAPI linting setup as a quick way to catch some small but dangerous API mistakes.
seo:
  title: Improve OpenAPI security with defensive linting rules
  description: Some simple rules to add to your OpenAPI linting setup as a quick way to catch some small but dangerous API mistakes.
author: lorna-mitchell
date: "2024-10-02"
categories:
  - api-governance:linting-rulesets
  - api-governance:compliance-quality
image: Redocly_blog_7.jpg
---
Security is a state of mind, a moving target, or a deep practice much more than it is a set of API standards.
However, API standards, picked to fit a particular use case, and applied with rigor, can be a strong addition to the process of developing secure APIs.
Some of the most common API security mistakes are surprisingly easy to avoid and to fix - but you have to spot them first!

Picking up some of these patterns to use in your own APIs can help, so let's take a quick tour of the [security ruleset](https://github.com/Redocly/redocly-cli-cookbook/tree/main/rulesets/security) in the Redocly CLI Cookbook.

{% admonition type="success" name="About the Redocly CLI Cookbook" %}
The [Redocly CLI Cookbook](https://github.com/Redocly/redocly-cli-cookbook) is a collection of reusable snippets to use with the Redocly CLI.
Drawn from our enthusiastic community as well as our own resources and ideas, it's a good place to look for quickstart examples and inspiration for your own use of Redocly CLI.
{% /admonition %}

## Rules for security considerations

Not all rules suit every scenario, but you can pick and choose what works for you.
We've covered some common security situations with these rules, but there are always more that we could add, and the cookbook repository is always open for pull requests if you have additions.

### Appropriate protocols

It is good practice to use HTTPS endpoints to protect any credentials or important information during transit.
Use a configurable rule, such as the following example, to ensure that all URL schemes start with `https://...`:

```yaml {% title="Example configurable rule that requires HTTPS endpoints" %}
  rule/https-server-urls:
    message: Server URLs must start with "https:".
    subject:
      type: Server
      property: url
    assertions:
      pattern: /^https:/
    severity: error
```

Taking care with up-to-date best practices is also important, for example HTTP Basic auth is considered deprecated.
So another good rule to add is a rule to trigger a warning if HTTP Basic auth is used in an OpenAPI description.

### Security everywhere

Add per-operation security settings to ensure that each endpoint has an arrangement that fits its purpose.
This approach makes it easier to spot mistakes or omissions by requiring security be intentionally added each time.
The following example rule requires security be defined at the operation level:

```yaml {% title="Example per-operation security rule" %}
  rule/operation-security:
    message: Security must be defined at the operation level.
    subject:
      type: Operation
      property: security
    assertions:
      defined: true
    severity: warn
```

### Defensive data types

One common attack vector for APIs is to send in so much data that the receiving application "chokes" on a value that is too large, with negative consequences.
Defend yourself and your API against such a situation by limiting the size of the data that can be received.

The security ruleset in the Redocly CLI Cookbook includes the following rules that limit the maximum length of a string value, and how many elements an array can contain.
Some APIs need to support large incoming data payloads, but if yours does not, then it is recommended practice to set lower limits.

{% tabs %}
  {% tab label="String length" %}
  ```yaml {% title="Example rule that limits string length" %}
  rule/limit-string-length:
    message: Strings must have maxLength defined, or be an enum/const
    subject:
      type: Schema
    assertions:
      requireAny:
        - maxLength
        - enum
        - const
    where:
      - subject:
          type: Schema
          property: type
        assertions:
          const: string
          defined: true
    severity: warn

  ```
  {% /tab %}
  {% tab label="Array length" %}
  ```yaml {% title="Example rule that limits array length" %}
  rule/limit-array-length:
    message: Arrays must have a maxItems property
    subject:
      type: Schema
    assertions:
      required:
        - maxItems
    where:
      - subject:
          type: Schema
          property: type
        assertions:
          const: array
          defined: true
    severity: warn
  ```
  {% /tab %}
{% /tabs %}


## Many-layered security

Each of these rules contributes a small but important improvement to the security of your APIs.
The Redocly CLI Cookbook security ruleset is intended for you to take and adapt to meet your own needs, adjusting the limits or changing the rule severity.
You can also extend it by adding rules that you write yourself - and I hope you will share them with the other Redocly CLI Cookbook users in turn!

## Further reading

Continue your journey with more resources:

- The [Redocly CLI Cookbook](https://github.com/Redocly/redocly-cli-cookbook) is worth a browse, as it is full of examples you can copy, paste, and adapt to your own needs.
- Learn more about [configurable rules](../docs/cli/rules/configurable-rules) and write your own.
- To keep up to date with our offerings, [sign up for our product newsletter](../pages/product-updates/product-updates.page.tsx).

