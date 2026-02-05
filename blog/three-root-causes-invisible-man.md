---
template: '../@theme/templates/BlogPost'
title: "Three Root Causes: Why we lose to the invisible man"
description: "After identifying unforced errors in API design, I found three root causes on the tennis court that map directly to how we build APIs. Here's what they are and how to fix them."
seo:
  title: "Three Root Causes: Why we lose to the invisible man | Redocly"
  description: "Discover the three root causes behind unforced errors in API design: poor balance, feeling rushed, and looking too far ahead, and how to address them."
  image: ./images/invisible-man.png
author: adam-altman
publishedDate: 2026-02-05
categories:
  - api-lifecycle:design
  - technical-documentation:writing-style
  - api-governance:compliance-quality
image: invisible-man.png
---

# Three Root Causes: Why we lose to the invisible man

Last week, I wrote about [beating the invisible man](beat-the-invisible-man.md).
The idea that most APIs fail not because competitors outplayed them, but because of unforced errors.

Since then, I've been back on the tennis court, and something clicked.

I wasn't just making mistakes.
I was making the same mistakes, over and over, for the same reasons.

After paying closer attention, I found three root causes:

- poor balance
- feeling rushed
- pulling my head off the ball at contact

Each one maps directly to how we build APIs and write documentation.

## Poor balance

On the court, poor balance removes options from my shot selection.
If anything slightly unexpected happens on the bounce (a bad hop, a gust of wind, a misread), I'm in trouble.

It also makes me feel rushed, which compounds the problem.

But here's the thing: balance isn't about being perfect.
It's about having a foundation that lets you adapt when things don't go as planned.

### The API equivalent

In API design, poor balance looks like:

- inconsistent patterns across endpoints
- missing error handling infrastructure
- no clear conventions for pagination, filtering, or sorting
- documentation that assumes everything works perfectly

When you lack these foundations, every unexpected use case becomes a crisis.

A developer tries to paginate through results, but your endpoint doesn't follow the same pattern as the others.
They hit an edge case, but your error responses don't give them enough information to recover.
They try to filter, but the syntax is different from what they've seen elsewhere.

None of these are dramatic failures.
But they compound.

Just like on the court: if you're off-balance, you can't adapt.
And if you can't adapt, you're one unexpected bounce away from losing the point.

### How to fix it

Build foundations first:

- establish consistent patterns before adding features
- design error handling as part of the API, not an afterthought
- document conventions clearly.
  Don't make developers guess
- test edge cases and failure modes, not just happy paths

Balance isn't glamorous.
But it's what lets you handle the unexpected.

## Feeling rushed

Whether it's a fast ball coming at me or the mental pressure of making a slow sitter in the middle of the court, feeling rushed destroys my timing and tension.

I get tight.
I hit the ball too early or too late.
My balance goes off.
Everything compounds.

You've probably felt this before, maybe with a curveball interview question, or any unexpected "oh my" moment.
That flustered feeling where you know what to do, but you can't execute it cleanly.

### The API equivalent

In API development, feeling rushed shows up as:

- shipping features without proper documentation
- skipping error handling "for now"
- making inconsistent design decisions under deadline pressure
- accumulating technical debt with the plan to fix it later

The problem isn't the deadline itself.
It's that pressure makes us skip the fundamentals.

We document the happy path but skip edge cases.
We add a new endpoint but don't follow existing patterns.
We mark something as "optional" when it's actually required, planning to fix it later.

Later never comes.

And when something unexpected happens (a new use case, a scale issue, a security concern), we're already off-balance.
The rushed decisions compound.

### How to fix it

Slow down the things that matter:

- make documentation part of the definition of done, not optional
- establish design review processes that can't be skipped
- automate what you can: linting, testing, validation
- build time into estimates for consistency, not just features

Pressure will always exist.
But you can't let it break your fundamentals.

If you only execute well when there's no pressure, you won't execute well when it matters.

## Pulling my head off the ball

I frame a lot of balls because I'm looking to the future instead of focusing on the point of contact.

Keeping my eyes on the ball (even though I can't actually see contact happen) gives my brain the information it needs.
The change in results is dramatic.

But it's hard.
I have a million reps of looking to the next shot already.
Sometimes when we look too far ahead, we don't execute the present well enough to get to that desired future.

### The API equivalent

In API design, this looks like:

- planning for v2 or v3 before v1 works reliably
- adding advanced features before the basics are solid
- optimizing for scale before you have scale
- documenting future capabilities instead of current reality

We get excited about what's next.
We want to build the thing that will solve all the problems.

But if v1 doesn't work reliably, v2 won't fix it.
If the basics aren't solid, advanced features will expose the cracks.
If you optimize for scale before you have it, you'll optimize for the wrong things.

Looking too far ahead means you're not executing what's in front of you.

### How to fix it

Focus on the present:

- make v1 work perfectly before planning v2
- nail the basics before adding advanced features
- solve today's problems, not tomorrow's hypotheticals
- document what exists, not what you hope will exist

The future matters.
But you can't get there if you don't execute the present.

## The pattern

These three root causes aren't separate problems.
They feed each other:

- Poor balance makes you feel rushed
- Feeling rushed makes you look too far ahead (planning instead of executing)
- Looking too far ahead prevents you from building the balance you need

It's a cycle.

And the same cycle shows up in API design:

- Missing foundations create pressure to fix things quickly
- Pressure leads to rushed decisions and inconsistent patterns
- Inconsistency makes you want to rebuild everything (v2, v3)
- Planning the rebuild prevents you from fixing the foundations

Break the cycle at any point, and the others get easier.

## What this means

The invisible man test still applies: if a careful developer followed your docs exactly, would they succeed?

But now we know why they might not.

It's not because the API is too simple or too complex.
It's because:

- the foundations aren't solid (poor balance)
- pressure led to shortcuts (feeling rushed)
- focus drifted to the future instead of the present (pulling head off the ball)

Fix these root causes, and the unforced errors start to disappear.

## Closing thought

On the court, I can't control the bounce, the wind, or my opponent's shots.

But I can control my balance, my timing, and my focus.

In API design, you can't control every use case, every developer, or every edge case.

But you can control your foundations, your process, and where you put your attention.

That's how you beat the invisible man.

Not by being perfect.
But by being solid where it matters.
