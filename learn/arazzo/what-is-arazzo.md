# What is Arazzo?

Arazzo is a shiny new tool in the API world, brought to you by the OpenAPI Initiative—the same folks behind the wildly popular OpenAPI Specification. Think of it as a way to describe how APIs work together, not just what they do. While OpenAPI excels at defining individual API endpoints, Arazzo steps in to map out the sequences of calls—the workflows—that make complex API interactions happen. It's like giving your APIs a choreography script so they can dance in perfect harmony.

## The big idea

At its heart, Arazzo is all about workflows. It's a machine-readable specification that lets you define a series of API operations, their dependencies, and what success (or failure) looks like. Imagine you're building an app where a user logs in, fetches their profile, and then submits an order—all with different API calls. Arazzo ties those steps together into a single, coherent story. It's built in YAML or JSON, just like OpenAPI, so it feels familiar if you've worked with API specs before.

Arazzo doesn't replace OpenAPI; it complements it. You still use OpenAPI to describe your endpoints (e.g., `GET /users/{id}`), but Arazzo steps up to say, "First call this, then use that response to call this, and here's what to do if it fails." It's a bridge between static API definitions and real-world usage, making life easier for developers, testers, and even AI systems trying to figure out your APIs.


## Why it exists

APIs are everywhere, but using them can get messy. OpenAPI files tell you what's available, but they don't explain the how—the order of operations, the data flow, or the context. Without that, developers are left piecing it together through trial and error or digging through docs (if they're lucky). Arazzo solves this by providing a clear, structured way to document and automate API workflows. It's about reducing guesswork and boosting efficiency.

The OpenAPI Initiative launched Arazzo 1.0.0 in 2024, with a patch (1.0.1) following in early 2025, after years of work by the Workflows Special Interest Group (SIG). It's still young, but it's already turning heads for its potential to transform how we interact with APIs.

## Key features

Here's what makes Arazzo stand out:
- Workflows: Define sequences of API calls with steps, inputs, and outputs.
- Dependencies: Link steps together (e.g., "Use the token from step 1 in step 2").
- Success and Failure: Specify conditions for moving forward or handling errors.
- OpenAPI Integration: Reference existing OpenAPI files to keep things DRY (Don't Repeat Yourself).
- Reusability: Share components across workflows for consistency.

For example, a simple Arazzo workflow might look like this:

```yaml
arazzo: "1.0.1"
info:
  title: "User Login Workflow"
  version: "1.0.0"
sourceDescriptions:
  - name: unique-api-name
    type: openapi
    url: openapi.yaml
workflows:
  - workflowId: "loginAndGetProfile"
    summary: "Log in and fetch user profile"
    steps:
      - stepId: "login"
        operationId: "postLogin"
        requestBody:
          payload:
            username: "user123"
            password: "secret"
        outputs:
          token: $response.body#/token
      - stepId: "getProfile"
        operationId: "getUserProfile"
        parameters:
          - name: token
            in: header
            value: $steps.login.outputs.token
```

This snippet tells a tool (or a human) how to log in and then use the token to fetch a profile—all in one neat package.

## Who's it for?

Arazzo is for anyone working with APIs:
- Developers: Understand and test API flows faster.
- API Designers: Document how your APIs should be used.
- Testers: Automate multi-step API scenarios.
- AI Developers: Feed structured workflows to AI agents for smarter API consumption.
- Teams: Align on how APIs fit into your app's bigger picture.

## The payoff
Arazzo promises a better developer experience by making APIs more approachable and predictable. It's machine-readable, so tools can generate docs, tests, or even SDKs from it. It's human-friendly, too, with summaries and descriptions that clarify intent. Whether you're onboarding new devs, streamlining testing, or prepping for the AI-driven future, Arazzo has something to offer.

In short, Arazzo is the missing link between API definitions and real-world action. It's young, it's growing, and it's ready to help you tame the wild world of APIs. Ready to dive in? Let's explore how it works!
