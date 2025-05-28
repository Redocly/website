---
template: '../@theme/templates/BlogPost'
title: API-first design
seo:
  title: API-first design
author: adam-altman
date: 2018-05-06
categories:
  - api-first
image: blog-2.png
---

## The background…

By the time ReDoc was released in 2015, I was more comfortable with the OpenAPI (fka Swagger)
specification. We had a system to structure our API definitions into three folders:
code_samples, definitions, and paths. I could quickly define a new API, and was getting
comfortable doing so… At Rebilly, a great opportunity arose to work with a larger enterprise.
However, they said it would be a lengthy integration process as they use a 3rd party ERP, and
rely on the 3rd party for integrations. We waited. And waited.

I prepared an integration guide, specifically for them, mapping their terminology into ours, and
preparing various sequences to outline the main use cases they would be implementing. After
discussing the guide with our customer, it became clear that the already lengthy integration
might never actually be completed.

## Transition to API-Design First

We needed a different approach: a different API. It needed to be more familiar to the 3rd party,
but would still allow us to deliver on our key promises. We decided to craft a partner-specific
API. Instead of building the API first, we decided to co-design it with our partner.

Step 1. Shared Github Repo
And to do that, we used a private Github repository, with our familiar 3-folder structure.

Step 2. Setup CI to Build Docs
We hooked up Jenkins continuous integration server to build the ReDoc rendered API docs for both
the working branches (we called these previews) and the mainline branch (our master). Then, we
created an initial proposal for the API.

Step 3. Collaborate in the docs (not outside the docs)
Business analysts at our client and the 3rd party were able to read the rendered API Reference
docs, and ask further questions. We answered their questions by adjusting the API definitions,
and then sharing the new preview version of the API reference docs. We ended up with flowcharts,
and free-formed documentation inside of our definition — not a typical definition. Ultimately,
they became convinced and the tables were turned on us. Suddenly, they needed the API, as fast
as possible.

Step 4. Build
Thankfully, by the time we began development, we knew we would be building something they could
integrate more quickly — so we were confident in making that investment ourselves. Because we
had elaborated our API Docs before we built our API, our team was also really clear on what they
had to build, and it boosted the development speed.

Step 5. Profit
Since we were only getting paid once the API was in-use, this sped up the time to get cash. Our
development finished quickly, and the integration was ultimately a success.

## Using API Docs in API-Design First Approach Yields Better Results

API Docs played a big part in the API-First Design methodology, because many of the stakeholders
were non-technical or just not familiar with Swagger at that time. Presenting visually appealing
API draft docs, made Rebilly seem professional and competent. And it allowed for more
participation in collaboration. The docs were easier to read. Looking back on that day, ReDoc
helped Rebilly win a \$22m enterprise deal.
