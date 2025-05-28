---
template: '../@theme/templates/BlogPost'
title: From ReDoc to Redoc.ly
seo:
  title: From ReDoc to Redoc.ly
author: roman-hotsiy
date: 2019-11-08
categories:
  - api
image: blog-4.jpg
excerpt: As you probably know ReDoc was developed by Rebilly which is a payment/subscription company. Their main product is an API and it has a lot of endpoints and advanced payloads.
---

Originally published at [medium.com/redoc-ly/from-redoc-to-redoc-ly](https://medium.com/redoc-ly/from-redoc-to-redoc-ly-42319f100ac0)
on Apr 26, 2018

Today we’re announcing the next evolution of [ReDoc](https://github.com/Redocly/redoc). In this article, I will explain why and what “Redoc.ly” is.

## ReDoc = Rebilly Documentation

As you probably know ReDoc was developed by Rebilly which is a payment/subscription company.
Their main product is an API and it has a lot of endpoints and advanced payloads. They struggled
to keep their docs up to date and that’s why they adopted OpenAPI (Swagger back then). Their API
definition ended up using lots of advanced features from OpenAPI spec which were not supported
by open-source or commercial documentation engines. So the idea of ReDoc as an engine for
**Re**billy **Do**cumentation was born.

## ReDoc = Reinventing Documentation

ReDoc prototype proved that we can generate OpenAPI-powered documentation without introducing
any vendor-specific extensions. It was generic enough to open-source it.

Since then, we’ve had lots of community engagement. Over 2500+ stars. 300+ issues, 63 PRs, and
lots of articles mentioning ReDoc. It was adopted by many companies, and I even received a few
testimonials to my personal email 💌. We’re very grateful for the interest and adoption.

We hooked up Jenkins continuous integration server to build the ReDoc rendered API docs for both
the working branches (we called these previews) and the mainline branch (our master). Then, we
created an initial proposal for the API.

ReDoc development is now driven by community needs. It has overgrown only Rebilly’s needs and
has now become a standard for 3-panel OpenAPI powered documentation.

## Redoc.ly = democratizing API documentation portals

In the last year, I’ve received dozens of emails from different companies asking for
customizations, some of which are beyond ReDoc as an open-source project and other are not
possible to implement inside ReDoc as a single-page widget.

Many of those requests are similar in nature so we see the opportunity for a self-contained
product around ReDoc. With this idea in mind, Rebilly founder Adam Altman and I decided to start
a spin-off company called Redoc.ly with a mission to democratize API documentation portals.

ReDoc is what many companies start their API portals with but sooner or later everyone needs to
have other pages like: introduction, tutorials, glossary, changelog, FAQ, etc. That’s what an
API portal consists of according to industry standards.

Our vision is to create a solution for API documentation portals with the following design
principles:

- developer-friendly [(docs like code)](https://www.docslikecode.com/) — markdown-powered, integrated with git (Github, Gitlab, Bitbucket)
- fully-customizable — can customize parts of the site, whole pages, or even use custom widgets inside markdown
- no vendor lock-in — open-source with commercial license, with your content housed in your preferred source control.

We want to go beyond markdown-based documentation and leverage the full power of OpenAPI to make
it more interactive, user-friendly and easier to maintain.

We started working on it a while ago and since then we’ve accomplished the following:

- incorporated and raised a small seed round
- rewrote ReDoc in React as a base for the future product
- built a prototype and tested it out internally

We are working on the prototype which we plan to release in a few months.

To better understand what should land in the first release we want to ask you which features you
think are essential for an API documentation portal. Use the link to the short survey below:
[https://redocly.typeform.com/to/H9o7iN](https://redocly.typeform.com/to/H9o7iN)

Stay tuned by subscribing to [RedocLy](https://twitter.com/RedocLy) twitter.
