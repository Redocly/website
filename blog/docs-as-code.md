---
template: '../@theme/templates/BlogPost'
title: The top three reasons I love docs-as-code
seo:
  title: The top three reasons I love docs-as-code
author: adam-altman
date: 2020-10-29
categories:
  - docs-as-code
image: blog-5.png
excerpt: At Redocly, we embrace developer experience. We believe docs-as-code is the optimal developer experience for producers of APIs.
---

# The top three reasons I love docs-as-code

At Redocly, maximizing the developer experience is our core purpose.
And we believe docs-as-code provides the optimal developer experience for producers of APIs.

In a nutshell, docs-as-code, also known as docs-like-code, is about treating your documentation the same way you treat your code.

## Reason 1: Markdown

Love it? Dislike it? It sure is convenient.
I was able to gain comfort using Markdown in about 15 minutes.
I may not be an expert just yet, but I am able to format text sufficiently.

Even this blog post is written in Markdown. Here's what it looks like behind the scenes:

```md
---
title: Top three reasons I love docs-as-code
author: adam-altman
date: 2020-10-28
categories:
  - docs-as-code
image: blog-3.png
excerpt: At Redocly, we embrace developer experience...
---
# Top three reasons I love docs-as-code

At Redocly, maximizing the developer experience is our core purpose.
And we believe docs-as-code provides the optimal developer experience for **producers** of APIs.

## Reason 1: Markdown

Love it? Dislike it? It sure is convenient.
```

The benefits of Markdown are rooted in its convenience. It is a highly portable, widely supported format that can be used with a variety of documentation tools. With Markdown, there is no need to spend too much time formatting your text, learning how to use advanced content editing solutions, or creating complex templates. You can write your documentation in virtually any text editor.

## Reason 2: Reviews and previews

At Redocly, we use the GitHub flow for our tasks.
That involves a few steps:

1. Create a branch.
1. Do work and commit.
1. Open a pull request (PR) into the main branch.
1. Get reviews/approvals.
1. Merge.

The main tool that enforces that workflow is GitHub itself.
It only takes a few clicks, and we can control how many reviewers are required to approve something to be able to merge it.

Because our products integrate with GitHub, they can take advantage of automation. Live previews of the latest changes can be shared with internal stakeholders for feedback. When a PR is opened, a complete preview website is built unique to that branch. This workflow makes editorial reviews enterprise-grade with pro-level-pricing.

## Reason 3: Source control history

Git keeps a log of each commit.
It even has utility functions - such as `blame` - that identify which commits are responsible for each line of content (code or docs).

It supports reversions, which means we can undo changes to both code and docs.

It has the concept of diffs, clearly displaying the changes (**diff**erences) between two given commits.

In my view, Git is like the ultimate time machine for documentation.

It benefits all parties involved.
Having an accessible record of changes is not common in typical content management systems. Choosing to manage content in Git helps contributors build off of each other's work more transparently. More people can work on the same part of the content simultaneously. With Git and the docs-as-code approach, documentation writers and developer teams can integrate and collaborate more effectively.

## What do you think about docs-as-code?

Are you using docs-as-code to manage your documentation? Has it improved your experience, and how? Let's continue the conversation on [Twitter](https://twitter.com/redocly).
