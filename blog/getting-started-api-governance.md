---
template: ../@theme/templates/BlogPost
title: Getting started with API governance
description: Take your first steps to better APIs with our approachable guide to getting started with API governance.
seo:
  title: Getting started with API governance
  description: Take your first steps to better APIs with our approachable guide to getting started with API governance.
author: lorna-mitchell
publishedDate: "2024-05-08"
categories:
  - api-governance
image: Redocly_blog_2.jpg
---
Many API governance resources dive in quickly to getting the right rulesets and linting.
We have lots of [resources about API governance](../docs/cli/api-standards) and [linting rules](../docs/cli/rules), but if you're at the "but where do I put these things?" stage, then keep reading.
This article gets you started with the simplest possible OpenAPI governance setup, and sends you on your journey of rulesets and standards.

## Aim small: a valid OpenAPI file

Most API linting tools come with a recommended standard to adhere to.
What nobody tells you is: that's not a standard that many organizations actually use in the real world.
Most recommended rulesets create a high barrier for an API that isn't built against such a standard, leading to adoption problems when the linting tools seem to create more problems than they solve!

Instead, build a strong and simple foundation by answering one question: "Is my API description valid?".

### How to lint an OpenAPI file

Use our open source tool, [Redocly CLI](../docs/cli), to lint your OpenAPI files.
We have [detailed documentation](../docs/cli/installation) that you can dive into for more details, but for most platforms, you can install it with the following command:

```bash
npm install -g @redocly/cli
```

The command installs globally so it's available in your terminal as `redocly`.
Check it worked by running `redocly --version`.

With your OpenAPI file in `openapi.yaml`, the following command lints it using the [recommended ruleset](../docs/cli/rules/recommended) (you may get a lot of output so be prepared!):

```bash
redocly lint openapi.yaml
```

Have a look at what you got back. For most un-governanced APIs, there will be a whole host of listed warnings and errors.
And if you look at the details, not all of them are super important to having a working API.
That's because the recommended ruleset is just that: recommendations.
If you and your API are new to API governance, then they're not that useful at this point.
Instead, start smaller.

### Minimum Viable API linting

A much better starting point is to enable the [`struct`](../docs/cli/rules/common/struct) rule only, to simply check that the OpenAPI file is correct.

To do that, create a file named `redocly.yaml` and add the following content:

```yaml
rules:
  struct: error
```

Redocly CLI detects this configuration file, and lints the API description with only this one rule.

Run the following lint command again and check the output:

```bash
redocly lint openapi.yaml
```

This list is (hopefully!) more manageable than the output you received the first time around, and keeps a tight focus on things that are actual problems.
Every API is different, so it's difficult to generalize the advice here. However, each problem listed has an explanation of what's wrong.
Take the time to pick up and fix each one of the reported problems.

{% admonition type="info" name="VSCode linting" %}
While you're working on updating your OpenAPI description, you might like to try the [Redocly VSCode extension](https://redocly.com/docs/redocly-openapi/) for contextual linting feedback if an IDE is your preferred tool.
{% /admonition %}

## Continuous linting

The most important thing with API governance is to apply the standards you choose consistently, throughout the API lifecycle.
Therefore it is recommended to add the linting that you are already running locally into your CI (Continuous Integration) setup.
This example uses GitHub Actions but the idea is transferrable to Jenkins, or any other CI pipeline.

A simple GitHub Action configuration would look like the example below; mine is in `.github/workflows/api-lint.yaml`:

```yaml
name: Lint API
on: pull_request

jobs:
  api_lint:
    name: Run API linting
    runs-on: ubuntu-latest
    steps:
      - name: Check out repo's default branch
        uses: actions/checkout@v4
      - name: Set up node
        uses: actions/setup-node@v4
      - name: Install Redocly CLI
        run: npm install -g @redocly/cli@latest
      - name: Lint API
        run: redocly lint openapi.yaml

```

With this action in your repository, every pull request has this action run on it, so you can be sure that each change meets the API standards that are configured in the project.
Automating the linting is good practice, just like running tests in CI is, and for all the same reasons.
There's no way to forget to check something, and the automation stops us from making mistakes that might not be spotted until later.

## Beyond the first steps

This post showed how to set up linting, configure the simplest API standards ruleset, and crucially apply that standard using Redocly CLI both locally and in your source control setup.
This approach might seem like a small start, but that `struct` rule is the most important and you may well have a lot to do to get everything ready and compliant with it.

You have built a strong foundation, getting one rule activated and applied with ongoing automation.
For your next steps, you can [build your own API governance ruleset](/api-governance) by looking at the aspects that are most important for your business and adding them to your Redocly config file.
Adding the rules one at a time and updating the API description to satisfy each rule as you go along, is a good and manageable way to level up your API standards.

These resources might also be useful to you as you continue maturing your API governance practice:
- Use an [ignore file](../docs/cli/commands/lint#generate-ignore-file) to acknowledge any legacy rule violations that are present in your API and that you accept won't be changed any time soon.
- [Use the `bundle` command alongside `lint`](../docs/cli/guides/lint-and-bundle) to produce a validated, single-file API description.
- Learn [how to handle many/multiple API files in an API description](../docs/cli/file-management).
