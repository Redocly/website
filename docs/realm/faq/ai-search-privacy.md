---
title: AI Search data usage FAQ
description: How AI Search in Redocly uses your data and complies with enterprise privacy requirements
---

# AI Search data usage FAQ

This FAQ explains how Redocly AI Search uses your data, which models are used, and how the feature complies with enterprise privacy requirements.

---

## Does AI Search train on our data?

No.
AI Search in Redocly does not use your data to train or fine-tune any AI models.

---

## How does AI Search work?

AI Search uses **hosted large language models (LLMs)** accessed via:
- **AWS Bedrock**, and
- **Google Cloud Vertex AI (Gemini)** — depending on configuration and ongoing model evaluation.

These services run models in **inference-only mode**.

How a search request works:

1. **Embeddings** are generated from your documentation using an LLM (via AWS Bedrock).
  These are stored in **Redocly’s own vector database** for fast retrieval.
2. When a user submits a search query:
    - The query is embedded and matched against the vector database.
    - Relevant text snippets are selected and **re-ranked**.
    - A **system prompt**, an optional **project-specific prompt**, and the selected snippets are sent to an LLM to generate an answer.
3. The LLM generates an answer in real time.
    No model training or fine-tuning is performed.

---

## What data is sent to the model?

For each search request, Redocly sends:

- The **user’s search query**
- A **system prompt** (defined by Redocly)
- An **optional project prompt** (customer-configurable)
- Selected **documentation excerpts** (API specs, markdown, etc.) based on vector search and re-ranking

This data is used only to generate the search response.
It is not used to train or adapt any model.

---

## Are prompts or responses stored by Redocly or by model providers?

- **AWS Bedrock:** does not use customer data, prompts, or responses to train models ([AWS Bedrock privacy](https://aws.amazon.com/bedrock/amazon-models/privacy/)).
- **Google Gemini:** supports inference-only operation without training on customer content ([Gemini data governance](https://cloud.google.com/gemini/docs/discover/data-governance)).

**Redocly:** does not store prompts or responses for model training, and does not share them with model providers.

---

## Is any of our data used to improve the AI models?

No.
Your data is not used to train, fine-tune, or otherwise improve any underlying AI models used by AI Search.

---

## Is this compliant with enterprise data privacy requirements?

Yes.
Because the models are used in **inference-only mode** and your content is not used for model training, AI Search supports common enterprise privacy and compliance expectations.

---

## Can we configure or disable AI Search?

Yes.
You can configure an **optional project prompt** to adjust the tone or style of responses — or you can choose to **disable AI Search entirely** if desired.

See: [AI Search configuration](../config/ai-assistant.md)

---

## Which models does Redocly use?

Redocly AI Search uses LLMs accessed through:

- **AWS Bedrock**
- **Google Cloud Vertex AI**

We may periodically test and update model selections to optimize quality and performance.
All models are used in inference-only mode and follow the same data usage principles.

---

## How does AI Search work in private projects?

AI Search respects your project's access control settings.
When a user searches in a private project, AI Search checks:

- **User authentication** - The search uses the user's session credentials
- **Team membership** - Results are filtered based on teams the user belongs to
- **RBAC configuration** - Content is filtered according to role-based access control rules

Users can only see search results from content they have permission to access based on their team membership and roles.

---

## Can AI Search access RBAC-protected content?

Yes.
AI Search indexes all content in your project, including pages protected by RBAC configuration.

However, RBAC rules are enforced at search time.
When content is indexed, it stores the team access information.
When users search, results are filtered to show only content their teams have access to.

This means:
- Content protected by RBAC is indexed for fast retrieval
- Users only see results from pages their teams can access
- Anonymous users only see publicly accessible content

