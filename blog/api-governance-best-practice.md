---
template: '../@theme/templates/BlogPost'
title: Best practices for building and adopting an API governance strategy
description: API governance is important. Learn how to do it well.
seo:
  title: Best practices for building and adopting an API governance strategy
  description: API governance is important. Learn how to do it well.
author: lorna-mitchell
date: 2024-08-29
categories:
  - openapi
image: Redocly_blog_2.jpg
---

API governance is a vital part of any modern API strategy.
By setting standards, and supporting the tools and processes to achieve them, you can continuously improve your organization's APIs.
Supporting good API governance means wherever you take your API ambitions, the key pillars of consistency, quality, and security are ingrained in your API practices.

## Build an API governance strategy

If your approach to API governance is not intentional or aligned on by technical leaders, your efforts to implement in the long run will not be effective.
Without the commitment, and accompanying investment, many businesses struggle to feel they have a really effective API practice.

## Addressing the 3 pillars of API governance: consistency, quality, and security

API governance brings the necessary structure to the API practices wherever you work. The value is realized in terms of the consistency in APIs, the immediate familiarity and interoperability of everything in your API estate. To get here, there are 3 pillars to address and keep top of mind in your API governance approach: consistency, quality, and security. The best approach for each of these areas will differ across organizations.

### Consistency

Adopting common language, process and tooling helps API governance to spread by itself as well as through formal channels.
Standards around designing and implementing API changes gives confidence in every change to your API - enabling more changes, but reducing the risks associated with the change. Improving collaboration and discoverability of APIs reduces the inefficiency of overlapping and duplicated APIs. A common tooling hub reduces the need for teams to build their own, and identifies incomplete or partial implementations that may exist in many places across a business.

### Quality

It is no surprise that the teams we see with successful API governance also have strong DevOps practices and a learning culture.
Both API governance and platform engineering (the fancy name for DevOps) have goals of being enabling forces; powering up best practices, smoothing the processes, and automating the parts that make sense to leave humans free to tackle the tricky bits of each task.

The rewards come in the shape of performant APIs with consistent design, and easier developer experiences both for API producers and consumers.
By establishing standards and processes, the structure is in place for the API to continuously evolve to meet the needs of the business.
Collaboration is well laid out, and crucially enough API specialist knowledge is included in the process to make successful outcomes with minimal overheads.

### Security

API governance is a great way to check for common API security problems and identify them early.
Use linting tools to check that security practices expected within your organization are being applied.

Taking care to specify the security aspects of OpenAPI correctly is a great starting point.
If some of your API endpoints _should_ be public, but others should not, a vendor extension such as `x-internal` can help the linter know which standards to check for each endpoint.
Linting for API design features such as using UUIDs rather than numeric identifiers, or that error responses are always defined so that API consumers know how to deal with errors correctly, will also help build a more secure application.

## Invest in internal adoption

API governance cannot be done in a short workshop, or ticked off a list.
It takes time, knowledge, and skills to explore, adopt, and maintain an API governance strategy that works for any organization.
Setting out clear goals and aligning people is just as important as allocating the budgets and training to support them.
This aspect is something we rarely talk about as part of API governance, but it's a big factor in achieving a successful API story.

## Build an API culture

One common factor we see in the most successful organizations is a clear investment in the time and skills to build a strong API culture.
This investment includes bringing in or training up people who can build on the best tools and processes around, and then integrating them into an existing API landscape in an appropriate way.

Making the investment can be counter-intuitive, after all you've seen a conference demo and it looked easy!
The truth is that good API governance does not happen by accident, and is rarely delivered for free.

## A sustainable process focused on value creation

API governance delivers value to an organization, but like a good accompanist, you hardly notice that it is there.
This observation is true for many of the supporting and facilitating disciplines; if you can see it happening then something is probably wrong!

We see that organizations that build long-term healthy and successful API practices have a clear understanding of the value they get from it.
While the details may differ between one business context and another, there are some key elements that come up time and time again.

Understanding that APIs are products, whether they are used internally or externally, and applying the same resourcing and prioritization to them as to other products is a big first step.
The "shift-left" mentality of iterating on designs as early in the process as possible is also a big influence.

## Cultivate expertise

Investing in the standards and the process is a good start, but making sure the skills and knowledge are available is also key.
APIs are so widespread now, that we sometimes assume all developers already know everything they need to know about designing and shipping APIs - however that's not always true.
Supporting the people who are closest to the API to develop their knowledge is always a good investment of time and energy.
Particularly in larger organizations, looking for opportunities to share the expertise and support individuals to further their expertise really helps.

By cultivating both individual experts, and a wider awareness of the key topics, the practice of API governance improves through a natural process.
This approach is most effective in organizations that recognize that having specialist knowledge, hired or grown, has a multiplier effect.
At Redocly, we also produce learning materials and we are active at industry events to share our experiences with the API community.
We act as advisers to our biggest customers who may be implementing API governance as a practice at the same time as adoping Redocly tooling.

## Support and training

There are many ways to support your staff to raise their API game.
APIs are not a new technology but practices do improve all the time and there are some excellent books available.
There are also many reputable sources of online learning resources and digital communities that will provide a peer group for your API specialists.
Attending technical conferences, or specialist API events, is another excellent way to keep learning and developing API skills, and can bring side benefits such as a strong peer network of experts for informal support.

## Take your next steps

- Use our [API Guidelines builder](/api-governance) to kick-start a set of API linting rules that fit your use case.
- The [OpenAPI visual reference](https://redocly.com/docs/openapi-visual-reference/) is a good resource to share with others in your organization as they start their OpenAPI journey.
- Find out more about [API governance](./rulesets-are-not-governance.md) and how to [assemble your stakeholders](./api-council.md) for a successful API program.
