---
template: ../@theme/templates/BlogPost
title: "Redocly 2.0: From Workflows to Reunite"
description: A fresh start to boost your team's efficiency.
seo:
  title: "Redocly 2.0: From Workflows to Reunite"
  description: A fresh start to boost your team's efficiency.
author: adam-altman
date: "2024-08-13"
categories:
  - redocly:product-updates
image: product-mix.png
---
In my last blog post, I explained what led to us [building a new core](./new-core.md).
In a single sentence:
> Workflows and the Developer portal beta weren't flexible enough for new tech and growing customer needs.

With the gift of time, we had the opportunity to fine tune features and make some dramatic changes.
This blog post discusses some of those more dramatic changes and the results they bring.

## Reunite is at the heart of operations

We’ve built a completely new system named Reunite to configure organization settings, edit projects, and see project-related data.
Reunite hosts your projects, integrates with your identity providers for SSO, connects to your Git providers, gathers and reports on user feedback, and provides a streamlined visual review experience.

The new products have user feedback as an integrated, configurable feature, Reunite houses the feedback reports.

One of the flagship features of Reunite is a visual review tool.
The bigger the project, the more painful yet important the review process becomes.
Keep your quality high with less effort with the visual reviews feature (we still have branch previews too).

Another flagship feature is a Git-integrated online editor with webview (a way to view what your uncommitted changes look like online).

**Results:**

* More stakeholders engaged in API projects.
* Increased velocity and higher quality.

## Git is the source of truth

All project content ultimately resides in a Git repository.

I’d extoll the benefits of Git such as commit history, blame, distribution, but you already know.
Sometimes people ask if their data can be exported in case they want to leave Redocly.
Yes, you already have the data if you store it in your own Git repo.

Your project content must reside in its own repository and Reunite can integrate with GitHub, GitLab, and Azure DevOps.

For people who want to dabble before provisioning the resources or access of a project repository on their own platform, we can supply a Git repository to get you off the mark (without direct git/ssh access to clone or push).

## View in-progress changes and preview branches

We had a mechanism to view uncommitted changes in your local environment for both API reference and the Gatsby-based developer portal beta.
However, we noticed that a lot of users did not view the uncommitted changes.
There were major performance issues with the local view of the Gatsby-based developer portal beta. We solved that.
And we added a way to view uncommitted changes also in the web-based editor we call Webview.

**Results:**

* More consistency between environments.
* Improved performance so that even giant projects can spin up and be viewed quickly.
* Web-based way to view uncommitted changes.

## Remote content, API registry, and Catalog

In Reunite, the “API registry” is a separate concept from “Remote content”.
This allows remote content to be useful for content beyond OpenAPI.

In Workflows, the way to reuse content is to add APIs to the API registry.
Then, we could reference those registries from within a portal.
That limits the type of content Workflows can source remotely to OpenAPI content.
It also requires a manual step to add a new API into a portal catalog.

The reason for these changes:

1. We knew organizations wanted to be able to onboard APIs into a catalog (especially for internal purposes) in a more automated way.
  The “source → registry → portal → catalog” approach required manual steps.
1. The workflow to update APIs effectively did what we call now on Remote content “auto-sync” and “auto-merge”.
  We wanted this automated update to be configurable based on different project requirements.

**Results:**

1. New teams can onboard APIs without handholding and support.
  Organizations can decide if APIs are onboarded automatically or through manual approval processes.
2. Teams can single source non-API content.
  This is helpful to writers who may operate in different repositories, or who also use Redocly for more than developers docs such as user docs or internal content.

Remote content can be sourced from Git, CICD (continuous integration and continuous deployment), and by polling a URL.

Remote content is more configurable than Workflows Registry because it supports both auto-sync and auto-merge.
You can sync on command or automatically.
When Reunite detects changed content, it creates an ephemeral branch, prepares and builds the project to make sure that all checks pass, and then the branch is ready to merge.
From there, the branch can be automatically merged if configured that way, or left as a pull request for a human to review, approve, and merge it.

## Manage access and seats

Viewers (previously called **Participants** in Workflows) were subject to per seat charges.
This led to unpredictable costs.
With Reunite, Viewers and guests are free.
To balance the trade of value, we price per seat for contributors (Owners, Members, Commiters).

Given that viewers are free, we decided to make RBAC (Role-Based Access Control) available in self-serve plans.
The mechanism and configuration for RBAC changed.
You can protect content based on paths, path patterns, and even on-page conditionals.

## Product packaging

Most of our customers use API reference documentation (Redoc).
Redocly Workflows sold a “bundle” (depending on your plan, combining API docs and portal together).
We’ve unbundled the new offering into 3 main products (you’ll be able to explore their corresponding details when in our launch week of Sep 22nd):

* Redoc: API docs and mock servers
* Revel: External docs (Markdown, React)
* Reef: Internal portal (Catalog, Scorecard)

They all come with Reunite (to configure, manage, and host your projects).
And our new products can be bought together as “Realm” (a bundle) for an extra discount.
If I was on a budget, I would evaluate which features I needed and select the appropriate product.
They work together in any combination.

For example, writing user docs (no APIs)? Get Revel.

Only API reference content? No need for any contextual Markdown docs or landing pages?  Get Redoc.

Want both contextual docs and API rendering? Get Redoc+Revel.

Want a Catalog too? Get Realm.

## Get ready

Conceptually the migration follows a process:

1. Connect your project repo (optional if you use a Redocly-supplied repo).
2. Connect your SSO identity providers (optional).
3. Create a migration branch.
4. Prepare your content and configuration changes (including possibly configuring Remote content).
5. Check the preview (and merge when ready).
6. Set up your custom domain.
7. Delete your old projects in Workflows.

We want to help you get ready for this change, and we’ll be publishing our docs and technical migration guides before we launch publicly.

To get early access, [join our early access waitlist](https://auth.cloud.redocly.com/registration).
