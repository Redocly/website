---
excludeFromSearch: true
---

# Create step-by-step guides

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

With UI components built into the Developer portal, you can create interactive step-by-step guides to teach your API consumers how to work with your APIs.
This component lets you embed the *Try it* API console from Redocly Reference into any MDX page in your portal.
Your API consumers can then send requests and receive responses from the API directly in the guide by following along with your examples.
Similar to method chaining, you can connect the response data with the request data in subsequent steps.

The key point of a step-by-step guide is the order in which the steps must be executed.
In some cases, this order is strictly determined by the design of an API or by the consumer's goal.
The `OpenApiTryIt` component supports conditional content and makes it possible to indicate that a step depends on one or more previous steps in the guide.


## Prerequisites

We're starting with the assumption that you already have a Developer portal project set up.
To create an interactive step-by-step guide in your portal, you need the following:

- A valid OpenAPI definition for the API(s) you want to describe in the guide.
The OpenAPI definition must be listed in the [oasDefinitions](../configuration/siteconfig/oasdefinitions.md) section of your `siteConfig.yaml` file.
For every OpenAPI definition you plan to use, you need the `definitionId` from the `oasDefinitions` section.

- A working server and authentication configuration for the API(s) you want to describe in the guide.
This is required in order to successfully send requests and receive responses from the APIs in the `OpenApiTryIt` component.


## Plan the content for the guide

Before you start writing your step-by-step guide, it's a good idea to plan its outline.

First, be clear about the purpose of your guide and specific about what you want to teach the readers.
It's useful to specify the expected level of expertise or the target audience at the beginning of your guide.
If possible, include links to resources for other types of readers who might want to learn more about your APIs.
You should also decide on a use-case scenario to show in your guide.
To help your audience understand your APIs better, choose common scenarios that showcase typical tasks consumers do with your APIs.

Next, think about the order of steps.
Try to make it logical so that the user flow makes sense when readers follow your guide.
You should define dependencies for each step you want to include in your guide.
In this context, "dependencies" refer to any element (e.g. request parameter or response field) that must be present in a specific step to successfully complete an action.

Finally, make sure that the examples you use in your guide are correct, and that the readers can execute them by sending example requests to your server.

## Import components for the guide

After setting up your OpenAPI definition(s) and planning the content outline of your guide, create the guide as an MDX file in your portal project.

Components must be imported in the following format:

```jsx
import { componentName } from '@redocly/developer-portal/ui';
```

This example shows an MDX file with imported components for step-by-step guides:

```jsx

import { OpenApiTryIt, Alert, ExplainStep, scrollToHeading } from '@redocly/developer-portal/ui';

# Example MDX page title

Example text

```


## Set up steps with `OpenApiTryIt`

For every step that shows an example request to your API, use the `OpenApiTryIt` component.

1. In the component, you must specify the OpenAPI definition (by its `definitionId` from the `siteConfig.yaml` file) and the operation (by its `operationId` from the OpenAPI document).

2. Next, you must assign a custom ID to the component instance.
This is required to distinguish between multiple component instances in the guide.

3. To define dependencies between the steps (e.g. to show that Step 2 requires Step 1), use `needs` and `placeholder` component properties.
Under `needs`, list one or more custom ID values of previous `OpenApiTryIt` instances that are required for the current step.
Under `placeholder`, use a function to describe the condition(s) that must be fulfilled to proceed to the next step.
This placeholder description remains visible until all specified conditions are met.

4. Depending on the example you want to show, use any of the supported component properties (`properties`, `parameters`, `serverVariables`, `securityDefaults`) to set the default values.
Those preset values are automatically used when a reader sends an example request from the component.

5. Optionally, use the `onResponse` property in the component to define what happens after receiving the response and/or how to handle the received data.


### Example 1: Use `OpenApiTryIt`

In the following example, we set up the first step in the guide (identified by `id="step-1"`) and use optional `properties`, `parameters` and `onResponse` objects in the `OpenApiTryIt` component.

- `properties` sets the default values for request body properties used in the example request
- `parameters` sets the default values for request parameters used in the example request
- `onResponse` uses the `scrollToHeading` component to redirect the reader to a specific heading on the page after receiving the response.


<details>
<summary>Example: Add Step 1</summary>

<!-- prettier-ignore -->
```html

# Step 1

In this step, we're creating a new user account.

<OpenApiTryIt
  definitionId="stepByStep"
  operationId="CreateUser"
  id="step-1"
  properties={{
    firstName: "John",
    lastName: "Smith"
  }}
  parameters={{
    header: {
      'Organization-Id': 'My-Header'
    }
  }}
  onResponse={({ response }) => {
    if (response.ok) {
      scrollTo(0, document.querySelector('#step-2').offsetTop - 20, { behavior: 'smooth' })
    }
  }}
/>
```

</details>


Then, we add the second step to the guide (identified by `id="step-2"`). With `needs` and `placeholder`, we indicate that the first step is required for the second step.

- `needs` contains the `id` of the required step(s) - in this case, it's 'step-1'
- `placeholder` contains a function that will display the `Alert variant="danger"` component with the specified text until the reader completes Step 1
- `Alert variant="success"` will be displayed after the reader successfully receives a response in Step 1


{% admonition type="warning" name="Important" %}
Function names can contain letters, numbers, underscores and dollar signs, but not hyphens.

That is why the value of `id` (*step-1*) is different from the function name in `properties` and `placeholder` (*step1*).
{% /admonition %}


<details>
<summary>Example: Add Step 2</summary>

<!-- prettier-ignore -->
```html

# Step 2

In this step, we're changing the account status to give the user administrator privileges.

<OpenApiTryIt
  definitionId="stepByStep"
  operationId="UpdateUser"
  id="step-2"
  needs={['step-1']}
  properties={(step1) => ({
    userId: step1.response.body.data.user.id,
    status: "admin",
  })}
  placeholder={(step1) => {
    if (!step1) {
      return (
        <Alert variant="danger">
          Please complete Step 1 first. We need the user ID (<strong><i>step1.response.body.data.user.id</i></strong>) from the response body in Step 1 for this request. This ID tells the API which user account to update.
        </Alert>
      );
    } else {
      return (
        <Alert variant="success">
          <strong>You can now send the request to change account status for the {step1.response.body.data.user.id} user.</strong>
        </Alert>
      )
    }
  }}
  onResponse={({ response }) => {
    if (response.ok) {
      scrollTo(0, document.querySelector('#step-3').offsetTop - 20, { behavior: 'smooth' })
    }
  }}
/>
```

</details>

## Add context with `ExplainStep`

In addition to defining the dependencies between steps in the `OpenApiTryIt` component, you can use the `ExplainStep` component.
With this component, you can highlight which elements are required in each step, and describe the relationships between steps.
Like with `OpenApiTryIt`, you can use multiple instances of the `ExplainStep` component in your guide.

1. Connect the `ExplainStep` component to one or more `OpenApiTryIt` instances.
List the custom ID of each `OpenApiTryIt` step in the `needs` component property.

2. Use the `placeholder` component property to add context and descriptions for every step listed in `needs`.
The contents of `placeholder` should be a function that defines what your readers see on the page based on previously completed steps.


### Example 2: Use `ExplainStep`

Expand on [the previous example](#example-1-use-openapitryit) by inserting the `ExplainStep` component after the second step.
We're using this component to explain why Step 1 and Step 2 are required for Step 3, and to warn the readers that they must complete those steps first.

- `ExplainStep` has its own custom ID (`id="explain-step-1"`) to prevent conflicts with other instances in the guide
- `placeholder` contains a function that will display the `Alert variant="danger"` component with the specified text until the reader completes Step 1 and Step 2
- if all previous steps are completed, `Alert variant="success"` will be displayed.

<details>
<summary>Example: Add context before Step 3</summary>

<!-- prettier-ignore -->
```html

# Step 1

In this step, we're creating a new user account.

<OpenApiTryIt
  definitionId="stepByStep"
  operationId="CreateUser"
  id="step-1"
  properties={{
    firstName: "John",
    lastName: "Smith"
  }}
  parameters={{
    header: {
      'Organization-Id': 'My-Header'
    }
  }}
  onResponse={({ response }) => {
    if (response.ok) {
      scrollTo(0, document.querySelector('#step-2').offsetTop - 20, { behavior: 'smooth' })
    }
  }}
/>

# Step 2

In this step, we're changing the account status to give the user administrator privileges.

<OpenApiTryIt
  definitionId="stepByStep"
  operationId="UpdateUser"
  id="step-2"
  needs={['step-1']}
  properties={(step1) => ({
    userId: step1.response.body.data.user.id,
    status: "admin",
  })}
  placeholder={(step1) => {
    if (!step1) {
      return (
        <Alert variant="danger">
          Please complete Step 1 first. We need the user ID (<strong><i>step1.response.body.data.user.id</i></strong>) from the response body in Step 1 for this request. This ID tells the API which user account to update.
        </Alert>
      );
    } else {
      return (
        <Alert variant="success">
          <strong>You can now send the request to change account status for the {step1.response.body.data.user.id} user.</strong>
        </Alert>
      )
    }
  }}
  onResponse={({ response }) => {
    if (response.ok) {
      scrollTo(0, document.querySelector('#step-3').offsetTop - 20, { behavior: 'smooth' })
    }
  }}
/>

# Step 3

<ExplainStep
  needs={['step-1', 'step-2']}
  id="explain-step-1"
  placeholder={(step1,step2) => {
    if (!step1) {
      return (
        <Alert variant="danger">
          You must create a user account first. Please complete Step 1. The user ID from the Step 1 response body is required to send a request in Step 2.
        </Alert>
      )
    } else if (!step2) {
      return (
        <Alert variant="danger">
          You must change the user status before proceeding with Step 3. Please complete Step 2. The user account must have administrator privileges to send a request in Step 3.
        </Alert>
      )
    } else {
      return (
        <Alert variant="success">
          <strong>You have successfully completed Step 1 and Step 2!</strong><br />
          Now you can proceed to Step 3.
        </Alert>
      )
    }
  }}
/>
```

</details>

## Complete the step-by-step guide

After you add the `OpenApiTryIt` and `ExplainStep` instances to your guide, make sure that their dependencies are correctly defined.
Check that the `id` of each instance matches the `needs` and `placeholder` values of other instances that refer to it.

In previous sections, we added Step 1 and Step 2 to our example guide, and introduced the requirements for Step 3.
The following example shows the full step-by-step guide with three steps.

<details>
<summary>Example step-by-step guide with 3 steps</summary>

<!-- prettier-ignore -->
```html
import { H3, OpenApiTryIt, Alert, ExplainStep, scrollToHeading } from '@redocly/developer-portal/ui';

# Create a shared administrator account

In this step-by-step guide, we will create a shared administrator account for the organization.

# Step 1

In this step, we're creating a new user account.

<OpenApiTryIt
  definitionId="stepByStep"
  operationId="CreateUser"
  id="step-1"
  properties={{
    firstName: "John",
    lastName: "Smith"
  }}
  parameters={{
    header: {
      'Organization-Id': 'My-Header'
    }
  }}
  onResponse={({ response }) => {
    if (response.ok) {
      scrollTo(0, document.querySelector('#step-2').offsetTop - 20, { behavior: 'smooth' })
    }
  }}
/>

# Step 2

In this step, we're changing the account status to give the user administrator privileges.

<OpenApiTryIt
  definitionId="stepByStep"
  operationId="UpdateUser"
  id="step-2"
  needs={['step-1']}
  properties={(step1) => ({
    userId: step1.response.body.data.user.id,
    status: "admin",
  })}
  placeholder={(step1) => {
    if (!step1) {
      return (
        <Alert variant="danger">
          Please complete Step 1 first. We need the user ID (<strong><i>step1.response.body.data.user.id</i></strong>) from the response body in Step 1 for this request. This ID tells the API which user account to update.
        </Alert>
      );
    } else {
      return (
        <Alert variant="success">
          <strong>You can now send the request to change account status for the {step1.response.body.data.user.id} user.</strong>
        </Alert>
      )
    }
  }}
  onResponse={({ response }) => {
    if (response.ok) {
      scrollTo(0, document.querySelector('#step-3').offsetTop - 20, { behavior: 'smooth' })
    }
  }}
/>

# Step 3

In this step, we're setting the scope of administrator privileges to the entire organization.

<ExplainStep
  needs={['step-1', 'step-2']}
  id="explain-step-1"
  placeholder={(step1,step2) => {
    if (!step1) {
      return (
        <Alert variant="danger">
          You must create a user account first. Please complete Step 1. The user ID from the Step 1 response body is required to send a request in Step 2.
        </Alert>
      )
    } else if (!step2) {
      return (
        <Alert variant="danger">
          You must change the user status before proceeding with Step 3. Please complete Step 2. The user account must have administrator privileges to send a request in Step 3. We also need the list of permissions from the Step 2 response body for this request.
        </Alert>
      )
    } else {
      return (
        <Alert variant="success">
          <strong>You have successfully completed Step 1 and Step 2!</strong><br />
          Now you can proceed to Step 3.
        </Alert>
      )
    }
  }}
/>

<OpenApiTryIt
  definitionId="stepByStep"
  operationId="SetScope"
  id="step-3"
  needs={['step-1', 'step-2']}
  properties={(step1, step2) => ({
    userId: step1.response.body.data.user.id,
    permissions: step2.response.body.permissions
    scope: "org",
  })}
  placeholder={(step1, step2) => {
    const text = step1 || step2 ? 'Complete 1 remaining step' : 'Complete the 2 steps above';
    return <Alert variant="warning">{text}</Alert>
  }}
/>
```

</details>

## Preview and test the guide

When you have added all the steps in the desired order, save the changes to your MDX file.
Start the portal build.
When the build is complete, navigate to the page that contains your new step-by-step guide.
Go through all the steps defined in your guide and test out the examples to make sure they're functioning properly.

For a working example of a step-by-step guide in the developer portal, check [the Rebilly payment form tutorial](https://www.rebilly.com/docs/content/billing/tutorial/create-a-hosted-payment-form/).

