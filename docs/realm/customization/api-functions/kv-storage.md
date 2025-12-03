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

KV (key-value) storage is a built-in database for API functions.
Store, retrieve, and manage data without external database setup.
KV storage is ideal for caching, session management, and lightweight data persistence.

## Access KV storage

To access KV storage in an API function, use `context.getKv()`:

```ts {% title="@api/example.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  
  // Use storage methods
  await kv.set(['users', 'john'], { name: 'John', role: 'admin' });
  const user = await kv.get(['users', 'john']);
  
  return context.json({ user });
}
```

## Key structure

Keys are arrays of JavaScript primitive values (`string`, `number`, or `boolean`).
This hierarchical structure enables efficient querying by prefix.

```ts
// Single-level key
['settings']

// Multi-level key for hierarchical data
['users', 'john']                    // User by username
['orgs', 'globex', 'engineering']    // Organization department
['products', 'laptop-001']           // Product by ID
```

### Key ordering

Keys are ordered lexicographically by each component.
This ordering affects how `list()` returns results:

```ts
// These keys are ordered as:
['users', 'alice']   // First
['users', 'bob']     // Second
['users', 'charlie'] // Third
```

## KV methods

### kv.get

Retrieves a single entry by key.
Returns `null` if the key does not exist.

```ts
kv.get<T>(key: KvKey): Promise<KvReadSchema<T> | null>
```

The returned object contains:
- `key` - the array key used to store the value
- `value` - the stored JavaScript object, or `null` if not found

```ts {% title="@api/get-user.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  
  const user = await kv.get<{ name: string; role: string }>(['users', 'john']);
  
  if (!user) {
    return context.status(404).json({ error: 'User not found' });
  }
  
  return context.json({
    key: user.key,     // ['users', 'john']
    value: user.value  // { name: 'John', role: 'admin' }
  });
}
```

### kv.getMany

Retrieves multiple entries by keys in a single operation.
Returns an array of results in the same order as the input keys.
Missing entries are returned as `null`.

```ts
kv.getMany<T>(keys: KvKey[]): Promise<(KvReadSchema<T> | null)[]>
```

```ts {% title="@api/get-users.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  
  const usernames = ['alice', 'bob', 'charlie'];
  const keys = usernames.map(name => ['users', name]);
  
  const users = await kv.getMany(keys);
  
  const result = usernames.map((username, index) => ({
    username,
    found: users[index] !== null,
    data: users[index]?.value
  }));
  
  return context.json({ users: result });
}
```

### kv.set

Creates or updates an entry.
Returns the key identifier on success, or `null` on failure.

```ts
kv.set<T>(key: KvKey, value: T, options?: KvSetOptions): Promise<string | null>
```

{% table %}

- Option
- Type
- Description

---

- ttlInSeconds
- number
- Time-to-live in seconds. The entry automatically expires after this duration. If not specified, the entry persists indefinitely.

{% /table %}

```ts {% title="@api/create-product.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  
  // Store without expiration
  await kv.set(['products', 'laptop-001'], {
    name: 'Laptop Pro',
    price: 1299,
    stock: 15
  });
  
  // Store with TTL (expires in 1 hour)
  await kv.set(
    ['cache', 'api-response'],
    { data: 'cached value' },
    { ttlInSeconds: 3600 }
  );
  
  return context.json({ success: true });
}
```

### kv.delete

Deletes an entry by key.
Returns `true` if the entry existed and was deleted, `false` otherwise.

```ts
kv.delete(key: KvKey): Promise<boolean>
```

```ts {% title="@api/delete-user.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const url = new URL(request.url);
  const username = url.searchParams.get('username');
  
  if (!username) {
    return context.status(400).json({ error: 'Username required' });
  }
  
  const deleted = await kv.delete(['users', username]);
  
  if (!deleted) {
    return context.status(404).json({ error: 'User not found' });
  }
  
  return context.json({ message: `User '${username}' deleted` });
}
```

### kv.list

Lists entries matching a selector with optional pagination.
Returns items sorted lexicographically by key.

```ts
kv.list<T>(selector: KvListSelector, options?: KvListOptions): Promise<KvListResponse<T>>
```

#### Selector options

{% table %}

- Selector
- Description

---

- `{ prefix: KvKey }`
- Returns all entries whose keys start with the specified prefix.

---

- `{ prefix: KvKey, start: KvKey }`
- Returns entries with the prefix, starting from (and including) the start key.

---

- `{ prefix: KvKey, end: KvKey }`
- Returns entries with the prefix, up to (but excluding) the end key.

---

- `{ start: KvKey, end: KvKey }`
- Returns entries in the range from start (inclusive) to end (exclusive).

{% /table %}

#### List options

{% table %}

- Option
- Type
- Description

---

- limit
- number
- Maximum number of entries to return. Use for pagination. Default: `100`

---

- reverse
- boolean
- Reverse the order of results. Default: `false`

---

- cursor
- string
- Cursor from a previous `list()` call to continue pagination.

{% /table %}

#### Response object

{% table %}

- Property
- Type
- Description

---

- items
- [KvReadSchema]
- Array of key-value entries.

---

- total
- number
- Total count of entries matching the selector.

---

- cursor
- string | null
- Cursor for the next page. `null` if no more results.

{% /table %}

Example:

```ts {% title="@api/list-users.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);
  const cursor = url.searchParams.get('cursor') || undefined;
  
  const result = await kv.list(
    { prefix: ['users'] },
    { limit, cursor }
  );
  
  return context.json({
    users: result.items,
    total: result.total,
    nextCursor: result.cursor,
    hasMore: result.cursor !== null
  });
}
```

### kv.transaction

Executes multiple operations atomically.
All operations within the transaction succeed together or fail together (rollback).

```ts
kv.transaction<T>(operation: (tx: KvTransaction) => Promise<T>): Promise<T>
```

The transaction object provides `get`, `getMany`, `set`, and `delete` methods with the same signatures as the main storage object.

```ts {% title="@api/transfer.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  
  const url = new URL(request.url);
  const from = url.searchParams.get('from') || 'alice';
  const to = url.searchParams.get('to') || 'bob';
  const amount = parseInt(url.searchParams.get('amount') || '50', 10);
  
  try {
    const result = await kv.transaction(async (tx) => {
      // Read both accounts
      const fromAccount = await tx.get<{ balance: number }>(['accounts', from]);
      const toAccount = await tx.get<{ balance: number }>(['accounts', to]);
      
      if (!fromAccount?.value || !toAccount?.value) {
        throw new Error('Account not found');
      }
      
      if (fromAccount.value.balance < amount) {
        throw new Error('Insufficient balance');
      }
      
      // Update both accounts atomically
      await tx.set(['accounts', from], {
        balance: fromAccount.value.balance - amount
      });
      await tx.set(['accounts', to], {
        balance: toAccount.value.balance + amount
      });
      
      return { success: true, amount };
    });
    
    return context.json(result);
  } catch (error) {
    return context.status(400).json({
      error: error instanceof Error ? error.message : 'Transaction failed'
    });
  }
}
```

### kv.clearExpired

Removes all expired entries from storage. Called automatically by the server every 5 minutes.

```ts
kv.clearExpired(): Promise<void>
```

```ts {% title="@api/cleanup.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (_request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  
  await kv.clearExpired();
  
  return context.json({ message: 'Expired entries cleared' });
}
```

## Data modeling patterns

### Hierarchical data with prefixes

Organize related data using multi-level keys to enable efficient querying at different levels:

```ts
// Organization > Department > Employee
await kv.set(['orgs', 'globex', 'engineering', 'alice'], { role: 'Engineer' });
await kv.set(['orgs', 'globex', 'engineering', 'bob'], { role: 'Senior Engineer' });
await kv.set(['orgs', 'globex', 'sales', 'charlie'], { role: 'Sales Rep' });
await kv.set(['orgs', 'northwind', 'engineering', 'diana'], { role: 'CTO' });

// Query all employees in Globex
const globexEmployees = await kv.list({ prefix: ['orgs', 'globex'] });

// Query only engineering at Globex
const globexEngineering = await kv.list({ prefix: ['orgs', 'globex', 'engineering'] });

// Query all organizations
const allOrgs = await kv.list({ prefix: ['orgs'] });
```

### Secondary indexes

Store the same data under multiple keys for different query patterns:

```ts
async function saveUser(kv, user) {
  // Primary key: by ID
  await kv.set(['users', user.id], user);
  
  // Secondary index: by email (stores reference to primary key)
  await kv.set(['usersByEmail', user.email], ['users', user.id]);
}

async function getUserByEmail(kv, email) {
  // Look up the primary key using the secondary index
  const ref = await kv.get(['usersByEmail', email]);
  if (!ref?.value) return null;
  
  // Fetch the actual data using the primary key
  return kv.get(ref.value);
}
```

### API responses caching

Use TTL to cache external API responses:

```ts {% title="@api/cached-weather.ts" %}
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (request: Request, context: ApiFunctionsContext) {
  const kv = await context.getKv();
  const url = new URL(request.url);
  const city = url.searchParams.get('city') || 'London';
  
  // Check cache first
  const cached = await kv.get(['cache', 'weather', city]);
  if (cached?.value) {
    return context.json({ source: 'cache', data: cached.value });
  }
  
  // Fetch from external API
  const response = await fetch(`https://api.weather.com/v1/${city}`);
  const weatherData = await response.json();
  
  // Cache for 30 minutes
  await kv.set(['cache', 'weather', city], weatherData, { ttlInSeconds: 1800 });
  
  return context.json({ source: 'api', data: weatherData });
}
```

## Limitations

{% table %}

- Limitation
- Maximum value
- Description

---

- Value size
- 1 MB
- Maximum size of a single value after JSON serialization. Larger values are rejected with an error.

---

- Key components
- string | number | boolean
- Keys must be arrays containing only primitive types.

---

- Value types
- JSON-serializable
- Values must be JSON serializable. Functions, circular references, and special objects are not supported.

{% /table %}

## Resources

- **[API functions reference](./api-functions-reference.md)** - Complete API functions helper methods and properties reference
- **[Create API functions](./create-api-functions.md)** - Step-by-step guide to building API functions

