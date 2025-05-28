# How to use JSON references ($refs)

OpenAPI allows for using [JSON Reference objects](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#referenceObject).

JSON References are required to accomplish:
* a multi-file structure
* re-use of schemas or other content

## Reference structure

### $ref key

The JSON Reference uses a `$ref` key.

{% tabs %}
```yaml
$ref: <reference>
```
```json
"$ref": "<reference>"
```
{% /tabs %}
### Reference value

The value of the `<reference>` is a JSON Reference which is composed of two parts `<relative path to file or URL><JSON pointer>`.

#### File reference

Possible values:
* empty (to refer to the current document)
* path (relative to the current file)
* URL (including the protocol)

#### Pointer

Possible values:
* empty (to refer to the entire file -- this is the same as `#`).
* `#` with path to the object (refers to the root of the document). Each path segment should have a `/` preceding it (eg. `#/foo`).

Here is an example document.
```yaml
foo: true
bar:
  fee:
    color: purple
    taste: great
```

To refer to the `fee` object within the same file we would use `#/bar/fee`:

```yaml
$ref: '#/bar/fee'
```


## References by example

There are 5 varieties of references examples:

1. Reference a definition within the same file by a pointer within the file.
1. Reference a separate file by a relative path.
1. Reference a definition within a separate file by a relative path to the file and pointer to the object.
1. Reference a file by remote URL.
1. Reference a definition within a file by remote URL and pointer to the object.

### Definition within same file

Use a JSON Pointer to the object.
{% tabs %}
```yaml
    schema:
      $ref: '#/components/schemas/Pet'
```
```json
{
    "schema": {
        "$ref": "#/components/schemas/Pet"
    }
}
```
{% /tabs %}

### Definition is a separate file

```yaml
    schema:
      $ref: './components/schemas/Pet.yaml'
```

### Definition within a separate file

Within a separate file we need a relative path to the file and then the JSON Pointer path to the object separated by a `#` mark.

```yaml
    schema:
      $ref: './components/schemas.yaml#/Pet'
```

### Definition is a file at a remote URL

```yaml
    schema:
      $ref: 'https://example.com/components/schemas/pet.yaml'
```

### Definition is within a file at a remote URL

```yaml
    schema:
      $ref: 'https://example.com/components/schemas.yaml#/Pet'
```


## Common mistakes

### No siblings

The OpenAPI Specification says:

> This object cannot be extended with additional properties and any properties added SHALL be ignored.

In this example, we're trying to re-use the `Skill` object, but we wish to change the example skill to `super-sniffer`.

Trying to extend the object with a sibling is not valid:

```yaml
# invalid example (common mistake)
    skill:
      $ref: '#/components/schemas/Skill'
      example: super-sniffer
```

Do this instead:

```yaml
    skill:
      allOf:
        - $ref: '#/components/schemas/Skill'
        - example: super-sniffer
```

{% admonition type="info" name="OAS 3.1 change" %}
A description and summary are allowed to be provided as siblings to the `$ref` in OAS 3.1.
{% /admonition %}

### Wrong path to `$ref`

The path is evaluated from the file itself. Using paths relative to the root file is a common mistake.

### Use references on disallowed properties

To be strictly compliant with OpenAPI 3.x, a JSON Reference can only be used where explicitly noted in the OpenAPI specification. For example, it can be used for Paths, Parameters, Schema Objects, and more:

> Alternatively, any time a Schema Object can be used, a Reference Object can be used in its place. This allows referencing definitions instead of defining them inline.

To enforce using $refs in OpenAPI-compliant locations, turn on the [spec-strict-refs rule](/docs/cli/rules/oas/spec-strict-refs/).

In addition, Redocly widely supports a non-compliant JSON Reference of the info object's description property for the purpose of [embedded markdown](/docs-legacy/api-reference-docs/guides/embedded-markdown.md).

#### Incorrect examples by reference

We commonly see incorrect examples usage by reference objects.
The OpenAPI specification allows for the examples to have a map of example or reference objects.
The reference object must comply to the example object structure.
Typically, we see the example containing only the value of the example; however, it must contain an object with a key labeled `value` and the value should appear there.

**Common mistake**

Excerpt of `openapi.yaml` root document with the reference on a disallowed property.
```yaml
examples:
  fluffy:
    value:
      $ref: ./fluffy.yaml
```

The `fluffy.yaml` file with incorrect content structure.
```yaml
petType: dog
name: fluffy
```

**Correct structure**

Excerpt of `openapi.yaml` root document with the reference in the correct location.
```yaml
examples:
  fluffy:
    $ref: ./fluffy.yaml
```
The `fluffy.yaml` file contents with the correct example object schema.
```yaml
value:
  petType: dog
  name: fluffy
```

## Further reading

Read the IETF papers about these topics:

* [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03)
* [JSON Pointer](https://tools.ietf.org/html/rfc6901)
