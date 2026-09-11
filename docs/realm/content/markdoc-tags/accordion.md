---
products:
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Accordion and accordion group tags

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The `accordion` tag hides secondary content inside a collapsible section with a short title.
Users expand only the sections they need, which keeps pages compact and easier to scan.
Use the `accordion-group` tag to combine several accordions into a single bordered list.

Accordions render as a native HTML `details` element, working with keyboard navigation and screen readers out of the box.

## Syntax and usage

Wrap content with an `accordion` tag and set a header using the `title` attribute.
The content can include any Markdown, such as text, code snippets, and images.

{% accordion title="Ideas to consider" %}
Try adding a new special event to the Museum API, or timebox the content creation to 2 hours.
{% /accordion %}

{% markdoc-example %}

```md {% process=false %}
{% accordion title="Ideas to consider" %}
Try adding a new special event to the Museum API, or timebox the content creation to 2 hours.
{% /accordion %}
```

{% /markdoc-example %}

### Group accordions

Wrap several accordions in an `accordion-group` tag to display them as one list with dividers between the items.
The group takes no attributes.

{% accordion-group %}
  {% accordion title="How do I buy a ticket?" %}
  Use the `POST /tickets` endpoint or visit the museum front desk.
  {% /accordion %}
  {% accordion title="Can I get a refund?" %}
  Tickets are refundable up to 24 hours before the visit date.
  {% /accordion %}
{% /accordion-group %}

{% markdoc-example %}

```md {% process=false %}
{% accordion-group %}
  {% accordion title="How do I buy a ticket?" %}
  Use the `POST /tickets` endpoint or visit the museum front desk.
  {% /accordion %}
  {% accordion title="Can I get a refund?" %}
  Tickets are refundable up to 24 hours before the visit date.
  {% /accordion %}
{% /accordion-group %}
```

{% /markdoc-example %}

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- title
- string
- **REQUIRED.**
  Sets the header text of the accordion.

---

- expanded
- boolean
- When `true`, the accordion is expanded when the page loads.
  Users can still collapse it.
  **Default:** `false`.

{% /table %}

## Examples

### Expand an accordion by default

Use the `expanded` attribute to display important content while keeping it collapsible:

{% accordion title="Museum hours" expanded=true %}
The museum is open from 9:00 to 18:00 every day except Monday.
{% /accordion %}

{% markdoc-example %}

```md {% process=false %}
{% accordion title="Museum hours" expanded=true %}
The museum is open from 9:00 to 18:00 every day except Monday.
{% /accordion %}
```

{% /markdoc-example %}

### Add a code snippet

Accordions can contain any Markdown content, including code snippets:

{% accordion title="Example configuration" %}
Add your products to the `redocly.yaml` file:

```yaml
products:
  tickets:
    name: Museum Tickets
    folder: products/tickets/
```

{% /accordion %}

{% markdoc-example %}

````md {% process=false %}
{% accordion title="Example configuration" %}
Add your products to the `redocly.yaml` file:

```yaml
products:
  tickets:
    name: Museum Tickets
    folder: products/tickets/
```

{% /accordion %}
````

{% /markdoc-example %}

## Best practices

Use accordions for supplementary content that not every user needs, such as extended examples, troubleshooting notes, or optional background information.

Avoid hiding essential instructions inside accordions.
If users must read the content to complete a task, keep it visible on the page.

## Resources

- **[Markdoc tag library](./tag-library.md)** - Complete list of Markdoc tags you can use in your documentation
- **[Tabs tag](./tabs.md)** - Alternative way to organize related content in a confined space
- **[Admonition tag](./admonition.md)** - Highlight important information in a pre-styled banner instead of hiding it
