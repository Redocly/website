<!-- @chunk {"steps": ["tutorial-code-snippet"]} -->
# Tutorial

## Declare a variable

<!-- @chunk {"steps": ["add-syncId-attribute"]} -->
{% tabs syncId="programming-language" %}
<!-- @chunk-end -->
  {% tab label="JavaScript" %}
    ```js
    const arr = [];
    ```
  {% /tab %}
  {% tab label="TypeScript" %}
    ```ts
    const arr: number[] = [];
    ```
  {% /tab %}
{% /tabs %}

## Define an async function

<!-- @chunk {"steps": ["add-syncId-attribute"]} -->
{% tabs syncId="programming-language" %}
<!-- @chunk-end -->
  {% tab label="JavaScript" %}
    ```js
    async function promisify(arg) {
      return arg;
    }
    ```
  {% /tab %}
  {% tab label="TypeScript" %}
    ```ts
    async function promisify<T>(arg: T): Promise<T> {
      return arg;
    }
    ```
  {% /tab %}
{% /tabs %}
<!-- @chunk-end -->
