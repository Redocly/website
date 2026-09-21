---
seo:
  title: Telemetry in Redoc CE
---

# Telemetry in Redoc CE

Redoc CE collects anonymous telemetry data to help understand how people are using the documentation tool.
It also shows what sort of issues they are experiencing.

## Configure telemetry settings

You can enable or disable telemetry collection entirely.
Use the `disableTelemetry` option, which varies depending on how you deploy Redoc CE.

### HTML deployment

When using Redoc as an HTML element, add the `disable-telemetry="true"` attribute:

```html
<redoc spec-url="https://redocly.github.io/redoc/museum.yaml" disable-telemetry="true"></redoc>
<script type="module" src="https://cdn.redoc.ly/redoc/v3.0.0-rc.0/redoc.standalone.js"></script>
```

### React component

When using Redoc as a React component, pass the `disableTelemetry` prop:

```jsx
import { RedocStandalone } from 'redoc';

<RedocStandalone
  specUrl="https://redocly.github.io/redoc/museum.yaml"
  disableTelemetry={true}
/>
```

### CLI and configuration file

When using Redocly CLI, you can disable telemetry by passing the `--disableTelemetry` flag:

```sh
redocly build-docs openapi.yaml --disableTelemetry
```

Or add the `disableTelemetry` option to your `redocly.yaml` configuration file:

```yaml
openapi:
  disableTelemetry: true
```

### Docker deployment

When using Docker, disable telemetry by passing the `disable-telemetry="true"` attribute through the `REDOC_OPTIONS` environment variable:

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

- **Performance metrics**: core Web Vitals.
  These are Cumulative Layout Shift (`CLS`), Largest Contentful Paint (`LCP`), First Contentful Paint (`FCP`), Time to First Byte (`TTFB`), and Interaction to Next Paint (`INP`).
  Also the time spent resolving and rendering the API description.
- **API description shape**: counts of operations, schemas, tags, webhooks, callbacks, channels, messages, servers and security schemes.
  Also the specification version and which Redoc extensions (such as `x-logo` or `x-tagGroups`) the description uses.
- **Reading behavior**: how long a page stays open and visible, and how many sections the reader viewed.
  Also how deep the reader expanded nested schemas, which response status classes they opened, and how many searches they made.
- **User interactions**: sidebar navigation, layout and color mode changes, language selection, definition downloads, and example switching.
  Also expand/collapse actions, code snippet copying, security detail views, the Copy for LLM and Open in Claude/ChatGPT actions, and the MCP connect button.
- **Configuration data**: options that differ from their defaults, router type (`hash` or `history`), and layout type (`stacked` or `three-panel`).
  Also the usage method (`HTML`, `CLI`, `React`, or `Docker`) and whether the page runs on a local or private address.
- **Performance metrics**: core Web Vitals.
  These are: Cumulative Layout Shift (`CLS`), Largest Contentful Paint (`LCP`), First Contentful Paint (`FCP`), Time to First Byte (`TTFB`), and Interaction to Next Paint (`INP`).
  Additionally, these metrics include the time spent resolving and rendering the API description.
- **API description shape**: counts of operations, schemas, tags, webhooks, callbacks, channels, messages, servers and security schemes.
  This category also includes the specification version and which Redoc extensions (such as `x-logo` or `x-tagGroups`) the description uses.
- **Reading behavior**: how long a page stays open and visible, and how many sections the reader viewed.
  Moreover, metrics in this category track how deep the reader expanded nested schemas, which response status classes they opened, and how many searches they made.
- **User interactions**: sidebar navigation, layout and color mode changes, language selection, definition downloads, and example switching.
  This category also covers the expand and collapse actions, code snippet copying, security detail views, the Copy for LLM and Open in Claude or ChatGPT actions, and the MCP connect button.
- **Configuration data**: options that differ from their defaults, router type (`hash` or `history`), and layout type (`stacked` or `three-panel`).
  These options also include the usage method (`HTML`, `CLI`, `React`, or `Docker`) and whether the page runs on a local or private address.
- **Health**: rendering errors (error class and frame count) and API descriptions that failed to load, with the failing stage and HTTP status.

Usage data does not include any of your API description content, sensitive project details, or personal information.

### Event types

Redoc CE tracks the following events.
Every payload carries counts, positions, kinds, durations and fixed-list values only.

**Page events**

- **Initialized** (`com.redocly.redoc.initialized`): the load event described in [Usage data](#usage-data)
- **Page viewed** (`com.redocly.page.viewed`): the kind of item shown, such as operation, schema, channel, message, type, group, or overview.
 This event also records how the reader got there: sidebar, search, link, or browser history.
- **Page time** (`com.redocly.page.time`): a summary of the page load sent when the tab is hidden, with the reading counters
- **Performance metrics** (`com.redocly.performanceMetrics.collected`): the Web Vitals listed in [Usage data](#usage-data)
- **Error** (`com.redocly.error.occurred`): a rendering error, with URLs removed from its text
- **Definition load failed** (`com.redocly.definition.loadFailed`): the stage that failed and the HTTP status, with the URL removed

**Navigation and controls**

- **Sidebar item clicked** (`com.redocly.sidebarItem.clicked`): the kind of item clicked and how deeply it's nested
- **Sidebar collapsed** (`com.redocly.sidebar.collapsed`), **Change layout clicked** (`com.redocly.changeLayout.clicked`), **Color mode switched** (`com.redocly.colorMode.switched`)
- **Logo clicked** (`com.redocly.logo.clicked`): the "API docs by Redocly" link
- **Connect MCP clicked** (`com.redocly.connectMcp.clicked`): which client was chosen (`cursor` or `vscode`)

**Search**

- **Search opened** (`com.redocly.search.opened`)
- **Search query** (`com.redocly.search.query`): word count and result count, with the search text removed
- **Search result clicked** (`com.redocly.searchResult.clicked`): position in the list and the kind of item, with the URL removed
- **Search input reset** (`com.redocly.searchInputReset.clicked`)

**Content**

- **Schema field expanded** (`com.redocly.schemaField.expanded`): nesting depth and child count
- **Response code tab clicked** (`com.redocly.responseCodeTab.clicked`): status class such as `2xx` or `4xx`
- **Expand/collapse all clicked** (`com.redocly.expandCollapseAll.clicked`)
- **Examples switcher clicked** (`com.redocly.examplesSwitcher.clicked`), **Switch example clicked** (`com.redocly.switchExample.clicked`)
- **Select language clicked** (`com.redocly.selectLanguage.clicked`), **Copy code snippet clicked** (`com.redocly.copyCodeSnippet.clicked`)
- **Switch servers clicked** (`com.redocly.switchServers.clicked`), **Download definition clicked** (`com.redocly.downloadDefinition.clicked`)
- **Page actions clicked** (`com.redocly.pageActions.clicked`): Copy for LLM, Open in Claude or Open in ChatGPT, with the outcome

**Security**

- **View security details clicked / closed** (`com.redocly.viewSecurityDetails.clicked`, `.closed`): scheme types and OAuth2 flows as counts, and time spent in the dialog
- **Security optional scopes expanded** (`com.redocly.securityOptionalScopes.expanded`)
- **Required scopes modal opened** (`com.redocly.requiredScopesModal.opened`)

**AsyncAPI and GraphQL**

- **Message clicked** (`com.redocly.message.clicked`), **Switch message clicked** (`com.redocly.switchMessage.clicked`), **Server modal opened** (`com.redocly.serverModal.opened`), **Referenced in clicked** (`com.redocly.referencedIn.clicked`): positions, protocol and item kinds, with names removed

### Data collection details

All telemetry events include:
- **Event ID**: unique identifier for each event
- **Timestamp**: when the event occurred
- **Session ID**: a random identifier created for the page load and kept in memory only
- **Page identifier**: the constant `urn:redocly:redoc:ui:page`, used in place of the page's actual URL

The telemetry data does not include personally identifiable information.

## Privacy and security

- Redoc CE transmits all telemetry data over HTTPS.
- Redoc CE never collects API description content: no operation, field, message, server, or type names, and no search text.
- Redoc CE never sends the URL where the documentation is hosted or the referrer.
  It also removes URLs and file paths from error messages.
- Redoc CE uses no cookies and no local storage.
  The session identifier lives in memory for one page load.
- Redoc CE stores no personally identifiable information.
- You can disable telemetry using the configuration options described in [Configure telemetry settings](#configure-telemetry-settings).
- Redocly uses this data solely to improve Redoc CE and understand usage patterns.

## Concerns and questions

If you have concerns about telemetry, feel free to [open an issue on GitHub](https://github.com/Redocly/redoc/issues/new/choose).

## Resources

- **[Configure Redoc](./config.md)** - Explore Redoc CE's configuration options
