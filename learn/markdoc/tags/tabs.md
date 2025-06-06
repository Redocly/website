---
seo:
  title: Tabs Markdoc Tag
  description: Organize content and code into tabbed views in your documentation using the tabs Markdoc tag.
---

# Tabs Tag [{% markdoc-tag-badge badgeType="Redocly" /%}](./tag-library#redocly-tag-badge)


The `tabs` tag places content into a series of tabs, providing a structure for you to organize multiple pieces of content within a confined space. Users switch between tabs to access different sections of information within the same interface.

{% admonition type="info" %}
  Redocly's tab implementation is fully accessible for screen readers and keyboard navigation.
{% /admonition %}


## Syntax and usage

Add an opening and closing `tabs` tag to declare a tabs section.

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% tabs %}
  {% /tabs %}
  ```
{% /markdoc-example %}

Wrap your content within a `tab` tag and provide a name using the `label` attribute. A tab only works as a child of a tabs section.

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% tabs %}
    {% tab label="Tab 1" %}
      Content for Tab 1
    {% /tab %}
    {% tab label="Tab 2" %}
      Content for Tab 2
    {% /tab %}
  {% /tabs %}
  ```
{% /markdoc-example %}

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- `label`
- string
- **REQUIRED.** Sets the name of the tab.

{% /table %}

## Examples

Tabs are powerful and flexible, but easy to misuse. Only use them when there is a clear benefit to organizing content in this manner.

{% admonition type="info" %}
  Please read the [best practices](#best-practices) section before using tabs in your documentation.
{% /admonition %}

### Organize content

Tabs can make it easier for users to find what they need. The following example uses tabs to group related information together:

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% tabs %}
    {% tab label="Web frameworks" %}
      * Django
      * Ruby on Rails
      * Angular
      * Vue
      * React
    {% /tab %}
    {% tab label="Cloud services" %}
      * AWS
      * Google Cloud
      * Microsoft Azure
      * Cloudflare
    {% /tab %}
  {% /tabs %}
  ```
{% /markdoc-example %}

{% tabs %}
  {% tab label="Web frameworks" %}
    *Django
    * Ruby on Rails
    *Angular
    * Vue
    *React
  {% /tab %}
  {% tab label="Cloud services" %}
    * AWS
    *Google Cloud
    * Microsoft Azure
    * Cloudflare
  {% /tab %}
{% /tabs %}

### Present different views

Tabs can be used to switch between different views of the same content. The following example uses tabs to display a list view and table view of the same content:

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% tabs %}
    {% tab label="List view " %}
      * Web Frameworks
        * Django
        * Ruby on Rails
        * Angular
        * Vue
        * React
      * Cloud services
        * AWS
        * Google Cloud
        * Microsoft Azure
        * Cloudflare
    {% /tab %}
    {% tab label="Table view" %}
      {% table %}
        - Category
        - Technologies
        ---
        - Web Frameworks
        - Django, Ruby on Rails, Angular, Vue, React
        ---
        - Cloud services
        - AWS, Google Cloud, Microsoft Azure, Cloudflare
      {% /table %}
    {% /tab %}
  {% /tabs %}
  ```
{% /markdoc-example %}

{% tabs %}
  {% tab label="List view" %}
    *Web Frameworks
      * Django
      *Ruby on Rails
      * Angular
      *Vue
      * React
    *Cloud services
      * AWS
      *Google Cloud
      * Microsoft Azure
      * Cloudflare
  {% /tab %}
  {% tab label="Table view" %}
    {% table %}
      - Category
      - Technologies
      ---
      - Web Frameworks
      - Django, Ruby on Rails, Angular, Vue, React
      ---
      - Cloud services
      - AWS, Google Cloud, Microsoft Azure, Cloudflare
    {% /table %}
  {% /tab %}
{% /tabs %}

### Showcase features

Tabs can be used to showcase different features. The following example uses tabs to showcase the different ways of configuring the feedback element in Redocly:

{% markdoc-example %}
  ````markdoc {% process=false %}
  {% tabs %}
    {% tab label="Comment" %}
      The following settings allow users to leave comments when providing feedback:

      ```yaml {% title="redocly.yaml" %}
      feedback:
        type: comment
        settings:
          label: Please leave a couple of words here about your experience.
          submitText: Your comment has been sent to our team!
      ```
    {% /tab %}
    {% tab label="Star rating" %}
      The following settings changes the feedback element to rate pages by number of stars:

      ```yaml {% title="redocly.yaml" %}
      feedback:
        type: rating
        settings:
          label: How many stars for this page?
          submitText: Thank you for your stars!
      ```
    {% /tab %}
    {% tab label="Scale" %}
      The following settings configure the feedback element as a scale:

      ```yaml {% title="redocly.yaml" %}
      feedback:
        type: scale
        settings:
          label: Do you like our page?
          submitText: Thanks for your feedback!
          leftScaleLabel: Not helpful
          rightScaleLabel: Very helpful
      ```
    {% /tab %}
  {% /tabs %}
  ````
{% /markdoc-example %}

{% tabs %}
  {% tab label="Comment" %}
    The following settings allow users to leave comments when providing feedback:

    ```yaml {% title="redocly.yaml" %}
    feedback:
      type: comment
      settings:
        label: Please leave a couple of words here about your experience.
        submitText: Your comment has been sent to our team!
    ```
  {% /tab %}
  {% tab label="Star rating" %}
    The following settings changes the feedback element to rate pages by number of stars:

    ```yaml {% title="redocly.yaml" %}
    feedback:
      type: rating
      settings:
        label: How many stars for this page?
        submitText: Thank you for your stars!
    ```
  {% /tab %}
  {% tab label="Scale" %}
    The following settings configure the feedback element as a scale:

    ```yaml {% title="redocly.yaml" %}
    feedback:
      type: scale
      settings:
        label: Do you like our page?
        submitText: Thanks for your feedback!
        leftScaleLabel: Not helpful
        rightScaleLabel: Very helpful
    ```
  {% /tab %}
{% /tabs %}

### Give users control

Tabs can be used to give users more control over the content they see. The following example uses tabs to group resources into beginner and advanced categories:

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% tabs %}
    {% tab label="Beginner CLI resources" %}
      * [Install Redocly CLI](/docs/cli/installation)
      * [Redocly CLI quickstart guide](/docs/cli/quickstart)
    {% /tab %}
    {% tab label="Advanced CLI resources" %}
      * [Hide internal APIs](/docs/cli/guides/hide-apis)
      * [Enforce response contents](/docs/cli/guides/response-contains-property)
    {% /tab %}
  {% /tabs %}
  ```
{% /markdoc-example %}

{% tabs %}
  {% tab label="Beginner CLI resources" %}
    *[Install Redocly CLI](/docs/cli/installation)
    * [Redocly CLI quickstart guide](/docs/cli/quickstart)
  {% /tab %}
  {% tab label="Advanced CLI resources" %}
    *[Hide internal APIs](/docs/cli/guides/hide-apis)
    * [Enforce response contents](/docs/cli/guides/response-contains-property)
  {% /tab %}
{% /tabs %}

## Best practices

When deciding whether to use tabs, ask yourself "How does this structure add value for the reader?".

### Use tabs strategically

**Prioritize reader experience**

Consider the _reader's journey_ and how tabs can help guide them through the document effectively. Tabs should help organize complex information, highlight differences, or provide alternative perspectives.

**Don't use as navigation**

Tabs should provide _different views within the same context_. Don't use tabs to force users to navigate between pieces of content, especially when it's content they might need to see simultaneously. Using tabs in this way hurts usability and adds to your user's cognitive load.

### Clarity over complexity

**Use clear, concise tab names**

Give your tabs short, readable labels and don't use all caps. Ensuring your tabs are _scannable_ creates a better experience for readers.

**Limit tab count**

Keep the number of tabs low for better navigation and comprehension. Too many tabs is overwhelming for users and having multiple rows is a bad experience.
