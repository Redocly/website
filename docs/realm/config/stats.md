---
products:
  - Realm
plans:
  - Enterprise
  - Enterprise+
description: Collect and display project statistics including API metrics and file usage.
---
# `stats`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

By default, the stats feature collects comprehensive statistics about your project, including API metrics, file counts, and page counts.
When enabled, a `/stats` page is automatically added to your project displaying collected statistics.

Use the `stats` configuration to:

- Enable file extension statistics collection
- Specify which APIs to analyze for detailed metrics
- Track operations, schemas, parameters, and other API elements

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "stats"} /%}

## Collected statistics

The stats plugin collects the following information:

- **Page count** - Total number of pages in your project
- **File extensions** - Count of files by extension (when enabled)
- **API metrics** - Detailed statistics for each configured API including:
  - Number of operations
  - Number of path items
  - Number of schemas
  - Number of parameters
  - Number of tags
  - Number of references
  - Number of external documents
  - Number of links

## Options

{% table %}

- Option
- Type
- Description

---

- fileExtensions
- boolean
- Enables collection of file extension statistics.
  When enabled, counts files by extension (`.yaml`, `.yml`, `.md`, `.json`).
  Default: `false`.

---

- apis
- [[API item](#api-item-object)]
- List of APIs to analyze for statistics.
  If not specified, uses all APIs from the `apis` configuration option.

{% /table %}

### API item object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED.** Name of the API for display in statistics.

---

- path
- string
- **REQUIRED.** Path to the API definition file relative to the project root.

{% /table %}

## Statistics displayed

The stats page at `/stats` displays the following information:

```json
{
  "pageCount": 42,
  "files": [
    { "extension": ".md", "count": 25 },
    { "extension": ".yaml", "count": 10 }
  ],
  "apis": [
    {
      "name": "Museum API",
      "operations": 15,
      "pathItems": 12,
      "schemas": 20,
      "parameters": 8,
      "tags": 5,
      "references": 30,
      "externalDocuments": 2,
      "links": 4
    }
  ]
}
```

## Examples

### Basic configuration

Enable stats with default settings (uses all APIs from `apis` configuration):

```yaml
stats:
  fileExtensions: false
```

### Enable file extension statistics

Collect statistics about file extensions in addition to API metrics:

```yaml
stats:
  fileExtensions: true
```

### Specify APIs to analyze

Explicitly define which APIs to analyze for statistics:

```yaml
stats:
  fileExtensions: true
  apis:
    - name: Museum API
      path: ./openapi/museum.yaml
    - name: Payments API
      path: ./openapi/payments.yaml
```

### Complete example with multiple APIs

Configure stats with file extension tracking and multiple API definitions:

```yaml {% title="redocly.yaml" %}
apis:
  museum:
    root: ./openapi/museum.yaml
  payments:
    root: ./openapi/payments.yaml
  users:
    root: ./openapi/users.yaml

stats:
  fileExtensions: true
  apis:
    - name: Museum API
      path: ./openapi/museum.yaml
    - name: Payments API
      path: ./openapi/payments.yaml
```

In this example, stats are collected for the Museum and Payments APIs but not the Users API.

## Resources

- **[APIs configuration](./apis.md)** - Configure API definitions that stats can analyze for comprehensive metrics
- **[Scorecard configuration](./scorecard.md)** - Configure API quality scoring that complements stats for complete API governance
- **[Metadata configuration](./metadata.md)** - Configure metadata extraction that works with stats for enhanced project insights
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
