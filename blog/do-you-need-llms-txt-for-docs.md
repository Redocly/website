---
template: '../@theme/templates/BlogPost'
title: "Do you need llms.txt for docs?"
description: "llms.txt adoption is up because platforms auto-generate it, but logs show AI systems still ignore the file."
seo:
  title: "Do you need llms.txt for docs? | Redocly"
  description: "Do docs teams need llms.txt? Server logs show AI systems rarely fetch it. Prioritize clean Markdown, MCP, and accurate docs instead."
author: adam-altman
publishedDate: "2026-09-17"
categories:
  - technical-documentation:ai-assisted-docs
  - api-documentation:api-seo
  - developer-portal:search
---

# Do you need llms.txt for docs?

## Key takeaways

- llms.txt adoption has grown because platforms auto-generate it, but server-log evidence shows AI systems still largely ignore the file itself.
- Google has said directly it doesn't use llms.txt for search, even as tools like Chrome Lighthouse now audit for its presence.
- The clean Markdown copies that llms.txt links to are what coding agents and assistants consume, and the index file itself sees little use.
- MCP servers are the more active agent entry point for documentation today. llms.txt is optional, low-cost, and low-priority by comparison.
- Teams get more value from heading structure, consistent terminology, and fenced code blocks than from adding a manifest file.

Most docs teams have had some version of this conversation in the last year. Someone reads a blog post about llms.txt, or notices a competitor's marketing page announcing support for it, and soon there's a ticket in the backlog asking whether the docs site needs one too. Writers and platform engineers often treat it as one more thing to build before anyone has confirmed it does anything.

That hesitation is well founded. The llms.txt idea, a plain text file at the root of a domain that lists links meant to help language models understand a site, has spread quickly since it was proposed. More sites adding the file still leaves open whether agents use it, and use still leaves open whether answers get better. Server logs, statements from search engine teams, and our own repeated testing point the same way: llms.txt is optional, it's low-impact for most teams, and the effort that moves the needle for AI assistants and search lives elsewhere.

## What the data shows

The most direct evidence comes from server logs. Researchers who [pulled server logs across a very large set of domains](https://redocly.com/blog/llms-txt-still-overhyped) looking for requests to llms.txt found that the file is almost never fetched by the crawlers and agents docs teams are trying to reach. If AI systems were actively relying on llms.txt to orient themselves on a site, that traffic would show up in those logs, and the crawlers and agents that matter to docs teams almost never show up.

That absence lines up with public comments from people who work on search infrastructure at Google. John Mueller compared llms.txt to the keywords meta tag: a claim the site owner makes about their own site. Gary Illyes said Google Search does not use the file and has no plans to. Those comments describe Google's own systems. The finding that AI retrieval bots rarely fetch the file, and do not probe for it when it is missing, comes from [Ahrefs' log analysis across a large set of domains](https://redocly.com/blog/llms-txt-still-overhyped), not from Google spokespeople characterizing other crawlers. Chrome's Lighthouse added an agentic browsing category that audits for llms.txt, so the file now shows up as a checkbox in a tool developers trust, even as Google Search has said it does not use it.

Our testing points the same way. In 2025, we found that [no model we tested spontaneously read or respected llms.txt](https://redocly.com/blog/llms-txt-overhyped) when given a documentation site to work with. In 2026, we ran a follow-up on the same subject and reached the same conclusion. That is a repeated test a year apart, not an independently designed replication by a third party: the models docs teams are trying to serve still do not reach for this file on their own.

## More sites added the file, and agent requests stayed low

[Our 2026 follow-up](https://redocly.com/blog/llms-txt-still-overhyped) reports that more sites published the file, and the agents it was meant for still barely requested it, because documentation platforms and SEO plugins now generate it automatically. That is the source of the supply-side observation, and it is separate from the Ahrefs fetch-request study.

Demand from the models the file was designed for did not move to match. Ahrefs found almost every published file received no requests, and of the few that were fetched, the top requester was SEO audit tools. AI systems barely appeared. That gap between rising auto-generated supply and flat agent demand is why teams often add the file because their platform creates it.

Teams do not need to delete the file. If a platform generates it for free, leaving it on is a reasonable default. Two caveats sit next to that default. First, a file that agents rarely read today, but that an agent might trust later, is a prompt-injection surface; review it the way you review other published content. Second, public crawlers ignoring the file still leaves room for a machine-readable index you control yourself, such as an internal RAG pipeline or a human-readable list of stable entry points. Those are different jobs from hoping public crawlers discover `/llms.txt`. For hours spent on AI-readiness work that public agents will use, the evidence still points away from treating the public manifest as a priority.

## What to build instead

The recurring answer, across both our testing and our broader thinking on AI and documentation, comes down to three things.

The first is clean, well-structured Markdown. Language models and retrieval systems work far better against pages organized around clear headings, consistent terminology, and one idea per section than against pages that bury the useful information under navigation chrome or inconsistent formatting. Guidance on [organizing what already exists so each chunk answers one question well](https://redocly.com/learn/ai-for-docs/ai-optimize-api-docs-llms-ai-search) is a description of ordinary good information architecture, applied with an eye toward how a retrieval system will chunk and rank content. It's also work that pays off whether or not any particular AI system ever visits the docs, because it's the same work that helps human readers scan and find what they need.

The second is MCP, the Model Context Protocol, which functions as [a standardized way for AI agents to interact with tools and data](https://redocly.com/blog/mcp), while llms.txt stays a static list of links. Where llms.txt is a passive manifest that agents mostly ignore, an MCP server is an active entry point that lets an agent query documentation and APIs directly, in a structured way, as part of doing a task. On documentation we host, [agents reach the docs through MCP many times more often than through llms.txt](https://redocly.com/blog/llms-txt-still-overhyped). That is a log observation from our own projects, not a measured ratio across the open web. For a team deciding where to put engineering time, an MCP server is the surface those logs show agents using when they have a real task.

The third is talking to the agent inside the content itself, through the docs, instead of through a separate manifest sitting off to the side. This is part of a broader shift in [how AI and deterministic tools work together in the documentation lifecycle](https://redocly.com/learn/ai-for-docs/ai-modern-api-docs), where the docs themselves, written clearly and structured consistently, become the thing an agent reasons over. In narrower cases, it can still make sense to [publish a machine-readable index like llms.txt when you want tools to discover high-value entry points](https://redocly.com/learn/ai-for-docs/ai-help-developers-find-understand-apis), but that's a scoped, optional tactic, and it is a weak foundation for a docs strategy.

## What still matters more than a manifest file

Markdown copies and MCP still fail if the docs themselves are wrong or inconsistent. Accurate, task-shaped documentation, with a real editorial and review process behind it, is what makes clean Markdown worth generating, and it is what makes an MCP server worth querying in the first place. If an MCP server returns outdated or conflicting docs, the agent still gives a bad answer.

That's also where ongoing testing earns its keep. Teams that [run the same usability test continuously and at scale with AI](https://redocly.com/learn/ai-for-docs/ai-usability-testing) catch the kind of drift and confusion that static review misses. Our company-wide Phronesis dogfooding program, in which we walk customer workflows each week, is what we [tie to a 630% increase in free trial conversions](https://redocly.com/blog/phronesis). That figure describes the broader program, not a controlled test of llms.txt or of AI-only usability checks.

## A practical checklist

For a docs team deciding what to do this quarter, a reasonable order of operations looks like this: audit Markdown output for clean headings and consistent structure, invest in or evaluate an MCP server for docs and APIs, keep a real editorial process running so accuracy doesn't slip, and treat llms.txt as optional. If your platform already creates llms.txt, you can leave it on. If a platform generates one automatically and maintaining it isn't worth the effort, most tooling makes it possible to [turn llms.txt generation off in your project configuration](https://redocly.com/docs/realm/config/seo) without any downside.

## FAQs

**What is llms.txt and what was it supposed to do?**
llms.txt is a plain text file, typically placed at the root of a domain, that lists links intended to help language models understand a site's structure and content. The idea was that AI crawlers and assistants would fetch this file first to orient themselves before working with the rest of a site, similar in spirit to a sitemap, and aimed at language models.

**Do AI assistants like ChatGPT or Claude read llms.txt?**
The evidence so far says mostly no. Server-log analysis that [pulled server logs across a very large set of domains](https://redocly.com/blog/llms-txt-still-overhyped) found the file is rarely requested by AI crawlers or agents. Our testing found that [no model we tested spontaneously read or respected llms.txt](https://redocly.com/blog/llms-txt-overhyped) without a human manually pasting it into a conversation, and a repeat test a year later reached the same conclusion.

**Does Google use llms.txt for search ranking?**
No. Gary Illyes has said Google Search does not use llms.txt and has no plans to. John Mueller compared it to the keywords meta tag. Chrome's Lighthouse, separately, added an agentic browsing audit that checks for the file, and Lighthouse checking for the file does not mean Google Search or AI crawlers use it.

**Should a docs team still generate an llms.txt file?**
It's optional. If a documentation platform generates it automatically, leaving it on is fine, with the caveat that you should review the file for prompt-injection risk the same way you review other published docs. Treat it as a priority project only if you have a use you control, such as an internal index. Public crawler and agent traffic requesting these files has not moved with the rise in auto-generated files.

**What should teams prioritize instead of llms.txt?**
Focus on clean, well-structured Markdown with clear headings and consistent terminology, since that's about [organizing what already exists so each chunk answers one question well](https://redocly.com/learn/ai-for-docs/ai-optimize-api-docs-llms-ai-search) for both retrieval systems and human readers. Alongside that, invest in an MCP server as the active entry point agents use, and keep testing docs regularly, since teams that [run the same usability test continuously and at scale with AI](https://redocly.com/learn/ai-for-docs/ai-usability-testing) catch problems that static review misses.

**How does MCP relate to llms.txt?**
MCP, the Model Context Protocol, is [a standardized way for AI agents to interact with tools and data](https://redocly.com/blog/mcp), and it functions as an active query interface, while llms.txt stays a static list of links. On docs we host, [agents reach the project through MCP many times more often than through llms.txt](https://redocly.com/blog/llms-txt-still-overhyped), which is why MCP is the more practical place to invest engineering time if the goal is helping agents use the docs.

## How Redocly can help

Realm handles the manifest question without turning it into a project. Realm [generates an llms.txt file and clean Markdown copies of each page](https://redocly.com/docs/realm/ai-ready) automatically, alongside support for MCP servers, so the optional file exists for teams that want it while the real work, clean structured Markdown and an agent entry point, happens by default. That ordering matches the evidence, because Realm can create llms.txt for you, and on docs we host, agents mainly use the Markdown copies and MCP.
