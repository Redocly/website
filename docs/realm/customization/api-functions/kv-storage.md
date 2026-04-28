---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# KV storage

KV storage is a built-in database for API functions that lets you persist data between requests without setting up external databases.

KV storage works like a database where:
- keys identify your data
- values are the actual data you want to store (JSON objects, arrays, or primitives)

KV storage is schema-less and stores JSON data directly without defining structure upfront.

Use the KV store to:

- store non-sensitive session state between requests with short TTLs
- cache expensive API calls or computations
- track page views, votes, or usage metrics
- store settings and preferences per user
- track request counts per IP or user

{% admonition type="warning" name="Session security" %}
Do not store raw session tokens, passwords, or other secrets in KV storage.
Store only non-sensitive session state, set appropriate TTL values, and encrypt sensitive data before storing it.
{% /admonition %}

## Create an API function with KV storage

Use the information in this section to create an API function with KV storage access.

### Step 1: Create your first API function

Create a file in the `@api` folder.
The filename determines the endpoint URL and HTTP method.

**File naming convention:**
- `@api/notes.get.ts` → `GET /api/notes`
- `@api/notes.post.ts` → `POST /api/notes`
- `@api/notes/[id].get.ts` → `GET /api/notes/:id`
- `@api/notes/[id].delete.ts` → `DELETE /api/notes/:id`

**Folder structure example:**

```text
@api/
├── notes.get.ts          # GET /api/notes - List all notes
├── notes.post.ts         # POST /api/notes - Create a note
└── notes/
    ├── [id].get.ts       # GET /api/notes/:id - Get single note
    ├── [id].put.ts       # PUT /api/notes/:id - Update note
    └── [id].delete.ts    # DELETE /api/notes/:id - Delete note
```

### Step 2: Access KV storage

Use `context.getKv()` to get the KV storage instance:

```ts {% title="@api/notes.post.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();

  // Now you can use kv.get(), kv.set(), kv.list(), etc.
  await kv.set(['notes', '1'], { title: 'My first note', content: 'Hello world!' });

  return context.json({ success: true });
}
```

**Test with curl:**

{% admonition type="info" name="Testing your API function" %}
Use your production or preview project URL to test API functions.

If you're testing in a local environment, use localhost instead.
{% /admonition %}

```bash
curl -X POST https://your-project.redocly.app/api/notes \
  -H "Content-Type: application/json"
```

### Step 3: Store and retrieve data

Here's a complete example that creates and retrieves notes:

{% admonition type="info" name="Authentication in curl tests" %}
These examples use `context.user`, so unauthenticated requests return `401`.
When testing with curl, include the authentication method configured for your project (for example, a session cookie or bearer token).
{% /admonition %}

```ts {% title="@api/notes.post.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

type Note = {
  id: string;
  title: string;
  content: string;
  ownerId: string;
  createdAt: string;
};

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const body = await request.json() as { title: string; content: string };
  const ownerId = context.user?.email;

  if (!ownerId) {
    return context.status(401).json({ error: 'Authentication required' });
  }

  if (!body.title) {
    return context.status(400).json({ error: 'Title is required' });
  }

  const id = crypto.randomUUID();
  const note: Note = {
    id,
    title: body.title,
    content: body.content || '',
    ownerId,
    createdAt: new Date().toISOString()
  };

  await kv.set(['notes', ownerId, id], note);

  return context.status(201).json({ note });
}
```

**Test with curl:**

```bash
curl -X POST https://your-project.redocly.app/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "Meeting notes", "content": "Discuss Q1 roadmap"}'
```

```ts {% title="@api/notes/[id].get.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const { id } = context.params;
  const ownerId = context.user?.email;

  if (!ownerId) {
    return context.status(401).json({ error: 'Authentication required' });
  }

  const note = await kv.get(['notes', ownerId, id]);

  if (!note) {
    return context.status(404).json({ error: 'Note not found' });
  }

  return context.json({ note });
}
```

**Test with curl:**

```bash
curl https://your-project.redocly.app/api/notes/abc-123
```

## Resources

- **[KV storage reference](./kv-storage-reference.md)** - Complete KV storage structure, methods, and patterns reference
- **[API functions reference](./api-functions-reference.md)** - Complete API functions helper methods and properties reference
- **[Create API functions](./create-api-functions.md)** - Step-by-step guide to building API functions
