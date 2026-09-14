---
seo:
  title: Telemetry in Redoc CE
---

# Telemetry in Redoc CE

Redoc CE collects anonymous telemetry data to help understand how people are using the documentation tool.
It also shows what sort of issues they are experiencing.

Telemetry is on by default in Redoc CE.
Only production bundles send data: the CDN, npm, Docker, and CLI builds do, while a local development server built from source does not.

## Configure telemetry settings

You can disable telemetry collection entirely.
The setting is passed in a way that depends on how you deploy Redoc CE.

### HTML element

When using Redoc CE as an HTML element, add the `disable-telemetry="true"` attribute:

```html
<redoc spec-url="https://redocly.github.io/redoc/cafe.yaml" disable-telemetry="true"></redoc>
<script type="module" src="https://cdn.redoc.ly/redoc/v3.x/bundle/redoc.standalone.js"></script>
```

The value must be the literal `true`.
A bare `disable-telemetry` attribute without a value does not disable telemetry.

### JavaScript `init` function

When calling `init`, pass `disableTelemetry: true` in the options:

```js
import { init } from 'https://cdn.redoc.ly/redoc/v3.x/bundle/redoc.standalone.js';

init('https://redocly.github.io/redoc/cafe.yaml', { disableTelemetry: true });
```

### React component

When using the React component, set `disableTelemetry` in the `options` prop:

```jsx
import { RedocStandalone } from 'redoc';

<RedocStandalone
  specUrl="https://redocly.github.io/redoc/cafe.yaml"
  options={{ disableTelemetry: true }}
/>
```

### Redocly CLI

When building documentation with Redocly CLI, pass the `--disableTelemetry` flag:

```sh
npx @redocly/cli build-docs openapi.yaml --disableTelemetry
```

Or add `disableTelemetry` to your `redocly.yaml` configuration file, under the key of the specification type you build:

```yaml {% title="redocly.yaml" %}
openapi:
  disableTelemetry: true
asyncapi:
  disableTelemetry: true
graphql:
  disableTelemetry: true
```

Telemetry in the built page is on by default, and either setting turns it off.

### Docker image

When using Docker, pass the `disable-telemetry="true"` attribute through the `REDOC_OPTIONS` environment variable:

```bash
docker run -p 8080:80 \
  -e SPEC_URL=https://api.example.com/openapi.json \
  -e REDOC_OPTIONS='disable-telemetry="true"' \
  redocly/redoc
```

## Dataflow

Telemetry is sent from the documentation to our servers.
Data is transmitted over HTTPS to ensure security.
We currently use:

- OpenTelemetry: event collection and transmission
- Analytics services: data processing and visualization

## Types of telemetry

### Usage data

To improve Redoc CE and understand how it is being used, Redoc CE optionally collects usage data including:

- **Performance metrics**: Core Web Vitals data including Cumulative Layout Shift (CLS), Largest Contentful Paint (LCP), First Contentful Paint (FCP), and Time to First Byte (TTFB)
- **Configuration data**: the layout (`stacked` or `three-panel`), the description format (`openapi`, `asyncapi`, or `graphql`), and the usage method (`html`, `cli`, `init`, or `docker`)
- **User interactions**: layout changes, language selection, definition downloads, example and server switching, expand/collapse actions, code snippet copying, search usage, and security details views
- **Errors**: rendering errors caught by Redoc CE, with the error message and stack trace

Usage data does not include your API description content, sensitive project details, or personal information.

### Event types

Every event is a CloudEvent whose type follows the pattern `com.redocly.<event>.<verb>`.
Redoc CE sends the following events:

#### Page events

- **Initialized** (`com.redocly.redoc.initialized`): when the documentation first renders, with the layout and the usage method
- **Page viewed** (`com.redocly.page.viewed`): when the documentation mounts, with the page URL and layout
- **Performance metrics collected** (`com.redocly.performanceMetrics.collected`): once the four Core Web Vitals values are available
- **Error occurred** (`com.redocly.error.occurred`): when a rendering error is caught

#### Interaction events

- **Change layout clicked** (`com.redocly.changeLayout.clicked`): when users switch between `stacked` and `three-panel` layouts
- **Select language clicked** (`com.redocly.selectLanguage.clicked`): when users change the code sample language
- **Download definition clicked** (`com.redocly.downloadDefinition.clicked`): when users download the API description
- **Examples switcher clicked** (`com.redocly.examplesSwitcher.clicked`): when users switch between examples
- **Switch servers clicked** (`com.redocly.switchServers.clicked`): when users change the target server
- **Expand/collapse all clicked** (`com.redocly.expandCollapseAll.clicked`): when users expand or collapse all sections
- **Copy code snippet clicked** (`com.redocly.copyCodeSnippet.clicked`): when users copy request or response code snippets
- **View security details clicked and closed** (`com.redocly.viewSecurityDetails.clicked`, `com.redocly.viewSecurityDetails.closed`): when users open and close the security details, including the time spent in the dialog
- **Search opened** (`com.redocly.search.opened`): when users open the search dialog, with the method used (click or shortcut)
- **Search result clicked** (`com.redocly.searchResult.clicked`): when users select a search result, with the number of results
- **Search input reset clicked** (`com.redocly.searchInputReset.clicked`): when users clear the search input

#### AsyncAPI and GraphQL events

- **Switch example clicked** (`com.redocly.switchExample.clicked`): when users switch between message examples
- **Switch message clicked** (`com.redocly.switchMessage.clicked`): when users switch between alternative messages of an operation
- **Server modal opened** (`com.redocly.serverModal.opened`): when users open the broker details
- **Message clicked** (`com.redocly.message.clicked`): when users follow a message link
- **Referenced in clicked** (`com.redocly.referencedIn.clicked`): when users follow a type, field, or channel reference link
- **Required scopes modal opened** (`com.redocly.requiredScopesModal.opened`): when users open the required scopes details of a GraphQL field

### Data collection details

All telemetry events include:

- **Event ID**: unique identifier for each event
- **Timestamp**: when the event occurred
- **Session ID**: anonymous session identifier
- **Description format**: `openapi`, `asyncapi`, or `graphql`
- **Client information**: the standard headers of the HTTPS request, such as the browser's user agent and accepted languages
- **Source context**: the page URL for page events, and a stable identifier of the control for interaction events

Telemetry data is associated with a secure random telemetry ID and does not include personally identifiable information.

## Privacy and security

- All telemetry data is transmitted over HTTPS.
- No API description content or sensitive project details are collected.
- No personally identifiable information is stored.
- Telemetry can be disabled using the configuration options above.
- Data is used solely for improving Redoc CE and understanding usage patterns.

## Concerns and questions

If you have concerns about telemetry, feel free to [open an issue on GitHub](https://github.com/Redocly/redoc/issues/new/choose).

## Resources

- **[Configure Redoc CE](./config.md)** - Redoc CE's configuration options
- **[Use Redoc CE in HTML](./deployment/html.md)** - The attribute rules that apply to `disable-telemetry`
