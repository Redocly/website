---
template: ../@theme/templates/BlogPost
title: Content reuse
description: Avoiding common pitfalls when implementing content reuse.
seo:
  title: Content reuse
  description: Avoiding common pitfalls when implementing content reuse.
author: heather-cloward
publishedDate: "2023-08-30"
categories:
  - docs-as-code:content-reuse
image: blog-4.jpg
---
# Content reuse done well

Since product features often overlap, particularly when you have a SaaS tiered approach, it is very common for similar or even the exact same content to live in multiple places in the documentation.
An effective strategy for using the same content in multiple locations in the documentation is content reuse.
Content reuse is a way to write content once and publish it in multiple places.
Instead of copying and pasting the content in multiple places, authors use special syntax to pull in the content from a single source.
This single source is also the only place that needs to be updated when changes occur.

From my experience and research, the way to do content reuse well is with careful planning and strategy.
All writers and contributors have to be on the same page and agree to set policies and standards to remain consistent.
You need a plan for how to name and organize your reused content as well as a policy for when to reuse content, how granular the content should be, and what types of content should be reused.
Finally, you need a way to keep track of what is reused so contributors and writers can easily find it when updating or writing new content.

## Plan for how to name and organize content

Before you start selecting content for reuse, you need to decide how the files should be named and organized, to make them easier to find when they need updates later.
In [Richard Rabil, Jr’s](https://richardrabil.com/about/) article, [Best practices for content reuse](https://richardrabil.com/2020/04/20/some-suggestions-for-content-reuse/), he suggests starting names with the topic type, like conc-snippet-name for a concept and how-to-snippet-name for a how-to. He also suggests creating a standard library structure based on product.
I have worked at companies where the includes folder was a bit of a mess, with hundreds of includes in a single folder, making it difficult to find the exact include you may need.
A planned out organized structure can help when writers or contributors are trying to find the include that may need updating in the future.

## Create a policy for when to reuse content

Another way to make reuse more effective is to have a policy for when writers should include content for reuse and when they should not.
As [Anna Gasparyan](https://blog.jetbrains.com/author/anna-gasparyan/) suggests in her article [Content reuse - a productivity booster or vicious circle](https://blog.jetbrains.com/writerside/2022/08/content-reuse-a-productivity-booster-or-a-vicious-circle/), if you don’t have a policy on when to reuse content you could end up with either abuse or misuse of reuse.
She explains, abuse of reuse is when there are multiple conditions for which content to use, but none of the content is actually reused either because the writer liked their writing style better or a user asked for more details.
If writers have a policy to follow, like “improve for yourself - improve for everyone”, and a style guide to guide them on how detailed their writing should be, this kind of abuse can be avoided.
Misuse of reuse is when the reuse syntax with conditions and variables is more lines of markdown than the actual content being reused.
Gasparyan suggests to avoid misuse of reuse writer’s shouldn’t allow the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) to negate the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle).
In other words, before adding an include for content, writers should consider if the include is actually more efficient than an alternative way to create consistency like the use of templates or variables.

## Keep track of what is reused

Finally, to do content reuse well you need a way to keep track of what content has been reused so it isn’t added redundantly and writers can easily find it when updates are necessary.
As Anna Gasparyan points out in her Content Reuse article, one of the main benefits of content reuse is reducing the review and editing effort.
However, if it is too difficult to find the content when it needs to be updated because it is nested in a series of conditions or littered with variables, this particular benefit is not realized.
As Anna Gasparyan very effectively [demonstrates in her WTD presentation](https://www.youtube.com/watch?v=dxEhvjz3eEY&t=882s), writers and contributors need a consistent way to find the content that needs to be updated, even when includes with various conditions are being used.
One way Radu Coravu suggests in [Content reuse tips and tricks](https://blog.oxygenxml.com/presentation-reuse/reuse_tipcs.html), is to keep a table with descriptions and metadata that makes it easier for writers and contributors to find content.
Additionally, writers could include comments in the markdown to point other writers or contributors to where to find the source for the include.
Whatever method is used, making the single source of truth easy to find is imperative when implementing content reuse.

## Going forward

Redocly is about to release some new products and each of these products will have overlapping features that will require the careful implementation of content reuse.
After my research, I feel prepared with the knowledge of exactly how content reuse can go wrong and some good strategies to do content reuse well.
I am sure I will hit hiccups or aha moments along the way that I hope to learn from and share with others.
If this is a topic of interest to you, look for more content regarding my journey with content reuse going forward.
