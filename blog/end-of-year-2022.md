---
template: '../@theme/templates/BlogPost'
title: A challenging year
description: A review of 2022 at Redocly
seo:
  title: A challenging year
  description: A review of 2022 at Redocly
author: adam-altman
date: 2023-01-08
categories:
  - dev-portal
  - docs-as-code
  - tech-writers
  - developer-experience
image: team.png
---

Let's start by setting the stage for 2022.
It started as a natural extension of the previous year.
Then, in February the [war in Ukraine](./ukraine-war.md) started.
A couple of months later the capital markets became tentative.
A few months later inflation and recession were concerns.
And all the while, the war has raged on. (Side note: our Ukrainian team members are safe, some relocated, and they thank you for your support.)

Given that environment, our 2022 inside Redocly was surprisingly steady with one major surprise (I'll share later on).
A refresher on where we left 2021 from our end of year wrap:
> Our mission was to not only further improve the consumer experience, but also make steady progress on the producer experience by offering the right tools and knowledge to build outstanding products.

In this post, we highlight some of the most useful features we delivered this year across our products, as well as announcing a major surprise.

## A quick note on security

The number of security events published in the past few weeks is alarming.

In our continued dedication to security, we are happy to announce that Redocly Inc. has already completed the second annual SOC 2 type 2 audit and our compliance records are available.
As part of our new website, we also have a [security page](../pages/security/security.page.tsx), and added some docs about how to [access our security reports](../docs-legacy/settings/security.md).

## New website and docs revamp

We started the year in style, shipping a new marketing website (the one you're reading), on February 1st.
The website (as was our previous one), including all of the marketing pages, and blog posts, is powered by our developer portal software.

What's more important than fancy new designs is the content and information architecture.
We added a new area of content called [customer stories](https://redocly.com/customers/).
These are effectively case studies, which take a long time to produce because our customers need to go through a process of getting legal approval, marketing approval, and also take the time to participate in interviews and revisions.

One of the things that make our customer stories unique, is they are unpaid.
The only incentive is our customers genuinely want to see Redocly succeed because they like what we've done and want to help us get to where we're going.
Big thanks to [Australia Post](../pages/australia-post/australia-post.page.tsx), [Checkr](../pages/checkr/checkr.page.tsx), [viesure](../pages/viesure/viesure.page.tsx), [Brex](../pages/brex/brex.page.tsx), and [Viking Cloud](../pages/viking-cloud/viking-cloud.page.tsx) for participating in these (and a secret thanks to some others who are still working through those legal and marketing approvals).

## Workflows

_Workflows_ brings a powerful set of DocOps to your docs-like-code practice, helping teams throughout the API lifecycle.
In 2022, we added:
- Enterprise-grade role permissions and access controls
- Access your billing history
- Ability to turn off the default Redocly URLs for docs
- Inline OIDC configuration
- Hosted mock servers (launched on April fools with a joke [name Remockly](./redocly-is-remockly.md) -- and later on in the year we added easy integration into API docs)
- Made SSO available in pro plans
- File editing
- API style guides organization-wide enforcement
- And more!

![Features](./images/workflows.png)

***

## Developer portal

Redocly's developer portal is a one-stop shop for all your API documentation, how-to guides, tutorials, examples and code samples.

We rebuilt the developer portal from the ground up, and plan to release it in the middle of 2023.
That is a topic worthy of multiple blog posts.
However, it is good to note it is going to be easy to migrate from the current portal to the new one and get some major performance enhancements and many new features when the time comes (we already have a few customers with early access).

Despite us building the new portal, that didn't stop us from shipping features in the current one. We will continue to support the current-gen portal through 2024 or 2025.

These are highlights of the features we shipped in 2022:

- Multiple sidebars support
- Many analytics provider integrations (and A/B testing tools and customer data platforms)
- API catalog
- Edit page button (optional)
- New ways of integrating API docs into the portal
- Page table of contents header ("On this page" and an option to change it)
- Option to display a sidebar navigation on pages that aren't listed in sidebars
- Option to lint API definitions during the portal build process
- Enhanced the search usability
- Enhanced redirects with wildcard redirects
- Fixed many bugs
- And more!

![Features](./images/devportal.png)

***

## API docs (fka Reference docs)

We renamed reference docs to API docs.

These are the features we shipped in version 2.0 of API docs.
We also built version 3.0 (but that is being shipped with our next-generation portal mid-2023).

- Download button for files in the try it panel
- `R` language auto-generated code samples
- Use examples in the try it panel (and vice versa: update examples based on try it data)
- Ways to [display schemas easily](./display-schemas.md)
- Additional hooks to extend data presented or to inject third-party data
- Variety of new theme options and feature toggles
- And more.

We're excited to ship our version 3.0 which also adds support for css tokens taking ease of styling to the next level and shares some common components between both OpenAPI and GraphQL docs.

![Features](./images/refdocs.png)

***

## Redocly CLI (fka OpenAPI CLI)

We improved Redocly CLI a lot.
We were hopeful for a general release in 2022.
The product is **so good** and I'm really proud of the team's progress, but there was one hold-up: universal configuration.
Our next-generation product is scheduled for release in mid-2023.
We want all of our open source tools and the next-generation tool to be able to use the same configuration file.
However, there are some conflicts that need to be resolved before we can release the product for general use.

The product has millions of installs from npm (not bad for a beta).

Read more about Redocly CLI fixes and enhancements by visiting the [Redocly CLI changelog](../docs/cli/changelog).

## Redoc 2.0 released 🎉

We released Redoc 2.0 into general availability.

Redoc has been installed over 30 million times from npm and powers over 100,000 API documentation websites.

We're very grateful to the community and have rough plans for 3.0 in the works... stay tuned!

To find out more about Redoc fixes and enhancements, see the [Redoc changelog](https://github.com/Redocly/redoc/blob/main/CHANGELOG.md).

## Major surprise

I mentioned above that 2022 included a major surprise.
Let's start with a story about one of the _"And more"_ features we shipped... the ability to customize the external link icon.

We were focused on preparing our next-generation developer portal to ship.
We originally planned on shipping it in Q4 2022.
But there were about 41 small features remaining to bring it to parity in certain areas with the current-gen portal.
However, it exceeds in many other areas.
These small features take about two days each on average.
The development environment is better for our next-gen portal than our current-gen portal, so a feature that may take 2 days in the next-gen portal may take 5-10 days in the current-gen portal (or might not even be possible in some cases due to architectural constraints).

We decided to not add new features to the current-gen portal.
Yet, there we were, adding this ability to customize the external icon.
I thought, "who needs this? and why?"

My investigation led to a support thread that showed a very irate customer demanding it.
That led the team to cave in on holding back new features until the next-gen portal.
I followed the development (as I mentioned the current-gen portal is not architected like our next-gen portal, and it can take much more time and multiple attempts to ship features).
This feature involved five people, and took four business days to ship across two attempts.

And then, it was never used.

**This is exactly what we needed.**
You see, maybe you've heard the saying:
> By saying "yes" to one thing you say "no" to everything else.

Our team needed to learn the power of saying "no".
You may be thinking, "but I'm a customer and I want you to say **yes** to me".
Let's dissect this further.
Let's say that your requests are great, but someone else makes requests that are not great (and maybe they don't even use the features they request).
If we say **yes** to everything, we won't have time to do your great requests (and what if their requests conflict with your requests?).
But it goes beyond that.
Most of the time people request things that don't take much effort (usually 2 weeks or less).
They aren't **bold** or **ambitious** requests.
However, what if we wanted to do something big, bold, and ambitious?
It would have a **major impact** across many of our customers.

Work efforts like that take years.
We embarked on this path in 2021 when we started rewriting the developer portal from the core with no major external dependencies.

We've doubled-down on the effort in 2022.
In 2023, we'll be bringing you a collaboration suite.

There is quite a bit more too, but I can't fully reveal our plans yet.

In my last update in September, I mentioned:

> I'll share more on how our training went in my next update.

The 3-week training exercise went remarkably well.
If you're a company, without "short-term thinking" investors interested in delivering long-term value to a market, I can't recommend it more.
I will write a future blog post about it.

Since that training, 95% of our efforts are on R&D for new products we'll bring you in 2023 and 2024.
Regardless of where you fit into the API lifecycle, you'll find some tremendous value coming your way soon.

## What would you like to see in 2023?

APIs have become the backbone of modern, interconnected systems, and documentation is the driving force behind the uptake of APIs across applications.

What API management features are you most excited about? Connect with me on [LinkedIn](https://www.linkedin.com/in/adamdaltman/) and let me know.
