---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
excludeFromSearch: true
---

# Configure AI assistant support escalation

With the support ticket escalation feature, end users can send conversations from the [AI assistant web component](../../ai-assistant-web-component/ai-assistant-web-component.md) to your support team.
For users who require human support, the AI assistant offers a **Contact support** button that opens a ticket submission form.
Submitted tickets arrive at your support email together with the conversation transcript.

{% partial file="../../_partials/early-access.md" /%}

The assistant displays a **Contact support** button when:

- the assistant decides a human is needed (with **Proactive escalation** on)
- the conversation reaches the configured number of user messages
- a request to the assistant fails

Clicking the button opens a short form with **Name** (optional), **Email** (required), and **Message** (optional) fields.
After the user sends the form, the assistant confirms the ticket was created and the conversation continues normally.

Each ticket is delivered as an email to the configured address and contains:

- the user's email, and their name and message when provided
- the conversation transcript
- the URL of the page where the assistant was embedded

A long conversation keeps only its most recent messages.
The transcript holds at most 30 messages, up to 5,000 characters for each message, and 30,000 characters total.

## Before you begin

Make sure you have:

- the [AI assistant](../../config/ai-assistant.md) enabled in your project
- the maintainer or admin role for the project

## Configure escalation

1. In your project's workspace, select **Settings > AI assistant**.
1. Enable **Support ticket escalation**.
1. Enter the **Support email** that receives the tickets.
1. (Optional) Enable **Proactive escalation** to allow the assistant to decide when to offer escalation.
1. (Optional) In **Show escalation option after**, enter the number of user messages after which the escalation button is displayed in the conversation.
    Allowed values: numbers between `1` and `50`.
    Default: `3`.
1. Click **Save**.

The AI assistant displays the **Contact support** button for conversations that meet the set criteria.

## Track escalations in Analytics

When escalation is configured, the **AI Assistant conversations** page in [Analytics](./analytics.md) displays two additional tiles:

- **Escalations**: conversations that ended in a support ticket
- **Ticket prevention**: the share of conversations that did not

Each escalated conversation is tagged in the conversation list.
You can filter the list by escalation.

Conversations from embedded assistants also record the domain of the embedding page.
The **Origin** filter appears on the page once such conversations exist, so you can compare usage across the sites where the assistant is embedded.

## Resources

- **[AI assistant web component](../../ai-assistant-web-component/ai-assistant-web-component.md)** - Embed the AI assistant on any web page and customize its appearance and behavior
- **[Analytics](./analytics.md)** - Track AI assistant conversations and feedback for your project
- **[`aiAssistant`](../../config/ai-assistant.md)** - Configure the AI assistant built into your project
