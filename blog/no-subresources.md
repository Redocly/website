---
template: ../@theme/templates/BlogPost
title: Rethinking sub-resources in API design
description: A lesson from the trenches
seo:
  title: Rethinking sub-resources in API design
  description: Avoid sub-resources to minimize future rework.
author: adam-altman
date: "2024-01-24"
categories:
  - api-specifications:openapi
  - api-lifecycle:design
image: refdocs.png
---
Before founding Redocly, I founded [Rebilly](https://www.rebilly.com).
Most of these lessons I learned at Rebilly.
There is your context.

In the evolving landscape of API design, the decision of whether to use sub-resources can have far-reaching implications.
At Rebilly, we learned this the hard way.
I recently noticed we've fallen prey to the sub-resource demon at Redocly.
I want to share my journey, hoping it might steer you clear of the pitfalls we encountered.

## The challenge with sub-resources

In an earlier iteration of our APIs at Rebilly, we encountered a seemingly straightforward case: a customer has subscriptions.
It seemed logical to make subscriptions a sub-resource of the customer.
This decision, although seemingly innocuous, set us on a path filled with unexpected complexities.

## Evolving the API design

When our clients expressed the need to list all their subscriptions, the limitations of our design became apparent.
The task was far from simple, requiring a cumbersome process of listing all customers and then iterating through their subscriptions.
This inefficiency led us to promote subscriptions to a full resource, a move that simplified our API but revealed deeper issues.

## Unexpected complications

The real challenge emerged with the need for subscription cancellations and reactivations.
Our data model, which didn’t account for multiple cancellations or reactivations, became a significant hurdle.
We lacked a standalone cancellation resource, and reactivations disrupted our entire model.

## The high cost of change

Addressing these challenges was not trivial.
We faced months of work to restructure and backfill data for over a million subscriptions.
This ordeal could have been a one-week effort had we initially avoided sub-resources.

## Learning and recommendations

This experience was a hard-earned lesson in API design.
Sub-resources, while useful in certain contexts, can complicate matters significantly.
My advice:

- Always consider the full lifecycle of an entity.
- Avoid sub-resources unless they are the clear, best choice.
- Use PUT/PATCH for updates, not RPC-style POST actions.
- Beware of action words in the ending path segment.
- Be ready to create new resources when needed.

## Detect sub-resources automatically

At Redocly, we're building some APIs that are supporting our next generation of products.
These APIs will eventually be made publicly available to our customers and partners to use.
I wrote a rule (which Redocly CLI lint runs) to detect sub-resource usage.
I found more sub-resource usage than made me comfortable.

The rule can cause a CICD job to error (or in case of our SaaS product our Scorecard to post a failing status).
And with branch protection enabled, it prevents new sub-resources from being merged to the `main` branch and making their way to production while I'm on vacation in Barbados.

This is a practical example.
Adjust the number (`3`) in the pattern to match however many slashes you expect in your path items without sub-resource usage:
```yaml
rule/sub-resources:
  subject:
    type: PathItem
    matchParentKeys: '^(?:[^/]*\/){3,}'
  assertions:
    defined: false
  message: Avoid sub-resources
```
This rule would match any path with 3 or more slashes.
The following path is not allowed (because it has 3 slashes):

```sh
/resources/{resourceId}/stop
```

You may need to adjust the slashes allowed to 5 or more if you have tenants in your paths (like GitHub and Rebilly).

Like any rule, this may require some fine-tuning or ignoring legitimate exceptions.

## Conclusion

Our journey with sub-resources was a mix of trial, error, and eventual insight.
If this post makes you rethink your approach to API design, then its purpose is served.
I’m eager to hear your thoughts or counter-arguments.
Feel free to share your experiences or even a rebuttal.
The world of API design is ever-evolving, and we all have much to learn from each other.
Turn your API preferences into a ruleset with answering [40 questions](../pages/api-governance/index.md).
