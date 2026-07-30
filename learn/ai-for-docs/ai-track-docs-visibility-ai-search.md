---
seo:
 title: Track your docs' visibility in AI search
 description: Learn how to use AI tools and Redocly's built-in analytics to see whether your API docs get found, cited, and answered correctly by AI search and assistants.
---

# Use AI to track your docs' visibility in AI search

Developers used to open your API reference, scan the sidebar, and read until they found the answer. Many now ask an AI assistant instead, whether that's ChatGPT, Claude, or the "AI search" button built into your own docs site. You can't watch that conversation happen the way you'd watch a support ticket come in, so a whole layer of your audience is currently invisible to you.

That invisibility is the real problem behind "visibility in AI search." It isn't only about ranking in a results page anymore. It's about whether an AI tool can find your docs at all, then whether it answers correctly once it does.

This article covers how to test your docs the way an AI assistant reads them, how to structure content so AI can retrieve the right section, and how to track what's actually happening once your docs go live using AI search analytics.

## Why "visibility" changed when readers started asking AI first

Traditional search visibility meant a page ranking well and a reader clicking through to read it. AI search collapses that path: a model reads several pages, synthesizes an answer, and the reader may never visit your site at all. According to a [Stack Overflow developer survey cited in a Redocly analysis of documentation for large language models](https://redocly.com/blog/optimizations-to-make-to-your-docs-for-llms), 84% of developers now use, or plan to use, AI tools in their workflows, and 46% say they don't trust the accuracy of what those tools return, up from 31% the year before. That distance between adoption and trust is where documentation quality shows up directly.

Most teams built their docs for a linear reader who has time to explore. [Use AI to help developers find and understand your APIs faster](https://redocly.com/learn/ai-for-docs/ai-help-developers-find-understand-apis) describes the same change from the reader's side: integrators arrive with a single blocker and want one answer, not a table of contents. [Revel](https://redocly.com/revel), the external developer portal surface, is often where that first AI-assisted question gets asked, so the pages published there are the ones worth testing first.

## Test your docs the way developers do: ask AI directly

You can measure some of this before you touch any analytics. Pick a general-purpose AI assistant and ask it questions the way a real developer would, using only what's public.

### Build a small panel of real questions

Write down 8 to 10 questions that map to tasks, not topics: "how do I authenticate," "what does a 429 response mean," "show me a working request for creating a webhook." Ask each one against a fresh conversation so the model can't lean on earlier context. Note whether the answer is correct, whether it cites a real page, and whether the code it returns would actually run.

### Watch for the failure patterns

A few patterns repeat across most API docs. The model mixes two authentication methods into one confused answer, because your terminology drifts between "API key," "access token," and "auth credential" for the same thing. It returns a code sample that reads like pseudocode instead of a runnable command, because the source page never used a fenced code block. Or it apologizes and admits it doesn't know, which is at least honest, and it usually means the underlying page never mentions the term the reader searched for.

## Structure docs so AI can find the right answer

Once you know where the panel of questions breaks down, the fix is mostly about organizing content rather than rewriting your voice. AI systems read documentation in chunks, so a page that mixes rate limits into an authentication section confuses the model even though a human reader would skim past the mismatch without noticing. Keeping a predictable heading hierarchy, one term per concept, and properly fenced code blocks is what [Redocly's guide to optimizing docs for LLMs](https://redocly.com/blog/optimizations-to-make-to-your-docs-for-llms) recommends after testing this pattern across many documentation sets.

At Redocly, we automatically generate an [`llms.txt`](https://redocly.com/llms.txt) file for every project: a lightweight Markdown index that lists the highest-value entry points so AI tools can find them without crawling an entire site. You can control what goes into that index through the [`seo.llmstxt` configuration](https://redocly.com/docs/realm/config/seo), including which sections to include or exclude. That index doesn't replace good page structure, but it tells a crawler which guides matter most, the same way a sitemap tells a search engine which pages to prioritize.

## Track AI search activity on your own docs

Testing with an outside AI assistant tells you how your docs read to a general-purpose model. It doesn't tell you what your own readers are actually asking once your docs are live, which is where tracking becomes useful rather than anecdotal.

### What the analytics show

[Reunite's Analytics page](https://redocly.com/docs/realm/reunite/project/analytics) tracks AI-powered search activity directly on your project, without adding a third-party tracking script. It shows a time series of AI searches and unique users over a selected period, a table of the top search queries, and a separate view for queries that returned no results. You can open any individual AI search query and see the full question a reader asked, the answer the assistant gave, the sources it cited, and whether the reader marked that answer helpful or not.

### Turn no-result queries into a backlog

The "most not found" view is the clearest sign that your docs don't yet cover a real question: a reader asked something specific, and nothing in your docs matched closely enough for the assistant to answer it. Export that list on a regular cadence, group similar phrasings together, and treat repeated no-result queries as a documentation backlog rather than noise. When a query does return a cited answer, check whether the source page actually supports what the assistant said. A wrong answer with a real citation is a content problem, not a retrieval problem, and it needs a different fix than a missing page does.

## Close the loop: from tracking to fixing

Visibility tracking only pays off when it changes what you write next. After a testing pass with an outside assistant and a review of your own analytics, you'll typically end up with three lists: pages that need clearer headings and terminology, missing topics that need new content entirely, and answers that were wrong even though the source page existed. Route the first two into your regular docs backlog, and treat the third as a priority fix, since a confidently wrong AI answer damages developer trust faster than a missing page does. Repeat the outside-assistant test after a major reorganization, since AI search behavior can change once your heading structure and terminology settle down.

## How Redocly can help

At Redocly, we built [Reunite's built-in AI search analytics](https://redocly.com/docs/realm/reunite/project/analytics) to give you the tracking half of this problem without wiring up a separate tool: a time series of AI searches, the queries that returned nothing, and the sources cited in every AI-generated answer, complete with reader feedback on whether that answer actually helped. Pair that visibility with the fixes you find by testing your docs against an outside assistant, and you get a working loop between what readers ask, what your docs say, and what you change next.
