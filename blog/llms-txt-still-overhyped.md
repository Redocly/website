---
template: ../@theme/templates/BlogPost
title: llms.txt is still overhyped
description: A year after we called llms.txt overhyped, the server logs of the whole web agree. The index file goes unread. The Markdown behind it is what agents actually use.
seo:
  title: llms.txt is still overhyped
  description: One year later, independent log studies confirm what we saw in our own logs. Almost nobody fetches llms.txt, least of all AI systems. Here is what agents read instead, and what we built for them.
  image: ./images/llms-txt.jpg
author: adam-altman
publishedDate: "2026-09-09"
categories:
  - api-documentation:api-seo
  - technical-documentation:ai-assisted-docs
  - redocly:product-updates
  - developer-portal:search
image: llms-txt.jpg
---
# llms.txt is still overhyped

A year ago I wrote that [llms.txt is overhyped](./llms-txt-overhyped.md).
We had built it, tested it, and pulled the logs.
Nobody was reading the file.

I got pushback.
"It's early."
"The models will catch up."
"Every serious docs site has one now."

So I waited a year and looked again.
The verdict didn't change.
But the reasons got more interesting, and I owe you the update.

## What I said last year

The short version:

- No model we tested read llms.txt on its own.
- If you paste it into a chat, you get worse results than pasting the actual Markdown docs.
- Our server logs showed the file being fetched almost never, and when it was, it looked like a human poking at it.
- The useful things that came out of the experiment were the clean Markdown copies of each page and the handoff from docs to AI assistants.
- Docs MCP servers were the real fire. llms.txt was smoke.

## The logs still don't lie, and now they're not only ours

Last year the evidence was our logs and one researcher at the University of Iowa.
This year the evidence is the web.

This spring, [Ahrefs pulled server logs](https://ahrefs.com/blog/llmstxt-study/) across a very large set of domains and checked every request to `/llms.txt`.
Almost every published file received no requests at all. None.
Of the few files that were fetched, the top requester was not an AI system.
It was SEO audit tools.
The tools that nag you to add an llms.txt file are the main consumers of the llms.txt file.
That is a closed loop, not a channel.

The AI retrieval bots, the ones that fetch pages to answer questions in ChatGPT, Perplexity, and their peers, barely registered.
And when a site had no llms.txt at all, no AI bot ever came looking for one.
They don't probe for it.
They don't miss it.

Google was blunt about it before Ahrefs was.
John Mueller compared llms.txt to the keywords meta tag: a claim the site owner makes about their own site, which any system worth its salt ignores and checks the site directly instead.
Gary Illyes said Google Search does not use it and has no plans to.

Our own logs agree with all of this, one year on.
Most fetches of `/llms.txt` on docs we host are not AI agents at all.
They are site owners running `curl` to check the file exists, browsers, and scanners.
The agents that do arrive read something else, and I'll get to that.

## The hype didn't die, it moved

Here is the strange part.
Adoption went up while consumption stayed flat.

More sites publish the file than a year ago, because documentation platforms and SEO plugins now generate it automatically.
Ours included.
Chrome's Lighthouse added an "agentic browsing" category that audits for llms.txt, so now there is a checkbox in a tool developers trust.
So we have Google Search saying "we don't use it" and Google Chrome saying "you should have one."
Meanwhile a market of llms.txt generators, validators, and "AI visibility" audits sells the fix for a problem the AI systems have not reported having.

The AI labs publish llms.txt for their own developer docs.
None of them has said their crawlers or their products consume anyone else's.

That is the definition of overhyped.
Supply of files goes up.
Demand from the models it was designed for does not move.

## The awkward twist: agents love the Markdown

Now the part where llms.txt's defenders have a real point, and where I've moved a little.

The proposal always had two halves.
The index file at the root, and a clean Markdown copy of each page at a predictable URL.
Everyone argued about the index.
The Markdown copies quietly became the most useful thing on the page.

In our logs, the Markdown copies are read many times more often than the index that links to them.
Coding agents in particular eat clean Markdown.
An agent inside Cursor or Claude Code doesn't want your sidebar, your cookie banner, or your React hydration payload.
It wants the content, and it wants it cheap in tokens.

Adrian Chaves at Zyte wrote a good piece this spring titled "llms.txt isn't dead."
Read it carefully and the argument is not about the index file.
He concedes that the household chatbots don't discover or use llms.txt in any meaningful way.
His team leaned in because coding assistants ingest clean Markdown, and clean Markdown keeps those assistants on current docs instead of stale training data.
I agree with every word of that.
It is an argument for Markdown, not for a manifest.

Even the specification moved this way.
The latest revision of the proposal dropped the tooling that used to consume llms.txt to build context windows.
It added link relations so an agent that lands on an HTML page can find the Markdown version directly.
And it relaxed the URL format because publishing tools had already diverged.
That is a standard following its users to where the value turned out to be.
The value was never the manifest.
It was the Markdown behind it.

## What we did with a year

We kept generating llms.txt.
It is free to produce, it hurts nothing, and a small share of its readers are real agents.
But we stopped treating it as the destination and put the effort where the agents actually go.

**We made the Markdown better.**
The Markdown copies of API pages now include code samples and response samples, and they render `oneOf` and discriminator schemas correctly.
Those are exactly the parts of an API description agents used to trip over.
Custom Markdoc tags can define their own rendering for LLMs, so a custom component is no longer invisible to AI.

**We talk to the agent in the Markdown.**
Since agents read the Markdown copies, that is where we speak to them.
Every Markdown copy of a Redocly page ends with a note to the reading agent: if you found missing information, an outdated endpoint, or code that failed to run, here is where to report it.
The reports come back.
That is a conversation with the actual reader, not a manifest for a hypothetical one.

**Every project is an MCP server.**
Point an AI tool at `/mcp` on any Redocly project and it can search pages, list APIs, and read endpoint details from the source of truth, with your access rules enforced on every call.
Setup is a page, not a JSON blob.
This is where the agent traffic goes when it has a real task.
Agents reach us through MCP many times more often than through llms.txt.

**We describe the project in the formats agents look for.**
An MCP server card, an A2A agent card, and agent skills that tell an agent how to do a task instead of leaving it to guess from reference pages.
Discovery for agents is happening.
It is just not happening through a text file at the root that they were never trained to check.

## What still matters

I'll repeat the part of last year's post that aged best.

If you want governance over how AI uses your content, it will not come from a text file that the AI never reads.
It will come from licensing, attribution, legal clarity, and standards the AI companies actually implement.
llms.txt is a wish list you leave on the doorstep.
Nothing in the industry has changed that.

If anything the risk went the other way.
Ahrefs flagged it and I'll echo it: an unread file that agents might someday read on trust is a prompt injection surface waiting for its first reader.
Treat it like content, not like configuration.

## My take

If your platform generates llms.txt for free, leave it on.
Do not buy a tool for it.
Do not put it on a roadmap.
Do not let an audit score tell you your docs are "AI ready" because a file exists at the root.

Put clean Markdown on the roadmap.
Put an MCP server on the roadmap.
Put a feedback loop with the agents that are already reading your docs on the roadmap.

llms.txt is still smoke.
The Markdown behind it turned out to be kindling.
MCP is the fire.

Focus on making good content, and serve it where the agents already are.
