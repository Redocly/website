---
template: ../@theme/templates/BlogPost
title: "Code Mode: the next evolution of MCP"
description: Agents used to answer API questions one tool call at a time, reading every result along the way. Code mode lets the agent write a short script instead, so the model reads the answer and not the whole API.
seo:
  title: "Code Mode: the next evolution of MCP"
  description: Code mode in Redocly's MCP server lets an AI agent write a short script instead of a chain of tool calls. Same answers, 50 to 90 percent fewer tokens, and questions that span a whole API become cheap.
  # image: ./images/mcp-code-mode.png
author: vasyl-havronskyi
publishedDate: "2026-09-18"
categories:
  - redocly:product-updates
  - technical-documentation:ai-assisted-docs
  - api-catalog:discovery
# image: mcp-code-mode.png
---

# Code Mode: the next evolution of MCP

Ask an AI agent a small question about a large API.

"Which operations in this API are deprecated?"

Rebilly's API documents more than 600 operations.
Nine of them are deprecated.
The answer fits on a napkin.

An agent has two ways to get there.
It can fetch the operations one tool call at a time, read every one of them into the model, and keep count as it goes.
Or it can write a few lines of JavaScript that check every operation on the server and hand back the nine that match.

The second way is code mode, and it is how every Redocly project now answers questions about its APIs.

## How agents use MCP servers today

Model Context Protocol, or MCP, gives AI agents a standard way to discover tools and call them.
A documentation server offers tools such as "list the APIs" and "describe this endpoint".
The model picks a tool, reads the result, and picks the next one.

That is fine for a lookup.
For a question that spans an API, it means forty round trips, forty results in the model's context, and a count the model has to keep in its head.

## Code mode: two tools instead of a chain of calls

In code mode, the MCP server exposes two tools.
`describe-tools` returns the TypeScript signatures of the documentation functions.
`execute` runs a short JavaScript program that calls them and returns a result.

The script runs in a sandbox on the server, next to the documentation.
Whatever it fetches stays there.
Only what it returns travels back to the model.

<!-- ![With tool calling, every result an agent fetches passes through the model. With code mode, the agent sends one script, the results stay in a sandbox on the server, and only the return value reaches the model.](./images/mcp-code-mode-flow.svg) -->

Here is the kind of script an agent writes for the deprecated-operations question:

```javascript
const { definition } = await tools.getFullApiDescription({ name: 'Rebilly API' });
const deprecated = [];

for (const [path, operations] of Object.entries(definition.paths)) {
  for (const [method, operation] of Object.entries(operations)) {
    if (operation.deprecated) {
      deprecated.push({
        method: method.toUpperCase(),
        path,
        operationId: operation.operationId,
      });
    }
  }
}

return deprecated;
```

Six hundred operations go into the sandbox.
Nine rows come out.

The sandbox is isolated, with limits on time, memory, and output size, and it applies the same access rules as the classic tools.
An agent sees what its user is allowed to see, and nothing else.

## Why code mode beats tool calling

**Models are fluent in JavaScript.**
Writing a loop against a typed function is easier for a model than deciding, call after call, which tool to try next.

**Intermediate data never reaches the model.**
The script reads a multi-megabyte API description inside the sandbox, and the model receives only the rows the question asked for.

**One script replaces a chain of calls.**
A typical script makes two or three documentation calls, an audit makes dozens, and the agent's client sees one.
Fewer round trips means a faster answer.

**Code computes, so the model does not have to count.**
Ask how many operations document a 429 response, and a model reading 600 operations has to tally them as it goes, which is exactly the kind of task models get wrong.
A script counts in one line and returns the same number every time.

## What it saves

We compared code mode with classic tool calling on a set of REST API documentation questions: endpoint lookups, authentication questions, comparisons across APIs, inventories, and audits.
Five models from two vendors, the same questions, the same documentation.

Both modes answered the questions equally well.
Code mode did it with far less.

{% table %}

- Model
- Fewer input tokens
- Lower cost

---

- Gemini 3 Flash
- 60%
- 45%

---

- Gemini 3.8 Flash
- 90%
- 79%

---

- Claude Haiku 4.5
- 59%
- 51%

---

- Claude Sonnet 5
- 50%
- 47%

---

- Claude Opus 5
- 78%
- 72%

{% /table %}

The saving depends on the question.
Look up one field on one endpoint, and code mode roughly breaks even: writing a script to fetch one thing costs about what fetching it costs.
Ask something that spans many operations, and the saving climbs past 80 percent.
The bigger the question, the bigger the gap.

It shows in real traffic too.
Across a month of production sessions, code mode sent about a third as much data back into the agent's context as tool calling did, with fewer round trips.

<!-- ![Fewer input tokens with code mode on Claude Opus 5, by question size: 5 percent for one field on one endpoint, 79 percent for an audit across three APIs, 97 percent for an audit across a 600-operation API.](./images/mcp-code-mode-savings.svg) -->

## When the gap is not a percentage

On a large API, the difference stops being a percentage and becomes an order of magnitude.

Back to the deprecated-operations question, on Claude Opus 5:

{% table %}

- Approach
- Input tokens
- Cost

---

- Classic tool calling
- 313,000
- $1.61

---

- Code mode
- 8,800
- $0.07

{% /table %}

Same model, same question, same documentation.
Tool calling has to bring the whole API description into the model to answer it.
Code mode reads it inside the sandbox and returns nine rows.

## Try it

Every Redocly project already serves its MCP server at `/mcp`, and it already runs in code mode.
Redocly's AI Assistant uses it too when it answers questions about your APIs.

[Connect your AI tool](https://redocly.com/docs/realm/customization/mcp-server#connect-an-ai-agent-to-the-mcp-server) and ask it something that spans more than one page of your reference:

- "Which operations in this API are deprecated?"
- "Compare the authentication requirements across our APIs."
- "How many operations return a 429, and which of them are GET?"

Your documentation is the source.
The agent writes the loop.

Next, the same script will be able to call your API, not only read about it.
More on that soon.
