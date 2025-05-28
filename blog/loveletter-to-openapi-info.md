---
template: '../@theme/templates/BlogPost'
title: Love letter to OpenAPI's info section
description: How some humble metadata can multiply the impact of your API.
seo:
  title: Love letter to OpenAPI's info section
  description: How some humble metadata can multiply the impact of your API.
author: lorna-mitchell
date: 2024-03-07
categories:
  - openapi
image: Redocly_blog_6.jpg
---

To some, the `info` section of the OpenAPI description can seem like a small trivia, something to skip past to reach the main event.
In truth however, the metadata unlocks many special aspects of an API that the `paths` section alone cannot achieve.
By investing attention in this neglected area of API descriptions, we can bring each API to new audiences and enable smooth integrations.

Good use of [`info`](https://spec.openapis.org/oas/v3.1.0#info-object) is a cornerstone of the craft of API design.
It signposts, informs, and makes promises of what lies ahead.
In this article, learn what each of the fields in this under-appreciated section can do for your API projects.

## Required fields

The following example includes the two required fields, **`title`** and **`version`**, and they are deservedly the stars of the `info` section.

```yaml
info:
  title: Pretty excellent APIs as a service
  version: 1.1.4
```

The `title` introduces the API to its audience and proclaims the identity of the API.
What it is, what it does, who should get to know it better - and of course, who should just move on.
The title is the business card, the opening line, the elevator pitch.
Getting it right, and updating it as the API evolves, brings the right connections.

Speaking of evolving, the `version` field serves as a marker of progress and shows how an API product is growing and changing over time.
Whether the OpenAPI version always matches the API release version is a business decision; both APIs and API descriptions benefit greatly from a clear API versioning strategy and regular updates with clear communications.
If your API changes, then the version number should also change to reflect the new status.
Use [semantic versions](https://semver.org/), or fluffy animal names like the Ubuntu releases do, but change the value in this field whenever your API updates.

## Tell the story

The `description` is how the API's user really gets to know you.
This narrative weaves together the functionality of the API with the possibilities of a successful future serving the users' purpose.
Use the journalistic [inverted pyramid](https://en.wikipedia.org/wiki/Inverted_pyramid_(journalism)) for this section, so that the reader can go as far as they need to on their first, second, and subsequent visits as the relationship develops.
Try to fit in the information they need before they stop reading, and then expand further or link to more resources as needed.
The description field supports Markdown, so [make the most of it](./markdown-in-openapi.md).

Share the `contact` information, and let people know that there's a real face behind the HTTP calls.
Being available shows that there is ownership and trust behind the curtain of this API interface.

The following snippet shows the context fields in action:

```yaml
description: >-
  Discover and learn about all the best APIs, in the format of an API.

  Sign up for a free API key, the data is available in JSON or XML format for all endpoints.

contact:
  name: Redocly team of API enthusiasts
  email: team@redocly.com
```

## Complete the paperwork

Be up front about the terms of any engagement.
Add a `license` to the API description so that users can be confident in where they stand in their relationship with your API.
Outline the parameters in how the API can be used, adapted, and shared, setting out the business arrangements and how innovation and collaboration take place.

The `termsOfService` delegates its legalese to a URL, but including it is an important step in terms of setting up the parameters for working together.
In technology, as in life, boundaries are necessary and having a clear framework helps everyone to participate to their satisfaction.

```yaml
license:
  name: MIT
  identifier: MIT

termsOfService: 'https://redocly.com/subscription-agreement/'
```

## Metadata is the multiplier

Taken all together, these elements form more than just a first section of a technical format.
Indeed they create a mosaic of information that is both informative, and enabling.
The `info` section is the prelude that sets us all up for success with the rest of the description.
Without a meaningful title, clear terms, or a good description, the API has less value and fewer users who can succeed to their potential because of the missing information.

In the grand scheme of API design, the `info` section sets the tone, establishes the theme, and invites us all into a world of possibility.
As a technical audience, we appreciate precision, clarity, and detail in the work of others, and we have a responsibility to our APIs to provide all of this and more.
Luckily, the tools are at hand; OpenAPI supports everything we need and it's up to us to invest our attention in using our best abilities to produce our best work.

Ready for more OpenAPI knowledge? Try these:

- Make best use of [Markdown in OpenAPI](./markdown-in-openapi.md).
- [How to use `$ref` in OpenAPI](/learn/openapi/ref-guide.md).
- [Build your own API guidelines](./build-your-own-api-guidelines.md) by answering a few questions; we'll give you the configuration you need.
