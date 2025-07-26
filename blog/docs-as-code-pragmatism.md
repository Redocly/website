---
template: '../@theme/templates/BlogPost'
title: Docs-as-code is a tech writer productivity hack
description: Go big on pragmatism and efficiency (and make your writers happy) by using docs-as-code workflows in your documentation projects.
seo:
  title: Docs-as-code is a tech writer productivity hack
  description: Go big on pragmatism and efficiency (and make your writers happy) by using docs-as-code workflows in your documentation projects.
author: lorna-mitchell
date: 2024-10-16
categories:
  - tech-writers
image: Redocly_blog_3.jpg
---

Docs-as-code is a great way to manage large and complex documentation projects.
At Redocly we build tools that support the docs-as-code approach, and we use it ourselves on both internal and external documentation projects.
In this post we'll explore the benefits of docs-as-code, and why documentarians find this workflow lets them get more done.

Docs-as-code is all about using the best "coder" tools to good effect.
Don't be mistaken - these tools are not just for coders!
Using the best tools lets teams create, collaborate and ship more efficiently whether they work on documentation, code, or both.

## Text-based markup

The shift to text-based markup can seem like a big step for documentation specialists who are used to using more GUI-based or CMS tooling.
With modern tools, however, it's a smaller transition than it might seem.

Look around for rich editors or plugins for your IDE that fit your platform and chosen markup language.
Having a good tool setup with a live preview, perhaps autocomplete or a helpful formatting toolbar, or even a WYSIWYG interface can provide a great experience for writers of all kinds.
Best of all, every team member can choose the tool that suits their workflow whether that's vim, the [Reunite editor](../docs/realm/reunite/project/use-editor.md), an IDE like VSCode, or anything in between.

By keeping the content in a markup format, docs-as-code means separating the styling or presentation details from the actual content.
The content can more easily be re-used, repurposed, restyled, and generally magnified.  You can work on the design or styling without needing to edit the content files.
Especially for large and long-lived documentation projects, these are the choices that future-proof our work.

## Documentation quality checks

There is no substitute for thoughtful review by a knowledgeable human, or for very good copyediting, but we can automate some of the low-hanging fruit that bring quality and consistency to written content.
By storing the tool configuration in the repository alongside the content, the same checks can be used on each writer's computer, and in a pull request workflow (more on source control in a moment).

Different projects might need different quality checks, but here are some of our favorites for you to consider which would fit your own workflows.

**Check syntax and formatting**, which are two different but closely related things.
Checking syntax means checking that all the content has syntactically correct markup in whatever markup format and flavor the project expects.
Adding syntax checks, sometimes called "linting", gives quick feedback on anything that doesn't look quite right, such as incorrect syntax for links or some missing table layout elements.
Imposing formatting rules on all content can be frustrating at first if the changes don't make a difference to the output format, but there's a reason that code projects all use very rigid formatting rules.
When you work with very consistently formatted content layout, you gain familiarity with it and it becomes easier and quicker for your brain to parse.

**Lint OpenAPI files** if your technical documentation projects include API reference documentation, then you probably have OpenAPI descriptions alongside your text-based markup content.
Reunite users have the checks built into the platform, or for users of other platforms you can get the same functionality by adding [Redocly CLI](../docs/cli) to your setup.
Take the time to think about the standards your APIs should meet, and customizing the linting setup to suit your own context.

**Spelling and substitutions** can help to add a specialist vocabulary, including case-sensitive product names, to your existing spell-checked setup.
If there are common mistakes (for example with product names that are close to actual words, or an unusual capitalization pattern), add tools to spot the problem and suggest the replacement.
Computers are much better at this than people are, and they give much quicker feedback too.
Save your human reviewers' effort for more difficult questions such as "should we split this article?" and "does this analogy make sense in another cultural context?".

**Check links** to keep your documentation set healthy.
Prioritize checking the internal links across your documentation set, and if the content is re-used in other contexts or combined for publishing, check the links in that context too.
Checking external links can be frustrating if someone else's website downtime causes your own work to report errors, so consider turning off the external link checkers or doing those less often.

These tools are valuable by themselves, but you multiply the value when you add them to your continuous integration setup.

## Source control for next-level collaboration

Working with source control is the biggest benefit that writers miss if they have to go back to a CMS workflow.
Why?
Source control has so many benefits that translate into wins for both writers and businesses:

- It becomes very easy to have multiple pieces of work in progress or in review at one time, either because the team has a lot of people or your sole technical writer has a lot of stakeholders.
- There are plenty of great tools and learning resources available for git so everyone can find something that works for them.
- Source control means we know exactly who changed what, and when that happened; the full audit trail gives clarity and accountability and can streamline many change-related tasks.
- Working with Git gives best-in-class review tools and workflow, with great discussion features, suggestions and an easy collaboration space. If you use our Reunite platform, there's also a Visual Review feature which is a nice way to check changes as a reviewer.

Git does have a learning curve, but the benefits outweigh the downsides of taking the time to master the tools of the craft.

## Take your next steps

- Sign up to [try our new platform](https://auth.cloud.redocly.com/registration) today, connect an external Git repository, and combine a rich editing experience with a docs-as-code workflow.
- [Learn all about Markdoc](/learn/markdoc/index.md) and how this extension to Markdown provides a great experience for authors and readers alike.
- Use the [API governance builder tool](/api-governance/) to produce a custom set of linting rules to get you started with API linting.

