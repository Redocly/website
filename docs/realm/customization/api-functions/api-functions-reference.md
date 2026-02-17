---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# API functions reference

Use API functions to add dynamic data fetching and server-side logic to your project.
Integrate with external systems, manipulate data, and enhance your Redocly projects with dynamic content.

## Function signature

The function accepts the following parameters:
- `request`: a standard Web Handler [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
- `context`: a custom Redocly [Context](#context) object

```ts
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (
  request: Request, 
  context: ApiFunctionsContext
) {
  // ...
}
```

## File-system and method routing

To define an API endpoint, use file-system routing.
API endpoints are created by adding files inside the designated `@api` folder.

### Change API functions location

By default, API functions are located in the `@api` folder.

To customize the location, add an `apiFunctions` section to your `redocly.yaml` file at the root of your project.
[Learn more about configuring `apiFunctions`](../../config/api-functions.md).

For example:

```yaml {% title="redocly.yaml" %}
apiFunctions:
  folders:
    - /my/api/folder/path/
    - /my/second/api/folder/path/
```

This configuration means that API functions are located in `/my/api/folder/path/`, `/my/second/api/folder/path/` and `/@api/`.
Endpoints from these folders are available at `/my/api/folder/path/...`, `/my/second/api/folder/path/...`, and `/api/...`, respectively.

### Define an API endpoint

To define an API endpoint for a specific HTTP method, create a file with the following naming convention: `<name>.<method>.ts`.

`method` can be a `GET`, `POST`, `PUT`, `PATCH` or `DELETE` HTTP method.

The `.<method>`part of the filename is optional.
If you don't specify the method, the API function is available for all HTTP methods.

In the following example, the file `@api/hello.ts` defines an API endpoint for any HTTP method.
To handle a `POST` request for the `/api/hello` endpoint, create a file `@api/hello.post.ts`.

```ts {% title="@api/hello.post.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const body = await request.json();

  if (body.name) {
    // perform operations with the name parameter, for example, send it to the external database or API
    // ...
    return context.status(200).json({ message: 'Name saved', name: body.name });
  } else {
    return context.status(400).json({ error: 'Missing name' });
  }
};
```

To define an API endpoint, you can use path parameters with the following naming convention: `/<some>/<path>/[id].<method>.ts`.

For example, if you want to define an API endpoint for a `GET` request for the `/api/communities/[id]` endpoint, you can create a file `@api/communities/[id].get.ts`:

```ts {% title="@api/communities/[id].get.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default function (request: Request, context: ApiFunctionsContext) {
  const { id } = context.params;
  // perform operations with an ID, for example, fetch the community from the external database or API
  // ...
  return context.status(200).json({ message: 'Community fetched', id });
};
```
You can define a "catch-all" API endpoint to match any path inside the folder by following this naming convention: `/<some>/<path>/[...name].<method>.ts`.

For example, the next file `@api/test/[...other].post.ts` handles a `POST` request for the `/api/test/anything/you/want` endpoint:

```ts {% title="@api/communities/[...other].post.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default function (request: Request, context: ApiFunctionsContext) {
  const { other } = context.params; // ['anything', 'you', 'want']
  // perform operations with other parameters, for example, fetch the community from the external database or API
  // ...
  return context.status(200).json({ message: 'Other params', other });
};
```

The response from the example above returns the following JSON:

```json
{
  "message": "Other params",
  "other": ["anything", "you", "want"]
}
```

## Authorization

API functions follow the same RBAC rules as other Redocly resources, based on user roles and teams.
To grant access to an API function, add its file path or endpoint to the `rbac` section of your `redocly.yaml` file:

```yaml {% title="redocly.yaml" %}
rbac:
  content: 
    '@api/hello.ts': # limit access for the file and corresponding endpoint  (by file path)
      TeamA: read # TeamA has an access to the /api/hello endpoint
    '/api/communities/1': # limit access only for the community with id 1 (by url)
      TeamB: read  # TeamB has an access to the /api/communities/1 endpoint
```

## Access environment variables

To access environment variables, use the `process.env.VAR_NAME` syntax.
This lets you securely work with API keys, secrets, and other values you don’t want exposed in client-facing code.

A common use case is authenticating with external systems.

The following example shows how to fetch a token from an external API using an API key stored in an environment variable:

```ts
import type { ApiFunctionsContext } from '@redocly/config';

// to define type for process.env, you can use the following code:
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY?: string;
    }
  }
  
  var process: {
    env: NodeJS.ProcessEnv;
  };
}

export default async function (request: Request, context: ApiFunctionsContext) {
  const apiKey = process.env.API_KEY; // [!code highlight]
  // get some token from the external API:
  try {
    const response = await fetch(
      `https://secret-service.com/authentication-tokens`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'SERVICE-API-KEY': apiKey
        }
      }
    );
    // Extract the token from the response
    const body = await response.json();
    return context.status(200).json({ message: 'Token fetched', token: body.token });
  } catch (error) {
    return context.status(500).json({ error: 'Internal server error' });
  }
}
```

## Debug code with `console`

To log messages to the console inside of an API function, use the `console.log | console.error | console.warn | console.info | console.debug | console.trace | console.dir | console.timeEnd | console.table` methods.

```ts
console.log(message: any);
```

```ts {% title="@api/simple.post.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  console.log({ user: { name: 'John', age: 30 } });
  console.log(['javascript', 'typescript', 'python']);

  console.log(request); // logs the Request object
  console.log(request.method); // logs the method of the Request object
  console.log(request.url); // logs the URL of the Request object
  console.log(request.headers); // logs the Headers object
  console.log(request.headers.get('content-type')); // logs the value of a Content-Type header

  const body = await request.json();
  console.log(body); // logs the Request body

  console.log(context.params); // logs parsed path parameters
  console.log(context.query); // logs parsed query parameters
  console.log(context.cookies); // logs parsed cookies
  console.log(context.user); // logs user details

  return context.status(200).text('API is working!');
}
```

a request `POST https://api.acme.com/api/users?type=internal` with the JSON body `{"name": "David"}` to the API function outputs the following:

```text {% title="Terminal" %}
{ user: { name: 'John', age: 30 } }
[ 'javascript', 'typescript', 'python' ]
Request {
  method: 'POST',
  url: 'https://api.acme.com/api/users',
  headers: Headers {
    accept: '*/*',
    'accept-encoding': 'gzip, deflate, br',
    connection: 'keep-alive',
    'content-length': '16',
    'content-type': 'application/json',
    host: 'api.acme.com'
  },
  destination: '',
  referrer: 'about:client',
  referrerPolicy: '',
  mode: 'cors',
  credentials: 'same-origin',
  cache: 'default',
  redirect: 'follow',
  integrity: '',
  keepalive: false,
  isReloadNavigation: false,
  isHistoryNavigation: false,
  signal: AbortSignal { aborted: false }
}
POST
https://api.acme.com/api/users
Headers {
  accept: '*/*',
  'accept-encoding': 'gzip, deflate, br',
  connection: 'keep-alive',
  'content-length': '16',
  'content-type': 'application/json',
  host: 'api.acme.com'
}
application/json
{ name: 'David' }
{}
{}
{}
{ teams: [ 'anonymous' ], claims: {}, isAuthenticated: false }
```

## `context`

The `context` object provides additional information and helper methods for API functions.
It includes user details, project configuration, and utilities for accessing request data and sending responses.

### Properties

{% table %}

- Property {% width="35%" %}
- Type
- Description

---

- `context.user.email`
- string
- The user's email address.

---

- `context.user.teams`
- [string]
- The list of teams the user belongs to.

  For example: `["teamA", "teamB"]`

---

- `context.user.claims`
- object
- Parsed claims from the identity provider (IdP).

  For example: `{ email: string; authCookie: string }`.

---

- `context.user.idpAccessToken`
- string
- The raw access token issued by the IdP.

---

- `context.user.idpIdToken`
- string
- The raw ID token issued by the IdP.

---

- `context.config`
- object
- Your project's configuration file (`redocly.yaml` by default).

---

- `context.params`
- object
- Path parameters from the request, or `{}` if none exist.

  For example, for path `/users/[userId]/projects/[projectId]` the params are: `{ userId: "123", projectId: "1" }`.

---

- `context.query`
- object
- Request query parameters, or `{}` if none exist.

  For example, for path `/users?active=true`, the query is: `{ active: "true" }`.

---

- `context.cookies`
- object
- Cookies sent with the request, or `{}` if none are present.

  For example, `{ authToken: "secretToken" }`.

{% /table %}

### Context methods

The context object includes the following methods for sending a standard Web Handler [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response):

#### context.deleteCookie

```ts
context.deleteCookie(name: string) => ApiFunctionsContext
```

Deletes a cookie by name.
Returns the `context` object for chaining.

#### context.json

```ts
context.json(body: object) => Response
```

Sends a response body serialized as [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON).

#### context.redirect

```ts
context.redirect(url: string, code?: number) => Response
```

Redirects to the specified URL.
Defaults to a 302 status code unless otherwise specified.

#### context.setCookie

```ts
context.setCookie(name: string, value: string, options?: CookieOptions) => ApiFunctionsContext
```

Sets a cookie on the response.
Returns the `context` object for chaining.
Available `options`:
- `domain` - string
- `expires` - date
- `httpOnly` - boolean
- `maxAge` - number
- `path` - string
- `secure` - boolean
- `signed` - boolean
- `sameSite` - `Strict` | `Lax` | `None`

#### context.status

```ts
context.status(code: number) => ApiFunctionsContext
```

Sets the HTTP status code for the response.
Returns the `context` object to allow chaining.

For example: `context.status(200).json({ tickets: 1 })`.

#### context.text

```ts
context.text(body: string) => Response
```

Sends a plain text response body.

## Limitations

API functions have the following limits:

{% table %}

- Limitation
- Maximum value
- Description

---

- Execution timeout
- 10 seconds
- API functions must complete within 10 seconds.
  Otherwise, the function terminates and returns a `504 Gateway Timeout` error.

---

- Memory usage
- 500MB
- API functions are limited to 500MB of memory.
  If exceeded, the function is terminated with a `502 Internal Server Error`.

---

- Request size
- 5MB
- The maximum size of the request body is 5MB.
  The maximum allowed request body size is 5MB.
  Larger requests are rejected with a `413 Payload Too Large` error.

---

- Response size
- 5MB
- The maximum allowed response body size is 5MB.
  Larger responses are rejected with a `500 Internal Server Error`.

{% /table %}

These limitations ensure consistent performance and protect the system from resource overuse.

## API functions examples

  {% admonition type="info" %}
    You can return either a native `Response` object or use `context` helper methods — both approaches work the same.
  {% /admonition %}

### Simple function without arguments

```ts {% title="@api/simple.ts" %}
export default function () {
  // When no arguments are used, you can still return a Response object
  // This example returns a 200 OK status with a text body
  return new Response('API is working!', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain'
    }
  });
}
```

### Function that uses request only

```ts {% title="@api/echo-body.ts" %}
export default async function (request: Request) {
  // Only process POST, PUT, PATCH requests with body content
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    try {
      // Extract JSON body from request
      const body = await request.json();
      
      // Return the body content as the response
      return new Response(JSON.stringify({
        success: true,
        message: 'Received your data',
        data: body
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      // Handle JSON parsing errors
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid JSON in request body'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
  
  // Return method not allowed for non-supported methods
  return new Response(JSON.stringify({
    success: false,
    message: 'Method not supported, use POST, PUT or PATCH'
  }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Allow': 'POST, PUT, PATCH'
    }
  });
}
```

### Function that uses context

```ts {% title="@api/hello.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  if (context.cookies) {
    // Do something with the cookies like checking if the user is logged in
    // ...

    // If the user is not logged in, redirect to the login page
    return context.redirect('/login');
  }
  
  // Access user information if available
  if (context.user) {
    const userEmail = context.user.email;
    const userTeams = context.user.teams;
    // Additional logic using identity information
    // ...
  }

  // Handle the request as needed
  return context.status(200).json({ message: 'Hello World' });
};
```

## Resources

- Review examples of API functions in the [Create API functions](./create-api-functions.md) how-to guide.
