---
template: ../@theme/templates/BlogPost
title: Lint OpenAPI, lint Markdown. Now lint Markdown in OpenAPI.
description: Use Redocly's API tooling to apply custom validation to your API descriptions, such as checking Markdown is valid.
seo:
  title: Lint OpenAPI, lint Markdown. Now lint Markdown in OpenAPI.
  description: Use Redocly's API tooling to apply custom validation to your API descriptions, such as checking Markdown is valid.
author: lorna-mitchell
publishedDate: "2024-02-14"
categories:
  - api-governance:linting-rulesets
  - api-governance:review-workflows
image: Redocly_blog_5.jpg
---
Linting improves code quality in software projects by checking that all the code is valid and well laid out. It also improves API quality in API projects, and documentation quality in documentation projects, very much along the same quality lines. A good way to incorporate these tools into your project is to add them to the continuous integration (CI) setup.

{% admonition type="info" name="Add linting to your CI" %}
If you don't have linting for your API or documentation projects set up yet, good starting points are [Redocly CLI](../../docs/cli) for API linting and [Markdownlint](https://github.com/DavidAnson/markdownlint) for Markdown files.
{% /admonition %}

Where linting can get tricky is when the formats are not easily set up for linting. At Redocly, we commonly see this awkward situation with Markdown content containing mistakes buried inside OpenAPI files. All the OpenAPI `description` fields allow [CommonMark](https://commonmark.org/), a specific flavor of Markdown, but since the Markdown is inside the OpenAPI as either JSON or YAML, linting one format inside another is tricky. Fortunately, Redocly offers [custom plugins](https://redocly.com/docs/cli/custom-plugins/) to enable users to add features like checking OpenAPI content to their setups.

## Before you begin

This example uses Redocly CLI and a [custom plugin](https://redocly.com/docs/cli/custom-plugins/) to extend the built-in functionality, so check you have Redocly CLI installed. Custom plugins are written in NodeJS, so you'll need some familiarity with JavaScript.

We'll use [Markdownlint](https://github.com/DavidAnson/markdownlint) to do the Markdown linting in this example. Add it to your project with a command like the following example:

```bash
npm install --save markdownlint
```

The challenge is in applying the Markdownlint tool to the individual bits of Markdown in an OpenAPI file. A custom plugin allows us to visit every `description` field, grab its Markdown content, apply the Markdown tool, and report any problems we find the same way we would for any other linting problems.

## Build the custom plugin

Custom plugins use a [Visitor pattern](https://redocly.com/docs/cli/custom-plugins/visitor/) to visit each node in turn, and run any actions defined for the node type. In the plugin, pass each description to the `markdownlint()` function, and then handle any resulting output so that we return useful results to the user in the context of Redocly CLI. The code looks something like this:

```js
  try {
    const lintResults = markdownlint.sync(options);

    if (lintResults.desc.length) {
      // desc is the key in the options.strings object
      let lines = description.split("\n");

      for (const desc of lintResults.desc) {
        // grab error message
        let message = desc.ruleDescription;
        // add line number context for longer entries
        if (desc.lineNumber > 1) {
          // computer counts from zero, humans count from 1
          const charsByError = lines[desc.lineNumber - 1].substring(0, 20);
          message = `${message} (near: ${charsByError} ...)`
        }

        ctx.report({
          message: message,
          location: ctx.location.child("description"),
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
```

One thing to bear in mind is that Markdownlint is a highly configurable tool, and not all of the defaults make sense in the context of a description field inside an OpenAPI file, so set some options that suit your needs. Here are a few adjustments to the defaults that we recommend:

- Set `MD013`, the line length setting, to 120.
- Set `MD041` to false, to remove the requirement for the first line to be a title.
- Set `MD047` to false, so the descriptions are not required to end with a blank line.

There are many other [configuration settings for Markdownlint](https://github.com/DavidAnson/markdownlint#rules--aliases) that you can experiment with to find the configuration that works best for your situation.



{% admonition type="warning" name="Fetch the full code sample from the cookbook" %}
The full code sample is too long to include in a blog post. See the full example [in the Redocly CLI cookbook](https://github.com/Redocly/redocly-cli-cookbook/tree/main/custom-plugin-rules/markdown-validator) for the full custom plugin code.
{% /admonition %}

## Use the custom plugin in `redocly.yaml`

To use the plugin we created, we need to do two things:

- Include the plugin in `redocly.yaml`.
- Enable the Markdown linting rule.

The following example shows `redocly.yaml` with the plugin included and the rule enabled:

```yaml
plugins:
  - './openapi-markdown.js'

rules:
  openapi-markdown/validate: warn
```

Add the plugin and new rule alongside your existing Redocly configuration, setting the severity to `error` if you want to be strict about the checks.

## Markdown checks in action

Many public projects publish OpenAPI files, and for this example I took the [Apache Airflow API description from APIs.guru](https://github.com/APIs-guru/openapi-directory/tree/main/APIs/apache.org/airflow/2.5.3). It's a fairly small API description, with 50 path items and less than 5000 lines in the description file.

This project uses a lot of bold text in its `description` fields to denote when something changed in a particular release version. Markdownlint complains about use of emphasized text as the only item on a line as it can indicate content that should have been a heading. Since it's an established convention in the Apache Airflow API description, I set the `MD036` "emphasis as heading" rule to false.

With the OpenAPI description in `airflow.yaml`, the lint command to get a summary or stylish output is as follows:

`redocly lint airflow.yaml --format=stylish`

The output comes back like this:

```text
validating /path/to/airflow.yaml...
OpenAPI Markdown: validate
airflow.yaml:
  12:16    warning  openapi-markdown/validate  Unordered list indentation (near:   - In *Postman*, yo ...)
  12:16    warning  openapi-markdown/validate  Unordered list indentation (near:   - With *Insomnia*, ...)
  12:16    warning  openapi-markdown/validate  Multiple top-level headings in the same document (near: # Trying the API ...)
  12:16    warning  openapi-markdown/validate  Multiple top-level headings in the same document (near: # Authentication ...)
  12:16    warning  openapi-markdown/validate  Multiple top-level headings in the same document (near: # Errors ...)
  12:16    warning  openapi-markdown/validate  Fenced code blocks should be surrounded by blank lines (near: ``` ...)
  12:16    warning  openapi-markdown/validate  Fenced code blocks should be surrounded by blank lines (near: ``` ...)
  12:16    warning  openapi-markdown/validate  Fenced code blocks should be surrounded by blank lines (near: ```json ...)
  12:16    warning  openapi-markdown/validate  Fenced code blocks should be surrounded by blank lines (near: ``` ...)
  12:16    warning  openapi-markdown/validate  Fenced code blocks should be surrounded by blank lines (near: ```bash ...)
  12:16    warning  openapi-markdown/validate  Fenced code blocks should be surrounded by blank lines (near: ```bash ...)
  12:16    warning  openapi-markdown/validate  Fenced code blocks should be surrounded by blank lines (near: ``` ...)
  12:16    warning  openapi-markdown/validate  Lists should be surrounded by blank lines (near: - Field names are in ...)
  12:16    warning  openapi-markdown/validate  Lists should be surrounded by blank lines (near: 2. Import the JSON s ...)
  12:16    warning  openapi-markdown/validate  Lists should be surrounded by blank lines (near:   - In *Postman*, yo ...)
  12:16    warning  openapi-markdown/validate  Fenced code blocks should have a language specified (near: ``` ...)
  12:16    warning  openapi-markdown/validate  Fenced code blocks should have a language specified (near: ``` ...)
  12:16    warning  openapi-markdown/validate  Fenced code blocks should have a language specified (near: ``` ...)
  1137:20  warning  openapi-markdown/validate  Line length
  1429:20  warning  openapi-markdown/validate  Line length
  1457:20  warning  openapi-markdown/validate  Line length (near: This endpoint is a P ...)

/path/to/airflow.yaml: validated in 172ms

Woohoo! Your API description is valid. 🎉
You have 21 warnings.
```

None of these warnings look particularly scary, but by making sure the Markdown in the description fields is at the same quality level as the rest of the API description, projects can boost their developer experience in an easily achievable way. And by adding the tools to the automated CI setup, we make sure that when we invest to make the API descriptions better, they stay at that new standard.

## Extending quality checks with Redocly CLI

Adding lint checks for the various types of files we work with, code or markup, is a good way to avoid standards decay in longer-running projects. By using the custom plugins feature in Redocly CLI, this post showed an example of bringing in additional libraries to extend the built-in rules and decorators already included in the tool.

Try adding the Markdown check to your API linting, then try one of these next:

- Browse for new "recipes" to add to Redocly CLI in the [cookbook](https://github.com/Redocly/redocly-cli-cookbook).
- Try the [API guidelines builder](../../api-governance) to answer some quick questions and get a ready-to-run Redocly CLI ruleset.
- Subscribe to the Redocly [product updates newsletter](https://redocly.com/product-updates/) to keep up with our news.
