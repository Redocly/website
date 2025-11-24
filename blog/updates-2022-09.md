---
template: ../@theme/templates/BlogPost
title: September 2022 updates
description: Round-up of product features and enhancements from September 2022
seo:
  title: September 2022 updates
  description: Round-up of product features and enhancements from September 2022
author: adam-altman
publishedDate: "2022-10-04"
categories:
  - redocly:product-updates
image: blog-8.jpg
---
My September in a short phrase: "G'day mate".
My travels brought me to Australia and back to Austin.
After a week of waking up at 1am, I'm happy to report I'm waking up at 4am. 🤔

Last month I mentioned that our developers are working on a new product.
And they are closing in on it (or so they thought).
Before Australia, there were 135 items on the "punchlist".
Now, there are 41 items remaining.

Well, I've let them in on a secret.
This is actually half of the product.
And we need to ship the whole product (at least to a limited audience) by the end of the year.

And to get started, we're going to stop working on the product altogether.
That got some funny looks at the all-hands meeting...
We're going to spend 3 weeks training.
We have 7 teams of developers each putting together and launching their very own API program within the next 3 weeks.
The goal is for everyone to better understand the full API lifecycle and where we fit in.
Our new product is going to accelerate the API lifecycle, and intimate knowledge of the API lifecycle is a must-have to be a fully-contributing Redocker.
Since we had no projects on the table for full API lifecycle, we invented one that was small enough to hopefully fit into a 3 week period (Parkinson's law).
And we like project-based training exercises.

I'll share more on how our training went in my next update.

On to the things we did ship that you can use today.

***

{% admonition type="success" name="✨ Customer spotlight ✨" %}
Beth, from Checkr, said: “The talents of startup developers are better spent building their company’s product software, than building their doc tooling.”
”

[Read their story](https://redocly.com/customers/checkr/).

{% /admonition %}


***

## Workflows

On the Workflows side, you can automatically place a mock server into the docs (for code samples and the try it console) into the first server position, last server position, or replace the servers altogether.
You can also control this behavior separately for previews versus production builds which can enable mocks in a design-first (previews environments), and real servers for the production docs.

We also added the ability for you to switch (and see) your connected GitHub user account (yep, that's for those of you who have more than one account).
And as I had mentioned last month, we improved our online file editor.

![Workflows features](./images/workflows.png '#width=500px;')

***

## API docs

A final reminder from the last two updates: we renamed **Reference docs** to **API docs** because it is more clear to new users.

Some of the changes:

- Added a `codeSamplesCopy` event when a user copies the request or response samples. You can wire it to your analytics.
- Sync `discriminator` value selected in the schema with the samples panels.

We also fixed a bunch of bugs and made other minor enhancements.
Read more at the [API docs changelog](../docs-legacy/api-reference-docs/changelog.md).

***

## Developer portal

**Features in the developer portal?**

We've almost managed to hold the line on the freeze here.

- The API catalog downloads and uses the Redocly configuration files from the API registry.
- The theme variable `components.search.iconColor` applies to the search loading spinner icon.
- A variety of other fixes.

**Developer portal changelog**
Read about all the latest fixes and enhancements in the [Developer portal changelog](../docs-legacy/developer-portal/changelog.md).

![Developer portal features](./images/devportal.png '#width=500px;')

***

## Redocly CLI

Reminder: **OpenAPI CLI** was renamed to **Redocly CLI** and we announced that for the past several months.
We can still see from `npm` that the old package is still being used heavily.

Please use the new package (change in `package.json` from `@redocly/openapi-cli` to `@redocly/cli` and update to the latest [version](../docs/cli/changelog)).

**Rules, rule!**

A few updates about rules:
- We are implementing an new [assertions](../docs/cli/rules/configurable-rules) (custom rules) syntax designed to make the rule easier to use. If you're interested in helping test it, let us know.
- Fixed incorrect behavior for the `no-invalid-media-type-examples` rule in combination with the allOf keyword.
- Added the `spec-components-invalid-map-name` rule for component map names validation.
- Added a new lint `--format` option: `summary`.
- Improved error messages by adding `referenced from` information.
- Added the [RFC 7807 problem details format](../docs/cli/rules/oas/operation-4xx-problem-details-rfc7807) rule.
- Renamed the `operation-security-defined` rule to `security-defined` (and made it more robust).

**Build the docs**

We added a new command `build-docs` which builds Redoc API docs into a zero-dependency HTML file.
More accurately, this is ported and revised build command from `redoc-cli` (which is deprecated).

```shell
redocly build-docs ./openapi.yaml
```

**Redocly CLI changelog**
The full list of fixes and enhancements is available in the [Redocly CLI changelog](../docs/cli/changelog).

## Redoc

🎉 🎉 🎉 We released Redoc 2.0. 🎉 🎉 🎉


**Redoc changelog**

You can find more fixes and enhancements in the [Redoc changelog](https://github.com/Redocly/redoc/blob/master/CHANGELOG.md).

***

## Write the docs at Redocly!

Want to do your part to accelerate API ubiquity?

We're looking for a [full-time Technical Writer](https://redocly.com/careers/#technical-writer) to work on product documentation and training materials (including, but not limited to videos) for our premium and open source products.

If you'd prefer to write different kinds of content (or even code), create product demos, and interact with developers, we have a role for that, too. Take a look at our [Developer Advocate](https://redocly.com/careers/#developer-advocate) position, and get in touch if you're interested.
