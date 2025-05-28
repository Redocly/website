---
template: '../@theme/templates/BlogPost'
title: Build rich developer experiences with Markdown in OpenAPI
description: Make a good API experience a great one with rich descriptions in OpenAPI
seo:
  title: Build rich developer experiences with Markdown in OpenAPI
  description: Make a good API experience a great one with rich descriptions in OpenAPI
author: lorna-mitchell
date: 2023-09-19
categories:
  - openapi
  - tech-writers
image: Redocly_blog_3.jpg
---

APIs need documentation, and most of them do have documentation. Sometimes it's
pretty good documentation. But the very best documentation is a rich and
polished experience, and that's not universal across the industry. One key
ingredient in the best API experiences is that they offer more than just a list
of fields and a basic description. In this post, take a tour of how Markdown
can add the sparkle that will make your API documentation shine.

## Markdown is a text-notation dialect

Markdown is possibly the most approachable of the lightweight markup languages,
allowing users to add some text-based formatting to plain text content. Using
markup in any type of written content can enhance its readability, and in dense
reference documentation it definitely brings great value.

OpenAPI supports [CommonMark](https://commonmark.org/), a formal and
well-described version of Markdown.
For users who are familiar with [GitHub-Flavored
Markdown](https://github.github.com/gfm/), there are some minor differences to
look out for but it's a very transferrable skill. CommonMark doesn't support
tables or checklists for example, so look out for those.

## Markdown and OpenAPI

OpenAPI supports the use of Markdown in all `description` fields, anywhere in the
API description. In contrast, `title` and `summary` fields are plain text only.

{% admonition type="info" name="How does summary differ from description?" %}
OpenAPI supports both `summary` and `description` fields in many contexts.
Summary is plain text and is typically used when the item is being shown in a
list, so it should be as short as possible - usually just a few words in
length. Description fields support Markdown and are used when the user is
seeing the detail on a single item, such as an operation, where it makes sense
to go into more detail.
{% /admonition %}

By adopting an existing standard, users with Markdown experience can immediately feel familiar with adding Markdown to their OpenAPI descriptions.

## Effective use of inline Markdown

Markdown offers multiple formatting options inline to make your descriptions richer.
For example, you can add emphasis with *bold* and *italic* entries,
but formatting is only effective if it is used sparingly. Add formatting to attract
users' attention, especially if there's something that might surprise them.

Here's a good example from the [GitHub API](https://api.github.com), under the
"Create an Issue" endpoint:

```yaml
  labels:
    type: array
    description: 'Labels to associate with this issue. _NOTE: Only users
      with push access can set labels for new issues. Labels are silently
      dropped otherwise._'
```
If you don't have push access to a repository, you can't set labels. The description makes it clear that no errors will be returned and instead the labels will be ignored. This is very useful context for a user running into this behavior. Another powerful way to add context is to use a hyperlink.

By adding links to our OpenAPI descriptions, we can signpost users to
supporting or optional resources that are available if they should need them.
Including links is a great way to expand on a key concept without cluttering an API description,
or to give a clear indication of what is meant by a particular term in this
context.

Still with GitHub's API description handy, here's an example of that in action:

```yaml
      summary: Create a GitHub App from a manifest
      description: Use this endpoint to complete the handshake necessary when implementing
        the [GitHub App Manifest flow](https://docs.github.com/apps/building-github-apps/creating-github-apps-from-a-manifest/).
        When you create a GitHub App with the manifest flow, you receive a temporary
        `code` used to retrieve the GitHub App's `id`, `pem` (private key), and `webhook_secret`.
```

Some users know what the GitHub App Manifest flow is, and don't need a lengthy
description. Others probably don't, and the information is instantly available
in the documentation. The same link is used in a few related endpoints, since
they all need the same additional documentation, and it helps the user to find
their way around.

I also like this example for its clear use of `code` markup to indicate field
names in the text, making it easier for users to see what those items are.

## Expand the experience with multiline descriptions

For a situation where you want to write more than one line of content, or soft
wrap a longer line, you can use either folded or wrapped text blocks.

**Wrapped blocks** use `|-` as the start of the block, which removes leading and
trailing whitespace but discards the indentation and newlines. Using wrapped
text means you can make longer sentences easier to read in the source file by
wrapping them, but the text will be presented as a single line.  Let's look at
an example of a wrapped block, taken from the excellent [Stripe
API](https://stripe.com/docs/api).

```yaml
  description: |-
    The URL the customer will be directed to after the payment or
    subscription creation is successful.
```

This single-sentence example wouldn't be too hard to manage if it was on one
line, but add another sentence or two and this approach becomes even more
valuable.

**Folded blocks** use `>-`, which preserves the whitespace within the text, but
removes leading and trailing space. This type of folding is really valuable
when you want to include paragraph breaks, bullet points, or other
documentation "furniture" in a description field.  Also from Stripe's API,
here's an example of a description that includes paragraphs:

```yaml
  description: >-
    This is an object representing a capability for a Stripe account.


    Related guide: [Account
    capabilities](https://stripe.com/docs/connect/account-capabilities)
```

Being able to use additional formatting can make information easier to digest
when there are extensive or complex instructions needed.

## Make your API descriptions the best they can be

Using the description fields to their full potential is a great way to give
users exactly the information they need, in the context that they need it. By
using Markdown features, you can emphasize key details, supply links to additional reading or
reference materials that can help the user along the way, or present additional
information in a format that can be parsed by humans. The multiline approaches
expand these possibilities, and also make our OpenAPI specifications easier to
read and maintain.

{% admonition type="success" name="Add `externalDocs`" %}
Use OpenAPI's
[`externalDocs`](https://spec.openapis.org/oas/v3.1.0#external-documentation-object)
feature to add documentation links to your API's `info` section or individual
operations. Most documentation tools will render this nicely, and you can
supply a description as well as a URL.
{% /admonition %}

Better copy is just one way to improve your API descriptions, but it's well
worth your attention. The aim of this post is to give you some tools (and some
inspiration) to make your users' API experiences a little more delightful at
every step.

Interested in hearing more? Sign up for our [product
newsletter](https://redocly.com/product-updates/) to get more tips like these
, and to hear about new products and features as they happen.
