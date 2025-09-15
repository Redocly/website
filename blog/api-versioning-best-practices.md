---
template: '../@theme/templates/BlogPost'
title: Best practices for API versioning
description: Best practices for how to version your API and how to communicate it.
seo:
  title: Best practices for API versioning
  description: Best practices for how to version your API and how to communicate it.
author: 
date: 2025-08-10
categories:
  - openapi
  - api versioning
image: Redocly_blog_2.jpg
---

# API versioning best practices

Versioning an API is one of those topics that seems straightforward - until you’re the
one responsible for maintaining it. Every additional version comes with hidden costs.
Now you’re writing and supporting more code which means higher support burden, more
potential for bugs, and more complex troubleshooting.

And then there’s the hardest part: knowing what a change will do to your customers.
Will removing or altering a single field break a critical workflow for someone?
Unless you’re tracking API usage in detail, the answer is often “we’re not sure.”
Without that data, changes feel risky, and teams end up with the maintenance burden
of keeping old versions needlessly alive.

## Choose a Versioning Strategy

The right versioning strategy depends on the kind of API you have, how often it
changes, and how your consumers interact with it. Broadly, there are three approaches.

### 1. API Evolution: Keep one version and evolve it

In the evolution model, you maintain a single API version and make additive changes
over time. Non-breaking updates replace the old behavior. Breaking changes
might get a new name.

GraphQL is a common example of this approach: the schema can grow over time, with new
fields and queries added as needed, without introducing a new “version” of the API.
This saves you from supporting multiple versions simultaneously.

**Tradeoff:** It can be tricky to track and deprecate things in a consistent way.

### 2. Explicitly Version

In explicit versioning, every breaking change triggers a new version, identified
clearly by a path (`/api/v1`), a query parameter, or a header. API consumers know 
exactly which version they’re using.

This approach gives you clean separation between versions, but you take on the
responsibility of maintaining them in parallel.

With **Redocly**, you can publish separate OpenAPI definitions for each version,
keeping documentation and API references distinct and easy to navigate.

### 3. Hybrid Approaches

Some APIs combine both strategies. **Stripe**, for example, evolves their API until
they [hit a breaking change](https://docs.stripe.com/api/versioning), then issues a 
new version. This keeps the maintenance load lower while still giving customers a 
clear upgrade path.

A hybrid strategy works well when you want to avoid constant version churn but still
provide predictable stability for API consumers.

## API deprecation considerations

Whichever strategy you choose, you’ll eventually need to retire old versions. Without
a plan, those versions have a way of sticking around forever, consuming engineering
time and making your API harder to evolve.

We recommend teams deprecating APIs do the following:

- **Set a clear policy.** Deprecate older versions or endpoints within a fixed window.
- **Communicate that policy** from the moment a customer starts using your API.
- **Don’t just rely on a calendar.** Use monitoring to confirm that an endpoint is
  truly unused before switching it off for good.

## OpenAPI versioning

Many teams define their APIs in **OpenAPI**, and it can play a big role in managing
versions.

- **Single version:** Keep one OpenAPI definition and simply add new operations as
  you go.
- **Multiple versions:** Each can have its own file and be published separately in
  your API catalog.

Some teams prefer branching their API definition in source control or even keeping
each version in its own repository. **Redocly** supports all of these patterns, so
your docs workflow can follow your development workflow.

## Communicate releases and deprecation clearly

API changes are only successful if your consumers know they’re happening. That means
having a reliable way to reach both internal and external consumers.

**Best practices include:**

- Communicate your versioning and deprecation plan early
- Follow up at every milestone:
  - When a new version launches
  - When an older one is scheduled for retirement
  - As the deadline approaches
- Before turning off an endpoint, **check the data**—usage metrics are the ultimate
  confirmation that a deprecation won’t cause surprises

## Choose a docs platform that supports your versioning strategy

Your documentation needs to reflect your versioning choices. If customers are using
different versions in production, they’ll need to easily switch between docs for each
one. Even if you’re evolving a single API, historical references may still be useful
for troubleshooting.

**With Redocly:**

- Support multiple documentation versions with an easy-to-use version switcher
- Control which version is the default
- Decide when to remove older versions from the public view

API versioning doesn’t have to be a headache. With the right strategy, clear communication, 
and tools that support your workflow, you can evolve your API without drowning in complexity.
