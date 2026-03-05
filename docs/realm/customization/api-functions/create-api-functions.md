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
        "./code-walkthrough-files/weather/current-weather.ts"
      ],
      "when": { "example": "Weather API", "weather-auth": true }
    },
    {
      "files": [
        "./code-walkthrough-files/weather/current-weather-without-auth.ts"
      ],
      "when": { "example": "Weather API" }
    }
  ]
  filters={
    "example": {
      "label": "Example Type",
      "items": [
        { "value": "Weather API" }
      ]
    }
  }
%}

# Create API functions

{% step id="weather-heading" heading="Before you begin" when={ "example": "Weather API" } %}
To use this example, generate a free API key from <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer">weatherapi.com</a>.
{% /step %}

{% step id="weather-imports" heading="Import required types" when={ "example": "Weather API" } %}
Import the necessary types from the Redocly configuration.
These types provide TypeScript definitions for the request and context objects.
{% /step %}

{% step id="weather-function" heading="Define the main function" when={ "example": "Weather API" } %}
Define the main API function that handles the request.
The function takes two parameters:
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/Request" target="_blank" rel="noopener noreferrer">request</a>
- <a href="./api-functions-reference#context" target="_blank" rel="noopener noreferrer">context</a>
{% /step %}

{% toggle id="weather-auth" label="Add custom authentication (optional)" when={ "example": "Weather API" } %}

  {% step id="weather-auth-check" heading="Define authentication validator" when={ "weather-auth": true } %}
  Add authentication validation to ensure only authenticated users can access the weather data.
  This helper function verifies the session token from cookies.
  {% /step %}

  {% step id="weather-auth-implementation" heading="Implement authentication check" when={ "weather-auth": true } %}
  Add a check to verify the user's authentication status before processing the request.
  This code prevents unauthorized access to your API.
  {% /step %}
{% /toggle %}

{% step id="weather-params" heading="Handle query parameters" when={ "example": "Weather API" } %}
Extract query parameters with `context.query` and validate them.
The weather API requires a location parameter (`q`).
{% /step %}

{% step id="weather-env-vars" heading="Access environment variables" when={ "example": "Weather API" } %}
Access the API key from environment variables using `process.env`.
Environment variables are a secure way to store sensitive information like API keys.
{% /step %}

{% step id="weather-api-call" heading="Make the API request" when={ "example": "Weather API" } %}
Make a call to the external weather API using `fetch` API, and validate the response.
{% /step %}

{% step id="weather-response" heading="Return formatted response" when={ "example": "Weather API" } %}
Format and return the weather data in a structured JSON response.
{% /step %}

{% step id="weather-error-handling" heading="Handle errors" when={ "example": "Weather API" } %}
Implement error handling for API requests to manage failures and provide useful error messages to clients.
{% /step %}

## Reference documentation

To learn more about API functions, see:

- [API functions reference](./api-functions-reference.md) for available helper methods and properties
- [Render weather data in a Markdoc tag (using API functions)](../markdoc-tags-with-api-functions-weather.md) for an end-to-end example that consumes an API function from a Markdoc component

{% /code-walkthrough %}
