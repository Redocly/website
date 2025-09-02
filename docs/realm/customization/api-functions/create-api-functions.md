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
      "when": { "example": "Weather API", "weather-auth": false }
    },
    {
      "files": [
        "./code-walkthrough-files/auth/login.post.ts"
      ],
      "when": { "example": "Authentication" }
    }
  ]
  filters={
    "example": {
      "label": "Example Type",
      "items": [
        { "value": "Weather API" },
        { "value": "Authentication" }
      ]
    }
  }
%}

# Create API functions

Here are two examples of API functions:
- weather service
- authentication system

To select an example, click either the **Weather API** or **Authentication** filter at the top of the page.

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

{% step id="auth-imports" heading="Import required types" when={ "example": "Authentication" } %}
Import the necessary types for authentication.
{% /step %}

{% step id="auth-function" heading="Define the main function" when={ "example": "Authentication" } %}
Define the main API function that handles the request.
The function takes two parameters:
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/Request" target="_blank" rel="noopener noreferrer">request</a>
- <a href="./api-functions-reference#context" target="_blank" rel="noopener noreferrer">context</a>
{% /step %}

{% step id="auth-credentials" heading="Validate credentials" when={ "example": "Authentication" } %}
Extract and validate the username and password from the request body.
{% /step %}

{% step id="auth-session" heading="Create session token" when={ "example": "Authentication" } %}
Generate a session token for authenticated users.
In a production application, you would use a proper JWT library.
{% /step %}

{% step id="auth-cookie" heading="Set cookie" when={ "example": "Authentication" } %}
Set a secure cookie with the session token to maintain the user's authenticated state.
{% /step %}

{% step id="auth-response" heading="Return success response" when={ "example": "Authentication" } %}
Return a success response with user information.
{% /step %}

{% step id="auth-error-handling" heading="Handle errors" when={ "example": "Authentication" } %}
Implement error handling to manage authentication failures and provide error responses.
{% /step %}

## Reference documentation

To learn more about API functions, see the [API functions reference](./api-functions-reference.md) for available helper methods and properties.

{% /code-walkthrough %}
