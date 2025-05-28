---
template: '../@theme/templates/BlogPost'
title: Tips for Documentation Migration
description: Make your documentation migration a huge success with these practical tips on planning, collaboration, and quality checks.
seo:
  title: Tips for Documentation Migration
  description: Make your next documentation migration a huge success with these practical tips on planning, collaboration, and quality checks.
author: taylor-krusen
date: 2024-07-17
categories:
  - tips
  - migration
image: blog-5.png
---

# Tips for Documentation Migration

A documentation migration is an exciting opportunity for growth and improvement; a step forward for both your writers and readers. It can also be challenging. However, with the right mindset and plan, you can make your migration a positive, unifying experience that builds internal momentum and enthusiasm for your documentation. The tips in this blog post are based on firsthand insight and meant to help you successfully navigate a documentation migration.

## Plan your migration timeline

A well-defined timeline is the key to a more successful documentation migration. You want to have clear picture of all steps involved and their overall timing.

### Consider a content freeze

If possible, schedule a "content freeze" date in your timeline to prevent new changes to the documentation. This will ensure you're migrating the most recent, stable versions of the content.

If you can't do a content freeze, then use the "content snapshot" approach instead. Take a snapshot of your content with a publicized date and migrate that content. Once the new platform goes live, change it to read-only and migrate the post-snapshot changes.

### Run two platforms

Plan on running both the old and new documentation simultaneously for a brief period. This has two benefits:

1. **Fallback strategy** -- If something goes wrong, point your DNS at the pre-migration instance of your docs.
2. **Safety net** -- Users can access the older version of the docs if needed.

## Engage stakeholders early

Migrations are more successful when they involve project stakeholders from the very beginning. They may have insights or requirements that shape the migration.

### Identify documentation allies

Identify teams who benefit from the migration, but aren't directly involved, such as technical sales, API support, or customer success. Tell them about the documentation migration plan, timeline, and expected outcomes. Collect their requirements or feedback.

The goal at this stage is to build awareness and cultivate a sense of shared ownership in the project.

### Enable contributors

Define the roles and responsibilities for potential contributors. Explain how proposed tasks contribute to a successful migration and how they should engage with the project. Set expectations around communication, project updates, and check ins. Use shared documents to encourage and guide potential contributors. It should show them how to engage with the project, work through issues, and provide feedback.

## Develop communication process

Effective communication is essential for encouraging collaboration on your migration project, especially for teams working asynchronously. Use the following tips to define a clear, consistent communication process:

1. **Communication channels** -- Provide dedicated channels for communication between migration team members and stakeholders. For example, messaging tools like Slack or Teams, email lists, or feedback forms. Ensure the channels are monitored and questions get answered.

2. **Project updates** -- Use existing channels to provide updates on the migration to all stakeholders using a consistent process. Updates should include milestones, potential issues, or upcoming tasks.

3. **Information hub** -- Create a central page where all information about the migration can be accessed. For example, an internal-only web page, employee-facing wiki, or shared document. It should include timeline, roles and responsibilities, project milestones, and links to relevant resources and tools.

4. **Clear instructions** -- Provide instructions and documentation for each stage of the migration. This includes any resources that help team members or contributors understand their tasks and how to complete them. For example, step-by-step guides or checklists.

By maintaining regular, clear, and open communication, you can keep all migration stakeholders informed and engaged.

## Content inventory and plan

Use a thorough inventory of content and careful planning to avoid missing or outdated content during migration.

Create a list of all current content in your documentation that serves as the central source of truth for managing the migration. The list can be used for managing tasks, tracking progress, recording feedback, and more.

### List current content

Build the initial list by exporting a page traffic report from your analytics tool. Besides providing a clear overview of your content, page activity can be used to prioritize your migration efforts.

Use the following steps to build your content list:

1. Open a page report for the last year in your preferred analytics tool (i.e. Google Analytics, Fathom, Amplitude).
    - Include URL, page title, pageviews, user count, or any other info that may help make informed decisions.
2. Export in CSV or spreadsheet format.
3. Import into spreadsheet editor (i.e. Excel, Numbers, Google Docs).
4. Freeze top row and sort the data using filters. For example, highest to lowest pageviews.

{% admonition type="info" %}
  After using filters and sorts to change your view of the content, copy the view into a new table. This helps group the content into smaller logical sections you can organize work around.
{% /admonition %}

### Plan information architecture

Evaluate your current information architecture and decide whether changes are needed. When planning the structure, identify content that needs to be updated, removed, or can serve as a template. Well-organized content creates a more user-friendly experience.

### Automate content conversion

Use tools or scripts to automate as much of the content conversion as possible, even if there's engineering cost. This improves the quality and consistency of migrated content. It also reduces manual workload, ensures consistent formatting, and is more scalable. Look for pre-existing plugins or scripts to handle the bulk of the work where possible.

#### Track content migration status

Use your content list to track whether content has been converted during migration. In addition to the status, it's valuable to track more context about the converted content.

- Tracking content's conversion date can help identify whether it used the most recent version of your conversion script.
- For content requiring _manual_ conversion, tracking the author's first and last name allows you to follow up if needed.

## Plan redirect strategy

Redirects are important for maintaining a good user experience during migration. Plan your redirect behaviors in advance avoid broken links and 404 errors, reducing user's friction.

### Use wildcard redirects

Redirect all visits to URLs that match a certain pattern with "wildcard redirects". For example, pretend we're migrating from "old-docs.com" to "new-docs.com" and configured this wildcard redirect: `old-docs.com/guides/*`. Here's how the URLs would resolve:
- Visits to `old-docs.com/guides/user-onboarding` are redirected to `new-docs.com/guides/user-onboarding`.
- Visits to `old-docs.com/guides/testing` are redirected to `new-docs.com/guides/testing`.

There are two reasons wildcard redirects are valuable for migrations:

1. **Fewer manual redirects** -- If route structure stays the same, wildcard redirects greatly reduce the need for manual redirects, saving manual effort while eliminating a vector for human error.
2. **Better UX for broken links** -- Wildcard redirects can catch visits to broken links and send those users somewhere more useful than a 404 page. For example, a user following a broken link to `/blueprints/playgrounds/build-a-playground` could be redirected to `/blueprints` or `/blueprints/playgrounds`.

### Track redirects

For each piece of content on the list, track all redirects related to that content. This ensures all potential redirects are accounted for and tested during migration QA ([quality assurance](#quality-assurance-and-deployment)).

## Quality assurance and deployment

Ensure a smooth, successful migration with a well-crafted process for quality assurance

### Distribute quality assurance checks

Spreading the quality assurance checks out to stakeholders is a good way to catch any issues before final launch. Break content into sections, assign specific tasks to reviewers, and provide clear instructions. Track progress and feedback to ensure comprehensive quality checking.

### Deployment plan

Decide when you're going to deploy the documentation. A good approach is to aim for ~85% completion, then plan for ongoing updates and improvements post-launch. This can help work through content that rarely-used content or identify content that can be safely deprecated.

Tips on creating your deployment plan:

- During "go live" on the new docs, have [contributors](#enable-contributors) ready to test the site in different geographical regions.
- Have a [rollback plan](#have-a-rollback-plan) in place that is communicated to all stakeholders.
- After the DNS is updated, keep the legacy docs live so you can switch back if needed by running [two platforms](#run-two-platforms).

## Prepare for issues

Preparing for potential issues ahead of time to minimize disruptions and maintain user trust.

### Provide feedback channels

Inform users about the migration and offer a streamlined way to report issues. Being candid with your users will earn you a lot of goodwill. The goal here is to build rapport and minimize friction. Some tips:

- Add a dismissible banner or notice at the top of your docs that reads something like:
    > "We migrated our docs! Everything should be the same. Kindly report any problems you find and we'll fix them ASAP."
- Provide a form or process for users to submit actionable feedback.
- Create process for quickly triaging and fixing user-reported issues.

### Have a rollback plan

Having a rollback plan is like having a big "Reset" button for your documentation. You can use it to quickly restore the docs to a previous state and avoid major user experience issues. Some tips:

- Backup your data and have a backup ready to go. You might need it.
- Test your rollback strategy **before migration**.
- Rolling back early is better than rolling back late.

## Use tips for a successful migration

Documentation migrations are a unique challenge, but have tremendous upside. With careful planning, support from stakeholders, and a good communication strategy, your migration can be a rewarding experience that rallies your company around the docs. The next time you have to migrate documentation, use these tips and strategies to make it a success for your entire organization and end-users.

## More resources

- Migrations can be a great time to improve the [examples in your API reference](./openapi-examples.md), which have an outsized impact on user experience.
- The Redocly CLI can create lots of value for migrations involving API descriptions. Explore the [Redocly CLI cookbook](https://redocly.com/blog/redocly-cli-cookbook) for examples and inspiration.
- We're working on something awesome. Subscribe to [Redocly Product Updates](https://redocly.com/product-updates) to be the first to hear about it!
