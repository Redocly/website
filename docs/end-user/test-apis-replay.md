# Test APIs using Replay

Make API calls directly from the API reference documentation in your project.
Projects that contain API documentation, typically have Replay - the tool you can use to try out (test) API requests.

Use Replay to:

- edit any field in sample requests, unrestricted by API description schemas
- save requests and view request history
- set up and use different environments with customizable variables
- connect Replay to your live servers, the built-in mock server, or another environment
- use realistic mock responses for API development and integrations

## Access Replay

Access Replay in your reference documentation by clicking the **Try it** button for a request.

When the Replay interface opens, it overlays the API reference documentation page you were on originally.
Replay is split into two panels, **Request** and **History**.

Alternatively, some documentation pages may have an embedded Replay console that is tied to a specific description file.

## Use the Request pane

The Request pane is located on the left side of Replay and includes everything needed to make a request for an endpoint from your API description.

### Send a sample request

To send a sample request, enter the required parameters and click the **Send** button.

### Response pane

After you have sent a sample request, a sample response displays in the bottom of the Request pane.

The sample response is based on example responses included in your API description and can include the following information:

- a status code, response time, and size
- a response body in either JSON, text, HTML, or XML
- response headers and values
- response cookies

Click the **Copy** icon on the right side of the pane to copy the sample response.

## Work with environments

Environments combine server URLs with their associated inputs to enable making API calls with a defined set of parameters.

Projects can have one or more environment defined in the `servers` part of their API description files, and a generic mock server in the project's configuration.
Users can create custom environments or edit the properties of automatically-generated environments.

### Switch between environments

When testing API calls, you can switch between environments.

To switch to a different environment:

- In Replay's top-right corner, click the drop-down list and select an environment.

### Add an environment

1. In Replay's top-right corner, click the **Environments** icon.
1. In the **Environments** window's bottom-left corner, click **New environment**.
1. Enter a name for the environment and confirm.
1. In the **Server** field, hover over **More options** and click **Edit**.
1. Enter the server's URL and click **Save**.
1. (Optional) Expand the **Server variable** field and enter values for server variables.
1. (Optional) In the **Inputs** table you can:
   - Add new inputs and their values.
   - Edit values of existing inputs.
   - Set inputs values to secret.
   - Delete user-added inputs.

### Edit environment properties

You can edit user-created environments to better suit your needs:

- To rename the environment, click the **Edit** icon on the left side of an open environment.
- To change the server URL, in the **Server** field, hover over **More options** and click **Edit**.
- To set values for server variables, expand the **Server variable** field and enter values for server variables.

In the **Inputs** table you can:

- add new inputs and their values
- edit values of existing inputs
- set input values to secret
- delete user-added inputs

### Set an environment as active

You can set any environment as active.
Requests are sent to the active by default.

1. In Replay's top-right corner, click the **Environments** icon.
1. In the environments list, hover over the the chosen environment's **More options** icon and click **Set as active**.

### Delete an environment

You can delete user-created environments.
This operation is irreversible.

1. In Replay's top-right corner, click the **Environments** icon.
1. In the environments list, hover over the the chosen environment's **More options** icon and click **Remove environment**.

## History panel

Replay keeps a history of your past requests, so you can go back to an earlier API call.

History is a list of requests you made in Replay.
It displays requests you made in reverse chronological order: latest requests at the top of the list.

Requests are grouped by date and display the status code of the response.

### Search the request history

The **History** panel has a **Search** filed you can use to find specific requests.
You can enter either the request method or a part of the request payload as the search query.

### Clear request history

You can delete a single request from history or clear the entire request history.

To delete a request from history:

- In the **History** panel, hover over a request and click the trashcan icon.

To delete the search history:

- In the **History** panel, on the left side of the **Search** field, click the broom icon.

### Collapse the History panel

You can hide the History panel to make the pages better fit smaller screens.

To collapse the History panel:

- In Replay's bottom-left corner, click the **Collapse panel** button.

## Return to the reference documentation

From the Request pane you can click the request link at the top of the page to open the API reference documentation for that request in another tab.

Otherwise, if you want to see the reference documentation, you can close Replay using the **X** icon on the top left side of the Request pane.

## Resources

- [Interact with API documentation](./interact-with-api.md)
- [Test APIs using CLI](./test-apis-cli.md)
- [Use a classic catalog](./use-classic-catalog.md)
- Explore other ways you can interact with the [user interface](./index.md)
