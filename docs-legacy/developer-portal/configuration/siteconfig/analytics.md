---
excludeFromSearch: true
---

# `analytics`

## Usage

Use the `analytics` section to integrate popular web analytics solutions into your portal.

Add it to the top level of the `siteConfig.yaml` file and configure supported analytics integrations inside it.


## Options

| Option  | Description |
| ------------- | ------------- |
| `amplitude` | Integrates [Amplitude Analytics](https://amplitude.com/) into your developer portal. This integration is supported through the [Gatsby Amplitude plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-amplitude-analytics). Refer to the official plugin documentation for more details. |
| `fullstory`  | Integrates [FullStory analytics](https://www.fullstory.com/) into your developer portal. When configured, this integration works only in production, not in local development mode. |
| `ga`  | Integrates Google Analytics into your developer portal. This integration is supported through the [Gatsby Google Analytics plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/). Refer to the official plugin documentation for more details. |
| `gtag` | Integrates Google Global Site Tag into your developer portal. When configured, this integration works only in production, not in local development mode. This integration is supported through the [Gatsby google-gtag plugin](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-gtag). Refer to the official plugin documentation for more details. |
| `gtm`  | Integrates Google Tag Manager into your developer portal. This integration is supported through the [Gatsby Google Tag Manager plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-google-tagmanager/). Refer to the official plugin documentation for more details. |
| `heap`  | Integrates Heap Analytics into your developer portal. This integration is supported through the [Gatsby Heap plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-heap/). Refer to the official plugin documentation for more details. |
| `rudderstack`  | Integrates Rudderstack Analytics into your developer portal. This integration is supported through the [Gatsby Rudderstack plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-rudderstack/). Refer to the official plugin documentation for more details. |
| `segment`  | Integrates Segment Analytics into your developer portal. This integration is supported through the [Gatsby SegmentJS plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-segment-js/). Refer to the official plugin documentation for more details. |
| `Google Marketing Platform` | Integrates Google Optimize into your developer portal. This integration is supported through the [Gatsby Google Marketing Platform plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-marketing-platform/). Refer to the official plugin documentation for more details. |


## Examples

### Amplitude

```yaml
analytics:
  amplitude:
    apiKey: your-api-key
    head: false
    respectDNT: true
    exclude:
      - /preview/**
      - /do-not-track/me/too/
    eventTypes:
      outboundLinkClick: OUTBOUND_LINK_CLICK
      pageView: PAGE_VIEW
    amplitudeConfig:
      saveEvents: true
      includeUtm: true
      includeReferrer: true
    environments:
      - production
```

### FullStory

```yaml
analytics:
  fullstory:
    fs_org: YOUR_ORG_ID
```


### Google Analytics

```yaml
analytics:
  ga:
    # This option places the tracking script into the ”<head>” of your website
    # If set to false (default), the script is placed into the "<body>"
    head: true
    trackingId: your-google-analytics-tracking-id
```


### Google Global Site Tag (gtag.js)

```yaml
analytics:
  gtag:
    trackingIds:
      - "GA-TRACKING_ID" #Google Analytics / GA
      - "AW-CONVERSION_ID" #Google Ads / Adwords / AW
      - "DC-FLOODIGHT_ID" # Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
    # This object gets passed directly to the gtag config command
    # This config will be shared across all trackingIds
    gtagConfig:
      optimize_id: "OPT_CONTAINER_ID"
      anonymize_ip: true
      cookie_expires: 0
    # This object is used for configuration specific to this plugin
    pluginConfig:
      # Puts tracking script in the head instead of the body
      head: false
      # Setting this parameter is also optional
      respectDNT: true
      # Avoids sending pageview hits from custom paths
      exclude: ["/preview/**", "/do-not-track/me/too/"]
```


### Google Tag Manager

```yaml
analytics:
  gtm:
    id: your-google-tag-manager-id
```


### Heap Analytics

```yaml
analytics:
  heap:
    appId: your-app-id
    enableOnDevMode: true # set to false by default
```

### Rudderstack Analytics

```yaml
analytics:
  rudderstack:
    prodKey: your-prod-write-key
    devKey: your-dev-write-key
    dataPlaneUrl: your-data-plane-url
    trackPage: true
```


### Segment

```yaml
analytics:
  segment:
    prodKey: SEGMENT_PRODUCTION_WRITE_KEY
    trackPage: true
```

### Google Marketing Platform

```yaml
analytics:
  googleOptimize:
    dataLayer:
      gaPropertyId: your-google-analytics-tracking-id
    optimize:
      id: your-google-optimize-tracking-id
    tagmanager:
      id: your-google-tag-manager-id
    analytics:
      trackingId: your-google-analytics-tracking-id
```
