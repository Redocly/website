---
template: ../@theme/templates/BlogPost
title: "RFC 9457: Better information for bad situations"
description: RFC 9457 evolves the standard for describing API errors by building on RFC 7807. Come learn what's new, what to expect, and how you can use it in your own APIs.
seo:
  title: "RFC 9457: Better information for bad situations"
  description: RFC 9457 evolves the standard for describing API errors by building on RFC 7807. Come learn what's new, what to expect, and how you can use it in your own APIs.
author: lorna-mitchell
date: "2023-10-25"
categories:
  - api-lifecycle:design
image: Redocly_blog_8.jpg
---
Standards are great; they offer common language and approaches that we can transfer between projects and technologies. This congruity is especially valuable in the API space where the [principle of least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment) means that integration projects go swiftly and smoothly.

One of the newest standards in APIs isn't new at all; it's an update on the existing (and excellent) [RFC 7807 Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc7807). The successor is [RFC 9457 Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457) and is a positive evolution on the existing well-established standard.

## Problem Details for HTTP APIs

Let's start with a quick recap on RFC 7807, as it forms the basis for the new standard.

The goal of both standards is to provide a way to deliver more information about a problem than can be conveyed by a status code alone. Within each error category covered by a status code, there are problem types, and specifics for each individual situation. While humans can handle a status code with further detail in an HTML error response, APIs are mostly consumed by machines and so a machine-readable error details format was developed.

There are great advantages to a common format for every error response in an API, and even more advantages when that format is common across many APIs. Having a common format makes a better developer experience, providing familiarity and easy orientation. It provides real value to products and consumers by making new API integrations quick and easier to implement.

The error format contains the following fields, which are all optional:

- `type`: URI that identifies the type of error that occured, for example `https://example.com/validation-error`.
- `title`: Human-readable identifier, usually the same `type` field should have the same `title` field alongside. An example would be something like `Form validation failed`.
- `status`: A copy of the HTTP status code.
- `detail`: More information about the specific problem, and if it's appropriate also steps to correct it. For example information about a form validation problem `Username is already taken, please choose a different username`.
- `instance`: An identifier for this specific occurence, which may not be useful to the client but may be included in a bug report for example.
- **Additional fields**: Any fields may be added to give additional information, and consuming clients are expected to ignore any that they don't have specific support for.

This format is pretty comprehensive and has served us well. If you have already adopted RFC 7807, then rest assured that there is no rush to change away from this format immediately. RFC 8707 will be supported and in use for a long time, but RFC 9457 brings some features that represent a positive evolution of best practice.

## Changes in RFC 9457

The changes between the two RFC versions are small but mighty; helpfully the RFC itself includes [a section outlining the changes](https://www.rfc-editor.org/rfc/rfc9457#name-changes-from-rfc-7807). The key items here are around representing multiple problems, and using a shared registry of problem types.

The [shared registry](https://www.iana.org/assignments/http-problem-types/http-problem-types.xhtml) is a little bit thin at the time of writing, but it will be interesting to see how it evolves. Many organizations have a similar concept, so a shared place to refer to the most common problems is a welcome addition to the API landscape.

The RFC also makes a clearer association between problem types and the additional fields that a client should expect to parse. For example, a problem with a validation error type can be expected to include an `errors` array describing the validation errors in a consistent format. If we build on the examples above, it would look something like:

```json
{
  "type": "https://example.net/validation-error",
  "title": "Form validation failed",
  "status": 400,
  "detail": "One or more fields have validation errors. Please check and try again.",
  "instance": "/log/registration/12345",
  "errors": [
    {
      "name": "username",
      "reason": "Username is already taken."
    },
    {
      "name": "email",
      "reason": "Email format is invalid."
    }
  ]
}
```

Taking a consistent approach to which additional fields belong with which problem type also boosts the consistency of your API experience. This information should be included in the documentation or other documentation that the `type` URL directs (human) users to.

## Problem details and the real world

The truth is that errors occur. Having a consistent and well-structured format to describe what happened and ideally provide some next steps for eliminating the error is a great experience for consumers. Using the HTTP problem details standard provides an established and familiar framework that users can quickly adapt to and use to move past errors in a positive way. There are major benefits for API producers as well since the predictable approach reduces the overhead of ensuring good error handling for each new endpoint.

To learn more about problem details for HTTP APIs, a good place to start is [RFC 9457 itself](https://www.rfc-editor.org/rfc/rfc9457). Given the small differences between the versions, adding the [Redocly operation-4xx-problem-details-rfc7807 rule](https://redocly.com/docs/cli/rules/operation-4xx-problem-details-rfc7807/) to your API linting rulesets is probably a good idea for APIs using either standard.

