---
seo:
  title: Contribute to documenting Redocly's open-source tools
slug: /gsod-casestudy
---

# Redocly - Season of Docs 2021: Case study

Redocly was founded in 2017 with the mission to get more consumers using APIs with less hands-on support. We were born out of **[Redoc](https://github.com/Redocly/redoc)**, the popular open-source OpenAPI documentation software project used by thousands of companies worldwide. We make API design and documentation software with the goal to improve the developer experience. Our suite of products makes our customers’ APIs more accessible and resultantly, more loved by their end users and consumers.

Our open-source tools allow developer teams to create clean, accessible documentation to complement their APIs. By making sure that the project documentation is complete, accurate and up-to-date, community contributors can add immense value to their open-source projects.

Authors: [@swapnilogale](https://www.linkedin.com/in/swapnilogale/) [@ivanadevcic](https://www.linkedin.com/in/ivanadevcic/)

## Problem statement

### Redoc

Our most popular open source project **Redoc** did not have comprehensive feature documentation.

- All project information existed in the README file on the GitHub repository and a few other topics within the docs folder in the repository.
- The README.md on the [Redoc GitHub repository](https://github.com/Redocly/redoc) was outdated and needed to be updated with relevant examples, screenshots and other information.

### OpenAPI CLI
The [OpenAPI CLI documentation](../../docs/cli) was publicly available for users.

- There were sections in the docs that needed to be updated or refreshed with relevant information.
- Community users found it difficult to find information quickly, and some of the new features were not completely documented.

## Proposal abstract

As part of Google Season of Docs 2021, technical writers working on this project would:
- Create documentation for Redoc and provide more examples of options, specification extensions and updated screenshots. This content would be published on Redocly's publicly accessible [technical documentation site](../../docs/index.md).
- Update the Redoc README with relevant examples, screenshots and other information.
- Update current documentation on OpenAPI CLI, available on Redocly's [technical documentation site](../../docs/cli).
- Organize and consolidate information and suggest ways to make the documentation more streamlined and responsive to customer feedback.
- Incorporate feedback from documentation testers (volunteers in the project) and the wider community.
- Work with the Redocly team to test existing documentation end-to-end, and identify opportunities for improvement.

For more information, see the [Redocly's Google Season of Docs](./gsod.md) page.

## Project description

### Creating the proposal

Redocly became aware of the Google Season of Docs 2021 from the Write the Docs Slack community. While Redocly as an organization had not participated in Google Season of Docs or Summer of Code before, one of our internal technical writers [@swapnilogale](https://www.linkedin.com/in/swapnilogale/) had participated in the Google Season of Docs 2019 and successfully worked with an open-source project to create documentation for their project. Our other internal technical writer [@ivanadevcic](https://www.linkedin.com/in/ivanadevcic/) is actively involved in the KDE community both as a mentor and a contributor.

As a first step, we discussed the program and identified our open source projects that required documentation. After an initial meeting with the organization founders and maintainers of the open source projects, our technical writers came up with some ideas on how we could approach our open source projects for documentation.

Our technical writers set up a draft proposal and sent it for review to the open source project management team. Once the proposal was internally reviewed and approved, [@swapnilogale](https://www.linkedin.com/in/swapnilogale/) set up the proposal page on our corporate website and submitted the proposal via the Season of Docs submission process. We also ensured we had the appropriate [Open Collective](https://opencollective.com/openapi-cli) account set up, required to participate in the program and oversee payments.

### Budget

Both our internal technical writers at Redocly have worked as documentation contractors/consultants (one in Europe, and one in Australia and US).

Along with Redocly's co-founder [@adamaltman](https://twitter.com/adamaltman), our internal technical writers were able to estimate the work effort, having worked on similar project budgets, comparing the draft proposal work they had done before. This allowed Redocly to estimate the overall project, including volunteer stipends, design assets and project swag.

There were no unexpected expenses outside the approved grant budget.

For more information on the budget and what was estimated, see the [Project budget](./gsod.md#project-budget) section.

### Participants

The core team working on our projects consisted of:

- [@adamaltman](https://twitter.com/adamaltman) and [@romanhotsiy](https://twitter.com/RomanHotsiy) (Redoc and OpenAPI CLI project maintainers)
- [@patrickchiang](https://www.linkedin.com/in/patrickpchiang/) (Redoc and OpenAPI CLI project payments and contracts)
- [@swapnilogale](https://www.linkedin.com/in/swapnilogale/) (admin, mentor, reviewer)
- [@ivanadevcic](https://www.linkedin.com/in/ivanadevcic/) (mentor, reviewer)
- [@antonzolotukhin](https://www.linkedin.com/in/bandantonio/) (technical writer, OpenAPI CLI project)
- [@heathercloward](https://www.linkedin.com/in/heather-cloward-uxc-a4417878/) (technical writer, Redoc project)

**Advertising, recruiting and coordinating**

We advertised and promoted Redocly's proposal on the dedicated Write the Docs GSoD channel and social media. We received over 20 applications from interested participants globally who wanted to contribute to our open source project documentation.

From this list, we shortlisted 4-5 applicants and set up video interviews to walk the applicants through the project requirements. We also asked them to come up with a project plan to tackle the documentation issues and an estimated timeline. This allowed us to understand how they planned to approach the project.

After the interviews, we recruited 2 technical writers for our projects. A few weeks after kicking off the projects, one of the technical writers had to unfortunately drop out due to family emergency reasons. We were contacted by another technical writer on Write the Docs Slack who expressed interest in contributing to the project documentation as part of Google Season of Docs. We interviewed her and brought her on as a replacement for the second technical writer.

Redocly worked with the technical writers to sign contracts, outlining the expected deliverables and payments as discussed in the recruiting process.

We collaborated with Redocly developers who helped us set up the documentation repositories and an automatic synchronization process between the project documentation.

In addition to the core team, we also got a graphic designer to create design assets for the Redocly program.

**Communication and updates**

- Working in a docs-as-code environment, technical writers were able to quickly create documentation and submit Pull Requests (PRs) for review and feedback.
- We set up a fortnightly sync with the technical writers on the two projects, to discuss documentation updates and other issues.
- Technical writers were invited to a Redocly Slack channel specifically set up for the Season of Docs.
- Outside this, technical writers could also communicate by email for any other issues with the project.

As the Google Season of Docs administrator for Redocly, [@swapnilogale](https://www.linkedin.com/in/swapnilogale/) set up a GitHub project board to keep track of various milestones and documents submitted to the open source project repositories. The GitHub board also allowed us to show management the entire project status along with issues, PRs, dates and other milestones.

**Payments via Open Collective**

As part of the hiring process, we asked the technical writers to register for an account on Open Collective to submit expenses and receive scheduled payments as discussed.

However, we found the experience working with Open Collective less than ideal. The technical writers were:

- Able to create an account, but had a lot of trouble receiving payments via Open Collective. We reached out to Open Collective to sort out these issues, but it took a long time for these to be fixed.
- Able to submit expenses/invoices for monthly payments successfully.

Redocly ended up paying the technical writers directly via a bank transfer against the expenses/invoices submitted via Open Collective.

### Timeline

Stage | Completed by
------| -------------
**Kick-off** |
Project kick-off and onboard tech writers (TWs) | 1 June 21
Grant TWs appropriate access to GitHub repos | 4 June 21
**Review and finalize project** |
Review project requirements | 4 - 15 June 21
Test and review existing docs | 15 - 30 June 21
Prepare a plan for documentation and set up tasks | 1 - 10 July 21
Developers set up docs folder sync | 18 July 21
Onboard second (replacement) technical writer | 21 July 21
Finalize documentation tasks and expected timelines| 29 July 21
**Docs development phase** |
Start creating PRs for review | 1 August 21
Set up fortnightly meetings for project team and TWs | 1 August 21
First PRs reviewed and merged (OpenAPI CLI overview and Redoc quickstart) | 19 August 21
Docs sync'd and published | 19 August 21
Subsequent PRs reviewed and merged (OpenAPI CLI commands and Redoc installation) | August - October 21
Docs sync'd and published | August - October 21
**Finalization phase** |
Finish docs development and finalize PRs | 15 November 21
TWs working on project reports | 15 - 30 November 21
Working on Season of Docs case study | 1 - 30 November 21
Case study submitted | 30 November 21

### Results

**OpenAPI CLI**

Working on this project, [@antonzolotukhin](https://www.linkedin.com/in/bandantonio/):

- Updated the OpenAPI CLI Overview page to be consistent, organized and better oriented for first-time readers. [OpenAPI CLI #334](https://github.com/Redocly/openapi-cli/pull/334)
- Created a new Installation guide to make it easier for newcomers to start working with Redocly's OpenAPI CLI project. [OpenAPI CLI #337](https://github.com/Redocly/openapi-cli/pull/337)
- Verified, organized and revised the OpenAPI CLI commands documentation:
   - [Commands home page](https://github.com/Redocly/openapi-cli/pull/345)
   - [bundle](https://github.com/Redocly/openapi-cli/pull/350)
   - [login and logout](https://github.com/Redocly/openapi-cli/pull/351)
   - [join](https://github.com/Redocly/openapi-cli/pull/353)
   - [lint](https://github.com/Redocly/openapi-cli/pull/360)
   - [preview-docs](https://github.com/Redocly/openapi-cli/pull/361)
   - [push](https://github.com/Redocly/openapi-cli/pull/363)
   - [stats](https://github.com/Redocly/openapi-cli/pull/383)
   - [split](https://github.com/Redocly/openapi-cli/pull/384)
- Submitted issues [#370](https://github.com/Redocly/openapi-cli/issues/370), [#371](https://github.com/Redocly/openapi-cli/issues/371), and [#372](https://github.com/Redocly/openapi-cli/issues/372) related to the `bundle` command while testing the project, that were fixed by the developers.

We had originally planned for the following documentation, but shifted our focus to other high priority documents. Resultantly, we did not get a chance to complete these as part of the Season of Docs:

- OpenAPI CLI guides
- OpenAPI CLI resources

{% admonition type="success" name="Success" %}
[@antonzolotukhin](https://www.linkedin.com/in/bandantonio/) has [published his experience](https://mister-gold.pro/posts/season-of-docs-2021/) of working with Redocly as part of the Google Season of Docs 2021.
{% /admonition %}

**Redoc**

Working on this project, [@heathercloward](https://www.linkedin.com/in/heather-cloward-uxc-a4417878/):

- Organized and cleaned up the changelog. [Redoc#1713](https://github.com/Redocly/redoc/pull/1713)
- Transformed the table comparing Redoc vs. Redocly Reference vs. Redocly Portals to Markdown and added it to the README. [Redoc#1748](https://github.com/Redocly/redoc/pull/1748)
- Added a quickstart guide for using Redoc React component. [Redoc#1718](https://github.com/Redocly/redoc/pull/1718)
- Added a quickstart guide for Redoc. [Redoc#1718](https://github.com/Redocly/redoc/pull/1718)
- Updated the README by removing outdated content and adding new content. [Redoc#1748](https://github.com/Redocly/redoc/pull/1748)
- Added usage example, BoxKnight - [Redocly#651](https://github.com/Redocly/redoc/pull/1651)
- After reviewing the quickstart guides, reorganized and did some copy editing. [Redoc#1749](https://github.com/Redocly/redoc/pull/1749)
- Responded and addressed review comments on PRs.

We discussed a few other documentation ideas, but did not get to complete these:

- Create a troubleshooting page for Redoc issues, based on a [draft FAQ document](https://github.com/Redocly/redoc/pull/1352).
- Additional information for the README page, based on an [Update README](https://github.com/Redocly/redoc/issues/1291) issue.
- Creating guides on how to use Redoc with other documentation site generators and tools.

**Documentation synchronization**
As part of the overall Google Season of Docs, we were able to automate synchronization between our open source documentation and our [core Redocly documentation](../../docs/index.md), which enables future contributors to easily suggest changes, or improvements to our documentation.

### Metrics

At the start of the project, we would consider the project successful if, after publication of the new documentation:

- There is a decrease in the number of issues and community questions by 20%
- There is an increase in the number of contributions for creating or updating documentation.

We also identified that since some of this documentation, particularly Redoc was brand new, we would consider it successful if saw an increase in traffic and feedback for the documentation.

**What our numbers tell us**

We track all our documentation with HotJar and Google Analytics. Since July, when we released product documentation for Redoc and started updating documentation for OpenAPI CLI project as part of the Season of Docs, we have noticed:

- A 95% increase in the number of users viewing the OpenAPI CLI docs from July. We made a few changes to the information architecture of the documentation site, and that also helped users find content more easily.
- Quick uptake of the Redoc documentation with the newly added content making an immediate impact for our open source project users. This was evident from the decrease in the number of support questions for this project.
- Greater number of users contributing to our open source projects via issues, fixes and contributions.
- Increase in the number of upvote feedback we received from our users for the OpenAPI CLI and Redoc documentation.

### Analysis

At Redocly, we are very pleased with the outcome of our first Season of Docs experience and consider it a success. The new documentation is clear and helpful, and we have already seen some growth in the number of users contributing to our open source projects.

Along with the technical writers who contributed to the documentation, our internal technical writers also relished the opportunity to mentor and work with the external technical writers. Our Season of Docs technical writers gave our team a good balance and some really good ideas around the documentation which allowed Redocly to tick off some important goals with our open source projects.

We did face a few unexpected hurdles:

- One of our originally recruited technical writers had to travel overseas urgently for family emergency purposes and was not contactable for weeks. We had to find a replacement technical writer (which we did), but it probably cost us 2-3 weeks in docs planning and development time.
- Some of our documentation for the open source projects did not exist or was only handled as part of Redocly premium products. Participating in the Season of Docs allowed us to reflect on and make some changes to the way our documentation is created and published, which has now made it more efficient for anyone to contribute to our open source projects documentation.

## Summary

Overall, our experience with Google Season of Docs was excellent. We achieved some fantastic results with our documentation deliverables and the feedback from users backs up this effort.

We would like to thank [@antonzolotukhin](https://www.linkedin.com/in/bandantonio/) and [@heathercloward](https://www.linkedin.com/in/heather-cloward-uxc-a4417878/) for their efforts on the documentation.

Anton had previous experience working with the Season of Docs program, so his past experience greatly helped in setting expectations and managing his work on the project. He also uses our open source projects at his current job, so familiarity of, and understanding of pain points greatly amplified his contribution on the documentation.

Heather has many years of experience as a technical writer, and was quick to adapt to and test our existing tools and documentation. She was able to develop a good understanding of the open source project and suggested many improvements to the documentation which she helped implement as part of the Season of Docs.

While we were extremely lucky to find two amazing technical writers, and with some experience of [@swapnilogale](https://www.linkedin.com/in/swapnilogale/) working with a previous Season of Docs, we would like offer some points of advice for other organizations with a similar problem with their open source documentation:

- Identify the scope of your project early, and allow for changes based on technical writer skills and preferences.
- Leverage your documentation networks when looking for a technical writer. We received quite a few emails in response to our proposal, but also reached out to the Write the Docs community to spread the word for our proposal.
- Set up a process to welcome contributors, and document the process for future projects.
- Schedule regular catch ups and set up multiple communication channels, including Slack, and email.

## Appendix

None

### Acknowledgements

Our team would like to acknowledge:

- [@antonzolotukhin](https://www.linkedin.com/in/bandantonio/) for his contributions to the OpenAPI CLI project and putting up with heaps of feedback from his mentors
- [@heathercloward](https://www.linkedin.com/in/heather-cloward-uxc-a4417878/) for her diligent work on the Redoc project, and stepping in to help us out with this project at short notice
- [@adamaltman](https://twitter.com/adamaltman) and @romanhotsiy for their ongoing contributions to the open source community and helping out resolve code and other docs issues quickly
- [@swapnilogale](https://www.linkedin.com/in/swapnilogale/) for his marvellous project management and problem-solving skills, and for being a supportive leader who kept the whole project running smoothly
- [@ivanadevcic](https://www.linkedin.com/in/ivanadevcic/) for being an awesome mentor, a great community contributor and an overall excellent technical writer
- [@patrickchiang](https://www.linkedin.com/in/patrickpchiang/) for seamlessly monitoring and resolving project level issues, and managing contractor agreements and payments.
- @vladperea for his awesome work on the Redocly swag design for Google Season of Docs 2021, and
- @leocete for setting up the repository/Git sync between our open source docs and our core documentation.
