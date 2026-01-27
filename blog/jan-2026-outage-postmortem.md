---
template: '../@theme/templates/BlogPost'
title: 'Incident postmortem: January 2026 service disruptions'
description: Detailed analysis of service disruptions in January 2026, explaining root causes and corrective measures implemented to prevent future incidents.
seo:
  title: 'Incident postmortem: January 2026 service disruptions'
  description: Detailed analysis of service disruptions in January 2026, explaining root causes and corrective measures implemented to prevent future incidents.
  image: ./images/postmortem-jan-2026.png
author: roman-hotsiy
publishedDate: 2026-01-27
categories:
  - redocly
image: postmortem-jan-2026.png
---

# Incident postmortem: January 2026 service disruptions

Over the last two weeks, we experienced three significant service disruptions on January 14, January 15, and January 27, impacting both the Redocly Reunite management panel and authenticated customer projects.

We pride ourselves on providing reliable developer tools, and frankly, these last two weeks were not up to our standards.
We know that when our platform goes down, it impacts your ability to work and serve your own users.
For that, we apologize.

In the spirit of transparency, we want to share exactly what happened, why it happened, and the concrete steps
we are taking—both immediately and long-term—to ensure this doesn't happen again.

## Executive summary

We faced a "perfect storm" of infrastructure constraints and architectural bottlenecks.

1. **Infrastructure Instability (Jan 14 & 27):** Our orchestration layer became unstable during routine
   maintenance (instance refreshes), leading to leader election failures and cluster disruption.
2. **Cascading Failure (Jan 15):** A logic error in a background job queue triggered a cascading failure that overloaded
   our database, exhausted our secrets engine, and prevented services from restarting.

Both of those incidents ultimately caused our main API to go down.
Because our authentication service is currently embedded within our core API, the API outage caused an immediate outage
for all authenticated customer projects.

## Detailed timeline & root cause analysis

### Incident 1 & 3: The orchestration layer instability (Jan 14 and Jan 27)

**Impact:** Initially, the Redocly app, API, and deployment services were unavailable.
As the incident progressed and the API eventually went down, all authenticated customer projects also experienced downtime.
**Duration:** ~3 hours (Jan 14) and ~3 hours (Jan 27).

On **January 14**, we detected that our orchestration layer server instances were "hanging"
during a standard instance refresh cycle.
The root cause was initially obscure, appearing as runaway logging triggered by resource exhaustion, which caused the servers to freeze and lose quorum.
Without a leader, the cluster could not schedule new jobs, halting deployments and essential services.

On January 27, we experienced a recurrence during another instance refresh.
Although the log flooding issue was managed by this time, the failure repeated.
This allowed us to look past the symptoms and identify the definitive root cause: **memory exhaustion** (OOM).

When we refresh EC2 instances in our user-production datacenter, it forces a massive rescheduling of customer projects.
This sudden spike in activity caused the orchestration layer servers, which were under-provisioned for this specific burst load, to run out of memory.
The server crash on Jan 27 confirmed that the "log flood" on Jan 14 was likely a symptom of this same resource exhaustion.

Immediately following recovery, we observed continued flapping on some non-authenticated projects in specific regions.
The root cause was expired service mesh ACL tokens that could not be renewed while the cluster leader was unavailable, blocking valid traffic.
Once identified, we manually renewed the tokens and resolved the issue quickly, and have since added monitoring and safeguards to prevent token expiration during leader unavailability.

### Incident 2: The cascading background job queue failure (Jan 15)

**Impact:** API downtime affecting authentication and customer projects.
**Duration:** ~3.5 hours (~1 hour customer-facing).

On **January 15**, a background cleanup job in our message queue (RabbitMQ) failed.
Due to missing error handling logic, the job entered an **infinite redelivery loop**, retrying every 20 seconds without backoff.

This created a domino effect:

1. **Database Saturation:** The retry loop hammered a large table, causing our API to run out of memory (OOM) and crash.
2. **Secrets engine exhaustion:** Every time the API attempted to restart, it requested dynamic database credentials
  from the secrets engine.
  However, the old roles were not being revoked fast enough.
  We accumulated ~1,900 active roles, hitting a ceiling that caused the secrets engine to reject new requests.
3. **Deadlock:** With the secrets engine rejecting requests, the orchestration layer could not start new API allocations, leaving the API in a flapping state.

No customer data was lost during these incidents.
## Corrective measures

We have taken immediate action to stabilize the platform and are implementing structural changes to prevent recurrence.

### 1. Infrastructure upgrades (Completed)

We have significantly increased the capacity of our core orchestration layer.
This directly addresses the failure mode seen on Jan 14 and Jan 27.

- **Vertical scaling:** We replaced our orchestration layer server instances with machines that possess
  **4x the CPU and RAM capacity**.
- **Safety nets:** We added swap space to servers to handle transient spikes without crashing.
- **Enhanced monitoring:** We have added granular alerts for resource usage and queue depth monitoring to detect these patterns early.

### 2. Operational changes (Implemented)

- **Off-hours maintenance:** We have shifted our instance refresh schedules to strict off-peak hours.
  While we test on staging, the traffic patterns during a refresh in production differ significantly.
  This change minimizes the risk during high-traffic windows.

### 3. Queue logic & Circuit breakers (In progress)

We are refactoring our queue consumers to prevent the "death spiral" we saw on Jan 15.

- **Defensive coding:** Implementing exponential backoff and retry limits for all consumers.
- **Traffic control:** We are tuning our queue system to allow us to "halt" processing or throttle throughput during
  incidents, giving the database time to recover.

### 4. Architectural decoupling (In progress)

These incidents highlighted a critical flaw in our current architecture: our API is a
**Single Point of Failure (SPOF)** for authentication.
Currently, if the main API goes down, projects that rely on it for auth also go down.

We are acknowledging this debt and expediting the process of **separating authentication into a dedicated, isolated service**.
This work is in progress and will roll out incrementally.

## Next steps

Reliability is a feature, and we know we fell short of delivering it this month.
We are confident that the 4x capacity increase and the new operational safeguards have addressed the immediate instability.
Our focus now shifts to the architectural decoupling that will make Redocly resilient to these types of failures in the future.

Thank you for your patience and for sticking with us as we improve.

**The Redocly Engineering Team**