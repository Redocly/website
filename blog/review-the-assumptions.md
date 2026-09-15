---
template: ../@theme/templates/BlogPost
title: Stop reading the diff. Review the assumptions.
description: Code review is the bottleneck in most teams, and it does not have to be. Machines can read the lines. Humans need to read the premise, and they need to read it before the code exists.
seo:
  title: Stop reading the diff. Review the assumptions.
  description: Line-by-line code review made sense when humans wrote every line. Now agents write the lines and agents can check them. The human review has to move to where machines cannot go.
  image: ./images/review-the-assumptions.png
author: adam-altman
publishedDate: "2026-09-17"
categories:
  - technical-documentation:ai-assisted-docs
  - redocly:product-updates
image: review-the-assumptions.png
---
<!-- markdownlint-disable-next-line MD026 -->
# Stop reading the diff. Review the assumptions.

Code review is the bottleneck in most engineering teams I talk to.
Ours included.

A pull request opens.
It waits.
A reviewer opens it, reads three hundred lines, leaves four comments about naming, and approves.
Two days passed.
Nothing about the change got safer.

We tell ourselves this is the price of quality.
I no longer believe that.
I think we review the wrong thing, at the wrong time, with the wrong worker.

## What line-by-line review was for

Line-by-line review made sense when a human wrote every line.
The author had one pair of eyes.
The reviewer added a second pair.
The second pair caught the off-by-one, the missing null check, the query without an index.
It was the only checker we had.

That world is gone.
Agents write most of the lines now.
Agents can also read them.
An agent will find the missing null check faster than I will, and it will not get tired on line two hundred.
It will flag the complexity.
It will flag the known security patterns.
It will run the tests.

When a human reads the same lines after the agent did, the human is the slower, more expensive, less consistent checker.
That is not review.
That is duplicate work with a queue in front of it.

## What machines cannot review

An agent cannot tell you the feature is a bad idea.

It cannot tell you the customer does not want it.
It cannot tell you the interface will hurt in a year when you have to keep it backward compatible.
It cannot tell you the table you assume stays small will not stay small.
It cannot tell you that the rollout has no off switch and the failure has no alarm.

Those are assumptions.
Every change rests on a stack of them.
Most of them never get written down.
The code is the only artifact, so the review reads the code and the assumptions slide through underneath.

A wrong assumption costs more than any bug.
A bug gets fixed in an hour.
A wrong data model lives for years.
A wrong interface becomes a promise you cannot take back.

That is where a human belongs.

## Review before the code exists

Here is the part I think matters most.

If the first time a human reads the assumptions is in a code pull request, the review is already late.
The code exists.
The author spent a week on it.
The author will defend it, because that is human.
The reviewer feels the cost of saying "wrong premise" to a finished thing.
So they do not say it.
They comment on the naming instead.

The assumptions need review before the code.
Not in a meeting.
In writing.
A short document with one claim per line:

- Users start from the project tile, not from the editor.
- This table stays under a million rows.
- Self-hosted customers upgrade within a quarter.
- Nobody depends on the old field name.

Each line is a claim that could be false.
Mark each one: verified with evidence, verified by someone who knows, or unverified.
Unverified is allowed.
Hidden is not.

Then a human attacks the list.
Which of these, if wrong, kills the feature?
Which one is cheap to check right now?
That review takes twenty minutes and saves a week.

## What the human reviews in the pull request

The pull request still gets a human.
The human just stops reading the lines.

They review the interface.
What does this API promise?
What does this config file promise?
What breaks for a customer on upgrade?

They review the intent.
Does this solve the stated goal?
Would a user recognize it as better?
Is there a cheaper design?

They review the safety envelope.
Can we turn it off?
What fails if it fails?
How will we see it working?
How will we see it breaking?

And they review the assumptions that changed.
Every implementation finds new ones.
The author lists what moved since the design note.
If the list is empty, the author did not look.

## The exception

I am not saying nobody reads code.

Some safety lives only in the lines.
The tenant boundary.
Authentication.
Billing.
Deletion.
An agent catches patterns.
It misses a missing organization filter that looks like every other query in the file.

Name those paths.
Require a human code read there, and only there.
Everywhere else, the agent reads and the human decides.

## Then close the loop

Review does not end at merge.

The biggest assumption on the list has a metric attached.
Two weeks after ship, someone marks it true or false.
That is the real review.
It is the only one that teaches the team which assumptions they get wrong.

Most teams never do this step.
They ship, they move on, and the assumption stays marked "probably."

## What changes

The sequence looks like this:

1. Humans review the assumptions before code.
2. Humans review the interface, intent, and safety in the pull request.
3. Agents review the lines.
4. Humans review the outcome after ship.

Every stage has a human question.
None of the questions is "read every line."

Some engineers will call the design note ceremony.
It is not extra.
It is where the review moved.
The time you spent reading diffs goes into reading premises instead.
It does not shrink.
It goes where the machines cannot follow.

## The controversial part

Reviews should not be the bottleneck.
They are, because we ask humans to do the machine's job and skip the human's job.

Stop reading the diff.
Read the premise.
Read it early.
Then let the agents read the code, and go check whether you were right.
