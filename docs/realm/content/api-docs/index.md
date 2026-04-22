---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# API documentation

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Realm supports API description files written according to the most commonly-used specifications:

- [Add AsyncAPI descriptions](./add-asyncapi-docs.md)
- [Add GraphQL descriptions](./add-graphql-docs.md)
- [Add OpenAPI docsdescriptions](./add-openapi-docs.md)
- [Add SOAP documentation from a WSDL file](./add-soap-docs.md)

Realm also offers the Mock Server as an alternative to live endpoints and supports extensions for AsyncAPI and OpenAPI description files:

- [Configure Mock Server](./configure-mock-server.md): use the Replay console to send calls to your API operations and see sample responses without the need for backend services.
- [AsyncAPI extensions](./asyncapi-extensions/index.md): See the full list of supported AsyncAPI extensions.
- [OpenAPI extensions](./openapi-extensions/index.md): See the full list of supported OpenAPI extensions.
