---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
---

# Configure AI assistant support escalation

Support ticket escalation lets users send a conversation from the [AI assistant web component](../../ai-assistant-web-component/ai-assistant-web-component.md) to your support team.
When a user needs a human, the assistant offers a **Contact support** button.
The button opens a ticket form.
The ticket arrives at your support email, with the transcript.

## Before you begin

Make sure you have:

- the [AI assistant](../../config/ai-assistant.md) enabled in your project
- the maintainer or admin role for the project
- the support email address that receives the tickets

## Configure escalation

{% numbered-list %}
  {% numbered-item %}
  In your project's workspace, select **Settings > AI assistant**.
  {% /numbered-item %}
  {% numbered-item %}
  Enable **Support ticket escalation**.
  {% /numbered-item %}
  {% numbered-item %}
  Enter the **Support email** that receives the tickets.
  {% /numbered-item %}
  {% numbered-item %}
  (Optional) Enable **Proactive escalation**, so the assistant decides when to offer it.
  {% /numbered-item %}
  {% numbered-item %}
  (Optional) In **Show escalation option after**, enter the number of user messages after which the assistant shows the escalation button.
  Allowed values: numbers between `1` and `50`.
  Default: `3`.
  {% /numbered-item %}
  {% numbered-item %}
  Select **Save**.
  {% /numbered-item %}
{% /numbered-list %}

Escalation needs no setup on the host page.
The assistant picks up the settings on its next conversation.

## What users see

The assistant shows a **Contact support** button when any of the following happens:

- the assistant decides a human should take over, with **Proactive escalation** on
- the conversation reaches the configured number of user messages
- a request to the assistant fails

The form asks for **Name** (optional), **Email** (required), and **Message** (optional).
Once the user sends it, the assistant confirms the ticket.
The conversation then continues as normal.

## What the ticket contains

Each ticket arrives as an email at the configured address, and holds:

- the user's email, plus their name and message when provided
- the conversation transcript
- the URL of the host page

A long conversation keeps only its most recent messages.
The transcript holds at most 30 messages, up to 5,000 characters for each message, and 30,000 characters in total.

## Track escalations in Analytics

Once you turn escalation on, the **AI Assistant conversations** page in [Analytics](./analytics.md) shows two more tiles:

- **Escalations**: conversations that ended in a support ticket
- **Ticket prevention**: the share of conversations that did not

Each escalated conversation carries a tag in the list, and you can filter the list by escalation.

Conversations from embedded assistants also record the domain of the host page.
An **Origin** filter appears once such conversations exist.
Use it to compare usage across the sites where the assistant runs.

## Resources

- **[AI assistant web component](../../ai-assistant-web-component/ai-assistant-web-component.md)** - Embed the assistant on any web page
- **[Identity tokens](../../ai-assistant-web-component/identity-tokens.md)** - Answer from RBAC-protected content for signed-in users
- **[Reference](../../ai-assistant-web-component/reference.md)** - Every attribute, method, and event
- **[Analytics](./analytics.md)** - Track assistant conversations and feedback
- **[`aiAssistant`](../../config/ai-assistant.md)** - Configure the AI assistant built into your project
