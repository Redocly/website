---
seo:
  title: How to set up custom HTTP response headers
excludeFromSearch: true

---

# Configure custom response headers for Portals and API docs

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

When people visit your API docs or your developer portal website, their browsers receive more than just the text and images. Among other elements, the browser also receives the HTTP response header object. This object contains response headers that carry additional information about your website and the server hosting it. Some types of response headers can be used to control how the browser interprets and interacts with the data it receives.

You can configure custom response headers for your API docs and Developer portals hosted in Workflows. Your custom headers are added to the response header object during the project build and according to criteria specified in the configuration file.

Workflows supports adding all standard [HTTP response headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) to the configuration file.

## Prerequisites

- Access to the API version or Developer portal project repository

- Redocly Workflows user account

## Create the response header configuration file

The configuration file must be named `customHeaders.yaml`. Create it in the root directory of your API version or Developer portal project.

The contents of the `customHeaders.yaml` file must be in the following format:

```yaml
customHeaders:
  - pattern: 'example pattern'
    headers:
      - key: 'example response header name'
        value: 'example value'
```

Use `pattern` to specify the resource(s) to which the response headers should be added. For example, the general `**/*` pattern means the headers are added to all resources, while the `**/*.js` pattern targets resources with the `.js` file extension.

You can add multiple `pattern` sections to the configuration file.

Every `pattern` section must contain at least one response header. Response headers are defined as key-value pairs under `headers`. When defining a response header, its `key` must contain the header name, and `value` must contain one or more supported values for that response header.

{% admonition type="danger" name="Important" %}
When building the project, Workflows reads the patterns from top to bottom and starts with the first matched pattern. If you want to use the general glob pattern (`**/*`), you must always place it at the end of the `customHeaders.yaml` file.
{% /admonition %}

Here is an example `customHeaders.yaml` file with multiple patterns and response headers configured.

```yaml
customHeaders:
  - pattern: '**/*.js'
    headers:
      - key: 'Referrer-Policy'
        value: 'strict-origin'
  - pattern: '**/*'
    headers:
      - key: 'Strict-Transport-Security'
        value: 'max-age=31556926; includeSubDomains; preload'
      - key: 'X-XSS-Protection'
        value: '1;mode=block;'
      - key: 'X-Content-Type-Options'
        value: 'nosniff'
      - key: 'Referrer-Policy'
        value: 'strict-origin'
      - key: 'Feature-Policy'
        value: >-
          autoplay 'none';
          accelerometer 'none';
          ambient-light-sensor 'none';
          camera 'none';
          encrypted-media 'none';
          fullscreen 'none';
          gyroscope 'none';
          magnetometer 'none';
          geolocation 'none';
          microphone 'none';
          midi 'none';
          payment 'none';
          picture-in-picture 'none';
          sync-xhr 'none';
          usb 'none';
          encrypted-media 'none';
          speaker 'none';
          vr 'none';
```

## Configure the Content Security Policy header

One of the custom response headers you can configure in the `customHeaders.yaml` file is the `Content-Security-Policy` header. This header is commonly used to implement security policies that prevent specific types of attacks, such as data injection and Cross-Site-Scripting (XSS). When defining the Content-Security-Policy header for your website, you are able to restrict which resources the browser is allowed to load. [Read more about CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) and the security features it supports.

To configure the `Content-Security-Policy` header for your API docs or Developer portal project, add it to the `customHeaders.yaml` file. Follow the same [formatting rules](#create-the-response-header-configuration-file) as for the other headers. You can define multiple `Content-Security-Policy` headers targeting different resources.

Here is an example `customHeaders.yaml` file with CSP headers configured.

```yaml
customHeaders:
  - pattern: '**/*.js'
    headers:
      - key: 'Content-Security-Policy'
        value: >-
          default-src 'none';
          base-uri 'none';
          object-src 'none';
          connect-src 'none';
          font-src 'none';
          frame-src 'none';
          child-src 'none';
          form-action 'none';
          media-src 'none';
          worker-src 'none';
          style-src 'self' 'none';
          script-src 'self' 'none';
          img-src 'self' 'none';
          block-all-mixed-content;
  - pattern: '**/*'
    headers:
      - key: 'Content-Security-Policy'
        value: >-
          default-src 'none';
          script-src 'none';
          img-src 'none';
          base-uri 'none';
          object-src 'none';
          font-src 'none';
          connect-src 'none';
          frame-src 'none';
          child-src 'none';
          form-action 'none';
          worker-src 'none';
          media-src 'none';
          frame-ancestors 'none';
          block-all-mixed-content;
```

## Build the project with configured custom headers

After adding your custom response headers to the configuration file, save the changes. Then, push the changes to your project's version control service.

Depending on your Workflows project settings, this either triggers a new build immediately, or triggers it after you merge the change to your production branch.
