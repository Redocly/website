---
template: '../@theme/templates/BlogPost'
title: Your linting rulesets are not your API governance
description: Beyond the code, API style guides define the identity and values of your API
author: lorna-mitchell
date: 2023-12-14
categories:
  - openapi
  - api-design
  - teamwork
image: Redocly_blog_5.jpg
---


Good, consistent API design is key to smooth integrations and an efficient development process. Achieving good design needs a mix of things; inspiration, knowledge, and the tools to deliver the vision.
Most projects use API linting to ensure consistency, quality, and compliance, but this only tells part of the story.
However, to think of these programmatic rules as API governance misses the essence of having a written style guide as the identity of your API.
In this post, we'll drill into the differences and why every API project needs both API style guides and a great linting ruleset.

## API rulesets

Using rules that can be programmatically checked against your OpenAPI description is an excellent way to ensure some basic standards.
This approach has many advantages: the checks can be run locally or in CI (Continuous Integration) to ensure immediate and objective feedback.

At its most basic, API rulesets can verify that the OpenAPI document is valid. Since these documents can be tens or hundreds of thousands of lines, programmatic verification is the best way to validate them!
Automated API linting can spot missing elements, something that humans find difficult! For example, checking that every endpoint has security defined on it so that we're not accidentally proposing something that results in a publicly-accessible endpoint.

API rulesets can also go beyond the purely functional checks to more stylistic checks that verify API characteristics are consistent across every endpoint. For example, making sure that every `something-ID` field is actually `_id` or `Id`, and checking for consistent snake/camel/kebab case across paths, parameters, and schema names.
Making sure that the API description feels complete by requiring every endpoint and parameter has both a description and a summary can really help too. Of course, the automated validation can't ensure that the words provided create a delightful developer experience, but there's more chance of it when there are words rather than no words!

## API governance is more than rulesets

API governance consists of a few different elements, and they all need to be present for a good outcome.

* **Standards**: sometimes also called a style guide, your API standard is a written document that sets out the standard that your API(s) are expected to achieve. For a great example, try the [Zalando API guidelines](https://opensource.zalando.com/restful-api-guidelines/).
* **Tools**: having great tools makes every part of the API lifecycle easier. Different scenarios call for different tools, but a good starter set would include linting tools to apply the rulesets, documentation previews, and an OpenAPI-aware editor. There's a curated collection of tools at <https://openapi.tools> if you want to try something new (and of course, Redocly makes excellent linting and documentation tools!).
* **Process**: API changes, whether they are designed or generated from updated code, need swift and thoughtful reviews from a group of interested humans. Use your organization's source control workflow, and build an API council of stakeholders (engineers, product specialists, writers, developer experience) who can give feedback with context and expertise.

The ruleset or rulesets that you adopt for each API are a critical part of the story, but they are not the whole story.

## Build API governance with empathy

Publishing machine-enforceable rules is definitely a positive part of ensuring a consistent API that's a pleasure to use - but it isn't the whole story. API governance is also about the API standards or guidelines document that describes the character and philosophy of your API. The way that the process and tools come together to support the overall story is important too. Smoothing the process and choosing the right tools means being able to efficiently make API changes that you won't regret.

## Next steps

* [Build your own API rulesets](https://redocly.com/api-governance) with Redocly's API Ruleset builder.
* Add [configurable rules](https://redocly.com/docs/cli/rules/configurable-rules/) for any additional linting logic you need.
* Add documentation previews: our open source API documentation tool [Redoc](https://github.com/redocly/redoc) is a great fit, and we also have [hosted API reference docs](https://redocly.com/reference/) if you want something more fully-featured.

Keep on building great things! If you want to know what great things we are building, sign up for our [product newsletter](https://redocly.com/product-updates/).

