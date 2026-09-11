---
seo:
 title: Use AI to test API calls live while you write your docs
 description: Send a real request the moment you write about it, then ask AI to check the live response against your draft instead of guessing whether the example still holds.
---

# Use AI to test API calls live while you write your docs

A writer describes an endpoint, copies a token, switches to an API client, pastes a URL, and sends a request just to confirm the response still looks like what the draft says. Then it's back to the editor to fix the paragraph, and back to the client to check the next claim. Repeat that for every endpoint in a guide, and the round trip starts to eat the whole afternoon.

Testing the call while you're still writing about it removes most of that friction. You get a live response next to the sentence you're checking, which means an AI reviewer has something concrete to compare against instead of trusting the draft on its own.

This article covers why a live response beats a remembered one, how to send that request without leaving your editor using Reunite's "Replay" tab or a "mock server", and how to hand AI a request-and-response pair it can grade.

## Why a live response catches problems earlier

Docs drift from behavior in small ways: a status code that used to be `200` now returns `201`, a field got renamed, or an optional parameter quietly became required. None of that shows up if you're reviewing the draft against memory or against an old screenshot.

A live call settles the question in seconds, because the response either matches the draft or it doesn't. That's also why AI review works better here than on text alone. Ask a model to compare a paragraph to your memory of an API and it can only check internal consistency. Give it the response body next to the paragraph, and it can check the paragraph against what the API returned.

## Test requests without leaving your editor

The [Replay tab in Reunite](https://redocly.com/blog/replay-tab-reunite) sends real requests to your API functions and shows the response in the same editor pane, so you never lose your place in the draft. Open the API function file, open Replay, and it loads the request that matches the file you're looking at automatically. Add the path, query, header, or body values you want to try, send it, and read the response right there.

Because Replay runs inside Reunite, it authenticates with the session you're already signed into, so there's no token to copy into a separate client. A Logs panel at the bottom of the tab shows anything your function writes to the console while the request runs, which helps when the response looks right but something upstream didn't fire the way you expected.

The workflow this replaces: write a claim, switch tools, paste a URL, send a request, switch back, and repeat for every claim in the section. With Replay open beside the file, the request-and-check step happens in the same window as the sentence you're writing.

## Give AI the response, not just the spec

Once you have a real response, paste it beside the paragraph and the relevant slice of your OpenAPI description, then ask a model to grade the match instead of guessing whether the words are still accurate.

```markdown {% process=false %}
You are checking a documentation paragraph against a live API response.

Paragraph:
[paste the sentence or section under review]

OpenAPI operation (from the spec):
[paste the relevant path, parameters, and response schema]

Live response just received:
Status: [status code]
Headers: [relevant headers]
Body: [response body]

Rules:
- Flag any claim in the paragraph that the response contradicts.
- Flag any field, status code, or header the paragraph promises but the response doesn't show.
- Do not rewrite the paragraph unless asked; list issues with a spec or response reference for each.
```

Ask for a reference on every flagged issue, so you can jump back to the exact line in the spec or the response instead of re-reading both from the top. If the model has no live response to check against, it will default to restating the spec, which tells you nothing new about whether the docs still match reality.

## Use the mock server when a live backend isn't ready

Not every claim has a live backend behind it yet, especially in an OpenAPI description still under review. Redocly's built-in mock server returns sample responses straight from the OpenAPI description, so you can send a request through the same [Replay console](https://redocly.com/docs/end-user/test-apis-replay) end readers use and get a realistic answer without standing up a backend.

The `strictExamples` setting, part of how you [configure the mock server](https://redocly.com/docs/realm/content/api-docs/configure-mock-server), controls how interactive that response feels. With it off, the mock server can substitute your request values into the response so a field you sent comes back changed. With it on, you always get the documented example untouched, which is closer to what a live server would return once the behavior is locked.

If you want the check to live inside the published page itself, the [replay-openapi tag](https://redocly.com/docs/realm/content/markdoc-tags/replay-openapi) embeds a Replay console directly in a documentation page, pointed at either the mock server or a live endpoint. Readers get the same try-it-and-see experience you used while drafting.

## Keep a preview running while you edit the spec

Testing a single call tells you the response is right. Testing the rendered page tells you the docs built from that spec still make sense. If you work outside Reunite, run the [preview-docs command](https://redocly.com/docs/cli/v1/commands/preview-docs) from [Redocly CLI](https://redocly.com/docs/cli/) against your OpenAPI description while you write, and the preview rebuilds automatically every time you save. Inside Reunite, the [Webview tab](https://redocly.com/docs/realm/reunite/project/use-webview) does the same job without leaving the project.

Keeping the preview and Replay open side by side means a spec edit shows up in the rendered page and a call to that same operation returns a response in the same few seconds, which closes the loop between what you wrote, what the docs render, and what the API does.

## What AI cannot verify

A model can compare a paragraph to a response you paste in, but it can't send that request itself unless you wire up separate credentials, which most writing workflows skip for good reason. It won't notice a response that's technically correct but slow enough to frustrate a real integrator, and it can't confirm behavior your OpenAPI description never described in the first place, such as an undocumented rate limit.

Treat AI review as a fast check on the pairing you hand it: paragraph against response. The request still has to come from somewhere real, whether that's a live server, an API function, or the mock server standing in for one.

## Best practices

1. Send the request before you finalize the paragraph describing it, not after.
2. Paste the response body into your AI review prompt instead of summarizing it from memory.
3. Use the mock server with `strictExamples` on when the live backend isn't ready, so responses still match your documented examples exactly.
4. Keep `redocly preview-docs` running so a spec change shows up in the rendered page while you're still looking at it.
5. Re-check any endpoint you touch again before publishing. A response can change between your first pass and your final read.

## How Redocly can help

Reunite's Replay tab lets you [test API functions](https://redocly.com/docs/realm/reunite/project/test-api-functions) from inside the editor, so the live response an AI reviewer needs is one tab away from the paragraph you're writing about it. It authenticates with your existing session, loads the request that matches the file you have open, and shows logs alongside the response, which means checking a claim against reality no longer means leaving the page you're drafting.
