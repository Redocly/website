# Pagination

List endpoints in Reunite API use cursor-based pagination.
Each paginated response includes a `page` object that tells you how to request the next or previous page.

## Pagination parameters

Use these query parameters on list endpoints that support pagination:

- `limit`: number of items per page (`1` to `100`, default `10`)
- `after`: fetch results after a cursor (for next page)
- `before`: fetch results before a cursor (for previous page)
- `sort`: sort order (for example `-id` for descending, `id` for ascending)

## Pagination response object

Paginated responses include:

- `page.endCursor`: use as `after` to get the next page
- `page.startCursor`: use as `before` to get the previous page
- `page.hasNextPage`: whether more results are available after this page
- `page.hasPrevPage`: whether previous results are available before this page
- `page.limit`: number of items in the page limit
- `page.total`: total number of items across all pages

## Pagination flow example

1. Request the first page with `?limit=10`.
2. Read `page.endCursor`.
3. Request the next page with `?limit=10&after=<endCursor>`.
4. Continue until `page.hasNextPage` is `false`.

## Filter

Use `?filter=` on collection endpoints to retrieve a subset of results.
Fields and values are separated with `:`.

### Exact match

```text
?filter=firstName:Casey
```

### Case-insensitive substring match

```text
?filter=firstName~jo
```

### Multiple values

```text
?filter=firstName:Casey,Jordan
?filter=status:success,pending
```

### Ranges

```text
?filter=amount:1..10
?filter=birthDate:1900-01-01T00:00:00.000Z..2000-01-01T00:00:00.000Z
```

### Duration-based filtering for date-time fields

```text
?filter=createdAt:30d
?filter=createdAt:2w
?filter=createdAt:6mo
?filter=createdAt:1y
?filter=createdAt:all
```

Supported duration units:

- `s` seconds
- `m` minutes
- `h` hours
- `d` days
- `w` weeks
- `mo` months
- `y` years
- `all` no date restriction

### Nested fields

```text
?filter=team.user.email:person.a@example.com
```

### Negation

```text
?filter=-firstName:Casey
```

### Logical operators

```text
?filter=firstName:Casey AND isAdmin:true
?filter=firstName:Casey OR lastName:Sting
```

### Date-time format

Use `ISO 8601` format for date-time values:

```text
?filter=createdAt:2021-02-14T13:30:00.000Z
```

### Quoted values

Wrap values containing spaces, `,`, or `..` in quotes:

```text
?filter=description:"The story called \"The Sky and the Sea.\""
```

You do not need quotes for `number`, `boolean`, or `null`:

```text
?filter=age:18
?filter=isAdmin:true
?filter=description:null
```

## Search

Use `?search=` to run a text query across searchable fields for endpoints that support search.

```text
?search=casey
```

Search behavior is endpoint-specific.
Check each endpoint definition in the OpenAPI specification to confirm if `search` is supported.
