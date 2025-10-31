---
seo:
  title: Telemetry in Redoc CE
---

# Telemetry in Redoc CE

Redoc CE collects anonymous telemetry data to help understand how people are using the documentation tool and to see what sort of issues they are experiencing.

## Configure telemetry settings

You can enable or disable telemetry collection entirely.
Telemetry can be disabled using the `disableTelemetry` option, which varies depending on how you deploy Redoc.

### HTML deployment

When using Redoc as an HTML element, add the `disable-telemetry="true"` attribute:

```html
<redoc spec-url="https://redocly.github.io/redoc/museum.yaml" disable-telemetry="true"></redoc>
<script type="module" src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
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

- OpenTelemetry: Event collection and transmission
- Analytics services: Data processing and visualization

## Types of telemetry

### Usage data

To improve Redoc CE and understand how it is being used, Redoc optionally collects usage data including:

- **Performance metrics**: Core Web Vitals data including Cumulative Layout Shift (`CLS`), Largest Contentful Paint (`LCP`), First Contentful Paint (`FCP`), and Time to First Byte (`TTFB`)
- **API specification characteristics**: Custom extensions used, request body types, authorization methods detected, and operation count
- **User interactions**: Layout type changes, language selection, definition downloads, example switching, expand/collapse actions, and code snippet copying
- **Configuration data**: Router type (`hash` or `history`), layout type (`stacked` or `three-panel`), and usage method (`HTML`, `CLI`, `React`, or `Docker`)

Usage data does not include any of your API specification content, sensitive project details, or personal information.

### Event types

Redoc CE tracks the following specific events:

#### Initial load event (`redoc_ce.initial`)
Fired when the documentation loads, including:
- Performance metrics (`CLS`, `LCP`, `FCP`, `TTFB`)
- API specification analysis (custom extensions, request bodies, authorization type)
- Configuration details (usage type, router type, operation count, layout type)

#### User interaction events
- **Layout type clicked** (`redoc_ce.layout_type.clicked`): When users switch between `stacked` and `three-panel` layouts
- **Select language clicked** (`redoc_ce.select_language.clicked`): When users change the code example language
- **Download definition clicked** (`redoc_ce.download_definition.clicked`): When users download the API specification
- **Examples switcher clicked** (`redoc_ce.examples_switcher.clicked`): When users switch between different examples
- **Expand/collapse all clicked** (`redoc_ce.expand_collapse_all.clicked`): When users expand or collapse all sections
- **Copy code snippet clicked** (`redoc_ce.copy_code_snippet.clicked`): When users copy request/response code snippets

### Data collection details

All telemetry events include:
- **Event ID**: Unique identifier for each event
- **Timestamp**: When the event occurred
- **Session ID**: Anonymous session identifier
- **Client information**: Browser locale and accepted languages
- **Source context**: Anonymous source information

Telemetry data is associated with a secure random telemetry ID and does not include personally identifiable information.

## Privacy and security

- All telemetry data is transmitted over HTTPS
- No API specification content or sensitive project details are collected
- No personally identifiable information is stored
- Telemetry can be completely disabled using the configuration options above
- Data is used solely for improving Redoc CE and understanding usage patterns

## Concerns and questions

If you have concerns about telemetry, please feel free to [open an issue on GitHub](https://github.com/Redocly/redoc/issues/new/choose).
