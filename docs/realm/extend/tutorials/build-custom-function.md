---
seo:
  description: Empower your technical writers with more powerful tools to control content by adding custom Markdoc functions to your Redocly project.
---

# Build a Markdoc function

In this tutorial, we'll define a new, custom [Markdoc function](https://markdoc.dev/docs/functions) in a Redocly project. You'll learn to build your own custom functions that empower your writers to control content. This tutorial assumes basic familiarity with JavaScript. 

<details>
<summary>More about Markdoc functions</summary>

  Markdoc comes with [built-in tags](https://markdoc.dev/docs/tags#built-in-tags) for conditional logic, `{% if %}` and `{% else %}`. Authors use these tags with [Markdoc functions](https://markdoc.dev/docs/functions) to dynamically render content when certain conditions are met. 
  Here's an example that uses functions:
  {% markdoc-example %}
    ```
    {% if equals($userClaims.role, "Customer") %}
      This content only displays if $userClaims.role is equal to "Customer".
    {% /if %}
    ```
  {% /markdoc-example %}
  
</details>

We're going to build `isAfterDate`, a custom function that checks whether a date has passed. Authors can use this function to dynamically display content based on dates. Below is a quick example of what we'll build.

**Example syntax:**
{% markdoc-example %}
  ```
  {% if isAfterDate("2024-01-04") %}
    This content only renders _after_ January 4th!
  {% /if %}
  ```
{% /markdoc-example %}


**Example output:**
{% if isAfterDate("2024-01-04") %}
    This content only renders _after_ January 4th!
{% /if %}


## Before you begin

Make sure you have the following before you begin:
- A new project with the latest version of Redocly Realm installed.
- A text editor for working with code (I'm using VS Code)

## Test a built-in function  

We'll start by creating a document and observing the behavior of the `{% if %}` tag combined with a built-in function. Later, we'll update the tag so we can test our custom function as we build it.

1. In your project root, add a new file called _function-test.md_ with the following content:

    {% markdoc-example %}
      ```
      ---
      temperature: hot
      ---

      # Custom Function Demo Page

      ## Built-in function
      {% if equals($frontmatter.temperature, "hot") %}
        This porridge is too hot. Goldilocks won't eat it.
      {% /if %}

      ---

      ## Custom Function

      The custom function will go here.
      ```
    {% /markdoc-example %}

2. Run the project using the following command: `npx @redocly/cli preview`. 

3. Open the **Preview URL** and navigate to /function-test. 

4. Verify the content inside the `{% if %}` tag renders on the page. 

5. With the page open, modify the file's front matter by updating the temperature variable's value to `temperature: cool`.

6. Save the file and check your preview. The conditional content is no longer visible. 

    {% admonition type="info" name="Info" %}
      This initial example uses `equals`, a [built-in function](https://markdoc.dev/docs/functions#built-in-functions) included with Markdoc. We're going to add a _custom_ function that we build ourselves.
    {% /admonition %}

7. Stop the project by pressing 'q' or 'Ctrl + c'. 

## Define a custom function

First, we'll create a placeholder function with basic logic we can test to ensure everything is wired up correctly. Once we verify it's working, we'll proceed to implementing the actual logic we want in the custom function.

1. Create a new file at _@theme/markdoc/schema.ts_. Your project directory should look like this:

    ``` {% title="Sample project directory" %} 
    markdoc-function-tutorial
    ├── @theme
    │   └── markdoc 
    │       └── schema.ts
    ├── function-test.md
    ├── index.md
    ├── package-lock.json
    └── package.json
    ```

2. In _schema.ts_, define the `isAfterDate` function and save.

    ```javascript {% title="schema.ts" %}  
    export const functions = {
      isAfterDate: {
        transform(parameters) {
          console.log(parameters);
          return true;
        }
      }
    }
    ```

3. In _function-test.md_, copy and paste the following new tag under the **Custom Function** section and save.

    {% markdoc-example %}
      ```
      {% if isAfterDate("test") %}
        Hello World
      {% /if %}
      ```
    {% /markdoc-example %}

4. Run the project, `npx @redocly/cli preview`, open **Preview URL**, and navigate to /function-test.

5. Review the rendered page for the conditional content we just added. You should see "Hello World" under the **Custom Function** heading. 

6. Review the terminal where your project is running. You should see console output from our new function. 

    {% admonition type="success" %}
      Congratulations! You just built a custom Markdoc function and used it to dynamically control your content in Markdown. 
    {% /admonition %}

7. Stop the project by pressing 'q' or 'Ctrl + c'.

## Build the function's logic

1. In _schema.ts_, update the `isAfterDate` function to include date-checking logic:

    ```javascript {% title="schema.ts" %}  
    export const functions = {
      isAfterDate: {
        transform(parameters) {
          const inputDateString = parameters[0]; 
          const inputDate = new Date(inputDateString);

          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);  

          return inputDate < currentDate;
        }
      }
    }
    ```

    <details>
    <summary>Explanation of code inside isAfterDate</summary>
      The `isAfterDate` function does the following:
      - Creates a date object using the date value passed by the author, `inputDate`.
      - Creates a _current_ date object when the code executes, `currentDate`.
      - Sets `currentDate` to midnight to ensure we're comparing dates and avoid issues related to timezone.
      - Checks whether the current date is later than the specified date.
    </details>

2. In _function-test.md_, modify the **Custom Function** section to test the new logic in the function. Follow the steps below to write with your function as an author would:
   
    - Run project: `npx @redocly/cli preview`
  
    - Add the following snippet with a _past date_ as the parameter and save. Check the preview. Content should be **visible**. 

        {% markdoc-example %}
          ```
          {% if isAfterDate("2023-12-31") %}
            It's 2024 - Happy New Year!  
          {% /if %}
          ```
        {% /markdoc-example %}

    - Now add the following snippet with a _future date_ and save. Check the preview. Content should be **hidden**.

        {% markdoc-example %}
          ```
          {% if isAfterDate("2030-12-31") %}
            If you can read this... I'm much older.
          {% /if %}
          ```
        {% /markdoc-example %}

3. After verifying the function works as expected, stop the project by pressing 'q' or 'Ctrl + c'.

## Use the function to control content

Like most things in Markdoc, functions are modular. Authors can combine them to build conditional logic. Let's test our `isAfterDate` function in a couple more complex scenarios.

### Example - Limited time offer

Pretend you're running limited time sale over the weekend. You want a banner to display, but only on two specific days:

{% markdoc-example %}
  ```
  {% if and(isAfterDate("2024-01-05"), not(isAfterDate("2024-01-07"))) %}
    {% admonition type="info" name="Sale" %}
      We're having an awesome sale!
    {% /admonition %}
  {% /if %}
  ```
{% /markdoc-example %}

This banner will only display for two days, Jan. 6th and 7th, when you're having the sale.

### Example - Important product announcements

Pretend you're releasing a new feature on a specific date. You want to focus on the feature quality and rollout; not managing the announcement in the docs. Instead of making manual updates, you can use the custom function we built to control the content dynamically according to the scheduled release date.

{% markdoc-example %}
  ```
  {% if not(isAfterDate("2024-01-07")) %}
    This feature is in **beta** and may change. 
  {% /if %}
  {% if and(isAfterDate("2024-01-07"), not(isAfterDate("2024-02-07"))) %}
    Newly launched! This feature is **stable**.
  {% /if %}
  ```
{% /markdoc-example %}

The snippet above does the following:
- Displays a beta disclaimer before launch date.
- After launching, displays a "new product announcement" for 30 days. 

## Resources and next steps

In this tutorial, you built a custom Markdoc function into your Redocly project. Your authors can use that custom function in their Markdown to dynamically control content. Pretty cool!  

Use the following resources to build on the knowledge you gained from this tutorial: 
- [Get Started with Realm](https://redocly.com/docs/realm/get-started/)
- Markdoc docs: [Tags](https://markdoc.dev/docs/tags)
- Markdoc docs: [Variables](https://markdoc.dev/docs/variables)
- Markdoc docs: [Functions](https://markdoc.dev/docs/functions)