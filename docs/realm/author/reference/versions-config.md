# Versions configuration options

If you want to specify the default version and which versions to include in your project, create a `versions.yaml` file on the same level as your version folders.

## Options

{% table %}

- Option
- Type
- Description

---

- default
- string
- The version displayed first when the page is loaded. Must match the name of the version folder, excluding the `@` prefix. If not defined,it is the last `version` in the `versions` object. Without a `versions.yaml` file, the default version is the highest version in the alphanumeric ascending order.

---

- versions
- Array of [Version object](#version-object)
- This option specifies the version subfolders to include, their display names, and the order. If not used, all version subfolders in the same location are included in the version picker.

{% /table %}

### Version object

{% table %}

- Option
- Type
- Description

---

- version
- string
- This option is the name of the version. Must match the name of the version subfolder, excluding the `@` prefix.

---

- name
- string
- The name for a version displayed in the version picker. If not defined, uses the version subfolder name, excluding the `@` prefix.

{% /table %}

## Examples

The following are examples of `versions.yaml` files:

The following example contains two versions: `v1.0`, and `v1.1`.
The version picker displays **Version 1.0** and **Version 1.1** as the labels for these versions.
As `v1.0` is the default version, when you navigate to your versioned content, your project displays files from `@v1.0` version subfolder.

```yaml
default: v1.0
versions:
  - version: v1.0
    name: Version 1.0
  - version: v1.1
    name: Version 1.1
```

The following example contains three versions: `1.0`, `2.0`, and `2.3`.
Since the names contain only numbers, the names were placed inside single quotations to match the required `string` type for these values.
The version picker displays **1.0**, **2.0**, and **2.3**.
The default version is not defined in this file, so the project displays files from the version subfolder with the highest value.
In this case, it is `@2.3`.

```yaml
versions:
  - version: '1.0'
  - version: '2.0'
  - version: '2.3'
```

## Resources

- Learn how to set up your project to maintain concurrent [versions](../how-to/versions.md) of content.