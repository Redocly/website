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

- store user session data between requests
- cache expensive API calls or computations
- track page views, votes, or usage metrics
- store settings and preferences per user
- track request counts per IP or user

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

```bash
curl -X POST https://your-project.redocly.app/api/notes \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-webview-cookie>"
```

### Step 3: Store and retrieve data

Here's a complete example that creates and retrieves notes:

```ts {% title="@api/notes.post.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const body = await request.json() as { title: string; content: string };

  if (!body.title) {
    return context.status(400).json({ error: 'Title is required' });
  }

  const id = crypto.randomUUID();
  const note: Note = {
    id,
    title: body.title,
    content: body.content || '',
    createdAt: new Date().toISOString()
  };

  await kv.set(['notes', id], note);

  return context.status(201).json({ note });
}
```

**Test with curl:**

```bash
curl -X POST https://your-project.redocly.app/api/notes \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-webview-cookie>" \
  -d '{"title": "Meeting notes", "content": "Discuss Q1 roadmap"}'
```

```ts {% title="@api/notes/[id].get.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const { id } = context.params;

  const note = await kv.get(['notes', id]);

  if (!note) {
    return context.status(404).json({ error: 'Note not found' });
  }

  return context.json({ note: note.value });
}
```

**Test with curl:**

```bash
curl https://your-project.redocly.app/api/notes/abc-123 \
  -H "Cookie: <your-webview-cookie>"
```

## Key structure

Keys are arrays of JavaScript primitive values (`string`, `number`, or `boolean`).
This hierarchical structure enables efficient querying by prefix.

```ts
// Single-level key
['settings']

// Multi-level keys for hierarchical data
['notes', 'meeting-notes-001']        // Note by ID
['users', 'john', 'preferences']      // User preferences
['cache', 'api', 'weather', 'london'] // Cached API response
```

### Lexicographical ordering

Keys are sorted lexicographically (like words in a dictionary) component by component.
This ordering determines how `list()` returns results:

```ts
// These keys are sorted as:
['notes', 'a']       // First (a comes before b)
['notes', 'apple']   // Second (ap... comes before b)
['notes', 'b']       // Third
['notes', 'banana']  // Fourth

// Numbers are compared as strings, not numerically:
['items', '1']       // First
['items', '10']      // Second (1 < 2 in string comparison)
['items', '2']       // Third
['items', '9']       // Fourth
```

{% admonition type="warning" %}
When using numeric IDs, pad them with leading zeros for correct ordering: `['items', '001']`, `['items', '002']`, `['items', '010']`.
{% /admonition %}

## KV methods

### kv.set

Creates or updates an entry.
Returns the key on success, or `null` on failure.

```ts
kv.set<T>(key: KvKey, value: T, options?: KvSetOptions): Promise<KvKey | null>
```

See [KvSetOptions](#kvsetoptions) for available options.

```ts {% title="@api/notes.post.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

type Note = {
  title: string;
  content: string;
  createdAt: string;
};

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const body = await request.json() as { title: string; content: string };

  const id = crypto.randomUUID();
  const note: Note = {
    title: body.title,
    content: body.content,
    createdAt: new Date().toISOString()
  };

  // Store permanently
  const key = await kv.set(['notes', id], note);

  if (!key) {
    return context.status(500).json({ error: 'Failed to save note' });
  }

  return context.status(201).json({ id, note });
}
```

**Test with curl:**

```bash
curl -X POST https://your-project.redocly.app/api/notes \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-webview-cookie>" \
  -d '{"title": "My note", "content": "Note content here"}'
```

#### Use TTL (time-to-live)

Set an expiration time for cache entries or temporary data:

```ts {% title="@api/cache/weather.get.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const { city } = context.query;

  if (!city) {
    return context.status(400).json({ error: 'City parameter required' });
  }

  // Check cache first
  const cached = await kv.get(['cache', 'weather', city]);
  if (cached?.value) {
    return context.json({ source: 'cache', data: cached.value });
  }

  // Fetch fresh data
  const response = await fetch(`https://api.weather.example/v1/${city}`);
  const weatherData = await response.json();

  // Cache for 30 minutes (1800 seconds)
  await kv.set(['cache', 'weather', city], weatherData, {
    ttlInSeconds: 1800
  });

  return context.json({ source: 'api', data: weatherData });
}
```

**Test with curl:**

```bash
curl "https://your-project.redocly.app/api/cache/weather?city=london" \
  -H "Cookie: <your-webview-cookie>"
```

### kv.get

Retrieves a single entry by key.
Returns `null` if the key does not exist.

```ts
kv.get<T>(key: KvKey): Promise<KvReadSchema<T> | null>
```

The returned object contains:
- `key`: the array key used to store the value
- `value`:the stored JavaScript object, or `null` if not found

```ts {% title="@api/notes/[id].get.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

type Note = {
  title: string;
  content: string;
  createdAt: string;
};

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const { id } = context.params;

  const note = await kv.get<Note>(['notes', id]);

  if (!note) {
    return context.status(404).json({ error: 'Note not found' });
  }

  return context.json({
    key: note.key,     // ['notes', 'abc-123']
    value: note.value  // { title: '...', content: '...', createdAt: '...' }
  });
}
```

**Test with curl:**

```bash
curl https://your-project.redocly.app/api/notes/abc-123 \
  -H "Cookie: <your-webview-cookie>"
```

### kv.list

Lists entries matching a selector with optional pagination.
Returns items sorted lexicographically by key.

```ts
kv.list<T>(selector: KvListSelector, options?: KvListOptions): Promise<KvListResponse<T>>
```

See [KvListSelector](#kvlistselector), [KvListOptions](#kvlistoptions), and [KvListResponse](#kvlistresponse) for type details.

#### Basic usage: List by prefix

The most common use case is listing all entries that share a prefix:

```ts {% title="@api/notes.get.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();

  // Get all notes
  const result = await kv.list({ prefix: ['notes'] });

  return context.json({
    notes: result.items.map(item => ({
      id: item.key[1],  // Extract ID from key
      ...item.value
    })),
    total: result.total
  });
}
```

**Test with curl:**

```bash
curl https://your-project.redocly.app/api/notes \
  -H "Cookie: <your-webview-cookie>"
```

#### Pagination

Use `limit` and `cursor` for paginated results:

```ts {% title="@api/notes.get.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const { limit = '10', cursor } = context.query;

  const result = await kv.list(
    { prefix: ['notes'] },
    {
      limit: Math.min(parseInt(limit, 10), 100), // Max 100 per page
      cursor: cursor | undefined
    }
  );

  return context.json({
    notes: result.items.map(item => item.value),
    total: result.total,
    nextCursor: result.cursor,
    hasMore: result.cursor !== null
  });
}
```

**Test with curl:**

```bash
# First page
curl "https://your-project.redocly.app/api/notes?limit=10" \
  -H "Cookie: <your-webview-cookie>"

# Next page (use cursor from previous response)
curl "https://your-project.redocly.app/api/notes?limit=10&cursor=eyJrIjoiWydu..." \
  -H "Cookie: <your-webview-cookie>"
```

#### Reverse order

Get entries in reverse lexicographical order (newest first, if using sortable IDs):

```ts {% title="@api/notes.get.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();

  // Get notes in reverse order
  const result = await kv.list(
    { prefix: ['notes'] },
    { limit: 10, reverse: true }
  );

  return context.json({ notes: result.items });
}
```

**Test with curl:**

```bash
curl "https://your-project.redocly.app/api/notes?order=desc" \
  -H "Cookie: <your-webview-cookie>"
```

#### Range queries with start and end

Use `start` and `end` to query a specific range of keys.

{% admonition type="warning" %}
The `start` key is **inclusive** (included in results) and the `end` key is **exclusive** (not included in results).
{% /admonition %}

**Example 1: Query notes starting from a specific ID**

```ts
// Data in storage:
// ['notes', 'note-001'] -> { title: 'First' }
// ['notes', 'note-002'] -> { title: 'Second' }
// ['notes', 'note-003'] -> { title: 'Third' }
// ['notes', 'note-004'] -> { title: 'Fourth' }

// Get notes starting from 'note-002' (inclusive)
const result = await kv.list({
  prefix: ['notes'],
  start: ['notes', 'note-002']
});
// Returns: note-002, note-003, note-004
```

**Example 2: Query notes up to a specific ID**

```ts
// Get notes up to (but not including) 'note-003'
const result = await kv.list({
  prefix: ['notes'],
  end: ['notes', 'note-003']
});
// Returns: note-001, note-002
```

**Example 3: Query a specific range**

```ts
// Get notes between 'note-002' (inclusive) and 'note-004' (exclusive)
const result = await kv.list({
  prefix: ['notes'],
  start: ['notes', 'note-002'],
  end: ['notes', 'note-004']
});
// Returns: note-002, note-003
```

**Example 4: Range query without prefix**

```ts
// Query across different prefixes
const result = await kv.list({
  start: ['notes', 'a'],
  end: ['notes', 'n']
});
// Returns all notes with IDs starting with letters a through m
```

#### Hierarchical data queries

Query data at different levels of your key hierarchy:

```ts {% title="@api/organizations/[orgId]/members.get.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const { orgId } = context.params;
  const { department } = context.query;

  // Data structure:
  // ['orgs', 'acme', 'engineering', 'alice'] -> { role: 'Engineer' }
  // ['orgs', 'acme', 'engineering', 'bob'] -> { role: 'Senior Engineer' }
  // ['orgs', 'acme', 'sales', 'charlie'] -> { role: 'Sales Rep' }

  let prefix: (string | number | boolean)[];

  if (department) {
    // Query specific department
    prefix = ['orgs', orgId, department];
  } else {
    // Query all departments in org
    prefix = ['orgs', orgId];
  }

  const result = await kv.list({ prefix });

  return context.json({
    members: result.items.map(item => ({
      name: item.key[item.key.length - 1], // Last key component is the name
      department: item.key[2],
      ...item.value
    })),
    total: result.total
  });
}
```

**Test with curl:**

```bash
# All members in organization
curl https://your-project.redocly.app/api/organizations/acme/members \
  -H "Cookie: <your-webview-cookie>"

# Only engineering department
curl "https://your-project.redocly.app/api/organizations/acme/members?department=engineering" \
  -H "Cookie: <your-webview-cookie>"
```

#### Filter by date range

Use sortable date strings in keys for date-based queries:

```ts {% title="@api/logs.get.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const { from, to } = context.query;

  // Keys use ISO date format for proper sorting:
  // ['logs', '2024-01-15T10:30:00Z', 'abc123']
  // ['logs', '2024-01-15T14:45:00Z', 'def456']

  const selector: { prefix: string[]; start?: string[]; end?: string[] } = {
    prefix: ['logs']
  };

  if (from) {
    selector.start = ['logs', from];
  }
  if (to) {
    selector.end = ['logs', to];
  }

  const result = await kv.list(selector);

  return context.json({
    logs: result.items.map(item => ({
      timestamp: item.key[1],
      id: item.key[2],
      ...item.value
    }))
  });
}
```

**Test with curl:**

```bash
# Get logs from January 15, 2024
curl "https://your-project.redocly.app/api/logs?from=2024-01-15T00:00:00Z&to=2024-01-16T00:00:00Z" \
  -H "Cookie: <your-webview-cookie>"
```

### kv.getMany

Retrieves multiple entries by keys in a single operation.
Returns an array of results in the same order as the input keys.
Missing entries are returned as `null`.

```ts
kv.getMany<T>(keys: KvKey[]): Promise<(KvReadSchema<T> | null)[]>
```

```ts {% title="@api/notes/batch.post.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

type Note = {
  title: string;
  content: string;
};

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const { ids } = await request.json() as { ids: string[] };

  if (!ids || !Array.isArray(ids)) {
    return context.status(400).json({ error: 'ids array is required' });
  }

  const keys = ids.map(id => ['notes', id] as (string | number | boolean)[]);
  const notes = await kv.getMany<Note>(keys);

  const result = ids.map((id, index) => ({
    id,
    found: notes[index] !== null,
    note: notes[index]?.value || null
  }));

  return context.json({ notes: result });
}
```

**Test with curl:**

```bash
curl -X POST https://your-project.redocly.app/api/notes/batch \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-webview-cookie>" \
  -d '{"ids": ["note-001", "note-002", "note-999"]}'
```

**Response:**

```json
{
  "notes": [
    { "id": "note-001", "found": true, "note": { "title": "First note", "content": "..." } },
    { "id": "note-002", "found": true, "note": { "title": "Second note", "content": "..." } },
    { "id": "note-999", "found": false, "note": null }
  ]
}
```

### kv.delete

Deletes an entry by key.
This method always returns `void`, regardless of whether the entry existed.

```ts
kv.delete(key: KvKey): Promise<void>
```

```ts {% title="@api/notes/[id].delete.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const { id } = context.params;

  if (!id) {
    return context.status(400).json({ error: 'Note ID required' });
  }

  // Check if note exists before deleting (optional)
  const note = await kv.get(['notes', id]);

  if (!note) {
    return context.status(404).json({ error: 'Note not found' });
  }

  await kv.delete(['notes', id]);

  return context.json({ message: `Note '${id}' deleted` });
}
```

**Test with curl:**

```bash
curl -X DELETE https://your-project.redocly.app/api/notes/abc-123 \
  -H "Cookie: <your-webview-cookie>"
```

### kv.transaction

Executes multiple operations atomically.
All operations within the transaction succeed together or fail together (rollback).

```ts
kv.transaction<T>(operation: (tx: KvTransaction) => Promise<T>): Promise<T>
```

The transaction object provides `get`, `getMany`, `set`, and `delete` methods with the same signatures as the main storage object.

```ts {% title="@api/transfer.post.ts" %}
import type { ApiFunctionsContext, KvTransaction } from '@redocly/config';

type Account = {
  balance: number;
  name: string;
};

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const { from, to, amount } = await request.json() as {
    from: string;
    to: string;
    amount: number;
  };

  if (!from || !to || typeof amount !== 'number' || amount <= 0) {
    return context.status(400).json({ error: 'Invalid transfer parameters' });
  }

  try {
    const result = await kv.transaction(async (tx: KvTransaction) => {
      // Read both accounts
      const fromAccount = await tx.get<Account>(['accounts', from]);
      const toAccount = await tx.get<Account>(['accounts', to]);

      if (!fromAccount?.value || !toAccount?.value) {
        throw new Error('One or both accounts not found');
      }

      if (fromAccount.value.balance < amount) {
        throw new Error('Insufficient balance');
      }

      // Update both accounts atomically
      await tx.set(['accounts', from], {
        ...fromAccount.value,
        balance: fromAccount.value.balance - amount
      });
      await tx.set(['accounts', to], {
        ...toAccount.value,
        balance: toAccount.value.balance + amount
      });

      return {
        success: true,
        from: { name: fromAccount.value.name, newBalance: fromAccount.value.balance - amount },
        to: { name: toAccount.value.name, newBalance: toAccount.value.balance + amount },
        amount
      };
    });

    return context.json(result);
  } catch (error) {
    return context.status(400).json({
      error: error instanceof Error ? error.message : 'Transaction failed'
    });
  }
}
```

**Test with curl:**

```bash
curl -X POST https://your-project.redocly.app/api/transfer \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-webview-cookie>" \
  -d '{"from": "alice", "to": "bob", "amount": 50}'
```

## Data modeling patterns

### Secondary indexes

Store the same data under multiple keys for different query patterns:

```ts {% title="@api/users.post.ts" %}
import type { ApiFunctionsContext, KvTransaction } from '@redocly/config';

type User = {
  id: string;
  email: string;
  name: string;
};

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const body = await request.json() as { email: string; name: string };

  const id = crypto.randomUUID();
  const user: User = { id, email: body.email, name: body.name };

  // Use transaction to ensure both keys are created atomically
  await kv.transaction(async (tx: KvTransaction) => {
    // Primary key: by ID
    await tx.set(['users', id], user);
    // Secondary index: by email (stores reference to primary key)
    await tx.set(['usersByEmail', body.email], { id });
  });

  return context.status(201).json({ user });
}
```

**Test with curl:**

```bash
curl -X POST https://your-project.redocly.app/api/users \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-webview-cookie>" \
  -d '{"email": "john@example.com", "name": "John Doe"}'
```

```ts {% title="@api/users/by-email/[email].get.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

type User = {
  id: string;
  email: string;
  name: string;
};

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const { email } = context.params;

  // Look up the user ID using the email index
  const ref = await kv.get<{ id: string }>(['usersByEmail', email]);

  if (!ref?.value) {
    return context.status(404).json({ error: 'User not found' });
  }

  // Fetch the actual user data using the ID
  const user = await kv.get<User>(['users', ref.value.id]);

  return context.json({ user: user?.value });
}
```

**Test with curl:**

```bash
curl https://your-project.redocly.app/api/users/by-email/john@example.com \
  -H "Cookie: <your-webview-cookie>"
```

### Counters

Track counts or metrics:

```ts {% title="@api/articles/[id]/views.post.ts" %}
import type { ApiFunctionsContext, KvTransaction } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const { id } = context.params;

  const newCount = await kv.transaction(async (tx: KvTransaction) => {
    const current = await tx.get<{ count: number }>(['views', id]);
    const count = (current?.value?.count || 0) + 1;

    await tx.set(['views', id], { count });

    return count;
  });

  return context.json({ views: newCount });
}
```

**Test with curl:**

```bash
curl -X POST https://your-project.redocly.app/api/articles/my-article/views \
  -H "Cookie: <your-webview-cookie>"
```

## Types

This section documents the TypeScript types used in KV storage methods.

### KvKey

{% table %}

- Type
- Definition
- Description

---

- KvKeyPart
- string | number | boolean
- A single component of a key.
  Must be a JavaScript primitive value.

---

- KvKey
- KvKeyPart[]
- An array of key parts forming a complete key.
  Example: `['users', 'john']` or `['items', 42, true]`

{% /table %}

### KvValue

{% table %}

- Type
- Definition
- Description

---

- KvValue
- Record<string, unknown> | unknown[] | unknown
- Any JSON-serializable value.
  Can be an object, array, or primitive.

{% /table %}

### KvSetOptions

{% table %}

- Option
- Type
- Description

---

- ttlInSeconds
- number
- Time-to-live in seconds.
  The entry automatically expires after this duration.
  If not specified, the entry persists indefinitely.

{% /table %}

### KvReadSchema

The object returned by `get`, `getMany`, and in `list` results.

{% table %}

- Property
- Type
- Description

---

- key
- KvKey
- The array key used to store the value.

---

- value
- T | null
- The stored value, or `null` if not found.

{% /table %}

### KvListSelector

Defines which entries to return from `list()`.
Use one of the following selector patterns:

{% table %}

- Selector
- Description

---

- `{ prefix: KvKey }`
- Returns all entries whose keys start with the specified prefix.

---

- `{ prefix: KvKey, start: KvKey }`
- Returns entries with the prefix, starting from the start key.
  The **start key is inclusive** (included in results).

---

- `{ prefix: KvKey, end: KvKey }`
- Returns entries with the prefix, up to the end key.
  The **end key is exclusive** (not included in results).

---

- `{ start: KvKey, end: KvKey }`
- Returns entries in the range from start to end.
  The **start is inclusive, end is exclusive**.

{% /table %}

{% admonition type="info" name="Range boundaries" %}
In all selectors, `start` is always **inclusive** (included in results) and `end` is always **exclusive** (not included in results).
{% /admonition %}

### KvListOptions

{% table %}

- Option
- Type
- Description

---

- limit
- number
- Maximum number of entries to return. Use for pagination.
  Default: `100`

---

- reverse
- boolean
- Reverse the order of results.
  Default: `false`

---

- cursor
- string
- Cursor from a previous `list()` call to continue pagination.

{% /table %}

### KvListResponse

The object returned by `list()`.

{% table %}

- Property
- Type
- Description

---

- items
- `KvReadSchema<T>[]`
- Array of key-value entries.

---

- total
- number
- Total count of entries matching the selector (excluding cursor offset).

---

- cursor
- string | null
- Cursor for the next page.
  `null` if no more results.

{% /table %}

### KvTransaction

The transaction object passed to the callback in `kv.transaction()`.

{% table %}

- Method
- Signature
- Description

---

- get
- `<T>(key: KvKey) => Promise<KvReadSchema<T> | null>`
- Retrieves a single entry by key.

---

- getMany
- `<T>(keys: KvKey[]) => Promise<(KvReadSchema<T> | null)[]>`
- Retrieves multiple entries by keys.

---

- set
- `<T>(key: KvKey, value: T, options?: KvSetOptions) => Promise<KvKey | null>`
- Creates or updates an entry.

---

- delete
- `(key: KvKey) => Promise<void>`
- Deletes an entry by key.

{% /table %}

## Limitations and errors

### Size limits

{% table %}

- Limitation
- Maximum value
- Description

---

- Value size
- 1 MB
- Maximum size of a single value after JSON serialization.

---

- Key components
- string | number | boolean
- Keys must be arrays containing only primitive types.

---

- Value types
- JSON-serializable
- Values must be JSON serializable.
  Functions, circular references, and special objects are not supported.

{% /table %}

### Error handling

**Value size exceeded:**

When you try to store a value larger than 1 MB, the operation throws an error:

```text
Error: Value size (1234.56 KB) exceeds the maximum allowed size of 1 MB (1024 KB)
```

Handle this error in your API function:

```ts {% title="@api/data.post.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const body = await request.json();

  try {
    await kv.set(['data', 'large-item'], body);
    return context.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message.includes('exceeds the maximum allowed size')) {
      return context.status(413).json({
        error: 'Data too large',
        message: 'The data exceeds the 1 MB storage limit. Consider splitting it into smaller chunks.'
      });
    }
    throw error;
  }
}
```

**Test with curl:**

```bash
# This will fail if the JSON body exceeds 1 MB
curl -X POST https://your-project.redocly.app/api/data \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-webview-cookie>" \
  -d '{"key": "value"}'
```

**Invalid JSON:**

When a value cannot be serialized to JSON:

```text
Error: Value is not JSON serializable: <error message>
```

## Resources

- **[API functions reference](./api-functions-reference.md)** - Complete API functions helper methods and properties reference
- **[Create API functions](./create-api-functions.md)** - Step-by-step guide to building API functions
