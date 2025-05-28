---
seo:
  title: When do you use YAML or JSON
---
# Lesson 8: When to use YAML or JSON

YAML is (usually) easier for humans to read and write.

JSON is easier for machines to generate and faster for machines to process.
Consider build-time versus runtime usage.

**Exercise:** Which of the following are better suited for YAML?

- API request bodies
- API response bodies
- Configuration files
- Content feature toggles
- Markdown front matter
- Schema descriptions

<details><summary>See answer</summary>

Despite tools to "pretty" the visual format of JSON, it's still less human friendly than YAML. This is the reason that files that don't need a lot of processing are often written and stored in YAML.

- Configuration files
- Content feature toggles
- Markdown front matter
- Schema descriptions

</details>
