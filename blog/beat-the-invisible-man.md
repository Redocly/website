---
template: '../@theme/templates/BlogPost'
title: "Beat the Invisible Man: Unforced errors in API design"
description: "Most APIs don't fail because competitors outplayed them. They fail because of unforced errors—small mistakes that shouldn't exist. Here's how to identify and eliminate them."
seo:
  title: "Beat the Invisible Man: Unforced errors in API design | Redocly"
  description: Learn how to identify and eliminate unforced errors in API design and documentation that cause silent failures and developer frustration.
  image: ./images/invisible-man.png
author: adam-altman
publishedDate: 2026-01-29
categories:
  - api-lifecycle:design
  - technical-documentation:writing-style
  - api-governance:compliance-quality
image: invisible-man.png
---

# Beat the Invisible Man: Unforced errors in API design

I recently played a tennis match against someone vastly better than me.
He regularly beats players with active ATP points, so the outcome wasn't surprising.
He won easily.

What surprised me came later, when I was alone on the court.

While waiting for my daughter to finish a clinic, I started practicing serves by myself and invented a simple game:

- If my first serve went in, I drop-fed a ball and hit a routine forehand.
- If the serve was out, I lost the point.
- If the forehand was out, I lost the point.
- Otherwise, normal scoring.

No opponent. No pressure. No tactics.

And I couldn't dominate.

I didn't lose badly — but I also didn't win comfortably. I couldn't beat the invisible man the way I felt I should.

That's when it clicked: this had nothing to do with tennis.

## The invisible man

The invisible man never:

- changes strategy
- pressures you
- exploits weaknesses

Every lost point is self-inflicted.

If you can't win convincingly under zero pressure, pressure will only make things worse. Real opponents don't create problems — they expose them.

That same pattern shows up all the time in APIs and technical documentation.

Most APIs don't fail because a competitor outplayed them.
They fail because of unforced errors.

## Unforced errors in APIs and docs

In tennis, an unforced error is a missed shot you should make. No one forced it. You donated the point.

In API design and documentation, unforced errors look like this:

- an endpoint that behaves differently than described
- a parameter marked optional that's actually required
- error responses that aren't documented or actionable
- examples that don't compile, don't run, or don't match reality
- concepts explained, but not when or why to use them

None of these require a competitor.
None require scale.
None require bad actors.

They fail on their own.

And often, you never hear about them.

## The developers you never see

The invisible man in APIs isn't hypothetical. It's very real:

- the developer who gives up before making the first call
- the integration that never ships
- the trial that quietly expires
- the customer who churns without opening a ticket

They don't complain.
They don't escalate.
They don't show up in support metrics.

They just… disappear.

When that happens, it's tempting to assume:

- the product wasn't a fit
- the developer wasn't serious
- the problem was external

But often, it's just an unforced error.

## The invisible man test

Here's a simple test I've started using:

If a careful, motivated developer followed your docs exactly —
would they succeed without asking a question?

No Slack.
No support.
No tribal knowledge.
No retries.

Just the docs, the spec, and reality.

If the honest answer is "maybe," that's a problem.
Not a big, dramatic one — but a fundamental one.

That's the equivalent of missing a routine forehand.

## Why pressure makes this worse

One reason these issues are easy to dismiss is that they don't always fail loudly.

In calm conditions, experienced developers compensate:

- they guess
- they experiment
- they reverse-engineer behavior

But pressure changes everything.

Under deadlines:

- ambiguity becomes risk

In production:

- undocumented behavior becomes an incident

At scale:

- small inconsistencies multiply

If your API only works when a developer is patient, experienced, and forgiving, it's not robust. It's fragile.

Just like tennis: if you can't win without pressure, pressure will expose you.

## Beating the invisible man

The goal isn't brilliance. It's reliability.

Some practical ways to reduce unforced errors:

- treat documentation as part of the API surface, not an afterthought
- optimize for "first successful call," not total feature count
- make examples executable and kept in lockstep with reality
- remove decisions instead of explaining them
- document failure modes as carefully as success paths

This isn't glamorous work.
It doesn't show up in launch posts.
But it compounds.

Every unforced error you remove is a point you stop giving away.

## A different definition of quality

We often talk about API quality in terms of:

- expressiveness
- flexibility
- power

Those matter — but they come later.

A more basic question comes first:

Does this work exactly as described, without surprises?

That's how you beat the invisible man.

Not by adding more features.
Not by writing longer docs.
But by eliminating the small, silent failures that shouldn't exist in the first place.

## Closing thought

Great APIs don't win because they're impressive.
They win because they don't give points away.

Before worrying about competitors, scale, or advanced use cases, make sure you can beat the invisible man.

Everything else builds on that.
