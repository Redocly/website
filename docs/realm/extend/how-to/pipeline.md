---
rbac:
  redocly.owners: read
  redocly.members: read
  Employee: read
---
# Page rendering pipeline

## Plugins lifecycle

Everything starts from running plugins lifecycle hooks:

- `processContent` - plugins can scan file system or get data from APIs and use `createRoute` to create routes.
- `afterRoutesCreated` - plugins can use routes information to create some shared data.

`processContent` can preprocess data and put it into the route.
But for our dev server performance reasons we want any heavy content processing to be on-demand:

- we won't need to process all the routes just to start the server
- we can use it for implementing incremental builds later

The use case for this is for example markdown processing. Parsing AST and walking it to replace links and copy assets is heavy.
It also requires access to the file system so we can't offload it to the `getServerProps` stage.

## `getStaticData` (FS access, runs at build time)

Load data is run for each page on build time (or lazily in dev mode).
As the input it gets the route info from `createRoute` call.
It has access to all routes info, filesystem (via context.fs).

Example of `getStaticData` for markdown plugin:

- loads md content using `context.fs`
- parses AST
- transforms links in AST:
  - uses routes info for replacing links to pages
  - uses **fs access** for copying static assets

The output of `getStaticData` is saved in the store and is serialized in `prepare`. It is passed as a prop to the `getServerProps`.

The output of `getStaticData` can have `props` property. It will be used as page props if `getServerProps` is not defined.

## `getServerProps` (no fs access, runs on each request)

Computes page props on each page request.
Should not use heavy computations. Should not access FS but can use network for load data from APIs.
Accepts output of `getStaticData` and can use it.
Accepts raw HTTP request info as well as parsed user identity and permissions, etc.

Should support caching headers to allow better caching.

## React SSR or `data.json` (from the props step)

Outputs HTML or page data and proper caching headers.
