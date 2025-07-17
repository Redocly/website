# Custom Markdoc attribute resolvers

Custom Markdoc attribute resolvers define special attributes that are resolved during build time. 
Use this functionality to:
- transform file paths into proper slugs
- load file content
- perform other dynamic operations within your Markdoc components

## Overview

As an alternative to custom types, you can now add `resolver: <type>` within your Markdoc schema attributes. 
Custom attribute resolvers are a cleaner and more intuitive way to handle dynamic content resolution.

Find a list of available attribute resolvers on the [Markdoc attribute resolvers page](./list/index.md).

For implementation details, see: [Use advanced features](./usage.md).
