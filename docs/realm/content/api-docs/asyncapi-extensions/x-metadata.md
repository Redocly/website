# AsyncAPI extension: `x-metadata`

Use `x-metadata` to add a table of additional data to the top of your API reference documentation.
You can add any keys or values that you want users to easily find at the top level of the documentation.

The data is formatted as a table and added as part of the description section at the top of the page.

## Location

The `x-metadata` extension can be added to Info Object.

## Options

{% table %}

- Option
- Type
- Description

---

- x-metadata
- Object
- Custom metadata in key-value format.

{% /table %}

## Examples

### `x-metadata` example

Metadata keys can be any string.
The values can be any primitive type, or a list of strings.

The following is an example of an `x-metadata` section of an AsyncAPI description file:

```yaml
info:
  x-metadata:
    department: Technical shared services (East)
    releaseDate: '12 Mar 2022'
    authors:
      - Sarah
      - Soumya
      - Susie
```

The data is presented as shown in the following screenshot:

![title "Metadata" and a table showing the metadata](./images/asyncapi-x-metadata.png)

### `x-metadata` as filters in classic catalog

The following snippets are examples of `x-metadata` sections with configured `tags` you can use to [filter APIs in classic catalog](../../../config/catalog-classic.md#x-metadata-filters-in-classic-catalog).

```yaml {% title="books-api.yaml" %}
info:
  x-metadata:
    tags:
      - Books
```

```yaml {% title="magazines-api.yaml" %}
info:
  x-metadata:
    tags: ["Magazines"]
```

To use `tags` as filters, the values must be a list.

## Resources

- See a full [list of supported AsyncAPI extensions](./index.md).