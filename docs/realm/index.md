---
sidebar: sidebars.yaml
---
# Realm documentation

Locate all the documentation you need to succeed with the Realm platform, right here.

## Write

Creating content is kind of our thing!
Write your content using Markdown and Markdoc, and configure the navigation structure that works for you.
Add your API reference (OpenAPI, GraphQL or AsyncAPI) and integrate it alongside the other content.

## Style

Make your project look and feel like your own.
Customize the styles, change the templates, and adjust the color modes to fit the rest of your digital presence.

## Extend

Extend the Realm platform by adding your own React pages and custom Markdoc tags and functions.
You can also eject theme components to make them your own, enable source maps, set path prefixes and more.

## Setup

The admin tasks you need to get everything running smoothly.
Configure authentication and authorization, set up integrations, and manage source control repositories.
Set up the feedback options, deployment pipelines, and environment variables to use at deploy time.

## Configure

All Redocly products use a common configuration file.
The full configuration documentation will help you get everything set up the way you want it.


{% if includes($rbac.teams, "scout") %}
## Products
{% /if %}


{% if includes($rbac.teams, "scout") %}
  [Scout](scout/index.md) identifies APIs and brings them into your project.
{% /if %}
