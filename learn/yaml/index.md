# Learn YAML essentials

**Goal:** Redocly YAML essentials gives you the prerequisite knowledge for using YAML to write and edit configuration files, and OpenAPI definitions.

Estimated time to complete the course: **40 minutes**.

_Complete this YAML essentials course before starting the OpenAPI course._

## Course overview

- [Introduction to YAML](#lesson-1-introduction-to-yaml) (3 minutes)
- [Documents and comments](documents-comments.md) (3 minutes)
- [Maps](maps.md) (5 minutes)
- [Scalars](scalars.md) (3 minutes)
- [Blocks and flows](blocks-and-flows.md) (10 minutes)
- [Sequences](sequences.md) (12 minutes)
- [Troubleshooting](troubleshooting.md) (5 minutes)
- [When to use YAML or JSON](yaml-or-json.md) (5 minutes)

## Lesson 1: Introduction to YAML

**What's YAML?**

> YAML (a recursive acronym for "YAML Ain't Markup Language") is a data serialization language designed to be human-friendly and work well with modern programming languages for common everyday tasks.

YAML is a structured way to hold data.
You can describe different types of data using one or a combination of scalars, sequences, and maps.
Let's take a quick look at a YAML file that holds data about a purchase from a grocery store:

```yaml
items:
  - product: orange
    quantity: 3
    price: 1.79
  - product: apple
    quantity: 6
    price: 5.99
total: 7.78
```

**Why YAML?**

> The design goals for YAML are, in decreasing priority:
> - YAML should be easily readable by humans.
> - YAML data should be portable between programming languages.
> - YAML should match the native data structures of dynamic languages
> - ...

JSON is another popular data serialization format commonly used in APIs.
All JSON can be converted to YAML.
Some YAML can be converted to JSON.

{% admonition type="info" name="**Fun fact**" %}
YAML and JSON were invented around the same time.
YAML in version 1.2 subsequently adopted compatibility with JSON.
{% /admonition %}

Let's check YAML's design goal by comparing YAML to JSON for the same grocery store purchase:

```json
{
  "items": [
    {
      "product": "orange",
      "quantity": 3,
      "price": 1.79
    },
    {
      "product": "apple",
      "quantity": 6,
      "price": 5.99
    }
  ],
  "total": 7.78
}
```

This course doesn't cover topics including directives, tags, anchors and aliases, or processing YAML because those topics aren't essential to the course goal.
