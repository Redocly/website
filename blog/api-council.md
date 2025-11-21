---
template: ../@theme/templates/BlogPost
title: "API council: the wisdom of your API crowd"
description: Invite the stakeholders inside your organization to the table and make your API the best it can be
seo:
  title: "API council: the wisdom of your API crowd"
  description: Invite the stakeholders inside your organization to the table and make your API the best it can be
author: lorna-mitchell
date: "2024-04-17"
categories:
  - api-specifications:openapi
image: Redocly_blog_8.jpg
---
API governance is often focused on the creation of standards, and the implementing of those standards using appropriate tooling.
At Redocly, we love API tools so much that that we've built a whole company around building them, but successful API practice is about more than tools.
Like most technology problems, the best solutions lie with the people who are part of the process.

## Purpose of an API council

An API council is a cross-disciplinary group of invited individuals who have interest in and expertise relating to your APIs.
They act as advisors, reviewers, and overseers of the API and any changes that are proposed.
These individuals bring their experience and knowledge to the table, and apply it in support of the ongoing API project in your organization.
They can help by reviewing proposed changes, advising on solving problems or tackling upcoming challenges.

API councils are at their best in a design-first process, where their input early in the process has the biggest impact.
In a design-first workflow, changes are proposed, discussed, and finalized before implementation.
Usually the OpenAPI description is the source of truth, and changes are proposed as a pull request against that document.

The API council can review the changes in their own right, but also within the context of the wider API.
Consistency is king when it comes to API design, so having a dedicated group of people who work very regularly with an API makes them ideally placed to give feedback on whether any proposed change is a good fit.
They also have the expertise to correct mistakes, spot omissions, and offer advice on alternative approaches if needed.

Using the OpenAPI description as the basis of the change to discuss is ideal, for many reasons.
It's a very formal representation of the API, so there is little room for uncertainty about what will actually be delivered.
However, the OpenAPI can also produce other API-related artefacts that can help in the review process, such as a preview of the updated reference documentation, and a mock server to play with.

## Members of the API council

Drawing members with relevant API experience and perspectives, from across the orgchart, makes a strong and diverse team that delivers well-rounded API design decisions.
Often we think of API design as an implementation detail, but even for internal APIs, the interface is absolutely key to the product experience.
This "wisdom of crowds" approach brings many eyes to the problem at the earliest opportunity, following a "shift-left" approach.

**Technical expertise**

Developers and architects or tech leads should be represented in every API design decision.
They can put themselves in the position of the user, and are also familiar with the application itself and the current implementation.
The API may expose features that they are working on elsewhere in the application stack, which can also provide important context to the discussion.
For APIs with high scalability requirements, your platform specialists should also be "in the loop" when API changes are being planned.

**Product specialists**

APIs need good product vision to be successful, and to produce an experience that is greater than the sum of its endpoints.
The input of the most API-enabled members of your product team helps to anchor the evolution of the API to the wider product landscape and business goals.
These individuals have a wide-ranging view of the technical and organizational context where the changes are taking place, so their input can help a lot.

**Customer zero**

You should also include your technical writers or developer advocates in the conversation about API changes.
These roles are closest to your end users, and within the organization they act as "customer zero" - the first user of any feature.
If a change is difficult to use, or difficult to use correctly, these individuals are the voices that help you identify the problem early and work out a way forward.
They are able to give the perspective of the target audience in a way that's very difficult for those of us who are building the APIs ourselves.

## API council process

Whatever API workflow your API uses, your API council process typically follows one of two processes:

- Regular change board style meeting.
  The group convenes together (virtually or in a room) and considers each proposed API change, approving or providing feedback as appropriate.

- Asynchronous review style.
  API changes are proposed, and the group members give their opinion and advice.
  Not everyone is required to respond, and after a respectable period of time to allow comments, the change can proceed if there are no objections or modifications required.

The benefits of the asynchronous style are that it is much simpler to co-ordinate across the multi-disciplinary team, and that there is a clear papertrail of the discussion, requested changes, and eventual outcome. However similar benefits can be achieved by the real time meetings if good quality meeting notes are created and circulated from these sessions - similiar to how architecture reviews are often conducted.
Making sure there's a minimum of process and that meaningful responses can be received in a short time period helps stop the council from becoming a bottleneck.

One key requirement for API councils is that they are long-running arrangements.
There should be clear processes for bringing people into, and allowing people to move on from, these groups.
By making sure there are new faces in the room, the knowledge of APIs can be shared around the business at the same time as making sure the API stays just as healthy and thriving as its council.

## Further reading

- [API governance is more than your rulesets](./rulesets-are-not-governance.md) ...
- ... but our [Build your own API guidelines](./build-your-own-api-guidelines.md) article is a starting point for your API governance rulesets.
- [Better API examples for better API experiences](https://redocly.com/blog/openapi-examples/)
