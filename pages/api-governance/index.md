---
seo:
  title: API Governance
  description: Build strong API guidelines for your organization.
slug: /api-governance
---

# API Governance

The standards you adopt for your API speak volumes about your API identity to its users. Use our API guidelines builder, work out what matters to you and to your users - and then download a ready-made configuration file so you can start checking your API straight away.

## Use the API guidelines builder

The interactive tool below walks you through a series of design considerations for your API. Answer each question in turn, and watch the Redocly configuration file build up as you do.

Tips for API guidelines success:

- Set aside some time to work through the questions uninterrupted.
- Too many restrictive rules can be a barrier to adoption, so only add rules that you feel strongly about.
- Set a date to consider the questions again, in 3 or 6 months' time.

**Try the builder below** (your progress is saved so you can come back to it later).

{% quiz /%}

## API standards in practice

After taking the quiz above, you can download a Redocly configuration file that can check any OpenAPI file against the options that you selected.

1. Download the `redocly.yaml` file from the quiz.

1. [Install Redocly CLI](https://redocly.com/docs/cli/installation/) if you don't have it already.

1. Run Redocly CLI from the directory where you stored `redocly.yaml`, and give the path to your OpenAPI file (or copy that locally too). The command will be something like this:

    ```sh
    redocly lint openapi.yaml
    ```

1. Check the output to see how your API conforms to the standards.

1. Learn more about [API standards](https://redocly.com/docs/cli/api-standards/) and [check the full list of rules](https://redocly.com/docs/cli/rules/built-in-rules/) to develop your API governance practice further.

## Run a workshop to develop API standards

Bring together the API stakeholders in your organization and harness their perspectives and experience to build a set of API standards that fits your situation. We recommend a 90 minute time slot; meet in person if you can, or switch to full remote so everyone has their own place in the virtual call.

**During the session**

- For each question, look for quick consensus in the group. Many of these questions will merely formalize your existing API practices and won't need much discussion.
- For anything more contentious, set a 5 minute timer and ensure everyone in the group has the opportunity to put their point of view.
- All questions have an option that doesn't add anything to your rule set - use this for topics where agreement can't be reached, or where there is no strong view.

{% admonition type="success" name="Start small" %}
We always say "Start small". When adding API linting to your process, adding it with one rule is more valuable than you think. Once the linting process is implemented, you and your team can iterate towards your ideal standards.
{% /admonition %}


**Written standards**

- Make a note of anything that isn't exactly covered by the quiz, so you can expand your ruleset later. This is just to get you started.
- Also note any other conventions or API practices that the group agrees should be followed. Add them to a written standards document even if they can't be automatically checked. These can be used by humans at API review time.

**Facilitation**

If you can, invite someone in to the group as the facilitator, so that all stakeholders can participate fully in the discussions.

Refreshments can also help the process 😉

