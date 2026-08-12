---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
title: AI governance and security FAQ
description: How Redocly AI features work, what data they use, and which controls protect them.
---

# AI governance and security FAQ

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

This FAQ answers common questions from security, compliance, and AI governance reviews.
It explains how Redocly AI features work, what data they use, and which controls protect them.

This page replaces the earlier "AI Search data usage FAQ".
AI Search is now named the **AI assistant**.

## Redocly AI features

{% table %}

- Feature
- Description
- Availability

---

- AI assistant
- Answers user questions with content from your project.
  Formerly named AI Search.
- Enterprise and Enterprise+.

---

- AI assistant web component
- Embeds the AI assistant on other websites.
- Early access.

---

- MCP server
- Gives AI tools read-only access to your documentation and API descriptions.
  An early access capability also lets them call the APIs you document, using credentials the user supplies.
- Enterprise and Enterprise+.
  API execution is early access, off by default, and enabled for each organization by Redocly.

---

- Redocly Agent
- Reviews pull requests (reviewer) and drafts documentation changes (writer).
- Early access.
  Off by default.
  Redocly enables it for each organization.

---

- Scaffold with AI
- Creates an initial project from your description, selected features, and uploaded files and links.
- Early access.
  Redocly enables it for each organization.

{% /table %}

### Can we turn AI features off?

Yes.
Each feature has its own control:

- Hide the AI assistant with the [`aiAssistant.hide`](../config/ai-assistant.md) option.
- Disable the MCP server with the [`mcp.hide`](../config/mcp.md) option.
- Restrict either feature to specific teams with the `rbac.features.aiSearch` and `rbac.features.mcp` options in [RBAC](../config/access/rbac.md#features-configuration).
- Early access features stay off until you ask Redocly to enable them.

## Models and architecture

### What type of AI do Redocly AI features use?

Redocly AI features use retrieval-augmented generation (RAG) with hosted large language models (LLMs).
The models are pre-trained.
Redocly adapts them with prompts and harness only.
Redocly does not train or fine-tune models.
The models are static: they do not learn from your data, and they do not change themselves.

### Which model providers does Redocly use?

Redocly calls models through two providers:

- **AWS Bedrock**
- **Google**, including Vertex AI

Both providers run in inference-only mode and do not train models on your data.
For the provider terms, see [AWS Bedrock privacy](https://aws.amazon.com/bedrock/amazon-models/privacy/) and [Gemini data governance](https://cloud.google.com/gemini/docs/discover/data-governance).

Redocly evaluates models and updates the selection when a better model is available.
The conversation log records the model that produced each answer.
Contact Redocly if your review needs the current model names and versions.

### How does the AI assistant work?

1. When you publish a production build, Redocly indexes your content.
   The index keeps the original role-based access control (RBAC) tags.
1. When a user asks a question, the assistant can retrieve matching content.
   Redocly enforces RBAC above the assistant, so it cannot retrieve content that the user cannot access.
1. The assistant sends the question, a Redocly system prompt, your optional project prompt, and the retrieved content to the LLM.
1. The LLM writes the answer in real time or requests additional content.
   The answer includes links to the source pages.

### Does the assistant keep conversation memory?

Not on the server.
The user's browser holds the conversation and sends the recent messages with each request.
Conversation logs appear in your [analytics reports](../reunite/project/analytics.md#ai-assistant) so you can audit usage.

### Who hosts and operates the AI features?

Redocly operates all AI features as part of its SaaS platform.
Model inference runs on AWS Bedrock and Google endpoints, called from Redocly's cloud accounts.
You do not deploy, host, or manage any models.

## Data usage

### Does Redocly train AI models on our data?

No.
Redocly does not use your data to train, fine-tune, or improve any AI model.
The model providers do not train on your data either.

### What data do the AI features use?

The AI assistant uses:

- your project content (documentation pages and API descriptions)
- the user's question and the recent conversation messages
- your optional project prompt

Redocly Agent uses the changed files in your project, prior review comments, and project instruction files.
Scaffold with AI uses the description, files, and links that you provide when you create a project.
If you connect other tools (early access), the assistant can also use data from those tools.
You decide which data sources it can use.

### Do AI features process personal data?

The features process the content you publish and the questions users type.
Conversations from signed-in users record the user's email address in your analytics.
Conversations from users who are not signed in are recorded as "Anonymous".
For Redocly Agent and Scaffold with AI, a redaction step removes email addresses, IP addresses, bearer tokens, and API-key-like strings from prompts before they reach the model provider.
This redaction step does not apply to the AI assistant: questions go to the model provider as the user typed them.
The provider processes them for inference only and does not use them for training.

{% admonition type="warning" name="Questions are not redacted" %}
Instruct your users to not enter secrets or personal data in AI assistant questions.
Redocly records each question in your analytics reports, and sends it to the model provider as typed.
{% /admonition %}

### Where does AI processing happen?

AI processing stays inside the Redocly deployment that hosts your project.
Redocly operates a United States deployment and a European Union deployment.
Model inference runs on provider endpoints in the same area as that deployment.
Contact Redocly to confirm the areas for your deployment, or to ask about the European Union deployment.

### Is Redocly a data controller or a data processor?

Redocly acts as a data processor for customer data on the platform.
Redocly processes customer data only on documented customer instructions, and only to provide the contracted services.
You act as the data controller: you determine the purposes and means of processing the personal data you submit to the platform.

### How long does Redocly keep AI data?

- **Content index** - Redocly rebuilds the index on each production build.
  Removed content leaves the index at the next production build.
- **Conversation logs** - Redocly keeps the question, answer, and sources to power your analytics reports.
- **Usage counters** - Redocly keeps monthly totals to enforce quotas.

Contact Redocly if your review needs retention details for a specific data class.

### Is our data shared with third parties?

Prompts go to AWS and Google model endpoints for inference only.
Redocly does not sell your data.
Redocly does not share your data with other parties for model training.

## Compliance and audits

### Are AI features in the scope of the SOC 2 Type 2 report?

Yes.
The SOC 2 Type 2 examination covers the whole Redocly platform as one system.
It covers all five Trust Services Criteria: security, confidentiality, availability, processing integrity, and privacy.
AI features run inside that system.
They use the same infrastructure, deployment pipeline, and operational processes as the rest of the platform.
The report does not contain a separate AI section, because AI features are not a separate system.

The platform controls apply to AI features in the same way as to all other features:

- access control and authentication
- change management (AI code and prompts ship through the same reviewed release process)
- logging and monitoring
- vendor and subprocessor management (Redocly manages the model providers under this process)

Download the report from the [Compliance page](../reunite/organization/access-compliance-reports.md) in Reunite.

### Are AI features penetration tested?

Yes.
Redocly's penetration tests cover the production system as a whole, not selected components.
AI features and their APIs are part of that system, so they are in scope.
Download the latest attestation from the [Compliance page](../reunite/organization/access-compliance-reports.md) in Reunite.

### Which other compliance resources are available?

The Compliance page in Reunite also provides Redocly's answers to the Consensus Assessments Initiative Questionnaire (CAIQ).
For Redocly's vulnerability management process, see [Security vulnerability fixes](./security-fixes.md).

## Logs and analytics

### What does Redocly log for AI assistant questions?

Your project analytics include an [AI Assistant section](../reunite/project/analytics.md#ai-assistant).
For each conversation, you can see:

- the question and the full answer
- the source pages the assistant used
- the user's email address, or "Anonymous" for users who are not signed in
- the date and time
- user feedback (like or dislike, with an optional reason)
- whether the assistant found an answer

You can filter conversations, search the question text, and export the data to CSV.

### Does Redocly monitor token usage and costs?

Yes.
Redocly meters token usage for each request.
Internal telemetry records tokens, latency, and errors for each AI request.
Redocly Agent runs also record cost and stop at defined budgets.

### How do users report bad answers?

Each answer has like and dislike buttons.
A dislike can include a reason.
The feedback appears in your analytics next to the conversation.

## Usage limits

### What limits apply to AI features?

- **AI assistant** - Each organization has a monthly quota of 3,500 questions on Enterprise and Enterprise+ plans.
  The quota resets each month.
  Above the quota, users receive regular search results instead of AI answers.
- **AI assistant input** - The question size is capped.
- **MCP server** - Requests are rate limited for each client IP address.
- **Redocly Agent and Scaffold with AI** - Each run has a cost budget, and each organization has caps on active and total runs.

These limits can change.

## MCP server security

### What can the MCP server do?

By default, the MCP server is read-only.
Its tools list APIs, return endpoint details and security schemes, and search documentation.
It does not call your backend APIs.
It cannot change your content.

Redocly can enable an early access capability that adds API execution.
API execution is not a separate server.
It is functionality inside the same server, and it stays off until you ask Redocly for it.
When it is on:

- The execution tool can call the APIs you document, with credentials the user supplies.
- The tool declares itself as no longer read-only, so MCP clients that ask for confirmation begin to prompt the user.
- Tools for the user to manage their API credentials become available.

### How does the MCP server authenticate clients?

The MCP server uses the same authentication and RBAC engine as your portal.
Public projects allow anonymous access, the same as the portal.
When RBAC protects content, the `/mcp` endpoint requires authentication.
Clients sign in with OAuth, or send a bearer token.
The server validates each token on each request against the identity provider that issued it.
Each client only receives the content that its teams can access.

To restrict the server itself, see [Restrict access to the MCP server](../customization/mcp-server/index.md#restrict-access-to-the-mcp-server).

### Does the MCP server pass tokens through to backend APIs?

No.
A token sent to the MCP server grants documentation access only.
The server never attaches that token to a request to any backend API.
This follows the MCP specification, which forbids token passthrough.

A token that an attacker obtained in another context cannot reach your backend APIs through the Redocly MCP server.
No forwarding path exists.
The effect of a stolen valid token is limited to the documentation content that the token's owner can read in the portal.

This stays true when API execution is on.
API calls use credentials that the user supplies separately, never the token from the MCP request.

### How does authenticated API execution work?

API execution is an early access capability of the MCP server.
It is off by default.
Redocly enables it for each organization on request, and each non-public API must opt in.

Its design separates portal tokens from API credentials:

- The server never uses the caller's MCP token for API calls.
- The user supplies API credentials on a dedicated secure page, never in the AI conversation.
- Redocly stores these credentials for each user with AES-256-GCM encryption, and with a limited lifetime.
- The server only calls hosts listed in the API description's `servers` URLs.
  It is not an open proxy.
- Protections against server-side request forgery (SSRF), redirect controls, response size caps, timeouts, and request budgets apply to every call.

### Which MCP controls can customers apply?

- Disable the MCP server with `mcp.hide`.
- Restrict access to specific teams with `rbac.features.mcp`.
- Use content RBAC to control which APIs and pages each team can read.
- Exclude files from the MCP server with `mcp.docs.ignore`.
- Keep API execution off, which is the default.
  When it is on, each non-public API must still opt in.

### Does Redocly support new MCP specification versions?

Yes.
Redocly tracks the MCP specification and adds support for new versions soon after release.
The MCP server is stateless by design, which matches the direction of the 2026-07-28 specification version.

## Redocly Agent

### What does Redocly Agent do?

Redocly Agent is in early access.
It has two roles:

- **Reviewer** - Reviews pull request changes and posts review comments.
  It checks API descriptions, documentation quality, security-sensitive patterns, cross-document consistency, and Redocly configuration.
- **Writer** - Turns signals such as user feedback and analytics into proposed documentation changes.
  It opens draft pull requests.

### Is a human in the loop?

Yes, always.
The agent produces review comments and draft pull requests.
People read, edit, approve, or reject that output.
The agent cannot merge or push changes.
It makes no autonomous business decisions.

### What data does Redocly Agent access?

The agent reads the changed files in your project and the prior review comments.
It runs its tools in a sandbox.
The sandbox blocks access to secrets, and a redaction step removes credential-like strings from prompts.

## Prompt management

### Who owns the prompts?

Redocly owns and maintains the system prompts.
They live in source control, and changes ship through code review, like all other code.
You own your content and your optional project prompt (the [`aiAssistant.prompt`](../config/ai-assistant.md) option).

### What protects against prompt injection?

- The assistant grounds answers in content retrieved from your own project.
- Access control filters retrieval for every request, including tool calls inside a conversation.
- The MCP server is read-only until you ask Redocly to enable API execution.
- Redocly Agent tools run in a sandbox with secret redaction.
- Input size limits apply to all questions.

### How are wrong or unsafe answers handled?

The assistant cites its sources, so users can verify answers.
When it cannot find an answer, it says so, and analytics mark the conversation as "Not found".
Users flag bad answers with the feedback buttons.
The conversation log lets you audit every question and answer.

## Common questionnaire answers

Short answers to frequent AI governance questionnaire items:

{% table %}

- Question
- Answer

---

- Is the model fine-tuned on our data?
- No.
  The models are pre-trained and adapted with prompts and harness only.

---

- Is the model self-learning?
- No.
  The models are static.
  Redocly changes models only through evaluated releases.

---

- Can the AI make autonomous business decisions?
- No.
  AI features answer questions and draft suggestions.
  People make all decisions.

---

- How is model quality measured?
- Redocly runs evaluations before it changes models.
  Analytics track answer outcomes and user feedback.

---

- Is there bias and fairness testing?
- The features answer documentation questions.
  They make no decisions about people, so decision-bias frameworks do not apply.
  Redocly monitors quality through evaluation and feedback.

---

- How is model drift managed?
- The hosted models are static and do not drift by themselves.
  Redocly re-evaluates when providers release new versions.

---

- Is a vector database used?
- Yes.
  Redocly operates it inside the platform.
  Your content is not sent to a third-party vector database.

---

- Is conversational memory retained?
- Not on the server.
  The browser sends the recent messages with each request.
  Conversation logs remain in analytics.

---

- Is rollback supported?
- Yes.
  Redocly switches models through configuration, and prompts are versioned in source control.

{% /table %}

## Resources

- **[`aiAssistant` configuration](../config/ai-assistant.md)** - Configure, customize, or hide the AI assistant in your project
- **[`mcp` configuration](../config/mcp.md)** - Configure or disable the MCP server for your project
- **[MCP server overview](../customization/mcp-server/index.md)** - Connect AI tools to the MCP server and restrict access to it
- **[Project analytics](../reunite/project/analytics.md)** - Review AI assistant conversations, feedback, and usage data
- **[Access compliance reports](../reunite/organization/access-compliance-reports.md)** - Download the SOC 2 Type 2 report, penetration test report, and CAIQ answers
- **[Security vulnerability fixes](./security-fixes.md)** - How Redocly detects and releases security fixes
