---
seo:
 title: Use AI to track your docs' visibility in AI search
 description: How to track whether ChatGPT, Perplexity, Google AI Overviews, and your own site's AI search are citing your API docs, using signals you can measure today.
---

# Use AI to track your docs' visibility in AI search

A doc set can look healthy in a normal web dashboard while nobody on the team can say whether ChatGPT, Perplexity, or Google's AI Overview ever open the page, since none of those tools file a request the way a browser does. Referral traffic from search stays flat or drops, and there is no obvious way to tell whether the drop means fewer readers or just fewer clicks on an answer the assistant already gave.

This article walks through three signals a docs team can measure today: the AI search log already running on your own site, a repeatable "spot-check" against outside assistants, and the traits in how a page is built that make it more likely to get quoted in the first place.

## Why AI search visibility resists a single dashboard

No tool reports "cited by ChatGPT this many times last month," so some teams reach for the closest thing that looks like a fix: an `llms.txt` file, a plain-text index meant to work like a sitemap for AI. Redocly tested that assumption directly by turning on automatic `llms.txt` generation and running it across models and prompts, and the [results were underwhelming](https://redocly.com/blog/llms-txt-overhyped): no model spontaneously read or respected the file on its own, and server logs showed it was requested almost never. Page structure still matters, but one file cannot substitute for a real measurement practice, so a workable approach has to combine what you can log with what you can test by hand.

## Track what happens on your own docs site first

The one visibility signal you fully own sits inside your own docs platform rather than the open web. Reunite's [built-in analytics](https://redocly.com/docs/realm/reunite/project/analytics) track page views and manual search alongside a separate feed of AI search activity, showing the question a reader typed, the answer the AI generated, and which pages supplied that answer. Because the tool logs the sources behind every response, you can see directly which pages get retrieved often and which stay dark even though the content exists.

That data became more useful once Redocly shipped per-page assistant handoffs in the [summer 2025 updates](https://redocly.com/blog/updates-2025-07): every page now carries an "open in ChatGPT" or "open in Claude" action next to the Markdown copy button, so a reader who wants a second opinion from an outside model can send your page there in one click. Watch whether readers use those actions at all, because a page nobody sends to an assistant is unlikely to earn a citation on its own.

## Run repeatable spot-checks against outside assistants

Your own site's logs cannot tell you whether ChatGPT or Perplexity cites you when a developer asks a question out on the open web, so that part has to be tested by hand on a schedule. Borrow the method Redocly uses to [test documentation's usability](https://redocly.com/learn/ai-for-docs/ai-usability-testing): pick a fixed set of 10 to 15 real questions developers ask about your API, run them against the assistants your audience uses most, and record whether your docs get cited, quoted, or ignored. Write down the exact source URL the assistant names in its answer, since that tells you which page won the retrieval, not just whether your domain showed up somewhere in the response.

Run the same list every month so a rough trend, even one you keep in a shared spreadsheet, becomes visible over time. Rerun it right after any major navigation or content change too, so you can tell whether that specific edit moved the number instead of guessing.

## Watch for the page signals that predict citation

Once you know which pages already get cited, look at what those pages have in common. Docs that get quoted tend to [answer one task per page](https://redocly.com/learn/ai-for-docs/ai-help-developers-find-understand-apis), state prerequisites before reference detail, and put a minimal working request in the first code block rather than the third. A single long reference page with the answer buried three sections down rarely wins, because a model has to isolate the exact fragment worth quoting, and an undifferentiated page makes that hard for a retrieval system in the same way it makes life hard for a person skimming on a phone.

Keep error codes on the same page as the operation that produces them, and write headings in the plain words a developer types, such as "get an access token" instead of "authentication overview." Redocly's own framing of [how AI fits into modern API documentation](https://redocly.com/learn/ai-for-docs/ai-modern-api-docs) treats retrieval-augmented answers as only as good as the fragment they retrieve, which means page structure decides whether the right fragment exists to be found at all.

## What to do when a page never gets cited

When a page keeps failing both the spot-check and the on-site search, resist the urge to rewrite the whole thing first. Check instead whether it answers the literal question, because a page can be accurate and still lose if it buries the answer under context nobody asked for yet. Move the working example above the explanation, split a page that tries to cover three tasks into three separate pages, and rerun the spot-check before changing anything else, so you know whether that one edit was enough on its own.

Treat a page that is still missing after two rounds of edits as an information problem rather than a search problem. Read the reader's exact words back to yourself and ask which paragraph on the page you would quote if you were the one answering.

## How Redocly can help

Tracking AI search visibility works best when you are not relying on guesswork for the one signal you control directly: what happens when someone searches your own docs. Reunite's [built-in analytics](https://redocly.com/docs/realm/reunite/project/analytics) log every AI search query on your site alongside the generated answer and the pages it cited, next to ordinary page views and manual search, without adding a single third-party tracking script. Pair that log with the monthly spot-check against outside assistants described above, and you get a repeatable way to see whether your docs are the ones your developers' tools reach for first.
