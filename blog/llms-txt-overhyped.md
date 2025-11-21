---
template: ../@theme/templates/BlogPost
title: llms.txt is overhyped
description: We built it, tested it, and checked the logs. llms.txt isn’t the “robots.txt for AI” — it’s mostly ignored. Here’s what actually matters.
seo:
  title: llms.txt is overhyped
  description: Redocly experimented with llms.txt and found it mostly smoke, not fire. See the results, the logs, and what really matters for docs + AI.
  image: ./images/llms-txt.jpg
author: adam-altman
date: "2025-08-20"
categories:
  - api-documentation:api-seo
  - technical-documentation:ai-assisted-docs
  - redocly:product-updates
  - developer-portal:search
image: llms-txt.jpg
---
# LLMS.txt is overhyped

Every now and then, the industry invents a new “standard” that's supposed to solve everything.
Right now the hype train is parked at llms.txt.
People call it the _robots.txt_ for AI.
Cute analogy.
The problem is: it doesn't actually work that way.

## We built it anyway

At Redocly, we like to experiment.
So we added automatic llms.txt support to our platform.
Turn it on, it generates the file.
Easy.
We even ran a full [Phronesis project](./phronesis.md) on it — testing across models, prompts, and scenarios.

The results? Pretty underwhelming.
- Unless you explicitly paste the llms.txt file into the LLM, it doesn't do anything.
- When you do paste it, you'd get better results just pasting the actual Markdown docs.
- No model we tested spontaneously “read” or respected llms.txt on its own.

That's not a governance breakthrough.
That's a parlor trick.

## The logs don't lie

We also pulled logs.
How often are `llms.txt` and `llms-full.txt` even being accessed?
Answer: basically never.
When they are, it looks like someone experimenting in a single LLM session, not systematic use by the models.

Michael O'Neill at the University of Iowa checked too — same conclusion: [don't lose sleep over llms.txt](https://www.linkedin.com/pulse/dont-worry-llmstxt-yet-maybe-ever-michael-o-neill-huifc/?trackingId=epKdG7eoRpmJ5sNO7dFNwQ%3D%3D).

## The silver lining

The best thing about building llms.txt wasn't llms.txt. It was what came after:
- one-click copy of any page in Markdown,
- links you can drop straight into ChatGPT or Claude,
- smooth handoff from docs → AI assistant.

That's useful today.
That's how people actually want to interact with docs in an AI-first world.

## A tale of two experiments

Not all experiments flop.
Last week, we ran another Phronesis project, this time on two of our new MCP features (not yet public).
The difference was night and day.

With Docs MCPs, we saw real value.
They made docs instantly more useful inside AI workflows.
The debriefs weren’t full of head-scratching like with llms.txt — they were full of smiles.

That’s the difference between smoke and fire.
LLMS.txt is smoke.
Docs MCPs are fire.


## What really matters

Focus on making good content.

If we want content governance in AI, it won't come from a text file no one reads.
It'll come from:
- licensing,
- attribution,
- legal clarity,
- real standards AI companies can't ignore.

Until then, `llms.txt` is just… there.
More checkbox than standard.

## My take

We tried it. We measured it.
We learned from it.
And now we can say it out loud:
**llms.txt is overhyped.**

The sooner we move past the illusion, the sooner we can focus on solutions that actually matter.
