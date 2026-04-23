---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

{% code-walkthrough
  filesets=[
    {
      "files": [
        "./code-walkthrough-files/weather-markdoc/weather.ts",
        "./code-walkthrough-files/weather-markdoc/CurrentWeather.tsx",
        "./code-walkthrough-files/weather-markdoc/schema.ts",
        "./code-walkthrough-files/weather-markdoc/components.tsx"
      ],
      "downloadAssociatedFiles": [
        "./code-walkthrough-files/weather-markdoc/*"
      ]
    }
  ]
%}
# Render weather data from API function in a Markdoc tag

Build a custom Markdoc tag that renders live weather data by calling an API function.

This tutorial explains how to create:

- an API function endpoint at `/api/weather`
- a React component that fetches from that endpoint
- a Markdoc tag that authors can use in Markdown files

## Key concepts

**API functions** are server-side endpoints defined by adding TypeScript or JavaScript files inside the `@api` folder.
The filename determines the URL path and, optionally, the HTTP method: `<name>.<method>.ts` (for example, `weather.get.ts` maps to `GET /api/weather`).
Omit the method segment to handle all HTTP methods with a single file.
See [File-system and method routing](./api-functions-reference.md#file-system-and-method-routing) for the full naming reference.

**Markdoc tags** are custom components registered in the `@theme/markdoc` folder.
You create a React component in `@theme/markdoc/components/`, export it from `@theme/markdoc/components.tsx`, and register its tag schema in `@theme/markdoc/schema.ts`.
See [Build a Markdoc tag](../build-markdoc-tags.md) for full details.

In the following solution:

- The **API key stays server-side** in the API function (`process.env.WEATHER_API_KEY`).
- The Markdoc component renders live data by calling your own endpoint.
- You can apply role-based access control to the API function.
  See [API functions reference](./api-functions-reference.md).

## Before you begin

{% step id="prereqs" heading="Prerequisites" %}
Make sure you have the following:

- familiarity with [building Markdoc tags](../build-markdoc-tags.md)
- understanding of [API function basics](./api-functions-reference.md)
- a free API key from <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer">weatherapi.com</a> exposed as `WEATHER_API_KEY` in your environment variables
{% /step %}

## Create the Weather API function

Create the file `@api/weather.ts`.
This file defines an endpoint at `/api/weather` that accepts an optional query parameter `location`.
When `location` is omitted, the function falls back to the client's IP address for geolocation.

{% step id="api-imports" heading="Import types" %}
Import the `ApiFunctionsContext` type from `@redocly/config`.
This type provides TypeScript definitions for the context object passed to every API function.
{% /step %}

{% step id="api-types" heading="Define response types (optional)" %}
Define types for the external weather API responses.
Typed responses improve editor support and catch integration errors early.
{% /step %}

{% step id="api-function" heading="Export the handler" %}
Export a default async function that receives a standard Web API <a href="https://developer.mozilla.org/en-US/docs/Web/API/Request" target="_blank" rel="noopener noreferrer">Request</a> and the Redocly <a href="./api-functions-reference#context" target="_blank" rel="noopener noreferrer">context</a>.
{% /step %}

{% step id="api-env" heading="Read the API key" %}
Access the API key from environment variables using `process.env`.
Return a `500` error early if the key is missing so the caller gets a clear message instead of a cryptic upstream failure.
{% /step %}

{% step id="api-params" heading="Resolve the location" %}
Use the `location` query parameter if the caller provides one.
Otherwise, fall back to the client IP address from `x-forwarded-for` (or `auto:ip` as a last resort) so the weather API geolocates the visitor automatically.
{% /step %}

{% step id="api-fetch" heading="Fetch weather data" %}
Construct the URL for the external weather API and map your variables to the parameters required by the provider (e.g., mapping your `location` variable to their `q` parameter, and setting `aqi` to `no` to exclude Air Quality Index data).
Call the external weather API with `fetch`, and handle non-OK responses by returning the upstream error details.
{% /step %}

{% step id="api-response" heading="Return the response" %}
Return the relevant subset of the weather data as JSON.
The Markdoc component will consume this shape.
{% /step %}

## Create the Markdoc component

Create the file `@theme/markdoc/components/CurrentWeather.tsx`.
This React component fetches from your API function and renders the result.

{% step id="component-import" heading="Import React" %}
Import React so you can use hooks and JSX.
{% /step %}

{% step id="component-types" heading="Define component types" %}
Define the expected API response shape and component props.
The optional `location` prop lets authors specify a city; `units` chooses Celsius or Fahrenheit.
{% /step %}

{% step id="component-function" heading="Create the component" %}
Declare the `CurrentWeather` function component with a state machine that tracks loading, error, and success states.
{% /step %}

{% step id="component-fetch" heading="Fetch from the API function" %}
Use `useEffect` to call `/api/weather` when the component mounts.
If `location` is provided, pass it as a query parameter; otherwise omit it and let the API function resolve the location from the client IP.
An `AbortController` cancels the request if the component unmounts before the response arrives.
{% /step %}

{% step id="component-render" heading="Render weather data" %}
Render loading and error states first, then display the location, temperature, humidity, and wind speed.
{% /step %}

## Register the Markdoc tag

{% step id="tag-schema" heading="Add the tag schema" %}
Update `@theme/markdoc/schema.ts` to register a `weather` tag.
The `render` value must match the exported component name (`CurrentWeather`), and `selfClosing` means the tag has no children.
Both `location` and `units` are optional -- when `location` is omitted the API function geolocates the visitor by IP address.
{% /step %}

{% step id="tag-export" heading="Export the component" %}
Export `CurrentWeather` from `@theme/markdoc/components.tsx` so the Markdoc runtime can resolve the `render` value.
{% /step %}

## Use the tag in Markdown

Authors can embed the `weather` tag in any `.md` file.

Geolocate the visitor by IP address:

```markdoc {% process=false %}
{% weather /%}
```

Or specify a city explicitly:

```markdoc {% process=false %}
{% weather location="London" units="celsius" /%}
```

## Resources

- **[Build a Markdoc tag](../build-markdoc-tags.md)** - Create custom Markdoc tags with React components
- **[API functions reference](./api-functions-reference.md)** - Function signature, routing, context helpers, and access control

{% /code-walkthrough %}
