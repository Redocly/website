---
template: ../@theme/templates/BlogPost
title: OpenAPI 3
seo:
  title: OpenAPI 3
author: adam-altman
date: "2019-01-09"
categories:
  - api-specifications:openapi
image: blog-3.png
---
A few weeks ago, we migrated three API definitions that I maintain and
contribute to OpenAPI 3 from Swagger 2. It is relatively easy to transition
from version 2 to 3. But just migrating the definition was one thing… being
able to contribute to new API definitions was something else entirely. I
found 3 new features immediately useful.

## Deprecation

We all make bad decisions. Some of us are afraid to admit it. Sometimes we
have to live with it. Okay, enough about me…

It’s quite easy to own up to mistakes in OpenAPI 3 because you can mark an
operation or property as deprecated as simple as using the **`deprecated`**
attribute in your definition.

Redoc visually renders it as striked out in the docs.

![Screenshot of deprecated attributes](../images/redoc-screenshot.png)

```yaml
type: object
  properties:
    brightIdea:
      description: Some ideas don't stand the test of time.
      type: string
      deprecated: true
```

It’s liberating to take ownership over past mistakes. Using this feature may
add years to your life.

## Write-only Properties

I remember the first [issue](https://github.com/OAI/OpenAPI-Specification/issues/425)
I opened regarding the swagger 2 spec was about write-only properties. My
business case was about taking payment information securely, which means
sensitive info only goes down a “one way street” to help merchants with PCI
DSS compliance. It requires a write-only scenario, or returning something
scrubbed in its place within the response.

To implement write-only in swagger 2 involved a lot of gymnastics (as can be
seen in that issue). Now, it’s as simple as adding the writeOnly attribute
on any property.

```yaml
type: object
  properties:
    password:
      description: A secret password
      type: string
      writeOnly: true
```

## Nullable

Let’s say you have a simple API, and here is a sample request:

```json
"{"
  "name": "Adam",
  "favoriteColor": "green"
"}"
```

But this request may also be valid.

```json
"{"
  "name": "Adam",
  "favoriteColor": null
"}"
```

The “favoriteColor” property could be a string or null.

In Swagger 2, there was a vendor extension. In OpenAPI 3, we can use the
nullable attribute to define that null is acceptable.

```yaml
type: object
  properties:
    name:
      description: The person's name
      type: string
    favoriteColor:
      type: string
      nullable: true
      description: The person's favorite color.
```

## OpenAPI 3 > Swagger 2

OpenAPI 3 is an excellent and easy way to describe your API. If you have any
choice (yes, we know you don’t always get to make that decision), choose
OpenAPI 3. Then, if you decide to start deprecating a bunch of APIs, don’t
blame it on me.

There are plenty of other exciting features in OpenAPI 3. These 3 are my
favorites though, as they are so simple and practical.

What are your favorite additions to OpenAPI 3?
