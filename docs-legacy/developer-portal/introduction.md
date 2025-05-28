---
seo:
  title: Introduction
excludeFromSearch: true

---

# Introduction

{% partial file="../_snippets/banner-legacy-developer-portal.md" /%}

Build a developer portal.

## Overview

The **Redocly developer portal** enables you to:
* Create, edit, and manage a significant number of APIs.
* Write contextual documentation in markdown (or MDX).
* Integrate interactive API samples right into the contextual descriptions.
* Generate high-quality API reference pages.
* Style and theme it to match your brand guidelines.
* Control the navbar, footer and sidebar structure and contents.
* Diagram concepts using docs-like-code integrations.
* Extend functionality with custom components.
* Restrict access to portal content for specific groups of users.

 <!-- /To be continued/ -->

## About this guide

This guide includes the following pages:
- Introduction (this page) – familiarizes with the **Developer Portal's** main features and its documentation.
- [Installation](installation.md) – lists steps to install and run the **Developer Portal**.
- [Configuration](./configuration/configuration-files.md) – describes the main configuration files to customize and configure your **Developer Portal**.
- [Navbars and footers](./guides/navbars-footers.md) – describes how to configure navbars and footers within the `siteConfig.yaml` file.
- [Sidebar navigation](./configuration/sidebar-nav.md) – describes how to configure the sidebar navigation within the `sidebars.yaml` file.
- [Themes](./configuration/theme.md) – describes how to style your portal within the `theme.ts` file.
- [Creating content](./guides/organizing-files.md) – describes how to create and manage your content.
  - [Markdown](./guides/markdown.md) – demonstrates using GitHub-flavored markdown.
  - [Page table of contents](./guides/page-toc.md) – show or hide a page table of contents.
  - [Diagrams](./guides/mermaid.md) – demonstrates making mermaid diagrams.
  - [API reference docs](./guides/reference-docs-integration.md) – how to integrate API reference docs.


<!--
- /To be continued/
-->

## Glossary

Before you start working with **Redocly Portal**, we recommend getting familiar with the following terms and definitions:

- **OpenAPI Specification** (formerly Swagger Specification) – an API description format for REST APIs (abbreviated as OAS or OAS3).

- **API documentation portal** – a place that provides all necessary documentation related to the usage and integration of an API.

- **Single source of truth** – a practice of structuring the information models and associated data schema such that every data element is mastered (or edited) in only one place.

- **Markdown** – an easy-to-read/write plain text format that can be converted to HTML and other formats. Files have extension `.md`.

- **MDX** – MDX allows you to use markdown and React components together. Files have extension `.md`.

- **React components** – building blocks of any React app. A component is a JavaScript class or function that optionally accepts inputs and returns a React element that controls a section of the UI (User Interface).

<!--
- /To be continued/
-->
