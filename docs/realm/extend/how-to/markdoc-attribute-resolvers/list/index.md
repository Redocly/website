# Available resolvers

The following resolvers are available for use in your Markdoc schema attributes:

{% table %}

- Resolver {% width="25%" %}
- Description

---

- `link`
- [Transforms](./link.md) file paths into proper route slugs or static asset URLs.

---

- `navLinks`
- Resolves navigation links from configuration files (supports arrays and objects).

---

- `parsedYaml`
- Loads and parses YAML files, providing the parsed content.

---

- `rawContent`
- [Loads](./raw-content.md) the raw content of files as strings.

---

- `openapiRef`
- Resolves OpenAPI definition references.

---

- `jsonSchemaRef`
- Resolves JSON Schema references with bundling support.

{% /table %}
