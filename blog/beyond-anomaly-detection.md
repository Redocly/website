---
template: '../@theme/templates/BlogPost'
title: Beyond anomaly detection — striving with metrics
description: Metrics shouldn't only exist for quick error detection. They should exist to help you strive — to set goals, accelerate learning, and achieve meaningful improvement.
seo:
  title: Beyond anomaly detection — striving with metrics
  description: Metrics shouldn't only exist for quick error detection. They should exist to help you strive — to set goals, accelerate learning, and achieve meaningful improvement.
  image: ./images/beyond-anomaly-detection.png
author: adam-altman
date: 2025-11-11
categories:
  - metrics
  - goals
image: beyond-anomaly-detection.png
---

# Beyond anomaly detection — striving with metrics

Recently, I wrote about [**Orion’s Belt** — three guiding stars for measuring success: *Acquisition, Adoption,* and *Deflection*](./key-metrics-for-docs.md). Those metrics help you navigate.  
But navigation alone isn’t enough. You also need instruments that help you *strive*.

Too often, we use metrics like smoke alarms: they tell us when something is wrong. A graph spikes or dips, we react, we fix, and we move on.  
But metrics shouldn’t only exist for *quick error detection and resolution*.  

Metrics should exist to make us better — as teams, as companies, as individuals.

## When metrics only measure what’s broken

Many dashboards are built for “what’s wrong?” questions.  
- Did the API error rate spike?  
- Did a signup funnel break?  
- Did conversion suddenly drop?  

These are important. You can’t operate without anomaly detection.  
But if that’s all your metrics do, you’re flying with warning lights — not a navigation system.

> Reactive metrics keep you alive.  
> Proactive metrics make you improve.

## A personal detour: Returning to competitive tennis

Two years ago, I decided to return to competitive tennis after 25 years of "riding a desk."  
My body didn't exactly appreciate the nostalgia. Within weeks, I was injured — sore shoulder, tight back, and a frustrating sense that my brain remembered how to play, but my body didn't.

After a year working with a biomechanical *Functional Patterns* trainer (thank you, Dennis Nel), I could finally play matches pain-free again.  
That alone felt like a miracle. But now I was losing matches that I believed I should win.

My instinct was the same as it had been as a teenager: *just play more matches.*  
More reps equals more improvement, right?

Not anymore.

My body could handle maybe two or three matches per week. Any more and I’d feel the toll — slower recovery, reduced power, fatigue.  
Worse, progress seemed random. Some weeks I’d play brilliantly; others, I’d regress.  

I was collecting experience but not *learning* efficiently.

## The feedback revolution

Then I discovered **SwingVision**, an app that records your matches, automatically tracks shot stats, and cuts out dead time. You can rewatch a full match in ten to twenty minutes.  

Tennis at any competitive level is a game of **error rate** — unforced errors decide almost every outcome.  
With SwingVision, I could measure my **forehand and backhand success percentages**, **ball speeds**, and **placement patterns**.

Now I could *set goals*:

- Increase average forehand speed by 5 mph  
- Raise my forehand-in-play percentage by 5%  
- Do both without increasing unforced errors

Once I started tracking these, my improvement was no longer random.  
I could correlate technical changes to results.  

But the *real* breakthrough came not from the stats, but from the **video**.

Watching myself play revealed **decision mistakes** — tactical errors I’d never remember afterward.  
Without the video, I might recall one or two bad decisions per match. The video exposed ten or twenty.  
That’s ten times more information.

It wasn’t always fun watching myself make those mistakes, but the visibility turned randomness into feedback.  
My pace of learning accelerated dramatically. I could identify *why* I was losing points and deliberately work on those patterns.

## Anomaly detection vs. Performance metrics

What SwingVision did for my tennis is what good metrics can do for a product, a campaign, or an engineering system: they turn random progress into deliberate improvement.  

Metrics shouldn’t just yell when something’s broken.  
They should *teach you* where and how to improve.

| Tennis example | Business equivalent |
|----------------|--------------------|
| Forehand error rate spikes | Conversion rate drops |
| Shoulder strain flares up | Latency alert triggers |
| Average rally length decreases | Session duration declines |

All of these are anomaly detections — *reactive* signals.  
They tell you to stop, fix, or recover.

But here’s what makes you better:

| Tennis example | Business equivalent |
|----------------|--------------------|
| Increase average rally length by 20% | Increase time-to-value for new users |
| Maintain serve speed while reducing errors | Improve API latency without losing reliability |
| Win more points by decision quality | Improve campaign ROI by targeting better audiences |

These are *goal metrics* — metrics you pursue deliberately.

## Two kinds of metrics

### Reactive (keep the lights on)

Reactive metrics are essential for monitoring stability and catching regressions early.  
They should:
- Detect anomalies fast  
- Trigger alerts automatically  
- Be easy to interpret under stress  

Examples:
- API error rate  
- Conversion anomalies  
- Traffic drops  
- Payment failures  
- Downtime minutes  

They’re your smoke detectors and tripwires.

### Proactive (help you strive)

Proactive metrics aim for **improvement**, not survival.  
They’re tied to goals, experiments, or campaigns.

Examples:
- Increase documentation engagement  
- Reduce time-to-integration for new developers  
- Increase activation rate of trials within seven days  
- Improve adoption of a feature across existing customers  

These metrics require intention.  
You can’t automate *striving*.  
You define what *better* means and work toward it.

## Metrics and meaning

A metric without a purpose is noise.  
To be useful, every metric needs context — *what goal is it serving?*

At Redocly, we often talk about **orbits**: Acquisition, Adoption, and Deflection.  
Those are outcome metrics.  
But orbiting them are smaller measurable inputs — like satellites.

For instance:

- **Acquisition:** site impressions, trial signups, referral sources, search ranking  
- **Adoption:** successful integrations, API calls, doc interactions, feature usage  
- **Deflection:** reduced support tickets, improved self-serve rate, feedback scores  

Each can have *reactive* and *proactive* dimensions.

| Metric | Reactive use | Proactive use |
|--------|---------------|---------------|
| API uptime | Alert if < 99.9% | Aim for 99.99% across all regions |
| Docs page views | Detect traffic loss | Improve funnel from page → trial |
| Feature usage | Catch broken rollouts | Drive adoption of core features |

The distinction isn’t the data — it’s the *intent* behind using it.

## What gets measured, improves (but only if you watch the replay)

There’s an old business adage: *what gets measured, improves.*  
That’s not entirely true.  

> What gets measured **and reviewed regularly** improves.

I was measuring my tennis for years — points won, games won —  
but until I started *reviewing the video*, my improvement was inconsistent.

In business, dashboards often accumulate metrics without reflection.  
Teams glance at charts in a weekly meeting, nod, and move on.  

Improvement comes when metrics feed back into *decisions*:
- What will we do differently based on this data?  
- How will we know it worked?  
- When will we review again?

That loop — measure → reflect → adjust → remeasure — is the engine of progress.

## Campaigns: the perfect metric playground

Campaigns are experiments.  
You’re testing hypotheses:

- If we run this campaign, will we acquire more users?  
- Will they activate faster?  
- Will they adopt a feature more deeply?

Each campaign has two metric layers:

1. **Exposure metrics** — how many people saw or interacted  
   - Impressions  
   - Clicks  
   - Page views  
   - Video completions  
   - Reach  

2. **Goal metrics** — how many achieved the intended outcome  
   - Trials started  
   - Features adopted  
   - Integrations completed  
   - Docs feedback submitted  

Knowing only one layer is like knowing your shot count but not your accuracy — you're missing half the story.  
Knowing both gives you *conversion ratios* — the real performance signal.

### Setting expectations before measurement

Before running a campaign, define the **target metric** and **expected outcome**.

> Goal: Increase trials started from our docs site.  
> Metric: Conversion rate from "view docs" → "start trial."  
> Baseline: 1.8%.  
> Target: 3.0% within 30 days.

Once defined, every decision — content, design, placement — supports that goal.  
After the campaign, compare actual to target, learn, and iterate.

If you miss the target but learn something actionable, that’s success too.  
Progress often looks like a string of useful failures leading to insight.

## Choosing better metrics

Good metrics have three qualities:

1. **Controllable** – You can influence them through your actions.  
2. **Comparable** – You can measure change over time.  
3. **Comprehensible** – Everyone can understand what they mean.

When metrics are clear, teams stay aligned.  
You can say "we're aiming to increase activation by 10%" and everyone knows what success looks like.

## Example: Applying this at Redocly

Suppose we’re running a campaign around **AI Search** — our intelligent search across developer documentation.  

| Stage | Metric | Goal type | Purpose |
|-------|---------|-----------|----------|
| Acquisition | Visitors to AI Search landing page | Reactive | Detect if campaign traffic drops |
| Adoption | Activated AI Search feature within 7 days | Proactive | Increase activation rate |
| Deflection | Reduction in support tickets about “can’t find docs” | Proactive | Measure success outcome |

If we only watched traffic, we’d miss the full picture.  
Pairing reactive and proactive metrics lets us see both health **and** progress.

## The psychology of striving

Reactive metrics motivate fear: *avoid failure, prevent downtime, stay safe.*  
Proactive metrics motivate *growth*.  
They create purpose and momentum.

People are naturally better at striving than maintaining.  
When you give a team a clear goal — like increasing integration success by 15% — you invite creativity.  
The focus shifts from "don't break it" to "how can we make it better?"

That shift changes company culture.  
Instead of waiting for anomalies, teams look for opportunities.

## What tennis taught me about metrics

Returning to tennis taught me a few truths that apply to metrics:

1. **You can’t play unlimited matches.**  
   You can’t just throw more campaigns or features at a problem.  
   You need feedback to make the limited attempts count.  

2. **Progress isn’t linear.**  
   Metrics fluctuate even as you improve. Focus on trends, not single points.  

3. **Decision errors cost more than technical errors.**  
   A bad shot is fine; a bad decision sets up the opponent.  
   Focusing on the wrong metric can have the same effect.  

4. **Feedback shortens the learning curve.**  
   Video review made my improvement predictable.  
   Structured reviews of campaign metrics do the same.

## From anomalies to aspirations

Metrics evolve through three stages:

1. **Monitoring:** track data to catch issues  
2. **Managing:** react quickly to anomalies  
3. **Mastering:** use data to *strive* toward goals  

Most teams stop at stage two.  
Mastery means using metrics not just to protect what you’ve built, but to *grow* it.

When I started tracking my tennis performance, I stopped feeling like progress was random.  
It wasn't about fixing what went wrong — it was about understanding what could go *better*.

That’s what great metrics do.  
They make your work visible, measurable, and improvable.

## A closing thought

If you only use metrics to detect anomalies, you’ll spend your time firefighting.  
If you use metrics to set goals, you’ll spend your time improving.

> Alarms tell you when something breaks.  
> Goals tell you where to go.